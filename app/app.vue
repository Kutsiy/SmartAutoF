<script setup>
import { GSDevTools } from "gsap/GSDevTools";
import { useUserStore } from "./store/user.store";

const userStore = useUserStore();

const router = useRoute();

onBeforeMount(async () => {
  useGSAP().registerPlugin(GSDevTools);
});

onMounted(async () => {
  try {
    const data = await useMyFetch("/auth/refresh");
    userStore.setAuth(
      { userName: data.name, userEmail: data.email },
      data.isActivate,
    );
  } catch {}
});
</script>

<template>
  <Header
    v-if="!router.path.includes('/account') && !router.path.includes('/admin')"
  />
  <NuxtPage></NuxtPage>
</template>

<style>
.basic-back {
  @apply border border-[var(--border-main)] bg-[var(--bg-secondary)] p-2 shadow-lg shadow-[var(--shadow-strong)] rounded-2xl;
}
</style>
