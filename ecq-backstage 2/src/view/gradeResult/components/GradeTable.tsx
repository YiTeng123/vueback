import { StoreTypes } from "@/store";
import { PropType } from "vue"
type GradePierre = Partial<{
    一班: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    二班: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    三班: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    四班: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    五班: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    七班: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    八班: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    九班: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    十班: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    十一班: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },

}>
type Split<S extends string, D extends string> = S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];
type GradePierreKey = keyof GradePierre
type MyStringArray = GradePierreKey extends string ? Split<GradePierreKey, "|"> : never;
type StringArray = ["一班", "二班", "三班", "四班", "五班", "七班", "八班", "九班", "十班", "十一班"]

type Anxiety = Record<GradePierreKey, { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number }>


interface TableData {
    anxiety: GradePierre
    pressure: GradePierre
}
export default defineComponent({
    props: {
        schoolTableValue: {
            type: Object as PropType<TableData> | undefined
        }

    },

    setup(_, { attrs }) {
        let AMid = attrs as unknown as TableData
        const resultFormat = (parmas: number | undefined) => parmas !== undefined ? parmas + '%' : null
        let gradeAnxietyKey = Object.keys(AMid?.anxiety) as StringArray
        let graderPresureKey = Object.keys(AMid?.pressure) as StringArray
        const store = inject<StoreTypes>('store')!
        watchEffect(() => {
            gradeAnxietyKey = Object.keys(AMid?.anxiety) as StringArray
            graderPresureKey = Object.keys(AMid?.pressure) as StringArray
        })
        return () => (
            <>
                <div class='flex w-full  min-h-[300px] mt-[10px] justify-center'>
                    <div class='w-[50%] ' >
                        <div class='classTable w-[95%]  min-h-[200px] flex flex-col white '>
                            <TableHeader />
                            {
                                graderPresureKey && graderPresureKey.map((item, index) => (
                                    <div class='flex'>
                                        <div className="flex-1 border-solid border-white border-l border-b flex justify-center "  style={{borderColor:store.echartsColor, color:store.echartsColor}}>
                                            <div class='flex-1 white displayy  py-3'>{item}</div>
                                        </div>
                                        <div class='flex flex-col white flex-[8]'>
                                            <div class='flex-1 flex border-solid border-white border-b border-l border-r' style={{borderColor:store.echartsColor, color:store.echartsColor}}>
                                                <div class='flex-[2] white displayy border-solid border-white border-r py-3' style={{borderColor:store.echartsColor, color:store.echartsColor}}>中等焦虑</div>
                                                <div class='flex-[2] displayy border-solid border-white border-r' style={{borderColor:store.echartsColor, color:store.echartsColor}}>
                                                    {resultFormat(AMid?.anxiety?.[item]?.moderate)}
                                                </div>
                                                <div class='flex-[2] displayy border-solid border-white border-r ' style={{borderColor:store.echartsColor, color:store.echartsColor}}>中等压力</div>
                                                <div class='flex-[2] displayy'>
                                                    {resultFormat(AMid?.pressure?.[item]?.moderate)}
                                                </div>
                                            </div>
                                            <div class='flex-1 flex border-solid border-white border-b border-l border-r' style={{borderColor:store.echartsColor, color:store.echartsColor}}>
                                                <div class='flex-[2] white displayy border-solid border-white border-r py-3' style={{borderColor:store.echartsColor, color:store.echartsColor}}>高焦虑</div>
                                                <div class='flex-[2] displayy border-solid border-white border-r' style={{borderColor:store.echartsColor, color:store.echartsColor}}>
                                                    {resultFormat(AMid?.anxiety?.[item]?.hight)}
                                                </div>
                                                <div class='flex-[2] displayy border-solid border-white border-r ' style={{borderColor:store.echartsColor, color:store.echartsColor}}>高压力</div>
                                                <div class='flex-[2] displayy'>
                                                    {resultFormat(AMid?.pressure?.[item]?.hight)}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }
})

export const TableHeader=defineComponent({


    setup(props, ctx) {
        const store = inject<StoreTypes>('store')!
        return  () => (<div class='h-[15%] classHeader flex border-solid border-white border ' style={{borderColor:store.echartsColor, color:store.echartsColor}}>
        <div class='flex-1 displayy border-solid border-white border-r'  style={{borderColor:store.echartsColor, color:store.echartsColor}}>年级</div>
        <div class='flex-[2] white displayy border-solid border-white border-r py-3'  style={{borderColor:store.echartsColor, color:store.echartsColor}}>问题</div>
        <div class='flex-[2] displayy border-solid border-white border-r '  style={{borderColor:store.echartsColor, color:store.echartsColor}}>年级总比例</div>
        {/* <div class='flex-[2] displayy border-solid border-white border-r'>各班级比例</div> */}
        <div class='flex-[2] white displayy border-solid border-white border-r py-3'  style={{borderColor:store.echartsColor, color:store.echartsColor}}>问题</div>
    
        <div class='flex-[2] displayy border-solid border-white '  style={{borderColor:store.echartsColor, color:store.echartsColor}}>年级总比例</div>
    
    </div>)
    }
})

