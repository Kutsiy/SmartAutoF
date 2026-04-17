<script setup lang="ts">
import { useUserStore } from "~/store/user.store";

definePageMeta({
  middleware: ["auth"],
});

const userStore = useUserStore();
</script>

<template>
  <div class="container mx-auto px-12 py-6">
    <div class="w-full h-14 border-2 border-[var(--yellow-90)] rounded-xl">
      <nav
        class="w-full h-full text-3xl flex gap-6 justify-center items-center *:cursor-pointer"
      >
        <NuxtLink
          class="hover:border-b-2 hover:border-b-[--yellow-90] font-bold"
          to="/"
          >Головна</NuxtLink
        >
        <NuxtLink
          class="hover:border-b-2 hover:border-b-[--yellow-90]"
          to="/account"
          >Акаунт</NuxtLink
        >
        <NuxtLink
          class="hover:border-b-2 hover:border-b-[--yellow-90]"
          to="/account/appointments"
        >
          Замовлення
        </NuxtLink>
        <!-- <div>Адмін панель</div> -->
      </nav>
    </div>
  </div>

  <div class="container mx-auto px-12 mt-2">
    <div
      class="w-full h-full border-2 border-[var(--yellow-90)] rounded-xl p-4"
    >
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  border-bottom: 2px solid var(--yellow-90);
}
</style>
