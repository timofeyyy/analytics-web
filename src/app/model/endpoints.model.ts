import { IApexChartData, IBitDepthValue, ISeries } from "../../types/ITemplate";

export class EndpointsModel {
    static data: any = {
        "microchips": {
            // "bitdepthvalue1": (data: Array<Array<any>>): IApexChartData => {

            //     let apexChartData: IApexChartData = {
            //         categories: [],
            //         series: [],
            //         yLabel: "производители",
            //         xLabel: "битность"
            //     };


            //     let tmp: any = {}

            //     data.forEach((group: Array<any>) => {
            //         let manufacturerName = group[0].manufacturerName
            //         apexChartData.categories.push(manufacturerName)
            //         tmp[manufacturerName] = {}

            //         group.forEach((item: any) => {
            //             if (item as IBitDepthValue && 'bitDepthValue' in item) {
            //                 let obj: IBitDepthValue = item

            //                 let seriesIndex: number = apexChartData.series.findIndex(
            //                     (series: ISeries) => series.name === obj.bitDepthValue
            //                 )

            //                 if (seriesIndex === -1) {
            //                     apexChartData.series.push({
            //                         name: obj.bitDepthValue,
            //                         data: []
            //                     })
            //                 }
            //             }
            //         })
            //     })

            //     data.forEach((group: Array<any>) => {
            //         let manufacturerName = group[0].manufacturerName

            //         group.forEach((item: any) => {
            //             if (item as IBitDepthValue && 'bitDepthValue' in item) {
            //                 let obj: IBitDepthValue = item

            //                 if (tmp[manufacturerName][obj.bitDepthValue] === undefined) {
            //                     tmp[manufacturerName][obj.bitDepthValue] = 0
            //                 }
            //                 tmp[manufacturerName][obj.bitDepthValue] += 1

            //             }
            //         })
            //         apexChartData.series.forEach((seriesItem: ISeries) => {

            //             if (tmp[manufacturerName][seriesItem.name] !== undefined) {
            //                 seriesItem.data.push(tmp[manufacturerName][seriesItem.name])
            //             }
            //             else {
            //                 seriesItem.data.push(0)

            //             }
            //         })
            //     })


            //     return apexChartData;
            // },
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
                    if (group[0] as IBitDepthValue && 'bitDepthValue' in group[0]) {
                        let obj: IBitDepthValue = group[0]
                        apexChartData.categories.push(obj.bitDepthValue)
                        apexChartData.series[0].data.push(group.length)

                    }
                })

                return apexChartData;
            },
            "bitdepthvalue1": (data: Array<Array<any>>): IApexChartData => {
                let apexChartData: IApexChartData = {
                    categories: [],
                    series: [],
                    yLabel: "производители",
                    xLabel: "битность"
                };

                let tmp: Record<string, Record<string, number>> = {};
                let seriesSet: Set<string> = new Set();

                data.forEach((group) => {
                    let manufacturerName = group[0].manufacturerName;
                    apexChartData.categories.push(manufacturerName);
                    tmp[manufacturerName] = {};

                    group.forEach((item) => {
                        if ('bitDepthValue' in item) {
                            let obj: IBitDepthValue = item;
                            seriesSet.add(obj.bitDepthValue);

                            if (!tmp[manufacturerName][obj.bitDepthValue]) {
                                tmp[manufacturerName][obj.bitDepthValue] = 0;
                            }
                            tmp[manufacturerName][obj.bitDepthValue] += 1;
                        }
                    });
                });

                apexChartData.series = Array.from(seriesSet).map((bitDepth) => ({
                    name: bitDepth,
                    data: apexChartData.categories.map((manufacturer) =>
                        tmp[manufacturer][bitDepth] ?? 0
                    )
                }));

                return apexChartData;
            }
        }
    }
}