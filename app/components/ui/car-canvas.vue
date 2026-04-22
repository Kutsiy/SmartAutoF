<script setup>
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas :clear-alpha="0">
    <TresPerspectiveCamera :position="[0, 0.2, 4]" />

    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" />
    <UiCarModel />
  </TresCanvas>
</template>
