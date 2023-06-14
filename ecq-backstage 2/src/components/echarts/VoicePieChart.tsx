import { Echarts, EChartsOption } from '@/App'
import { StoreTypes } from '@/store';
import { log } from 'console';
import { EChtitle } from '../types';

export default defineComponent({
	setup(prop, {expose}) {
		const chartsDOM = ref()
		const store = inject<StoreTypes>('store')!
		let echarts = inject<Echarts>("mechart")!;//引入
		// 获取表格的声音数据
		const voiceData = store.generalRow.viocetsetPoint
		const regex = /^([\u4e00-\u9fa5]+).*?(\d+)$/
		const match = voiceData.match(regex)!;
		const word = match[1].substring(0, match[1].length - 2) 
		const num = Number(match[2]) // 69
		console.log(word,num,'0-0-0--0')
	

		let RandomArray: Array<string> = ['平静', '开心', '惊喜']
		// 随机整数生成函数
		const generateRandomNumber = (max: number) => Math.floor(Math.random() * max) + 1;
		// 随机字符串
		function selectRandomStrings(strArray: Array<string>) {
			var randomIndex1 = Math.floor(Math.random() * strArray.length);
			var randomIndex2;
			do {
				randomIndex2 = Math.floor(Math.random() * strArray.length);
			} while (randomIndex2 === randomIndex1);
			return [strArray[randomIndex1], strArray[randomIndex2]];
		}

		// 终值
		let finallyNum: number | string = num ?? '暂无数据'
		// console.log(word, '声音评测积极或消极', finallyNum, '声音评测的值');

		// 如果是消极
		if (word === '恐惧' || word === '愤怒' || word === '悲伤') {
			finallyNum = Math.floor(num / 2)
			RandomArray = selectRandomStrings(RandomArray)
			RandomArray=[word,...RandomArray]
			console.log('消极')
		}
		// 如果是积极
		else {
			finallyNum = Math.floor(0.85 * finallyNum)
			RandomArray = RandomArray.filter((item) => item !== word)
			RandomArray=[word,...RandomArray]
			console.log('积极')

		}
		console.log(RandomArray,'RandomArray')
		// echart另外两个字段的data
		const randomData1 = generateRandomNumber(100 - finallyNum)
		const randomData2 = 100 - randomData1 - finallyNum


		let echart: unknown
		watch(() => store.isPrint, () => {
			// let echart = echarts.init(chartsDOM.value);
			// 需要手动再次赋值,所谓的响应式更新onUpadated,必须要显示地修改值或者computed
			(option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
			(option!.legend as EChtitle).textStyle.color = store.echartsColor;
			// (option!.yAxis ).axisLabel.color = store.echartsColor

			option && (echart as echarts.EChartsType).setOption(option);

		})

		onBeforeMount(()=>{
		})
		onMounted(() => {
			echart = echarts.init(chartsDOM.value);
			option && (echart as echarts.EChartsType).setOption(option);
		})

		let originalData
		let mydata: Array<{name:string,value:number}> = []
		let nameList = [word, ...RandomArray];
		let isNoname
		if (store.generalRow.viocetsetPoint !=='暂无数据') {
			originalData = [finallyNum, randomData1, randomData2];
			mydata = [];
			nameList =RandomArray
			originalData?.forEach((item, index) => {
				var obj = {
					value: item,
					name: nameList[index]
				}
				mydata.push(obj);
			})
			isNoname='声音情绪'
		}

		else {
			mydata = []
			isNoname = '声音评测暂无数据'
		}
		let option: EChartsOption = reactive({
			textStyle: {
				fontSize: 24,
				color: store.echartsColor
			},
			title: {
				text: '',
				textStyle: {
					fontSize: 28,
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
				trigger: 'item'
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
					name: isNoname,
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: store.echartsColor,
						borderWidth: 2
					},
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: 40,
							fontWeight: 'bold',
							color: store.echartsColor
						}
					},
					labelLine: {
						show: false
					},
					data: mydata
				}
			]
		})
		// console.log("这个是通过expose向外暴漏的2数据", mydata)
		expose({voicePie:mydata})
		store.voiceToParent =mydata


		return () => (
			<>
				<div class='charts' ref={chartsDOM}></div>
				{console.log('子级render')}
				<style>
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
