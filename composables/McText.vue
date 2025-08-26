<script setup lang="ts">
import { computed } from 'vue'
import { textToHTML, cleanCodes } from '@sfirew/minecraft-motd-parser'

const props = defineProps<{
  text: string
  ampPrefix?: boolean
  clean?: boolean
}>()

const html = computed(() => {
  if (!props.text) return ''
  const raw = props.ampPrefix ? props.text.replace(/&([0-9a-fk-or])/gi, '§$1') : props.text
  return props.clean ? cleanCodes(raw) : textToHTML(raw)
})
</script>

<template>
  <div class="mc-text" v-html="html"></div>
</template>

<style scoped>
.mc-text { white-space: pre-wrap; line-height: 1.4; }
</style>
