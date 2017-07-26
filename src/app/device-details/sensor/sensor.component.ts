import {Component, OnInit, Input, OnChanges, DoCheck} from '@angular/core';

import { DataPointModel } from '../../telemetry-services/models/data.point.model';
import {SensorReadingModel} from "../../telemetry-services/models/sensor.reading.model";

@Component({
  selector: 'sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit, OnChanges {

  private _sensor: SensorReadingModel;

  @Input('sensor') set sensor(s: SensorReadingModel) {
    this._sensor = s;

    this.title = s.metricName;
    this.dataPoints = s.dataPoints;
    this.lastValue = this._sensor.dataPoints && this._sensor.dataPoints.length > 0 ? this._sensor.dataPoints [this._sensor.dataPoints.length - 1].value.toFixed(2).replace('.00', '') + this._sensor.unit : 'n/a';
  }

  public ngOnChanges() {
    this.lastValue = this._sensor.dataPoints && this._sensor.dataPoints.length > 0 ? this._sensor.dataPoints [this._sensor.dataPoints.length - 1].value.toFixed(2).replace('.00', '') + this._sensor.unit : 'n/a';
  }

  public title: string;
  public lastValue: string;
  public dataPoints: DataPointModel[];

  public chartColors = ['#e2625f', '#a0c160'];

  constructor() { }

  ngOnInit() {
  }

}
