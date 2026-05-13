<script setup lang="ts">
type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "INPROCESSING"
  | "DONE"
  | "CANCELED";

type WorkType = {
  id: string;
  name: string;
  price: string | number;
  duration: number;
};

type Appointment = {
  id: string;
  user_id: string;
  cost: string | number;
  status: AppointmentStatus;
  appointment_date: string;
  appointment_time: string;
  duration: number;
  created_at: string;

  note?: string | null;
  cancel_reason?: string | null;
  done_note?: string | null;
  canceled_at?: string | null;
  done_at?: string | null;
  startAt?: string | null;

  work_types?: WorkType[];

  user?: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    phone_number?: string;
  };
};

const searchValue = ref("");
const compoboxValue = ref("");
const isLoading = ref(true);
const isSearch = ref(false);
const serverError = ref("");

const appointments = ref<Appointment[]>([]);

const statusOptions = [
  "",
  "Очікує",
  "Підтверджено",
  "В обробці",
  "Виконано",
  "Скасовано",
];

const statusForBackend: Record<string, AppointmentStatus> = {
  Очікує: "PENDING",
  Підтверджено: "CONFIRMED",
  "В обробці": "INPROCESSING",
  Виконано: "DONE",
  Скасовано: "CANCELED",
};

const statusForFrontend: Record<AppointmentStatus, string> = {
  PENDING: "Очікує",
  CONFIRMED: "Підтверджено",
  INPROCESSING: "В обробці",
  DONE: "Виконано",
  CANCELED: "Скасовано",
};

const statusClass: Record<AppointmentStatus, string> = {
  PENDING: "border-yellow-400/40 bg-yellow-500/10 text-yellow-400",
  CONFIRMED: "border-blue-400/40 bg-blue-500/10 text-blue-400",
  INPROCESSING:
    "border-[var(--border-accent)] bg-[var(--yellow-10)] text-[var(--text-important)]",
  DONE: "border-green-400/40 bg-green-500/10 text-green-400",
  CANCELED: "border-red-400/40 bg-red-500/10 text-red-400",
};

const statusChangeOptions = [
  "Очікує",
  "Підтверджено",
  "В обробці",
  "Виконано",
  "Скасовано",
];

const search = async () => {
  isLoading.value = true;
  serverError.value = "";

  const queryString = new URLSearchParams();

  if (searchValue.value.trim()) {
    queryString.append("search", searchValue.value.trim());
  }

  if (compoboxValue.value) {
    const status = statusForBackend[compoboxValue.value];

    if (status) {
      queryString.append("status", status);
    }
  }

  isSearch.value = !!searchValue.value.trim() || !!compoboxValue.value;

  try {
    const data = await useMyFetch(`/appointment/all?${queryString}`);

    if (Array.isArray(data)) {
      appointments.value = data;
    }
  } catch (e: any) {
    serverError.value = e?.data?.detail || "Помилка завантаження замовлень";
  } finally {
    isLoading.value = false;
  }
};

const resetSearch = async () => {
  searchValue.value = "";
  compoboxValue.value = "";
  isSearch.value = false;

  await search();
};

const updateAppointmentStatus = async (
  appointmentId: string,
  frontendStatus: string,
) => {
  const backendStatus = statusForBackend[frontendStatus];

  if (!backendStatus) return;

  try {
    const data = await useMyFetch(
      `/appointment/update?id=${appointmentId}&status=${backendStatus}`,
      {
        method: "PATCH",
      },
    );

    appointments.value = appointments.value.map((appointment) =>
      appointment.id === appointmentId
        ? {
            ...appointment,
            status: backendStatus,
            ...(typeof data === "object" && data ? data : {}),
          }
        : appointment,
    );
  } catch (e: any) {
    serverError.value = e?.data?.detail || "Помилка оновлення статусу";
  }
};

