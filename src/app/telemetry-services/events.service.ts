import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { throwHttpError } from '../shared/utils/http.error';

import { environment } from '../../environments/environment';

import { EventModel } from './models/event.model';
import {AuthHttp} from "../shared/jwt/auth.http.service";
import {EventReportingService} from "../shared/event-reporting-service/event-reporting.service";

@Injectable()
export class EventsService {

  private _endpoint: string = environment.apiAddress + 'events';

  constructor(private _http: AuthHttp, private _reportingService: EventReportingService) { }

  public pollRecentEvents(id?: number) {
    if (id === undefined) {
      return Observable.timer(10, environment.eventPollDelay)
        .flatMap(() => { return this._http.get(this._endpoint).map(res => <EventModel[]>res.json()); })
        .catch((error: any) => {
          this._reportingService.report('Error', 'Failed polling for new events.');
          return throwHttpError(error);
        });
    }

    return Observable.timer(10, environment.eventPollDelay)
      .flatMap(() => { return this._http.get(`${this._endpoint}/${id}`).map(res => <EventModel[]>res.json()); })
      .catch((error: any) => {
        this._reportingService.report('Error', 'Failed polling for new events.');
        return throwHttpError(error);
      });
  }

}
