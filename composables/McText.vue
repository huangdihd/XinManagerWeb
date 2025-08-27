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
