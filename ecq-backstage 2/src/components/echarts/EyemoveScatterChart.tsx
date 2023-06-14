import { Echarts, EChartsOption } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';

export default defineComponent({
	setup(prop, ctx) {
		const chartsDOM = ref()
		const store = inject<StoreTypes>('store')!
		let echarts = inject<Echarts>("mechart")!;//引入
		let echart:unknown
		watch(() => store.isPrint, () => {
			// let echart = echarts.init(chartsDOM.value);
			// 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
			(option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
			(option!.title as EChtitle).textStyle.color = store.echartsColor;
			(option!.legend as {textStyle:{color:string}}).textStyle.color = store.echartsColor;
			option && (echart as echarts.EChartsType).setOption(option);

		})
		onMounted(() => {
			 echart = echarts.init(chartsDOM.value);
			option && (echart as echarts.EChartsType).setOption(option);
		})
		const obj={
			name: 'echarts',
			age:2
		}
		var data = [];
		const screenWidth = 1920;
		const screenHeight = 1080;//屏幕分辨率，眼动的值应该在 0<x<screenWidth, 0<y<screenHeight(左上角为原点)
		var point;
		for (var i = 1; i <= 100; i++) {
			point = [Math.round(Math.random() * screenWidth), Math.round(Math.random() * screenHeight)];
			data.push(point);
		}
		//只显示100个数据，如果data超过100可以考虑截取
		//data = data.slice(0,99)
		// console.log(data);

		var CLUSTER_COUNT = 10;// 每组几个数据
		var COLOR_ALL = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#13227a'];
		var mseries = [];
		var legendData = [];
		for (var i = 0; i < CLUSTER_COUNT; i++) {
			mseries.push(
				{
					type: 'scatter',
					name: '第'+(i*10+1)+'到第'+(i+1)*10+'秒',
					symbolSize: 15,
					data: data.slice(i*CLUSTER_COUNT,(i+1)*CLUSTER_COUNT - 1),
					itemStyle: {
						color: COLOR_ALL[i],
						borderColor:store.echartsColor
					}
				}
			)
			legendData.push('第'+(i*10+1)+'到第'+(i+1)*10+'秒')
		}

		let option:EChartsOption= reactive( {
			textStyle: {
				fontSize: 20,
				color: store.echartsColor
			},
			title: {
				text: '眼动数据',
				textStyle: {
					fontSize: 25,
					color: store.echartsColor
				}
			},
			tooltip: {
				position: 'top'
			},
			grid: {
				left: '3%',
				right: '3%',
				bottom: '10%',
				top: '15%',
				containLabel: true
			},
			xAxis: {
				position: 'top',
				axisLine: {
					lineStyle: {
						width: 1,
						color: store.echartsColor
					}
				}
			},
			yAxis: {
				inverse: true,
				axisLine: {
					lineStyle: {
						width: 1,
						color: store.echartsColor
					}
				}
			},
			legend: {
				data: legendData,
				left: 110,
				textStyle: {
					fontSize: 15,
					color: store.echartsColor
				}
			},
			series: mseries
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
