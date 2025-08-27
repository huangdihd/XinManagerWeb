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
import SideBar from "~~/composables/SideBar.vue";
import { NConfigProvider, NLayout, NDialogProvider, NMessageProvider } from 'naive-ui'
import { lightTheme, darkTheme } from 'naive-ui'
import { useTheme } from '../composables/useTheme.ts'
import { useRoute } from "vue-router"
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { check } from '~~/api/auth'

const isLoading = ref(true)

const route = useRoute()

const noSidebar = computed(() => route.meta?.hideSidebar === true)

const noAuth = computed(() => route.meta?.noAuth === true)

const theme = useTheme()

onMounted(() => {
  isLoading.value = false
  if (import.meta.env.BROWSER && !noAuth.value) check()
})
</script>

<template>
  <NConfigProvider :theme="theme === 'dark' ? darkTheme : lightTheme">
    <NMessageProvider>
    <NDialogProvider>
      <NLayout has-sider style="height: 100vh">
        <SideBar style="height: 100vh" v-if="!noSidebar" />
        <div v-if="isLoading" class="loading-overlay">
          <div class="loading-spinner"></div>
        </div>
        <NuxtPage />
      </NLayout>
    </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.n-dialog__mask {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
}
</style>
