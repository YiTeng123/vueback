import { Echarts, EChartsOption } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';
import type { PropType } from 'vue'
// 量表条形图
export default defineComponent({
    props: {
        moodData: Object as PropType<{ name: string }>,
        disabled: [Boolean, Number],

        title:String,
        name: String,
        // barData: {
           // required: true,
        //     type: [String , Number],
        //     defaultValue:'0'
            
        // }

    },

    setup({title}, ctx) {
        const chartsDOM = ref()
        const store = inject<StoreTypes>('store')!
        let echarts = inject<Echarts>("mechart")!;//引入
        let echart: unknown


        console.log(store.emoBar.total,'store.emoBar.total,store.emoBar.total')
      
        onMounted(() => {
            echart = echarts.init(chartsDOM.value);
            option && (echart as echarts.EChartsType).setOption(option);
        })
        // 抑郁phq,焦虑gad7

        let option: EChartsOption = reactive({
            textStyle: {
                fontSize: 20,
                color: store.echartsColor
            },
            title: {
                text:'',
                textStyle: {
                    fontSize: 20,
                    color: store.echartsColor
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                splitLine: { show: false },//坐标轴在 grid 区域中的分隔线
                axisLabel: { show: false },//坐标轴刻度标签
                axisTick: { show: false },//坐标轴刻度
                axisLine: { show: false },//坐标轴轴线
            },
            yAxis: {
                type: 'category',
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    color: store.echartsColor,
                    fontSize: 15
                },
                data: ['' ]
            },
            series: [
                {
                    name: '%',
                    type: 'bar',
                    barWidth: 20,
                    data:[] ,
                    color: 'rgba(255,255,255,0.5)',
                    label: {
                        show: true,
                        position: 'right',
                        offset: [0, -30],
                        color: store.echartsColor,
                        fontSize: 20
                    },
                    itemStyle: {
                        borderRadius: 10,
                        // borderWidth: 5,
                        // borderColor: store.echartsColor
                    },
                    zlevel: 1//柱状图所有图形的 zlevel 值
                },
                {
                    name: '进度条背景',
                    type: 'bar',
                    barGap: '-100%',//不同系列的柱间距离，为百分比。
                    // 在同一坐标系上，此属性会被多个 'bar' 系列共享。
                    // 此属性应设置于此坐标系中最后一个 'bar' 系列上才会生效，
                    //并且是对此坐标系中所有 'bar' 系列生效。
                    barWidth: 20,
                    data: [100],
                    color: {
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 0.5, color: 'yellow' // 100% 处的颜色
                        }, {
                            offset: 1, color: 'green' // 100% 处的颜色
                        }]
                    },//柱条颜色
                    itemStyle: {
                        borderRadius: 10,
                        // color:'transparent',
                    }
                },
            ]
        })

        console.log(option,'option')
        watch([() => store.isPrint,], () => {
           
            // let echart = echarts.init(chartsDOM.value);
            // 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
            (option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
            (option!.title as EChtitle).textStyle.color = store.echartsColor;
            (option!.series[0].label.color) = store.echartsColor;
            (option!.yAxis.axisLabel.color) = store.echartsColor;
            option && (echart as echarts.EChartsType).setOption(option);

        })

        return () => (
            <>
            {console.log(store.emoBar.total,'store.emoBar.total  [store.emoBar.total]')}
         <div style='display:none'>{(  option!.series[0].data=[store.emoBar.total])}</div> 
                <div class='charts2' ref={chartsDOM}></div>
               
                <style >
                    {
                        `
                        .charts2{
                            width: 40%;
                            height: 100%;

                        }
                        `
                    }
                </style>
            </>
        )
    }
})
