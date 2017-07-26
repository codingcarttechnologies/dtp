import {SensorReadingModel} from "./sensor.reading.model";

export class SensorReadingsModel {
  public sensorNetwork: boolean;
  public linkedSensors: SensorReadingModel[] = [];

  public profileName: string;     // transient; support
}
