import { useStore, } from "@/store";
import './index.scss'
import vueCard from './card.vue'
import EmoBarChart from "@/components/echarts/EmoBarChart";
import StuBarChart from "@/components/echarts/StuBarChart";
import EEGLineChart from "@/components/echarts/EEGLineChart";
import EEGBarChart from "@/components/echarts/EEGBarChart";
import ScaleBarChart from "@/components/echarts/ScaleBarChart";
import EyemoveBarChart from "@/components/echarts/EyemoveBarChart";
import VoicePieChart from "@/components/echarts/VoicePieChart";
import FaceRadarChart from "@/components/echarts/FaceRadarChart";
import GaitPieChart from "@/components/echarts/GaitPieChart";
import CogRadarChart from "@/components/echarts/CogRadarChart";
import AttensionRadarChart from "@/components/echarts/AttensionRadarChart";
import EyemoveScatterChart from "@/components/echarts/EyemoveScatterChart";
import EyemoveRelationChart from "@/components/echarts/EyemoveRelationChart";
import MoodStateBar from "@/components/echarts/moodStateBar";
import LearnStateBar from "@/components/echarts/learnStateBar";
import { appraiseMood, textMood, learnState, mostBad } from "@/view/generalApi/personReport/text";
import { learnDefault } from '@/untils/learnDefault'
export default defineComponent({
    components: {
        vueCard,
        // 组件名要大驼峰命名法,不然没有提示
        MoodStateBar
    },

    setup(prop, ctx) {
        let stateToMood: number
        onUpdated(() => {
            stateToMood = store.emoBar.total
            console.log(store.emoBar.total, '2222')
        })
        const store = useStore();
        console.log(store.generalRow,'generalRow')
        enum nameMapping {
            "depressed" = '抑郁风险',
            "anxiety" = '焦虑风险',
            "mood" = '情绪值',
            "tired" = '疲劳度',
            "presure" = '压力值',
            "positive" = '步态积极性',
            "total" = '总分'
        }

        const textStyle = {
            color: "#fff",
            // height: '60px',
            paddingTop: '10px'
        }
        const appraiseText = computed(() => {
            if (store.emoBar.total) {
                if (store.emoBar.total <= 20) {
                    if (
                        (store.emoBar.depressed + store.emoBar.anxiety + store.emoBar.mood)
                        < (store.emoBar.tired + store.emoBar.presure + store.emoBar.positive)
                    ) {
                        return appraiseMood['0']
                    }
                    else return appraiseMood['2']
                }
                else if (store.emoBar.total > 20 && store.emoBar.total <= 60) {
                    if (
                        (store.emoBar.depressed + store.emoBar.anxiety + store.emoBar.mood)
                        < (store.emoBar.tired + store.emoBar.presure + store.emoBar.positive)
                    ) {
                        return appraiseMood['1']
                    }
                    else return appraiseMood['3']
                }
                else {
                    return appraiseMood['4']
                }
            }
            else {
                return null
            }
        })
        // 随机生成一个0到n的整数
        const Random = (n: number) => {
            return Math.floor(Math.random() * n)
        }
        const getRandomNumber = (num1: number, num2: number) => {
            // 生成0到1之间的随机数
            const random = Math.random();
            // 如果随机数小于0.5，则返回num1，否则返回num2
            return random < 0.5 ? num1 : num2;
        }
        const findMin = (arr: Array<number>): number => {
            // 使用apply()方法将数组元素作为参数传递给Math.min()
            return Math.min.apply(null, arr);
        }
        // 需要在render阶段赋值,即在tsx中
        let minArray: any
        let min: number
        let keyTick
        let minName

        let textColor = ref('')

        watch([() => store.stuBar.cognition + store.stuBar.stroop,
        () => store.emoBar.total], ([stuOld, emoOld], [stuNew, emoNew]) => {
            const exist = [stuOld, emoOld, stuNew, emoNew]
            const ExistArray = [...exist].filter(x => !!x === true)
            if (ExistArray.length === 3) ExistArray.shift()
            if (!store.emoBar.total) {
                textColor.value = 'color:white'
            }
            else if (ExistArray[1] <= 25) {
                textColor.value = 'color:red'
            }
            else if (ExistArray[1] > 25 && ExistArray[1] <= 50) {
                textColor.value = 'color:orange'

            }
            else if (ExistArray[1] > 51 && ExistArray[1] <= 75) {
                textColor.value = 'color:blue'
            }
            else {
                textColor.value = 'color:green'
            }

            if (!(store.stuBar.cognition + store.stuBar.stroop)) {
                learnColor.value = 'color:white'
            }
            if (ExistArray[0] <= 25) {
                learnColor.value = 'color:red'
            }
            else if (ExistArray[0] > 25 && ExistArray[0] <= 50) {
                learnColor.value = 'color:orange'
            }
            else if (ExistArray[0] > 51 && ExistArray[0] <= 75) {
                learnColor.value = 'color:blue'
            }
            else {
                learnColor.value = 'color:green'
            }
        })


        let learnColor = ref()
        return () => (
            <div id="pdfDom">
                <vueCard personMsg={store.generalRow} />
                <div class="canvasBox">

                    <div class='canvastext text-xl pb-[10px] pl-[10px]' style={textStyle} >
                        <div style={{ display: 'flex', color: store.echartsColor }} class='text-xl my-1 flex items-center'>▲<span class='font-semibold text-2xl'> 情绪状态</span></div>
                        {/* 情绪分值 */}
                        <div style={{ display: 'flex', color: store.echartsColor, marginTop: '2px' }} class='items-center'>
                            <div class='canvas_item'>抑郁风险:{store.emoBar.depressed ? store.emoBar.depressed : 0}</div>
                            <div class='canvas_item'>焦虑风险:{store.emoBar.anxiety ?? '暂无评测数据'}</div>
                            <div class='canvas_item'>压力值:{store.emoBar.presure ?? '暂无评测数据'}</div>
                            <div class='canvas_item'>疲劳度:{store.emoBar.tired ?? '暂无评测数据'}</div>
                            <div class='canvas_item'>情绪值:{store.emoBar.mood ?? '暂无评测数据'}</div>
                        </div>
                        <div class='canvas_item text-2xl' style={textColor.value}>
                            <span class='text-2xl font-bold'>综合得分:</span>{store.emoBar.total ? store.emoBar.total : null}
                        </div>
                        <div style={{ display: 'flex', color: store.echartsColor }} class='text-xl  my-1'>
                            综合得分满分为100分，结合抑郁风险、焦虑风险、压力值、疲劳值、情绪值五个指标
                        </div>
                        <div style={{ display: 'flex', color: store.echartsColor }}
                            class='text-xl my-1 flex items-center'>基于脑电、眼动、表情、声音、步态等多模态生理数据，通过BIAI-评价算法自动生成</div>

                        {/* 学习 */}
                        <div style={{ display: 'flex', color: store.echartsColor }}
                            class='text-xl  my-1 mt-6 flex items-center'>
                            <span class='text-2xl font-bold'>▲学习状态</span>
                        </div>
                        {store.generalRow.gamesPoint.length == 2 &&
                            <div style={{ display: 'flex', color: store.echartsColor, marginTop: '2px' }}
                                class='items-center flex'>
                                <div class='canvas_item'>认知注意力:{store.stuBar.stroop * 2 ? store.stuBar.stroop * 2 : 26} </div>
                                <div class='canvas_item'>认知灵活度:{store.stuBar.cognition * 2 ? store.stuBar.cognition * 2 : 26}</div>
                            </div>}
                        <div class='canvas_item text-2xl font-bold' style={learnColor.value} >
                            <span class='text-2xl font-bold'>综合得分:</span>{store.stuBar.stroop && store.stuBar.cognition ? store.stuBar.cognition + store.stuBar.stroop : null}
                        </div>
                        <div style={{ display: 'flex', color: store.echartsColor }} class='text-xl  my-1'>综合得分满分为100分，结合认知注意力、认知灵活度两个指标</div>
                        <div style={{ display: 'flex', color: store.echartsColor }} class='text-xl  flex items-center'>基于眼动、游戏等多维参数，通过BIAI-评价算法自动生成</div>

                        <div style={{ display: 'flex', color: store.echartsColor }} class='text-xl my-1 flex items-center mt-4'>
                            ▲<span class='font-semibold text-2xl ' > 分值范围</span></div>
                        <div style={{ display: 'flex', color: store.echartsColor }} class='text-xl  my-1 flex items-center'>
                            <div>
                                <span style={{ color: store.echartsColor }}>综合得分、情绪值、认知注意力及认知灵活度的分数越高越好，取值范围解析为：</span>
                                <div>
                                    <span  >0-25：不好；</span>
                                    <span  > 26-50：一般；</span>
                                    <span  >51-75：良好；</span>
                                    <span  > 76-100：优秀。</span>
                                </div>

                                <span style={{ color: store.echartsColor }}>而抑郁风险、焦虑风险、压力值与疲劳值的分数是越低越好，取值范围解析为：</span>
                                <div>
                                    <span >0-25：不错；</span>
                                    <span  >26-50：一般；</span>
                                    <span  >51-75：有风险；</span>
                                    <span >76-100：较严重。</span>
                                </div>

                            </div>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'none', color: store.echartsColor }}>
                                {
                                    minArray = [
                                        store.emoBar.depressed,
                                        store.emoBar.anxiety,
                                        store.emoBar.mood,
                                        store.emoBar.tired,
                                        store.emoBar.presure,
                                        store.emoBar.positive
                                    ]
                                }{min = findMin(minArray)}
                                {keyTick = Object.keys(store.emoBar)}
                                {minName = keyTick.find((item) => store.emoBar[(item as keyof typeof store.emoBar)] == min)}
                            </div>
                            {/* 低分突出项:{minName && store.emoBar.total < 60
                                 ? nameMapping[(minName as keyof typeof nameMapping)] + ':' + min 
                                  : ''} */}
                        </div>
                    </div>
                    <div class='shell'>
                        {/* 情绪状态 */}
                        <div class='stateToMood' style="height:80px;margin-top:6px;">
                            <MoodStateBar />
                        </div>

                        <div class='canvasItemNew displayy' style="height:300px;"><EmoBarChart /></div>
                        {
                            // 学习状态
                            store.generalRow.gamesPoint.find((item) => item.name === 'Stroop') && store.generalRow.gamesPoint.find((item) => item.name === '认知灵活性')
                                ? <>
                                    <div class='stateTostudy' style="height:80px;margin-top:0px;justify-content: flex-end;">
                                        <LearnStateBar title='' />
                                    </div>
                                    <div class=' displayy canvasItemNew' style="height:300px"><StuBarChart /> </div>
                                </>
                                :
                                null

                        }

                        {/* { store.generalRow.gamesPoint} */}
                    </div>

                    <div style={{ color: store.echartsColor }} class='text-2xl flex justify-center w-full my-3'>各模块结果：脑电、眼动、表情、声音、步态、游戏
                    </div>
                    {/* <div style="display:flex;flex-direction:row;width:98%;height:320px;" class='mt-[20px]'>
                        <div class='canvasItem displayy' style="width:50%"><EEGLineChart /></div>
                        <div class='canvasItem displayy' style="width:50%"><EEGBarChart /></div>
                    </div> */}
                    <div class="eyemoveBox mt-[20px]">

                        {/* <div class='EyemoveRelationChart displayy' style="height:400px;width: 45%;margin-left:2%;;margin-top:6px">
                            <EyemoveRelationChart />
                        </div> */}
                        <div class='EyemoveRelationChart displayy' style="height:400px;width:50%"><EEGBarChart /></div>

                        <div class='displayy EyemoveBarChart' ><EyemoveBarChart /></div>

                    </div>
                    <div style="display:flex;flex-direction:row;width:98%;height:350px;position:relative">
                        {/* 量表 */}
                        <div class='canvasItem displayy flex-1'><ScaleBarChart /></div>
                        <div class='canvasItem displayy flex-1'><GaitPieChart /></div>

                    </div>
                    <div style="display:flex;flex-direction:row;width:98%;height:300px;margin-top:5px">
                        <div class='canvasItem displayy' >
                            <div class='Persontext text-2xl font-semibold' style={{ color: store.echartsColor }}>
                                表情评测:
                                {store.generalRow.looktestPoint.length !== 1
                                    ? store.generalRow.looktestPoint.filter((item, index) => index != 0).map((item => (<div style={{ marginLeft: '8px' }}>{item}</div>)))
                                    : <div style={{ marginLeft: '8px' }}>暂无数据</div>}
                            </div>
                            <FaceRadarChart /></div>
                        {[...store.generalRow.viocetsetPoint].includes(':')
                            ? <div class='canvasItem displayy' >
                                <div class='Persontext text-2xl font-semibold' style={{ color: store.echartsColor }}>
                                    声音评测:
                                    {store.voiceToParent && store.voiceToParent.map((item) => {
                                        return (<div style={{ marginLeft: '2px' }}> {item.name}:{item.value}</div>)
                                    })}
                                </div>
                                <VoicePieChart />
                            </div>
                            : null}
                    </div>
                    <div style="display:flex;flex-direction:row;width:100%;height:250px;margin-top:10px">
                        <div class='canvasItem displayy' ><AttensionRadarChart /></div>

                        <div class='canvasItem displayy' ><CogRadarChart /></div>
                    </div>



                    {/* 综合建议 */}
                    <div style={{ display: 'flex', color: store.echartsColor, marginTop: '12px' }}>
                        {appraiseText.value === '情绪状态良好'
                            // 输出3或4
                            ? textMood[getRandomNumber(3, 4)]
                            : appraiseText.value !== null
                                // 输出0,1,2
                                ? <div style={{ color: store.echartsColor, marginTop: '2px' }} class='text-xl '>
                                    <div class='mb-1'>综合建议:</div> {'▲' + textMood[Random(3)]}</div>
                                : null}
                    </div>
                    {/* 学习状态 */}
                    {/* {store.generalRow.gamesPoint.length == 2
                        ? <div style={{ display: 'flex', color: store.echartsColor, marginTop: '10px' }}
                            class='text-xl'>{'▲' + learnState[0]}</div>
                        : ''} */}
                    {/* 低分描述 情绪状态低于60会出现 */}
                    {/* {
                        1 ? <div style={{ color: store.echartsColor, marginTop: '10px' }}
                            class='text-xl'>{'▲' + mostBad[0]}</div>
                            : ''} */}

                </div>
            </div>
        )
    }
})
