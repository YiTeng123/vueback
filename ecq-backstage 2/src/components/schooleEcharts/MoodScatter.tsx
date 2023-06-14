import { Echarts, EChartsOption } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';
import type { PropType } from 'vue'
import { GridComponentOption, ScatterSeriesOption } from 'echarts';
type EChartsOptions = echarts.ComposeOption<
    GridComponentOption | ScatterSeriesOption
>;
export default defineComponent({
    props: {
        moodData: {
            type: Object as PropType<Array<[number, number]>>,
            defaultValue: '0'

            // required: true
        },
        Xtype:{
            type:Object as (PropType<'value'> |PropType<'category'>),
            default: 'value'
        },
        disabled: [Boolean, Number],
        title: String,


    },

    setup({ title, moodData, Xtype}, ctx) {
        const chartsDOM = ref()
        const store = inject<StoreTypes>('store')!
        let echarts = inject<Echarts>("mechart")!;//引入
        let echart: unknown
        watch([() => store.isPrint, () => store.emoBar.total], ([_, newY]) => {
            // let echart = echarts.init(chartsDOM.value);
            // 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
            // (option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
            // (option!.title as EChtitle).textStyle.color = store.echartsColor;
            // (option!.series[0].label.color) = store.echartsColor;
            // (option!.yAxis.axisLabel.color) = store.echartsColor;
            // (option!.series[0].data) = [newY]

            option && (echart as any).setOption(option);

        })
        onMounted(() => {
            echart = echarts.init(chartsDOM.value);
            option && (echart as any).setOption(option);
        })

        let option: EChartsOptions = reactive({
            title: {
                text: title,

                textStyle: {
                    fontSize: 16,
                    color: store.echartsColor
                },
            },
            xAxis: {
                type: Xtype,

                axisLine: {
                    interval: 0, //设置为0，表示不隔开显示标签
                    formatter: '{value}',//显示数值类型的标签
                    lineStyle: {
                        width: 1,
                        color: store.echartsColor
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        width: 1,
                        color: store.echartsColor
                    }
                },
            },
            series: [
                {
                    symbolSize: 20,
                    // 小圆点的背景颜色
                    // color: 'rgba(255,255,255,0.5)',
                    data: moodData,
                    type: 'scatter'
                }
            ]



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
