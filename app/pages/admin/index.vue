<script setup lang="ts">
import { BarChart, DonutChart } from "~/components/ui/charts";

const userCount = ref(0);

onMounted(async () => {
  const data = await useMyFetch("/statistic/user/count");
  if (typeof data === "number") userCount.value = data;
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
          <UiCard title="Кількість активних замовлень" value="5" />
        </div>
      </div>
      <div>
        <BarChart />
      </div>
      <div class="w-full flex justify-between gap-4">
        <DonutChart />
        <DonutChart />
      </div>
    </div>
    <div class="w-full grid grid-cols-1 grid-rows-2 gap-4">
      <BarChart />
      <BarChart />
    </div>
  </div>
</template>
