import { ReArray, ResultData } from "@/interface"
import http from "@/server/index";

import to from "await-to-js"
import { algorithm, statistics } from "@/untils/statistics";
// import { RenderSchool } from "./schoolResuts.useData";

export function useCascder() {
    // 下拉列表的存储数组
    let casValue = ref([])
    const options = [
        {
            value: '初一',
            label: '初一',
          
        },
        {
            value: '初二',
            label: '初二',
          
        },
        {
            value: '初三',
            label: '初三',
        },
        {
            value: '高一',
            label: '高一',
        },
        {
            value: '高二',
            label: '高二',
        },
        {
            value: '高三',
            label: '高三',
        },
    ]
  
    return {
        casValue, options
    }
}

export function  useProxy(){
    let flag = ref(true)
    let reportHandle: RenderGrade = reactive({
        average_emo: 0,
        average_stu: 0,
        distribution_emo: [[0, 0]],
        distribution_stu: [[0, 0]],
        
        classDistribution_emo:[],
        classDistribution_stu:[],
        classNameArr:[],


        keyBarData: [{ name: '', data: [] }],
        keyPerson: {},
        emoStats:{
            anxiety:{},
            pressure:{}

        },
        keyPieData: [],
        violinData_emo: [],
        violinData_stu: [],
		gradeDistribution_emo: [],
		gradeDistribution_stu: []
    })
    // 传给分级菜单的回调
    const CascderReq = async (val: Array<string>) => {
        flag.value = false
        let parmasObj = {
            gradeName: val[0],
        }
        const A = await useFinally(parmasObj)
        Object.keys(A).forEach(key => {
            reportHandle[key] = A[key]
        })
        flag.value = true
    }
    return{
        flag,
		reportHandle,
        CascderReq
    }
}

export type RenderGrade = {
    [x: string]: any
    average_emo: number
    average_stu: number

    classDistribution_emo:Array<{name:string,data:Array<number>}> | []
    classDistribution_stu:Array<{name:string,data:Array<number>}> |[]
    classNameArr:Array<string> | []

    distribution_emo: Array<[number, number]> |[]
    distribution_stu: Array<[number, number]>|[]
    // scatter_stu:Array<[number, number]>
    // scatter_emo:Array<[number, number]>
    keyBarData: Array<{ name: string, data: Array<number> }>
    keyPerson: {
        gad7: Array<{ name: string, sex: number }> | []
        gait: Array<{ name: string, sex: number }> | []
        mood: Array<{ name: string, sex: number }> | []
        phq9: Array<{ name: string, sex: number }> | []
        presure: Array<{ name: string, sex: number }> | []
        tired: Array<{ name: string, sex: number }> | []
        total: Array<[{ name: string, sex: number }, { name: string, sex: number }]> | Array<[{ name: string, sex: number }]> | []
    } | {}

    keyPieData: Array<{ name: 'string', value: number }>
    violinData_emo: Array<{ name: 'string', value: number }>
    violinData_stu: Array<{ name: 'string', value: number }>
}

// 请求年级数据
export async function useFinally(par: { gradeName: string }){
    let A: Promise<RenderGrade> = new Promise((resolve) => {
        resolve(getfin(par))
    })
    async function getfin(params: { gradeName: string }): Promise<RenderGrade> {
        const [err, res] = await to<ResultData<ReArray>>(http.get('/userApi/getClassPoint', params))
        const { data } = res!
      
        const param = {
            group: algorithm(statistics(data)),
            type:'grade'
        }
        const [finErr, finRes] = await to<ResultData<RenderGrade>>(http.post('/userApi/stats', param))
        const { data: echartsData } = finRes!
        return (echartsData)
    }
    return await getfin(par)
}

