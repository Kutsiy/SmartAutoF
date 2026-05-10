<script setup lang="ts">
const props = defineProps<{
  id: string;
  user_id: string;
  cost: string | number;
  status: string;
  appointment_date: string;
  appointment_time: string;
  duration: number;
  created_at: string;
  note?: string | null;
  work_types: any[];
}>();

const statusText: Record<string, string> = {
  PENDING: "Очікує",
  CONFIRMED: "Підтверджено",
  INPROCESSING: "В обробці",
  DONE: "Виконано",
  CANCELED: "Скасовано",
};

const statusClass: Record<string, string> = {
  PENDING: "border-yellow-400/40 bg-yellow-500/10 text-yellow-400",
  CONFIRMED: "border-blue-400/40 bg-blue-500/10 text-blue-400",
  INPROCESSING:
    "border-[var(--border-accent)] bg-[var(--yellow-10)] text-[var(--text-important)]",
  DONE: "border-green-400/40 bg-green-500/10 text-green-400",
  CANCELED: "border-red-400/40 bg-red-500/10 text-red-400",
};

const shortId = computed(() => props.id.slice(0, 8));

const formattedDate = computed(() => {
  return new Date(props.appointment_date).toLocaleDateString("uk-UA");
});

const formattedTime = computed(() => {
  return props.appointment_time.slice(0, 5);
});
</script>

<template>
  <div
    class="w-full rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-4 shadow-[0_0_25px_var(--shadow-soft)] hover:border-[var(--border-accent)] transition-all"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex flex-col gap-1">
        <div class="text-xl text-[var(--text-secondary)]">Номер замовлення</div>
        <div class="text-4xl font-black">#{{ shortId }}</div>
      </div>

      <div
        class="px-4 py-2 rounded-2xl border text-xl font-black"
        :class="statusClass[status]"
      >
        {{ statusText[status] }}
      </div>
    </div>

    <div
      class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)] p-4 flex flex-col gap-3 text-2xl"
    >
      <div class="flex items-center justify-between gap-4">
        <span class="text-[var(--text-secondary)]">Коштуватиме:</span>
        <span class="font-black text-[var(--text-important)]">
          {{ cost }} грн
        </span>
      </div>

      <div class="flex items-center justify-between gap-4">
        <span class="text-[var(--text-secondary)]">Дата:</span>
        <span class="font-bold text-right">
          {{ formattedDate }}
        </span>
      </div>

      <div class="flex items-center justify-between gap-4">
        <span class="text-[var(--text-secondary)]">Час:</span>
        <span class="font-bold text-right">
          {{ formattedTime }}
        </span>
      </div>

      <div class="flex items-center justify-between gap-4">
        <span class="text-[var(--text-secondary)]">Тривалість:</span>
        <span class="font-bold text-right"> {{ duration }} хв </span>
      </div>
    </div>

    <div
      class="grid grid-cols-1 gap-2 border border-[var(--border-main)] bg-[var(--bg-main)] p-4 rounded-2xl"
    >
      <div class="flex items-center justify-between text-xl">
        <div>Сервіс</div>
        <div>Ціна</div>
      </div>
      <div
        v-for="workType in work_types"
        class="flex items-center justify-between text-xl"
      >
        <div class="text-[var(--text-secondary)]">{{ workType.name }}</div>
        <div class="bg-[var(--accent-primary)] py-2 px-4 rounded-md text-black">
          {{ workType.price }} ГРН
        </div>
      </div>
    </div>

    <div
      v-if="note"
      class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-main)] p-4 text-2xl"
    >
      <div class="text-xl text-[var(--text-secondary)] mb-1">Коментар:</div>
      {{ note }}
    </div>
  </div>
</template>
