<script setup lang="ts">
import { BarChartWrap, DonutChartWrap } from "~/components/ui/charts";

const userCount = ref(0);
const appointmentInProgCount = ref(0);
const doneAppointByMonths = ref<any[]>([]);
const appointmentsByDay = ref<any[]>([]);
const consultationsByDay = ref<any[]>([]);
const doneAndCanceledAppoint = ref<number[]>([]);

const getUsersCount = async () => {
  const data = await useMyFetch("/statistic/user/count");
  if (typeof data === "number") userCount.value = data;
};

const getAppointInProgCount = async () => {
  const data = await useMyFetch("/statistic/appointments/active");
  if (typeof data === "number") appointmentInProgCount.value = data;
};

const getDoneAppointByMonths = async () => {
  const data = await useMyFetch("/statistic/appointments/months");
  if (Array.isArray(data)) doneAppointByMonths.value = data;
};

const getAppointByDay = async () => {
  const data = await useMyFetch("/statistic/appointments/day");
  if (Array.isArray(data)) appointmentsByDay.value = data;
};

const getConsultationByDay = async () => {
  const data = await useMyFetch("/statistic/consultation/day");
  if (Array.isArray(data)) consultationsByDay.value = data;
};

const getDoneAndCanceledAppoint = async () => {
  const data = await useMyFetch("/statistic/appointments/completed-canceled");
  if (Array.isArray(data)) doneAndCanceledAppoint.value = data;
};

onMounted(async () => {
  await Promise.all([
    getUsersCount(),
    getAppointInProgCount(),
    getDoneAppointByMonths(),
    getAppointByDay(),
    getConsultationByDay(),
    getDoneAndCanceledAppoint(),
  ]);
});
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="flex flex-col col-span-2 gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <UiCard
            title="Кількість користувачів"
            :value="`${userCount}`"
            :bg="true"
          />
        </div>
        <div>
          <UiCard
            title="Кількість активних замовлень"
            :value="`${appointmentInProgCount}`"
          />
        </div>
      </div>
      <div>
        <BarChartWrap
          title="Виконанні замовлення на місяць"
          :data="doneAppointByMonths"
          :y-axis="['count']"
          name="count"
          :x-formatter="(i) => `${doneAppointByMonths[i]?.month}`"
          :y-formatter="(tick) => tick.toString()"
          :x-ticks="doneAppointByMonths.length"
        />
      </div>
      <div class="w-full flex justify-between gap-4">
        <DonutChartWrap
          label="Кількість виконаних та не виконаних замовлень"
          labelA="Виконані"
          labelB="Не виконані"
          :donut-data="doneAndCanceledAppoint"
        />
      </div>
    </div>
    <div class="w-full grid grid-cols-1 grid-rows-2 gap-4">
      <BarChartWrap
        title="Кількість замовлень на день"
        :data="appointmentsByDay"
        :y-axis="['count']"
        name="count"
        :x-formatter="(i) => `${appointmentsByDay[i]?.day}`"
        :y-formatter="(tick) => tick.toString()"
        :x-ticks="appointmentsByDay.length"
      />
      <BarChartWrap
        title="Кількість консультацій на день"
        :data="consultationsByDay"
        :y-axis="['count']"
        name="count"
        :x-formatter="(i) => `${consultationsByDay[i]?.day}`"
        :y-formatter="(tick) => tick.toString()"
        :x-ticks="consultationsByDay.length"
      />
    </div>
  </div>
</template>
