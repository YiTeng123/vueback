<template>
  <div class="navBox">
    <el-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs" 
      @tab-click="handleTabsClick">
      <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
        <!-- {{ item.content }} -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { log } from "console";
import { TabsPaneContext } from "element-plus";
import { ref } from "vue";
const store = useStore()


const editableTabsValue = ref("2");
let editableTabs = ref([
  {
    // icon: string;
	path: 'string',
	close: false,
    title: "Tab 1",
    name: "1",
    // content: "Tab 1 content",
  },
  {
    path: 'string',
	close: false,
    title: "Tab 2",
    name: "2",
    // content: "Tab 2 content",
  },
]);
const handleTabsClick = (pane: TabsPaneContext, ev: Event) => {
  console.log(toRaw(pane));

}

</script>

<style lang="less" scoped>
.navBox {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #414243;

  :deep(.el-tabs__header) {
    border-bottom: none;
  }

  :deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
    border: none;
  }

  :deep(.el-tabs__item) {
    border: none;
    color: rgb(204, 204, 204);
  }

  :deep(.el-tabs__item:hover) {
    color: rgb(204, 204, 204);
  }

  // 修改活跃类,控制台左边读到
  :deep(.el-tabs__item.is-active) {
    border-bottom: 2px solid #98b0ae;
    color: #98b0ae;
  }
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>