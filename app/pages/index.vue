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

import { NCard, NSpace, NGrid, NGridItem } from "naive-ui";
import { getbbtt } from "~~/api/bbtt";
import { getPerformance } from "~~/api/performance";
import McText from "~~/composables/McText.vue";
import { getBots } from "~~/api/bot";
import { useConfig } from "~~/composables/useConfig";


const serverInfo = ref(null)

const TotalBotCount = ref(0)
const AvailableBotCount = ref(0)
const JoinedBotCount = ref(0)

const cpuUsage = ref(0)
const memoryUsage = ref(0)

const config = useConfig()

async function refreshServerInfo() {
  try {
    serverInfo.value = await getbbtt()
  } catch (e) {
    serverInfo.value = null
  }
  console.log(serverInfo.value)
}

async function refreshBotCount() {
  const bots = await getBots()
  TotalBotCount.value = bots.length
  AvailableBotCount.value = 0
  JoinedBotCount.value = 0
  for (const bot of bots) {
    if (bot.available) {
      AvailableBotCount.value++
    }
    if (bot.server === 'Xin') {
      JoinedBotCount.value++
    }
  }
  console.log(TotalBotCount.value, AvailableBotCount.value, JoinedBotCount.value)
}

async function refreshPerformance() {
  const performance = await getPerformance()
  cpuUsage.value = performance.cpu
  memoryUsage.value = performance.memory
  console.log(performance)
}


let bbttTimerId: number | undefined
let botsTimerId: number | undefined


onMounted(() => {
  refresh()
  bbttTimerId = window.setInterval(() => {
    refreshServerInfo()
  }, config.value.bbtt_fetch_interval)
  botsTimerId = window.setInterval(() => {
    refreshBotCount()
    refreshPerformance()
  }, config.value.bots_fetch_interval)
});

onUnmounted(() => {
  if (bbttTimerId !== undefined) {
    clearInterval(bbttTimerId)
    bbttTimerId = undefined
  }
  if (botsTimerId !== undefined) {
    clearInterval(botsTimerId)
    bbttTimerId = undefined
  }
})


</script>

<template>
  <NSpace style="gap: 16px;width: 100%;padding: 24px;height: calc(100vh - 48px);overflow: auto" vertical>
    <NCard style="box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12)">
      <h3 style="margin: 0"><strong>首页</strong></h3>
    </NCard>
    <NGrid style="margin-top: -3px;padding-top: 3px" :cols="3" x-gap="16" y-gap="16">
      <NGridItem>
        <NCard style="height: 100%;box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12)">
          <template #header>
            <strong>xin服状态</strong>
          </template>
          <div v-if="serverInfo" style="border-radius: 3px;background: rgba(0, 0, 0, 0.8);padding: 6px;user-select: none;display: flex;align-items: center">
            <img style="-webkit-user-drag: none;height: 150px" :src="serverInfo.favicon" alt="favicon" />
            <McText :text="serverInfo.description.text" />
            <NSpace style="margin-left: 8px;color: white" vertical>
              <div>当前玩家人数： {{serverInfo?.players?.online}}</div>
              <McText clean :text="serverInfo.players?.sample?.[0]?.name" />
            </NSpace>
          </div>
          <p v-else style="user-select: none;color: dimgray;">加载中...</p>

        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard style="height: 100%;box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12)">
          <template #header>
            <strong>机器人在线状态</strong>
          </template>
          <p style="user-select: none;color: gray;margin: -8px 0;">已加入xin服/可用/总数</p>
          <p style="user-select: none;font-size: 100px;margin: 0">{{JoinedBotCount}}/{{AvailableBotCount}}/{{TotalBotCount}}</p>
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard style="height: 100%;box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12)">
          <template #header>
            <strong>面板所在主机性能数据</strong>
          </template>
          <p style="user-select: none;color: gray;margin: -8px 0;">CPU占用率</p>
          <p style="user-select: none;font-size: 50px;margin: 0">{{cpuUsage.toFixed(2)}}%</p>
          <p style="user-select: none;color: gray;margin: -8px 0;">内存占用率</p>
          <p style="user-select: none;font-size: 50px;margin: 0">{{memoryUsage.toFixed(2)}}%</p>
        </NCard>
      </NGridItem>
    </NGrid>

  </NSpace>
</template>

<style scoped>
</style>