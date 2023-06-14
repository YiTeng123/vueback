import { StoreTypes } from "@/store"

export default defineComponent({
    props:{
        average_emo:Number,
        average_stu:Number,
        testTime:{
            type:String,
            default:'2023.03.09 16:18'
        }
    },
    setup(prop, ctx) {
        const store = inject<StoreTypes>('store')!
        
        return () => (
            <>
                <div class='totaltext w-full py-2 flex mt-4 text-xl ' style={{border: '1px solid #414243',color:store.echartsColor}}>
                        <div class='flex-1 justify-center flex'>测试时间: <span class='ml-2'>{prop.testTime}</span></div>
                        <div class='flex-1 justify-center flex' >情绪状态平均: <span class='ml-2'>{prop.average_emo?prop.average_emo:null}</span></div>
                        <div class='flex-1 justify-center flex'>学习状态平均: <span class='ml-2'>{prop.average_emo?prop.average_stu:null}</span> </div>

                </div>

            
            </>
        )
    }
})
