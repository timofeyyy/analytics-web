import { Component, OnInit, Output, ViewChild } from '@angular/core';

import { ApexChartComponent } from '../apexChart.component';


@Component({
  selector: 'app-line',
  imports: [ApexChartComponent],
  templateUrl: './area.component.html',
  styleUrl: '../apexChart.component.css',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class AreaComponent {
  
  @Output()
  chart!: ApexChart

  constructor() {
    this.chart = {
      type: "area",
      toolbar: {
        show: true
      }
    }
  }
}



// this.chartOptions = {
//   series: [
//     {
//       name: "Net Profit",
//       data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
//     },
//     {
//       name: "Revenue",
//       data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
//     },
//     {
//       name: "Free Cash Flow",
//       data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
//     }
//   ],
//   chart: {
//     type: "bar"
//   },
//   plotOptions: {
//     bar: {
//       horizontal: false,
//       columnWidth: "55%"
//    }
//   },
//   dataLabels: {
//     enabled: false
//   },
//   stroke: {
//     show: true,
//     width: 2,
//     colors: ["transparent"]
//   },
//   xaxis: {
//     categories: [
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct"
//     ]
//   },
//   yaxis: {
//     title: {
//       text: "example"
//     }
//   },
//   fill: {
//     opacity: 1
//   },
//   tooltip: {
//     y: {
//       formatter: function(val: any) {
//         return "$ " + val + " thousands";
//       }
//     }
//   }
// };