const formatDate = (date: string, time: string) => {
  const value = new Date(`${date}T${time}`);

  return value.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

watch(compoboxValue, async () => {
  await search();
});

onMounted(async () => {
  await search();
});
</script>

<template>
  <div class="grid grid-cols-3 gap-6 w-full h-full">
    <div class="flex flex-col gap-6 min-w-0 col-span-2">
      <div
        class="basic-back !p-4 !bg-[var(--bg-main)] border border-[var(--border-main)]"
      >
        <div
          class="flex flex-col lg:flex-row lg:items-end justify-between gap-4"
        >
          <div class="flex flex-col gap-2">
            <div class="text-5xl font-black leading-none">Замовлення</div>

            <div class="text-xl text-[var(--text-secondary)]">
              Пошук, перегляд та зміна статусів замовлень
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
            placeholder="Пошук по коментарю, імені або email..."
            icon-name="material-symbols:search-rounded"
            @keyup.enter="search"
          />

          <UiButton
            text-size="text-2xl"
            class-name="min-h-[64px] px-6"
            @click="search"
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
        class="basic-back !p-4 !bg-[var(--bg-main)] border border-red-500/40 text-3xl font-bold text-red-400"
      >
        {{ serverError }}
      </div>

      <div
        class="basic-back !p-4 !bg-[var(--bg-main)] border border-[var(--border-main)] flex flex-col gap-4"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div
              class="w-16 h-16 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] flex items-center justify-center"
            >
              <Icon
                name="material-symbols:calendar-month-rounded"
                class="w-9 h-9 text-[var(--text-important)]"
              />
            </div>

            <div class="flex flex-col">
              <div class="text-4xl font-black">Список замовлень</div>

              <div class="text-xl text-[var(--text-secondary)]">
                Всього: {{ appointments.length }}
              </div>
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
          v-else-if="appointments.length === 0"
          class="min-h-[320px] flex flex-col items-center justify-center gap-4 text-center"
        >
          <Icon
            name="material-symbols:search-off-rounded"
            class="w-20 h-20 text-[var(--text-important)]"
          />

          <div class="text-5xl font-black">Замовлень не знайдено</div>

          <div class="text-2xl text-[var(--text-secondary)]">
            Спробуйте змінити пошук або фільтр
          </div>
        </div>

        <div
          v-else
          class="flex flex-col gap-4 max-h-[650px] overflow-y-auto pr-2 scroll-bar"
        >
          <div
            v-for="appointment in appointments"
            :key="appointment.id"
            class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-4 hover:border-[var(--border-accent)] transition-all"
          >
            <div
              class="flex flex-col lg:flex-row lg:items-start justify-between gap-4"
            >
              <div class="flex flex-col gap-1 min-w-0">
                <div class="text-xl text-[var(--text-secondary)]">
                  Номер замовлення
                </div>

                <div class="text-4xl font-black truncate">
                  #{{ appointment.id.slice(0, 8) }}
                </div>
              </div>

              <div
                class="w-fit px-4 py-2 rounded-2xl border text-xl font-black"
                :class="statusClass[appointment.status]"
              >
                {{ statusForFrontend[appointment.status] }}
              </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div class="info-card">
                <div class="info-label">Клієнт</div>

                <NuxtLink
                  :to="`/admin/user/${appointment.user_id}`"
                  class="info-value hover:text-[var(--text-important)] transition-colors"
                >
                  {{ appointment.user_id.slice(0, 8) }}
                </NuxtLink>
              </div>

              <div class="info-card">
                <div class="info-label">Тривалість</div>

                <div class="info-value">{{ appointment.duration }} хв</div>
              </div>

              <div class="info-card">
                <div class="info-label">Дата</div>

                <div class="info-value">
                  {{
                    formatDate(
                      appointment.appointment_date,
                      appointment.appointment_time,
                    )
                  }}
                </div>
              </div>

              <div class="info-card">
                <div class="info-label">Ціна</div>

                <div class="info-value text-[var(--text-important)]">
                  {{ appointment.cost }} грн
                </div>
              </div>

              <div
                class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)] p-4 col-span-1 xl:col-span-2"
              >
                <div class="info-label mb-4">Типи робіт</div>

                <div
                  v-if="appointment.work_types?.length"
                  class="grid grid-cols-1 gap-3"
                >
                  <div
                    v-for="workType in appointment.work_types"
                    :key="workType.id"
                    class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 flex flex-col gap-2 hover:border-[var(--border-accent)] hover:shadow-[0_0_20px_var(--yellow-20)] transition-all"
                  >
                    <div class="flex items-center justify-between gap-3">
                      <div class="text-2xl font-black truncate">
                        {{ workType.name }}
                      </div>

                      <div
                        class="px-3 py-1 rounded-xl bg-[var(--yellow-10)] border border-[var(--border-accent)] text-[var(--text-important)] text-lg font-bold shrink-0"
                      >
                        {{ workType.price }} грн
                      </div>
                    </div>

                    <div
                      class="text-xl text-[var(--text-secondary)] flex items-center gap-2"
                    >
                      <Icon
                        name="material-symbols:schedule-rounded"
                        class="w-5 h-5"
                      />

                      {{ workType.duration }} хв
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  class="rounded-2xl border border-dashed border-[var(--border-main)] p-6 text-center text-2xl text-[var(--text-secondary)]"
                >
                  Типи робіт відсутні
                </div>
              </div>
            </div>

            <div
              v-if="appointment.note"
              class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)] p-4 text-2xl leading-relaxed"
            >
              <div class="text-xl text-[var(--text-secondary)] mb-1">
                Коментар
              </div>

              {{ appointment.note }}
            </div>

            <div
              class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)] p-4"
            >
              <div class="text-xl text-[var(--text-secondary)] mb-3">
                Змінити статус
              </div>

              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="statusItem in statusChangeOptions"
                  :key="statusItem"
                  type="button"
                  class="px-3 py-3 rounded-2xl border text-xl font-bold transition-all hover:scale-[1.02]"
                  :class="
                    appointment.status === statusForBackend[statusItem]
                      ? 'border-[var(--border-accent)] bg-[var(--bg-accent)] text-black'
                      : 'border-[var(--border-main)] hover:border-[var(--border-accent)]'
                  "
                  @click="updateAppointmentStatus(appointment.id, statusItem)"
                >
                  {{ statusItem }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <aside
      class="basic-back !p-4 !bg-[var(--bg-main)] h-full border border-[var(--border-main)] xl:sticky flex flex-col gap-6"
    >
      <div class="flex items-center gap-4">
        <div
          class="w-16 h-16 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] flex items-center justify-center"
        >
          <Icon
            name="material-symbols:tune-rounded"
            class="w-9 h-9 text-[var(--text-important)]"
          />
        </div>

        <div class="flex flex-col">
          <div class="text-4xl font-black">Фільтр</div>

          <div class="text-xl text-[var(--text-secondary)]">
            Статус замовлення
          </div>
        </div>
      </div>

      <div
        class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 flex flex-col gap-3"
      >
        <label class="text-2xl font-bold text-[var(--text-secondary)]">
          Статус
        </label>

        <UiCompobox :options="statusOptions" v-model="compoboxValue" />
      </div>
    </aside>
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
