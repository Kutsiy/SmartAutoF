<script setup lang="ts">
type WorkTypeService = {
  id: string;
  name: string;
  image_link?: string | null;
};

type WorkTypeResponse = {
  id: string;
  name: string;
  link_name: string;
  text: string;
  price: string | number;
  duration: number;
  service: WorkTypeService;
};

const route = useRoute();

const workType = ref<WorkTypeResponse | null>(null);
const isLoading = ref(true);
const serverError = ref("");

const link = computed(() => String(route.params.link));

const getWorkType = async () => {
  serverError.value = "";
  isLoading.value = true;

  try {
    const data = await useMyFetch(`/work/type/link?link=${link.value}`);

    workType.value = data as WorkTypeResponse;
  } catch (e: any) {
    serverError.value = e?.data?.detail || "Помилка завантаження послуги";
  } finally {
    isLoading.value = false;
  }
};

const formattedPrice = computed(() => {
  if (!workType.value) return "0";

  return Number(workType.value.price).toLocaleString("uk-UA");
});

onMounted(async () => {
  await getWorkType();
});
</script>

<template>
  <div class="container mx-auto px-6 lg:px-12 py-10">
    <div
      v-if="isLoading"
      class="basic-back min-h-[360px] flex flex-col items-center justify-center gap-4"
    >
      <Icon
        name="material-symbols:progress-activity-rounded"
        class="w-16 h-16 animate-spin text-[var(--text-important)]"
      />

      <div class="text-4xl font-black text-[var(--text-secondary)]">
        Завантаження...
      </div>
    </div>

    <div
      v-else-if="serverError"
      class="basic-back min-h-[360px] flex flex-col items-center justify-center gap-4 text-center"
    >
      <Icon
        name="material-symbols:error-rounded"
        class="w-20 h-20 text-red-400"
      />

      <div class="text-4xl font-black text-red-400">
        {{ serverError }}
      </div>

      <NuxtLink
        to="/services"
        class="px-6 py-3 rounded-2xl bg-[var(--accent-primary)] text-black text-2xl font-black"
      >
        До послуг
      </NuxtLink>
    </div>

    <div v-else-if="workType" class="flex flex-col gap-6">
      <div
        class="relative overflow-hidden basic-back border border-[var(--border-main)] rounded-[36px] p-6 lg:p-10 flex flex-col gap-8"
      >
        <div
          class="absolute top-0 right-0 w-[320px] h-[320px] rounded-full bg-[var(--yellow-20)] blur-[120px] opacity-25 pointer-events-none"
        />

        <div
          class="relative flex flex-col xl:flex-row xl:items-start justify-between gap-8"
        >
          <div class="flex flex-col gap-5 max-w-[850px]">
            <NuxtLink
              to="/services"
              class="w-fit px-5 py-3 rounded-2xl border border-[var(--border-main)] text-xl font-bold hover:border-[var(--border-accent)] hover:bg-[var(--bg-hover)] transition-all flex items-center gap-2"
            >
              <Icon
                name="material-symbols:arrow-back-rounded"
                class="w-6 h-6 text-[var(--text-important)]"
              />

              <span>Назад до послуг</span>
            </NuxtLink>

            <div class="flex flex-col gap-3">
              <div
                class="w-fit px-4 py-2 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] text-[var(--text-important)] text-xl font-black"
              >
                {{ workType.service?.name || "Сервіс" }}
              </div>

              <div class="flex flex-col gap-6">
                <h1 class="text-5xl lg:text-7xl font-black leading-none">
                  {{ workType.name }}
                </h1>

                <p
                  class="text-3xl lg:text-3xl text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-main)] rounded-2xl p-4 border border-[var(--border-main)]"
                >
                  {{ workType.text }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="relative w-full xl:w-[360px] rounded-[32px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-4 shrink-0"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] flex items-center justify-center"
              >
                <Icon
                  name="solar:dollar-bold"
                  class="w-9 h-9 text-[var(--text-important)]"
                />
              </div>

              <div class="flex flex-col">
                <div class="text-xl text-[var(--text-secondary)]">Ціна</div>

                <div class="text-4xl font-black text-[var(--text-important)]">
                  {{ formattedPrice }} грн
                </div>
              </div>
            </div>

            <div
              class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)] p-4 flex items-center justify-between gap-4"
            >
              <div class="flex items-center gap-3">
                <Icon
                  name="material-symbols:schedule-rounded"
                  class="w-8 h-8 text-[var(--text-important)]"
                />

                <span class="text-2xl font-bold">Тривалість</span>
              </div>

              <span class="text-2xl font-black">
                {{ workType.duration }} хв
              </span>
            </div>

            <NuxtLink
              to="/account/create"
              class="min-h-[64px] rounded-2xl bg-[var(--accent-primary)] text-black text-2xl font-black flex items-center justify-center gap-3 shadow-[0_0_30px_var(--accent-glow)] hover:bg-[var(--accent-hover)] hover:scale-[1.02] transition-all"
            >
              <Icon name="material-symbols:add-task-rounded" class="w-8 h-8" />

              <span>Створити замовлення</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="info-card">
          <Icon name="material-symbols:verified-rounded" class="info-icon" />

          <div class="flex flex-col gap-1">
            <div class="info-title">Якісне виконання</div>
            <div class="info-text">
              Робота виконується досвідченими майстрами.
            </div>
          </div>
        </div>

        <div class="info-card">
          <Icon name="material-symbols:timer-rounded" class="info-icon" />

          <div class="flex flex-col gap-1">
            <div class="info-title">Швидке виконання</div>
            <div class="info-text">
              Орієнтовна тривалість: {{ workType.duration }} хв.
            </div>
          </div>
        </div>

        <div class="info-card">
          <Icon
            name="material-symbols:support-agent-rounded"
            class="info-icon"
          />

          <div class="flex flex-col gap-1">
            <div class="info-title">Консультація</div>
            <div class="info-text">Допоможемо підібрати потрібну послугу.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-card {
  @apply rounded-[28px]
  border
  border-[var(--border-main)]
  bg-[var(--bg-secondary)]
  p-5
  flex
  items-center
  gap-4
  hover:border-[var(--border-accent)]
  hover:shadow-[0_0_25px_var(--yellow-20)]
  transition-all;
}

.info-icon {
  @apply w-11
  h-11
  text-[var(--text-important)]
  shrink-0;
}

.info-title {
  @apply text-2xl
  font-black;
}

.info-text {
  @apply text-xl
  text-[var(--text-secondary)]
  leading-relaxed;
}
</style>
