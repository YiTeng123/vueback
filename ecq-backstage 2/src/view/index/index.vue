<template>
  <div class="index displayy">
    <img class="indexImg" src="../../assets/image/welcome.png" alt="">
  </div>
</template>

<script setup lang="ts">
import {useStore} from "@/store/index"
import { storeToRefs } from "pinia";
const store = useStore()
const {setloginToken} = store
let { loginToken,loginRole} =storeToRefs(store)
 
</script>

<style lang="less" scoped name='index'>
.index {
  width: 100%;
  height: 100%;
  .indexImg {
    width: 70%;
    margin-bottom: 20px;
  }
}
</style>

