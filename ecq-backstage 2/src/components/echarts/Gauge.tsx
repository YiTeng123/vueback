import { Echarts, EChartsOption } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';
import type { PropType } from 'vue'
import { GaugeSeriesOption } from 'echarts/charts';
type EChartsOptions = echarts.ComposeOption<GaugeSeriesOption>;
// 量表条形图
export default defineComponent({
  props: {
    GugData: Number,
    disabled: [Boolean, Number],
    title: String,
    name: String,
    // barData: {
    // required: true,
    //     type: [String , Number],
    //     default:'0'

    // }

  },

  setup({ title ,GugData}, ctx) {
    const chartsDOM = ref()
    const store = inject<StoreTypes>('store')!
    let echarts = inject<Echarts>("mechart")!;//引入
    let echart: unknown
    onMounted(() => {
      echart = echarts.init(chartsDOM.value);
      option && (echart as echarts.EChartsType).setOption(option as any);
    })
    // 抑郁phq,焦虑gad7

    let option: EChartsOptions = reactive(
      
      {
        title: {
          show: true,
          text:'情绪状态',
          textStyle: {
            fontSize: 20,
            color: store.echartsColor
        },

        },
        tooltip: {				// 本系列特定的 tooltip 设定。	
          show: true,
              formatter: "{b}：{c}%",
              backgroundColor: "rgba(50,50,50,0.7)",	// 提示框浮层的背景颜色。注意：series.tooltip 仅在 tooltip.trigger 为 'item' 时有效。
              borderColor: "#333",		// 提示框浮层的边框颜色。...
              borderWidth: 0,				// 提示框浮层的边框宽。...
              padding: 5,					// 提示框浮层内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。...
              textStyle: {				// 提示框浮层的文本样式。...
                // color ,fontStyle ,fontWeight ,fontFamily ,fontSize ,lineHeight ,.......
              },
        },
        series: [
          {
            name: "单仪表盘示例",		
            type: 'gauge',
            radius:'150%',
            startAngle: 180,
            center: ["50%", "90%"],
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },

            progress: {
              show: true,
              roundCap: true,
              width: 18
            },
            pointer: {
              length: '75%',
              width: 0,
              offsetCenter: [0, '5%']
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 18
              }
            },
            axisTick: {
              splitNumber: 2,
              lineStyle: {
                width: 2,
                color: store.isPrint ? 'black' :'#999'
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 30,
              color: '#999',
              fontSize: 15
            },
            title: {
              show: true,
            },
            detail: {
              backgroundColor: '',
              borderColor: '',
              borderWidth: 0,
              width: '0%',
              lineHeight: 0,
              height: 0,
              borderRadius: 8,
              offsetCenter: [0, '35%'],
              // valueAnimation: true,
              formatter: function (value: any) {
                return '{value|' + value.toFixed(0) + '}{unit|km/h}';
              },
              rich: {
                value: {
                  fontSize: 50,
                  fontWeight: 'bolder',
                  color: 'transparent'
                },
                unit: {
                  fontSize: 20,
                  color: 'transparent',
                  padding: [0, 0, -20, 10]
                }
              }
            },
            data: [
              {
                value: GugData??store.emoBar.total
              }
            ]
          },

        ]
      },


    )

console.log(GugData,'2')

    watch([() => store.isPrint,], () => {
        (option!.title as EChtitle).textStyle.color = store.echartsColor;
        (option as any).series[0].axisTick.lineStyle.color =  store.isPrint ? 'black' :'#999',
        (option as any).series[0].splitLine.lineStyle.color =  store.isPrint ? 'black' :'#999',
        (option as any).series[0].axisLabel.color =  store.isPrint ? 'black' :'#999',
        option && (echart as echarts.EChartsType).setOption(option as any);

    })

    return () => (
      <>
        <div class='charts2' ref={chartsDOM}></div>
        <style >
          {
            `
                        .charts2{
                            width: 50%;
                            height: 100%;

                        }
                        `
          }
        </style>
      </>
    )
  }
})
