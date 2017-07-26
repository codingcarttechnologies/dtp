import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  private mref: NgbModalRef;

  public emailaddr: string = '';

  public open() {
    this.emailaddr = '';
    this.mref = this._modalService.open(this.modal, { size: 'sm', backdrop: 'static' });

    return this.mref.result;
  }

  public save() {
    this._authService.forgotPassword(this.emailaddr)
      .subscribe();

    this.mref.close('reset');
  }

  constructor(private _modalService: NgbModal, private _authService: AuthenticationService) { }

  ngOnInit() {
  }

}
