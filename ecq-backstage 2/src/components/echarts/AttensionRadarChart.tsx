import * as echarts from 'echarts';
import { Echarts, EChartsOption } from '@/App'
import { StoreTypes, useStore } from '@/store';
import { EChtitle } from '../types';

export default defineComponent({
	setup(prop, ctx) {
		const chartsDOM = ref()
		let echarts = inject<Echarts>("mechart")!;//引入
		const store = inject<StoreTypes>('store')!

		// 认知注意力stroop
		let stroopGame = (store.generalRow.gamesPoint ).find((item) => item.name === 'Stroop') 
		const antiInterference =  stroopGame?.detail?.antiInterference
		const focus = stroopGame?.detail?.focus
		const stroopReaction =stroopGame?.detail?.reaction

		watch(() => store.isPrint, () => {
			// let echart = echarts.init(chartsDOM.value);
			// 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
			(option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
			(option!.title as EChtitle).textStyle.color = store.echartsColor
			option.radar.name.textStyle.color= store.echartsColor;
			option && (echart as echarts.EChartsType).setOption(option);

		})
		let option: EChartsOption=reactive({
			textStyle: {
				fontSize: 24,
				color: store.echartsColor
			},
			title: {
				text: '认知注意力',
				textStyle: {
					fontSize: 28,
					color: store.echartsColor
				},
			},
			legend: {
				show: false
			},
			radar: {
				name: {
					textStyle: {
						color: store.echartsColor,
						fontSize:"20px",
						// backgroundColor: '#999',
						borderRadius: 3,
						padding: [3, 5]
					}
				},
			    // shape: 'circle',
				center: ['50%','60%'],
				radius: '80%',
			    indicator: [
			      { name: `专注能力${focus ?? ''}`, max: 100 },
			      { name: `抗干扰能力${antiInterference ?? ''}`, max: 100 },
			      { name: `反应速度${stroopReaction ?? ''}`, max: 100 }
				]
			},
			series: [
				{
					name: '认知注意力',
					type: 'radar',
					color: 'orange',
					areaStyle: {
						color: 'orange'
					},
					data: [
						{
							value: stroopGame ? [focus,antiInterference,stroopReaction] : [],
							name: ''
						}
					]
				}
			]
		})
		let echart:unknown
		
		

		onMounted(() => {
			 echart = echarts.init(chartsDOM.value);
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
