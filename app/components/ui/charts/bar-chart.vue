<script setup>
defineOptions({
  tags: ["barcharts", "vertical"],
});

const RevenueData = [
  { month: "January", complete: 186 },
  { month: "February", complete: 305 },
  { month: "March", complete: 237 },
  { month: "April", complete: 73 },
  { month: "May", complete: 209 },
  { month: "June", complete: 214 },
];

const RevenueCategories = computed(() => ({
  complete: {
    name: "Complete",
    color: "var(--bg-accent)",
  },
}));

const xFormatter = (i) => `${RevenueData[i]?.month}`;
const yFormatter = (tick) => tick.toString();
</script>

<template>
  <div
    class="max-w-full space-y-6 rounded-2xl bg-[var(--bg-secondary)] p-4 shadow-md shadow-[var(--shadow-glow)]"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold">Виконані замовлення на місяць</h3>
      <UiButton icon="i-lucide-copy" size="sm" variant="soft" color="neutral" />
    </div>
    <BarChart
      :data="RevenueData"
      :height="200"
      :categories="RevenueCategories"
      :y-axis="['complete']"
      :x-num-ticks="6"
      :radius="2"
      :y-grid-line="true"
      :x-formatter="xFormatter"
      :y-formatter="yFormatter"
      :legend-position="LegendPosition.TopRight"
      :hide-legend="true"
    />
  </div>
</template>
