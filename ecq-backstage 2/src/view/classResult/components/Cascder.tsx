import { PropType, Ref } from "vue"

export default defineComponent({
    // 维持父子组件状态同步
    emits:['update:cValue'],
    props:{
        options:Object as PropType<Array<any>>,
        cValue:Object as PropType<[]>,
        handleReq:Function
    },

    setup(prop, {emit}) {
       let CasValue= prop.cValue
       const handleChange = (value: Ref<Array<string>>) => {
        emit('update:cValue', value)
    }
        return () => (
            <>

                <div class="m-4">
                    <p>Child options expand when clicked (default)</p>
                    <el-cascader v-model={CasValue} options={prop.options} onChange={[handleChange,prop.handleReq]} />
                </div>
              
            </>
        )
    }
})
