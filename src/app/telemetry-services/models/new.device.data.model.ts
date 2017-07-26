import {DataPointModel} from "./data.point.model";
import {EventModel} from "./event.model";

export class NewDeviceDataModel {
  public oemId: string;
  public deviceId: string;
  public status: string;

  public dataPoints: DataPointModel[];
  public notifications: EventModel[];
}
