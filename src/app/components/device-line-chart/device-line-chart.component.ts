import { Component, OnInit, Input } from '@angular/core';

declare let d3: any;

@Component({
  selector: 'device-line-chart',
  templateUrl: './device-line-chart.component.html',
  styleUrls: ['./device-line-chart.component.scss']
})
export class DeviceLineChartComponent implements OnInit {

  public data = [];
  public highcharts_data = [];
  public d = new Date();
  public options_highchart:any;
  @Input('colors') colors;
  @Input('unit') unit;
  @Input('values') set values (values) {
    let series = { key: 'Reading', values: [] };
    let highchart_series = [];
    values.forEach(element => {
      series.values.push({ label: Date.parse(element.timestamp), value: Math.round(element.value * 100) / 100});
      highchart_series.push([Date.parse(element.timestamp),Math.round(element.value * 100) / 100]);
    });

    this.data = [series];
    this.highcharts_data = highchart_series;
    
    // this.highcharts_data = [
    //   [this.d.setDate(this.d.getDate() - 4) , 2],
    //   [this.d.setDate(this.d.getDate() + 1), 4],
    //   [this.d.setDate(this.d.getDate() + 1), 3],
    //   [this.d.setDate(this.d.getDate() + 1), 1],
    //   [this.d.setDate(this.d.getDate() + 1), 2]
    // ]

    // console.log(this.highcharts_data);


     this.options_highchart  = {
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
              data:this.highcharts_data
          }]

      } 

  }

  // public options = {
  //   chart: {
  //     type: 'stackedAreaChart',
  //     margin: {
  //       top: 20,
  //       right: 35,
  //       bottom: 20,
  //       left: 18
  //     },
  //     x: function (d) { return d.label; },
  //     y: function (d) { return d.value; },
  //     rightAlignYAxis: true,
  //     duration: 500,
  //     showControls: false,
  //     showLegend: false,
  //     controlLabels: {stacked: 'Stacked'},
  //     clipEdge: false,
  //     height: 180,
  //     useInteractiveGuideline: true,
  //     color: ['#e2625f', '#a0c160'],
  //     xAxis: {tickFormat: function(d) {
  //         return d3.time.format('%b %d [%H:%M:%S]')(new Date(d));
  //       }},
  //     yAxis: {tickFormat: function(d) { return d.toFixed(2).replace('.00', ''); }}
  //     }
  //   };


  


  constructor() { }

  ngOnInit() {
    

  }

}
