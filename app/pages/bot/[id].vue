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
import {getBot} from '~~/api/bot';
import { useRoute } from 'vue-router'
import {ref} from 'vue'
import type { BotStatus } from '~~/api/BotStatus'
import BotCard from "~~/composables/BotCard.vue";
import {NGrid, NGridItem, NCard, NList, NListItem} from "naive-ui";
import { useMessage } from 'naive-ui'
import { useConfig } from "~~/composables/useConfig"
import axios from "axios";

const route = useRoute()
const message = useMessage()
const id = computed(() => Number(route.params.id))
const router = useRouter()

const bot = ref<BotStatus>({} as BotStatus)

const terminal = ref(null)
const fit = ref(null)

const ws = ref(null)

const connecting = ref(false)

const players = ref([])
const config = useConfig()

let timerId: number | undefined

function connect_ws() {
  if (!connecting.value) return

  const httpUrl = new URL(bot.value.url)
  httpUrl.protocol = httpUrl.protocol.replace('http', 'ws')
  const wsUrl = new URL('term', httpUrl)
  wsUrl.searchParams.set('token', bot.value.token)

  ws.value = new WebSocket(wsUrl.toString())

  ws.value.onmessage = (event) => {
    terminal.value?.write(event.data)
  }

  ws.value.onerror = (event) => {
    console.log(event);
    terminal.value?.write(`[XinManager]连接错误:${event.message || "未知原因"}\n\r`);
  }

  ws.value.onclose = () => {
    terminal.value?.write('[XinManager]连接已关闭\n\r');
    if (!connecting.value) return
    terminal.value?.write('[XinManager]尝试重新连接\n\r');
    connect_ws()
  }
}

async function refresh() {
  try {
    bot.value = await getBot(id.value);
  } catch (e) {
    message.error(e.response?.data?.message || e.message || '获取机器人失败')
    await router.push('/bots')
  }
  players.value = (await axios.get(
      new URL("players", bot.value.url),
      {
        headers: {
          "Authorization": `Bearer ${bot.value.token}`
        }
      }
  ))
  .data
  console.log(players.value);
}

onMounted(async () => {
  await refresh()
  timerId = setInterval(refresh, config.value.bots_fetch_interval)
  console.log(bot.value);
  connecting.value = true
  const container = document.getElementById('terminal') as HTMLElement;
  if (!container) return;

  if (terminal.value) return;

  const { Terminal } = await import('@xterm/xterm');
  const { FitAddon } = await import('@xterm/addon-fit');
  let WebglAddon: any;
  try { WebglAddon = (await import('@xterm/addon-webgl')).WebglAddon; } catch {}

  await import('@xterm/xterm/css/xterm.css');

  terminal.value = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: 'monospace' ,
    theme: {
      background: 'rgba(0, 0, 0, 0.8)',
      foreground: 'rgba(255, 255, 255, 0.8)',
      cursor: 'rgba(255, 255, 255, 0.8)',
    }
  });
  fit.value = new FitAddon();
  terminal.value.loadAddon(fit.value);
  if (WebglAddon) { try { terminal.value.loadAddon(new WebglAddon()); } catch {} }

  terminal.value.open(container);
  terminal.value.onData((data) => {
    ws.value?.send(data)
  })
  fit.value.fit();
  window.onresize = () => {
    if (!fit.value) return;
    if (!terminal.value) return;
    fit.value.fit();
  }

  connect_ws()

})

onUnmounted(() => {
  if (timerId !== undefined) {
    clearInterval(timerId)
    timerId = undefined
  }
  connecting.value = false
  ws.value?.close()
  const container = document.getElementById('terminal') as HTMLElement;
  if (!container) return;
  if (!terminal.value) return;
  terminal.value.dispose();
  terminal.value = null;
  fit.value = null;
})

</script>

<template>
  <NGrid
      style="padding:16px;height:calc(100vh - 32px);grid-template-rows:repeat(5,minmax(0,1fr));"
      cols="4"
      rows="5"
      x-gap="16"
      y-gap="16"
  >
    <NGridItem>
      <BotCard style="box-shadow: none;width: 100%;height: 100%;" :bot="bot" />
    </NGridItem>
    <NGridItem style="grid-row: span 5;grid-column: span 3;">
      <NCard>
        <template #header>
          <strong>终端</strong>
        </template>
        <ClientOnly>
          <div style="height: 100%;" id="terminal" />
        </ClientOnly>
      </NCard>
    </NGridItem>
    <NGridItem style="grid-row: span 4;grid-column: span 1;">
      <NCard
          style="height: 100%; display: flex; flex-direction: column;"
          :content-style="{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }"
      >
        <template #header>
          <strong>玩家列表</strong>
        </template>
        <NList class="hide-scrollbar" style="flex: 1; min-height: 0; overflow: auto;">
          <NListItem v-for="player in players" :key="player.id">
            {{ player.name }}
          </NListItem>
        </NList>
      </NCard>

    </NGridItem>
  </NGrid>
</template>

<style scoped>

.n-card {
  height: 100%;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

</style>