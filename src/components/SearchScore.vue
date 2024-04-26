<script setup lang="ts">
// defineProps<{ msg: string }>()

import {ref} from "vue";

import {useMessage} from 'naive-ui'
import {webGetScoreInfos} from "../api/scores.ts";
import {getGlobalToken} from "../types/globalData.ts";
import {autoLogin} from "../api/globalFunc.ts";
import ScoreInfo = Items.ScoreInfo;
import TransDef = Items.TransDef;
import {pendingOpenFuncCode} from "../api/globalConst.ts";

const scoreInfos = ref<ScoreInfo[]>([])
const message = useMessage()

const teacherName = ref('')
const courseName = ref('')
const onClickSubmit = () => {
  if (teacherName.value.length === 0 && courseName.value.length === 0) {
    message.warning('请至少填写一个查询条件~', {
      closable: true,
      duration: 3000
    })
    return
  }
  const token = getGlobalToken()
  webGetScoreInfos(teacherName.value,
      courseName.value, token).then((res) => {
        if(res.code===200){
          scoreInfos.value.length = 0
          const d = res.data as ScoreInfo[]
          d.forEach(t => scoreInfos.value.push(t))
          return
        }
        if (res.code===pendingOpenFuncCode){
          pendingOpenInfo.value = res.msg
          showModal.value=true
        }

  }).catch((err: TransDef) => {

    if (err.code === 401) {
      autoLogin().then((res) => {
        if (res) {
          message.warning('token自动续签成功,请重新查询', {
            closable: true,
            duration: 3000
          })

        }
      })
      return
    } else {
      message.error(err.msg, {
        closable: true,
        duration: 3000
      })
    }

  })
}

const showModal = ref(false)

const pendingOpenInfo = ref('')

</script>

<template>
  <!--  <n-button type="primary">naive-ui</n-button>-->

  <n-modal :show="showModal"
           preset="dialog"
           title="错误提示">

    <p>{{ pendingOpenInfo}}</p>
    <p></p>


    <n-button type="primary" style="float: right" @click="showModal=false">
      已阅
    </n-button>
  </n-modal>
  <div style="margin-top: 6vw;"></div>
  <n-form>
    <n-input v-model:value="teacherName" type="text" placeholder="教师">
      <template #prefix>
        教师
      </template>
    </n-input>
    <div style="margin: 1vw;"></div>
    <n-input v-model:value="courseName" type="text" placeholder="课程名">
      <template #prefix>
        课程名
      </template>
    </n-input>
    <n-button type="primary" size="large" style="margin-top: 2vw;"
              @click="onClickSubmit">查询
    </n-button>

  </n-form>


  <div v-for="(info,index) in scoreInfos" :key="index">
    <div class="card mx-auto" style="color: black;white-space: pre-line;background:#adccfd;width: 18rem;;">
      <p>{{ info.courseName }} {{ info.teacher }}</p>
      <div v-for="(score,i) in info.scores" :key="i">
        {{ score.scoreRange }}： {{ 1.0 * score.numberOfStudents / info.totalStudents * 100 }}%
      </div>
      <div>
        平均分：{{ info.averageScore }}
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
