import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NavigationModel } from '../model/navigation.model';
import { EndpointsModel } from '../model/endpoints.model';
import { catchError, map } from 'rxjs';
import { ChartOptions } from '../../types/CharOptions';
import { IApexChartData } from '../../types/ITemplate';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgClass } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-apex-chart',
    imports: [NgApexchartsModule, HttpClientModule, NgClass],
    templateUrl: './apexChart.component.html',
    styleUrl: './apexChart.component.css',
    encapsulation: ViewEncapsulation.None
})
export class ApexChartComponent {
    chartOptions!: Partial<ChartOptions> | any;
    table!: string | null
    column!: string | null
    apexChartData!: IApexChartData
    showData!: boolean 
    content!: any

    @Input()
    chart!: ApexChart

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private httpClient: HttpClient,
        private sanitizer: DomSanitizer
    ) {
        this.showData = false
       
        this.chartOptions = {
            series: [
                {
                    name: "",
                    data: [0]
                }
            ],
            chart: {
                type: "bar"
            }
        
        
           
        };
    }

    ngOnInit(): void {

        this.table = this.route.snapshot.paramMap.get('table')
        this.column = this.route.snapshot.paramMap.get('column')

        if (this.table && this.table !== "example") {

            let route: string = `${this.table}/${this.column}`

            this.httpClient.get<Array<Array<any>>>(`${NavigationModel.baseUrl}/${route}`)
                .pipe(
                    map((data: Array<Array<any>>) => {
                        // this.content = `\n\n\n\n\n${JSON.stringify(data)}`
                        this.contentFormating(data)
                        // console.log(this.table)
                        this.apexChartData = EndpointsModel.data[this.table!][this.column!](data)
                        // console.log(this.apexChartData)
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
            series: this.apexChartData.series ,
            chart: this.chart,
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: "100%"
                }
            },
            responsive: [{
                breakpoint: undefined,
                options: {},
            }],
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

    contentFormating(data: Array<Array<any>>) : void {
        let content: string = `<span style="color: orange">[</span><br/>`
        data.forEach((arr)=> {
            content += `<span style="color: orange; padding-left: 0.5vw"> [</span><br/>`
            arr.forEach((obj)=> {
                content += `<span style="color: gold; padding-left: 1vw">  {</span><br/>`
                for (const key in obj) {
                    content +=
                        `<span style="color: gold; padding-left: 1.5vw">"</span>
                        <span style="color: #50a0ff;">${key}</span>
                        <span style="color: gold; ">"</span>
                        <span style="color: aqua; ">:</span>
                        <span style="color: gold; ">"</span>
                        <span style="color: #cdcdcd; ">${obj[key]}</span>
                        <span style="color: gold; ">"</span>
                        <span style="color: aqua; ">,</span>
                        <br/>`
                }
                content += `<span style="color: gold; padding-left: 1vw">  }</span><span style="color: aqua; ">,</span><br/>`
            })
            content += `<span style="color: orange; padding-left: 0.5vw"> ]</span><br/>`
        })
        content += `<span style="color: orange">[</span><br/>`

        this.content = this.sanitizer
        .bypassSecurityTrustHtml(content)
    }

    dataTap() : void {
        this.showData = !this.showData
    }
}
