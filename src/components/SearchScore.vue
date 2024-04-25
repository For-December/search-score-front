<script setup lang="ts">
// defineProps<{ msg: string }>()

import {onMounted, ref} from "vue";
import ScoreInfo = Items.ScoreInfo;
import {webGetScoreInfos} from "../api/scores.ts";
import {useMessage} from 'naive-ui'

const scoreInfos = ref<ScoreInfo[]>([])
const message = useMessage()
onMounted(() => {
  webGetScoreInfos().then((data) => {
    scoreInfos.value = data
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
            {{score.scoreRange}}-{{score.numberOfStudents}}
          </div>
        </div>
      </div>

</template>

<style scoped>

</style>
