<script setup>
import { useUserStore } from "~/store/user.store";

const loading = ref(true);
const isUpdating = ref(false);
const userStore = useUserStore();
const inputValue = ref();

const update = async () => {
  isUpdating.value = !isUpdating.value;
  await useMyFetch("/user/update", {
    method: "PATCH",
    body: {
      name: inputValue.value,
    },
  });
};

const open = () => {
  isUpdating.value = !isUpdating.value;
};

const logout = async () => {
  await useMyFetch("/auth/logout");
  await navigateTo("/");
  userStore.resetAuth();
};

onMounted(async () => {
  try {
    const data = await useMyFetch("/user/my");
    userStore.updateUser({
      userId: data.id,
      userName: data.name,
      userEmail: data.email,
      userPhoneNumber: data.phoneNumber,
    });
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div
      v-if="loading"
      class="basic-back !bg-[var(--bg-main)] !p-4 min-h-[240px] flex flex-col justify-center items-center gap-4 text-4xl font-bold text-[var(--text-secondary)]"
    >
      <Icon
        name="material-symbols:progress-activity-rounded"
        class="w-14 h-14 animate-spin text-[var(--text-important)]"
      />
      <span class="animate-pulse">Завантаження...</span>
    </div>

    <div v-else class="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
      <div
        class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)] flex flex-col gap-6"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div
              class="w-20 h-20 rounded-3xl border border-[var(--border-accent)] bg-[var(--yellow-10)] shadow-[0_0_30px_var(--yellow-20)] flex items-center justify-center"
            >
              <Icon
                name="material-symbols:person-rounded"
                class="w-12 h-12 text-[var(--text-important)]"
              />
            </div>

            <div class="flex flex-col gap-1">
              <div class="text-4xl font-black leading-none">Профіль</div>
              <div class="text-xl text-[var(--text-secondary)]">
                Особиста інформація акаунту
              </div>
            </div>
          </div>

          <button
            @click="open"
            class="px-5 py-3 rounded-2xl border border-[var(--border-accent)] text-2xl font-bold hover:bg-[var(--bg-accent)] hover:text-[var(--text-black)] transition-all hover:scale-[1.03]"
          >
            {{ !isUpdating ? "Редагувати" : "Скасувати" }}
          </button>
        </div>

        <div v-if="!isUpdating" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex items-center gap-4"
          >
            <Icon
              name="material-symbols:badge-outline-rounded"
              class="w-9 h-9 text-[var(--text-important)]"
            />
            <div class="flex flex-col gap-1 min-w-0">
              <div class="text-xl text-[var(--text-secondary)]">Ім’я</div>
              <div class="text-3xl font-bold truncate">
                {{ userStore?.userInfo.userName }}
              </div>
            </div>
          </div>

          <div
            class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex items-center gap-4"
          >
            <Icon
              name="material-symbols:call-outline-rounded"
              class="w-9 h-9 text-[var(--text-important)]"
            />
            <div class="flex flex-col gap-1 min-w-0">
              <div class="text-xl text-[var(--text-secondary)]">Телефон</div>
              <div class="text-3xl font-bold truncate">
                {{ userStore.userInfo.userPhoneNumber || "Не вказано" }}
              </div>
            </div>
          </div>

          <div
            class="md:col-span-2 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex items-center gap-4"
          >
            <Icon
              name="material-symbols:mail-outline-rounded"
              class="w-9 h-9 text-[var(--text-important)]"
            />
            <div class="flex flex-col gap-1 min-w-0">
              <div class="text-xl text-[var(--text-secondary)]">Email</div>
              <div class="text-3xl font-bold truncate">
                {{ userStore.userInfo.userEmail }}
              </div>
            </div>
          </div>
        </div>

        <form v-else class="grid grid-cols-1 gap-5" @submit.prevent="update">
          <div class="grid gap-2">
            <UiInput
              label="Нове ім’я"
              placeholder="Введіть нове ім’я"
              icon-name="material-symbols:badge-outline-rounded"
              v-model:model-value="inputValue"
              big-text
            />
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              class="flex-1 px-5 py-4 rounded-2xl bg-[var(--accent-primary)] text-black text-3xl font-black shadow-[0_0_25px_var(--accent-glow)] hover:bg-[var(--accent-hover)] hover:scale-[1.01] transition-all"
            >
              Зберегти
            </button>

            <button
              type="button"
              @click="open"
              class="flex-1 px-5 py-4 rounded-2xl border border-[var(--border-main)] text-3xl font-bold hover:border-[var(--border-accent)] hover:bg-[var(--bg-hover)] transition-all"
            >
              Назад
            </button>
          </div>
        </form>
      </div>

      <div
        class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)] flex flex-col justify-between gap-6"
      >
        <div class="flex flex-col gap-4">
          <div
            class="w-16 h-16 rounded-2xl border border-red-500/40 bg-red-500/10 flex items-center justify-center"
          >
            <Icon
              name="material-symbols:logout-rounded"
              class="w-10 h-10 text-red-400"
            />
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-4xl font-black">Сесія</div>
            <div class="text-xl text-[var(--text-secondary)] leading-relaxed">
              Тут можна завершити поточну сесію та вийти з акаунту.
            </div>
          </div>
        </div>

        <button
          class="w-full px-5 py-4 rounded-2xl border border-red-500/60 bg-red-600 text-3xl font-black text-white cursor-pointer hover:bg-red-500 hover:scale-[1.01] transition-all"
          @click="logout"
        >
          Вийти з акаунту
        </button>
      </div>
    </div>
  </div>
</template>
