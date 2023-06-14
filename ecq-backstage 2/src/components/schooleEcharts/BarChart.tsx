import { Echarts } from "@/App";
import { StoreTypes } from "@/store";
import { BarSeriesOption } from "echarts/charts";
import { GridComponentOption, TooltipComponentOption } from "echarts/components";
import { PropType } from "vue";
type EChartsOption = echarts.ComposeOption<
    TooltipComponentOption | GridComponentOption | BarSeriesOption
>;
export default defineComponent({

    props:{
        X:Object as PropType<Array<string>>,
        renderData:Object as PropType<Array<{name:string,data:Array<number>}>>
        
    },
    setup(prop, ctx) {
        console.log(prop,'prop')
        const chartsDOM = ref()
        const store = inject<StoreTypes>('store')!

        let echarts = inject<Echarts>("mechart")!;//引入
        let echart

        let renderSeries:any =[]
        prop.renderData?.forEach((item,index)=>{
            renderSeries.push({
                name:item.name,
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                data:item.data
            })
        })
        let option: EChartsOption = reactive({
            title: {
                text: '单项需关注比例',
                textStyle: {
                  fontSize: 16,
                  color: store.echartsColor
                },
              },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: prop.X
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series:renderSeries
            // series: [
            //     {
            //         name: 'Email',
            //         type: 'bar',
            //         barWidth: 50,
            //         stack: 'Ad',
            //         emphasis: {
            //             focus: 'series'
            //         },
            //         data: [120, 132, 101, 134, 90, 230, 210]
            //     },
            //     {
            //         name: 'Union Ads',
            //         type: 'bar',
            //         stack: 'Ad',
            //         emphasis: {
            //             focus: 'series'
            //         },
            //         data: [220, 182, 191, 234, 290, 330, 310]
            //     },
            //     {
            //         name: 'Video Ads',
            //         type: 'bar',
            //         stack: 'Ad',
            //         emphasis: {
            //             focus: 'series'
            //         },
            //         data: [150, 232, 201, 154, 190, 330, 410]
            //     },

            // ]
        })
        onMounted(() => {
            echart = echarts.init(chartsDOM.value);
            option && echart.setOption(option);
        })
        return () => (
            <>
                <div class='BarChart' ref={chartsDOM}></div>

                <style tsx>
                    {
                        `
                        .BarChart{
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





