<script setup>
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useUserStore } from "~/store/user.store";

const userStore = useUserStore();
const mainError = ref("");
const loading = ref(false);

const phoneRegex = new RegExp(
  /^([+]?[\\s0-9]+)?(\\d{3}|[(]?[0-9]+[)])?([-]?[\\s]?[0-9])+$/,
);

const schema = toTypedSchema(
  z
    .object({
      name: z
        .string({ message: "Це поле обов'язкове" })
        .nonempty({ message: "Повинно бути більше 2 символів" })
        .min(2, { message: "Повинно бути більше 2 символів" }),
      email: z
        .string({ message: "Це поле обов'язкове" })
        .email({ message: "Повинна бути email адреса" })
        .nonempty({ message: "Повинно бути більше 2 символів" }),
      phoneNumber: z
        .string({ message: "Це поле обов'язкове" })
        .regex(phoneRegex, "Не вірний номер")
        .nonempty({ message: "Це поле не може бути пустим" }),
      password: z
        .string({ message: "Це поле обов'язкове" })
        .nonempty({ message: "Повинно бути більше 6 символів" })
        .min(6, { message: "Повинно бути більше 6 символів" })
        .max(15, { message: "Повинно бути меньше 15 символів" }),
      confirm: z
        .string({ message: "Це поле обов'язкове" })
        .nonempty({ message: "Повинно бути більше 6 символів" })
        .min(6, { message: "Повинно бути більше 6 символів" })
        .max(15, { message: "Повинно бути меньше 15 символів" }),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Паролі на співпадають",
      path: ["confirmpas"],
    }),
);

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const [name, nameAttr] = defineField("name");
const [email, emailAttr] = defineField("email");
const [phoneNumber] = defineField("phoneNumber");
const [password, passwordAttr] = defineField("password");
const [confirm, confirmAttr] = defineField("confirm");

const onSubmit = handleSubmit(async (value) => {
  try {
    loading.value = true;
    await useMyFetch("/auth/signup", {
      method: "POST",
      body: {
        name: value.name,
        email: value.email,
        password: value.password,
        phone_number: value.phoneNumber,
      },
    });
    userStore.setAuth({
      userId: value?.id,
      userName: value?.name,
      userEmail: value?.email,
      userPhoneNumber: value?.phoneNumber,
    });
    await navigateTo("/auth/activate");
  } catch (error) {
    mainError.value = error.data.detail;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <NuxtLayout name="register">
    <form v-if="!loading" class="flex flex-col gap-5" @submit="onSubmit">
      <div class="flex flex-col gap-2">
        <UiInputError :text="mainError" :big-font-size="true" />

        <div class="flex flex-col gap-1">
          <UiInput
            placeholder="Введіть ім’я"
            label="Ім’я:"
            v-model:model-value="name"
            v-bind="nameAttr"
          />

          <UiInputError :text="errors.name" />
        </div>

        <div class="flex flex-col gap-1">
          <UiInput
            placeholder="Введіть email"
            label="Електронна пошта:"
            type="email"
            v-model:model-value="email"
            v-bind="emailAttr"
          />

          <UiInputError :text="errors.email" />
        </div>

        <div class="flex flex-col gap-1">
          <UiInput
            placeholder="Введіть номер телефону"
            label="Номер телефону:"
            type="phoneNumber"
            v-model="phoneNumber"
          />

          <UiInputError :text="errors.phoneNumber" />
        </div>

        <div class="flex flex-col gap-1">
          <UiInput
            placeholder="Введіть пароль"
            label="Пароль:"
            type="password"
            v-model:model-value="password"
            v-bind="passwordAttr"
          />

          <UiInputError :text="errors.password" />
        </div>

        <div class="flex flex-col gap-1">
          <UiInput
            placeholder="Повторіть пароль"
            label="Підтвердження паролю:"
            type="password"
            v-model:model-value="confirm"
            v-bind="confirmAttr"
          />

          <UiInputError :text="errors.confirm" />
        </div>
      </div>

      <button
        class="w-full min-h-[58px] p-2 font-black text-2xl flex items-center justify-center border-2 border-[var(--yellow-90)] rounded-2xl bg-[var(--yellow-500)] hover:bg-[var(--yellow-600)] hover:scale-[1.01] transition-all text-[var(--text-black)] shadow-[0_0_25px_var(--yellow-20)]"
      >
        Зареєструватися
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
