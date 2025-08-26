<script setup lang="ts">
import { type BotStatus } from "../api/BotStatus";
import {NCard} from "naive-ui";
const props = defineProps({
      bot: {
        type: Object as () => BotStatus,
        required: true
      }
    })

const url = computed(() => props.bot.url)
const name = computed(() => props.bot.username)
const version = computed(() => props.bot.version)
const server = computed(() => props.bot.server)
const available = computed(() => props.bot.available)
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