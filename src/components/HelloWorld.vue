<script setup lang="ts">
// defineProps<{ msg: string }>()

import {ref} from "vue";

const data = ref("  计算机网络课程设计 吕慧\n" +
    "\n" +
    "          学分: 1.00 课程号: 3150520011094\n" +
    "\n" +
    "          平均分: 89.27\n" +
    "\n" +
    "          90-100分: 58.54%\n" +
    "\n" +
    "          85-89分: 24.39%\n" +
    "\n" +
    "          82-84分: 4.88%\n" +
    "\n" +
    "          78-81分: 5.69%\n" +
    "\n" +
    "          75-77分: 0.81%\n" +
    "\n" +
    "          72-74分: 0.00%\n" +
    "\n" +
    "          68-71分: 0.81%\n" +
    "\n" +
    "          64-67分: 0.00%\n" +
    "\n" +
    "          60-63分: 1.63%\n" +
    "\n" +
    "          1-59分: 0.81%\n" +
    "\n" +
    "          0分(不计入平均分): 2.44%\n" +
    "\n" +
    "          本条数据参考了123人的成绩\n")
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

      <div class="">
        <p class="card mx-auto" style="color: black;white-space: pre-line;background:#adccfd;width: 18rem;;">
          {{data}}
        </p>
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
