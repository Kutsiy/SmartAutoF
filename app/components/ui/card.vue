<script setup>
const { title, value } = defineProps({
  title: String,
  value: String,
  bg: Boolean,
});
</script>

<template>
  <div
    class="font-bold flex flex-col gap-2 items-center justify-center border-2 border-[var(--border-accent)] p-2 text-xl rounded-md shadow-md shadow-[var(--shadow-glow)]"
    :class="bg ? 'bg-[var(--bg-accent)] text-[var(--text-black)]' : ''"
  >
    <div class="text-xl text-center">{{ title }}</div>
    <div class="text-2xl">{{ value }}</div>
  </div>
</template>
