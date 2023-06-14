import { Echarts, EChartsOption } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';

type Eyegame = {
        [x:string]:any
       
    detail: {
        ability_mixture: string
        ability_single: string
    }
    eyemove: Array<[number, number]>
    name: string
    score: string
    time: number
}
export default defineComponent({
    setup ( prop , ctx ){
        const chartsDOM = ref()
        const store = inject<StoreTypes>('store')!
        let echarts = inject<Echarts>("mechart")!;//引入
        let echart: unknown
        watch(() => store.isPrint, () => {
            // let echart = echarts.init(chartsDOM.value);
            // 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
            (option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
            (option!.title as EChtitle).textStyle.color = store.echartsColor;
            (option!.legend as { textStyle: { color: string } }).textStyle.color = store.echartsColor;
            option && (echart as echarts.EChartsType).setOption(option);

        })
        onMounted(() => {
            echart = echarts.init(chartsDOM.value);
            option && (echart as echarts.EChartsType).setOption(option);
        })
        const isEysExist = store.generalRow.gamesPoint .find((item) => item.name === '认知灵活性')

        const arr = isEysExist?.eyemove ? [...isEysExist!.eyemove] : [];
        const FactoryArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i % 3 === 0) { // 每隔5个元素取一个
                FactoryArr.push(arr[i]);
            }
            if (FactoryArr.length === 33) { // 取到20个元素就停止
                break;
            }
        }
        const Ydata = isEysExist ? [...FactoryArr].map(([_, second]) => Math.round(second)) : []
        const Xdata = isEysExist ? [...FactoryArr].map(([first, _]) => Math.round(first)) : []
        const links = Ydata.map(function (item, i) {
            return {
                source: i,
                target: i + 1
            };
        });
        links.pop();


        var data = [];
        const screenWidth = 1920;
        const screenHeight = 1080;//屏幕分辨率，眼动的值应该在 0<x<screenWidth, 0<y<screenHeight(左上角为原点)
        var point;
        for (var i = 1; i <= 100; i++) {
            point = [Math.round(Math.random() * screenWidth), Math.round(Math.random() * screenHeight)];
            data.push(point);
        }
        let option: EChartsOption = reactive({
            textStyle: {
                fontSize: 20,
                color: store.echartsColor
            },
            title: {
                text: Ydata.length != 0 ? '眼动图谱' : '眼动暂无数据',
                textStyle: {
                    fontSize: 25,
                    color: store.echartsColor
                }
            },
            tooltip: {
                position: 'top',
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            // grid: {
            //     left: '3%',
            //     right: '3%',
            //     // bottom: '-22%',
            //     top: '20%',
            //     containLabel: true
            // },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: Xdata,
                axisLine: {
                    lineStyle: {
                        width: 1,
                        color: store.echartsColor
                    }
                },
                name: '',
            },

            yAxis: {
                show: true,

                position: 'top',
                nameGap: 15,
                axisLine: {
                    lineStyle: {
                        width: 1,
                        color: store.echartsColor,
                        show: true
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ['#fff']
                    },
                },
            },
            legend: {
                left: 110,
                textStyle: {
                    fontSize: 15,
                    color: store.echartsColor
                }
            },
            series: [
                {
                    color: ['skyblue'],
                    // symbolSize: 15,
                    type: 'graph',
                    layout: 'none',
                    coordinateSystem: 'cartesian2d',
                    symbolSize: 16,
                    label: {
                        // show: true
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    data: Xdata,

                    links: links,//连线
                    lineStyle: {
                        color: 'red',
                        size: 1
                    },
                    smooth: true
                }
            ]
        })


        return () => (
            <>
                <div class='charts' ref={chartsDOM}></div>

                <style tsx>
                    {
                        `
                        .charts{
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
