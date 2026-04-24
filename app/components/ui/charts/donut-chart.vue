<script setup lang="ts">
const donutData = ref([35, 25]);

const marketShareLabels = {
  "Product A": {
    name: "Product A",
    color: "var(--yellow-500)",
  },
  "Product B": {
    name: "Product B",
    color: "var(--black-500)",
  },
};
</script>

<template>
  <div
    class="w-full bg-[var(--bg-secondary)] rounded-2xl p-2 shadow-md shadow-[var(--shadow-glow)]"
  >
    <DonutChart
      :data="donutData"
      :categories="marketShareLabels"
      :height="190"
      :radius="100"
      :pad-angle="0.05"
      :arc-width="25"
    >
      <div class="text-center">
        <div class="font-semibold">Label</div>
        <div class="text-muted">2 seconds ago</div>
      </div>
    </DonutChart>
  </div>
</template>
