import { Component, OnInit } from '@angular/core';
import {SocketsService, ConnectionState} from "../../telemetry-services/realtime/sockets.service";
import {Observable} from "rxjs";
import {EventReportingService} from "../event-reporting-service/event-reporting.service";

@Component({
  selector: 'socket-state',
  templateUrl: './socket-state.component.html',
  styleUrls: ['./socket-state.component.scss']
})
export class SocketStateComponent implements OnInit {

  public connectionState: Observable<string>;

  constructor(private _socketService: SocketsService, private _eventReport: EventReportingService) {
    this.connectionState = this._socketService.connectionState$
      .map((state: ConnectionState) => { return ConnectionState[state]; });

    this._socketService.error$.subscribe(
      (error: any) => { this._eventReport.report("Socket error", error); },
      (error: any) => { this._eventReport.report("Socket error", error); }
    );

    this._socketService.starting$.subscribe(
      () => {  },
      () => { this._eventReport.report("Socket error", "SignalR service failed to start!"); }
    );
  }

  ngOnInit() {
  }

}
