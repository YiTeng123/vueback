import { CustomSeriesOption } from "echarts/charts";
import { LegendComponentOption, TitleComponentOption, ToolboxComponentOption, TooltipComponentOption } from "echarts/components";
import { prepareBoxplotData } from 'echarts/extension/dataTool';

import { Echarts } from '@/App'
import { StoreTypes } from '@/store';
import { EChtitle } from '../types';

import type { PropType } from 'vue'

import * as d3 from 'd3';

type EChartsOption = echarts.ComposeOption<
	| TitleComponentOption
	| ToolboxComponentOption
	| TooltipComponentOption
	| LegendComponentOption
	| CustomSeriesOption
>;
export default defineComponent({
	props: {
		title: String,
		violin: {
			type: Object as PropType<Array<{ name: string, value: number }>>,
			required: true
		},
		// 横坐标名
		xAxisViolin: {
			type: Object as PropType<Array<string>>,
			required: true
		},
		// 横坐标英文名
		xAxis_enViolin: {
			type: Object as PropType<Array<string>>,
			required: true
		}

	},

	setup(props, ctx) {
		const chartsDOM = ref()
		const store = inject<StoreTypes>('store')!
		let echarts = inject<Echarts>("mechart")!;//引入
		let echart: unknown
		// watch(()=>props.violin,()=>{
		// 	option && (echart as any).setOption(option);
		// });
		const _init = () => {
			chartsDOM.value.removeAttribute(
				"_echarts_instance_"
			);
			echart = echarts.init(chartsDOM.value);
			option && (echart as any).setOption(option);
		}
		watch([() => props.violin, () => store.isPrint, () => store.emoBar.total], ([_, newY]) => {

			(option.textStyle as { fontSize: number, color: string }).color = store.echartsColor;
			(option!.title as EChtitle).textStyle.color = store.echartsColor;


			option && (echart as any).setOption(option);
		}, {
			deep: true
		})
		onMounted(() => {
			echart = echarts.init(chartsDOM.value);
			option && (echart as any).setOption(option);
		})
		onUnmounted(() => {
			(echart as any).dispose();

		})
		



		let dataSource = props.xAxis_enViolin.map(name =>
			props.violin.filter(item => item.name === name).map(item => item.value)
		);
		//核密度估计
		function kernelDensityEstimator(kernel: Function, X: Array<number>) {
			return function (V: any) {
				return X.map(function (x) {
					return [
						x,
						d3.mean(V, function (v: number) {
							return kernel(x - v);
						})
					];
				});
			};
		}
		//Epanechnikov核函数
		function kernelEpanechnikov(k: number) {
			return function (v: number) {
				return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
			};
		}

		const tooltipData = prepareBoxplotData(dataSource);
		const { boxData } = tooltipData;

		let option: EChartsOption = reactive({
			grid: {
				top: "30%",
				left: "10%",
				right: "10%",
				bottom: "15%"
			},
			textStyle: {
				fontSize: 20,
				color: store.echartsColor
			},
			title: {
				text: props.title,
				textStyle: {
					fontSize: 16,
					color: store.echartsColor
				},
			},
			legend: {
				show: false
			},
			tooltip: {
				formatter: (param: any) => {
					return [
						props.xAxisViolin[param.dataIndex] + ': ',
						'最大值: ' + boxData[param.dataIndex][4],
						'第三四分位数: ' + boxData[param.dataIndex][3],
						'中位数: ' + boxData[param.dataIndex][2],
						'第一四分位数: ' + boxData[param.dataIndex][1],
						'最低值: ' + boxData[param.dataIndex][0]
					].join('<br/>');
				}
			},
			xAxis: {
				type: 'category',
				data: props.xAxisViolin,
				boundaryGap: true,
				nameGap: 30,
				splitArea: {
					show: false
				},
				axisLabel: {
					color: store.echartsColor
				},
				splitLine: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: [store.echartsColor]
					}
				},
				axisTick: {
					show: false
				}
			},
			yAxis: {
				z: 2,
				type: 'value',
				nameTextStyle: {
					color: store.echartsColor,
					padding: [0, 30, 0, 0]
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				splitLine: {
					lineStyle: {
						color: [store.echartsColor]
					}
				},
				axisLabel: {
					color: store.echartsColor
				}
			},
			series: [
				{
					name: '情绪状态分布图（提琴图）',
					type: 'custom',
					color: ['#B1D0FA'],
					renderItem: (params, api: any) => {
						const categoryIndex = api.value(0);

						const min = Math.min(...dataSource[categoryIndex]);
						const max = Math.max(...dataSource[categoryIndex]);
						const liner = d3
							.scaleLinear()
							.domain([min - 50, max + 50])
							.ticks(20);
						let density = kernelDensityEstimator(kernelEpanechnikov(7), liner)(
							dataSource[categoryIndex]
						) as number[][];

						const maxDens = Math.max(...(density.map(v => v[1])));

						const points = density.map(v => {
							const [y, dens] = v;
							const point = api.coord([categoryIndex, y]);
							point[0] += (((api.size([0, 0])[0] / 2) * dens) / maxDens) * 0.85;
							return point;
						});

						const points2 = density.map(v => {
							const [y, dens] = v;
							const point = api.coord([categoryIndex, y]);
							point[0] -= (((api.size([0, 0])[0] / 2) * dens) / maxDens) * 0.85;
							return point;
						});

						const lineGenerator = d3.line().curve(d3.curveBasis);
						const pathData = lineGenerator(points)!;
						const pathData2 = lineGenerator(points2)!;

						return {
							z: 2,
							type: 'path',
							shape: {
								pathData: pathData + pathData2
							},
							style: api.style({
								fill: api.visual('color'),
								stroke: '#428EEE',
								lineWidth: 1
							}),
							styleEmphasis: api.style({
								fill: d3.color(api.visual('color'))?.darker(0.05),
								stroke: d3.color('#428EEE')?.darker(0.05),
								lineWidth: 2
							})
						};
					},
					encode: {
						x: 0,
						y: dataSource[
							(d3 as unknown as { scan: any }).scan(dataSource, function (a: any, b: any) {
								return b.length - a.length;
							})
						].map((v, i) => i + 1)
					},
					data: dataSource.map((v, i) => [i, ...v])
				}
			]
		})


		return () => (
			<>
				<div class='chartsMoodScatter' ref={chartsDOM}></div>

				<style tsx>
					{
						`
                        .chartsMoodScatter{
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


