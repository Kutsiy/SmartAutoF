<script setup>
const { data } = await useFetch("http://localhost:8000/category/all");
const listIsOpen = ref(false);
const listItem = ref("Оберіть зі списку");

const changeListItem = (item) => {
  listItem.value = item;
};
</script>

<template>
  <div class="container mx-auto px-12 py-12 flex flex-col gap-12">
    <div class="flex items-center justify-between">
      <div
        class="w-[500px] h-[60px] bg-[var(--yellow-600)] text-[var(--text-black)] text-4xl flex justify-end items-center px-4 relative rounded-r-2xl before:content-[''] before:bg-[var(--yellow-600)] before:absolute before:w-[10055px] before:h-[60px] before:top-0 before:left-[-10055px] font-bold"
      >
        Наші сервіси
      </div>

      <div class="relative">
        <div
          @click="listIsOpen = !listIsOpen"
          class="w-[320px] h-[60px] flex items-center gap-2 text-3xl px-4 py-2 border border-[var(--border-main)] rounded-2xl cursor-pointer hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)] transition-all duration-200"
        >
          <Icon
            name="radix-icons:caret-down"
            class="opacity-70 transition-transform"
            :class="{ 'rotate-180': listIsOpen }"
          />
          {{ listItem }}
        </div>

        <div
          v-if="listIsOpen"
          class="absolute top-[110%] w-full flex flex-col gap-1 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl p-1 shadow-[var(--shadow-soft)] z-50"
        >
          <span
            v-for="value in data"
            @click="changeListItem(value.name)"
            class="px-3 py-2 rounded cursor-pointer text-2xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-soft)] transition-all"
            :class="{
              'bg-[var(--accent-soft)] text-[var(--text-primary)]':
                value.name === listItem,
            }"
          >
            {{ value.name }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-4 gap-4 border-2 border-dashed border-[var(--border-accent)] p-4 rounded-2xl bg-[var(--bg-secondary)] shadow-lg shadow-[var(--shadow-strong)]"
      v-gsap.whenVisible.from.once="{ opacity: 0, x: -32 }"
    >
      <div
        v-for="value in data"
        class="flex text-3xl items-center gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border-main)] rounded-lg hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-soft)] hover:scale-105 transition-all duration-200 cursor-pointer group"
      >
        <NuxtImg
          src="/HeaderLogo.png"
          class="w-[76px] h-[76px] object-cover opacity-70 group-hover:opacity-100 transition relative top-1"
        />

        <span
          class="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition"
        >
          {{ value.name }}
        </span>
      </div>
    </div>
  </div>
</template>
