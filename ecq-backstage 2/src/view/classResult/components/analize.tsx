import { StoreTypes } from "@/store"
import { PropType } from "vue"

export default defineComponent({
    setup(prop, { attrs }) {
        const store = inject<StoreTypes>('store')!


        return () => (
            <>
                <div class='flex w-full ' style={{color:store.echartsColor}}>
                    <div class='ml-14 flex-col'>
                        <div class="flex-1  font-bold text-3xl ">
                            测评分析概况
                        </div>
                        <div class="flex-1   flex text-2xl mt-2">
                            <div>男生:{attrs?.numberOfBoy ?? null} </div>
                            <div class='ml-8'>女生:{attrs?.numberOfGril ?? null}</div>
                        </div>
                        <div class="flex-1   flex text-2xl  mt-2">
                            <div>情绪状态平均分：{attrs?.average_emo ?? null}</div>
                            <div class='ml-14'>学习状态平均分: {attrs?.average_stu ?? null}</div>
                        </div>
                        <div class="flex-1   flex text-2xl  mt-2">
                            <div>情绪状态测评总分在60分以下的人数占比：{+((attrs?.emoStats as { rateOfLower60: string })?.rateOfLower60) * 100 + '%' ?? null}</div>
                        </div>

                        <div class="flex-1   flex text-2xl  mt-2">
                            <div> 学习状态测评总分在60分以下的人数占比：{Math.floor(+((attrs?.stuStats as { rateOfLower60: string })?.rateOfLower60) * 100 ) + '%' ?? null}</div>
                        </div>

                        {/* <div class="flex-1 white  flex text-2xl  mt-6">
                            <div> 共有{(attrs?.keyPerson as {total:string})?.total?.length ?? null}名学生存在情绪-心理健康值异常，占总参评学生的**%，这些学生的情绪健康状况可能存在安全风险，需不定期关注。</div>
                        </div> */}
                    </div>

                </div>
                <div class='flex  w-full h-[20px] ml-14 mt-[20px] mb-6  font-bold text-3xl  ' style={{color:store.echartsColor}}>
                    需不定期关注的学生
                </div>

            </>
        )
    }
})



export const FocusStudent = defineComponent({
    props: {
        FocusStu: {
            type: Object as PropType<{ numberOfLower20: number, numberOfLower60: number, rateOfLower20: number, rateOfLower60: number }>,
            require: true
        }

    },
    setup(prop, ctx) {
        const store = inject<StoreTypes>('store')!

        return () => (
            <>

                <div class='flex w-full  mt-[10px] justify-center ' style={{color:store.echartsColor}} >
                    <div className="  w-full text-xl ml-14 flex flex-col ">
                        <div>共有{(prop?.FocusStu)?.numberOfLower20 || (prop?.FocusStu)?.numberOfLower60
                            ? (prop?.FocusStu)?.numberOfLower20 + (prop?.FocusStu)?.numberOfLower60
                            : null}名学生达到情绪压力预警筛查标准，占总参评学生的
                            {((prop?.FocusStu)?.rateOfLower60 != null) && (prop?.FocusStu)?.rateOfLower60 * 100}%
                        </div>
                        <div>其中一级预警（红色预警）{(prop?.FocusStu)?.numberOfLower20}人
                            ，二级预警（橙色预警）{(prop?.FocusStu)?.numberOfLower60}人</div>
                        <div>这些学生的情绪压力状况可能存在安全风险，需重点和持续关注</div>
                    </div>
                </div>
            </>
        )
    }
})
