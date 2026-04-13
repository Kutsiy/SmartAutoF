<script setup>
import { useForm } from "vee-validate";
import z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useUserStore } from "~/store/user.store";

const userStore = useUserStore();
const mainError = ref("");

const schema = toTypedSchema(
  z.object({
    email: z
      .email({ error: "Повинна бути email адреса" })
      .nonempty({ error: "Повинно бути більше 2 символів" }),
    password: z
      .string()
      .nonempty({ error: "Повинно бути більше 6 символів" })
      .min(6, { error: "Повинно бути більше 6 символів" })
      .max(15, { error: "Повинно бути меньше 15 символів" }),
  }),
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (value) => {
  try {
    const data = await useBodyFetch("/auth/login", {
      method: "POST",
      body: {
        email: value.email,
        password: value.password,
      },
    });

    userStore.setAuth({ userName: data.name, userEmail: data.email });

    if (data.isActivate) {
      await navigateTo("/account");
    } else {
      await navigateTo("/activate");
    }
  } catch {
    mainError.value =
      "Щось пішло не так, можливо email або пароль не правильний";
  }
});
</script>

<template>
  <NuxtLayout name="register">
    <form class="flex flex-col gap-4" @submit="onSubmit">
      <div class="flex flex-col gap-1">
        <UiInputError :text="mainError" />
        <UiInput
          placeholder="Email"
          label="Email:"
          type="email"
          v-model:model-value="email"
        />
        <UiInputError :text="errors.email" />
        <UiInput
          placeholder="Password"
          label="Password:"
          type="password"
          v-model:model-value="password"
        />
        <UiInputError :text="errors.password" />
      </div>
      <button
        class="w-full p-2 font-bold flex items-center justify-center border-2 border-[var(--yellow-90)] rounded-md bg-[var(--yellow-500)] hover:bg-[var(--yellow-600)] transition-colors text-[var(--text-black)]"
      >
        Login
      </button>
    </form>
  </NuxtLayout>
</template>
