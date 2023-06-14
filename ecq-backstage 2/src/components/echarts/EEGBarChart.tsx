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
			(option!.title as EChtitle).textStyle.color = store.echartsColor
			option && (echart as echarts.EChartsType).setOption(option);
		})
		onMounted(() => {
			 echart = echarts.init(chartsDOM.value);
			option && (echart as echarts.EChartsType).setOption(option);
		})
		  const{eegResult:{concentrate,mood,presure,relax,tired}}= store.generalRow
		let originalData = [concentrate,tired,mood,presure,relax];
		let mydata:Array<object> = [];
		let colorList= ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
		originalData.forEach((item,index)=>{
			var obj = {
				value: item,
				itemStyle: {
					color: colorList[index]
				}
			}
			mydata.push(obj);
		})
		let option: EChartsOption = reactive({
			textStyle: {
				fontSize: 20,
				color:store.echartsColor
			},
			title: {
				text: concentrate !='0' ?   '脑电指标' :'脑电暂无数据',
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
			legend: {
				textStyle: {
					fontSize: 12,
					color: store.echartsColor
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				data: ['专注值', '疲劳度', '情绪值', '压力值', '放松值']
			},
			yAxis: {
				type: 'value',
				min: 0,
				max: 100,
				interval: 20
			},
			series: [
				{
					barWidth:29,
					data: mydata,
					type:'bar'
				}
			]
		});
	
		
	

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
