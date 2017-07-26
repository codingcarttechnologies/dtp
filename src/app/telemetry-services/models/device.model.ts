import { DataPointModel } from './data.point.model';
import { SetPointModel } from './setpoint.model';
import {AddressModel} from "./adrdress.model";
import {NewDeviceDataModel} from "./new.device.data.model";

export class DeviceModel {
  public id: string;
  public sysId: number;
  public oemId: string;
  public organization: string;
  public name: string;
  public modelNumber: string;
  public modelName: string;
  public serialNumber: string;
  public systemType: number;
  public measurements: DataPointModel[];
  public setPoints: SetPointModel[];
  public deviceStatus: string;
}
