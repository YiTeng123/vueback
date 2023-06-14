import { Echarts, EChartsOption } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';
export default defineComponent({
	setup(prop, ctx) {
		const chartsDOM = ref()
		const store = inject<StoreTypes>('store')!
		let echarts = inject<Echarts>("mechart")!;//引入
		let echart:unknown

        let   cognitionGame = (store.generalRow.gamesPoint).find((item) => item.name === '认知灵活性')	
		


		watch(() => store.isPrint, () => {
			// let echart = echarts.init(chartsDOM.value);
			// 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
			(option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
			(option!.title as EChtitle).textStyle.color = store.echartsColor;
			(option!.yAxis ).axisLabel.color = store.echartsColor;
			(option!.series[0] ).label.color = store.echartsColor

			option && (echart as echarts.EChartsType).setOption(option);

		})
		onMounted(() => {
			 echart = echarts.init(chartsDOM.value);
			option && (echart as echarts.EChartsType).setOption(option);
		})
		let option: EChartsOption= reactive({
			textStyle: {
				fontSize: 25,
				color: store.echartsColor
			},
			title: {
				text:  cognitionGame ?  `眼动指标`:'眼动指标暂无结果',
				textStyle: {
					fontSize: 25,
					color: store.echartsColor
				},
			},
			grid: {
				left: '3%',
				right: '10%',
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
					fontSize: 24
				},
				data: ['专注指数']
			},
			series: [
				{
					name: '%',
					type: 'bar',
					barWidth: 20,
					data:    [ ,Number( cognitionGame?.eyemoveData?.focus )*100 ?? null],
					color: 'rgba(255,255,255,0.5)',
					label: {
						show: true,
						position: 'right',
						offset: [0, -40],
						color:store.echartsColor,
						fontSize: 25
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
					data: [100, 100],
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
					}
				},
			]
		})

		return () => (
			<>
				<div class='chartsx' ref={chartsDOM}></div>

				<style >
					{
						`
                        .chartsx{
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
