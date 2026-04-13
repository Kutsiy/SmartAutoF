<script setup>
const { text } = defineProps({
  text: String,
});
</script>

<template>
  <div v-if="text" class="text-[18px] text-[var(--text-error)] font-bold">
    {{ text }}
  </div>
</template>
