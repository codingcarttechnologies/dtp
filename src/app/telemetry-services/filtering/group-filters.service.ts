import { DeviceModel } from '../models/device.model';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { DevicesService } from '../devices.service';

@Injectable()
export class GroupFiltersService {

  public getGroups ():Observable<any> {
    return this._groups;
  }

  constructor(private _devicesService: DevicesService) {
    this.reset();
  }

  public reset(): void {
    this._groups = this._devicesService.getAllDevicesSummary()
      .map(ds =>
        ds.reduce((acc, curr: DeviceModel) => {
          if(acc.organizations [curr.organization]) {
            acc.organizations [curr.organization]++;
          } else {
            acc.organizations [curr.organization] = 1;
          }

          if(acc.types [curr.systemType]) {
            acc.types [curr.systemType]++;
          } else {
            acc.types [curr.systemType] = 1;
          }

          if(acc.conditions [curr.deviceStatus]) {
            acc.conditions [curr.deviceStatus]++;
          } else {
            acc.conditions [curr.deviceStatus] = 1;
          }

          return acc;
        }, {
          organizations: {},
          types: {},
          conditions: {}
        }));
  }

  public filterChanged(filter: (DeviceModel) => boolean): void {
    this._devicesService.filterBy(filter);
  }

  private _groups: Observable<any>;

}
