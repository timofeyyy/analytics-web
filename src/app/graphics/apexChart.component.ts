import { Component, Input } from '@angular/core';
import { NavigationModel } from '../model/navigation.model';
import { EndpointsModel } from '../model/endpoints.model';
import { catchError, map } from 'rxjs';
import { ChartOptions } from '../../types/CharOptions';
import { IApexChartData } from '../../types/ITemplate';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
    selector: 'app-apex-chart',
    imports: [NgApexchartsModule, HttpClientModule],
    templateUrl: './apexChart.component.html',
    styleUrl: './apexChart.component.css'
})
export class ApexChartComponent {
    chartOptions!: Partial<ChartOptions> | any;
    table!: string | null
    column!: string | null
    apexChartData!: IApexChartData

    @Input()
    chart!: ApexChart

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private httpClient: HttpClient
    ) { }

    ngOnInit(): void {

        this.table = this.route.snapshot.paramMap.get('table')
        this.column = this.route.snapshot.paramMap.get('column')

        if (this.table && this.table !== "example") {

            let route: string = `${this.table}/${this.column}`

            this.httpClient.get<Array<Array<any>>>(`${NavigationModel.baseUrl}/${route}`)
                .pipe(
                    map((data: Array<Array<any>>) => {

                        console.log(this.table)
                        this.apexChartData = EndpointsModel.data[this.table!][this.column!](data)
                        console.log(this.apexChartData)
                        // this.storage.setData(data)
                        // this.router.navigate([route])
                        this.buildGraphic()

                    }),
                    catchError(err => {
                        alert(err.message)
                        this.router.navigate([`/main/template/${route}`])
                        return [];
                    })
                )
                .subscribe();
        }
        else {
            this.apexChartData = {
                categories: [
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct"
                ],
                series: [
                    {
                        name: "Net Profit",
                        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                    },
                    {
                        name: "Revenue",
                        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
                    },
                    {
                        name: "Free Cash Flow",
                        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
                    }
                ],
                yLabel: "example",
                xLabel: "example"
            }
            this.buildGraphic()
        }
    }

    buildGraphic(): void {
        this.chartOptions = {
            series: this.apexChartData.series,
            chart: this.chart,
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: "100%"
                }
            },
            colors: ['#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4',               
                '#90ee7e', '#f48024', '#69d2e7', 'brown', 'blue', 'black', 'gold'
            ],
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: this.apexChartData.categories,
                title: {
                    text: this.apexChartData.xLabel
                }
            }
        };
    }
}
