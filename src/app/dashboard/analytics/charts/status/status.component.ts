import { Component, OnInit, Input } from '@angular/core';

import { DevicesService } from './../../../../telemetry-services/devices.service';
import { DeviceModel } from './../../../../telemetry-services/models/device.model';

import { Observable } from 'rxjs';

import { nvD3 } from 'ng2-nvd3';
declare let d3: any;

@Component({
    selector: 'status-chart',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

    public devices: Observable<DeviceModel[]>;

    public options: any;
    public data: any;

    public options_highchart: any;

    constructor(private _devicesService: DevicesService) {
        this.options_highchart = {
            chart: {
                spacingBottom: 15,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10,
                width: 320,
                height: 400,
                type: 'pie'
            },
            responsive: {
              rules: [{
                condition: {
                  maxWidth: 330
                },
                chartOptions: {
                  legend: {
                    enabled: false
                  }
                }
              }]
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br/>{point.percentage:.1f}%',
                        style: {
                            color: 'black'
                        }
                    }
                }
            },
            series: [{
                type: "pie",
                name: 'Devices',
                size:230,
                colorByPoint: true,
                data: [ {
                    name: "Error",
                    y:0,
                    color:"#e2625f"
                }, {
                    name: "Active",
                    y: 0,
                    color:"#aece73"
                }, {
                    name: "Inactive",
                    y: 0,
                    color:"#ededed"
                }]
            }]
        };
    }

    public saveInstance(chartInstance) {
      if (chartInstance.series!=undefined && chartInstance.series[0].setData!=undefined) {
        chartInstance.series[0].setData([{
          name: "Error",
          //y:this._devicesService.numErrors,
          y:Math.floor((Math.random()*10)+1),
          color:"#e2625f"
        }, {
          name: "Active",
          //y: this._devicesService.numActive,
          y:Math.floor((Math.random()*10)+1),
          color:"#aece73"
        }, {
          name: "Inactive",
          //y: this._devicesService.numInactive,
          y:Math.floor((Math.random()*10)+1),
          color:"#ededed"
        }], true,(chartInstance.series[0].data.length > 10?true:false));
      }
    }

    ngOnInit() {
        this.devices = this._devicesService.getDevicesSummary();
        this.devices.subscribe(() => {

        });
    }

}
