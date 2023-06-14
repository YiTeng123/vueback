import { StoreTypes } from "@/store"

export default defineComponent({
    setup() {
        const store = inject<StoreTypes>('store')!

        return () => (
            <>
                <div class='flex w-full  mt-[10px]'>
                    <div className="flex-1  text-xl ml-8 flex flex-col"  style={{ color: store.echartsColor }}>
                        <div class='text-2xl font-extrabold'>综合建议</div>
                        <div class='mt-2 '>1.针对需要重点关注的学生（红色预警）：</div>
                        <div class='ml-4 mt-2'>(1)密切关注学生异常心理、行为，班主任要有针对性的与学生谈话，帮助学生解决心理困惑，对重要情况立即报告，并在专业人士指导下对学生进行及时干预。</div>
                        {/* <div>这些学生的情绪压力状况可能存在安全风险，需重点和持续关注</div> */}
                        <div class='ml-4 mt-2'>(2)由学校心理教师对其进行一对一的核查与心理辅导</div>
                        <div class='ml-4 mt-2'>(3)利用学校心理辅导资源设备，进行减压、心理舒缓等干预训练</div>
                        <div class='ml-4 mt-2'>(4)联系家长，获取家长的支持与配合；</div>
                        <div class='ml-4 mt-2'>(5)如问题持续无好转，或确定状态较为严重，建议转介专业心理医疗机构进一步诊断与治疗</div>

                        <div class='mt-4'>2.针对需要持续关注的学生（橙色预警）：</div>
                        <div className="ml-4 mt-2">(1)观察其日常学习生活中的言行及情绪状态，进一步了解这些不良症状持续的时长及原因，排除因特殊事件导致的暂时性症状表现；</div>
                        <div className="ml-4 mt-2">(2)开展心理健康主题活动，通过生动、有趣、主题明确的团体活动，提升学生对心理健康的认识，调动学生的参与度，在活动中解决问题</div>
                        <div className="ml-4 mt-2">(3)利用充满科技、充满特色的心理工具设备，加强心理调适和舒缓减压训练</div>
                        <div className="ml-4 mt-2">(4)对于症状表现明显，且持续2周及以上依然无好转的学生，建议请学校心理教师对其进行心理辅导</div>

                        <div class='mt-4'>3.常规工作建议 ：</div>
                        <div className="mt-2 ml-4">定期排查、提前预警、主动作为，将心理健康评估纳入常态管理。</div>
                        <div className="mt-2 ml-4">(1)加强日常对学生的心理健康教育知识普及，注重常见调适方法的传授。根据各年龄段学生心理特点，针对不同年级的学生从学生的自我认识、情绪调适、压力与应对及人际支持等各方面开展系列心理课程</div>
                        <div className="mt-2 ml-4">(2)把心理健康评估工作纳入常态化管理范畴，及时了解和发现已经存在或可能产生的心理问题，预测个体的心理健康发展趋势，从而更好地开展心理干预或指引。</div>
                        <div className="mt-2 ml-4">(3)开展心理危机干预及预防工作，坚持保密原则，维护学生权益，不得随意透露学生相关信息，并尽可能在自然的环境中实施干预，避免人为地制造特殊的环境给被干预学生造成过重心理负担，激发或加重心理问题。</div>


                        <div class='text-2xl font-extrabold mt-4'>报告说明</div>
                        <div className="mt-2 ml-4">本报告不可作为临床诊断的依据，测验结果分析报告仅限于进行初步了解用途，建议结合班主任、家长及相关老师对学生日常的深度了解进行综合分析，并通过心理老师进一步验证，以准确判断学生的具体情况</div>
                    </div>
                </div>

            </>
        )
    }
})
