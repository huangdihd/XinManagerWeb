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
import LoginCard from "~~/composables/LoginCard.vue";
import { useRouter } from 'vue-router'
import { check } from '~~/api/auth'

const router = useRouter()

definePageMeta({
  hideSidebar: true,
  noAuth: true,
})

onMounted(async () => {
  const result = await fetch('/api/auth/check')
  if (result.status === 200) {
    await router.push('/')
  }
})
</script>

<template>
  <NGrid class="login-grid" cols="12">
    <NGridItem
        span="12"
        md-span="8"
        lg-span="6"
        xl-span="4"
        xxl-span="3"
    >
      <LoginCard class="login-card" />
    </NGridItem>
  </NGrid>
</template>

<style scoped>
.login-grid {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  padding: 24px;
}
</style>