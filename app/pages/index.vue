<script setup lang="ts">
import MainHero from "~/components/pages/main-hero.vue";
import MainServices from "~/components/pages/main-services.vue";

onMounted(() => {
  const gsap = useGSAP();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-back",
      start: "top top",
      end: "1000 800",
      scrub: 1.2,
      pin: true,
      pinSpacing: true,
      markers: false,
    },
  });

  tl.fromTo(
    ".hero",
    {},
    {
      scale: 0.2,
      opacity: 0,
      ease: "power1.out",
      position: "fixed",
    },
    0.2,
  )

    .fromTo(
      ".hero-back",
      { position: "absolute", top: 0, bottom: 0 },
      {
        opacity: 0,
        scale: 0.3,
        ease: "power1.out",
        position: "fixed",
        top: 0,
      },
      0,
    )

    .fromTo(
      ".service-back",
      {
        scale: 0.3,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        ease: "power1.out",
        top: 0,
        position: "fixed",
      },
      0.3,
    )

    .fromTo(
      ".service",
      {
        scale: 0.3,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        ease: "power1.out",
        top: 0,
        position: "fixed",
      },
      0.4,
    );
});
</script>

<template>
  <MainHero />
  <MainServices />
</template>
