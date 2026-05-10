<script setup lang="ts">
import Appointment from "~/components/ui/appointment.vue";
import { useUserStore } from "~/store/user.store";

type Appointment = {
  id: string;
  note: string;
  user_id: string;
  work_types: any[];
  duration: number;
  cost: number;
  status: string;
  startAt: string;
  appointment_date: string;
  appointment_time: string;
  created_at: string;
};

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

const search = async () => {
  isLoading.value = true;
  const queryString = new URLSearchParams();

  if (searchValue.value) queryString.append("search", searchValue.value);

  if (compoboxValue.value) {
    const status = translationStatus[compoboxValue.value.replace(" ", "")];
    if (status) queryString.append("status", status);
  }

  if (!compoboxValue.value && !searchValue.value) isSearch.value = false;
  else isSearch.value = true;

  const data = await useMyFetch(`/appointment/all?${queryString}`);
  if (Array.isArray(data)) appointments.value = data;
  isLoading.value = false;
};

const userStore = useUserStore();

const searchValue = ref("");
const compoboxValue = ref("");

const isLoading = ref(true);
const isSearch = ref(false);

const appointments = ref<Appointment[]>([]);

watch(compoboxValue, async () => {
  await search();
});

watch(
  () => userStore.userInfo.userId,
  async (val) => {
    const data = await useMyFetch(`/appointment/user?id=${val}`);
    if (Array.isArray(data)) appointments.value = data;
  },
);

onMounted(async () => {
  const data = await useMyFetch(
    `/appointment/user?id=${userStore.userInfo.userId}`,
  );
  if (Array.isArray(data)) appointments.value = data;
  isLoading.value = false;
});
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="flex flex-col gap-4 col-span-2">
      <div
        class="basic-back !p-4 !bg-[var(--bg-main)] border border-[var(--border-main)]"
      >
        <div
          class="flex flex-col lg:flex-row lg:items-end justify-between gap-2"
        >
          <div class="flex flex-col gap-2">
            <div class="text-5xl font-black leading-none">
              Ваші
              <span class="text-[var(--text-important)]">замовлення</span>
            </div>

            <div class="text-xl text-[var(--text-secondary)]">
              Перегляд, пошук та створення записів на сервіс
            </div>
          </div>

          <UiButton
            text-size="text-2xl"
            render-as="link"
            to="/account/create"
            class-name="
              min-h-[64px]
              px-6
              !bg-[var(--accent-primary)]
              hover:!bg-[var(--accent-hover)]
              !text-black
              !font-black
              !shadow-[0_0_25px_var(--accent-glow)]
              hover:scale-[1.02]
              !transition-all
            "
          >
            <div class="flex items-center justify-center gap-3">
              <Icon name="material-symbols:add-task-rounded" class="w-7 h-7" />
              <span>Створити</span>
            </div>
          </UiButton>
        </div>

        <div class="mt-6">
          <UiInput
            placeholder="Пошук замовлення..."
            v-model="searchValue"
            @input="search"
            icon-name="material-symbols:search-rounded"
            class="shadow-[0_0_25px_var(--shadow-soft)]"
          />
        </div>
      </div>

      <div
        class="basic-back !p-4 !bg-[var(--bg-main)] border border-[var(--border-main)] flex flex-col gap-4 min-h-[520px]"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div
              class="w-14 h-14 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] flex items-center justify-center"
            >
              <Icon
                name="material-symbols:calendar-month-rounded"
                class="w-8 h-8 text-[var(--text-important)]"
              />
            </div>

            <div class="flex flex-col">
              <div class="text-4xl font-black">Список замовлень</div>
              <div class="text-xl text-[var(--text-secondary)]">
                Ваші активні та завершені записи
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="!appointments.length && isSearch"
          class="w-full h-full text-6xl flex items-center justify-center gap-4 overflow-hidden text-bold"
        >
          <span class="text-center">
            <Icon
              name="material-symbols:search-off"
              class="relative top-1.5 text-[var(--text-important)]"
            />
            Замовлення за цим пошуком
            <span class="text-[var(--text-important)]">не знайдено</span>
          </span>
        </div>

        <div
          v-else-if="!appointments.length"
          class="w-full h-full text-6xl flex items-center justify-center gap-4 overflow-hidden text-bold"
        >
          <span class="text-center">
            <Icon
              name="material-symbols:search-off"
              class="relative top-1.5 text-[var(--text-important)]"
            />
            Ви ще не створили
            <span class="text-[var(--text-important)]">жодного</span>
            замовлення</span
          >
        </div>

        <div
          v-else-if="isLoading"
          class="w-full h-full text-6xl flex items-center justify-center gap-4 overflow-hidden text-bold"
        >
          <span class="text-center animate-pulse"> Завантаження... </span>
        </div>

        <div
          v-else
          class="w-full max-h-[560px] overflow-y-auto flex flex-col gap-4 pr-2 scroll-bar"
        >
          <Appointment
            v-for="appointment in appointments"
            :key="appointment.id"
            :id="appointment.id"
            :cost="appointment.cost"
            :status="appointment.status"
            :appointment_date="appointment.appointment_date"
            :appointment_time="appointment.appointment_time"
            :duration="appointment.duration"
            :note="appointment.note"
            :created_at="appointment.created_at"
            :user_id="appointment.user_id"
            :work_types="appointment.work_types"
          />
        </div>
      </div>
    </div>

    <aside
      class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)] h-full xl:sticky xl:top-6 flex flex-col gap-6"
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
          <div class="text-4xl font-black">Фільтри</div>
          <div class="text-xl text-[var(--text-secondary)]">
            Сортування замовлень
          </div>
        </div>
      </div>

      <div
        class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 flex flex-col gap-3"
      >
        <label class="text-2xl font-bold text-[var(--text-secondary)]">
          Статус
        </label>

        <UiCompobox
          v-model="compoboxValue"
          :options="statusOptions"
          class="min-h-[64px]"
        />
      </div>
    </aside>
  </div>
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
