import { TabsPaneContext } from "element-plus";
import { ref ,KeepAlive,Transition} from "vue";
import { useStore } from "@/store";
import { Router, useRoute } from 'vue-router'
import Component from '@/components/component'
export default defineComponent({
    setup(prop, ctx) {
        const store = useStore()
        const route = useRoute()
        const router = inject<Router>('router')!
        let tabIndex = 2;
        watch(() => route.fullPath, () => {
            console.log(route.fullPath, 'route')

        })
        const tabRemove=(fullPath:string)=>{
            console.log(fullPath)
            const tabPath= store.tabPane.find((item)=>{return item.path===fullPath})!.path
            // 清除tab的item
            store.removeTabPane(tabPath)
            const regex = /\/([^/]+)$/
            const regexResult = regex.exec(tabPath)![1]
            store.removeKeepAlive(regexResult)

        }
        const tabClick = (tabItem: TabsPaneContext) => {
            const fullPath = tabItem.props.name as string;
            router.push(fullPath);
        };
        return () => (
            <>
                <div class="navBox">
                    <el-tabs
                        v-model={route.fullPath}
                        type="card"
                        editable
                        class="demo-tabs"
                        onTabClick={tabClick}
                        onTabRemove={tabRemove}
                    >
                        {store.tabPane && store.tabPane.map((item => (
                            <el-tab-pane key={item.name} label={item.title} name={item.path} class='displayy'>
                                {{
                                    label: () => (
                                        <>
                                            <el-icon class="tabs-icon displayy relative top-[6px] text-2xl  mr-2" style={{fontSize:'24px'}}>
                                                <Component is={item.icon}></Component>
                                            </el-icon>
                                            {item.title}
                                        </>
                                    )
                                }}
                            </el-tab-pane>
                        )))}
                    </el-tabs>
                </div>
            </>
        )
    }
})
