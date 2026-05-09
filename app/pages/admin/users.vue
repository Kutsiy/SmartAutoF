<script setup>
import Compobox from "~/components/ui/compobox.vue";
import Input from "~/components/ui/input.vue";
import User from "~/components/ui/user-row.vue";

const debounce = useDebounce();

// State
const isLoading = ref(true);

const users = ref();

const getData = async () => {
  try {
    const data = await useMyFetch("/user/all");
    users.value = data;
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
};

// Search

const searchString = ref();
const selectGroup = ref();

const search = async () => {
  isLoading.value = true;
  const queryString = new URLSearchParams();

  try {
    if (searchString.value) queryString.append("search", searchString.value);

    if (selectGroup.value && !(selectGroup.value === "all"))
      queryString.append(
        "active",
        selectGroup.value === "active" ? true : false,
      );

    const data = await useMyFetch(`/user/search?${queryString}`);
    users.value = data;
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
};

const debouncedSearch = debounce(() => {
  search();
}, 300);

onMounted(async () => {
  await getData();
});
</script>

<template>
  <div class="w-full h-full">
    <div class="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 h-full">
      <div class="flex flex-col gap-6 min-w-0">
        <div
          class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)]"
        >
          <div
            class="flex flex-col lg:flex-row lg:items-end justify-between gap-4"
          >
            <div class="flex flex-col gap-2 flex-1">
              <div class="text-5xl font-black leading-none">Користувачі</div>

              <div class="text-xl text-[var(--text-secondary)]">
                Пошук, перегляд та керування акаунтами
              </div>
            </div>

            <UiButton
              render-as="link"
              text-size="text-2xl"
              to="/admin/user/create"
              class-name="
                min-h-[64px]
                px-6
                !bg-[var(--accent-primary)]
                hover:!bg-[var(--accent-hover)]
                !text-black
                !font-black
                !shadow-[0_0_25px_var(--accent-glow)]
                hover:scale-[1.02]
                !transition-all
              "
            >
              <div class="flex items-center justify-center gap-3">
                <Icon
                  name="material-symbols:person-add-rounded"
                  class="w-7 h-7"
                />

                <span>Створити</span>
              </div>
            </UiButton>
          </div>

          <div class="mt-6">
            <Input
              placeholder="Пошук за ім’ям або email..."
              icon-name="material-symbols:search-rounded"
              v-model="searchString"
              @input="debouncedSearch"
            />
          </div>
        </div>

        <div
          class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)] flex flex-col gap-4 h-full"
        >
          <div
            class="grid grid-cols-4 gap-4 px-4 py-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] text-xl font-bold text-[var(--text-secondary)]"
          >
            <div>Ім’я</div>
            <div>Email</div>
            <div>Ролі</div>
            <div>Статус</div>
          </div>

          <div class="flex-1">
            <template v-if="isLoading">
              <div
                class="min-h-[220px] flex flex-col items-center justify-center gap-4 text-3xl font-bold text-[var(--text-secondary)]"
              >
                <Icon
                  name="material-symbols:progress-activity-rounded"
                  class="w-12 h-12 animate-spin text-[var(--text-important)]"
                />

                <span class="animate-pulse">Завантаження...</span>
              </div>
            </template>

            <template v-else-if="!users.length">
              <div
                class="min-h-[220px] flex flex-col items-center justify-center gap-4 text-center"
              >
                <div
                  class="w-20 h-20 rounded-3xl border border-[var(--border-main)] bg-[var(--bg-secondary)] flex items-center justify-center"
                >
                  <Icon
                    name="material-symbols:person-search-rounded"
                    class="w-12 h-12 text-[var(--text-important)]"
                  />
                </div>

                <div class="text-4xl font-black">Нічого не знайдено</div>

                <div class="text-xl text-[var(--text-secondary)]">
                  Спробуйте змінити пошук або фільтр
                </div>
              </div>
            </template>

            <div v-else class="flex flex-col gap-3">
              <NuxtLink
                v-for="user in users"
                :key="user.id"
                :to="`/admin/user/${user.id}`"
                class="block rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] hover:border-[var(--border-accent)] hover:shadow-[0_0_25px_var(--yellow-20)] hover:scale-[1.005] transition-all overflow-hidden"
              >
                <User
                  :name="user.name"
                  :email="user.email"
                  :roles="user.role"
                  :is-active="user.isActivate"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <aside
        class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)] h-full flex flex-col gap-6"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-16 h-16 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] flex items-center justify-center"
          >
            <Icon
              name="material-symbols:tune-rounded"
              class="w-9 h-9 text-[var(--text-important)]"
            />
          </div>

          <div class="flex flex-col gap-1">
            <div class="text-4xl font-black">Фільтри</div>

            <div class="text-xl text-[var(--text-secondary)]">
              Статус акаунту
            </div>
          </div>
        </div>

        <div
          class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-4"
        >
          <div class="text-2xl font-bold text-[var(--text-important)] mb-4">
            Акаунт користувача
          </div>

          <UiRadioGroup v-model="selectGroup" @update="search" />
        </div>
      </aside>
    </div>
  </div>
</template>
