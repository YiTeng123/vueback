import { Suspense } from 'vue'

export default defineComponent({
    name:'generalApi',
    setup(prop, ctx) {
        const SyncTsx = defineAsyncComponent(()=>import('./generalAsync'))


        return () => (
            <>
            <Suspense>
            {{
                default:()=>(<SyncTsx></SyncTsx>),
                fallback:()=>(<el-skeleton rows={5} animated />)
            }}

            </Suspense>
               
            </>
        )
    }
})
