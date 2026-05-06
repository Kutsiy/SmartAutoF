<script setup lang="ts">
const data = ref<any[]>([]);
const dataIsLoading = ref(true);

onMounted(async () => {
  const fetchedData = await useMyFetch("/service/all");
  if (Array.isArray(fetchedData)) data.value = fetchedData;
  dataIsLoading.value = false;
});
</script>

<template>
  <div
    class="w-full container mx-auto px-12 flex flex-col justify-center prices gap-12"
  >
    <div
      class="w-[500px] h-[60px] bg-[var(--yellow-600)] text-[var(--text-black)] text-4xl flex justify-end items-center px-4 relative rounded-r-2xl before:content-[''] before:bg-[var(--yellow-600)] before:absolute before:w-[10055px] before:h-[60px] before:top-0 before:left-[-10050px] font-bold"
    >
      Ціни на послуги
    </div>
    <div class="w-full mb-10">
      <div
        class="w-full rounded-2xl border border-[var(--border-main)] shadow-lg shadow-[var(--shadow-strong)]"
        v-gsap.whenVisible.once.from="{ opacity: 0, x: 62 }"
      >
        <div
          class="w-full h-[40px] bg-[var(--bg-secondary)] border-b-2 border-b-[var(--border-accent)] flex items-center justify-end gap-2 *:cursor-pointer p-2 rounded-t-2xl"
        >
          <Icon name="mingcute:minimize-fill" />
          <Icon name="mingcute:close-fill" />
        </div>
        <div
          class="p-4 bg-[var(--bg-secondary)] min-h-[350px] max-h-[350px] scroll-bar overflow-y-auto backdrop-blur-[5px] grid grid-cols-3 gap-6 rounded-b-2xl"
        >
          <template v-if="dataIsLoading">
            <div class="text-center text-5xl animate-pulse col-span-3">
              Завантаження...
            </div>
          </template>
          <template v-else>
            <UiAccordion
              v-for="service in data"
              :title="service.name"
              :items="service.work_types"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-bar {
  scrollbar-color: grey rgba(0, 0, 0, 0);
}
</style>
