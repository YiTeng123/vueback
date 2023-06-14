import * as echarts from 'echarts';
import { Echarts, EChartsOption } from '@/App'
import { useStore } from '@/store';
import { EChtitle } from '../types';
export default defineComponent({
	setup(prop, ctx) {
		const chartsDOM = ref()
		const zero_format = () => {
			return function (params: any) {
				if (params.value > 0) {
					return params.value;
				} else {
					return ''
				}
			}
		};
		const regex = /积极度：(.*)\s+消极度：/;
		const store = useStore()
		// 步态部分
		let EmoGait
		console.log(store.generalRow.gaintestPoint, 'store.generalRow.gaintestPoint')
		if (store.generalRow.gaintestPoint !== '暂无数据') {
			const match = regex.exec(store.generalRow.gaintestPoint)!;
			const echartsData = Number(match[1])
			EmoGait = echartsData

		}
		else {
			EmoGait = 0
		}
		console.log(EmoGait, 'EmoGait')
		// 抑郁phq9
		const phq9 = Math.round((store.generalRow.cliAdvice?.phq9 * 100) / 27) ?? null
		// 焦虑gad7
		const gad7 = (store.generalRow.cliAdvice?.gad7) ? Math.round((store.generalRow.cliAdvice?.gad7 * 100 /21)) : 0
		

		//眼动游戏焦虑
		const cognitionGame = (store.generalRow.gamesPoint).find((item) => item.name === '认知灵活性')
		// const gameAnxiety = Math.round(Number(cognitionGame?.eyemoveData?.anxiety) * 0.5)

		// 脑电疲劳度
		const eegTired = Math.round(Number(store.generalRow.eegResult?.tired) * 0.5) ?Math.round(Number(store.generalRow.eegResult?.tired) * 0.5): 25

		// 表情
		const faceData: Array<string> = store.generalRow.looktestPoint
		// 表情疲劳度
		const getNumberFromString = (str: string): number => {
			var arr = str.split(':');
			var numStr = arr[1];
			var num = parseInt(numStr);
			return num;
		}
		const faceTired = faceData[0] !== '表情评测无数据' ? Math.round(Number(getNumberFromString(faceData[2])) * 0.5) : 0

		// 脑电压力值
		const eegPresure = Math.round(Number(store.generalRow.eegResult?.presure) * 0.5) ? Math.round(Number(store.generalRow.eegResult?.presure) * 0.5):25
		// 表情压力值
		const facePresure = faceData[0] !== '表情评测无数据' ? Math.round(Number(getNumberFromString(faceData[3])) * 0.5) : 0

		// 脑电情绪值
		const eegMood = Math.round(Number(store.generalRow.eegResult?.mood) * 0.5) ?Math.round(Number(store.generalRow.eegResult?.mood) * 0.5) : 37
		console.log(eegMood,'222eegMood')

		// 表情情绪值
		const faceMood = faceData[0] !== '表情评测无数据' ? Math.round(Number(getNumberFromString(faceData[1])) * 0.5) : 0


		const totalFormat = (parmas: number) => Math.round(parmas * 0.15)
		// 情绪值
		const totalPoints1 = eegMood && faceMood && totalFormat(eegMood + faceMood)
		// 压力值
		const totalPoints2 = eegPresure && facePresure && totalFormat(100 - eegPresure - facePresure)
		// 疲劳值
		const totalPoints3 = eegTired && faceTired && totalFormat(100 - eegTired - faceTired)
		// 测焦虑
		const totalPoints4 = gad7 && Math.round((100 - gad7) * 0.2)
		// 测抑郁
		const totalPoints5 = phq9 && Math.round((100- phq9) * 0.25) 
		// 步态积极性
		const totalPoints6 = EmoGait && Math.round(EmoGait * 0.1)

		let totalPoint
		if (totalPoints1 && totalPoints2 && totalPoints3 && totalPoints4.toString() && totalPoints5.toString() && totalPoints6.toString())
			totalPoint = totalPoints1 + totalPoints2 + totalPoints3 + totalPoints4 + totalPoints5 + totalPoints6
		else totalPoint = 0

		store.emoBar.depressed = phq9
		store.emoBar.anxiety = gad7
		store.emoBar.mood = eegMood + faceMood
		store.emoBar.tired = eegTired + faceTired
		store.emoBar.presure = eegPresure + facePresure
		store.emoBar.positive = EmoGait

		console.log(totalPoints1,totalPoints2,totalPoints3,totalPoints4,totalPoints5,totalPoints6,totalPoint,'totalPoint  totalPoint')
		store.emoBar.total = totalPoint

		onUnmounted(()=>{
			store.emoBar.total=NaN
		})



		let echart: unknown
		let echarts = inject<Echarts>("mechart")!//引入
		let option = reactive<EChartsOption>({
			color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#13227a', '#8a8a8a', '#ffffff'],
			textStyle: {
				fontSize: 20,
				color: store.echartsColor
			},
			title: {
				text: '情绪状态',
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
			// 上方的list
			// legend: {
			// 	left: 110,
			// 	textStyle: {
			// 		fontSize: 15,
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
				axisLabel: {
					fontSize: 18 // 设置纵坐标文字的字体大小为14px
				  },
				type: 'category',
				data: [
					totalPoint ? `综合得分:${totalPoint}` : `综合得分`,
					eegMood + faceMood ? `情绪值:${eegMood + faceMood}` : '情绪值',
					// EmoGait ? `积极性:${EmoGait}` : `步态评测暂无数据`,
					eegPresure + facePresure ? `压力值:${eegPresure + facePresure}` : '压力值',
					eegTired + faceTired ? `疲劳度:${eegTired + faceTired}` : '疲劳度',
					gad7 ? `焦虑风险:${gad7}` : '焦虑指数暂无数据',
					phq9 ? `抑郁风险:${phq9}` : '抑郁评测暂无数据',

				]
			},
			series: [

				{
					name: '抑郁风险',
					type: 'bar',
					stack: 'total',
					barWidth:20,
					label: {
						// show: true,
						position: 'insideRight',
						formatter: zero_format()
					},
					emphasis: {
						focus: 'series'
					},
					data: [0, 0, 0, 0, 0, phq9]
					// data: [0, 0, 0, 0, 0, phq9, 0]

				},
				// {
				// 	name: '眼动焦虑(20)&游戏焦虑(30)',
				// 	type: 'bar',
				// 	stack: 'total',
				// 	label: {
				// 		// show: true,
				// 		position: 'insideRight',
				// 		formatter: zero_format()
				// 	},
				// 	emphasis: {
				// 		focus: 'series'
				// 	},
				// 	data: [0, 0, 0, 0, 0, 0, 0]
				// },
				// dui
				{
					name: '焦虑风险',
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
					data: [0, 0, 0, 0, gad7, 0]
				},
				// 黄色 从下到上
				{
					name: '脑电',
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
					data: [0, eegMood,  eegPresure, eegTired, 0, 0],

					// data: [0, eegMood, 0, eegTired, 0, 0, eegPresure]
				},
				// 红色
				{
					name: '表情',
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
					data: [0, faceMood,  facePresure, faceTired, 0, 0]

					// data: [0, faceMood, 0, faceTired, 0, 0, facePresure]
				},

				// {
				// 	name: '积极性',
				// 	type: 'bar',
				// 	stack: 'total',
				// 	label: {
				// 		// show: true,
				// 		position: 'insideRight',
				// 		formatter: zero_format()
				// 	},
				// 	emphasis: {
				// 		focus: 'series'
				// 	},
				// 	data: [0, 0, EmoGait, 0, 0, 0,]
				// },
				// 综合得分

				{
					name: '情绪值',
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
					data: [totalPoints1, 0, 0, 0, 0, 0, ]
				},
				{
					name: '压力',
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
					data: [totalPoints2, , 0, 0, 0, 0, 0]
				},
				{
					name: '疲劳',
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
					data: [totalPoints3, 0, 0, 0, 0, 0, 0]
				},
				{
					name: '焦虑',
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
					data: [totalPoints4, 0, 0, 0, 0, 0, 0]
				},
				{
					name: '抑郁',
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
					data: [totalPoints5, 0, 0, 0, 0, 0, 0]
				},
				{
					name: '积极性',
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
					data: [totalPoints6, 0, 0, 0, 0, 0, 0]
				}
			]
		})
		watch(() => store.isPrint, () => {
			// let echart = echarts.init(chartsDOM.value);
			// 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
			(option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
			(option!.title as EChtitle).textStyle.color = store.echartsColor;
			// (option!.legend.textStyle.color = store.echartsColor)
			option && (echart as echarts.EChartsType).setOption(option);

			console.log(option, '--=-');

		})
		onMounted(() => {
			echart = echarts.init(chartsDOM.value)
			option && (echart as echarts.EChartsType).setOption(option);
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
