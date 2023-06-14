import { Echarts } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';
import type { PropType } from 'vue'
import { LegendComponentOption, TooltipComponentOption } from 'echarts/components';
import { PieSeriesOption } from 'echarts/charts';

type EChartsOptions = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;
export default defineComponent({
  props: {
    moodData: Object as PropType<{ name: string }>,
    disabled: [Boolean, Number],

    title: String,
    name: String,
    pieData: {
      required: true,
      type: Object as PropType<Array<{ [x: string]: any, name: string, value: number }>>

    }

  },

  setup({ title, pieData }, ctx) {
    const chartsDOM = ref()
    const store = inject<StoreTypes>('store')!
    let echarts = inject<Echarts>("mechart")!;//引入
    let echart: unknown

    watch([() => pieData, () => store.isPrint, () => store.emoBar.total], ([_, newY]) => {
      // let echart = echarts.init(chartsDOM.value);
      // 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
      // (option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
      // (option!.title as EChtitle).textStyle.color = store.echartsColor;
      // (option!.series[0].label.color) = store.echartsColor;
      // (option!.yAxis.axisLabel.color) = store.echartsColor;
      // (option!.series[0].data) = [newY]

      // option && (echart as any).setOption(option);

    })
    onMounted(() => {
      echart = echarts.init(chartsDOM.value);
      option && (echart as any).setOption(option);
    })

    let nameMap: Record<string, any> = {
      ['normal']: '无须关注',
      ['keyGirl']: '需关注女生',
      ['keyBoy']: '需关注男生'
    }
    let newPieData: Array<{ name: string, value: number }> = []
    pieData.forEach(v => {
      if (nameMap[v.name]) {
        newPieData.push({
          name: nameMap[v.name],
          value: v.value
        })
      }
    })

    let option: EChartsOptions = reactive({
      title: {
        text: title,
        textStyle: {
          fontSize: 16,
          color: store.echartsColor
        },
      },
     
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '10%',
        left: 'center',
        textStyle: {
          fontSize: 16,
          color: store.echartsColor
        },
      },
      series: [
        {
          center: ['50%','60%'],
          name: title,
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              color: store.echartsColor
            }
          },
          labelLine: {
            show: false
          },
          data: newPieData
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
