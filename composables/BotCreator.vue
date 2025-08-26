<script setup lang="ts">

import {Eye, EyeOff} from "@vicons/ionicons5";
import {NButton, NCard, NForm, NFormItem, NInput, NIcon, NAlert} from "naive-ui";
import { ref } from 'vue'
import { addBot } from "~~/api/bot";
import type { BotStatus } from "~~/api/BotStatus";
import type {AxiosError, AxiosResponse} from "axios";


const url = ref('')
const token = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const emit = defineEmits<{
  (e: 'afterCreate', bot: BotStatus): void
}>()

function onSubmit() {
  loading.value = true
  errorMsg.value = ''
  if (!url.value) {
    errorMsg.value = '请输入url'
    loading.value = false
    return
  }
  if (!token.value) {
    errorMsg.value = '请输入token'
    loading.value = false
    return
  }
  if (!URL.parse(url.value)) {
    errorMsg.value = '请输入正确的url'
    loading.value = false
    return
  }
  addBot(url.value, token.value)
    .then((r : AxiosResponse<BotStatus>) => {
      emit('afterCreate', r.data as BotStatus)
      url.value = ''
      token.value = ''
    })
    .catch((e: AxiosError) => {
      console.log(e)
      errorMsg.value = e.response?.data?.message || e.message || '添加失败'
    })
    .finally(() => {
      loading.value = false

    })
}

</script>

<template>
  <NCard bordered class="creator-card">
    <h1>添加Bot</h1>
    <p>请输入Bot信息以添加</p>

    <NForm ref="formRef" :model="{ url, token }" size="large" label-placement="top">
      <NFormItem label="url" path="url">
        <NInput
          v-model:value="url"
          placeholder="输入xinRemote插件的url"
          @keyup.enter="onSubmit"
        />

      </NFormItem>
      <NFormItem label="token" path="token">
        <NInput
            v-model:value="token"
            :type="showPassword ? 'text' : 'password'"
            placeholder="输入xinRemote插件的token(可从bot运行目录下/remote_config.json中获取)"
            @keyup.enter="onSubmit"
        >
          <template #suffix>
            <NButton text @click="showPassword = !showPassword">
              <NIcon>
                <component :is="showPassword ? EyeOff : Eye" />
              </NIcon>
            </NButton>
          </template>
        </NInput>
      </NFormItem>

      <NAlert style="margin-bottom: 26px" v-if="errorMsg" type="error" :show-icon="false">
        {{ errorMsg }}
      </NAlert>

      <NButton type="primary" :loading="loading" block @click="onSubmit">
        添加
      </NButton>
    </NForm>
  </NCard>
</template>

<style scoped>
.creator-card {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  padding: 24px;
}
</style>