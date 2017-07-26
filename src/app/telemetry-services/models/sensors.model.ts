import {SensorReadingsModel} from "./sensor.readings.model";
import {SensorReadingModel} from "./sensor.reading.model";

export class SensorsModel {
  private telemetrySensorNames = ['Temperature 1', 'Temperature 2', 'Humidity 1', 'Humidity 2', 'Thermocouple 1', 'Thermocouple 2',
    'AC Current', 'Gas Flowmeter', 'ADC Channel 1', 'ADC Channel 2'];

  public fromReadings(srm: SensorReadingsModel) {
    this.network = [];
    for(let i = 0; i < 10; i++) {
      this.network.push({});
    }

    let readings = srm.linkedSensors;

    if(!readings) {
      this.isNetwork = true;
      return;
    }

    this.isNetwork = srm.sensorNetwork;

    if(this.isNetwork) {
      readings.forEach(s => {
        if(s.portNumber <= 9) {
          this.network[s.portNumber].id = s.id;
          this.network[s.portNumber].name = s.name;
          this.network[s.portNumber].sensorId = 'Port ' + s.portNumber;
          this.network[s.portNumber].metricName = s.metricName;
          this.network[s.portNumber].expression = s.expression;
          this.network[s.portNumber].unit = s.unit;
        }
      });
    } else {
      readings.forEach(s => {
        let port = this.telemetrySensorNames.indexOf(s.metricName);

        this.network[port].id = s.id;
        this.network[port].name = s.name;
        this.network[port].sensorId = 'Port ' + s.portNumber;
        this.network[port].metricName = s.metricName;
        this.network[port].expression = s.expression;
        this.network[port].unit = s.unit;
      });
    }
  }

  public toReadings(srm: SensorReadingsModel) {
    let readings = srm.linkedSensors;

    readings.forEach(s => {
      if(s.portNumber <= 9) {
        s.id = this.network[s.portNumber].id;
        s.name = this.network[s.portNumber].name;
        s.metricName = this.network[s.portNumber].metricName;
        s.expression = this.network[s.portNumber].expression;
        s.unit = this.network[s.portNumber].unit;
      }
    });

    let newReadings = readings.filter(r => r.name && r.name != '');

    let add = this.network.filter(s => readings.findIndex(rs => rs.name == s.name && rs.metricName == s.metricName) < 0);
    add.forEach(s => {
      if(!s.name || s.name == '') {
        s.id = 0;
        s.sensorId = '';
        s.metricName = '';
        s.expression = '';
        s.unit = '';
      } else {
        let sensor = new SensorReadingModel();
        sensor.id = s.id;
        sensor.name = s.name;
        sensor.metricName = s.metricName;
        sensor.expression = s.expression;
        sensor.portNumber = this.network.indexOf(s);
        sensor.unit = s.unit;
        sensor.dataPoints = [];
        newReadings.push(sensor);
      }
    });

    readings.splice.apply(readings, [0, readings.length].concat(<any>newReadings));
  }

  public isNetwork: boolean;

  public profileName: string;

  public temp1: boolean;
  public temp1name: string;
  public temp1unit: string;

  public temp2: boolean;
  public temp2name: string;
  public temp2unit: string;

  public hum1: boolean;
  public hum1name: string;
  public hum1unit: string;

  public hum2: boolean;
  public hum2name: string;
  public hum2unit: string;

  public therm1: boolean;
  public therm1name: string;
  public therm1unit: string;

  public therm2: boolean;
  public therm2name: string;
  public therm2unit: string;

  public acc: boolean;
  public accname: string;
  public accunit: string;

  public gas: boolean;
  public gasname: string;
  public gasunit: string;

  public adc1: boolean;
  public adc1name: string;
  public adc1eq: string;
  public adc1unit: string;

  public adc2: boolean;
  public adc2name: string;
  public adc2eq: string;
  public adc2unit: string;

  public network: any[];

  constructor() {
    this.network = [];
    for(let i = 0; i < 10; i++) {
      this.network.push({});
    }
  }
}
