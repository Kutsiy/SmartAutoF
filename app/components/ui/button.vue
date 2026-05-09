<script setup lang="ts">
const emit = defineEmits(["click"]);

const {
  isGlass = false,
  textSize = "text-xl",
  renderAs = "button",
  isActive = false,
  to,
  className,
} = defineProps<{
  isGlass?: boolean;
  textSize?: "text-xl" | "text-2xl" | "text-3xl" | "text-4xl";
  renderAs?: "button" | "div" | "link";
  isActive?: boolean;
  to?: string;
  className?: string;
}>();

const componentClass = computed(() => [
  isGlass
    ? "border-[var(--border-main)] bg-[var(--black-20)]"
    : "border-[var(--border-accent)]",
  textSize,
  isActive
    ? "text-[var(--text-black)] bg-[var(--bg-accent)]"
    : "hover:text-[var(--text-black)] hover:bg-[var(--bg-accent)]",
  className,
]);
</script>

<template>
  <button
    v-if="renderAs === 'button'"
    @click="$emit('click')"
    class="flex px-2 shadow-lg shadow-[var(--shadow-strong)] font-bold py-1.5 items-center justify-center border rounded-2xl cursor-pointer transition-colors"
    :class="componentClass"
  >
    <slot />
  </button>
  <div
    v-else-if="renderAs === 'div'"
    @click="$emit('click')"
    class="h-fit flex px-2 shadow-lg shadow-[var(--shadow-strong)] font-bold py-1.5 items-center justify-center border hover:text-[var(--text-black)] hover:bg-[var(--bg-accent)] rounded-2xl cursor-pointer transition-colors"
    :class="componentClass"
  >
    <slot />
  </div>
  <NuxtLink
    v-else-if="renderAs === 'link'"
    :to="to"
    @click="$emit('click')"
    class="h-fit flex px-2 shadow-lg shadow-[var(--shadow-strong)] font-bold py-1.5 items-center justify-center border hover:text-[var(--text-black)] hover:bg-[var(--bg-accent)] rounded-2xl cursor-pointer transition-colors"
    :class="[
      isGlass
        ? 'border-[var(--border-main)] bg-[var(--black-20)]'
        : 'border-[var(--border-accent)]',
      textSize,
      className,
    ]"
  >
    <slot />
  </NuxtLink>
</template>

<style scoped>
.router-link-active {
  @apply text-[var(--text-black)] bg-[var(--bg-accent)];
}
</style>
