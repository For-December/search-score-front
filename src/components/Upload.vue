<script setup lang="ts">

import {onMounted, ref} from "vue";
import {UploadCustomRequestOptions, UploadFileInfo, useMessage} from 'naive-ui'
import {ArchiveOutline as ArchiveIcon} from '@vicons/ionicons5'
import {webUploadScoreFile} from "../api/scores.ts";
import {getGlobalToken} from "../types/globalData.ts";
import TransDef = Items.TransDef;
import {autoLogin} from "../api/globalFunc.ts";

const message = useMessage()
onMounted(() => {

})

const beforeUpload = (data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) => {
  console.log(data.file.file?.type)
  if (data.file.file?.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      data.file.file?.type !== 'application/vnd.ms-excel') {
    message.error('只能上传excel格式的文件，请重新上传~', {
      closable: true,
      duration: 3000
    })
    return false
  }
  return true
}

const fileList = ref<UploadFileInfo[]>([])


const customRequest = ({
                         file,
                         data,
                         headers,
                         withCredentials,
                         action,
                         onFinish,
                         onError,
                         onProgress
                       }: UploadCustomRequestOptions) => {
  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(
          key,
          data[key as keyof UploadCustomRequestOptions['data']]
      )
    })
  }
  formData.append("file", file.file as File)

  onProgress({percent: 50})
  webUploadScoreFile(formData, getGlobalToken())
      .then((res) => {
        message.success(res.msg, {
          closable: true,
          duration: 3000
        })
        onProgress({percent: 80})
        onProgress({percent: 100})
        onFinish()

        message.success('上传成功！', {
          closable: true,
          duration: 3000
        })


      })
      .catch((err: TransDef) => {
        if (err.code === 401) {
          autoLogin().then((res) => {
            if (res) {
              message.warning('token自动续签成功,请重新上传您的文件', {
                closable: true,
                duration: 3000
              })

              onError()

            }
          })
          return
        } else {
          onProgress({percent: 80})
          onProgress({percent: 100})
          // onFinish()
          onError()

          onFileError()

          message.error(err.msg, {
            closable: true,
            duration: 3000
          })
        }
      })
}


const showModal = ref(false)
const timeout = ref(6000)
const counterEnd = ref(false)
const countdown = () => {
  if (timeout.value <= 0) {
    counterEnd.value = true
  } else {
    timeout.value -= 1000
    setTimeout(countdown, 1000)
  }
}

const onFileError = () => {
  showModal.value = true
  timeout.value = 6000

  countdown()
}
</script>

<template>

  <n-modal :show="showModal"
           preset="dialog"
           title="错误提示">

    <n-p depth="3" style="margin: 0.2vw 0 0 0">请检查您的文件是否完整，要求至少要有5条记录</n-p>
    <n-p depth="3" style="margin: 0.2vw 0 0 0">我们只会记录如下字段的数据，请检查Excel是否已包含：</n-p>
    <n-p depth="3" style="margin: 0.2vw 0 0 0">学年、学期、课程代码、课程名称、课程性质、成绩、开设学院、课程标记、任课教师</n-p>
    <n-p depth="3" style="margin: 0.2vw 0 0 0">对每个用户上传的数据，我们会进行匿名化记录并去重</n-p>
    <n-p depth="3" style="margin: 0.2vw 0 0 0">如果您上传的新数据和曾经上传的一样，也会被拦截</n-p>
    <n-p depth="3" style="margin: 0.2vw 0 0 0">如果遇到其他问题，请随时私信管理员，非常感谢！</n-p>

    <p></p>
    <n-button type="primary" style="float: right" @click="showModal=false" :disabled="!counterEnd">
      <div v-if="counterEnd">
        已阅~
      </div>
      <div v-else>
        倒计时 {{ timeout / 1000 }} 秒
      </div>
    </n-button>
  </n-modal>


  <n-upload
      :directory-dnd="false"
      action=""
      @before-upload="beforeUpload"
      :custom-request="customRequest"
      :default-file-list="fileList"
      :max="1"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon/>
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        点击或者拖动你的Excel成绩文件到该区域来上传
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        目前只支持上传Excel成绩文件~
      </n-p>
      <n-p depth="3" style="margin: 8px 0 0 0">
        (一次只能上传一份，可移除已上传文件再次上传)
      </n-p>

    </n-upload-dragger>
  </n-upload>


</template>

<style scoped>

</style>