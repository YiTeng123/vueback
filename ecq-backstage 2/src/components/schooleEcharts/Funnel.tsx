import { FunnelSeriesOption, ScatterSeriesOption } from "echarts/charts";
import { GridComponentOption, LegendComponentOption, TitleComponentOption, ToolboxComponentOption, TooltipComponentOption } from "echarts/components";

import { Echarts } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';

import type { PropType } from 'vue'

type EChartsOption = echarts.ComposeOption<
| TitleComponentOption
| ToolboxComponentOption
| TooltipComponentOption
| LegendComponentOption
| FunnelSeriesOption

>;
export default defineComponent({
    props: {
        moodData: Object as PropType<{ name: string }>,
        disabled: [Boolean, Number],

        title:String,
        name: String,
        barData: {
            // required: true,
            type: [String , Number],
            defaultValue:'0'
            
        },
        funnelData:{
            required: true,
            type:Object as PropType<Array<{name:string,value:number}>>,
        }

    },
    setup(prop, ctx) {
        const chartsDOM = ref()
        const store = inject<StoreTypes>('store')!
        let echarts = inject<Echarts>("mechart")!;//引入
        let echart: unknown

        watch([() => store.isPrint,()=>store.emoBar.total], ([_,newY]) => {
            // let echart = echarts.init(chartsDOM.value);
            // 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
            (option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
            (option!.title as EChtitle).textStyle.color = store.echartsColor;
            // (option!.series[0].label.color) = store.echartsColor;
            // (option!.yAxis.axisLabel.color) = store.echartsColor;
            // (option!.series[0].data) = [newY]

            option && (echart as echarts.EChartsType).setOption(option);

        })
        onMounted(() => {
            echart = echarts.init(chartsDOM.value);
            option && (echart as echarts.EChartsType).setOption(option);
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
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}%'
              },
            //   legend: {
            //     data: ['抑郁风险', '焦虑风险', '疲劳度', '压力值', '积极性','情绪值'],
            //   },
              series: [
                {
                  name: 'Funnel',
                  type: 'funnel',
                //   color: '#fff',
                  left: '15%',
                  top: 40,
                  bottom: 60,
                  width: '80%',
                  min: 0,
                  max: 100,
                  minSize: '0%',
                  maxSize: '100%',
                  sort: 'descending',
                  gap: 2,
                  label: {
                    show: true,
                    position: 'inside'
                  },
                  labelLine: {
                    length: 10,
                    lineStyle: {
                      width: 1,
                      type: 'solid'
                    }
                  },
                  itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                  },
                  emphasis: {
                    label: {
                      fontSize: 20
                    }
                  },
                  data: prop.funnelData
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
