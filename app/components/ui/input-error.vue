<script setup>
const { text, bigFontSize } = defineProps({
  text: String,
  bigFontSize: Boolean,
});
</script>

<template>
  <div
    v-if="text"
    class="text-[18px] text-[var(--text-error)] font-bold text-center"
    :class="{ '!text-3xl': bigFontSize }"
  >
    {{ text }}
  </div>
</template>
