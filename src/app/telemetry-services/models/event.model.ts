import {AddressModel} from "./adrdress.model";

export class EventModel {
  public id: number;
  public value: number;
  public unit: string;
  public name: string;
  public description: string;
  public timestamp: string;
  public sensorType: string;
  public deviceId: string;
  public address: AddressModel;
  public deviceName: string;
}
