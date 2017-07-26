import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { EventDetailsModalComponent } from './event-details-modal/event-details-modal.component';

import { EventModel } from '../../telemetry-services/models/event.model';

@Component({
  selector: 'recent-events',
  templateUrl: './recent-events.component.html',
  styleUrls: ['./recent-events.component.scss']
})
export class RecentEventsComponent implements OnInit {

  @Input('events') events: EventModel[] = undefined;
  @ViewChild('modal') modal: EventDetailsModalComponent;

  public showEventDetails(event: EventModel) {
    this.modal.open(event);
  }

  public formatValue(v: number): number {
    return Math.round(v * 10) / 10;
  }

  constructor() { }

  ngOnInit() {
  }

}
