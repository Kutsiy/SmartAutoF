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
    <div
      class="text-4xl pb-2 border-b-2 border-dashed border-b-[var(--yellow-90)]"
    >
      Сторінка Акаунта
    </div>
    <div v-if="loading" class="text-4xl text-center font-bold">LOADING...</div>
    <div
      v-else
      class="flex flex-col gap-4 text-3xl border-b-2 pb-2 border-dashed border-b-[var(--yellow-90)]"
    >
      <div v-if="!isUpdating">
        <div>Name: {{ user?.name }}</div>
        <div>Phone:</div>
        <div>Email: {{ user?.email }}</div>
      </div>
      <form v-else class="w-[380px]">
        <UiInput placeholder="Name:" />
      </form>
      <div class="flex gap-4">
        <div
          @click="update()"
          class="w-fit px-4 py-2 border border-[var(--yellow-90)] rounded-md cursor-pointer hover:bg-[var(--yellow-50)]"
        >
          {{ !isUpdating ? "Змінити ім`я" : "Назад" }}
        </div>
        <div
          class="w-fit px-4 py-2 border border-[var(--yellow-90)] rounded-md cursor-pointer hover:bg-[var(--yellow-50)]"
          v-if="isUpdating"
        >
          Зберегти
        </div>
      </div>
    </div>
    <div class="text-3xl flex flex-col gap-4">
      <div
        class="w-fit px-4 py-2 border border-red-500 bg-red-600 rounded-md cursor-pointer hover:bg-red-500"
      >
        Вийти з акаунта
      </div>
      <div
        class="w-fit px-4 py-2 border border-red-500 bg-red-600 rounded-md cursor-pointer hover:bg-red-500"
      >
        Видалити акаунт
      </div>
    </div>
  </div>
</template>
