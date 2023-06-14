import { Echarts, EChartsOption } from '@/App'
import { backRes } from '@/interface';
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';

export default defineComponent({
	setup(prop, ctx) {
		const chartsDOM = ref()
		const store = inject<StoreTypes>('store')!
		let echarts = inject<Echarts>("mechart")!;//引入
		let echart: unknown
		let option: EChartsOption = reactive({
			color: [
				{
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
						offset: 0, color: '#90ee90' // 0% 处的颜色
					}, {
						offset: 1, color: '#00ffff' // 100% 处的颜色
					}]
				}, 'grey'],
			textStyle: {
				fontSize: 20,
				color: store.echartsColor
			},
			title: {
				text: '步态积极性',
				textStyle: {
					fontSize: 25,
					color: store.echartsColor
				},
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			tooltip: {
				show: false
			},
			legend: {
				top: '5%',
				left: 'center',
				textStyle: {
					color: store.echartsColor
				}
			},
			series: [
				{
					name: '步态积极性',
					type: 'pie',
					startAngle: 270,
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					emphasis: {
						scale: false,
						label: {
							show: true,
							fontSize: 40,
							fontWeight: 'bold',
							color: store.echartsColor
						}
					},
					label: {
						show: false,
						position: 'center'
					},
					labelLine: {
						show: false
					},
					// backgroundColor:'red',
					data: [
						{
							value: 80,
							name: 80 + '%'
						},
						{
							value: 20,
							name: ''
						}
					]
				}
			]
		})
		const originData: any = store.generalRow
		const { gaintestPoint } = originData
		if (gaintestPoint === '暂无数据') {
			option.series[0].data = [
				{
					value: 0,
					name: '暂无数据'
				},
				{
					value: 100,
					name: ''
				}
			]
		} else {
			const regex = /积极度：(.*)\s+消极度：/;
			const match = regex.exec(gaintestPoint)!;
			const echartsData = Number(match[1]) 
			option.series[0].data = [
				{
					value: echartsData,
					name: echartsData + '%'
				},
				{
					value: 100 - echartsData,
					name: ''
				}
			]
		}
		watch(() => store.isPrint, () => {
			// let echart = echarts.init(chartsDOM.value);
			// 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
			(option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
			(option.legend ).textStyle.color = store.echartsColor;

			(option!.title as EChtitle).textStyle.color = store.echartsColor
			option && (echart as echarts.EChartsType).setOption(option);

		})
		onMounted(() => {

			echart = echarts.init(chartsDOM.value);
			option && (echart as echarts.EChartsType).setOption(option);
		})




		return () => (
			<>
				<div class='chartso' ref={chartsDOM}></div>

				<style >
					{
						`
                        .chartso{
                            width: 90%;
                            height: 90%;
                        }
                        `
					}
				</style>
			</>
		)
	}
})
