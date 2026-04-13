<script setup>
import { GSDevTools } from "gsap/GSDevTools";

onBeforeMount(() => {
  useGSAP().registerPlugin(GSDevTools);
  const { data } = useMyFetch("/auth/refresh");
});
</script>

<template>
  <Header />
  <NuxtPage></NuxtPage>
</template>
