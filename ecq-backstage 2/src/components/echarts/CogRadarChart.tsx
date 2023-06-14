import { Echarts, EChartsOption } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';
import { Eyegame } from './types';

export default defineComponent({
	setup(prop, ctx) {
		const chartsDOM = ref()
		const store = inject<StoreTypes>('store')!
		let echarts = inject<Echarts>("mechart")!;//引入
		let echart: unknown



		// 认知灵活度
		let cognitionGame = (store.generalRow.gamesPoint).find((item) => item.name === '认知灵活性')
		const difficulty = cognitionGame?.detail.ability_mixture
		const single = cognitionGame?.detail.ability_single
		const cognReaction = cognitionGame?.detail.reaction
		const transformation = cognitionGame?.detail.conversion_price
		watch(() => store.isPrint, () => {
			// let echart = echarts.init(chartsDOM.value);
			// 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
			(option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
			(option!.title as EChtitle).textStyle.color = store.echartsColor;
			option.radar.name.textStyle.color= store.echartsColor;
			option && (echart as echarts.EChartsType).setOption(option);

		})
		onMounted(() => {
			echart = echarts.init(chartsDOM.value);
			option && (echart as echarts.EChartsType).setOption(option);
		})
		let option: EChartsOption = reactive({
			textStyle: {
				fontSize: 24,
				color: store.echartsColor
			},
			title: {
				text: '认知灵活度',
				textStyle: {
					fontSize: 28,
					color: store.echartsColor
				},
			},
			// 雷达图配置grid无效
			// grid: {
			// 	top:'22%',
			// 	left: '10%',
			// 	right: '42%',
			// 	bottom: '3%',
			// 	// containLabel: true
			// },
			legend: {
				show: false
			},
			radar: {
				// shape: 'circle',
				center: ['50%', '50%'],
				// 设置雷达图大小
				radius: '80',
				name: {
					textStyle: {
						color: store.echartsColor,
						fontSize:"20px",
						// backgroundColor: '#999',
						borderRadius: 3,
						padding: [3, 5]
					}
				},
				indicator: [
					{ name: `复杂任务${difficulty ? difficulty : ''}`, max: 100 },
					{ name: `简单任务${single ? single : ''}`, max: 100 },
					{ name: `反应速度${cognReaction ?? ''}`, max: 100 },
					{ name: `任务转换${transformation ? Math.round(Number(transformation)) : ''}`, max: 100 }
				]
			},
			series: [
				{
					name: '认知灵活度',
					type: 'radar',
					areaStyle: {},
					data: [
						{
							value: cognitionGame ? [difficulty, single, cognReaction, transformation] : [],
							name: ''
						}
					]
				}
			]
		})
		return () => (
			<>
				<div class='charts' ref={chartsDOM}></div>

				<style >
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
