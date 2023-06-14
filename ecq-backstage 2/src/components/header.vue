<template>
  <div class="displayy headLeft">
    <div class="headBox">
      <el-image  class="elimg" style="height: 24px ;" :src="headurl"  />
      <div class="displayy headTitle">情绪认知定量系统管理后台</div>
    </div>

    <el-icon @click="handleButton" class="headIcon"
      ><Expand v-if="!store.AsideButton" /><Fold v-else
    /></el-icon>
  </div>
  
  <div class="headRight">
    <!-- <div class="avanda"></div> -->
       <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <div class="userDrop">
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="newDrop" >
            <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
            <el-dropdown-item :icon="CirclePlusFilled">
              Action 2
            </el-dropdown-item>
            <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
            <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
            <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    
  </div>
</template>
    
<script setup lang='ts'>
import { useStore } from "@/store/index";
import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from '@element-plus/icons-vue'
const store = useStore();
const handleButton = () => {
  store.setAsideButton();
};
 const headurl =new URL(`../assets/headImg/Logoo.png`, import.meta.url).href
</script>
    
<style scoepe lang="less">

.block-col-2 .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.headLeft{

.headBox{
  .headTitle{
        font-size: 21.5px;
    font-weight: bold;
    color: #dadada;
    white-space: nowrap;
  }
  .elimg{
    margin: 0 20px ;
  }
  display: flex;

}
}
.headRight{
  // .avanda{
  //   height: 40px;
  // }
  .userDrop{
    width: 40px;
    height: 40px;
    background-image: url("../assets/headImg/avatar.gif");
    background-position: center;
    border-radius: 50% 50%;
    margin-right: 30px;
  }
  :deep(.el-popper.is-light){
    background:red
  }
}
.headIcon {
  margin: 0px 20px;
  font-size: 22px;
  cursor: pointer;
  color: white;
}



</style>


<style>



</style>
  
