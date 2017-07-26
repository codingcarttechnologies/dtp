import {Component, OnInit, ViewChild} from '@angular/core';
import { UserModel } from "../user.model";

import { Countries } from '../../shared/domains/country.domain';
import { States } from '../../shared/domains/states.domain';
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../authentication.service";
import {OemModel} from "../../telemetry-services/models/oem.model";
import {isUndefined} from "util";

@Component({
  selector: 'edit-user-profile-modal',
  templateUrl: './edit-user-profile-modal.component.html',
  styleUrls: ['./edit-user-profile-modal.component.scss']
})
export class EditUserProfileModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  private mref: NgbModalRef;

  public phoneRegex = /(^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$)|(^\d{10}$)/;    // TODO: move to a shared location
  public zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;    // TODO: move to a shared location

  public open(oem: OemModel = undefined) {
    this.error = '';
    if(!isUndefined(oem)) {
      this.isNew = false;
      this.user.oem = oem;
    } else {
      this.isNew = true;
      this.user = new UserModel();
    }

    this.mref = this._modalService.open(this.modal, { size: 'lg', backdrop: 'static' });

    return this.mref.result;
  }

  public save() {
    if(this.isNew) {
      this.saveNew();
    } else {
      this.update();
    }
  }

  private update() {
    this._authService.update(this.user.oem)
      .catch(error => {
        this.error = 'Error saving profile information. Please check the data provided.';
        return ['error'];
      })
      .subscribe(result => {
        if(result != 'error') {
          this.mref.close(true);
        }
      });
  }

  private saveNew() {
    this._authService.register(this.user)
      .catch(error => {
        this.error = 'Error registering. Please check the data provided and make sure your password is at least 6 characters long, has at least a non-alphanumeric character and at least an uppercase character.';
        return ['error'];
      })
      .subscribe(result => {
        if(result != 'error') {
          this._authService.login(this.user.oem.email, this.user.password)
            .catch(error => {
              this.error = 'Error logging in. Please check email and password.';
              return ['error'];
            })
            .subscribe(result => {
              if(result != 'error') {
                this.mref.close(true);
              }
            });
        }
      });
  }

  public isNew = true;
  public user: UserModel = new UserModel();
  public countries = Countries;
  public states = States;
  public error: string = '';

  constructor(private _modalService: NgbModal, private _authService: AuthenticationService) { }

  ngOnInit() {
  }

}
