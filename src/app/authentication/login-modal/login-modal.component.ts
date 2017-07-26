import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  @ViewChild('content') modal: string;
  private mref: NgbModalRef;

  public user: {email: string, password: string};
  public error: string = '';

  public open() {
    this.error = '';
    this.user = {email: '', password: ''};

    this.mref = this._modalService.open(this.modal, { size: 'sm', backdrop: 'static' });

    return this.mref.result;
  }

  public demoOpen(user){
    this.error = '';
    this.user = user;

    this.mref = this._modalService.open(this.modal, { size: 'sm', backdrop: 'static' });

    return this.mref.result;
  }

  public login() {
    this._authService.login(this.user.email, this.user.password)
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

  public register() {
    this.mref.close('register');
  }

  public forgot() {
    this.mref.close('forgot');
  }

  constructor(private _modalService: NgbModal, private _authService: AuthenticationService) { }

  ngOnInit() {
  }

}
