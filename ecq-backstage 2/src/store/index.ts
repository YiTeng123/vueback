/**
 * @install
 * npm install pinia
 * npm i pinia-use-persist
 */


import { backRes } from '@/interface'
import { defineStore } from 'pinia'
import { Names } from './store.namespace'
type Eyegame = {
    detail: {
        ability_mixture: string
        ability_single: string
        conversion_price: string

        reaction: string

        focus: string,
        antiInterference: string
    }
    eyemove: Array<[number, number]>
    eyemoveData: { focus: string, anxiety: string }
    name: string
    score: string
    time: number
}
//  pinia全局状态管理
export const useStore = defineStore(Names.stageName, {
    // 侧边栏收缩状态管理
    state: () => {
        return {
            AsideButton: <boolean>true,
            loginToken: <string>'',
            loginLevel: <string>'',
            loginName: <string>'',
            loginImg: <string>'',
            loginRole: <string>'',
            authName: <string>'',

            tabPane:<Array<{	
                // icon: string;
                title: string;
                path: string;
                name: string;
                icon:string,
                close: boolean;}>>[],
            // voiceecharts组件向父级传递数据
            voiceToParent: <Array<{ name: string, value: number }>>[{ name: '', value: 2 }, { name: '', value: 2 }, { name: '', value: 2 }],
            emoBar: {
                depressed: 0,
                anxiety: 0,
                mood: 0,
                tired: 0,
                presure: 0,
                positive: 0,
                total: 0
            },
            stuBar: {
                stroop: 0,
                cognition: 0
            },


            stuLearnState: <number>0,

            generalRow: {
                _id: <string>'',
                personID: <string>'',
                gaintestPoint: <string>'',
                looktestPoint: <Array<string>>[],
                viocetsetPoint: <string>'',
                gameReview: <string>'',
                Addvice: <string>'',
                gaintestMp4: <string>'',
                gamesPoint: <Array<Eyegame>>[],
                eegResult: <{
                    concentrate: string, mood: string, presure: string, relax: string, tired: string,
                    rawData: {
                        type: string, Delta: Array<string>,
                        Theta: Array<string>, Alpha: Array<string>,
                        Beta: Array<string>, Gamma: Array<string>,
                        channel1: Array<string>, channel2: Array<string>,
                        channel3: Array<string>, channel4: Array<string>
                    }
                }>
                    {
                        concentrate: '',
                        mood: '',
                        presure: '',
                        relax: '',
                        tired: '',
                        rawData: {
                            type: '',
                            channel1: [''],
                            channel2: [''],
                            channel3: [''],
                            channel4: [''],


                        }
                    },
                cliAdvice: <{ gad7: number, phq9: number }>{}
            },
            isPrint: <boolean>false,
            isRender:<boolean>true,
            color: <string>'red',

            keepAlive:<Array<string>>[
                // 'classResult','express','gait','general','generalApi','gradeResult','index','result','voice'
            ]
        }
    },
    // 持久化存储
    persist: {
        enabled: true,
        encryptionKey: 'my-test',
    },
    // 类似计算属性,可以修饰值
    getters: {
        echartsColor(): string {
            return this.isPrint ? '#0d0d0d' : '#fff'
        },
        darkbackground(): string {
            return this.isPrint ? 'dark' : ''
        }
    },
    actions: {
        setAsideButton<T>(): void {
            this.AsideButton = !this.AsideButton
        },
        setRender(){
            this.isRender=!this.isRender
        },
        setloginToken(res: string): void {
            this.loginToken = res
        },
        setloginLevel(res: string): void {
            this.loginLevel = res
        },
        setloginNameImg(name: string, img: string): void {
            this.loginName = name
            this.loginImg = img
        },
        setgeneralRow(obj: any): void {
            this.generalRow = obj
        },
        setisPrint(): void {
            this.isPrint = !this.isPrint
        },
        setcolor(color: string): void {
            this.color = color
        },

        removeTabPane(path:string){
            this.tabPane=this.tabPane.filter((item)=>item.path!==path)
        },
        removeKeepAlive(name:string){
            this.keepAlive=this.keepAlive.filter((item)=>item!==name)
        }

    }
})
// const store =useStore()
export type StoreTypes = ReturnType<typeof useStore>