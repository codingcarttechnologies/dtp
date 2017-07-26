import {Component, OnInit, ViewChild} from '@angular/core';
import {DeviceModel} from "../../telemetry-services/models/device.model";
import {DeviceDetailsModel} from "../../telemetry-services/models/device.details.model";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DevicesService} from "../../telemetry-services/devices.service";

@Component({
  selector: 'export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss']
})
export class ExportModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  private mref: NgbModalRef;

  public device: DeviceDetailsModel;
  public dateTo;
  public dateFrom;
  public selectedSensors: boolean[] = [];

  public export() {
    this._devicesService.export(
      this.device.id,
      this.selectedSensors,
      Date.UTC(this.dateFrom.year, this.dateFrom.month - 1, this.dateFrom.day),
      Date.UTC(this.dateTo.year, this.dateTo.month - 1, this.dateTo.day))
    .map(res =>
    {
      let blob: Blob = res.blob();
      var downloadUrl= window.URL.createObjectURL(blob);
      window.open(downloadUrl, '_self');
    }).subscribe();
  }

  public open(dbdevice: DeviceDetailsModel) {
    this.device = dbdevice;

    this.mref = this._modalService.open(this.modal, { size: 'lg', backdrop: 'static' });

    return this.mref.result;
  }

  constructor(private _modalService: NgbModal, private _devicesService: DevicesService) {
    let now = new Date();
    this.dateTo = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    now.setDate(now.getDate() - 1);
    this.dateFrom = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

    for(let n = 0; n < 10; n++) {
      this.selectedSensors.push(true);
    }
  }

  ngOnInit() {
  }

}
