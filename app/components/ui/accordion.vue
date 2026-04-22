<script setup>
const isOpen = ref(false);

const { title, items } = defineProps({
  title: String,
  items: Array,
});

const openAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="w-full text-2xl flex flex-col gap-2">
    <div
      class="w-full text-3xl cursor-pointer font-bold flex items-center justify-between border-2 border-dashed border-[var(--border-accent)] rounded-md px-2 py-1 hover:bg-[--bg-hover]"
      @click="openAccordion"
    >
      <span>{{ title }}</span
      ><span class="relative top-0.5"
        ><Icon v-if="!isOpen" name="material-symbols:add-2-rounded" />
        <Icon v-else name="ic:twotone-minus"
      /></span>
    </div>
    <div v-if="isOpen" class="flex flex-col gap-2">
      <span
        v-for="item in items"
        class="flex items-center justify-between border-2 border-[var(--border-accent)] rounded-md p-2 bg-[var(--bg-secondary)]"
      >
        <NuxtLink
          :to="item.link_name"
          class="hover:border-b-2 hover:border-[var(--border-accent)] cursor-pointer"
          >{{ item.name }}</NuxtLink
        >
        <div
          class="bg-[var(--yellow-600)] text-[var(--text-black)] p-2 rounded-md"
        >
          {{ item.price }} грн
        </div>
      </span>
    </div>
  </div>
</template>
