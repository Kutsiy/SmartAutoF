<script setup>
const { name } = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="text-[var(--text-important)] font-bold cursor-default flex gap-2 text-3xl"
  >
    <Icon :name="name" class="w-[20px] h-[20px] relative top-1.5" /> <slot />
  </div>
</template>
