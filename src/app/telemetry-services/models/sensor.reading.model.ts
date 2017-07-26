import { DataPointModel } from './data.point.model';

export class SensorReadingModel {
  public id: number;
  public name: string;
  public unit: string;
  public metricName: string;
  public sensorType: string;
  public portNumber: number;
  public expression: string;
  public dataPoints: DataPointModel[];
}
