import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ProfilesService } from '../../../telemetry-services/profiles.service';
import { DevicesService } from '../../../telemetry-services/devices.service';

import { ProfilesModel } from '../../../telemetry-services/models/profiles.model';

import {FileUploader} from "ng2-file-upload";
import {AddressModel} from "../../../telemetry-services/models/adrdress.model";
import {Countries} from "../../../shared/domains/country.domain";
import {States} from "../../../shared/domains/states.domain";
import {DeviceEditModel} from "../../../telemetry-services/models/device.edit.model";
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
  selector: 'add-device-modal',
  templateUrl: './add-device-modal.component.html',
  styleUrls: ['./add-device-modal.component.scss']
})
export class AddDeviceModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  private mref: NgbModalRef;

  public step: number = 1;

  public profiles: Observable<ProfilesModel[]>;
  public organizations: Observable<string[]>;

  public phoneRegex = /(^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$)|(^\d{10}$)/;    // TODO: move to a shared location
  public zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;    // TODO: move to a shared location

  public countries = Countries;
  public states = States;

  public device: DeviceEditModel;

  public imageSelected(img: string) {
    this.device.imageURL = img;
  }

  public prev() {
    this.step--;
  }

  public next() {
    this.step++;
  }

  public open(withReset: boolean) {
    if(withReset) {
      this.device = new DeviceEditModel();
    }

    this.mref = this._modalService.open(this.modal, { size: 'lg', backdrop: 'static' });

    return this.mref.result;
  }

  public save() {
    let dn = false;

    if(this.device.sensorNetwork == 'true') {
      dn = true;
    }

    this.mref.close({ sensorNetwork: dn, device: this.device });
  }

  constructor(private _modalService: NgbModal, private _profilesService: ProfilesService,
              private _devicesService: DevicesService, public authService: AuthenticationService) { }

  ngOnInit() {
    this.profiles = this._profilesService.getProfiles();
    this.organizations = this._devicesService.getAllOrganizations();
  }

}
