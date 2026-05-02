<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      serviceName: z
        .string({
          message: "Це поле обов'язкове",
        })
        .min(4, "Повинно бути більше 4 символів"),
      serviceText: z
        .string({
          message: "Це поле обов'язкове",
        })
        .min(8, "Повинно бути більше 8 символів")
        .max(300, "Повинно бути меньше 300 символів"),
    }),
  ),
});

const options = ref();
const rawData = ref<any[]>();

const [serviceName] = defineField("serviceName");
const [serviceText] = defineField("serviceText");
const categoryName = ref();
const imageFile = ref();

const categoryError = ref(false);
const imageError = ref(false);

onMounted(async () => {
  const data = await useMyFetch("/category/all");

  if (Array.isArray(data)) {
    rawData.value = data;
    options.value = data.map((val) => val.name);
  }
});

const onSubmit = handleSubmit(async (values) => {
  if (!categoryName.value) {
    categoryError.value = true;
    return;
  }
  if (!imageFile.value) {
    imageError.value = true;
    return;
  }
  categoryError.value = false;
  imageError.value = false;

  const categoryId = rawData?.value?.find(
    (val) => val.name === categoryName.value,
  ).id;

  const formData = new FormData();
  formData.append("name", values.serviceName);
  formData.append("text", values.serviceText);
  formData.append("file", imageFile.value);

  const data = await useMyFetch(`/service/create/?id=${categoryId}`, {
    method: "POST",
    body: formData,
  });

  console.log(data);
});
</script>

<template>
  <div class="border border-[var(--border-main)] rounded-2xl p-2">
    <div></div>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-2 text-3xl">
        <div>Виберіть категорію, з яким свяжеться сервіс</div>
        <UiInputError
          :text="categoryError ? 'Ви повинні вибрати категорію' : ''"
          text-size="text-3xl"
        />
        <UiCompobox :options="options" v-model="categoryName" />
      </div>
      <UiInputError
        :text="imageError ? 'Ви повинні вибрати зображення' : ''"
        text-size="text-3xl"
      />
      <UiFileInput @file-change="(value) => (imageFile = value)" />
      <UiInputError
        :text="errors.serviceName ? errors.serviceName : ''"
        text-size="text-3xl"
      />
      <UiInput placeholder="Назва сервісу..." v-model="serviceName" />
      <UiInputError
        :text="errors.serviceText ? errors.serviceText : ''"
        text-size="text-3xl"
      />
      <div class="h-[200px]">
        <UiTextarea placeholder="Опис сервісу..." v-model="serviceText" />
      </div>
      <UiButton text-size="text-3xl">Створити</UiButton>
    </form>
  </div>
</template>
