<script setup lang="ts">
defineOptions({
  tags: ["barcharts", "vertical"],
});

const {
  title = "",
  data = [{}],
  name = "Замовлень",
  yAxis = [""],
  height = 200,
  xTicks = 6,
  xFormatter = (i: number) => String(i),
  yFormatter = (tick: number) => String(tick),
} = defineProps<{
  title?: string;
  data?: Record<string, any>[];
  name?: string;
  height?: number;
  xTicks?: number;
  yAxis?: string[];
  xFormatter?: (i: number) => string;
  yFormatter?: (tick: number) => string;
}>();

const dataFormatter = computed(() => ({
  [`${name}`]: {
    name: name,
    color: "var(--bg-accent)",
  },
}));
</script>

<template>
  <div
    class="max-w-full space-y-6 rounded-2xl bg-[var(--bg-secondary)] p-4 shadow-md shadow-[var(--shadow-glow)]"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
    </div>
    <BarChart
      :data="data"
      :height="height"
      :categories="dataFormatter"
      :y-axis="yAxis"
      :x-num-ticks="xTicks"
      :radius="2"
      :y-grid-line="true"
      :x-formatter="xFormatter"
      :y-formatter="yFormatter"
      :legend-position="LegendPosition.TopRight"
      :hide-legend="true"
    />
  </div>
</template>
