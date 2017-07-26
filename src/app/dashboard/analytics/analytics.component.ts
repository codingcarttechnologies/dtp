import { Component, OnInit } from '@angular/core';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  public showStatus = true;
  public showUptime = true;
  public showActiveIssues = true;

  constructor(private _config: NgbDropdownConfig) {
    _config.autoClose = true;
   }

  ngOnInit() {
  }

}
