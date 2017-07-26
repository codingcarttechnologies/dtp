import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { UserModel } from "../authentication/user.model";
import { OemModel } from "../telemetry-services/models/oem.model";
import { AuthHttp } from "../shared/jwt/auth.http.service";
import { EventReportingService } from "../shared/event-reporting-service/event-reporting.service";
import { throwHttpError } from "../shared/utils/http.error";
import { UserManagementModel } from "./user.management.model";

@Injectable()
export class UserManagementService {

  private _endpoint: string = environment.apiAddress + 'userManagement';

  // the parameter allows us to get all users or just the ones that are pending approval
  public getUsers(all: boolean): Observable<UserManagementModel[]> {
    return this._http.get(this._endpoint + `/users/${all}`)
      .map(res => <UserManagementModel[]>res.json())
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed getting the user list.');
        return throwHttpError(error);
      });
  }

  // get all organizations, regardless of whether or not they have devices, to be able to populate a select control with the valid ones
  public getOrganizations(): Observable<string[]> {
    return this._http.get(this._endpoint + `/organizations`)
      .map(res => <string[]>res.json())
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed getting the organizations list.');
        return throwHttpError(error);
      });
  }

  public approve(user:UserManagementModel) {
    this._http.post(this._endpoint + `/users/approve/${user.id}/${user.oemName}`, {})
      .map(res => res.json())
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to approve user.');
        return throwHttpError(error);
      })
      .subscribe(() => {
        this._reportingService.success('Success', 'Success to approve user.');
      });
  }

  public delete(user:UserManagementModel) {
    this._http.delete(this._endpoint + `/users/${user.id}`)
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to delete user.');
        return throwHttpError(error);
      })
      .subscribe(a => {
        this._reportingService.success('Success', 'Success to delete user.');
      });
  }


  

  constructor(private _http: AuthHttp, private _reportingService: EventReportingService) {
  }

}
