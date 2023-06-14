import { BarSeriesOption, LineSeriesOption } from "echarts/charts";
import { GridComponentOption, LegendComponentOption, ToolboxComponentOption, TooltipComponentOption } from "echarts/components";

import { Echarts } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';

import type { PropType } from 'vue'

type EChartsOption = echarts.ComposeOption<
    | ToolboxComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    | BarSeriesOption
    | LineSeriesOption

>;
export default defineComponent({
    props: {
        title: String,
        gradeList: {
            type: Object as PropType<Array<string>>,
            required: true,
        },
        barData: {
            type: Object as PropType<Array<{ name: string, data: Array<number> }>>,
            required: true,
            default: []

        },
        yaxisName: {
            required: true,
            type: String,
        },
        legenList: {
            type: Object as PropType<Array<string>>,
            required: true,
            default: []

        },
        legenList_en: {
            type: Object as PropType<Array<string>>,
            required: true,
            default: []

        }

    },
    setup(prop, ctx) {
        const chartsDOM = ref()
        const store = inject<StoreTypes>('store')!
        let echarts = inject<Echarts>("mechart")!;//引入
        let echart: unknown
        // watch([() => prop.barData, () => store.isPrint, () => store.emoBar.total], ([_, newY]) => {
        //     // (option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
        //     // (option!.title as EChtitle).textStyle.color = store.echartsColor;
        //     // // (option!.series[0].label.color) = store.echartsColor;
        //     // // (option!.yAxis.axisLabel.color) = store.echartsColor;
        //     // // (option!.series[0].data) = [newY]


        //     // option && (echart as any).setOption(option);

        // })
        onMounted(() => {
            echart = echarts.init(chartsDOM.value);
            option && (echart as any).setOption(option);
        })
        type series = {
            name: string
            type: 'bar' | 'line'
            smooth?: boolean
            tooltip: object
            data: Array<number>
            barWidth?: number
        }[]
        let mseries: series = []
        console.log(prop.barData, 'barDatabarData')
        prop.barData.length !== 0 && prop.barData.forEach((v) => {
            let nameIndex = prop.legenList_en.indexOf(v.name)
            if (nameIndex != -1) {
                mseries.push({
                    name: prop.legenList[nameIndex],
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value: any) {
                            return (value as number) + '';
                        }
                    },
                    barWidth: 16,

                    data: v?.data?.map(v => { return typeof v == 'number' ? v : 0 })
                })
            }
        })
        mseries.push({
            name: '总分',
            type: 'line',
            smooth: true,
            tooltip: {
                valueFormatter: function (value: any) {
                    return (value as number) + '';
                }
            },
            data: prop.barData.filter(v => { return v.name == 'total' })[0]?.data?.map(v => { return typeof v == 'number' ? v : 0 })
        })

        let option: EChartsOption = reactive({
            title: {
                text: prop.title,
                textStyle: {
                    fontSize: 16,
                    color: store.echartsColor
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: store.echartsColor
                    }
                }
            },

            xAxis: [
                {
                    type: 'category',
                    data: prop.gradeList,
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel: {
                        color: store.echartsColor
                    }
                }
            ],
            legend: {
                top: '5%',
                data: prop.legenList,
                textStyle: {
                    color: store.echartsColor
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: prop.yaxisName,
                    nameTextStyle: {
                        color: store.echartsColor

                    },
                    min: 0,
                    max: 100,
                    interval: 20,

                    axisLabel: {
                        formatter: '{value} ',
                        color: store.echartsColor
                    }
                },
                {
                    type: 'value',
                    name: 'Temperature',
                    nameTextStyle: {
                        color: 'transparent'

                    },
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C',
                        color: 'transparent'
                    }
                }
            ],
            series: mseries

        })


        return () => (
            <>
                <div class='chartsMoodScatter' ref={chartsDOM}></div>

                <style tsx>
                    {
                        `
                        .chartsMoodScatter{
                            width: 100%;
                            height: 100%;

                        }
                        `
                    }
                </style>
            </>
        )
    }
})
