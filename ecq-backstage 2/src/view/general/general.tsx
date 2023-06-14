import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import http from "@/server/index";
import { ResultData, ReArray, personType, backRes, GenRow, } from '@/interface'
import { ElMessage, ElMessageBox } from 'element-plus';
import to from 'await-to-js';
import { organs } from '@/untils/formatData/organ'
import './general.scss'
import { Router } from "vue-router";
import { StoreTypes } from "@/store";
export default defineComponent({

    name: 'general',
    setup(prop, ctx) {
        const router = inject<Router>('router')!
        const store = inject<StoreTypes>('store')!
        const toPersonReort = (routerString: string, row: backRes) => {

            store.setgeneralRow(row)
            console.log(store.generalRow, row, '=====row')
            router.push({
                name: 'report',
                params: {
                    methods: routerString
                },
            })
        }
        onMounted(() => {
            getResult()
            // console.log(new URL(`/src/assets/image/journal.png`, import.meta.url).href,);
            // console.log(new URL(`/src/assets/image/journal.png`, import.meta.url));
        })
        let result = reactive<ReArray>([])
        const getResult = async () => {
            const [err, res] = await to<ResultData<ReArray>>(http.get('/user/getpoints'))
            const { data } = res!
            result.push(...data)
        }
        const handleMp4 = (mp4: string): void => {
            location.href = `http://106.13.13.107:3001/${mp4}`
            console.log(`http://106.13.13.107:3001/${mp4}`);
        }
        //find方法返回一个符合的item
        const organsFormat = computed(() => {
            return (code: string) => {
                return organs.find(item => {
                    return item.id === code
                })?.name
            }
        })
        const format = (code: string) => {
            return organs.find(item => {
                return item.id === code
            })?.name
        }
        const handleButton = <T extends string>(detail: T): void => {
            ElMessageBox.confirm(detail, 'Warning',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(async () => {
                exportExcel()
                ElMessage.success('导出成功')
            }).catch(() => {
                ElMessage('取消导出');
            })
        }
        // 导出表格  按钮点击后触发事件
        const exportExcel = () => {
            var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
            var wbout = XLSX.write(wb, {
                bookType: "xlsx",
                bookSST: true,
                type: "array"
            });
            try {
                FileSaver.saveAs(
                    new Blob([wbout], { type: "application/octet-stream" }),
                    //设置导出文件名称
                    "idea.xlsx"
                );
            } catch (e) {
                if (typeof console !== "undefined") console.log(e, wbout);
            }
            return wbout;
        }

        return () => (
            <div class="general">
                <el-table fit={true} height="100%" data={result} id="out-table"
                    cell-style={{ background: 'rgb(20, 20, 20)', color: '#cfd3dc' }}
                    header-cell-style={{ background: 'rgb(20, 20, 20)' }}>
                    <el-table-column prop="personID.name" label="姓名" width="80" />
                    <el-table-column prop="personID.age" label="年龄" width="60" align='center' />
                    <el-table-column prop="personID.sex" label="性别" width="60" align='center'>
                        {{
                            default: (scope: GenRow) => (
                                <span>
                                    {scope.row.personID.sex == "0" ? '女' : '男'}
                                </span>
                            )
                        }}
                    </el-table-column>
                    {/* <el-table-column prop="personID.nation" label="民族" width="80" /> */}
                    <el-table-column prop="personID.grade" label="年级" width="80" align='center' />
                    <el-table-column prop="personID.organ" label="机构名称" width="80">
                        {{
                            default: (scope: Record<'row', any>) => (
                                <span>
                                    {format(scope.row.personID?.organ)}
                                </span>
                            )
                        }}
                    </el-table-column>
                    <el-table-column prop="personID.identifier" label='编号' align='center'>
                        {{
                            default: (scope: GenRow) => (
                                <span>{scope.row.personID.identifier}</span>
                            )
                        }}
                    </el-table-column>

                    <el-table-column prop="gaintestPoint" label="步态检测" width='100' align='center' />
                    <el-table-column prop="looktestPoint" label="表情检测" align='center' >
                        {{
                            default: (scope: { row: backRes }) => (
                                scope.row.looktestPoint && scope.row.looktestPoint.map((item, index) => (
                                    <div>{item}</div>
                                )))
                        }}

                    </el-table-column>
                    <el-table-column prop="viocetsetPoint" label="声音检测" width="140" align='center' />
                    <el-table-column prop="gamesPoint" label="游戏评测" align='center' >
                        {{
                            default: (scope: { row: backRes }) => (
                                scope.row.gamesPoint && scope.row.gamesPoint[0] !== '暂无数据' ? (scope.row.gamesPoint as Array<Record<"time" | "name" | "score", string>>).map((item, index) => (
                                    <div>{item.name}得分:{item.score}用时:{item.time}</div>
                                )) : <div> </div>)

                        }}
                    </el-table-column>
                    <el-table-column prop="gaintestMp4" label="查看个人报告">
                        {{
                            default: (scope: { row: backRes }) => (
                                <el-button onClick={() => toPersonReort(scope.row._id, scope.row)}>onClick</el-button>
                            )
                        }}
                    </el-table-column>

                </el-table>
                {result.length ? <el-button onClick={() => handleButton('你确定要导出数据吗')}>导出</el-button> : null}
            </div>
        )
    }
})
