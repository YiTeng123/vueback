<template>
    <div class="cardContainer" :style="{ display: 'flex', color: store.echartsColor }">
        <el-card class="box-card" :body-style="{ backGround: 'red' }">
            <template #header>
                <div class="card-header" :style="{ color: store.echartsColor }">
                    <span :style="{ display: 'flex', color: store.echartsColor }" class="text-2xl"
                        style="margin: 5px 10px;">
                        个人详细报告</span>
                    <el-button class="button" @click="pdfFunc">导出pdf</el-button>
                </div>
            </template>
            <div class=" item personCard text-xl" :style="{ color: store.echartsColor }">
                <div class="personItem flex-1">姓名:{{ name }}</div>
                <div class="personItem flex-[2]">编号:{{ identifier }}</div>
                <div class="personItem flex-[0.5]">年龄:{{ age }}</div>
                <div class="personItem flex-1">学校:{{ organsFormat(organ) }}</div>
                <div class="personItem flex-[0.8]">年级:{{ grade }}</div>
                <div class="personItem flex-[1.2]">班级:(待补充)</div>

            </div>

            <div class="text-xl item personCard" :style="{ color: store.echartsColor }">
                <div class="personItem2">测试时间:2023.03.09 16:18 </div>
                <div class="personItem2">情绪状态 {{ store.emoBar.total ? store.emoBar.total : null }}</div>

                <div class="personItem2">学习状态 {{ store.stuBar.stroop && store.stuBar.cognition ? store.stuBar.cognition +
                    store.stuBar.stroop : null }}</div>
                <!-- <div class="personItem2 text-xl text-white" >总分 中</div> -->
                <div class="canvas_item text-2xl  font-bold" :style="{ display: 'flex', color: store.echartsColor }">BIAI-评价:
                    <span class='text-red-600'> {{ appraiseText }}</span> </div>
                <!-- style={ display: flex, color: store.echartsColor, marginTop: 2px} -->
            </div>
        </el-card>

    </div>
</template>
<script lang="ts" setup>
import { backRes } from '@/interface';
import { organs } from '@/untils/formatData/organ';
import { ElMessage, ElMessageBox } from 'element-plus';
import htmlToPdf from '@/untils/js/htmlToPdf'
import { useStore, } from "@/store";
import { appraiseMood } from './text';
const store = useStore();
const Props = defineProps<{
    personMsg: backRes
}>()
const { personMsg: { personID: { name, identifier, age, organ, grade } } } = Props
const organsFormat = computed(() => {
    return (code: string) => {
        return organs.find(item => {
            return item.id === code
        })?.name
    }
})
const pdfFunc = async () => {
    store.setisPrint()
    ElMessageBox.confirm('你确定要导出本次报告吗?', 'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {

        const htmlfPromise = new Promise((resolve) => {
            setTimeout(() => {
                // 这里的resolve应该标记目标函数,而不是标记外面的宏任务定时器
                resolve(htmlToPdf.getPdf(`${organ}-${grade}-4班-${name}#${identifier}`))
            }, 500)
        })
        htmlfPromise.then(() => {
            store.setisPrint()
            setTimeout(() => { ElMessage.success('导出成功') }, 2000)
        })

    }).catch(() => {
        ElMessage('取消导出');
        store.setisPrint()
    })
}
const appraiseText = computed(() => {
    if (store.emoBar.total) {
        if (store.emoBar.total <= 20) {
            if (
                (store.emoBar.depressed + store.emoBar.anxiety + store.emoBar.mood)
                < (store.emoBar.tired + store.emoBar.presure + store.emoBar.positive)
            ) {
                return appraiseMood['0']
            }
            else return appraiseMood['2']
        }
        else if (store.emoBar.total > 20 && store.emoBar.total <= 60) {
            if (
                (store.emoBar.depressed + store.emoBar.anxiety + store.emoBar.mood)
                < (store.emoBar.tired + store.emoBar.presure + store.emoBar.positive)
            ) {
                return appraiseMood['1']
            }
            else return appraiseMood['3']
        }
        else {
            return appraiseMood['4']
        }
    }
    else {
        return null
    }
})

</script>  

<style  lang="scss">
.cardContainer {
    .el-card {
        opacity: 0.8;
    }

    .el-card__header {
        padding: 2px;
    }

    .card-header {
        display: flex;
        // justify-content: flex-start;
        align-items: center;
        color: white
    }

    .el-card__body {
        padding: 10px;
    }

    .personCard {
        padding: 5px;
        margin-bottom: 0;
        display: flex;
        // justify-content: space-around;
        width: 100%;


        .personItem2 {
            margin-right: 100px;
        }
    }

    .box-card {
        width: 100%;
    }
}
</style>
  