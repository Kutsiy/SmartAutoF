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
  <section class="relative overflow-hidden py-14">
    <div class="container mx-auto px-6 lg:px-12 flex flex-col gap-10">
      <!-- TITLE -->
      <div
        class="relative w-fit min-h-[72px] pr-8 pl-6 rounded-r-[28px] bg-[var(--accent-primary)] text-black text-4xl lg:text-5xl font-black flex items-center gap-3 shadow-[0_0_35px_var(--accent-glow)] before:content-[''] before:absolute before:right-full before:top-0 before:h-full before:w-[100vw] before:bg-[var(--accent-primary)]"
      >
        <Icon name="solar:dollar-bold" class="relative top-0.5" />
        <span>Ціни на послуги</span>
      </div>

      <div
        class="relative rounded-[32px] border border-[var(--border-main)] bg-[rgba(255,255,255,0.03)] backdrop-blur-xl shadow-[0_0_45px_var(--shadow-soft)] overflow-hidden"
        v-gsap.whenVisible.once.from="{ opacity: 0, x: 62 }"
      >
        <div
          class="absolute top-0 right-0 w-[360px] h-[360px] rounded-full bg-[var(--yellow-20)] blur-[120px] opacity-25 pointer-events-none"
        />

        <div
          class="relative h-[58px] px-5 border-b border-[var(--border-main)] bg-[rgba(255,255,255,0.04)] flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <div class="w-3.5 h-3.5 rounded-full bg-red-500" />
            <div class="w-3.5 h-3.5 rounded-full bg-yellow-400" />
            <div class="w-3.5 h-3.5 rounded-full bg-green-500" />
          </div>

          <div
            class="hidden md:flex items-center gap-2 text-xl font-bold text-[var(--text-secondary)]"
          >
            <Icon
              name="material-symbols:receipt-long-rounded"
              class="w-6 h-6 text-[var(--text-important)]"
            />
            <span>Прайс-лист SmartAuto</span>
          </div>

          <div class="w-[70px]" />
        </div>

        <div
          class="relative p-4 lg:p-6 min-h-[430px] max-h-[520px] overflow-y-auto scroll-bar grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          <template v-if="dataIsLoading">
            <div
              class="col-span-full min-h-[340px] flex flex-col items-center justify-center gap-4 text-4xl font-black text-[var(--text-secondary)]"
            >
              <Icon
                name="material-symbols:progress-activity-rounded"
                class="w-16 h-16 animate-spin text-[var(--text-important)]"
              />

              <span class="animate-pulse">Завантаження...</span>
            </div>
          </template>

          <template v-else>
            <UiAccordion
              v-for="service in data"
              :key="service.id || service.name"
              :title="service.name"
              :items="service.work_types"
            />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scroll-bar {
  scrollbar-width: thin;
  scrollbar-color: var(--border-accent) transparent;
}

.scroll-bar::-webkit-scrollbar {
  width: 7px;
}

.scroll-bar::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background: var(--border-accent);
  border-radius: 999px;
}
</style>
