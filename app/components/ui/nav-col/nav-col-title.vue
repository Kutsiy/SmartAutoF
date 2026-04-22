<script setup>
const { name } = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="text-[var(--text-important)] font-bold cursor-default flex gap-2">
    <Icon :name="name" class="relative top-1.5" /> <slot />
  </div>
</template>
