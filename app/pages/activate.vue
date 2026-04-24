<script setup>
const value = ref();
const mainError = ref("");

const activateAccount = async () => {
  try {
    await useMyFetch(`/mail/active/?code=${value.value}`);
    await navigateTo("/account");
  } catch (error) {
    setError(error.data.detail);
  }
};

const setError = (error) => {
  mainError.value = error;
};

const moreThanSixError = (payload) => {
  setError(
    payload.target.value.length > 8
      ? "Код активації не може бути більше 8 символів"
      : "",
  );
};
</script>

<template>
  <div
    class="h-[calc(100vh-130px)] container mx-auto px-12 flex justify-center items-center"
  >
    <div
      class="w-[700px] h-[500px] border border-[var(--yellow-90)] flex flex-col items-center justify-center gap-5 rounded-xl"
    >
      <div class="text-3xl">Введіть код активації:</div>
      <div class="w-[400px] flex flex-col gap-2">
        <UiInput
          :big-text="true"
          v-model:model-value="value"
          @input="moreThanSixError"
        />
        <UiInputError :text="mainError" big-font-size="true" />
      </div>
      <button
        class="border border-[var(--yellow-90)] py-4 px-8 text-2xl rounded-2xl hover:bg-[var(--yellow-50)] transition-colors"
        @click="activateAccount"
      >
        Активувати акаунт
      </button>
    </div>
  </div>
</template>
