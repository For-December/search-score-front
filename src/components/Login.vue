<script setup lang="ts">
import {reactive, ref} from "vue";
import {FormInst, FormItemRule, FormRules} from "naive-ui";


import {webPostAuth} from "../api/auth.ts";
import {openidKey, tokenExpireKey, tokenKey} from "../api/globalConst.ts";
import AuthMsg = Items.AuthMsg;
import {pageNum} from "../types/globalData.ts";
import {useMessage} from 'naive-ui'

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const model = reactive<{
  code: string
}>(
    {
      code: ''
    }
)
const rules: FormRules = {
  code: [
    {
      required: true,
      validator(_: FormItemRule, value: string) {
        console.log(value)
        if (!value) {
          return new Error('请输入内测码')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
}


const onSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {

      webPostAuth(model.code).then((res) => {
        const d = res.data as AuthMsg
        localStorage.setItem(tokenKey, d.token)
        localStorage.setItem(tokenExpireKey, new Date(d.expirationAt).getTime().toString())
        message.success('验证登录成功！')
        localStorage.setItem(openidKey, model.code)
        pageNum.value = 1

      }).catch((err) => {
        message.error(err, {
          closable: true,
          duration: 3000
        })
      })

    } else {
      console.log(errors)

      message.error('验证失败', {
        closable: true,
        duration: 3000
      })
    }
  })
}

</script>

<template>
  <n-form ref="formRef" :model="model" :rules="rules" style="margin-top: 6vw;">
    <n-form-item path="code" size="large">
      <template #label>
        <h1>内测码</h1>
      </template>
      <n-input v-model:value="model.code" @keydown.enter.prevent placeholder="输入从机器人获取的内测码"/>
    </n-form-item>

    <n-button
        :disabled="model.code === ''"
        round
        type="primary"
        @click="onSubmit"
    >
      验证
    </n-button>
  </n-form>

</template>

<style scoped>

</style>