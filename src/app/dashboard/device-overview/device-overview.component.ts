import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { DevicesService } from '../../telemetry-services/devices.service';

import { DeviceModel } from '../../telemetry-services/models/device.model';
import { ProfilesModel } from '../../telemetry-services/models/profiles.model';

import { ManageProfilesModalComponent } from './manage-profiles-modal/manage-profiles-modal.component';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { AddDeviceModalComponent } from './add-device-modal/add-device-modal.component';
import { ManageSensorsModalComponent } from '../../device-details/manage-sensors-modal/manage-sensors-modal.component';
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.scss']
})
export class DeviceOverviewComponent implements OnInit {

  @Output() toggleFilteringOptions = new EventEmitter <void>();
  @ViewChild('profilesModal') profilesModal: ManageProfilesModalComponent;
  @ViewChild('editProfilesModal') editProfileModal: EditProfileModalComponent;
  @ViewChild('addDeviceModal') addDeviceModal: AddDeviceModalComponent;
  @ViewChild('sensorsModal') sensorsModal: ManageSensorsModalComponent;

  public devices: Observable<DeviceModel[]>;

  public listView: boolean = false;
  public groupBy: string = 'organization';

  public addDevice() {
    this.addDeviceModal.open(true)
      .then((result: any) => {if(result) {
        if(result.device.profile === '-- Create Custom Profile --') {
          let profile: ProfilesModel = new ProfilesModel();

          profile.sensors.sensorNetwork = result.sensorNetwork;
          profile.uiSensors.isNetwork = result.sensorNetwork;

          this.editProfileModal.open(profile, false)
            .then((iresult: ProfilesModel) => {
              if(iresult) {
                result.device.profile = iresult;
                this.devicesService.add(result.device);
              }
            });
        } else {
          this.devicesService.add(result.device);
        }
      }
    });
  }

  public manageProfiles() {
    this.profilesModal.open()
      .then((result: any) => {if(result) {
        let profile: ProfilesModel = result;

        this.editProfileModal.open(profile);
        }
      });
  }

  public toggleView(): void {
    this.listView = !this.listView;
  }

  public toggleInactive(): void {
    this.devicesService.viewInactive = !this.devicesService.viewInactive;
  }

  public onToggleFilteringOptions(): void {
    this.toggleFilteringOptions.emit();
  }

  constructor(public devicesService: DevicesService, public authService: AuthenticationService) { }

  ngOnInit() {
    this.devices = this.devicesService.getDevicesSummary();
  }

}
