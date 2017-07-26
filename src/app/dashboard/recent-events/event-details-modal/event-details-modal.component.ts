import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { EventModel } from '../../../telemetry-services/models/event.model';
import { DevicesService } from "../../../telemetry-services/devices.service";

@Component({
  selector: 'event-details-modal',
  templateUrl: './event-details-modal.component.html',
  styleUrls: ['./event-details-modal.component.scss']
})
export class EventDetailsModalComponent implements OnInit {

  @ViewChild('content') modal: string;

  public event: EventModel;

  public open(event: EventModel) {
    this.event = event;
    this._modalService.open(this.modal);
  }

  public resetNotifications() {
    this._devicesService.resetNotifications(this.event.deviceId);
  }

  constructor(private _modalService: NgbModal, private _devicesService: DevicesService) { }

  ngOnInit() {
  }

}
