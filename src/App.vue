<script setup lang="ts">
import SearchScore from './components/SearchScore.vue'

import Login from "./components/Login.vue";
import {pageNum} from "./types/globalData.ts";
</script>

<template>
  <n-message-provider>
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
        <Login v-if="pageNum===0"/>
        <SearchScore v-if="pageNum===1" />

      </div>
    </div>

  </n-message-provider>
</template>

<style scoped>

</style>
