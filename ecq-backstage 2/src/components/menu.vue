<template>
  <el-aside>
    <div class="menu" :style="{ width: store.AsideButton ? '65px' : '210px' }">
      <el-scrollbar>
        <el-menu :default-active="menu_index" class="el-menu-vertical-demo" :collapse="store.AsideButton"
          :collapse-transition="false" background-color="rgb(20,20,20)" text-color="rgb(204, 204, 204)" >
          <el-menu-item class="menuIcon" v-for="(item)  in Aside" :key="item.path" :index="item.path"
            @click="handleClick">
            <el-icon>
              <component :is="item.component"></component>
            </el-icon>
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </el-aside>
</template>
    
<script lang="ts" setup >
import { ref } from "vue";
import { useStore } from "@/store/index";
import router from "@/router";
import { useRoute } from 'vue-router'
const store = useStore();
const route = useRoute()
const isCollapse = computed(() => {
  return store.AsideButton;
});
let uniArray: typeof store.tabPane = []
// 维护tabs和menu选中的同步
watch(() => route.fullPath, () => {
  menu_index.value = route.fullPath;
})
const menu_index = ref('/backstage/index')
let B:string[]=[]
const handleClick = (e: any) => {
  Promise.resolve(router.push(e.index)).then(() => {
    // 把路由原信息的数据注入到tabs栏中
    uniArray.push(route.meta)
    const map = new Map();
    uniArray.forEach((obj) => map.set(JSON.stringify(obj), obj));
    uniArray = Array.from(map.values());
    store.tabPane.length = 0
    store.tabPane.push(...uniArray)
    B.push(route.meta.name)
    store.keepAlive.length = 0
    store.keepAlive.push(...new Set(B))
  })
}
const Aside = reactive<Array<{
  component: string
  name: string
  path: string
}>>([
  {
    component: "HomeFilled",
    name: "首页",
    path: '/backstage/index'
  },
  // {
  //   component:"HomeFilled",
  //   name:"用户管理",
  //   path:'/backstage/user'
  // },
  {
    component: "HomeFilled",
    name: "数据总览",
    path: '/backstage/general'
  },
  {
    component: "HomeFilled",
    name: "数据图表",
    path: '/backstage/generalApi'
  },

  // {
  //   component:"HomeFilled",
  //   name:"脑电检测",
  //   path:'/backstage/eegdetection'
  // },
  // {
  //   component:"HomeFilled",
  //   name:"认知游戏",
  //   path:'/backstage/game'
  // },
  // {
  //   component:"HomeFilled",
  //   name:"专家意见",
  //   path:'/backstage/expert'
  // },
  {
    component: "HomeFilled",
    name: "学校概览",
    path: '/backstage/result'
  },
  {

    component: "HomeFilled",
    name: "班级概览",
    path: '/backstage/classResult'

  },
  {
    component: "HomeFilled",
    name: "年级概览",
    path: '/backstage/gradeResult'
  },
  // {
  //   component:"HomeFilled",
  //   name:"账户管理",
  //   path:'/backstage/account'
  // },
  {
    component: "HomeFilled",
    name: "步态检测",
    path: '/backstage/gait'
  },
  {
    component: "HomeFilled",
    name: "声音检测",
    path: '/backstage/voice'
  },
  {
    component: "HomeFilled",
    name: "表情检测",
    path: '/backstage/express'
  },

])

</script>
    
<style lang="less" scope>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-aside {
  width: auto;
  overflow: inherit;
  background-color: rgb(20, 20, 20);
  border-right: 1px solid #414243;
  transition: all 0.3s ease;

  .menu {
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: all 0.3s ease;

    .menuIcon {
      font-size: 15px;
      letter-spacing: 1px;
    }

    .el-radio-group {
      margin: 0 !important;
    }

    .el-menu {
      overflow-x: hidden;
      border-right: none;
      width: 100%;

      .el-menu-item.is-active {
        background-color: rgb(0, 0, 0);
        color: #fff;
      }

      .el-menu-item.is-active::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        content: "";
        background: rgb(156, 176, 174);
      }
    }
  }
}
</style>

