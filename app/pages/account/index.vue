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
    userStore.updateUser({ userName: data.name, userEmail: data.email });
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      v-if="loading"
      class="flex justify-center items-center h-40 text-4xl text-gray-400 animate-pulse"
    >
      Завантаження...
    </div>
    <div v-else class="grid grid-cols-2 gap-4">
      <div
        class="flex flex-col gap-4 text-3xl pb-2 p-2 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-main)]"
      >
        <div v-if="!isUpdating" class="flex flex-col gap-4">
          <div>Name: {{ userStore?.userInfo.userName }}</div>
          <div>Phone:</div>
          <div>Email: {{ userStore.userInfo.userEmail }}</div>
        </div>
        <form v-else class="w-[380px]">
          <UiInput placeholder="Name:" v-model:model-value="inputValue" />
        </form>
        <div class="flex gap-4">
          <button
            @click="open"
            class="px-4 py-2 rounded-2xl border border-[var(--border-accent)] hover:bg-[var(--bg-hover)] transition"
          >
            {{ !isUpdating ? "Змінити ім`я" : "Назад" }}
          </button>
          <button
            @click="update"
            class="w-fit px-4 py-2 border border-[var(--yellow-90)] rounded-2xl cursor-pointer hover:bg-[var(--bg-hover)]"
            v-if="isUpdating"
          >
            Зберегти
          </button>
        </div>
      </div>

      <div
        class="flex flex-col gap-4 text-3xl pb-2 p-2 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-main)]"
      ></div>
    </div>
    <div
      class="text-3xl flex flex-col gap-6 px-2 py-4 bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-2xl"
    >
      <button
        class="w-fit px-4 py-2 border border-red-500 bg-red-600 rounded-2xl cursor-pointer hover:bg-red-500"
        @click="logout"
      >
        Вийти з акаунту
      </button>
      <button
        class="w-fit px-4 py-2 border border-red-500 bg-red-600 rounded-2xl cursor-pointer hover:bg-red-500"
      >
        Видалити акаунт
      </button>
    </div>
  </div>
</template>
