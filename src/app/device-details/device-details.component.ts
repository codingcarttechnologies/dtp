import {Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DevicesService } from '../telemetry-services/devices.service';
import { EventsService } from '../telemetry-services/events.service';

import { EventModel } from '../telemetry-services/models/event.model';
import { DeviceDetailsModel } from '../telemetry-services/models/device.details.model';
import { SensorsModel } from '../telemetry-services/models/sensors.model';

import { ManageRulesModalComponent } from './manage-rules-modal/manage-rules-modal.component';
import { ManageSensorsModalComponent } from './manage-sensors-modal/manage-sensors-modal.component';
import {EditDeviceModalComponent} from "./edit-device-modal/edit-device-modal.component";
import {ExportModalComponent} from "./export-modal/export-modal.component";
import {SocketsService} from "../telemetry-services/realtime/sockets.service";
import {DataPointModel} from "../telemetry-services/models/data.point.model";
import {NewDeviceDataModel} from "../telemetry-services/models/new.device.data.model";

@Component({
  selector: 'device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit, OnDestroy {

  public device: DeviceDetailsModel = new DeviceDetailsModel();
  public sensors: SensorsModel = new SensorsModel();
  public recentEvents: EventModel[] = [];

  @ViewChild('editDeviceModal') deviceModal: EditDeviceModalComponent;
  @ViewChild('sensorsModal') sensorsModal: ManageSensorsModalComponent;
  @ViewChild('rulesModal') rulesModal: ManageRulesModalComponent;
  @ViewChild('exportModal') exportModal: ExportModalComponent;

  public editDevice() {
    this.deviceModal.open(this.device);
  }

  public manageSensors() {
    this.sensorsModal.open(this.sensors, this.device);
  }

  public manageRules() {
    this.rulesModal.open(this.device);
  }

  public export() {
    this.exportModal.open(this.device);
  }

  private readSensors(dm: DeviceDetailsModel) {
    this.sensors.fromReadings(dm.sensors);
  }

  constructor(
    private _route: ActivatedRoute,
    private _devicesService: DevicesService,
    private _eventsService: EventsService,
    private _socketsService: SocketsService,
    private _changeDetector: ChangeDetectorRef) { }

  private _unsubscribe = [];

  ngOnInit() {
    this._route.params
      .switchMap(params => this._devicesService.getDevice(params['deviceId']))
      .subscribe((dm: DeviceDetailsModel) => {
        this.device = dm;
        this.sensors.profileName = dm.modelName;
        this.readSensors(dm);
        this._changeDetector.detectChanges();
      });

    this._route.params
      .switchMap(params => this._eventsService.pollRecentEvents(params['deviceId']))
      .subscribe((evnts: EventModel[]) => this.recentEvents = evnts);

    this._unsubscribe.push(this._socketsService.deviceData$.subscribe((ndd: NewDeviceDataModel) => {
      if(ndd.deviceId != this.device.id)
        return;

      let ls = this.device.sensors.linkedSensors;

      for(let dp of ndd.dataPoints){
        let lsemsor = ls.find((s) => s.metricName == dp.sourceId);
        if(lsemsor && lsemsor.dataPoints){
          lsemsor.dataPoints.push(dp);
        }
      }

      let recentEvents: EventModel[] = ndd.notifications;
      for(let e of this.recentEvents) {
        recentEvents.push(e);
      }

      ls = ls.length < 100 ? ls : ls.splice(ls.length - 100);
      recentEvents.splice(2);

      this.device.sensors.linkedSensors = JSON.parse(JSON.stringify(ls));
      this.recentEvents = recentEvents;

      this._changeDetector.detectChanges();
      }));
  }

  ngOnDestroy() {
    for(let s of this._unsubscribe) {
      s.unsubscribe();
    }
  }
}
