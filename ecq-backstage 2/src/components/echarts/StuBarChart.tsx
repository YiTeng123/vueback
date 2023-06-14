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


		let stroopGame
		let cognitionGame
		// 注意抗干扰 Stroop
		stroopGame = (store.generalRow.gamesPoint as unknown as Array<Eyegame>).find((item) => item.name === 'Stroop')
		// 认知灵活度
		cognitionGame = (store.generalRow.gamesPoint as unknown as Array<Eyegame>).find((item) => item.name === '认知灵活性')
		const { focus, reaction: stoopReaction, antiInterference } = stroopGame!.detail

		const { ability_mixture, ability_single, reaction, conversion_price } = cognitionGame!.detail

		const MathFotmat = (parmar: string, n: number) => Math.round(Number(parmar) * n)

		// 认知灵活度// cognitionGame
		// 10%简单任务能力
		const single = MathFotmat(ability_single, 0.1)
		// 30%复杂任务能力
		const difficult = MathFotmat(ability_mixture, 0.3)
		// 20%反应速度
		const react = MathFotmat(reaction, 0.2)
		// 40%任务转换能力
		const transformtion = MathFotmat(reaction, 0.4)

		// 注意抗干扰Stroop
		// 35%专注能力
		const focustion = MathFotmat(focus, 0.4)
		// 45%抗干扰
		const stroopAn = MathFotmat(antiInterference, 0.45)
		// 20%专注速度
		const focusSpeed = MathFotmat(stoopReaction, 0.20)

		let totalStroopGame = (focustion + stroopAn + focusSpeed) / 2
		// Object.values( stroopGame!.detail).forEach((item)=>{
		// 	totalStroopGame+=MathFotmat(item)
		// }) 
		let totalcognitionGame = (single + difficult + react + transformtion) / 2
		// Object.values( cognitionGame!.detail).forEach((item)=>{
		// 	totalcognitionGame+=MathFotmat(item)
		// }) 


		const totalGame = (totalStroopGame + totalcognitionGame)


		store.stuBar.stroop=totalStroopGame
		store.stuBar.cognition=totalcognitionGame
		store.stuLearnState = totalStroopGame+totalcognitionGame
		onUnmounted (()=>{
			store.stuLearnState=NaN
			store.stuBar.stroop=NaN
			store.stuBar.cognition=NaN
		})


		let option: EChartsOption = reactive({
			textStyle: {
				fontSize: 20,
				color: store.echartsColor
			},
			title: {
				text: '学习状态',
				textStyle: {
					fontSize: 25,
					color: store.echartsColor
				},
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			// legend: {
			// 	left: 110,
			// 	textStyle: {
			// 		fontSize: 12,
			// 		color: store.echartsColor
			// 	}
			// },
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				min: 0,
				max: 100,
				interval: 20
			},
			yAxis: {
				type: 'category',
				data: [`综合得分: ${totalGame}`, `认知灵活度: ${totalcognitionGame*2}`, `认知注意力: ${totalStroopGame*2}`],
				axisLabel: {
					textStyle: {
						fontSize: "21",
					},
				},


			},
			series: [
				{
					name: '专注能力',
					type: 'bar',
					barWidth: 29,
					stack: 'total',
					label: {
						// show: true,
						position: 'insideRight',
						formatter: zero_format()
					},
					emphasis: {
						focus: 'series'
					},
					data: [0, 0, focustion]
				},
				{
					name: '抗干扰能力',
					type: 'bar',
					stack: 'total',
					label: {
						// show: true,
						position: 'insideRight',
						formatter: zero_format()
					},
					emphasis: {
						focus: 'series'
					},
					data: [0, 0, stroopAn]
				},
				{
					name: '专注速度',
					type: 'bar',
					stack: 'total',
					label: {
						// show: true,
						position: 'insideRight',
						formatter: zero_format()
					},
					emphasis: {
						focus: 'series'
					},
					data: [0, 0, focusSpeed]
				},
				{
					name: '简单任务能力',
					type: 'bar',
					stack: 'total',
					label: {
						// show: true,
						position: 'insideRight',
						formatter: zero_format()
					},
					emphasis: {
						focus: 'series'
					},
					data: [0, single, 0]
				},
				{
					name: '复杂任务能力',
					type: 'bar',
					stack: 'total',
					label: {
						// show: true,
						position: 'insideRight',
						formatter: zero_format()
					},
					emphasis: {
						focus: 'series'
					},
					data: [0, difficult, 0]
				},
				{
					name: '反应速度',
					type: 'bar',
					stack: 'total',
					label: {
						// show: true,
						position: 'insideRight',
						formatter: zero_format()
					},
					emphasis: {
						focus: 'series'
					},
					data: [0, react, 0]
				},
				{
					name: '任务转换能力',
					type: 'bar',
					stack: 'total',
					label: {
						// show: true,
						position: 'insideRight',
						formatter: zero_format()
					},
					emphasis: {
						focus: 'series'
					},
					data: [0, transformtion, 0]
				},
				{
					name: '认知灵活度',
					type: 'bar',
					stack: 'total',
					label: {
						// show: true,
						position: 'insideRight',
						formatter: zero_format()
					},
					emphasis: {
						focus: 'series'
					},
					data: [totalStroopGame, 0, 0]
				},
				{
					name: '50%注意抗干扰',
					type: 'bar',
					stack: 'total',
					label: {
						// show: true,
						position: 'insideRight',
						formatter: zero_format()
					},
					emphasis: {
						focus: 'series'
					},
					data: [totalcognitionGame, 0, 0]
				}
			]
		})

		function zero_format() {
			return function (params: any) {
				if (params.value > 0) {
					return params.value;
				} else {
					return '';
				}
			}
		};


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
