<script setup lang="ts">
const data = ref<any[]>([]);

onMounted(async () => {
  const allData = await useMyFetch("/category/all");
  if (Array.isArray(allData)) data.value = allData;
});
</script>

<template>
  <div class="w-full container mx-auto px-12 my-4 text-2xl">
    <div
      class="w-full border-2 border-[var(--border-main)] rounded-2xl shadow-lg shadow-[var(--shadow-strong)] p-2"
    >
      <UiAccordion v-for="category in data" :title="category.name">
        <UiAccordion
          v-for="service in category.services"
          :title="service.name"
          :items="service.work_types"
        />
      </UiAccordion>
    </div>
  </div>
</template>
