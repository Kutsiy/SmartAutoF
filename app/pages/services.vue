<script setup lang="ts">
const data = ref<any[]>([]);
const isLoading = ref(true);

const config = useRuntimeConfig();

const openedCategories = ref<string[]>([]);
const openedServices = ref<string[]>([]);

onMounted(async () => {
  try {
    const allData = await useMyFetch("/category/all");

    if (Array.isArray(allData)) {
      data.value = allData;
    }
  } finally {
    isLoading.value = false;
  }
});

const toggleCategory = (id: string) => {
  if (openedCategories.value.includes(id)) {
    openedCategories.value = openedCategories.value.filter(
      (item) => item !== id,
    );
  } else {
    openedCategories.value.push(id);
  }
};

const toggleService = (id: string) => {
  if (openedServices.value.includes(id)) {
    openedServices.value = openedServices.value.filter((item) => item !== id);
  } else {
    openedServices.value.push(id);
  }
};

const isCategoryOpen = (id: string) => {
  return openedCategories.value.includes(id);
};

const isServiceOpen = (id: string) => {
  return openedServices.value.includes(id);
};

const getTotalServices = (category: any) => {
  return category.services?.length || 0;
};

const getTotalWorkTypes = (category: any) => {
  return (
    category.services?.reduce((acc: number, service: any) => {
      return acc + (service.work_types?.length || 0);
    }, 0) || 0
  );
};
</script>

