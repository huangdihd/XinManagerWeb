<script setup lang="ts">
import LoginCard from "~~/composables/LoginCard.vue";

definePageMeta({
  hideSidebar: true,
  noAuth: true,
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