// echarts按需引入并依赖注入
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  VisualMapComponent,
  ToolboxComponent,
  ToolboxComponentOption,
} from 'echarts/components';
import {
  LineChart, BarChart, ScatterChart, PieChart, RadarChart, CustomChart,
  BarSeriesOption, LineSeriesOption, ScatterSeriesOption,
  PieSeriesOption, RadarSeriesOption, GraphChart,
  GraphSeriesOption, FunnelChart, FunnelSeriesOption, GaugeChart
} from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import Component from '@/components/component';
import { CanvasRenderer } from 'echarts/renderers';
import { Router, RouterView, useRouter } from 'vue-router';
import { useStore, StoreTypes } from '@/store';
import { KeepAlive } from 'vue'
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent,
  BarChart,
  ScatterChart,
  LineChart,
  PieChart,
  CustomChart,
  UniversalTransition,
  RadarChart,
  CanvasRenderer, GraphChart,
  ToolboxComponent,
  FunnelChart,
  GaugeChart
]);
export type Echarts = typeof echarts
export type EChartsOption = any
import { MyPromise } from '@/Hooks/useClass.hooks'
import http from '@/server/index'
export default defineComponent({
  setup(prop, ctx) {
    const router = useRouter()
    const store = useStore()
    provide('mechart', echarts)
    provide<Router>('router', router)
    provide<StoreTypes>('store', store)

    setTimeout(() => { console.log('settimeout') }, 0)
    const p = new MyPromise((resolve: Function, reject: Function) => {
      // setTimeout(() => {
      //   resolve(123)
      // }, 1000);
      resolve(1)
    })

    onMounted(() => {

      router.push(
        {
          name: 'index'
        }
      )
      store.keepAlive.length = 0
      store.tabPane.length = 0
    })
    return () => (<RouterView />)
  }
})
