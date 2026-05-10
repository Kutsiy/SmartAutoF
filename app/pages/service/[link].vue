<script setup lang="ts">
type CategoryService = {
  id: string;
  name: string;
  image_link: string;
};

type WorkTypeResponse = {
  id: string;
  name: string;
  link_name: string;
  text: string;
  price: string | number;
  duration: number;
};

type ServiceResponse = {
  id: string;
  name: string;
  text: string;
  link_name: string;
  image_link: string;
  category: CategoryService;
  work_types: WorkTypeResponse[];
};

const route = useRoute();

const service = ref<ServiceResponse | null>(null);
const isLoading = ref(true);
const serverError = ref("");

const link = computed(() => String(route.params.link));

const getService = async () => {
  serverError.value = "";
  isLoading.value = true;

  try {
    const data = await useMyFetch(`/service/link?link=${link.value}`);
    service.value = data as ServiceResponse;
  } catch (e: any) {
    serverError.value = e?.data?.detail || "Помилка завантаження сервісу";
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (price: string | number) => {
  return Number(price).toLocaleString("uk-UA");
};

onMounted(async () => {
  await getService();
});
</script>

<template>
  <div class="container mx-auto px-6 lg:px-12 py-10">
    <div
      v-if="isLoading"
      class="basic-back !p-4 min-h-[360px] flex flex-col items-center justify-center gap-4"
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
      class="basic-back !p-4 min-h-[360px] flex flex-col items-center justify-center gap-4 text-center"
    >
      <Icon
        name="material-symbols:error-rounded"
        class="w-20 h-20 text-red-400"
      />

      <div class="text-4xl font-black text-red-400">
        {{ serverError }}
      </div>
    </div>

    <div v-else-if="service" class="flex flex-col gap-6">
      <div
        class="relative overflow-hidden basic-back !p-4 border border-[var(--border-main)] rounded-[36px] p-6 lg:p-10"
      >
        <div class="relative grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">
          <div class="flex flex-col gap-5">
            <NuxtLink
              to="/services"
              class="w-fit px-5 py-3 rounded-2xl border border-[var(--border-main)] text-xl font-bold hover:border-[var(--border-accent)] hover:bg-[var(--bg-hover)] transition-all flex items-center gap-2"
            >
              <Icon
                name="material-symbols:arrow-back-rounded"
                class="w-6 h-6 text-[var(--text-important)]"
              />
              <span>Назад до сервісів</span>
            </NuxtLink>

            <div
              class="w-fit px-4 py-2 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] text-[var(--text-important)] text-xl font-black"
            >
              {{ service.category?.name }}
            </div>

            <h1 class="text-5xl lg:text-7xl font-black leading-none">
              {{ service.name }}
            </h1>

            <p
              class="text-2xl lg:text-3xl text-[var(--text-secondary)] leading-relaxed border border-[var(--border-main)] py-2 px-4 bg-[var(--bg-main)] rounded-2xl"
            >
              {{ service.text }}
            </p>
          </div>

          <div
            class="rounded-[32px] border border-[var(--border-main)] bg-[var(--bg-secondary)] overflow-hidden"
          >
            <NuxtImg
              :src="`http://localhost:8000/uploads/${service.image_link}`"
              class="w-full h-[280px] object-cover"
            />

            <div class="p-5 flex flex-col gap-3">
              <div class="text-xl text-[var(--text-secondary)]">
                Кількість робіт
              </div>

              <div class="text-5xl font-black text-[var(--text-important)]">
                {{ service.work_types?.length || 0 }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="basic-back !p-4 border border-[var(--border-main)] rounded-[32px] p-5 flex flex-col gap-5"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-4xl font-black">Типи робіт</div>
            <div class="text-xl text-[var(--text-secondary)]">
              Натисніть на роботу, щоб переглянути деталі
            </div>
          </div>
        </div>

        <div
          v-if="service.work_types?.length"
          class="overflow-hidden rounded-2xl border border-[var(--border-main)]"
        >
          <div
            class="hidden md:grid grid-cols-[1fr_180px_180px] gap-4 bg-[var(--bg-main)] p-4 text-xl font-black text-[var(--text-secondary)]"
          >
            <div>Назва роботи</div>
            <div>Ціна</div>
            <div>Тривалість</div>
          </div>

          <NuxtLink
            v-for="workType in service.work_types"
            :key="workType.id"
            :to="`/work/${workType.link_name}`"
            class="grid grid-cols-1 md:grid-cols-[1fr_180px_180px] gap-4 p-4 border-t border-[var(--border-main)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-important)] transition-all"
          >
            <div class="text-2xl font-black">
              {{ workType.name }}
            </div>

            <div class="text-2xl font-bold">
              {{ formatPrice(workType.price) }} грн
            </div>

            <div class="text-2xl font-bold">{{ workType.duration }} хв</div>
          </NuxtLink>
        </div>

        <div
          v-else
          class="min-h-[220px] rounded-2xl border border-dashed border-[var(--border-main)] flex items-center justify-center text-3xl text-[var(--text-secondary)]"
        >
          Роботи для цього сервісу відсутні
        </div>
      </div>
    </div>
  </div>
</template>
