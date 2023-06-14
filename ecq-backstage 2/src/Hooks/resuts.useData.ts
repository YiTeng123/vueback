import to from 'await-to-js';
import http from "@/server/index";
import { ReArray, ResultData } from '@/interface';
import { algorithm, statistics } from '@/untils/statistics';

// 情绪状态
export function useData() {
    const emoDefault = reactive([
        { name: 'mood', value: NaN}, { name: 'presure', value: NaN}, { name: 'tired', value: NaN}, { name: 'phq9', value: NaN}, { name: 'gad7', value: NaN}, { name: 'gait', value: NaN},
        { name: 'mood', value: NaN}, { name: 'presure', value: NaN}, { name: 'tired', value: NaN}, { name: 'phq9', value: NaN}, { name: 'gad7', value: NaN}, { name: 'gait', value: NaN},
        { name: 'mood', value: NaN}, { name: 'presure', value: NaN}, { name: 'tired', value: NaN}, { name: 'phq9', value: NaN}, { name: 'gad7', value: NaN}, { name: 'gait', value: NaN},
        { name: 'mood', value: NaN}, { name: 'presure', value: NaN}, { name: 'tired', value: NaN}, { name: 'phq9', value: NaN}, { name: 'gad7', value: NaN}, { name: 'gait', value: NaN},
        { name: 'mood', value: NaN}, { name: 'presure', value: NaN}, { name: 'tired', value: NaN}, { name: 'phq9', value: NaN}, { name: 'gad7', value: NaN}, { name: 'gait', value: NaN},
        { name: 'mood', value: NaN}, { name: 'presure', value: NaN}, { name: 'tired', value: NaN}, { name: 'phq9', value: NaN}, { name: 'gad7', value: 0}, { name: 'gait', value: NaN},
    ])
    const xAxis = reactive(['抑郁指数', '焦虑指数', '疲劳度', '压力值', '情绪值', ])
    const xAxis_en = reactive(['phq9', 'gad7', 'tired', 'presure', 'mood', ])
    return {emoDefault, xAxis, xAxis_en }
}
// 学习状态
export function usestuData() {
    const stuDefault = reactive([
        { name: 'stroop', value: NaN}, { name: 'cognition', value: NaN},
        { name: 'stroop', value: NaN}, { name: 'cognition', value: NaN},
        { name: 'stroop', value: NaN}, { name: 'cognition', value: NaN},
        { name: 'stroop', value: NaN}, { name: 'cognition', value: NaN},
        { name: 'stroop', value: NaN}, { name: 'cognition', value: 0},
        { name: 'stroop', value: NaN}, { name: 'cognition', value: 0},
    ])
    const xAxis = reactive(['认知注意力', '认知灵活度'])
    const xAxis_en = reactive(['stroop', 'cognition'])
    return { stuDefault, xAxis, xAxis_en }
}

export function useGrade() {
    const gradePrimary = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
    const gradeJunior = ['初一', '初二', '初三']
    const gradeSenior = ['高一', '高二', '高三']
    return {
        gradePrimary, gradeJunior, gradeSenior
    }


}

type Algo = ReturnType<typeof algorithm>
export function useFinally(par: { className: string, gradeName: string }, isSchool = false): Promise<RenderClass> {

    let fin = reactive<ReArray>([])
    let A: Promise<RenderClass> = new Promise((resolve) => {
        // onBeforeMount(() => {
        // console.log(111)
        resolve(getfin(par))
        // })
    })
    async function getfin(params: { className: string, gradeName: string }): Promise<RenderClass> {
        const [err, res] = await to<ResultData<ReArray>>(http.get('/userApi/getClassPoint', params))
        const { data } = res!
        // fin.length = 0
        // fin.push(...data)
        // return  algorithm(statistics(data)) 
        const param = {
            group: algorithm(statistics(data)),
            type:'class'
        }
        console.log(param, 'param')
        const [finErr, finRes] = await to<ResultData<RenderClass>>(http.post('/userApi/stats', param))
        const { data: echartsData } = finRes!
        return (echartsData)
    }
    return A
}
export function useReactive() {
    let flag = ref(true)
    let reportHandle: RenderClass = reactive({
        average_emo: 0,
        average_stu: 0,
        scatter_emo: [[0, 0]],
        scatter_stu: [[0, 0]],
        keyBarData: [{ name: '', data: [] }],
        keyPerson: {
            gad7: [],
            gait: [],
            mood: [],
            phq9: [],
            presure: [],
            tired: [],
            total: []
        },
        keyPieData: [],
        violinData_emo: [],
        violinData_stu: [],
    })
    const handleReq = async (val: Array<string>) => {
        flag.value = false
        let parmasObj = {
            gradeName: val[0],
            className: val[1]
        }
        const A = await useFinally(parmasObj)
        // reportHandle.length=0
        // reportHandle.push(...A)
        console.log(A)
        Object.keys(A).forEach(key => {
            reportHandle[key] = A[key]

        })
        flag.value = true
    }

    return {
        flag, reportHandle, handleReq
    }

}




export type RenderClass = {
    [x: string]: any

    average_emo: number
    average_stu: number
    // distribution_emo: Array<[number, number]>
    // distribution_stu: Array<[number, number]>
    scatter_stu:Array<[number, number]>
    scatter_emo:Array<[number, number]>
    keyBarData: Array<{ name: string, data: Array<number> }>
    keyPerson: {
        gad7: Array<{ name: string, sex: number }> | []
        gait: Array<{ name: string, sex: number }> | []
        mood: Array<{ name: string, sex: number }> | []
        phq9: Array<{ name: string, sex: number }> | []
        presure: Array<{ name: string, sex: number }> | []
        tired: Array<{ name: string, sex: number }> | []
        total: Array<[{ name: string, sex: number }, { name: string, sex: number }]> | Array<[{ name: string, sex: number }]> | []
    }

    keyPieData: Array<{ name: 'string', value: number }>
    violinData_emo: Array<{ name: 'string', value: number }>
    violinData_stu: Array<{ name: 'string', value: number }>
}