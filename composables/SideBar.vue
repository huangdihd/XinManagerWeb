<script setup lang="ts">
import { h, computed, type Component } from 'vue'
import { useRoute } from '#imports'
import { NuxtLink } from '#components'
import {
  type MenuOption,
  NIcon,
  NLayoutSider,
  NMenu,
  NText,
  NSpace,
  NAvatar
} from 'naive-ui'
import {
  HomeOutline,
  SettingsOutline,
  TerminalOutline,
} from '@vicons/ionicons5'
import { useTheme } from '~~/composables/useTheme'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  { label: '首页', key: '/', icon: renderIcon(HomeOutline) },
  { label: 'Bot管理', key: '/bots', icon: renderIcon(TerminalOutline) },
  { label: '设置', key: '/settings', icon: renderIcon(SettingsOutline) }
]

const route = useRoute()
const activeKey = computed(() => route.path)

const theme = useTheme()

const renderLabel = (option: MenuOption) =>
    h(
        NuxtLink,
        {
          to: option.key as string,
          'aria-current': activeKey.value === option.key ? 'page' : undefined
        },
        { default: () => (option as any).label }
    )
</script>

<template>
  <span style="width: 240px;flex-shrink: 0" />
  <NLayoutSider
      bordered
      :width="240"
      :collapsed-width="64"
      :native-scrollbar="false"
      :inverted="theme === 'dark'"
      class="SideBar"
  >
    <NSpace align="center" :wrap="false" style="padding: 16px;">
      <NAvatar
          size="small"
          round
          src="https://dummyimage.com/40x40/000/fff.png&text=XIN"
          alt="Logo"
      />
      <NText strong depth="1" style="font-size: 16px;">Xin Manager</NText>
    </NSpace>

    <NMenu
        :options="menuOptions"
        :value="activeKey"
        :render-label="renderLabel"
        :root-indent="18"
        :collapsed-icon-size="18"
        :collapsed-width="64"
        :item-height="40"
        accordion
    />
  </NLayoutSider>
</template>

<style scoped>
.SideBar {
  position: fixed;
  height: 100%;
}
</style>
