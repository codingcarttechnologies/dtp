import { Injectable, Inject } from '@angular/core';
import { Subject, Observable } from "rxjs";

import { environment } from '../../../environments/environment';
import {NewDeviceDataModel} from "../models/new.device.data.model";

// Based on https://blog.sstorie.com/integrating-angular-2-and-signalr-part-2-of-2/

export class SignalrWindow extends Window {
  $: any;
}

export enum ConnectionState {
  Connecting = 1,
  Connected = 2,
  Reconnecting = 3,
  Disconnected = 4
}

class OemSubject {
  oemId: string;
  subject: Subject<any>;
}

@Injectable()
export class SocketsService {

  /**
   * starting$ is an observable available to know if the signalr
   * connection is ready or not. On a successful connection this
   * stream will emit a value.
   */
  public starting$: Observable<any>;

  /**
   * connectionState$ provides the current state of the underlying
   * connection as an observable stream.
   */
  public connectionState$: Observable<ConnectionState>;

  /**
   * error$ provides a stream of any error messages that occur on the
   * SignalR connection
   */
  public error$: Observable<string>;

  public deviceData$: Observable<NewDeviceDataModel>;

  private deviceDataSubject = new Subject<NewDeviceDataModel>();

  private connectionStateSubject = new Subject<ConnectionState>();
  private startingSubject = new Subject<any>();
  private errorSubject = new Subject<any>();

  private hubConnection: any;
  private hubProxy: any;

  private subjects = new Array<OemSubject>();

  constructor(
    @Inject(SignalrWindow) private window: SignalrWindow
  ) {
    if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
      throw new Error("The variable '$' or the .hubConnection() function are not defined... Please check the SignalR scripts have been loaded properly");
    }

    // Set up our observables
    //
    this.connectionState$ = this.connectionStateSubject.asObservable();
    this.error$ = this.errorSubject.asObservable();
    this.starting$ = this.startingSubject.asObservable();

    this.deviceData$ = this.deviceDataSubject.asObservable();

    this.hubConnection = this.window.$.hubConnection();
    this.hubConnection.url = environment.signalRAddress + 'signalr';
    this.hubProxy = this.hubConnection.createHubProxy('DataPointReadingHub');

    // Define handlers for the connection state events
    this.hubConnection.stateChanged((state: any) => {
      let newState = ConnectionState.Connecting;

      switch (state.newState) {
        case this.window.$.signalR.connectionState.connecting:
          newState = ConnectionState.Connecting;
          break;

        case this.window.$.signalR.connectionState.connected:
          newState = ConnectionState.Connected;
          break;

        case this.window.$.signalR.connectionState.reconnecting:
          newState = ConnectionState.Reconnecting;
          break;

        case this.window.$.signalR.connectionState.disconnected:
          newState = ConnectionState.Disconnected;
          break;
      }

      this.connectionStateSubject.next(newState);
    });

    // Define handlers for any errors
    this.hubConnection.error((error: any) => {
      this.errorSubject.next(error);
    });

    // Define the signalR event handlers
    this.hubProxy.on("onNewDeviceData", (deviceData: any) => {
      this.deviceDataSubject.next(deviceData);
    });
  }

  start(): void {
    this.hubConnection.start()
      .done(() => {
        this.startingSubject.next();
      })
      .fail((error: any) => {
        this.startingSubject.error(error);
      });
  }

  sub(oemId: string): Observable<any> {

    // TODO: signalr - no need to keep track of the subjects, we will be dispatching all events received to the UI
    let oemSub = this.subjects.find((x: OemSubject) => {
      return x.oemId === oemId;
    }) as OemSubject;

    if (oemSub !== undefined) {
      return oemSub.subject.asObservable();
    }

    oemSub = new OemSubject();
    oemSub.oemId = oemId;
    oemSub.subject = new Subject<any>();
    this.subjects.push(oemSub);

    this.starting$.subscribe(() => {
        this.hubProxy.invoke("Subscribe", oemId)
          .done(() => {
            // console.log(`Successfully subscribed to ${oemId} channel`);
          })
          .fail((error: any) => {
            console.log(`Error subscribing to ${oemId} - ${error}`);
          });
      },
      (error: any) => {
        console.log(error);
      });

    return oemSub.subject.asObservable();
  }

}
