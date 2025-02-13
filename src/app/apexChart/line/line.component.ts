import { Component, Output } from '@angular/core';
import { NavigationModel } from '../../model/navigation.model';
import { EndpointsModel } from '../../model/endpoints.model';
import { catchError, map } from 'rxjs';
import { ChartOptions } from '../../../types/CharOptions';
import { IApexChartData } from '../../../types/ITemplate';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexChartComponent } from "../apexChart.component";

@Component({
  selector: 'app-line',
  imports: [ApexChartComponent],
  templateUrl: './line.component.html',
  styleUrl: '../apexChart.component.css',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class LineComponent {
  
  @Output()
  chart!: ApexChart

  constructor() {
    this.chart = {
      type: "line"
    }
  }
}
