import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { SetPointConditionModel, SetPointModel } from '../../../telemetry-services/models/setpoint.model';
import { SensorsModel } from '../../../telemetry-services/models/sensors.model';
import { CalculationModel } from '../../../telemetry-services/models/calculation.model';

@Component({
  selector: 'set-point-modal',
  templateUrl: './set-point-modal.component.html',
  styleUrls: ['./set-point-modal.component.scss']
})
export class SetPointModalComponent implements OnInit {

  @ViewChild('contentSetPoint') modal: string;

  public setPoint: SetPointModel;
  public prevSetPoint: SetPointModel;
  public calculations: CalculationModel[];
  public sensors: SensorsModel;

  private mref: NgbModalRef;

  public add() {
    this.setPoint.conditions.push(new SetPointConditionModel());
  }

  public delete(ndx: number) {
    this.setPoint.conditions.splice(ndx, 1);
  }

  public open(setPoint: SetPointModel, sensors: SensorsModel, calculations: CalculationModel[]) {
    this.prevSetPoint = setPoint;
    this.sensors = sensors;
    this.calculations = calculations;
    this.setPoint = JSON.parse(JSON.stringify(setPoint));
    this.mref = this._modalService.open(this.modal, { size: 'lg', backdrop: 'static' });

    return this.mref.result;
  }

  public save() {
    this.prevSetPoint.name = this.setPoint.name ? this.setPoint.name : this.setPoint.conditions[0].parameterName;

    this.prevSetPoint.conditions = this.setPoint.conditions;

    this.prevSetPoint.warningMessage = this.setPoint.warningMessage;

    this.mref.close(this.prevSetPoint);
  }

  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
  }

}
