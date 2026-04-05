<script>
import { GSDevTools } from "gsap/GSDevTools";

onBeforeMount(() => {
  useGSAP().registerPlugin(GSDevTools);
});
</script>

<template>
  <Header />
  <NuxtPage></NuxtPage>
</template>
