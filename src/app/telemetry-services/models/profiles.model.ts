import { SetPointModel } from './setpoint.model';
import { CalculationModel } from './calculation.model';
import { SensorsModel } from './sensors.model';
import {SensorReadingsModel} from "./sensor.readings.model";

export class ProfilesModel {
  public id: string;
  public name: string;
  public systemType: string;

  public uiSensors: SensorsModel;
  public calculations: CalculationModel[];
  public setPoints: SetPointModel[];
  public sensors: SensorReadingsModel = new SensorReadingsModel();

  constructor() {
    this.uiSensors = new SensorsModel();
    this.calculations = [];
    this.setPoints = [];
  }
}
