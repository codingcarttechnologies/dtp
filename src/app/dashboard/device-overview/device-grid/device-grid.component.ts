import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { DeviceModel } from '../../../telemetry-services/models/device.model';
import { SetPointModel } from '../../../telemetry-services/models/setpoint.model';
import { DataPointModel } from '../../../telemetry-services/models/data.point.model';
import { setPointCheck } from "../set-point-check";

@Component({
  selector: 'device-grid',
  templateUrl: './device-grid.component.html',
  styleUrls: ['./device-grid.component.scss']
})
export class DeviceGridComponent implements OnInit {

  @Input('devices') devices: Observable<DeviceModel[]>;
  @Input('title') title: string;

  public showDevice(deviceId) {
    this._router.navigate(['/device-details', deviceId]);
  }

  public setPointValue(setPoint: SetPointModel, measurements: DataPointModel[]) {
    if(!setPoint.conditions || setPoint.conditions.length == 0) {
      return 'n/a';
    }
    let measurement = measurements.find(m => m.sourceId === setPoint.conditions [0].parameterName);

    return measurement ? this.round(measurement.value) : 'n/a';
  }

  public setPointIcon(setPoint: SetPointModel, measurements: DataPointModel[]) {

    let stc = setPointCheck(setPoint, measurements);

    let p = stc.parameterName;
    let normal = stc.normal;



    if(p.indexOf('temp') >= 0 || p.indexOf('therm') >= 0) {
      return `/assets/images/temp-${normal ? 'normal' : 'high'}.png`;
    }

    if(p.indexOf('humidity') >= 0) {
      return `/assets/images/oil-${normal ? 'normal' : 'high'}.png`;
    }

    if(p.indexOf('gas') >= 0 || p.indexOf('water') >= 0 || p.indexOf('flow') >= 0) {
      return `/assets/images/flow-${normal ? 'normal' : 'high'}.png`;
    }

    return `/assets/images/elec-${normal ? 'normal' : 'high'}.png`;
  }

  public round(v) {
    if(v === Math.round(v)) {
      return v;
    }

    return Math.round(v * 100) / 100;
  }

  constructor(private _router: Router) { }

  ngOnInit() {
  }

}
