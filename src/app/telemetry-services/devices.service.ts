import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { throwHttpError } from '../shared/utils/http.error';

import { environment } from '../../environments/environment';

import { DeviceModel } from './models/device.model';
import { DeviceDetailsModel } from './models/device.details.model';
import {AuthHttp} from "../shared/jwt/auth.http.service";
import {DeviceEditModel} from "./models/device.edit.model";
import {Router} from "@angular/router";
import {EventReportingService} from "../shared/event-reporting-service/event-reporting.service";
import {Headers, RequestOptions, ResponseContentType} from "@angular/http";
import {SocketsService} from "./realtime/sockets.service";
import {NewDeviceDataModel} from "./models/new.device.data.model";

@Injectable()
export class DevicesService {

  public numErrors = 0;
  public numActive = 0;
  public numInactive = 0;

  private _endpoint: string = environment.apiAddress + 'devices';

  private _subject: BehaviorSubject<DeviceModel[]> = new BehaviorSubject<DeviceModel[]>([]);
  private _subjectAll: BehaviorSubject<DeviceModel[]> = new BehaviorSubject<DeviceModel[]>([]);
  private _devicesSummary: DeviceModel[] = [];
  private _allDevicesSummary: DeviceModel[] = [];
  private _fetchDevicesSummary = true;

  private _searchTerm: string = '';
  private _filter: (DeviceModel) => boolean = (dm) => true;
  private _viewInactive: boolean = false;
  public get viewInactive(): boolean {
    return this._viewInactive;
  }

  public set viewInactive(v) {
    this._viewInactive = v;
    this.filterAndSearch();
  }

  constructor(private _http: AuthHttp,
    private _router: Router,
    private _reportingService: EventReportingService,
    private _socketsService: SocketsService) { }

  public getDevicesSummary (): BehaviorSubject<DeviceModel[]> {
    if (this._fetchDevicesSummary) {
      this._fetchDevicesSummary = false;
      this.fetchDevicesSummary();
    }

    return this._subject;
  }

  public getAllDevicesSummary (): BehaviorSubject<DeviceModel[]> {
    this.getDevicesSummary();

    return this._subjectAll;
  }

  public getDeviceGroups(groupSelector: Observable<(any) => boolean>): Observable<any[]> {
    return Observable
      .combineLatest(this.getDevicesSummary(), groupSelector)
      .map(([devlist, gs]) => devlist
        .reduce((acc, curr) => {
          if (acc [0] [<any>gs(curr)]) {
            acc  [0] [<any>gs(curr)].push(curr);
          } else {
            acc [0] [<any>gs(curr)] = [curr];
          }

          return acc;
        }, [{}])
        .map(tmpRes => {
          let devGrps = [];
          for (let key in tmpRes) {
            devGrps.push({title: key, devices: tmpRes [key]});
          }

          return devGrps;
        }))
        .map(a => a [0]);
  }

  public getOrganizations(): Observable<string[]> {
    return this.getDevicesSummary()
      .map(a =>
        a.reduce((acc, curr) => {
          if (acc.findIndex(d => d === curr.organization) < 0) {
            acc.push(curr.organization);
          }

          return acc;
        }, []));
  }

  public getAllOrganizations(): Observable<string[]> {
    return this.getAllDevicesSummary()
      .map(a =>
        a.reduce((acc, curr) => {
          if (acc.findIndex(d => d === curr.organization) < 0) {
            acc.push(curr.organization);
          }

          return acc;
        }, []));
  }

