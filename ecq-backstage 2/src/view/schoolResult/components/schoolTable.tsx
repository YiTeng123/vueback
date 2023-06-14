import { SchoolPierre } from "@/Hooks/schoolResuts.useData"
import { StoreTypes } from "@/store"
import { PropType } from "vue"
interface TableData {
    anxiety: SchoolPierre
    pressure: SchoolPierre
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
		const store = inject<StoreTypes>('store')!

        watchEffect(() => {
        })
        return () => (
            <>
                <div class='flex w-full  min-h-[300px] mt-[10px] justify-center'>
                    <div class='w-[50%] ' >
                        <div class='classTable w-[95%]  min-h-[200px] flex flex-col ' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                            <TableHeader />
                            <div class='flex'>
                                <div class="flex-1 border-solid border-l border-b flex justify-center" style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                    <div class='flex-1  displayy  py-3'>初一</div>
                                </div>
                                <div class='flex flex-col  flex-[8]'>
                                    <div class='flex-1 flex border-solid border-b border-l border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                        <div class='flex-[2]  displayy border-solid border-r py-3' style={{color:store.echartsColor,borderColor:store.echartsColor}}>中等焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                            {resultFormat(AMid?.anxiety?.初一?.moderate)}
                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r '  style={{color:store.echartsColor,borderColor:store.echartsColor}}>中等压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.初一?.moderate)}

                                        </div>
                                    </div>
                                    <div class='flex-1 flex border-solid border-b border-l border-r'  style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                        <div class='flex-[2]  displayy border-solid border-r py-3'  style={{color:store.echartsColor,borderColor:store.echartsColor}}>高焦虑</div>
                                        <div class='flex-[2] displayy border-solid border-r'  style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                            {resultFormat(AMid?.anxiety?.初一?.hight)}

                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r '  style={{color:store.echartsColor,borderColor:store.echartsColor}}>高压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.初一?.hight)}

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class='flex'>
                                <div class="flex-1 border-solid  border-l border-b flex justify-center" style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                    <div class='flex-1  displayy  py-3'>初二</div>
                                </div>
                                <div class='flex flex-col  flex-[8]'>
                                    <div class='flex-1 flex border-solid  border-b border-l border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                        <div class='flex-[2]  displayy border-solid  border-r py-3' style={{color:store.echartsColor,borderColor:store.echartsColor}}>中等焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                            {resultFormat(AMid?.anxiety?.初二?.moderate)}
                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r ' style={{color:store.echartsColor,borderColor:store.echartsColor}}>中等压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.初二?.moderate)}

                                        </div>
                                    </div>
                                    <div class='flex-1 flex border-solid  border-b border-l border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                        <div class='flex-[2]  displayy border-solid  border-r py-3' style={{color:store.echartsColor,borderColor:store.echartsColor}}>高焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                            {resultFormat(AMid?.anxiety?.初二?.hight)}

                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r ' style={{color:store.echartsColor,borderColor:store.echartsColor}}>高压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.初二?.hight)}

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class='flex'>
                                <div class="flex-1 border-solid  border-l border-b flex justify-center" style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                    <div class='flex-1  displayy  py-3'>初三</div>
                                </div>
                                <div class='flex flex-col  flex-[8]'>
                                    <div class='flex-1 flex border-solid  border-b border-l border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                        <div class='flex-[2]  displayy border-solid  border-r py-3' style={{color:store.echartsColor,borderColor:store.echartsColor}}>中等焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                            {resultFormat(AMid?.anxiety?.初三?.moderate)}
                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r ' style={{color:store.echartsColor,borderColor:store.echartsColor}}>中等压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.初三?.moderate)}

                                        </div>
                                    </div>
                                    <div class='flex-1 flex border-solid  border-b border-l border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                        <div class='flex-[2] white displayy border-solid  border-r py-3' style={{color:store.echartsColor,borderColor:store.echartsColor}}>高焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                            {resultFormat(AMid?.anxiety?.初三?.hight)}

                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r ' style={{color:store.echartsColor,borderColor:store.echartsColor}}>高压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.初三?.hight)}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class='flex'>
                                <div class="flex-1 border-solid  border-l border-b flex justify-center " style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                    <div class='flex-1  displayy  py-3'>高一</div>
                                </div>
                                <div class='flex flex-col  flex-[8]'>
                                    <div class='flex-1 flex border-solid  border-b border-l border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                        <div class='flex-[2]  displayy border-solid  border-r py-3' style={{color:store.echartsColor,borderColor:store.echartsColor}}>中等焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                            {resultFormat(AMid?.anxiety?.高一?.moderate)}

                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r ' style={{color:store.echartsColor,borderColor:store.echartsColor}}>中等压力</div>

                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.高一?.moderate)}

                                        </div>
                                    </div>
                                    <div class='flex-1 flex border-solid  border-b border-l border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                        <div class='flex-[2]  displayy border-solid border-r py-3' style={{color:store.echartsColor,borderColor:store.echartsColor}}>高焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r' style={{color:store.echartsColor,borderColor:store.echartsColor}}>
                                            {resultFormat(AMid?.anxiety?.高一?.hight)}

                                        </div>
                                        <div class='flex-[2] displayy border-solid border-r ' style={{color:store.echartsColor,borderColor:store.echartsColor}}>高压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.高一?.hight)}

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class='flex'>
                                <div class="flex-1 border-solid  border-l border-b flex justify-center">
                                    <div class='flex-1  displayy  py-3'>高二</div>
                                </div>
                                <div class='flex flex-col  flex-[8]'>
                                    <div class='flex-1 flex border-solid  border-b border-l border-r'>
                                        <div class='flex-[2]  displayy border-solid  border-r py-3'>中等焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r'>
                                            {resultFormat(AMid?.anxiety?.高二?.moderate)}

                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r '>中等压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.高二?.moderate)}

                                        </div>
                                    </div>
                                    <div class='flex-1 flex border-solid  border-b border-l border-r'>
                                        <div class='flex-[2]  displayy border-solid  border-r py-3'>高焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r'>
                                            {resultFormat(AMid?.anxiety?.高二?.hight)}

                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r '>高压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.高二?.hight)}

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class='flex'>
                                <div class="flex-1 border-solid  border-l border-b flex justify-center">
                                    <div class='flex-1  displayy  py-3'>高三</div>
                                </div>
                                <div class='flex flex-col  flex-[8]'>
                                    <div class='flex-1 flex border-solid  border-b border-l border-r'>
                                        <div class='flex-[2] white displayy border-solid  border-r py-3'>中等焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r'>
                                            {resultFormat(AMid?.anxiety?.高三?.moderate)}

                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r '>中等压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.高三?.moderate)}

                                        </div>
                                    </div>
                                    <div class='flex-1 flex border-solid  border-b border-l border-r'>
                                        <div class='flex-[2] white displayy border-solid  border-r py-3'>高焦虑</div>
                                        <div class='flex-[2] displayy border-solid  border-r'>
                                            {resultFormat(AMid?.anxiety?.高三?.hight)}

                                        </div>
                                        <div class='flex-[2] displayy border-solid  border-r '>高压力</div>
                                        <div class='flex-[2] displayy'>
                                            {resultFormat(AMid?.pressure?.高三?.hight)}

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
})
const TableHeader = () => (<div class='h-[15%] classHeader flex border-solid  border '>
    <div class='flex-1 displayy border-solid  border-r'>年级</div>
    <div class='flex-[2]  displayy border-solid  border-r py-3'>问题</div>
    <div class='flex-[2] displayy border-solid  border-r '>年级总比例</div>
    {/* <div class='flex-[2] displayy border-solid  border-r'>各班级比例</div> */}
    <div class='flex-[2]  displayy border-solid  border-r py-3'>问题</div>

    <div class='flex-[2] displayy border-solid  border-r'>年级总比例</div>

</div>)