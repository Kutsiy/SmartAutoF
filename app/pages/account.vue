<script setup lang="ts">
import { useUserStore } from "~/store/user.store";

definePageMeta({
  middleware: ["auth"],
});

const userIsAdmin = ref(false);

onMounted(async () => {
  try {
    const data = await useMyFetch("/user/isadmin", {
      headers: useRequestHeaders(["cookie"]),
    });
    userIsAdmin.value = true;
  } catch (e) {
    userIsAdmin.value = false;
  }
});

const userStore = useUserStore();
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="container mx-auto px-12 py-6">
      <div
        class="w-full h-14 border-2 border-[var(--yellow-90)] rounded-xl bg-[var(--bg-secondary)]"
      >
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
          <!-- <NuxtLink to="/admin" v-if="userIsAdmin">Адмін панель</NuxtLink> -->
          <NuxtLink to="/admin">Адмін панель</NuxtLink>
        </nav>
      </div>
    </div>

    <div class="container mx-auto px-12 py-2 flex-1">
      <div
        class="w-full h-full border-2 border-[var(--yellow-90)] rounded-2xl p-4"
      >
        <NuxtPage></NuxtPage>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  border-bottom: 2px solid var(--yellow-90);
}
</style>
