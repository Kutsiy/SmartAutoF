<script setup>
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useUserStore } from "~/store/user.store";

const userStore = useUserStore();
const mainError = ref("");
const loading = ref(false);

const schema = toTypedSchema(
  z.object({
    email: z
      .string({ message: "Це поле обов'язкове" })
      .email({ message: "Повинна бути email адреса" })
      .nonempty({ message: "Повинно бути більше 2 символів" }),
    password: z
      .string({ message: "Це поле обов'язкове" })
      .nonempty({ message: "Повинно бути більше 6 символів" })
      .min(6, { message: "Повинно бути більше 6 символів" })
      .max(15, { message: "Повинно бути меньше 15 символів" }),
  }),
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (value) => {
  try {
    loading.value = true;
    const data = await useMyFetch("/auth/login", {
      method: "POST",
      body: {
        email: value.email,
        password: value.password,
      },
    });

    if (data.isActivate) {
      await navigateTo("/account");
      userStore.setAuth(
        {
          userId: data.id,
          userName: data.name,
          userEmail: data.email,
          userPhoneNumber: data.phoneNumber,
        },
        true,
      );
    } else {
      await navigateTo("/auth/activate");
    }
  } catch {
    mainError.value =
      "Щось пішло не так, можливо email або пароль не правильний";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <NuxtLayout name="register">
    <form v-if="!loading" class="flex flex-col gap-5" @submit="onSubmit">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <UiInputError :text="mainError" />

          <UiInput
            placeholder="Введіть email"
            label="Електронна пошта:"
            type="email"
            v-model:model-value="email"
          />

          <UiInputError :text="errors.email" />
        </div>

        <div class="flex flex-col gap-1">
          <UiInput
            placeholder="Введіть пароль"
            label="Пароль:"
            type="password"
            v-model:model-value="password"
          />

          <UiInputError :text="errors.password" />
        </div>
      </div>

      <button
        class="w-full min-h-[58px] p-2 font-black text-2xl flex items-center justify-center border-2 border-[var(--yellow-90)] rounded-2xl bg-[var(--yellow-500)] hover:bg-[var(--yellow-600)] hover:scale-[1.01] transition-all text-[var(--text-black)] shadow-[0_0_25px_var(--yellow-20)]"
      >
        Увійти
      </button>
    </form>

    <div
      v-else
      class="flex flex-col items-center justify-center gap-6 w-[650px] h-[550px]"
    >
      <Icon
        name="material-symbols:progress-activity-rounded"
        class="w-20 h-20 animate-spin text-[var(--text-important)]"
      />

      <span
        class="animate-pulse text-5xl font-black text-[var(--text-secondary)]"
      >
        Завантаження...
      </span>
    </div>
  </NuxtLayout>
</template>
