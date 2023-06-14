

import VueCard from './components/card.vue'
import MoodScatter from '@/components/schooleEcharts/MoodScatter'
import ViolinChart from '@/components/schooleEcharts/ViolinChart'
import Totaltext from '@/components/totaltext'
import Cascder from './components/Cascder'
import ClassTable from './components/classTable'
import ClassFocus from './components/classFocus'
import BarChart from '@/components/schooleEcharts/BarChart'
import ClassPie from '@/components/schooleEcharts/School.pie'
import Clcadvice from './components/clcadvice'
import Analize, { FocusStudent } from './components/analize'
import { useData, usestuData, useReactive } from "@/Hooks/resuts.useData"
import { useCascder } from '@/Hooks/cascder'
import { StoreTypes } from '@/store'
export default defineComponent({
    name:'classResult',
    setup(prop, { emit }) {
        const store = inject<StoreTypes>('store')!

        // 小提琴 情绪
        const { emoDefault, xAxis, xAxis_en } = useData()
        // 小提琴 学习
        const { stuDefault, xAxis: xAxisStu, xAxis_en: xAxis_enStu } = usestuData()
        // 分级组件
        let { casValue, options } = useCascder()
        let { flag, handleReq, reportHandle } = useReactive()

        watchEffect(() => {
            console.log(store.isRender,'store.isRender有变化啦')
            flag.value = (store.isRender)
        })


        return () => (
            <>
                <div class="result" id="pdfDom">
                    <VueCard />
                    <Cascder v-model:cValue={casValue.value} options={options} handleReq={handleReq} />
                    <Totaltext average_emo={reportHandle.average_emo} average_stu={reportHandle.average_stu} />
                    <div class='flex w-full h-[300px] mt-[30px]'>
                        <div class='flex-1'>
                            {flag.value
                                ? <MoodScatter
                                    Xtype='category'
                                    moodData={reportHandle.scatter_emo}
                                    title='情绪状态总分分布' />
                                : null}
                        </div>
                        <div class='flex-1'>
                            {flag.value
                                ? <MoodScatter
                                Xtype='category'
                                    moodData={reportHandle.scatter_stu}
                                    title='学习状态总分分布' />
                                : null}

                        </div>
                    </div>
                    <div class='flex w-full min-h-[450px] mt-[5px]'>
                        <div class='flex-1'>
                            {flag.value ? <ViolinChart
                                title="情绪状态各参数总分布"
                                violin={reportHandle.violinData_emo && reportHandle.violinData_emo.length !== 0
                                    ? reportHandle.violinData_emo
                                    : emoDefault}
                                xAxisViolin={xAxis}
                                xAxis_enViolin={xAxis_en} /> : null}
                        </div>
                        <div class='flex-1 '>
                            {flag.value ? <ViolinChart
                                title="学习状态各参数总分布"
                                violin={reportHandle.violinData_stu && reportHandle.violinData_stu.length !== 0
                                    ? reportHandle.violinData_stu
                                    : stuDefault
                                }
                                xAxisViolin={xAxisStu}
                                xAxis_enViolin={xAxis_enStu} /> : null}
                        </div>

                    </div>
                    <div class='flex w-full  mt-[10px]'>
                        <div class="flex-1 displayy">
                            <ClassTable tableValue={reportHandle.keyPerson} />
                        </div>
                    </div>
                   
                  
                    <Analize  {...reportHandle} />
                    <div class='flex w-full  mt-[10px]'>
                        <div class="flex-1 displayy">
                            <ClassFocus focus={
                                reportHandle.keyPerson.total
                                    && reportHandle.keyPerson.total.length !== 0
                                    ? reportHandle.keyPerson.total
                                    : [[{ name: '', sex: 3 }]]} >
                                {{ title: (focusSlots: Record<'name',string>) => (<div>{focusSlots?.name}</div>) }}
                            </ClassFocus>
                        </div>
                    </div>
                <FocusStudent  FocusStu={reportHandle.emoStats}/>
                    <div class='flex w-full min-h-[300px] mt-[10px]'>
                        <div class="flex-1 displayy">
                            {flag.value ? <ClassPie
                                title='总分需关注的比例'
                                pieData={reportHandle.keyPieData} /> : null}

                        </div>
                        <div class="flex-1 displayy">
                            {flag.value
                                ? <BarChart  renderData={reportHandle.keyBarData} X={['情绪','压力','疲劳','焦虑','抑郁']}  />
                                : null}

                        </div>
                    </div>

                    <Clcadvice />
                </div>
            </>
        )
    }
})
