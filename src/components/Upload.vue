<script setup lang="ts">

import {onMounted} from "vue";
import {UploadFileInfo, useMessage} from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
const message = useMessage()
onMounted(() => {

})

const beforeUpload = (data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) => {
  console.log(data.file.file?.type)
  if (data.file.file?.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      data.file.file?.type !== 'application/vnd.ms-excel') {
    message.error('只能上传excel格式的文件，请重新上传~', {
      closable: true,
      duration: 3000
    })
    return false
  }
  return true
}
</script>

<template>

  <n-upload
      directory-dnd
      action=""
      @before-upload="beforeUpload"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        点击或者拖动你的Excel成绩文件到该区域来上传
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        目前只支持上传Excel成绩文件~
      </n-p>
    </n-upload-dragger>
  </n-upload>

</template>

<style scoped>

</style>