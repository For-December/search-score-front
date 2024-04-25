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
  <div class="container text-center overflow-hidden" style="min-height: max-content;">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <div class="row justify-content-center">
        <div class="col-12 col-md-12 col-lg-6 ">
          <h2>查给分</h2>
        </div>

        <div class="col-12 col-md-12 col-lg-6 ">
          111
        </div>


      </div>

      <div v-for="(info,index) in scoreInfos" :key="index">
        <div class="card mx-auto" style="color: black;white-space: pre-line;background:#adccfd;width: 18rem;;">
          <p>{{ info.courseName }}-{{ info.teacher }}</p>

          <div v-for="(score,i) in info.scores" :key="i">
            {{score.scoreRange}}-{{score.numberOfStudents}}
          </div>
        </div>
      </div>

    </div>


    <!--    <div class="card">-->
    <!--      <div class="card-body">-->
    <!--        这是一个简单的卡片。-->
    <!--        <n-button>1</n-button>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>

  <!--  <n-layout>-->
  <!--    <n-layout-header>颐和园路</n-layout-header>-->
  <!--    <n-layout-content content-style="padding: 24px;">-->
  <!--      平山道-->
  <!--    </n-layout-content>-->
  <!--    <n-layout-footer>成府路</n-layout-footer>-->
  <!--  </n-layout>-->
</template>

<style scoped>

</style>
