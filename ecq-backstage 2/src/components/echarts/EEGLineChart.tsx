
import { Echarts } from '@/App'
import { StoreTypes } from '@/store';
import { LineSeriesOption } from 'echarts/charts';
import { GridComponentOption } from 'echarts/components';
import { EChtitle } from '../types';

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption
>;
export default defineComponent({
	setup(prop, ctx) {
		const chartsDOM = ref()
		const store = inject<StoreTypes>('store')!
		let echarts = inject<Echarts>("mechart")!;//引入
		let echart: unknown
		watch(() => store.isPrint, () => {
			// let echart = echarts.init(chartsDOM.value);
			// 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
			(option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
			(option!.title as EChtitle).textStyle.color = store.echartsColor
			option && (echart as echarts.EChartsType).setOption(option);
		})
		onMounted(() => {
			echart = echarts.init(chartsDOM.value);
			option && (echart as echarts.EChartsType).setOption(option);
		})

		let mydata: Array<Array<string>> = [];
		let legendData = []
		if (store.generalRow?.eegResult?.rawData?.Alpha?.length > 0 || store.generalRow?.eegResult?.rawData?.channel1?.length > 0) {

			if (store.generalRow.eegResult.rawData.type === 'muse') {
				const { channel1, channel2, channel3, channel4 } = store.generalRow.eegResult.rawData
				legendData = ['TCP/左耳', 'AF7/左前额', 'AF8/右前额', 'TP10/右耳']
				mydata = [channel1, channel2, channel3, channel4]
			}
			else if (store.generalRow.eegResult.rawData.type === 'debay') {
				const { Delta, Theta, Alpha, Beta, Gamma } = store.generalRow.eegResult.rawData
				legendData = ['Delta', 'Theta', 'Alpha', 'Beta', 'Gamma']
				mydata = [Delta, Theta, Alpha, Beta, Gamma]
			}
		}
		console.log(mydata, 'mydata')
		// mydata

		// mydata[0] = [10, 20, 30, 40, 50, 60, 70, 80, 70, 60, 50, 40];
		// for (var ii = 1; ii < 4; ii++) {
		// 	mydata[ii] = mydata[0].map(function(x) { return x + ii * 5 });
		// }
		let option:EChartsOption = reactive(
			{
				textStyle: {
					fontSize: 20,
					color: store.echartsColor
				},
				title: {
					text: '脑电能谱图',
					textStyle: {
						fontSize: 20,
						color: store.echartsColor
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					left: 110,
					data: ['Delta', 'Theta', 'Alpha', 'Beta', 'Gamma'],
					textStyle: {
						fontSize: 20,
						color: '#fff'
					}
				},
				grid: {
					left: '3%',
					right: '3%',
					bottom: '10%',
					top: '25%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
					boundaryGap: false,
					axisLine: {
						lineStyle: {
							width: 1,
							color: '#fff'
						}
					},
					name: '',
					offset: 20
				},
				yAxis: [{
					type: 'value',
					name: 'Energy',
					splitLine: {
						lineStyle: {
							color: ['#fff']
						},
					},
					axisLine: {
						lineStyle: {
							width: 1,
							color: '#fff'
						}
					},
					min: -1000,
					max: 1000,
					// 间隔
					interval: 400,
				}],
				series: [{
					name: 'Delta',
					type: 'line',
					data: mydata[0],
					smooth: true
				},
				{
					name: 'Theta',
					type: 'line',
					data: mydata[1],
					smooth: true
				},
				{
					name: 'Alpha',
					type: 'line',
					data: mydata[2],
					smooth: true
				},
				{
					name: 'Beta',
					type: 'line',
					data: mydata[3],
					smooth: true
				},
				{
					name: 'Gamma',
					type: 'line',
					data: mydata[4],
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
