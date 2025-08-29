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
import { type BotStatus } from "../api/BotStatus";
import {NCard} from "naive-ui";
const props = defineProps({
      bot: {
        type: Object as () => BotStatus,
        required: true
      }
    })

const url = computed(() => props.bot?.url)
const name = computed(() => props.bot?.username)
const version = computed(() => props.bot?.version)
const server = computed(() => props.bot?.server)
const available = computed(() => props.bot?.available)
</script>
<template>
  <NCard bordered class="bot-card">
    <h5 style="margin-bottom: -10px;margin-top: 0;color: grey ">{{url}}</h5>
    <div v-if="available">
      <p>用户名:<strong>{{name}}</strong></p>
      <p>版本:<strong>{{version}}</strong></p>
      <p style="margin-bottom: 0">服务器:<strong>{{server}}</strong></p>
    </div>
    <div v-else style="color: dimgray">
      <p>当前机器人已离线</p>
      <p>暂时无法连接</p>
      <p style="margin-bottom: 0" >请检查机器人状态</p>
    </div>
  </NCard>
</template>
<style scoped>
.bot-card {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  width: 100%;
  padding: 0;
}
</style>