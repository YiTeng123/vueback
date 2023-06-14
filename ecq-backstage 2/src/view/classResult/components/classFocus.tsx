import { StoreTypes } from "@/store"
import { formatSex } from "@/untils/formatData/organ"
import { PropType } from "vue"

export default defineComponent({
    emits: ['whyFocus'],
    props: {
        focus: {
            type: Object as PropType<Array<Array<any>>>,
            required: true
        },
    },
    directives: {
        focus: {
            mounted: (el, binding,_vonde) => { console.log(el, '我是自定义指令绑定的组件dom', binding) }
        }
    },
    // 函数式
    setup(prop, { attrs, slots, expose, emit }) {
        const store = inject<StoreTypes>('store')!
        // 对外通信
        emit('whyFocus', nameMapping)
        expose({
            Focus: slots.title ? slots.title() : null
        })
        return () => (
            <>
                {attrs.img ? attrs.img : null}
                {/* 作用域插槽 */}
                {slots.title ? slots.title({ name: '' }) : null}
                <div class='classTable w-[90%] min-h-[150px] flex flex-col white mt-8'  style={{ color: store.echartsColor }}>
                    <div class='h-[15%] classHeader flex border-solid border-white border ' style={{borderColor: store.echartsColor,color: store.echartsColor }}>
                        <div class='flex-1 displayy border-solid border-white border-r py-3' style={{borderColor: store.echartsColor,color: store.echartsColor }}>姓名</div>
                        <div class='flex-1 displayy border-solid border-white border-r' style={{borderColor: store.echartsColor,color: store.echartsColor }}>性别</div>
                        <div class='flex-[2] displayy border-solid border-white border-r' style={{borderColor: store.echartsColor,color: store.echartsColor }}>情绪状态总分</div>
                        <div class='flex-[2] displayy border-solid border-white border-r' style={{borderColor: store.echartsColor,color: store.echartsColor }}>预警原因</div>

                        <div class='flex-1 displayy border-solid border-white border-r' style={{borderColor: store.echartsColor,color: store.echartsColor }}>姓名</div>
                        <div class='flex-[1] displayy border-solid border-white border-r' style={{borderColor: store.echartsColor,color: store.echartsColor }}>性别</div>
                        <div class='flex-[2] displayy border-solid border-white border-r' style={{borderColor: store.echartsColor,color: store.echartsColor }}>情绪状态总分</div>
                        <div class='flex-[2] displayy'>预警原因</div>

                    </div>

                    {prop?.focus?.map((item) => <FocusItem v-focus={prop} ItemData={item} />)}
                </div>

            </>
        )
    }
})

// 表格离谱组件
const FocusItem = defineComponent({
    props: {
        ItemData: {
            type: Object as (PropType<Array<FocusObject>> | PropType<Array<FocusObject>> | PropType<[]>),
            required: true
        }
    },

    setup(prop, { attrs }) {
        const store = inject<StoreTypes>('store')!
        return () => (
            // 需要根元素自定义指令才会生效
            <div>
                <div class='h-[31%] min-h-[80px] flex border-solid border-white border-b border-l border-r' style={{borderColor: store.echartsColor,color: store.echartsColor }}>
                    <div class='flex-1 white displayy border-solid border-white border-r'  style={{borderColor: store.echartsColor,color: store.echartsColor }}>
                        {prop.ItemData.length === 1 || prop.ItemData.length === 2
                            ? prop.ItemData[0].name : null}
                    </div>
                    <div class='flex-1 white displayy border-solid border-white border-r'  style={{borderColor: store.echartsColor,color: store.echartsColor }}>
                        {prop.ItemData.length === 1 || prop.ItemData.length === 2
                            ? formatSex(prop.ItemData[0].sex) : null}
                    </div>
                    <div class='flex-[2] white displayy border-solid border-white border-r'  style={{borderColor: store.echartsColor,color: store.echartsColor }}>
                        {prop.ItemData.length === 1 || prop.ItemData.length === 2
                            ? prop.ItemData[0].totalPoint : null}
                    </div>
                    <div class={`flex-[2] displayy border-solid  border-r ${isColor(+prop.ItemData[0].totalPoint).value} border-white`}  style={{borderColor: store.echartsColor,color: store.echartsColor }}>
                        {prop.ItemData.length === 1 || prop.ItemData.length === 2
                            ? lowestFormat(prop.ItemData[0].lowest, +prop.ItemData[0].totalPoint) : null}
                    </div>

                    <div class='flex-1 displayy border-solid border-white border-r'  style={{borderColor: store.echartsColor,color: store.echartsColor }}>
                        {prop.ItemData.length === 2
                            ? prop.ItemData[1].name : null}
                    </div>
                    <div class='flex-1 displayy border-solid border-white border-r'  style={{borderColor: store.echartsColor,color: store.echartsColor }}>
                        {prop.ItemData.length === 2
                            ? formatSex(prop.ItemData[1].sex) : null}
                    </div>
                    <div class='flex-[2] displayy border-solid border-white border-r'  style={{borderColor: store.echartsColor,color: store.echartsColor }}>
                        {prop.ItemData.length === 2
                            ? prop.ItemData[1].totalPoint : null}
                    </div>
                    <div class='flex-[2] displayy'>
                        {prop.ItemData.length === 2
                            ? lowestFormat(prop.ItemData[1].lowest, +prop.ItemData[1].totalPoint) : null}
                    </div>
                </div>
            </div>
        )
    }
})
type FocusObject = {
    lowest: string,
    name: string,
    sex: number,
    totalPoint: string
}
enum nameMapping {
    "phq9" = '抑郁风险',
    "gad7" = '焦虑风险',
    "mood" = '情绪值',
    "tired" = '疲劳度',
    "presure" = '压力值',
    "gait" = '步态积极性',
}
type LowType = keyof typeof nameMapping | string

// 函数柯里化
const isColor = (point: number) => computed(() => point < 30 ? 'red' : 'orange')
const lowestFormat = (low: LowType, moodPoint: number) => {
    if (low === 'phq9' || low === 'gad7' || low === 'mood') {
        if (moodPoint < 20) { return '高焦虑' }
        else { return '中等焦虑' }
    }
    else if (low === 'tired' || low === 'presure' || low === 'gait') {
        if (moodPoint < 20) return '高压力'
        else {
            return '中等压力'
        }

    }

}
 // 组件渲染时机
    // 1.父级setup
    // 2.父级onBeforeMount
    // 3.父级render render到某个子组件时,开始加载子组件
    // 4.子级setup
    // 5.子级onBeforeMount
    // 6.子级render
    // 7.子级onMounted
    // 8.父级onMounted

    // 当子组件修改某个响应式数据,如pinia的state,则会使得父级的某个依赖这个state的dom重新render
    // 也就是父级再次render,这时候触发onUpdated

    // 1.父级setup
    // 2.父级onBeforeMount
    // 3.父级render
    // 4.render到某个子组件时,开始加载子组件
    // 5.子级setup
    // 6.子级onBeforeMount
    // 7.子级render
    // 8.父级onBeforeUpdate
    // 9.父级render
    // 10.子级onMounted
    // 11.父级onMounted
    // 12.父级onUpdated