import { StoreTypes } from "@/store"
import { formatSex } from "@/untils/formatData/organ"
import { PropType } from "vue"

export default defineComponent({
    props: {
        tableValue: { type: Object as PropType<ClassTa>, required: true }
    },
    setup(prop, ctx) {
        const store = inject<StoreTypes>('store')!

        return () => (
            <>
                <div class='classTable w-[90%]  min-h-[200px] flex flex-col  ' style={{ color: store.echartsColor }}>
                    <div class='h-[15%] classHeader flex border-solid border ' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>
                        <div class='flex-[2]  displayy border-solid  border-r py-3' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>问题</div>
                        <div class='flex-1 displayy border-solid  border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>姓名</div>
                        <div class='flex-1 displayy border-solid  border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>性别</div>
                        <div class='flex-[2] displayy border-solid  border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>问题</div>
                        <div class='flex-1 displayy border-solid border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>姓名</div>
                        <div class='flex-1 displayy'>性别</div>
                    </div>
                    {/* {焦虑指数偏高} */}
                    <div class='h-[31%] flex border-solid  border-b border-l border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>
                        <div class='flex-[2] white displayy border-solid border-white border-r py-3' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>焦虑指数偏高</div>
                        <div class='flex-1 displayy border-solid border-white border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>
                            <div>

                                {prop.tableValue.gad7?.length !== 0
                                    ? prop.tableValue.gad7 && prop.tableValue.gad7.map((item => <div class='my-1'> {item.name}</div>)) : null}
                            </div>
                        </div>
                        <div class='flex-1 displayy border-solid border-white border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>
                            <div>
                                {console.log(prop.tableValue.gad7, 'prop.tableValue.gad7  22')}
                                {prop.tableValue?.gad7?.length !== 0
                                    ? prop.tableValue?.gad7 && prop.tableValue?.gad7.map((item => <div>{formatSex(item.sex)}</div>))
                                    : null}
                            </div>
                        </div>
                        <div class='flex-[2] displayy border-solid border-white border-r ' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>抑郁指数高</div>
                        <div class='flex-1 displayy border-solid border-white border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>
                            <div>
                                {prop.tableValue.phq9?.length !== 0
                                    ? prop.tableValue.phq9 && prop.tableValue.phq9.map((item => <div class='my-1'>{item.name}</div>)) : null}
                            </div>
                        </div>
                        <div class='flex-1 displayy'>
                            <div>
                                {prop.tableValue.phq9?.length !== 0
                                    ? prop.tableValue.phq9 && prop.tableValue.phq9.map((item => <div>{formatSex(item.sex)}</div>))
                                    : null}
                            </div>

                        </div>
                    </div>
                    {/* {情绪值偏低} */}
                    <div class='h-[32%] flex border-solid border-white border-b border-l border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>
                        <div class='flex-[2] white displayy border-solid border-white border-r py-3' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>情绪值偏低</div>
                        <div class='flex-1 displayy border-solid border-white border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>
                            <div>
                                {prop.tableValue.mood?.length !== 0
                                    ? prop.tableValue.mood && prop.tableValue.mood.map((item => <div class='my-1'>{item.name}</div>))
                                    : null}
                            </div>
                        </div>
                        <div class='flex-1 displayy border-solid border-white border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>
                            <div>
                                {prop.tableValue.mood?.length !== 0
                                    ? prop.tableValue.mood && prop.tableValue.mood.map((item => <div>{formatSex(item.sex)}</div>))
                                    : null}
                            </div>
                        </div>
                        <div class='flex-[2] displayy border-solid border-white border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>疲劳度偏高</div>
                        <div class='flex-1 displayy border-solid border-white border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>
                            <div>
                                {prop.tableValue.presure?.length !== 0
                                    ? prop.tableValue.presure && prop.tableValue.presure.map((item => <div class='my-1'>{item.name}</div>))
                                    : null}
                            </div>
                        </div>
                        <div class='flex-1 displayy border-solid border-white border-r' style={{ borderColor: store.echartsColor, color: store.echartsColor }}>
                            <div>
                                {prop.tableValue.presure?.length !== 0
                                    ? prop.tableValue.presure && prop.tableValue.presure.map((item => <div>{formatSex(item.sex)}</div>))
                                    : null}
                            </div>
                        </div>

                    </div>
                    {/* 第三行 压力值偏高 */}
                    {/* <div class='h-[32%] flex border-solid border-white border-b border-l border-r'>
                        <div class='flex-[2] white displayy border-solid border-white border-r'>压力值偏高</div>
                        <div class='flex-1 displayy border-solid border-white border-r'>
                            <div>
                                {prop.tableValue.presure.length !== 0
                                    ? prop.tableValue.presure.map((item => <div>{item.name}</div>))
                                    : null}
                            </div>
                        </div>
                        <div class='flex-1 displayy border-solid border-white border-r'>
                            <div>
                                {prop.tableValue.presure.length !== 0
                                    ? prop.tableValue.presure.map((item => <div>{formatSex(item.sex)}</div>))
                                    : null}
                            </div>
                        </div>
                        <div class='flex-[2] displayy border-solid border-white border-r'>积极性偏低</div>
                        <div class='flex-1 displayy border-solid border-white border-r'>
                            <div>
                                {prop.tableValue.gait.length !== 0
                                    ? prop.tableValue.gait.map((item => <div>{item.name}</div>))
                                    : null}
                            </div>
                        </div>
                        <div class='flex-1 displayy'>
                            <div>
                                {prop.tableValue.gait.length !== 0
                                    ? prop.tableValue.gait.map((item => <div>{formatSex(item.sex)}</div>))
                                    : null}</div>
                        </div>

                    </div> */}

                </div>




            </>
        )
    }
})
type ClassTa = {
    gad7: Array<{ name: string, sex: number }>
    gait: Array<{ name: string, sex: number }>
    mood: Array<{ name: string, sex: number }>
    phq9: Array<{ name: string, sex: number }>
    presure: Array<{ name: string, sex: number }>
    tired: Array<{ name: string, sex: number }>
    total: Array<[{ name: string, sex: number }, { name: string, sex: number }]> | Array<[{ name: string, sex: number }]> | []

}