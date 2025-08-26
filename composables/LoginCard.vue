<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import {
  NForm, NFormItem, NInput, NButton, NCard, NAlert, NIcon,
  type FormInst, type FormRules
} from "naive-ui"

import { Eye, EyeOff } from '@vicons/ionicons5'

const router = useRouter()
const formRef = ref<FormInst | null>(null)
const password = ref("")
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref("")

const rules: FormRules = {
  password: [
    { required: true, message: "请输入管理密码", trigger: ["input", "blur"] },
    { min: 8, message: "至少 8 位字符", trigger: ["input", "blur"] }
  ]
}

const onSubmit = async () => {
  errorMsg.value = ""
  await formRef.value?.validate()
  if (formRef.value?.errors?.length) return

  loading.value = true
  try {
    await $fetch("/api/login", {
      method: "POST",
      body: { password: password.value }
    })
    await router.push("/")
  } catch (e: any) {
    errorMsg.value = e?.data?.message || e?.message || "登录失败，请稍后重试"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <NCard bordered>
    <h1>XinManager登录</h1>
    <p>请输入管理密码以继续</p>

    <NAlert v-if="errorMsg" type="error" :show-icon="false">
      {{ errorMsg }}
    </NAlert>

    <NForm ref="formRef" :model="{ password }" :rules="rules" size="large" label-placement="top">
      <NFormItem label="密码" path="password">
        <NInput
            v-model:value="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="输入管理密码"
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

      <NButton type="primary" :loading="loading" block @click="onSubmit">
        登录
      </NButton>
    </NForm>
  </NCard>
</template>
