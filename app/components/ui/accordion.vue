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
  <div class="w-full text-2xl flex flex-col gap-3">
    <button
      type="button"
      class="w-full text-3xl cursor-pointer font-bold flex items-center justify-between gap-4 bg-[var(--bg-main)] border border-[var(--border-accent)] rounded-2xl px-4 py-3 hover:bg-[var(--bg-hover)] transition-all"
      @click="openAccordion"
    >
      <span class="truncate">{{ title }}</span>

      <Icon
        :name="isOpen ? 'ic:twotone-minus' : 'material-symbols:add-2-rounded'"
        class="w-8 h-8 text-[var(--text-important)] shrink-0 transition-transform"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>

    <div
      v-if="isOpen"
      class="flex flex-col gap-3 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-3"
    >
      <template v-if="items?.length">
        <div
          v-for="item in items"
          :key="item.id || item.name"
          class="flex items-center justify-between gap-4 h-[70px] border border-[var(--border-main)] rounded-2xl p-3 bg-[var(--bg-main)] hover:border-[var(--border-accent)] transition-all"
        >
          <NuxtLink
            :to="item.link_name"
            class="min-w-0 truncate hover:text-[var(--text-important)] transition-colors font-bold"
          >
            {{ item.name }}
          </NuxtLink>

          <div
            class="shrink-0 bg-[var(--accent-primary)] text-black px-4 py-2 rounded-2xl font-black"
          >
            {{ item.price }} грн
          </div>
        </div>
      </template>

      <div
        v-else
        class="flex items-center justify-center text-3xl h-[70px] border border-dashed border-[var(--border-main)] rounded-2xl p-4 bg-[var(--bg-main)] text-[var(--text-secondary)]"
      >
        Пусто
      </div>

      <div
        v-if="$slots.default"
        class="flex flex-col gap-3 pt-3 border-t border-[var(--border-main)]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
