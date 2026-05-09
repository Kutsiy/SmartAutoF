<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z
        .string({
          message: "Це поле обов'язкове",
        })
        .min(2, "Ім’я повинно бути більше 2 символів")
        .max(40, "Ім’я повинно бути меньше 40 символів"),

      email: z
        .string({
          message: "Це поле обов'язкове",
        })
        .email("Введіть коректний email"),

      phone_number: z
        .string({
          message: "Це поле обов'язкове",
        })
        .min(10, "Номер телефону занадто короткий")
        .max(20, "Номер телефону занадто довгий")
        .regex(/^[+]?[0-9\s\-()]+$/, "Некоректний номер телефону"),

      password: z
        .string({
          message: "Це поле обов'язкове",
        })
        .min(6, "Пароль повинен бути більше 6 символів")
        .max(40, "Пароль повинен бути меньше 40 символів"),

      role: z.enum(["USER", "ADMIN"], {
        message: "Ви повинні вибрати роль",
      }),
    }),
  ),
});

const [name] = defineField("name");
const [email] = defineField("email");
const [phone_number] = defineField("phone_number");
const [password] = defineField("password");
const [role] = defineField("role");

const roleOptions = ref(["USER", "ADMIN"]);

const serverError = ref("");
const dataLoading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  serverError.value = "";

  try {
    dataLoading.value = true;

    await useMyFetch("/auth/create", {
      method: "POST",
      body: {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        password: values.password,
        role: values.role,
      },
    });
  } catch (e: any) {
    serverError.value = e?.data?.detail || "Помилка створення користувача";
  } finally {
    dataLoading.value = false;
  }
});
</script>

<template>
  <div class="relative flex flex-col gap-2">
    <div class="basic-back !bg-[var(--bg-main)] !p-4 relative">
      <div class="flex items-center justify-between gap-2">
        <div class="flex flex-col gap-2">
          <div class="text-5xl font-bold leading-none">
            Створити
            <span class="text-[var(--text-important)]"> користувача </span>
          </div>

          <div class="text-xl text-[var(--text-secondary)]">
            Новий акаунт буде доданий в систему
          </div>
        </div>

        <div
          class="hidden md:flex items-center justify-center w-24 h-24 rounded-3xl border border-[var(--border-accent)] bg-[var(--yellow-10)] shadow-[0_0_30px_var(--yellow-20)]"
        >
          <Icon
            name="material-symbols:person-add-rounded"
            class="w-14 h-14 text-[var(--text-important)]"
          />
        </div>
      </div>
    </div>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div
        class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)]"
      >
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5 items-start"
        >
          <div class="grid gap-2 content-start">
            <UiInput
              v-model="name"
              label="Ім’я"
              placeholder="Введіть ім’я"
              icon-name="material-symbols:badge-outline-rounded"
              big-text
            />

            <UiInputError :text="errors.name || ''" text-size="text-2xl" />
          </div>

          <div class="grid gap-2 content-start">
            <UiInput
              v-model="email"
              label="Email"
              placeholder="example@gmail.com"
              icon-name="material-symbols:mail-outline-rounded"
              big-text
            />

            <UiInputError :text="errors.email || ''" text-size="text-2xl" />
          </div>

          <div class="grid gap-2 content-start">
            <UiInput
              v-model="phone_number"
              label="Номер телефону"
              placeholder="+380 99 123 45 67"
              icon-name="material-symbols:call-outline-rounded"
              big-text
            />

            <UiInputError
              :text="errors.phone_number || ''"
              text-size="text-2xl"
            />
          </div>

          <div class="grid gap-2 content-start">
            <UiInput
              v-model="password"
              label="Пароль"
              type="password"
              placeholder="••••••••"
              icon-name="material-symbols:lock-outline-rounded"
              big-text
            />

            <UiInputError :text="errors.password || ''" text-size="text-2xl" />
          </div>

          <div class="grid gap-2 content-start">
            <div class="flex flex-col gap-2">
              <label class="text-2xl text-[var(--text-secondary)]">
                Роль
              </label>

              <div
                class="min-h-[74px] rounded-2xl bg-[var(--bg-secondary)] flex items-center transition-all duration-300"
              >
                <UiCompobox
                  class="w-full"
                  :options="roleOptions"
                  v-model="role"
                />
              </div>
            </div>

            <UiInputError :text="errors.role || ''" text-size="text-2xl" />
          </div>
        </div>
      </div>

      <div
        class="flex items-center justify-center min-h-[70px]"
        v-if="serverError || dataLoading"
      >
        <div
          v-if="serverError"
          class="basic-back text-3xl text-[var(--text-red)] font-bold animate-pulse"
        >
          {{ serverError }}
        </div>

        <div v-else-if="dataLoading" class="basic-back text-3xl font-bold">
          <span class="animate-pulse"> Завантаження... </span>
        </div>
      </div>

      <div
        class="basic-back !bg-[var(--bg-main)] !p-4 border border-[var(--border-main)]"
      >
        <UiButton
          class-name="
            w-full
            !bg-[var(--accent-primary)]
            hover:!bg-[var(--accent-hover)]
            !text-black
            !font-bold
            !shadow-[0_0_30px_var(--accent-glow)]
            hover:scale-[1.01]
            !transition-all
            duration-300
          "
          text-size="text-3xl"
        >
          <div class="flex items-center justify-center gap-3">
            <Icon name="material-symbols:person-add-rounded" class="w-8 h-8" />

            <span>Створити користувача</span>
          </div>
        </UiButton>
      </div>
    </form>
  </div>
</template>
