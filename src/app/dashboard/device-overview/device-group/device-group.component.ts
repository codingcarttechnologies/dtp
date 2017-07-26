import { Component, OnInit, Input } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { DevicesService } from './../../../telemetry-services/devices.service';

import { DeviceModel } from './../../../telemetry-services/models/device.model';

@Component({
  selector: 'device-group',
  templateUrl: './device-group.component.html',
  styleUrls: ['./device-group.component.scss']
})
export class DeviceGroupComponent implements OnInit {

  @Input('list-view') listView: boolean;
  @Input('group-by') set groupBy(gb: string) {
    let sele = this._groupSelectors.find(s => s.key === gb);

    if (sele) {
      this._groupBy.next(sele.op);
    } else if(this._groupSelectors [0]) {
      this._groupBy.next(this._groupSelectors [0].op);
    }
  }

  private _groupBy = new BehaviorSubject<(any) => boolean>((device) => { return device.organization; });
  private _groupSelectors: any[] = [];
  public deviceGroups: Observable<DeviceModel[]>;

  constructor(private _devicesService: DevicesService) { }

  ngOnInit() {
    this.initGroupSelectors();
  }

  private initGroupSelectors() {
    this._groupSelectors.push({key: 'organization', op: (device) => { return device.organization; }});
    this._groupSelectors.push({key: 'type', op: (device) => { return device.systemType; }});
    this._groupSelectors.push({key: 'condition', op: (device) => { return device.deviceStatus; }});

    this.deviceGroups = this._devicesService.getDeviceGroups(this._groupBy);
  }

}
