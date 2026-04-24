<script setup>
const { style } = defineProps({
  style: String,
});
</script>

<template>
  <div :class="size"><slot /></div>
</template>
