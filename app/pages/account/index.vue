<script setup>
const user = ref(null);
const loading = ref(true);
const isUpdating = ref(false);

const update = () => {
  isUpdating.value = !isUpdating.value;
};

onMounted(async () => {
  try {
    const data = await useMyFetch("/user/my");
    user.value = data;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="text-4xl pb-2">Сторінка акаунту</div>
    <div
      v-if="loading"
      class="flex justify-center items-center h-40 text-4xl text-gray-400 animate-pulse"
    >
      LOADING...
    </div>
    <div
      v-else
      class="flex flex-col gap-4 text-3xl border-2 pb-2 border-dashed border-[var(--yellow-90)] p-2 rounded-md bg-[var(--bg-secondary)]"
    >
      <div v-if="!isUpdating" class="flex flex-col gap-4">
        <div>Name: {{ user?.name }}</div>
        <div>Phone:</div>
        <div>Email: {{ user?.email }}</div>
      </div>
      <form v-else class="w-[380px]">
        <UiInput placeholder="Name:" />
      </form>
      <div class="flex gap-4">
        <button
          @click="update()"
          class="px-4 py-2 rounded-lg border border-[var(--border-accent)] hover:bg-[var(--bg-hover)] transition"
        >
          {{ !isUpdating ? "Змінити ім`я" : "Назад" }}
        </button>
        <button
          class="w-fit px-4 py-2 border border-[var(--yellow-90)] rounded-md cursor-pointer hover:bg-[var(--bg-hover)]"
          v-if="isUpdating"
        >
          Зберегти
        </button>
      </div>
    </div>
    <div
      class="text-3xl flex flex-col gap-6 px-2 py-4 bg-[var(--bg-secondary)] border-2 border-[var(--border-accent)] rounded-md"
    >
      <button
        class="w-fit px-4 py-2 border border-red-500 bg-red-600 rounded-md cursor-pointer hover:bg-red-500"
      >
        Вийти з акаунту
      </button>
      <button
        class="w-fit px-4 py-2 border border-red-500 bg-red-600 rounded-md cursor-pointer hover:bg-red-500"
      >
        Видалити акаунт
      </button>
    </div>
  </div>
</template>
