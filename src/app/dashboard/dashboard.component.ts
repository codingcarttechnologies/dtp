import {Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy} from '@angular/core';

import { Observable } from 'rxjs';

import { EventsService } from '../telemetry-services/events.service';
import { EventModel } from '../telemetry-services/models/event.model';

import { DashboardSidenavComponent } from './dashboard-sidenav/dashboard-sidenav.component';
import {SocketsService} from "../telemetry-services/realtime/sockets.service";
import {DevicesService} from "../telemetry-services/devices.service";
import {NewDeviceDataModel} from "../telemetry-services/models/new.device.data.model";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {

  public recentEventData: EventModel[] = [];

  @ViewChild(DashboardSidenavComponent)
  private _sidenavComponent: DashboardSidenavComponent;

  public toggleSidenav(): void {
    this._sidenavComponent.toggleSidebar();
  }

  constructor(private _eventsService: EventsService,
              public devicesService: DevicesService,
              private _socketsService: SocketsService,
              private _changeDetector: ChangeDetectorRef) { }

  private _unsubscribe = [];

  ngOnInit() {
    this._eventsService.pollRecentEvents()
      .subscribe(data => {
        this.recentEventData = data;
        this._changeDetector.markForCheck();
        this._changeDetector.detectChanges();
      });

    this._unsubscribe.push(this.devicesService.getAllDevicesSummary().subscribe(() => {
      this._changeDetector.detectChanges();
    }));

    this._unsubscribe.push(this._socketsService.deviceData$.subscribe((ndd: NewDeviceDataModel) => {
      let recentEvents: EventModel[] = ndd.notifications;

      for(let e of this.recentEventData) {
        recentEvents.push(e);
      }

      recentEvents.splice(2);

      this.recentEventData = recentEvents;

      this._changeDetector.markForCheck();
      this._changeDetector.detectChanges();
    }));
  }

  ngOnDestroy() {
    for(let s of this._unsubscribe) {
      s.unsubscribe();
    }
  }

}
