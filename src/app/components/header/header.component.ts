import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthenticationService } from "../../authentication/authentication.service";

import { CommonService } from '../../common-services/CommonService';

import { LoginModalComponent } from "../../authentication/login-modal/login-modal.component";
import { Location } from '@angular/common';
import {Router,NavigationStart} from "@angular/router";
import {gravatarUrl} from "../../shared/utils/gravatar";
import {EditUserProfileModalComponent} from "../../authentication/edit-user-profile-modal/edit-user-profile-modal.component";
import {ChangePasswordModalComponent} from "../../authentication/change-password-modal/change-password-modal.component";
import {ForgotPasswordModalComponent} from "../../authentication/forgot-password-modal/forgot-password-modal.component";
import {ResetPasswordModalComponent} from "../../authentication/reset-password-modal/reset-password-modal.component";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('loginModal') loginModal: LoginModalComponent;
  @ViewChild('registerModal') registerModal: EditUserProfileModalComponent;
  @ViewChild('changePasswordModal') changePasswordModal: ChangePasswordModalComponent;
  @ViewChild('forgotPasswordModal') forgotPasswordModal: ForgotPasswordModalComponent;
  @ViewChild('resetPasswordModal') resetPasswordModal: ResetPasswordModalComponent;

  public landingpath:boolean = false;

  public get gravatar() {
    if(!this.authService.isAuthenticated) {
      return '';
    }

    return gravatarUrl(this.authService.user);
  }

  public get username() {
    if(!this.authService.isAuthenticated) {
      return '';
    }

    return this.authService.user;
  }

  public login() {
    this.loginModal.open().then(result => {
      if(result) {
        if(result === true) {
          this.router.navigate(['/dashboard']);
        } else if(result === 'register') {
          this.registerModal.open().then(result => {
            if(result === true) {
              this.router.navigate(['/dashboard']);
            }
          });
        } else if(result === 'forgot') {
          this.forgotPassword();
        }
      }
    });
  }

  public logout() {
    this.authService.logout();
    window.location.href = '/';
  }

  public changePassword() {
    this.changePasswordModal.open();
  }

  public editProfile() {
    this.authService.getProfile()
      .subscribe(result => {
        this.registerModal.open(result).then(result => {
          if(result === true) {
            this.router.navigate(['/dashboard']);
          }
        });
      });
  }

  public forgotPassword() {
    this.forgotPasswordModal.open().then(result => {
      if(result) {
        if(result === 'reset') {
          this.resetPassword();
        }
      }
    });
  }

  public resetPassword() {
    this.resetPasswordModal.open().then(result => {
      if(result) {
        if(result === 'reset') {
          this.resetPassword();
        }
      }
    });
  }

  constructor(public authService: AuthenticationService, public router: Router,private commonService: CommonService ,private location: Location) { 
    router.events.subscribe((val) => {
      if(val instanceof NavigationStart) {
        if(val.url=="/"){
          this.landingpath = true;
        }else if(val.url=="/dashboard"){
          this.landingpath = false;
        }else{
          this.landingpath = false;
        }
      }
        
    });
  }

  ngOnInit() {

     this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'demo-user') {  
          this.loginModal.demoOpen(res.value).then(result => {
            if(result) {
              if(result === true) {
                this.router.navigate(['/dashboard']);
              } else if(result === 'register') {
                this.registerModal.open().then(result => {
                  if(result === true) {
                  this.router.navigate(['/dashboard']);
                  }
                });
              } else if(result === 'forgot') {
                this.forgotPassword();
              }
            }
          });     
      }
    });
  }

}
