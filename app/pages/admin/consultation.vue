<script setup lang="ts">
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
  note?: string | null;
  status: ConsultationStatus;
  created_at: string;
  canceled_at?: string | null;
  done_at?: string | null;
  userId?: string | null;
};

const consultations = ref<Consultation[]>([]);
const isLoading = ref(false);
const serverError = ref("");

const search = ref("");
const status = ref<ConsultationStatus | "">("");
const order = ref<"Спадання" | "Зростання">("Спадання");

const statusOptions = [
  null,
  "Очікує",
  "Підтверджено",
  "В обробці",
  "Виконано",
  "Скасовано",
];

const translationStatus: Record<string, string> = {
  Очікує: "PENDING",
  Підтверджено: "CONFIRMED",
  Вобробці: "IN_PROCESSING",
  Виконано: "DONE",
  Скасовано: "CANCELED",
};

const statusLabels: Record<ConsultationStatus, string> = {
  PENDING: "Очікує",
  CONFIRMED: "Підтверджено",
  IN_PROCESSING: "В обробці",
  DONE: "Виконано",
  CANCELED: "Скасовано",
};

const getStatusClass = (value: ConsultationStatus) => {
  if (value === "DONE") return "text-green-400 border-green-400/40";
  if (value === "CANCELED") return "text-red-400 border-red-400/40";
  if (value === "CONFIRMED") return "text-blue-400 border-blue-400/40";
  if (value === "PENDING") return "text-yellow-400 border-yellow-400/40";

  return "text-[var(--text-important)] border-[var(--border-accent)]";
};

const getConsultations = async () => {
  serverError.value = "";

  const query = new URLSearchParams();

  if (search.value.trim()) {
    query.append("search", search.value.trim());
  }

  if (status.value) {
    const backendStatus = translationStatus[status.value.replace(" ", "")];

    if (backendStatus) {
      query.append("status", backendStatus);
    }
  }

  query.append(
    "order",
    order.value === "Спадання" ? "descending" : "ascending",
  );

  try {
    isLoading.value = true;

    const data = await useMyFetch(`/consultation/all?${query}`);

    if (Array.isArray(data)) {
      consultations.value = data;
    }
  } catch (e: any) {
    serverError.value = e?.data?.detail || "Помилка завантаження консультацій";
  } finally {
    isLoading.value = false;
  }
};

const updateStatus = async (
  consultationId: string,
  newStatus: ConsultationStatus,
) => {
  serverError.value = "";

  try {
    const updatedConsultation = await useMyFetch(
      `/consultation/update?id=${consultationId}&status=${newStatus}`,
      {
        method: "PATCH",
      },
    );

    consultations.value = consultations.value.map((consultation) =>
      consultation.id === consultationId ? updatedConsultation : consultation,
    ) as Consultation[];
  } catch (e: any) {
    serverError.value = e?.data?.detail || "Помилка оновлення статусу";
  }
};

const resetFilters = async () => {
  search.value = "";
  status.value = "";
  order.value = "Спадання";

  await getConsultations();
};

watch([status, order], async () => {
  await getConsultations();
});

onMounted(async () => {
  await getConsultations();
});
</script>

