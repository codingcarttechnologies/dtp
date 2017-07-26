import { Component, OnInit, Input } from '@angular/core';
import { SensorsModel } from "../../telemetry-services/models/sensors.model";

@Component({
  selector: 'edit-sensor-network',
  templateUrl: './edit-sensor-network.component.html',
  styleUrls: ['./edit-sensor-network.component.scss']
})
export class EditSensorNetworkComponent implements OnInit {

  @Input('sensors') sensors: SensorsModel;

  public autocheck(port) {
    if(this.sensors.network[port].name && this.sensors.network[port].name.length > 0) {
      this.sensors.network[port].sensorId = 'Port ' + port;
    } else {
      this.sensors.network[port].sensorId = undefined;
    }
  }

  constructor() { }

  ngOnInit() {
    if(!this.sensors.isNetwork) {
      this.sensors.network[0].metricName = "Temperature 1";
      this.sensors.network[1].metricName = "Temperature 2";
      this.sensors.network[2].metricName = "Humidity 1";
      this.sensors.network[3].metricName = "Humidity 2";
      this.sensors.network[4].metricName = "Thermocouple 1";
      this.sensors.network[5].metricName = "Thermocouple 2";
      this.sensors.network[6].metricName = "AC Current";
      this.sensors.network[7].metricName = "Gas Flowmeter";
      this.sensors.network[8].metricName = "ADC Channel 1";
      this.sensors.network[9].metricName = "ADC Channel 2";
    }
  }

}
