<script setup>
const { name, email, roles, isActive } = defineProps({
  name: String,
  email: String,
  roles: Array,
  isActive: Boolean,
});
</script>

<template>
  <div
    class="grid grid-cols-4 auto-rows-min gap-4 p-2 border-2 border-[var(--border-main)] rounded-md bg-[var(--bg-secondary)] hover:scale-[1.01] transition-transform"
  >
    <div>{{ name }}</div>
    <div>{{ email }}</div>
    <div>{{ roles.join(", ") }}</div>
    <div>{{ isActive }}</div>
  </div>
</template>
