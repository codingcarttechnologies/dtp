import { Component, OnInit, Input } from '@angular/core';

import { DevicesService } from './../../../../telemetry-services/devices.service';
import { DeviceModel } from './../../../../telemetry-services/models/device.model';

import { Observable } from 'rxjs';

import { nvD3 } from 'ng2-nvd3';
declare let d3: any;

@Component({
  selector: 'active-issues-chart',
  templateUrl: './active-issues.component.html',
  styleUrls: ['./active-issues.component.scss']
})
export class ActiveIssuesComponent implements OnInit {

  public devices: Observable<DeviceModel[]>;

  public options: any;
  public data: any = [];
  public activeIssues: number;

  public options_highchart: any;

  constructor(private _devicesService: DevicesService) {
     this.options_highchart = {
          chart: {
            type: 'area',
            width: 320,
            height: 270,
          },
          title: {
            text: ''
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            allowDecimals: false,
            type: 'datetime',
            labels:{
              style: {
                color: 'black'
              }
            }
          },
          yAxis: {
            opposite:true,
            title: {
              text: ''
            },
            labels: {
              formatter: function () {
                return this.value.toFixed(0)+ '%';
              },
              style: {
                color: 'black'
              }
            }
          },
          plotOptions: {
            series: {
              //lineColor: '#303030'
            }
          },
          tooltip: {
            pointFormat: '<b>{point.y}</b>'
          },
          credits: {
            enabled: false
          },
          series: [{
            showInLegend: false,
            name: 'active issue',
            color:'#e2625f',
            size:230,
            data:[]
          }]
      }
  }

  ngOnInit() {
    this.devices = this._devicesService.getDevicesSummary();
    this.devices.subscribe(() => {

      let series = { key: 'Reading', values: [] };

      let d = new Date();
      series.values.push({ label: d.setDate(d.getDate() - 4), value: Math.floor((Math.random()*10)+1) });
      series.values.push({ label: d.setDate(d.getDate() + 1), value: Math.floor((Math.random()*10)+1) });
      series.values.push({ label: d.setDate(d.getDate() + 1), value: Math.floor((Math.random()*10)+1) });
      series.values.push({ label: d.setDate(d.getDate() + 1), value: Math.floor((Math.random()*10)+1) });
      series.values.push({ label: d.setDate(d.getDate() + 1), value: Math.floor((Math.random()*10)+1) });

      this.data.splice(0, this.data.length);
      this.data.push(series);

      this.activeIssues = series.values [series.values.length - 1].value;
    });
  }

  public saveInstance(chartInstance) {
    let d = new Date();

    let highchart_series  = [
      [d.setDate(d.getDate() - 4), Math.floor((Math.random()*10)+1)],
      [d.setDate(d.getDate() + 1), Math.floor((Math.random()*10)+1)],
      [d.setDate(d.getDate() + 1), Math.floor((Math.random()*10)+1)],
      [d.setDate(d.getDate() + 1), Math.floor((Math.random()*10)+1)],
      [d.setDate(d.getDate() + 1), Math.floor((Math.random()*10)+1)]
    ];

    if(chartInstance.series!=undefined && chartInstance.series[0].setData!=undefined) {
      chartInstance.series[0].setData(highchart_series,true,true);
    }
  }
}
