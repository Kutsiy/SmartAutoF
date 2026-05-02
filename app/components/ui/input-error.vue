<script setup lang="ts">
const { text, bigFontSize = false } = defineProps<{
  text: string;
  bigFontSize?: boolean;
  textSize?: "text-xl" | "text-2xl" | "text-3xl" | "text-4xl";
}>();
</script>

<template>
  <div
    v-if="text"
    class="text-[18px] text-[var(--text-error)] font-bold text-center"
    :class="[bigFontSize ? '!text-3xl' : '', `!${textSize}`]"
  >
    {{ text }}
  </div>
</template>