<template>
  <div class="relative flex flex-col gap-6">
    <div
      class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)]"
    >
      <div class="flex items-center justify-between gap-4">
        <div class="flex flex-col gap-2">
          <div class="text-5xl font-black leading-none">Консультації</div>

          <div class="text-xl text-[var(--text-secondary)]">
            Перегляд заявок, пошук та зміна статусів
          </div>
        </div>

        <div
          class="flex items-center justify-center w-24 h-24 rounded-3xl border border-[var(--border-accent)] bg-[var(--yellow-10)] shadow-[0_0_30px_var(--yellow-20)]"
        >
          <Icon
            name="material-symbols:support-agent-rounded"
            class="w-14 h-14 text-[var(--text-important)]"
          />
        </div>
      </div>
    </div>

    <div
      class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)]"
    >
      <div class="flex flex-col gap-2">
        <UiInput
          v-model="search"
          label="Пошук"
          placeholder="Ім’я, телефон або коментар..."
          icon-name="material-symbols:search-rounded"
          big-text
        />

        <div class="grid grid-cols-3 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-2xl text-[var(--text-secondary)]">
              Статус
            </label>

            <div
              class="min-h-[74px] rounded-2xl bg-[var(--bg-secondary)] flex items-center"
            >
              <UiCompobox
                class="w-full"
                :options="statusOptions"
                v-model="status"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-2xl text-[var(--text-secondary)]">
              Сортування
            </label>

            <div
              class="min-h-[74px] rounded-2xl bg-[var(--bg-secondary)] flex items-center"
            >
              <UiCompobox
                class="w-full"
                :options="['Спадання', 'Зростання']"
                v-model="order"
              />
            </div>
          </div>

          <div class="flex items-end gap-4">
            <UiButton
              text-size="text-2xl"
              class-name="min-h-[74px] w-full px-6"
              @click="getConsultations"
            >
              Шукати
            </UiButton>

            <UiButton
              text-size="text-2xl"
              class-name="min-h-[74px] w-full px-6"
              @click="resetFilters"
            >
              Скинути
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="serverError || isLoading"
      class="flex items-center justify-center min-h-[70px]"
    >
      <div
        v-if="serverError"
        class="basic-back text-3xl text-[var(--text-red)] font-bold"
      >
        {{ serverError }}
      </div>

      <div v-else class="basic-back text-3xl font-bold">
        <span class="animate-pulse">Завантаження...</span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div
        v-if="!isLoading && consultations.length === 0"
        class="basic-back !bg-[var(--bg-main)] border border-[var(--border-main)] text-3xl text-center text-[var(--text-secondary)]"
      >
        Консультацій не знайдено
      </div>

      <div
        v-for="consultation in consultations"
        :key="consultation.id"
        class="basic-back !bg-[var(--bg-main)] border border-[var(--border-main)] hover:border-[var(--border-accent)] transition-colors"
      >
        <div class="grid grid-cols-[1fr_260px] gap-6 items-start p-4">
          <div class="flex flex-col gap-4">
            <div class="flex flex-wrap items-center gap-3">
              <div class="text-4xl font-black">
                {{ consultation.name }}
              </div>

              <div
                class="px-4 py-2 rounded-2xl border text-xl font-bold"
                :class="getStatusClass(consultation.status)"
              >
                {{ statusLabels[consultation.status] }}
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3 text-2xl">
                <Icon
                  name="material-symbols:call-outline-rounded"
                  class="w-7 h-7 text-[var(--text-important)]"
                />

                <span>{{ consultation.phone_number }}</span>
              </div>

              <div
                class="flex items-center gap-3 text-2xl text-[var(--text-secondary)]"
              >
                <Icon
                  name="material-symbols:calendar-month-rounded"
                  class="w-7 h-7 text-[var(--text-important)]"
                />

                <span>
                  {{ new Date(consultation.created_at).toLocaleString() }}
                </span>
              </div>
            </div>

            <div
              v-if="consultation.note"
              class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 text-2xl leading-relaxed"
            >
              <div class="text-[var(--text-secondary)] mb-2">Коментар:</div>

              {{ consultation.note }}
            </div>

            <div
              class="text-2xl border p-2 rounded-2xl w-fit"
              :class="[
                consultation.userId
                  ? 'border-green-400 bg-green-400/50'
                  : 'border-red-500 bg-red-500/50',
              ]"
            >
              {{
                consultation.userId
                  ? "Користувач зареєстрований"
                  : "Користувач не зареєстрований"
              }}
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <div class="text-2xl text-[var(--text-secondary)]">
              Змінити статус
            </div>

            <div class="grid grid-cols-1 gap-3">
              <button
                v-for="item in [
                  'PENDING',
                  'CONFIRMED',
                  'IN_PROCESSING',
                  'DONE',
                  'CANCELED',
                ]"
                :key="item"
                type="button"
                class="px-4 py-3 rounded-2xl border text-xl font-bold transition-all hover:scale-[1.02] bg-[var(--bg-secondary)]"
                :class="
                  consultation.status === item
                    ? 'border-[var(--border-accent)] bg-[var(--bg-accent)]'
                    : 'border-[var(--border-main)] hover:border-[var(--border-accent)] text-[var(--text-secondary)]'
                "
                @click="
                  updateStatus(consultation.id, item as ConsultationStatus)
                "
              >
                {{ statusLabels[item as ConsultationStatus] }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
