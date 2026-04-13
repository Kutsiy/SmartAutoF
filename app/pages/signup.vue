<script setup>
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const schema = toTypedSchema(
  z
    .object({
      name: z
        .string()
        .nonempty({ error: "Повинно бути більше 2 символів" })
        .min(2, { error: "Повинно бути більше 2 символів" }),
      email: z
        .email({ error: "Повинна бути email адреса" })
        .nonempty({ error: "Повинно бути більше 2 символів" }),
      password: z
        .string()
        .nonempty({ error: "Повинно бути більше 6 символів" })
        .min(6, { error: "Повинно бути більше 6 символів" })
        .max(15, { error: "Повинно бути меньше 15 символів" }),
      confirm: z
        .string()
        .nonempty({ error: "Повинно бути більше 6 символів" })
        .min(6, { error: "Повинно бути більше 6 символів" })
        .max(15, { error: "Повинно бути меньше 15 символів" }),
    })
    .refine((data) => data.password === data.confirm, {
      error: "Паролі на співпадають",
      path: ["confirm"],
    }),
);

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const [name, nameAttr] = defineField("name");
const [email, emailAttr] = defineField("email");
const [password, passwordAttr] = defineField("password");
const [confirm, confirmAttr] = defineField("confirm");

const onSubmit = handleSubmit((value) => {
  console.log(value);
  const { data } = useBodyFetch("/auth/signup", {
    method: "POST",
    body: {
      name: value.name,
      email: value.email,
      password: value.password,
    },
  });
});
</script>

<template>
  <NuxtLayout name="register">
    <form class="flex flex-col gap-2" @submit="onSubmit">
      <div class="flex flex-col gap-1">
        <UiInput
          placeholder="Name"
          label="Name:"
          v-model:model-value="name"
          v-bind="nameAttr"
        />
        <UiInputError :text="errors.name" />
        <UiInput
          placeholder="Email"
          label="Email:"
          type="email"
          v-model:model-value="email"
          v-bind="emailAttr"
        />
        <UiInputError :text="errors.email" />
        <UiInput
          placeholder="Password"
          label="Password:"
          type="password"
          v-model:model-value="password"
          v-bind="passwordAttr"
        />
        <UiInputError :text="errors.password" />
        <UiInput
          placeholder="Confirm password"
          label="Confirm password:"
          type="password"
          v-model:model-value="confirm"
          v-bind="confirmAttr"
        />
        <UiInputError :text="errors.confirm" />
      </div>
      <button
        class="w-full p-2 font-bold flex items-center justify-center border-2 border-[var(--yellow-90)] rounded-md bg-[var(--yellow-500)] hover:bg-[var(--yellow-600)] transition-colors text-[var(--text-black)]"
      >
        Sign Up
      </button>
    </form>
  </NuxtLayout>
</template>
