import { SetPointModel } from './setpoint.model';
import { CalculationModel } from './calculation.model';
import { SensorReadingsModel } from './sensor.readings.model';
import {AddressModel} from "./adrdress.model";

export class DeviceDetailsModel {
  public id: string;
  public deviceStatus: string;
  public sysId: number;
  public oemId: string;
  public organization: string;
  public systemType: string;
  public modelNumber: string;
  public modelName: string;
  public imageURL: string;
  public serialNumber: string;
  public sensors: SensorReadingsModel = new SensorReadingsModel();
  public calculations: CalculationModel[];
  public setPoints: SetPointModel[];
  public name: string;
  public productSerialNumber: string;
  public address: AddressModel;
  public email: string;
  public phoneNumber: string;
  public sendSms: boolean;
  public sendEmail: boolean;
}
