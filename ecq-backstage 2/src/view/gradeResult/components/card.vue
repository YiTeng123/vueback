<template>
    <div class="cardContainer" :style="{ display: 'flex', color: store.echartsColor }">
        <el-card class="box-card" :body-style="{ backGround: 'red' }">
            <template #header>
                <div class="card-header" :style="{ color: store.echartsColor }">
                    <span :style="{ display: 'flex', color: store.echartsColor }" style="margin: 5px 10px;">学校报告</span>
                    <el-button class="button" @click="pdfFunc">导出pdf</el-button>
                </div>
            </template>
            <div class="text item personCard text-xl" :style="{ color: store.echartsColor }">
                <div class="personItem">学校:{{ store.authName }}</div>
                <div class="personItem">年级数:{{  (attrs?.classNameArr as any )?.length }}</div>
                <div class="personItem">班级数:{{ (attrs?.classNameArr as any )?.length}}</div>
                <div class="personItem">总人数:{{ Number(attrs?.numberOfBoy)+ Number(attrs?.numberOfGril)}}</div>
                <div class="personItem">需关注:{{(attrs?.emoStats as any)?.numberOfLower60 }}</div>
                <!-- <div class="personItem">班级:(待补充)</div> -->

            </div>

            <div class=" item personCard" :style="{ color: store.echartsColor }">
                <!-- <div class="personItem2 text-xl">测试时间:2023.03.09 16:18 </div> -->
                <!-- <div class="personItem2">情绪状态 80</div>
                <div class="personItem2">学习状态 80</div>
                <div class="personItem2" style="font-size: 20px,color: #000;">总分 中</div> -->
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
import { resetEcharts } from '@/untils/resetRender';

const store = useStore();
const attrs = useAttrs()
watchEffect(()=>{
    {  console.log(attrs,'attrs')}

})
// const { personMsg: { personID: { name, identifier, age, organ, grade } } } = Props
const organsFormat = computed(() => {
    return (code: string) => {
        return organs.find(item => {
            return item.id === code
        })?.name
    }
})

const pdfFunc = async () => {
    store.setisPrint()
    await resetEcharts(store.setRender)
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
                resolve(htmlToPdf.getPdf(`年级报告`))
            }, 500)
        })
        htmlfPromise.then(async () => {
            store.setisPrint()
            setTimeout(() => { ElMessage.success('导出成功') }, 2000)
            await resetEcharts(store.setRender)

        })

    }).catch( async() => {
        store.setisPrint();
        ElMessage('取消导出');
        await resetEcharts(store.setRender)
    })
}


</script>  

<style  lang="scss">
.cardContainer {
    // position: sticky;
    // position: -webkit-sticky;
    // top: 0;

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
        width: 100%;

        .personItem {
            width: 100%;
        }

        .personItem2 {
            margin-right: 100px;
        }
    }

    .box-card {
        width: 100%;
    }
}
</style>
  