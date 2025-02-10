import { IApexChartData, IBitDepthValueAnalytic, ISeries } from "../../types/ITemplate";

export class EndpointsModel {
    static data: any = {
        "microchips": {
            "bitdepthvalue1": (data: Array<Array<any>>): IApexChartData => {

                let apexChartData: IApexChartData = {
                    categories: [],
                    series: [],
                    yLabel: "производители",
                    xLabel: "битность"
                };


                let tmp: any = {}

                data.forEach((group: Array<any>) => {
                    let manufacturerName = group[0].manufacturerName
                    apexChartData.categories.push(manufacturerName)
                    tmp[manufacturerName] = {}

                    group.forEach((item: any) => {
                        if (item as IBitDepthValueAnalytic && 'bitDepthValue' in item) {
                            let obj: IBitDepthValueAnalytic = item
                            // console.log(obj)

                            let seriesIndex: number = apexChartData.series.findIndex(
                                (series: ISeries) => series.name === obj.bitDepthValue
                            )

                            if (seriesIndex === -1) {
                                apexChartData.series.push({
                                    name: obj.bitDepthValue,
                                    data: []
                                })
                            }
                        }
                    })
                })

                data.forEach((group: Array<any>) => {
                    let manufacturerName = group[0].manufacturerName
                    // apexChartData.categories.push(manufacturerName)
                    // tmp[manufacturerName] = {}

                    group.forEach((item: any) => {
                        if (item as IBitDepthValueAnalytic && 'bitDepthValue' in item) {
                            let obj: IBitDepthValueAnalytic = item
                            // console.log(obj)

                            // let seriesIndex: number = apexChartData.series.findIndex(
                            //     (series: ISeries) => series.name === obj.bitDepthValue
                            // )

                            // if (seriesIndex === -1) {
                            //     apexChartData.series.push({
                            //         name: obj.bitDepthValue,
                            //         data: []
                            //     })

                            // }
                            // else {
                                // console.log(obj.bitDepthValue, obj.manufacturerName)
                                if (tmp[manufacturerName][obj.bitDepthValue] === undefined) {
                                    tmp[manufacturerName][obj.bitDepthValue] = 0
                                }
                                tmp[manufacturerName][obj.bitDepthValue] += 1

                            // }


                        }
                    })
                    apexChartData.series.forEach((seriesItem: ISeries) => {
                        // console.log(tmp[manufacturerName][seriesItem.name])
                        // console.log(seriesItem.name)
                        if (tmp[manufacturerName][seriesItem.name] !== undefined) {
                            seriesItem.data.push(tmp[manufacturerName][seriesItem.name])
                        }
                        else {
                            seriesItem.data.push(0)

                        }
                    })
                })
                // console.log(tmp)


                return apexChartData;
            },
            "bitdepthvalue": (data: Array<Array<any>>): IApexChartData => {

                let apexChartData: IApexChartData = {
                    categories: [],
                    series: [{
                        name: "битность",
                        data: []
                    }],
                    yLabel: "битность",
                    xLabel: "количество"
                };

                data.forEach((group: Array<any>) => {
                    if (group[0] as IBitDepthValueAnalytic && 'bitDepthValue' in group[0]) {
                        let obj: IBitDepthValueAnalytic = group[0]
                        apexChartData.categories.push(obj.bitDepthValue)
                        apexChartData.series[0].data.push(group.length)

                    }
                })

                return apexChartData;
            }
        }
    }
}