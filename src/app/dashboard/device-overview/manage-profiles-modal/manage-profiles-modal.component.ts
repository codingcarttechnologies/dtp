import { ProfilesModel } from '../../../telemetry-services/models/profiles.model';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ProfilesService } from '../../../telemetry-services/profiles.service';

@Component({
  selector: 'manage-profiles-modal',
  templateUrl: './manage-profiles-modal.component.html',
  styleUrls: ['./manage-profiles-modal.component.scss']
})
export class ManageProfilesModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  private mref: NgbModalRef;

  public profiles: Observable<ProfilesModel[]>;
  public selectedProfile: ProfilesModel;
  public newProfile: string;

  public open() {
    this.selectedProfile = undefined;
    this.newProfile = undefined;

    this.mref = this._modalService.open(this.modal, { size: 'lg', backdrop: 'static' });

    return this.mref.result;
  }

  public createNew() {
    let profile: ProfilesModel = new ProfilesModel();

    profile.name = this.newProfile;
    profile.sensors.profileName = this.newProfile;

    this.mref.close(profile);
  }

  public edit() {
    this.selectedProfile.sensors.profileName = this.selectedProfile.name;

    this.mref.close(this.selectedProfile);
  }

  constructor(private _modalService: NgbModal, private _profilesService: ProfilesService) { }

  ngOnInit() {
    this.profiles = this._profilesService.getProfiles();
  }

}
