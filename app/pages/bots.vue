<script setup lang="ts">
import {getBots, deleteBot} from "~~/api/bot";
import BotCard from "~~/composables/BotCard.vue";
import { CloseCircleOutline, TrashBinOutline } from "@vicons/ionicons5";
import { NCard, NGrid, NGridItem, NButton, NIcon, NSpace } from "naive-ui";
import BotCreator from "~~/composables/BotCreator.vue";
import type {BotStatus} from "~~/api/BotStatus";
import { useDialog } from "naive-ui";

const data = ref([])

const showCreateDialog = ref(false)

const dialog = useDialog()

onMounted(async () => {
  data.value = await getBots();
});

async function refresh() {
  data.value = await getBots();
}

function afterCreate(bot: BotStatus) {
  showCreateDialog.value = false;
  getBots()
  refresh()
}

function deleteBot(bot: BotStatus) {
  dialog.warning({
    title: '操作确认',
    content: '你确定要删除Bot ' + bot.username + ' 吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      await deleteBot(bot.id)
      await refresh()
    },
    onNegativeClick: () => {
    }
  })
}
</script>

<template>
  <div class="CreateDialogMask" v-show="showCreateDialog" >
    <div class='CreateDialog'>
      <NButton type="error" ghost style="--n-border-focus: none;--n-border-pressed: none;--n-border: none;--n-border-hover: none;float: right;margin-bottom: -35px;margin-right: -7.5px;z-index: 2"
          @click="showCreateDialog = false"
               title="关闭窗口"
      >
        <template #icon>
          <NIcon><CloseCircleOutline /></NIcon>
        </template>
      </NButton>
      <BotCreator @afterCreate="afterCreate" />
    </div>
  </div>
  <NSpace style="gap: 16px;width: 100%;margin: 24px;height: calc(100vh - 48px)" vertical>
    <NCard style="box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12)">
      <h3 style="margin: 0"><strong>Bot管理</strong></h3>
    </NCard>
    <div style="float: right">
      <NButton style="margin-right: 12px" @click="refresh">刷新</NButton>
      <NButton @click="showCreateDialog = true" type="primary">添加Bot</NButton>
    </div>
    <NGrid style="margin-top: -3px;padding-top: 3px" :cols="3" x-gap="16" y-gap="16">
      <NGridItem class="BotCard"  v-for="bot in data" :key="bot.id">
        <NButton type="error" ghost style="--n-border-focus: none;--n-border-pressed: none;--n-border: none;--n-border-hover: none;float: right;margin-bottom: -35px;margin-right: -7.5px;z-index: 2"
                 @click="deleteBot(bot)"
                 title="删除"
        >
          <template #icon>
            <NIcon><TrashBinOutline /></NIcon>
          </template>
        </NButton>
        <a target="_blank" style="text-decoration: none" :href="`/bot/${bot.id}`">
          <BotCard :bot="bot" />
        </a>
      </NGridItem>
    </NGrid>
  </NSpace>
</template>


<style scoped>

.BotCard {
  transition: all 0.2s ease;
}

.BotCard:hover {
  cursor: pointer;
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
}
.CreateDialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.CreateDialogMask {
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
}
</style>