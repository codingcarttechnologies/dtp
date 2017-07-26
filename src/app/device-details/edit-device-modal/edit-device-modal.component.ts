import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DevicesService } from '../../telemetry-services/devices.service';

import { ProfilesModel } from '../../telemetry-services/models/profiles.model';

import {FileUploader} from "ng2-file-upload";
import {AddressModel} from "../../telemetry-services/models/adrdress.model";
import {Countries} from "../../shared/domains/country.domain";
import {States} from "../../shared/domains/states.domain";
import {DeviceEditModel} from "../../telemetry-services/models/device.edit.model";
import {DeviceModel} from "../../telemetry-services/models/device.model";
import {DeviceDetailsModel} from "../../telemetry-services/models/device.details.model";

@Component({
  selector: 'edit-device-modal',
  templateUrl: './edit-device-modal.component.html',
  styleUrls: ['./edit-device-modal.component.scss']
})
export class EditDeviceModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  private mref: NgbModalRef;

  public step = 1;

  public organizations: Observable<string[]>;

  public phoneRegex = /(^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$)|(^\d{10}$)/;    // TODO: move to a shared location
  public zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;    // TODO: move to a shared location

  public countries = Countries;
  public states = States;

  public device: DeviceEditModel;
  private dbdevice: DeviceDetailsModel;

  public prev() {
    this.step--;
  }

  public next() {
    this.step++;
  }

  public imageSelected(img: string) {
    this.device.imageURL = img;
  }

  public open(dbdevice: DeviceDetailsModel) {
    this.dbdevice = dbdevice;
    this.device = new DeviceEditModel();

    this.device.fromDevice(dbdevice);

    this.mref = this._modalService.open(this.modal, { size: 'lg', backdrop: 'static' });

    return this.mref.result;
  }

  public save() {
    this._devicesService.update(this.device);
    this.device.toDevice(this.dbdevice);

    this.mref.close();
  }

  public delete() {
    this._devicesService.delete(this.dbdevice);
    this.mref.close();
  }

  constructor(private _modalService: NgbModal, private _devicesService: DevicesService) { }

  ngOnInit() {
    this.organizations = this._devicesService.getAllOrganizations();
  }

}
