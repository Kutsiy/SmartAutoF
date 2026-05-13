<script setup lang="ts">
const {
  donutData = [],
  labelA = "",
  labelB = "",
  label = "",
} = defineProps<{
  donutData?: any[];
  labelA?: string;
  labelB?: string;
  label?: string;
}>();

const marketShareLabels = {
  [`${labelA}`]: {
    name: labelA,
    color: "var(--yellow-500)",
  },
  [`${labelB}`]: {
    name: labelB,
    color: "var(--black-500)",
  },
};

const dataRef = toRef(() => donutData);
</script>

<template>
  <div
    class="w-full bg-[var(--bg-secondary)] rounded-2xl p-2 shadow-md shadow-[var(--shadow-glow)]"
  >
    <DonutChart
      :data="dataRef"
      :categories="marketShareLabels"
      :height="190"
      :radius="100"
      :pad-angle="0.05"
      :arc-width="25"
    >
    </DonutChart>
    <div class="text-center">
      <div class="font-semibold">{{ label }}</div>
    </div>
  </div>
</template>
