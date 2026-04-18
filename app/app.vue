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
