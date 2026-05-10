<script setup>
const listIsOpen = ref(false);
const listItem = ref("Оберіть зі списку");
const categories = ref();
const service = ref([]);

onMounted(async () => {
  const data = await useMyFetch("/category/all");
  categories.value = [null, ...data];
});

watch(listItem, async (val) => {
  if (val === "Оберіть зі списку") return;
  const category = categories.value.find((value) => value?.name === val);
  service.value = await useMyFetch(`/service/category/?id=${category?.id}`);
});

const changeListItem = (item) => {
  if (!item) {
    listItem.value = "Оберіть зі списку";
    service.value = [];
    return;
  }
  const category = categories.value.find((val) => val?.name === item);
  listItem.value = category?.name;
};
</script>

<template>
  <section class="container mx-auto px-6 lg:px-12 py-14 flex flex-col gap-10">
    <div
      class="flex flex-col xl:flex-row xl:items-center justify-between gap-6"
    >
      <div
        class="relative w-fit min-h-[72px] pr-8 pl-6 rounded-r-[28px] bg-[var(--accent-primary)] text-black text-4xl lg:text-5xl font-black flex items-center gap-3 shadow-[0_0_35px_var(--accent-glow)] before:content-[''] before:absolute before:right-full before:top-0 before:h-full before:w-[100vw] before:bg-[var(--accent-primary)]"
      >
        <Icon
          name="ic:twotone-miscellaneous-services"
          class="relative top-0.5"
        />
        <span>Наші сервіси</span>
      </div>

      <div class="relative w-full xl:w-[360px]">
        <button
          type="button"
          @click="listIsOpen = !listIsOpen"
          class="w-full min-h-[64px] flex items-center justify-between gap-3 text-2xl font-bold px-5 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] hover:border-[var(--border-accent)] hover:bg-[var(--bg-hover)] transition-all"
        >
          <span class="truncate">{{ listItem }}</span>

          <Icon
            name="radix-icons:caret-down"
            class="w-7 h-7 text-[var(--text-important)] transition-transform shrink-0"
            :class="{ 'rotate-180': listIsOpen }"
          />
        </button>

        <div
          v-if="listIsOpen"
          class="absolute top-[calc(100%+10px)] left-0 w-full flex flex-col gap-1 bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-2xl p-2 shadow-[0_0_35px_var(--shadow-soft)] z-50 max-h-[320px] overflow-y-auto"
        >
          <button
            v-for="value in categories"
            type="button"
            @click="changeListItem(value?.name ? value?.name : null)"
            class="z-10 w-full text-left px-4 py-3 rounded-xl text-2xl font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
          >
            {{ value?.name ? value?.name : "Пусте значення" }}
          </button>
        </div>
      </div>
    </div>

    <div
      class="relative overflow-hidden rounded-[32px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4 lg:p-6 shadow-[0_0_40px_var(--shadow-soft)]"
      v-gsap.whenVisible.from.once="{ opacity: 0, x: -32 }"
    >
      <template v-if="service.length !== 0">
        <div
          class="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          <div
            v-for="value in service"
            :key="value.id || value.name"
            class="group min-h-[120px] flex items-center gap-4 p-4 rounded-3xl border border-[var(--border-main)] bg-[rgba(255,255,255,0.03)] hover:border-[var(--border-accent)] hover:shadow-[0_0_30px_var(--yellow-20)] hover:scale-[1.02] transition-all cursor-pointer"
          >
            <NuxtImg
              :src="`http://localhost:8000/uploads/${value.image_link}`"
              class="w-[82px] h-[82px] object-cover rounded-2xl border border-[var(--border-main)] opacity-80 group-hover:opacity-100 group-hover:border-[var(--border-accent)] transition-all shrink-0"
            />

            <div class="flex flex-col gap-2 min-w-0">
              <span
                class="text-3xl font-black leading-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors truncate"
              >
                {{ value?.name }}
              </span>

              <span class="text-lg text-[var(--text-secondary)]">
                Переглянути послугу
              </span>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          class="relative min-h-[260px] flex flex-col items-center justify-center gap-4 text-center"
        >
          <Icon
            name="material-symbols:search-off-rounded"
            class="w-20 h-20 text-[var(--text-important)]"
          />

          <div class="text-5xl font-black">Ви нічого не обрали</div>

          <div class="text-2xl text-[var(--text-secondary)]">
            Оберіть категорію зі списку вище
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
