

import VueCard from './components/card.vue'
import MoodScatter from '@/components/schooleEcharts/MoodScatter'
import ViolinChart from '@/components/schooleEcharts/ViolinChart'
import SchoolDanger from './components/SchoolDanger'
import BarChart from '@/components/schooleEcharts/BarChart'
import BarLine from '@/components/schooleEcharts/BarLine'
import SchoolTable from './components/schoolTable'
import Totaltext from '@/components/totaltext'

import SchoolPie from '@/components/schooleEcharts/School.pie'
import { useData, usestuData, useGrade, useReactive } from "@/Hooks/schoolResuts.useData"

import './result.scss'

import SchoolText from './components/SchoolText'
import Analize, { FocusStudent } from '../classResult/components/analize'
import { StoreTypes } from '@/store'
export default defineComponent({
    name:'result',
    setup(prop, ctx) {
        const store = inject<StoreTypes>('store')!

        // 小提琴 情绪
        const { xAxis, xAxis_en } = useData()
        // 小提琴 学习
        const { xAxis: xAxisStu, xAxis_en: xAxis_enStu } = usestuData()
        // 获取年级数组
        const { gradePrimary } = useGrade()
        let { flag, reportHandle } = useReactive()
        console.log(reportHandle, 'reportHandle')

       
        watch(()=>store.isRender,()=>{
            flag.value = (store.isRender)
        })

        return () => (
                <div class="result" id="pdfDom">
                    <VueCard />
                    <Totaltext average_emo={reportHandle.average_emo} average_stu={reportHandle.average_stu} />

                    <div class='flex w-full h-[300px] mt-[30px]'>
                        <div class='flex-1'>
                            {flag.value ? <MoodScatter moodData={reportHandle.distribution_emo} title='情绪状态总分分布' /> : null}
                        </div>
                        <div class='flex-1'>
                            {flag.value ? <MoodScatter moodData={reportHandle.distribution_stu} title='学习状态总分分布' /> : null}
                        </div>

                    </div>

                    <div class='flex w-full h-[300px] mt-[10px]'>
                        <div class='flex-1'>
                            {flag.value ? <ViolinChart
                                title="情绪状态各参数总分布"
                                violin={reportHandle.violinData_emo}
                                xAxisViolin={xAxis}
                                xAxis_enViolin={xAxis_en} /> : null}
                        </div>
                        <div class='flex-1'>
                            {flag.value ? <ViolinChart
                                title="学习状态各参数总分布"
                                violin={reportHandle.violinData_stu}
                                xAxisViolin={xAxisStu}
                                xAxis_enViolin={xAxis_enStu} /> : null}
                        </div>
                    </div>

                    <div class='flex w-full h-[300px] mt-[10px]'>
                        <div class='flex-1'>
                            {flag.value ? <BarLine
                                title='各情绪状态参数年级分布'
                                gradeList={gradePrimary}
                                barData={reportHandle.gradeDistribution_emo}
                                yaxisName='情绪状态'
                                legenList={xAxis}
                                legenList_en={xAxis_en} /> : null}
                        </div>
                        <div class='flex-1'>
                            {flag.value ? <BarLine
                                title='各学习状态参数年级分布'
                                gradeList={gradePrimary}
                                barData={reportHandle.gradeDistribution_stu}
                                yaxisName='学习状态'
                                legenList={xAxisStu}
                                legenList_en={xAxis_enStu} /> : null}
                        </div>
                    </div>
                    <SchoolTable schoolTableValue={reportHandle.emoStats} {...reportHandle.emoStats} />

                    <Analize  {...reportHandle} />
                    <FocusStudent FocusStu={reportHandle.emoStats} />


                    <div class='flex w-full  min-h-[300px] mt-[10px] '>
                        <div class='w-[50%] ' >
                            {flag.value
                                ? <BarChart X={['情绪', '压力', '疲劳', '焦虑', '抑郁']} renderData={reportHandle.keyBarData}></BarChart>
                                : null}
                        </div>
                        <div class='w-[50%]'>
                            {flag.value
                                ? <SchoolPie title='总分需要关注比例' pieData={reportHandle.keyPieData} />
                                : null}
                        </div>
                    </div>

                    <SchoolText></SchoolText>



                </div>
        )
    }
})
enum A {
    '一班' = 1
}
A['一班'] === 1
A[1]