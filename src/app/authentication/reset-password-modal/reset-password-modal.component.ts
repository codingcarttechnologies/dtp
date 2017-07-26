import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../authentication.service";
import {ResetPasswordModel} from "../reset.password.model";

@Component({
  selector: 'reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  private mref: NgbModalRef;

  public reset: ResetPasswordModel = new ResetPasswordModel();
  public error: string;

  public open() {
    this.reset = new ResetPasswordModel ();
    this.error = '';

    this.mref = this._modalService.open(this.modal, { size: 'sm', backdrop: 'static' });

    return this.mref.result;
  }

  public save() {
    if(this.reset.confirmPassword != this.reset.password) {
      this.error = "Please check that your password and password confirmation match.";
    }

    this._authService.resetPassword(this.reset)
      .subscribe();

    this.mref.close('done');
  }

  constructor(private _modalService: NgbModal, private _authService: AuthenticationService) { }

  ngOnInit() {
  }

}
