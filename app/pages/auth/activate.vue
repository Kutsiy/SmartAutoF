<script setup>
import { useUserStore } from "~/store/user.store";

const value = ref();
const mainError = ref("");
const userStore = useUserStore();

const activateAccount = async () => {
  try {
    await useMyFetch(`/mail/active/?code=${value.value}`);
    await navigateTo("/account");
    userStore.setActive();
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
    class="min-h-[calc(100vh-130px)] container mx-auto px-6 lg:px-12 py-10 flex justify-center items-center"
  >
    <div
      class="relative overflow-hidden w-full max-w-[720px] basic-back border border-[var(--border-main)] rounded-[32px] p-6 lg:p-10 flex flex-col items-center justify-center gap-7 text-center shadow-[0_0_40px_var(--shadow-soft)]"
    >
      <div
        class="absolute top-0 right-0 w-[260px] h-[260px] rounded-full bg-[var(--yellow-20)] blur-[100px] opacity-30 pointer-events-none"
      />

      <div
        class="relative w-24 h-24 rounded-3xl border border-[var(--border-accent)] bg-[var(--yellow-10)] flex items-center justify-center shadow-[0_0_30px_var(--yellow-20)]"
      >
        <Icon
          name="material-symbols:verified-user-rounded"
          class="w-14 h-14 text-[var(--text-important)]"
        />
      </div>

      <div class="relative flex flex-col gap-3">
        <div class="text-4xl lg:text-5xl font-black leading-none">
          Активація акаунту
        </div>

        <div class="text-xl lg:text-2xl text-[var(--text-secondary)]">
          Введіть код, який ми надіслали на вашу електронну пошту
        </div>
      </div>

      <div class="relative w-full max-w-[480px] flex flex-col gap-3">
        <UiInput
          :big-text="true"
          v-model:model-value="value"
          placeholder="Введіть код активації..."
          icon-name="material-symbols:key-rounded"
          @input="moreThanSixError"
        />

        <UiInputError :text="mainError" big-font-size="true" />
      </div>

      <button
        class="relative w-full max-w-[480px] min-h-[64px] rounded-2xl bg-[var(--accent-primary)] text-black text-2xl font-black shadow-[0_0_30px_var(--accent-glow)] hover:bg-[var(--accent-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        @click="activateAccount"
      >
        Активувати акаунт
      </button>
    </div>
  </div>
</template>
