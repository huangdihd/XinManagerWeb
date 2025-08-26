<script setup lang="ts">
import { getBot } from '~~/api/bot';
import { useRoute } from 'vue-router'
import {h, ref} from 'vue'
import type { BotStatus } from '~~/api/BotStatus'
import BotCard from "~~/composables/BotCard.vue";
import {NGrid, NGridItem} from "naive-ui";
import { useMessage } from 'naive-ui'
import {NuxtLink} from "#components";

const route = useRoute()
const message = useMessage()
const id = computed(() => Number(route.params.id))
const router = useRouter()

const bot = ref<BotStatus>({} as BotStatus)

onMounted(async () => {
  try {
    bot.value = await getBot(id.value);
  } catch (e) {
    message.error(e.response?.data?.message || e.message || '获取机器人失败')
    await router.push('/bots')
  }
  console.log(bot.value);
})

</script>

<template>
  <NGrid cols="4" rows="5">
    <NGridItem>
      <BotCard :bot="bot" />
    </NGridItem>
  </NGrid>
</template>

<style scoped>

</style>