<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto px-4 lg:px-12">
      <div class="basic-back mb-10 !p-8">
        <h1 class="text-5xl font-bold uppercase">
          Наші
          <span class="text-[var(--text-important)]">послуги</span>
        </h1>

        <p
          class="mt-5 max-w-5xl text-2xl leading-relaxed text-[var(--text-secondary)]"
        >
          Оберіть категорію та перегляньте доступні сервіси й типи робіт.
        </p>
      </div>

      <div v-if="isLoading" class="space-y-6">
        <div
          v-for="i in 4"
          :key="i"
          class="h-[180px] animate-pulse rounded-[2rem] border border-[var(--border-main)] bg-[var(--bg-card)]"
        />
      </div>

      <div
        v-else-if="!data.length"
        class="rounded-[2rem] border border-[var(--border-main)] bg-[var(--bg-card)] p-16 text-center"
      >
        <h2 class="text-5xl font-bold">Категорії відсутні</h2>

        <p class="mt-4 text-2xl text-[var(--text-secondary)]">
          Наразі немає доступних категорій.
        </p>
      </div>

      <div v-else class="space-y-8">
        <div
          v-for="category in data"
          :key="category.id"
          class="overflow-hidden rounded-[2rem] border border-[var(--border-main)] bg-[var(--bg-card)] transition-all duration-300"
        >
          <div
            class="relative cursor-pointer overflow-hidden"
            @click="toggleCategory(category.id)"
          >
            <div class="absolute inset-0">
              <img
                v-if="category.image_link"
                :src="`${config.public.uploadFileLink}/${category.image_link}`"
                :alt="category.name"
                class="h-full w-full object-cover opacity-30"
              />

              <div
                class="absolute inset-0 bg-gradient-to-r from-[var(--black-950)] via-[var(--black-90)] to-[var(--black-80)]"
              />
            </div>

            <div
              class="relative flex flex-col gap-8 p-8 xl:flex-row xl:items-center xl:justify-between"
            >
              <!-- LEFT -->
              <div class="flex items-center gap-8">
                <div
                  class="flex h-32 w-32 items-center justify-center overflow-hidden rounded-[2rem] border border-[var(--border-light)] bg-[var(--bg-secondary)]"
                >
                  <img
                    v-if="category.image_link"
                    :src="`${config.public.uploadFileLink}/${category.image_link}`"
                    :alt="category.name"
                    class="h-full w-full object-cover"
                  />

                  <div v-else class="text-6xl">⚙️</div>
                </div>

                <div>
                  <h2
                    class="text-5xl font-bold uppercase text-[var(--text-primary)]"
                  >
                    {{ category.name }}
                  </h2>

                  <div class="mt-5 flex flex-wrap gap-4">
                    <div
                      class="rounded-2xl border border-[var(--yellow-30)] bg-[var(--yellow-10)] px-5 py-3"
                    >
                      <span class="text-2xl text-[var(--text-secondary)]">
                        Послуг:
                      </span>

                      <span
                        class="ml-2 text-3xl font-bold text-[var(--text-important)]"
                      >
                        {{ getTotalServices(category) }}
                      </span>
                    </div>

                    <div
                      class="rounded-2xl border border-[var(--yellow-30)] bg-[var(--yellow-10)] px-5 py-3"
                    >
                      <span class="text-2xl text-[var(--text-secondary)]">
                        Робіт:
                      </span>

                      <span
                        class="ml-2 text-3xl font-bold text-[var(--text-important)]"
                      >
                        {{ getTotalWorkTypes(category) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--border-light)] bg-[var(--bg-secondary)] text-5xl transition-transform duration-300"
                :class="{
                  'rotate-180': isCategoryOpen(category.id),
                }"
              >
                <Icon name="material-symbols:keyboard-arrow-down-rounded" />
              </div>
            </div>
          </div>

          <Transition name="fade">
            <div
              v-if="isCategoryOpen(category.id)"
              class="border-t border-[var(--border-main)] p-8"
            >
              <div class="space-y-6">
                <div
                  v-for="service in category.services"
                  :key="service.id"
                  class="overflow-hidden rounded-[2rem] border border-[var(--border-main)] bg-[var(--bg-secondary)]"
                >
                  <div
                    class="flex cursor-pointer items-center justify-between gap-6 p-6 transition-all duration-300 hover:bg-[var(--bg-hover)]"
                    @click="toggleService(service.id)"
                  >
                    <div>
                      <h3 class="text-4xl font-bold">
                        {{ service.name }}
                      </h3>

                      <p class="mt-3 text-2xl text-[var(--text-secondary)]">
                        {{ service.work_types?.length || 0 }}
                        типів робіт
                      </p>
                    </div>

                    <div
                      class="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--yellow-10)] text-4xl text-[var(--text-important)] transition-transform duration-300"
                      :class="{
                        'rotate-180': isServiceOpen(service.id),
                      }"
                    >
                      <Icon
                        name="material-symbols:keyboard-arrow-down-rounded"
                      />
                    </div>
                  </div>

                  <Transition name="fade">
                    <div
                      v-if="isServiceOpen(service.id)"
                      class="border-t border-[var(--border-main)]"
                    >
                      <div class="space-y-4 p-6">
                        <div
                          v-if="!service.work_types.length"
                          class="rounded-[1.5rem] border border-[var(--border-main)] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:border-[var(--border-accent)] text-center text-4xl"
                        >
                          Пусто
                        </div>
                        <div
                          v-else
                          v-for="workType in service.work_types"
                          :key="workType.id"
                          class="rounded-[1.5rem] border border-[var(--border-main)] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:border-[var(--border-accent)]"
                        >
                          <div
                            class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between"
                          >
                            <div>
                              <h4 class="text-3xl font-bold">
                                {{ workType.name }}
                              </h4>

                              <p
                                class="mt-3 max-w-4xl text-2xl leading-relaxed text-[var(--text-secondary)]"
                              >
                                {{ workType.text }}
                              </p>
                            </div>

                            <div class="flex flex-wrap items-center gap-4">
                              <div
                                class="rounded-2xl bg-[var(--yellow-10)] px-5 py-3"
                              >
                                <span
                                  class="text-2xl text-[var(--text-secondary)]"
                                >
                                  Ціна:
                                </span>

                                <span
                                  class="ml-2 text-3xl font-bold text-[var(--text-important)]"
                                >
                                  {{ workType.price }}₴
                                </span>
                              </div>

                              <div
                                class="rounded-2xl bg-[var(--bg-secondary)] px-5 py-3"
                              >
                                <span
                                  class="text-2xl text-[var(--text-secondary)]"
                                >
                                  Час:
                                </span>

                                <span class="ml-2 text-3xl font-bold">
                                  {{ workType.duration }} хв
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s ease;
  overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 3000px;
}
</style>
