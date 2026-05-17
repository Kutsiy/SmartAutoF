<script setup lang="ts">
import { useUserStore } from "~/store/user.store";

type ConsultationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROCESSING"
  | "DONE"
  | "CANCELED";

type Consultation = {
  id: string;
  name: string;
  phone_number: string;
  status: ConsultationStatus;
  created_at: string;
  note?: string | null;
  canceled_at?: string | null;
  done_at?: string | null;
};

const userStore = useUserStore();

const consultations = ref<Consultation[]>([]);
const searchValue = ref("");
const isLoading = ref(true);
const isSearch = ref(false);
const serverError = ref("");

const statusText: Record<ConsultationStatus, string> = {
  PENDING: "Очікує",
  CONFIRMED: "Підтверджено",
  IN_PROCESSING: "В обробці",
  DONE: "Виконано",
  CANCELED: "Скасовано",
};

const statusClass: Record<ConsultationStatus, string> = {
  PENDING: "border-yellow-400/40 bg-yellow-500/10 text-yellow-400",
  CONFIRMED: "border-blue-400/40 bg-blue-500/10 text-blue-400",
  IN_PROCESSING:
    "border-[var(--border-accent)] bg-[var(--yellow-10)] text-[var(--text-important)]",
  DONE: "border-green-400/40 bg-green-500/10 text-green-400",
  CANCELED: "border-red-400/40 bg-red-500/10 text-red-400",
};

const formatDate = (value: string) => {
  return new Date(value).toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getConsultations = async () => {
  isLoading.value = true;
  serverError.value = "";

  const queryString = new URLSearchParams();

  queryString.append("id", userStore.userInfo.userId);

  if (searchValue.value.trim()) {
    queryString.append("search", searchValue.value.trim());
  }

  isSearch.value = !!searchValue.value.trim();

  try {
    const data = await useMyFetch(`/consultation/user?${queryString}`);

    if (Array.isArray(data)) {
      consultations.value = data;
    }
  } catch (e: any) {
    serverError.value = e?.data?.detail || "Помилка завантаження консультацій";
  } finally {
    isLoading.value = false;
  }
};

const resetSearch = async () => {
  searchValue.value = "";
  isSearch.value = false;

  await getConsultations();
};

watch(
  () => userStore.userInfo.userId,
  async (value) => {
    await getConsultations();
  },
  { immediate: true },
);

// onMounted(async () => {
//   await getConsultations();
// });
</script>

<template>
  <div class="flex flex-col gap-6">
    <div
      class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)]"
    >
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div class="flex flex-col gap-2">
          <div class="text-5xl font-black leading-none">
            Мої
            <span class="text-[var(--text-important)]">консультації</span>
          </div>

          <div class="text-xl text-[var(--text-secondary)]">
            Перегляд ваших заявок на консультацію
          </div>
        </div>

        <div
          v-if="isSearch"
          class="px-4 py-2 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] text-[var(--text-important)] text-xl font-bold"
        >
          Активний пошук
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-4 mt-6">
        <UiInput
          v-model="searchValue"
          placeholder="Пошук по імені, телефону або коментарю..."
          icon-name="material-symbols:search-rounded"
          @keyup.enter="getConsultations"
        />

        <UiButton
          text-size="text-2xl"
          class-name="min-h-[64px] px-6"
          @click="getConsultations"
        >
          Шукати
        </UiButton>

        <UiButton
          text-size="text-2xl"
          class-name="min-h-[64px] px-6"
          @click="resetSearch"
        >
          Скинути
        </UiButton>
      </div>
    </div>

    <div
      v-if="serverError"
      class="basic-back !bg-[var(--bg-main)] !p-4 border border-red-500/40 text-3xl font-bold text-red-400"
    >
      {{ serverError }}
    </div>

    <div
      class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)] flex flex-col gap-4"
    >
      <div class="flex items-center gap-4">
        <div
          class="w-16 h-16 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] flex items-center justify-center"
        >
          <Icon
            name="material-symbols:support-agent-rounded"
            class="w-9 h-9 text-[var(--text-important)]"
          />
        </div>

        <div class="flex flex-col">
          <div class="text-4xl font-black">Список консультацій</div>
          <div class="text-xl text-[var(--text-secondary)]">
            Всього: {{ consultations.length }}
          </div>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="min-h-[320px] flex items-center justify-center"
      >
        <div
          class="text-4xl font-black animate-pulse text-[var(--text-secondary)]"
        >
          Завантаження...
        </div>
      </div>

      <div
        v-else-if="consultations.length === 0"
        class="min-h-[320px] flex flex-col items-center justify-center gap-4 text-center"
      >
        <Icon
          name="material-symbols:search-off-rounded"
          class="w-20 h-20 text-[var(--text-important)]"
        />

        <div class="text-5xl font-black">Консультацій не знайдено</div>

        <div class="text-2xl text-[var(--text-secondary)]">
          Спробуйте змінити пошук або створіть нову заявку
        </div>
      </div>

      <div
        v-else
        class="flex flex-col gap-4 max-h-[650px] overflow-y-auto pr-2 scroll-bar"
      >
        <div
          v-for="consultation in consultations"
          :key="consultation.id"
          class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-4 hover:border-[var(--border-accent)] hover:shadow-[0_0_30px_var(--yellow-20)] transition-all"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex flex-col gap-1 min-w-0">
              <div class="text-xl text-[var(--text-secondary)]">
                Номер консультації
              </div>

              <div class="text-4xl font-black truncate">
                #{{ consultation.id.slice(0, 8) }}
              </div>
            </div>

            <div
              class="w-fit px-4 py-2 rounded-2xl border text-xl font-black"
              :class="statusClass[consultation.status]"
            >
              {{ statusText[consultation.status] }}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="info-card">
              <div class="info-label">Ім’я</div>
              <div class="info-value">{{ consultation.name }}</div>
            </div>

            <div class="info-card">
              <div class="info-label">Телефон</div>
              <div class="info-value">{{ consultation.phone_number }}</div>
            </div>

            <div class="info-card">
              <div class="info-label">Дата створення</div>
              <div class="info-value">
                {{ formatDate(consultation.created_at) }}
              </div>
            </div>
          </div>

          <div
            v-if="consultation.note"
            class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)] p-4 text-2xl leading-relaxed"
          >
            <div class="text-xl text-[var(--text-secondary)] mb-1">
              Коментар
            </div>

            {{ consultation.note }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-card {
  @apply rounded-2xl
  border
  border-[var(--border-main)]
  bg-[var(--bg-main)]
  p-4
  flex
  flex-col
  gap-1
  min-w-0;
}

.info-label {
  @apply text-xl
  text-[var(--text-secondary)];
}

.info-value {
  @apply text-2xl
  font-black
  truncate;
}

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
