import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DevicesService } from '../../telemetry-services/devices.service';

@Component({
  selector: 'dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent implements OnInit {

  public search: FormControl = new FormControl();
  public expanded: boolean = false;

  public toggleSidebar() {
    this.expanded = !this.expanded;
  }

  constructor(private _devicesService: DevicesService) { }

  ngOnInit() {
    this.setupSearch();
  }

  private setupSearch(): void {
    var ts = this.search.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(s => {
        this._devicesService.search(s);
        return [];
      }).subscribe();
  }

}
