import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BehaviorSubject } from 'rxjs';

import { throwHttpError } from '../shared/utils/http.error';

import { environment } from '../../environments/environment';

import { ProfilesModel } from './models/profiles.model';
import {SensorsModel} from "./models/sensors.model";
import {AuthHttp} from "../shared/jwt/auth.http.service";
import {EventReportingService} from "../shared/event-reporting-service/event-reporting.service";

@Injectable()
export class ProfilesService {

  private _endpoint: string = environment.apiAddress + 'profiles';

  private _subject: BehaviorSubject<ProfilesModel[]> = new BehaviorSubject<ProfilesModel[]>([]);
  private _profiles: ProfilesModel[] = [];

  public getProfiles(): BehaviorSubject<ProfilesModel[]> {
    let obs = this._http.get(this._endpoint)
      .map(res => <ProfilesModel[]>res.json())
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed getting the list of profiles.');
        return throwHttpError(error);
      });

    obs.subscribe(osd => {
      this._profiles = osd;
      this.readSensors();
      this._subject.next(this._profiles);
    });

    return this._subject;
  }

  public add(profile: ProfilesModel) {
    this._http.post(this._endpoint, profile)
      .map(res => <ProfilesModel>res.json())
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to add new profile.');
        return throwHttpError(error);
      })
      .subscribe((newProf: ProfilesModel) => {
        profile.id = newProf.id;

        let s = new SensorsModel();
        s.fromReadings(profile.sensors);

        profile.uiSensors = s;

        this._profiles.push(profile);
      });
  }

  public update(profile: ProfilesModel) {
    this._http.put(this._endpoint + `/${profile.id}`, profile)
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to update profile.');
        return throwHttpError(error);
      })
      .subscribe();
  }

  public delete(profile: ProfilesModel) {
    this._http.delete(this._endpoint + `/${profile.id}`)
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed to delete profile.');
        return throwHttpError(error);
      })
      .subscribe(a =>
      {
        let p = this._profiles.filter(p => p.id != profile.id);
        this._profiles.splice.apply(this._profiles, [0, this._profiles.length].concat(<any>p));
      });
  }

  constructor(private _http: AuthHttp, private _reportingService: EventReportingService) { }

  private readSensors() {
    this._profiles.forEach(p => {
      let s = new SensorsModel();
      s.fromReadings(p.sensors);

      p.uiSensors = s;
    });
  }

}
