import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { DeviceModel } from '../../../telemetry-services/models/device.model';
import { DataPointModel } from '../../../telemetry-services/models/data.point.model';
import { SetPointModel } from '../../../telemetry-services/models/setpoint.model';
import { setPointCheck } from "../set-point-check";

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  @Input('devices') devices: Observable<DeviceModel[]>;
  @Input('title') title: string;

  public setPointValue(setPoint: SetPointModel, measurements: DataPointModel[]) {
    if(!setPoint.conditions || setPoint.conditions.length == 0) {
      return 'n/a';
    }
    let measurement = measurements.find(m => m.sourceId === setPoint.conditions [0].parameterName);

    return measurement ? this.round(measurement.value) : 'n/a';
  }

  public setPointColor(setPoint: SetPointModel, measurements: DataPointModel[]) {

    let stc = setPointCheck(setPoint, measurements);





    if(stc.normal) {
      return 'oilNormal';
    }

    return 'oilHigh';
  }

  public round(v) {
    if (v === Math.round(v)) {
      return v;
    }

    return Math.round(v * 100) / 100;
  }

  public showDevice(deviceId) {
    this._router.navigate(['/device-details', deviceId]);
  }

  constructor(private _router: Router) { }

  ngOnInit() {
  }

}