  public add(device: DeviceEditModel) {
    this._http.post(this._endpoint, device)
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to add device.');
        return throwHttpError(error);
      })
      .subscribe(r => {
        this.fetchDevicesSummary();
      });
  }

  public resetNotifications(deviceId: string) {
    this._http.put(this._endpoint + `/resetnotifications/${deviceId}`, deviceId)
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to reset notifications.');
        return throwHttpError(error);
      })
      .subscribe();
  }

  public update(device: DeviceEditModel) {
    this._http.put(this._endpoint + `/${device.id}`, device)
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to update device.');
        return throwHttpError(error);
      })
      .subscribe();
  }

  public updateSensors(device: DeviceDetailsModel) {
    this._http.put(this._endpoint + `/sensors/${device.id}`, device.sensors)
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to update device.');
        return throwHttpError(error);
      })
      .subscribe();
  }

  public updateRules(device: DeviceDetailsModel) {
    this._http.put(this._endpoint + `/rules/${device.id}`, {calculations: device.calculations, setPoints: device.setPoints})
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to update rules.');
        return throwHttpError(error);
      })
      .subscribe();
  }

  public delete(device: DeviceDetailsModel) {
    this._http.delete(this._endpoint + `/${device.id}`)
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to delete device.');
        return throwHttpError(error);
      })
      .subscribe(a =>
      {
        this.fetchDevicesSummary();
        this._router.navigate(['/dashboard']);
      });
  }

  public resetFilters() {
    this._searchTerm = '';
    this._filter = (dm) => true;
    this.filterAndSearch();
  }

  public filterAndSearch() {
    this._devicesSummary = this._allDevicesSummary.filter(d => (this._viewInactive || d.deviceStatus != 'INACTIVE') &&
      this._filter(d) &&
      (this._searchTerm.length === 0 || (d.modelName && d.modelName.toLowerCase().includes(this._searchTerm))));
    this.recalcStats();
    this._subject.next(this._devicesSummary);
  }

  public filterBy(filter: (DeviceModel) => boolean): void {
    this._filter = filter;
    this.filterAndSearch();
  }

  public search(searchTerm: string): void {
    this._searchTerm = searchTerm.toLowerCase();
    this.filterAndSearch();
  }

  public getDevice(id: number): Observable<DeviceDetailsModel> {
    return this._http.get(`${this._endpoint}/${id}`)
      .map(res => <DeviceDetailsModel>res.json())
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to get device information.');
        return throwHttpError(error);
      });
  }

  public export(id: string, selectedSensors: boolean[], from: number, to: number) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });

    return this._http.post(`${this._endpoint}/export`, {
        id: id,
        selectedSensors: selectedSensors,
        from: from,
        to: to},
      options)
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to get device information.');
        return throwHttpError(error);
      });
  }

  // TODO: these stats will come from the server once we are real time. They will get updated there and broadcast
  private recalcStats(): void {
    this.numErrors = 0;
    this.numActive = 0;
    this.numInactive = 0;

    this._devicesSummary.forEach(d => {
      if (d.deviceStatus === 'ERROR') {
        this.numErrors++;
      } else if (d.deviceStatus === 'ACTIVE') {
        this.numActive++;
      } else {
        this.numInactive++;
      }
    });
  }

  private fetchDevicesSummary(): void {
    let obs = this._http.get(this._endpoint + '/summary')
      .map(res => <DeviceModel[]>res.json())
      .catch((error: any) => {

      this._reportingService.report('Error', 'Couldn\'t load the devices summary.');

      return throwHttpError(error);
    });

    obs.subscribe(osd => {
      this._allDevicesSummary = osd;
      this._subjectAll.next(this._allDevicesSummary);

      this.subscribeToUpdates();

      this.filterAndSearch();
    });
  }

  private subscribeToUpdates() {
    this._socketsService.start();

    for(let oemId of this._allDevicesSummary.reduce((prev: Array<string>, curr) => {
      if(prev.findIndex(ae => ae == curr.oemId) < 0) {
        prev.push(curr.oemId);
      }

      return prev;
      }, [])) {
      this._socketsService.sub(oemId).subscribe();
    }

    this._socketsService.deviceData$.subscribe((ndd: NewDeviceDataModel) => {
      let d = this._allDevicesSummary.find(d => d.id == ndd.deviceId);

      d.measurements = ndd.dataPoints;
      d.deviceStatus = ndd.status;

      this.filterAndSearch();

      this._subjectAll.next(this._allDevicesSummary);
    });
  }
}
