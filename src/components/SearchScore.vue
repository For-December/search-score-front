<script setup lang="ts">
// defineProps<{ msg: string }>()

import {onMounted, ref} from "vue";
import ScoreInfo = Items.ScoreInfo;

import {useMessage} from 'naive-ui'
import {webGetScoreInfos} from "../api/scores.ts";

const scoreInfos = ref<ScoreInfo[]>([])
const message = useMessage()
onMounted(() => {
  webGetScoreInfos("1","1").then((res) => {
    scoreInfos.value = res.data as ScoreInfo[]
  }).catch((err) => {
    message.error(err)
    console.log(err)

  })
})
</script>

<template>
  <!--  <n-button type="primary">naive-ui</n-button>-->

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
