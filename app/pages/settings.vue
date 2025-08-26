<script setup lang="ts">

import ThemeSwitcher from "~~/composables/ThemeSwitcher.vue";
import {NCard, NSpace, NFormItem, NInput, NButton, NForm, NIcon} from "naive-ui";
import {Eye, EyeOff} from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import { logout } from "~~/api/auth";
import { useDialog } from "naive-ui";

const password = ref("")
const showPassword = ref(false)
const loading = ref(false)

const router = useRouter()
const dialog = useDialog()

function onLogout() {
  dialog.warning({
    title: "确认退出登录吗？",
    content: "退出登录后，您需要重新登录才能继续使用该面板。",
    positiveText: "退出登录",
    negativeText: "取消",
    onPositiveClick: async () => {
      try {
        await logout()
        router.push("/login")
      } catch (error) {
        console.error("退出登录失败", error)
      }
    }
  })
}

function onSubmit() {
  console.log(password.value)
}
</script>

<template>
  <NSpace style="gap: 16px;width: 100%;margin: 24px;height: calc(100vh - 48px)" vertical>
    <NCard style="box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12)">
      <h3 style="margin: 0"><strong>设置</strong></h3>
    </NCard>
    <NCard>
      <template #header>
        <strong>外观设置</strong>
      </template>
      主题
      <ThemeSwitcher />
    </NCard>
    <NCard>
      <template #header>
        <strong>安全设置</strong>
      </template>
      <NForm ref="formRef" :model="{ password }" :rules="rules" size="large" label-placement="top">
        <NFormItem label="修改密码" path="password">
          <NInput
              v-model:value="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="输入新密码"
              @keyup.enter="onSubmit"
              style="width: 50%"
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

        <NButton type="primary" :loading="loading" @click="onSubmit">
          修改密码
        </NButton>
      </NForm>
      <p>退出登录</p>
      <NButton type="error" @click="onLogout">
        退出登录
      </NButton>
    </NCard>

  </NSpace>
</template>

<style scoped>

</style>