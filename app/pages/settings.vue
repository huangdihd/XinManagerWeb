<!--
  -   Copyright (C) 2025 huangdihd
  -
  -   This program is free software: you can redistribute it and/or modify
  -   it under the terms of the GNU General Public License as published by
  -   the Free Software Foundation, either version 3 of the License, or
  -   (at your option) any later version.
  -
  -   This program is distributed in the hope that it will be useful,
  -   but WITHOUT ANY WARRANTY; without even the implied warranty of
  -   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  -   GNU General Public License for more details.
  -
  -   You should have received a copy of the GNU General Public License
  -   along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<script setup lang="ts">

import ThemeSwitcher from "~~/composables/ThemeSwitcher.vue";
import {NCard, NSpace, NFormItem, NInput, NButton, NForm, NIcon} from "naive-ui";
import {Eye, EyeOff, LogoGithub} from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import { logout } from "~~/api/auth";
import { useDialog } from "naive-ui";
import { changePassword } from "~~/api/auth";
import { getConfig, patchBbttFetchInterval, patchBotsFetchInterval, resetConfig } from "~~/api/config";

const bbtt_fetch_interval = ref(10000)
const bots_fetch_interval = ref(10000)
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
        await router.push("/login")
      } catch (error) {
        dialog.error({
          title: "退出登录失败",
          content: e?.response?.data?.message || e?.message || "退出登录失败",
          positiveText: "确定",
        })
        console.error("退出登录失败", error)
      }
    }
  })
}

async function onChangePassword() {
  try {
    await changePassword(password.value)
  }
  catch (e) {
    dialog.error({
      title: "修改失败",
      content: e?.response?.data?.message || e?.message || "修改失败",
      positiveText: "确定",
    })
    return
  }
  dialog.success({
    title: "修改成功",
    content: "密码修改成功，您需要重新登录才能继续使用该面板。",
    positiveText: "确定",
    onPositiveClick: async () => {
      try {
        await logout()
        await router.push("/login")
      } catch (error) {
        console.error("退出登录失败", error)
      }
    }
  })
}

async function onChangeBbttFetchInterval() {
  try {
    await patchBbttFetchInterval(bbtt_fetch_interval.value)
  }
  catch (e) {
    dialog.error({
      title: "修改失败",
      content: e?.response?.data?.message || e?.message || "修改失败",
      positiveText: "确定",
    })
  }
}

async function onChangeBotsFetchInterval() {
  try {
    await patchBotsFetchInterval(bots_fetch_interval.value)
    const config = await getConfig()
    bbtt_fetch_interval.value = config.bbtt_fetch_interval
    bots_fetch_interval.value = config.bots_fetch_interval
  }
  catch (e) {
    dialog.error({
      title: "修改失败",
      content: e?.response?.data?.message || e?.message || "修改失败",
      positiveText: "确定",
    })
  }
}

async function onReset() {
  dialog.warning({
    title: "确认重置吗？",
    content: "重置后，所有配置将恢复为默认值。",
    positiveText: "重置",
    negativeText: "取消",
    onPositiveClick: async () => {
      try {
        await resetConfig()
      }
      catch (e) {
        dialog.error({
          title: "重置失败",
          content: e?.response?.data?.message || e?.message || "重置失败",
          positiveText: "确定",
        })
      }
    }
  })
}

onMounted(async () => {
  const config = await getConfig()
  bbtt_fetch_interval.value = config.bbtt_fetch_interval
  bots_fetch_interval.value = config.bots_fetch_interval
})

</script>

<template>
  <NSpace style="gap: 16px;width: 100%;padding: 24px;height: calc(100vh - 48px);overflow: auto" vertical>
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
        <strong>数据更新设置</strong>
      </template>
      <NForm ref="formRef" :model="{ bbtt_fetch_interval, bots_fetch_interval }" :rules="rules" size="large" label-placement="top">
        <NFormItem label="2b2t.xin数据更新间隔" path="bbtt_fetch_interval">
          <NInput
              v-model:value="bbtt_fetch_interval"
              type="text"
              placeholder="单位：毫秒"
              @keyup.enter="onChangeBbttFetchInterval"
              style="width: 50%"
          >
          </NInput>
        </NFormItem>

        <NButton type="primary" :loading="loading" @click="onChangeBbttFetchInterval">
          修改间隔
        </NButton>

        <NFormItem style="margin-top: 16px;" label="Bots数据更新间隔" path="bots_fetch_interval">
          <NInput
              v-model:value="bots_fetch_interval"
              type="text"
              placeholder="单位：毫秒"
              @keyup.enter="onChangeBotsFetchInterval"
              style="width: 50%"
          >
          </NInput>
        </NFormItem>

        <NButton type="primary" :loading="loading" @click="onChangeBotsFetchInterval">
          修改间隔
        </NButton>
      </NForm>
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
              @keyup.enter="onChangePassword"
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

        <NButton type="primary" :loading="loading" @click="onChangePassword">
          修改密码
        </NButton>
      </NForm>
      <p>退出登录</p>
      <NButton type="error" @click="onLogout">
        退出登录
      </NButton>
    </NCard>
    <NCard>
      <template #header>
        <strong>重置设置</strong>
      </template>
      <NButton type="error" @click="onReset">
        重置所有设置
      </NButton>
    </NCard>

    <NCard style="margin-bottom: 16px">
      <template #header>
        <strong>关于</strong>
      </template>
      <p>本项目使用GPLv3协议开源</p>
      <p>作者: <NButton tag="a" href="https://github.com/huangdihd" target="_blank" quaternary>
        huangdihd
      </NButton></p>
      <NButton tag="a" href="https://github.com/huangdihd/xin_manager" target="_blank" quaternary>
        <template #icon>
          <NIcon :size="20" color="#24292f">
            <LogoGithub />
          </NIcon>
        </template>
        GitHub
      </NButton>
    </NCard>

  </NSpace>
</template>

<style scoped>

</style>