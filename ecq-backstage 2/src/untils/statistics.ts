import { Eyegame } from "@/components/echarts/types";
import { backRes } from "@/interface";



export const statistics = (parmasArray: Array<backRes>) => {
    const filterRes = parmasArray.filter((item) => {
        return isObj(item.cliAdvice)
            && Object.keys(item.cliAdvice).length === 2
            && item.personID?.classApi!==undefined
            &&item.personID?.gradeApi!==undefined
            && item.eegResult?.concentrate
            && item.gaintestPoint !== '暂无数据'
            && item.gamesPoint.length === 2
            && item.looktestPoint.length === 4
            && item.viocetsetPoint !== ''
    })
    return filterRes



    function isObj(parmas: any): boolean {
        return Object.prototype.toString.call(parmas) === '[object Object]'
    }

}

export const algorithm = (parmasArray: Array<backRes>) => {
    const algorithmArray = parmasArray.map((item) => {

        const phq9 =  Math.round((item.cliAdvice.phq9 * 100) / 27)
        const gad7 =Math.round((item.cliAdvice.gad7 * 100 /21)) 

        // 脑电疲劳度
        const eegTired = Math.round(Number(item.eegResult.tired) * 0.5)
        // 表情疲劳度
        const getNumberFromString = (str: string): number => {
            var arr = str.split(':');
            var numStr = arr[1];
            var num = parseInt(numStr);
            return num;
        }
        const faceTired = Math.round(Number(getNumberFromString(item.looktestPoint[2])) * 0.5)
        // 疲劳度
        const tired = eegTired + faceTired
        // 脑电压力值
        const eegPresure = Math.round(Number(item.eegResult.presure) * 0.5)
        //表情压力值
        const facePresure = Math.round(Number(getNumberFromString(item.looktestPoint[3])) * 0.5)
        // 压力值 
        const presure = eegPresure + facePresure
        //脑电情绪值
        const eegMood = Math.round(Number(item.eegResult.mood) * 0.5)
        // 表情情绪值
        const faceMood = Math.round(Number(getNumberFromString(item.looktestPoint[1])) * 0.5)
        // 情绪值
        const mood = eegMood + faceMood

        // 步态积极性
        const regex = /积极度：(.*)\s+消极度：/;
        const match = regex.exec(item.gaintestPoint)!;
        const gait = Number(match[1])

        const totalFormat = (parmas: number) => Math.round(parmas * 0.15)
        // 情绪值
        const totalPoints1 = eegMood && faceMood && totalFormat(eegMood + faceMood)
        // 压力值
        const totalPoints2 = eegPresure && facePresure && totalFormat(100 - eegPresure - facePresure)
        // 疲劳值
        const totalPoints3 = eegTired && faceTired && totalFormat(100 - eegTired - faceTired)
        // 测焦虑
        const totalPoints4 = gad7 && Math.round((102 - gad7) * 0.2)
        // 测抑郁
        const totalPoints5 = phq9 && Math.round((102 - phq9) * 0.25)
        // 步态积极性
        const totalPoints6 = gait && Math.round(gait * 0.1)
        // 总分
        const totalPoint = totalPoints1 + totalPoints2 + totalPoints3 + totalPoints4 + totalPoints5 + totalPoints6

        let stroopGame
        let cognitionGame
        // 注意抗干扰 Stroop
        stroopGame = (item.gamesPoint as unknown as Array<Eyegame>).find((item) => item.name === 'Stroop')
        // 认知灵活度
        cognitionGame = (item.gamesPoint as unknown as Array<Eyegame>).find((item) => item.name === '认知灵活性')
        const { focus, reaction: stoopReaction, antiInterference } = stroopGame!.detail
        const { ability_mixture, ability_single, reaction, conversion_price } = cognitionGame!.detail
        const MathFotmat = (parmar: string, n: number) => Math.round(Number(parmar) * n)
        // 认知灵活度// cognitionGame
        // 10%简单任务能力
        const single = MathFotmat(ability_single, 0.1)
        // 30%复杂任务能力
        const difficult = MathFotmat(ability_mixture, 0.3)
        // 20%反应速度
        const react = MathFotmat(reaction, 0.2)
        // 40%任务转换能力
        const transformtion = MathFotmat(reaction, 0.4)

        // 注意抗干扰Stroop// stroopGame
        // 35%专注能力
        const focustion = MathFotmat(focus, 0.4)
        // 45%抗干扰
        const stroopAn = MathFotmat(antiInterference, 0.45)
        // 20%专注速度
        const focusSpeed = MathFotmat(stoopReaction, 0.20)

        let totalStroopGame = (focustion + stroopAn + focusSpeed) / 2
        let totalcognitionGame = (single + difficult + react + transformtion) / 2

        // 综合得分
        const totalGame = (totalStroopGame + totalcognitionGame)

        return {

            person: item.personID,
            phq9,
            gad7,

            tired,
            presure,
            mood,
            gait,
            totalPoint,
            // 学习状态
            totalStroopGame,
            totalcognitionGame,
            totalGame
        }
    })
    return algorithmArray

}