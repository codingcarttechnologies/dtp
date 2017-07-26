import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CalculationModel } from '../../../telemetry-services/models/calculation.model';

@Component({
  selector: 'calculation-modal',
  templateUrl: './calculation-modal.component.html',
  styleUrls: ['./calculation-modal.component.scss']
})
export class CalculationModalComponent implements OnInit {

  @ViewChild('contentCalc') modal: string;

  public calculation: CalculationModel;
  public prevCalculation: CalculationModel;

  private mref: NgbModalRef;

  public open(calculation: CalculationModel) {
    this.prevCalculation = calculation;
    this.calculation = JSON.parse(JSON.stringify(calculation));
    this.mref = this._modalService.open(this.modal, { size: 'lg', backdrop: 'static' });

    return this.mref.result;
  }

  public save() {
    this.prevCalculation.variableName = this.calculation.variableName;
    this.prevCalculation.expression = this.calculation.expression;
    this.prevCalculation.unit = this.calculation.unit;

    this.mref.close(this.prevCalculation);
  }

  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
  }

}
