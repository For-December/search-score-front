<script setup lang="ts">
// defineProps<{ msg: string }>()

import {onMounted, ref} from "vue";
import ScoreInfo = Items.ScoreInfo;

import {useMessage} from 'naive-ui'
import {webGetScoreInfos} from "../api/scores.ts";
import {globalToken, isLogin, pageNum} from "../types/globalData.ts";
import {openidKey, tokenKey} from "../api/globalConst.ts";

const scoreInfos = ref<ScoreInfo[]>([])
const message = useMessage()

const teacherName = ref('')
const courseName = ref('')
const onClickSubmit = () => {
  const token = globalToken.value
  webGetScoreInfos(teacherName.value,
      courseName.value, token).then((res) => {
    scoreInfos.value = res.data as ScoreInfo[]
  }).catch((err) => {

    message.error(err,{
      closable: true,
      duration: 3000
    })

  })
}
</script>

<template>
  <!--  <n-button type="primary">naive-ui</n-button>-->
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
      <p>{{ info.courseName }}-{{ info.teacher }}</p>

      <div v-for="(score,i) in info.scores" :key="i">
        {{ score.scoreRange }}-{{ score.numberOfStudents }}
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
