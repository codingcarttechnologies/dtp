import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { SensorsModel } from '../../telemetry-services/models/sensors.model';
import {DeviceDetailsModel} from "../../telemetry-services/models/device.details.model";
import {DevicesService} from "../../telemetry-services/devices.service";

@Component({
  selector: 'manage-sensors-modal',
  templateUrl: './manage-sensors-modal.component.html',
  styleUrls: ['./manage-sensors-modal.component.scss']
})
export class ManageSensorsModalComponent implements OnInit {

  @ViewChild('content') modal: string;

  private device: DeviceDetailsModel;

  public sensors: SensorsModel;
  private prevSensors: SensorsModel;

  private mref: NgbModalRef;

  public open(sensors: SensorsModel, device: DeviceDetailsModel) {
    this.device = device;

    this.sensors = JSON.parse(JSON.stringify(sensors));
    this.prevSensors = sensors;

    this.mref = this._modalService.open(this.modal, { size: 'lg', backdrop: 'static' });

    return this.mref.result;
  }

  public save() {
    this.prevSensors.isNetwork = this.sensors.isNetwork;
    this.prevSensors.network = this.sensors.network;

    this.prevSensors.temp1 = this.sensors.temp1;
    this.prevSensors.temp1name = this.sensors.temp1 ? (this.sensors.temp1name ? this.sensors.temp1name : 'Temperature') : '';
    this.prevSensors.temp1unit = this.sensors.temp1 ? (this.sensors.temp1unit ? this.sensors.temp1unit : 'F') : '';

    this.prevSensors.temp2 = this.sensors.temp2;
    this.prevSensors.temp2name = this.sensors.temp2 ? (this.sensors.temp2name ? this.sensors.temp2name : 'Temperature') : '';
    this.prevSensors.temp2unit = this.sensors.temp2 ? (this.sensors.temp2unit ? this.sensors.temp2unit : 'F') : '';

    this.prevSensors.hum1 = this.sensors.hum1;
    this.prevSensors.hum1name = this.sensors.hum1 ? (this.sensors.hum1name ? this.sensors.hum1name : 'Humidity') : '';
    this.prevSensors.hum1unit = this.sensors.hum1 ? (this.sensors.hum1unit ? this.sensors.hum1unit : '-') : '';

    this.prevSensors.hum2 = this.sensors.hum2;
    this.prevSensors.hum2name = this.sensors.hum2 ? (this.sensors.hum2name ? this.sensors.hum2name : 'Humidity') : '';
    this.prevSensors.hum2unit = this.sensors.hum2 ? (this.sensors.hum2unit ? this.sensors.hum2unit : '-') : '';

    this.prevSensors.therm1 = this.sensors.therm1;
    this.prevSensors.therm1name = this.sensors.therm1 ? (this.sensors.therm1name ? this.sensors.therm1name : 'Thermocouple') : '';
    this.prevSensors.therm1unit = this.sensors.therm1 ? (this.sensors.therm1unit ? this.sensors.therm1unit : '-') : '';

    this.prevSensors.therm2 = this.sensors.therm2;
    this.prevSensors.therm2name = this.sensors.therm2 ? (this.sensors.therm2name ? this.sensors.therm2name : 'Thermocouple') : '';
    this.prevSensors.therm2unit = this.sensors.therm1 ? (this.sensors.therm2unit ? this.sensors.therm2unit : '-') : '';

    this.prevSensors.acc = this.sensors.acc;
    this.prevSensors.accname = this.sensors.acc ? (this.sensors.accname ? this.sensors.accname : 'AC Current') : '';
    this.prevSensors.accunit = this.sensors.therm1 ? (this.sensors.accunit ? this.sensors.accunit : '-') : '';

    this.prevSensors.gas = this.sensors.gas;
    this.prevSensors.gasname = this.sensors.gas ? (this.sensors.gasname ? this.sensors.gasname : 'Gas Flowmeter') : '';
    this.prevSensors.gasunit = this.sensors.therm1 ? (this.sensors.gasunit ? this.sensors.gasunit : '-') : '';

    this.prevSensors.adc1 = this.sensors.adc1;
    this.prevSensors.adc1name = this.sensors.adc1 ? (this.sensors.adc1name ? this.sensors.adc1name : 'ADC Channel') : '';
    this.prevSensors.adc1eq = this.sensors.adc1 ? this.sensors.adc1eq : '';
    this.prevSensors.adc1unit = this.sensors.therm1 ? (this.sensors.adc1unit ? this.sensors.adc1unit : '-') : '';

    this.prevSensors.adc2 = this.sensors.adc2;
    this.prevSensors.adc2name = this.sensors.adc2 ? (this.sensors.adc2name ? this.sensors.adc2name : 'ADC Channel') : '';
    this.prevSensors.adc2eq = this.sensors.adc2 ? this.sensors.adc2eq : '';
    this.prevSensors.adc2unit = this.sensors.therm1 ? (this.sensors.adc2unit ? this.sensors.adc2unit : '-') : '';

    this.prevSensors.toReadings(this.device.sensors);

    this._devicesService.updateSensors(this.device);

    this.mref.close(this.prevSensors);
  }

  constructor(private _modalService: NgbModal, private _devicesService: DevicesService) { }

  ngOnInit() {
  }

}
