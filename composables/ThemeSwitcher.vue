<script setup lang="ts">
import { NIcon, NSwitch } from 'naive-ui'
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import { useTheme } from '~~/composables/useTheme'

const theme = useTheme()

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <NSwitch :value="theme === 'dark'" @update:value="toggleTheme">
    <template #checked><NIcon><MoonOutline /></NIcon></template>
    <template #unchecked><NIcon><SunnyOutline /></NIcon></template>
  </NSwitch>
</template>
