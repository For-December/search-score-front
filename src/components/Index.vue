<script setup lang="ts">
import {isLogin, pageNum} from "../types/globalData.ts";
import Login from "./Login.vue";
import SearchScore from "./SearchScore.vue";

import {useMessage} from 'naive-ui'
const message = useMessage()

import {onMounted, ref} from "vue";
import {TabsInst} from "naive-ui";
import {autoLogin} from "../api/globalFunc.ts";
import Upload from "./Upload.vue";

const tabsInstRef = ref<TabsInst | null>(null)

onMounted(() => {
  autoLogin().then((res) => {
    if (res) {
      message.success("自动登陆成功！", {
        closable: true,
        duration: 3000
      })
      isLogin.value = true
    } else {
      message.error("自动登陆失败！", {
        closable: true,
        duration: 3000
      })

      isLogin.value = false
      pageNum.value = 0

    }


  })
})
const handleBeforeLeave = (tabName: number) => {
  if (tabName !== 0 && !isLogin.value) {
    message.error("请先登录~", {
      closable: true,
      duration: 3000
    })
    return false
  }
  return true
}


</script>

<template>
  <div class="container text-center overflow-hidden" style="min-height: max-content;">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <div class="row justify-content-center">
        <div class="col-12 col-md-12 col-lg-6 ">
          <h1 style="margin-bottom: 1vw;">查给分</h1>
        </div>

      </div>

      <n-tabs ref="tabsInstRef"
              type="segment"
              animated
              v-model:value="pageNum"
              @before-leave="handleBeforeLeave">
        <n-tab-pane :name="0" tab="登录">
          <Login v-if="!isLogin"/>
          <div v-else>
            <h3>已登录</h3>
          </div>

        </n-tab-pane>
        <n-tab-pane :name="1" tab="查询">
          <SearchScore/>

        </n-tab-pane>
        <n-tab-pane :name="2" tab="上传">
          <Upload/>
        </n-tab-pane>
      </n-tabs>

    </div>
  </div>
</template>

<style scoped>

</style>