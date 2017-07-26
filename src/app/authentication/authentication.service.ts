import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {JwtHelper} from "../shared/jwt/jwt.helpers";
import {UserModel} from "./user.model";
import {AuthHttp} from "../shared/jwt/auth.http.service";
import {OemModel} from "../telemetry-services/models/oem.model";
import {ResetPasswordModel} from "./reset.password.model";

@Injectable()
export class AuthenticationService {

  private _helper = new JwtHelper();
  private _endpoint: string = environment.apiAddress;

  public user: string = '';
  private _token: string = '';

  public get isAuthenticated(): boolean {
    return this._token && this._token != '' && !this._helper.isTokenExpired(this._token);
  }

  public get isDexenAdmin(): boolean {
    if(!this.isAuthenticated)
      return false;

    let tinfo = this._helper.decodeToken(this._token);

    return tinfo.roles && tinfo.roles.indexOf('dexen_admin') >= 0;
  }

  public login(username: string, password: string): Observable<any> {
    this.logout();

    return this._http.post(this._endpoint + 'token', {username: username, password: password})
      .map(res => {
        let result = res.json();

        this.decodeAndStoreToken(result.access_token);

        return result;
      });
  }

  public logout() {
    this._token = '';
    this.user = '';
    localStorage.clear();
  }

  public register(user: UserModel) {
    return this._http.post(this._endpoint + 'account/register', user);
  }

  public update(oem: OemModel) {
    return this._http.post(this._endpoint + 'account/update', oem);
  }

  public getProfile() {
    return this._http.get(this._endpoint + 'account')
      .map(res => res.json());
  }

  public forgotPassword(email: string) {
    let model = new ResetPasswordModel();
    model.email = email;
    return this._http.post(this._endpoint + 'account/forgot', model);
  }

  public resetPassword(reset: ResetPasswordModel) {
    return this._http.post(this._endpoint + 'account/reset', reset);
  }

  public changePassword(user: any) {
    return this._http.post(this._endpoint + 'account/changepw', user);
  }

  public contactform(user: any){
    return this._http.post(this._endpoint + 'contact', user);
  }

  constructor(private _http: AuthHttp) {
    this.user = localStorage.getItem('dexen_user');
    this._token = localStorage.getItem('dexen_token');
  }

  private _loggedIn: boolean = false;

  private decodeAndStoreToken(token: string) {
    let tinfo = this._helper.decodeToken(token);

    this._token = token;
    this.user = tinfo.sub;

    localStorage.setItem('dexen_user', this.user);
    localStorage.setItem('dexen_token', this._token);
  }
}
