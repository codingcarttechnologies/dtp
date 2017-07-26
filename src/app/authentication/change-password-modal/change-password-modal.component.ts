import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  private mref: NgbModalRef;

  public open() {
    this.mref = this._modalService.open(this.modal, { size: 'sm', backdrop: 'static' });

    return this.mref.result;
  }

  public save() {
    this._authService.changePassword(this.user)
      .catch(error => {
        this.error = 'Error changing the password. Please check that the current password is correct and make sure your new password is at least 6 characters long, has at least a non-alphanumeric character and at least an uppercase character.';
        return ['error'];
      })
      .subscribe(result => {
        if(result != 'error') {
          this.mref.close(true);
        }
      });
  }

  public user = {oldPassword: '', password: '', confirmPassword: ''};
  public error: string = '';

  constructor(private _modalService: NgbModal, private _authService: AuthenticationService) { }

  ngOnInit() {
  }

}
