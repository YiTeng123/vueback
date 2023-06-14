import to from 'await-to-js';
import http from "@/server/index";
import { ReArray, ResultData } from '@/interface';
import { algorithm, statistics } from '@/untils/statistics';

// 情绪状态
export function useData() {
    const xAxis = reactive(['抑郁指数', '焦虑指数', '疲劳度', '压力值', '情绪值',])
    const xAxis_en = reactive(['phq9', 'gad7', 'tired', 'presure', 'mood',])
    return { xAxis, xAxis_en }
}
// 学习状态
export function usestuData() {
    const xAxis = reactive(['认知注意力', '认知灵活度'])
    const xAxis_en = reactive(['stroop', 'cognition'])
    return { xAxis, xAxis_en }
}
export function useGrade() {
    const gradePrimary = ['初一', '初二', '初三', '高一', '高二', '高三', '高四']
    const gradeJunior = ['初一', '初二', '初三']
    const gradeSenior = ['高一', '高二', '高三']
    return {
        gradePrimary, gradeJunior, gradeSenior
    }
}

type Algo = ReturnType<typeof algorithm>

// 请求数据
export async function  useFinally(): Promise<RenderSchool> {
    let fin = reactive<ReArray>([])
    async function getfin(): Promise<RenderSchool> {
        const [err, res] = await to<ResultData<ReArray>>(http.get('/userApi/getpoints'))
        const { data } = res!
        fin.length = 0
        fin.push(...data)
        // return  algorithm(statistics(data)) 
        const param = {
            group: algorithm(statistics(data)),
            type: 'school'
        }
        const [finErr, finRes] = await to<ResultData<RenderSchool>>(http.post('/userApi/stats', param))
        const { data: echartsData } = finRes!
        return (echartsData)
    }
    return await getfin()
}

export function useReactive() {
    let flag = ref(true)
    let reportHandle: RenderSchool = reactive({
        average_emo: 0,
        average_stu: 0,
        distribution_emo: [[0, 0]],
        distribution_stu: [[0, 0]],
        keyBarData: [{ name: '', data: [] }],
        keyPerson: {},
        emoStats: {
            anxiety: {},
            pressure: {},
            numberOfLower20: NaN,
            numberOfLower60: NaN,
            rateOfLower20: NaN,
            rateOfLower60: NaN

        },
        keyPieData: [],
        violinData_emo: [],
        violinData_stu: [],
        gradeDistribution_emo: [],
        gradeDistribution_stu: []
    })
    // async function handleReq() {
    //     flag.value = false
    //     // 请求生命周期
    //     const A = await useFinally()
    //     // reportHandle.length=0
    //     // reportHandle.push(...A)
    //     Object.keys(A).forEach(key => {
    //         reportHandle[key] = A[key]
    //     })
    //     flag.value = true
    // }
    // handleReq();
    onMounted(async()=>{
        flag.value = false
        // 请求生命周期
        const A = await useFinally()
        // reportHandle.length=0
        // reportHandle.push(...A)
        Object.keys(A).forEach(key => {
            reportHandle[key] = A[key]
        })
        flag.value = true
    })
    return {
        flag,
        reportHandle
    }
}

export type SchoolPierre = Partial<{
    初一: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    初二: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    初三: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    高一: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    高二: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
    高三: { hight: number, moderate: number, rateOfhight: number, rateOfmoderate: number },
}>

export type RenderSchool = {
    [x: string]: any

    average_emo: number
    average_stu: number
    distribution_emo: Array<[number, number]>
    distribution_stu: Array<[number, number]>

    emoStats: {
        anxiety: SchoolPierre
        pressure: SchoolPierre
        numberOfLower20: number,
        numberOfLower60: number,
        rateOfLower20: number,
        rateOfLower60: number
    }
    keyBarData: Array<{ name: string, data: Array<number> }>
    keyPerson: {
        [key: string]: {
            gad7: Array<{ name: string, sex: number }>
            gait: Array<{ name: string, sex: number }>
            mood: Array<{ name: string, sex: number }>
            phq9: Array<{ name: string, sex: number }>
            presure: Array<{ name: string, sex: number }>
            tired: Array<{ name: string, sex: number }>
        }
    }
    keyPieData: Array<{ name: string, value: number }>
    violinData_emo: Array<{ name: 'string', value: number }>
    violinData_stu: Array<{ name: 'string', value: number }>
    gradeDistribution_emo: Array<{ name: 'string', data: Array<number> }>
    gradeDistribution_stu: Array<{ name: 'string', data: Array<number> }>
}