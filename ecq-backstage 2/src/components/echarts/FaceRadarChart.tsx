import { Echarts, EChartsOption } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';

export default defineComponent({
	setup(prop, ctx) {
		const chartsDOM = ref()
		const store = inject<StoreTypes>('store')!
		let echarts = inject<Echarts>("mechart")!;//引入
		let echart:unknown

		console.log(store.generalRow.looktestPoint,'looktestPoint')
		function getNumberFromString(str:string):number {
			var arr = str.split(':');
			var numStr = arr[1];
			var num = parseInt(numStr);
			return num;
		  }
		const faceData:Array<string>  =store.generalRow.looktestPoint
		
		const finallyData= faceData[0] ==='表情评测无数据'? [] : [getNumberFromString(faceData[1]),getNumberFromString(faceData[2]),getNumberFromString(faceData[3])]

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
		let option: EChartsOption= reactive({
			textStyle: {
				fontSize: 20,
				color: store.echartsColor
			},
			title: {
				text: '',
				textStyle: {
					fontSize: 23,
					color: store.echartsColor
				},
			},
			legend: {
				show: false
			},
			radar: {
			    // shape: 'circle',
				center: ['50%','60%'],
				radius: '80%',
			    indicator: [
			      { name: '情绪', max: 100 },
			      { name: '疲劳', max: 100 },
			      { name: '压力', max: 100 }
				]
			},
			series: [
				{
					name: '表情指标',
					type: 'radar',
					data: [
						{
							value: finallyData,
							name: '表情指标'
						}
					]
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
