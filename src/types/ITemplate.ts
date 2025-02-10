import { SafeResourceUrl } from "@angular/platform-browser";

export interface ILinks {
    url: string,
    safeUrl: SafeResourceUrl
}

export interface IApexChartData {
    categories: Array<string | number>,
    series: Array<ISeries>,
    yLabel: string,
    xLabel: string
}

export interface ISeries {
    name: string | number,
    data: Array<string | number>
}

export interface IBitDepthValueAnalytic {
    bitDepthValue: string,
    manufacturerName: string
}

export interface ISeriesData {
    name: []
}