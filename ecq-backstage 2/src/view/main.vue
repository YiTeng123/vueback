<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <Menu v-memo="[]" v-once />
        <el-container class="classic-main">
          <!-- 标签栏 -->
          <Navbar />
          <el-main>
            <div class="homes">
              <RouterView v-slot="{ Component, route }">
                <transition appear name="fade-transform" >
                  <KeepAlive :include="store.keepAlive">
                    <component :is="Component" :key="route.path" />
                  </KeepAlive>
                </transition>
              </RouterView>
            </div>
          </el-main>

          <el-footer>
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Menu from "@/components/menu.vue";
import Header from "@/components/header.vue";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useStore } from '@/store/index'
const store = useStore()
</script>

<style lang="less" >
.common-layout {
  height: 100%;
  overflow: hidden;

  .el-container {
    width: 100%;
    height: 100%;

    .el-header {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 55px;
      padding: 0 15px 0 0;
      background-color: rgb(20, 20, 20);
      border-bottom: 1px solid #414243;
    }

    .el-container {
      height: calc(100% - 55px); // 减去头部高度
      width: 100%;

      .el-container {
        flex-direction: column;
        height: 100%;

        .el-main {
          padding: 15px 12px;

          .homes {
            // 防止元素外溢至盒外影响滚动布局,使用y则无法在盒子内部可视元素
            overflow-x: hidden;

            // display: flex;
            // align-items: center;
            // justify-content: center;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 20px;
            border: 1px solid #414243;
            border-radius: 4px;
            box-shadow: 0 0 12px rgb(0 0 0 / 5%);
          }
        }

        .el-footer {
          height: 30px;
          height: auto;
          border-top: 1px solid #414243;
        }
      }
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>