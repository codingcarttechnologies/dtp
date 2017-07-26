import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ProfilesModel } from '../../../telemetry-services/models/profiles.model';
import { CalculationModel } from '../../../telemetry-services/models/calculation.model';
import { SetPointModel } from '../../../telemetry-services/models/setpoint.model';
import { SensorsModel } from '../../../telemetry-services/models/sensors.model';

import { CalculationModalComponent } from '../../../device-details/manage-rules-modal/calculation-modal/calculation-modal.component';
import { SetPointModalComponent } from '../../../device-details/manage-rules-modal/set-point-modal/set-point-modal.component';
import {ProfilesService} from "../../../telemetry-services/profiles.service";

@Component({
  selector: 'edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  @ViewChild('calculationModal') calculationModal: CalculationModalComponent;
  @ViewChild('setPointModal') setPointModal: SetPointModalComponent;

  public profile: ProfilesModel;
  public calculations: CalculationModel[];
  public setPoints: SetPointModel[];
  public sensors: SensorsModel;
  private prevSensors: SensorsModel;

  private mref: NgbModalRef;
  private persist: boolean;

  public open(profile: ProfilesModel, persist: boolean = true) {
    this.profile = profile;
    this.calculations = profile.calculations;
    this.setPoints = profile.setPoints;
    this.sensors = JSON.parse(JSON.stringify(profile.uiSensors));
    this.prevSensors = profile.uiSensors;
    this.persist = persist;

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

    if(this.persist) {
      if(this.profile.id && this.profile.id.length > 0) {
        this.profile.uiSensors.toReadings(this.profile.sensors);

        this._profilesService.update(this.profile);
      } else {
        this.profile.uiSensors.toReadings(this.profile.sensors);
        this.profile.calculations = this.calculations;
        this.profile.setPoints = this.setPoints;

        this._profilesService.add(this.profile);
      }
    } else {
      this.profile.uiSensors.toReadings(this.profile.sensors);
      this.profile.calculations = this.calculations;
      this.profile.setPoints = this.setPoints;
    }

    this.mref.close(this.profile);
  }

  public delete() {
    this._profilesService.delete(this.profile);
    this.mref.close();
  }

  public addCalc() {
    this.calculationModal.open(new CalculationModel())
      .then((result: CalculationModel) => {if(result) {
        this.calculations.push(result);
        }
      });
  }

  public editCalc(calculation: CalculationModel) {
    this.calculationModal.open(calculation);
  }

  public deleteCalc(calculation: CalculationModel) {
    this.calculations.splice(this.calculations.findIndex(c => c.id === calculation.id), 1);
  }

  public addSetP() {
    this.setPointModal.open(new SetPointModel(), this.sensors, this.calculations)
      .then((result: SetPointModel) => {if(result) {
        this.setPoints.push(result);
      }
    });
  }

  public editSetP(setP: SetPointModel) {
    this.setPointModal.open(setP, this.sensors, this.calculations);
  }

  public deleteSetP(setP: SetPointModel) {
    this.setPoints.splice(this.setPoints.findIndex(c => c.id === setP.id), 1);
  }

  constructor(private _modalService: NgbModal, private _profilesService: ProfilesService) { }

  ngOnInit() {
  }

}
