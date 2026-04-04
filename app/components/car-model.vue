<script setup>
import { useLoader, useLoop } from "@tresjs/core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { computed } from "vue";

const { state: model } = useLoader(GLTFLoader, "/3d/scene.gltf");

const scene = computed(() => model.value?.scene);
const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed }) => {
  if (scene.value) {
    scene.value.position.y += Math.sin(elapsed) * 0.001;
    scene.value.rotation.y += 0.002;
  }
});
</script>

<template>
  <primitive
    v-if="scene"
    :object="scene"
    :rotation="[Math.PI / 6, -(Math.PI / 10), 0]"
  />
</template>
