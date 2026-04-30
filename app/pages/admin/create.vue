<script setup lang="ts">
onMounted(async () => await navigateTo("/admin/create/category"));
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="w-full h-[60px] border border-[var(--border-main)] rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center gap-4 *:w-[200px]"
    >
      <UiButton render-as="link" to="/admin/create/category"
        >Категорії</UiButton
      >
      <UiButton>Сервіси</UiButton>
      <UiButton>Типи роботи</UiButton>
    </div>

    <NuxtPage></NuxtPage>
  </div>
</template>

<style scoped>
.scroll-bar {
  scrollbar-color: grey rgba(0, 0, 0, 0);
}
</style>
