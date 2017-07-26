import { Component, OnInit, Input, ViewChild } from '@angular/core';

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { CalculationModel } from '../../telemetry-services/models/calculation.model';
import { SetPointModel } from '../../telemetry-services/models/setpoint.model';
import { SensorsModel } from '../../telemetry-services/models/sensors.model';

import { CalculationModalComponent } from './calculation-modal/calculation-modal.component';
import { SetPointModalComponent } from './set-point-modal/set-point-modal.component';
import {DeviceDetailsModel} from "../../telemetry-services/models/device.details.model";
import {DevicesService} from "../../telemetry-services/devices.service";

@Component({
  selector: 'manage-rules-modal',
  templateUrl: './manage-rules-modal.component.html',
  styleUrls: ['./manage-rules-modal.component.scss']
})
export class ManageRulesModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  @ViewChild('calculationModal') calculationModal: CalculationModalComponent;
  @ViewChild('setPointModal') setPointModal: SetPointModalComponent;

  public calculations: CalculationModel[];
  public setPoints: SetPointModel[];
  public sensors: SensorsModel;

  private device: DeviceDetailsModel;
  private mref: NgbModalRef;

  public open(device: DeviceDetailsModel) {
    this.device = device;

    this.calculations = JSON.parse(JSON.stringify(device.calculations));
    this.setPoints = JSON.parse(JSON.stringify(device.setPoints));
    this.sensors = new SensorsModel();
    this.sensors.fromReadings(device.sensors);

    this.mref = this._modalService.open(this.modal, { size: 'lg', backdrop: 'static' });
  }

  public save() {
    this.device.calculations = this.calculations;
    this.device.setPoints = this.setPoints;

    this._devicesService.updateRules(this.device);

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
    this.calculations.splice(this.calculations.findIndex(c => c.variableName === calculation.variableName), 1);
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
    this.setPoints.splice(this.setPoints.findIndex(c => c.conditions[0].parameterName === setP.conditions[0].parameterName && c.warningMessage === setP.warningMessage), 1);
  }

  constructor(private _modalService: NgbModal, private _devicesService: DevicesService) { }

  ngOnInit() {
  }

}
