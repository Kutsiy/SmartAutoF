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

const { updatingService } = defineProps<{
  updatingService: Record<any, any> | null;
}>();

watch(
  () => updatingService,
  (value) => {
    console.log(value);
    serviceName.value = value?.name;
    serviceText.value = value?.text;
    preview.value = value?.image_link
      ? `${link.value}/${value?.image_link}`
      : "";
    categoryName.value = value?.category?.name;
  },
);

const options = ref();
const rawData = ref<any[]>();

const link = ref("http://localhost:8000/uploads");
const preview = ref();

const [serviceName] = defineField("serviceName");
const [serviceText] = defineField("serviceText");
const categoryName = ref();
const imageFile = ref();

const categoryError = ref(false);
const imageError = ref(false);
const serverError = ref("");

const dataLoading = ref(false);

const emit = defineEmits(["setData", "closeUpdate"]);

onMounted(async () => {
  const data = await useMyFetch("/category/all");

  if (Array.isArray(data)) {
    rawData.value = data;
    options.value = data.map((val) => val.name);
  }
});

const onSubmit = handleSubmit(async (values) => {
  if (!categoryName.value) {
    console.log("value");
    categoryError.value = true;
    return;
  }
  if (!imageFile.value && !updatingService) {
    console.log("value");
    imageError.value = true;
    return;
  }
  categoryError.value = false;
  imageError.value = false;

  const categoryId = rawData?.value?.find(
    (val) => val.name === categoryName.value,
  ).id;
  if (!categoryId) return;

  if (
    updatingService?.name === values.serviceName &&
    updatingService?.text === values.serviceText &&
    !imageFile.value
  ) {
    serverError.value = "Ви нічого не оновили";
    return;
  }

  const formData = new FormData();
  formData.append(
    "name",
    values.serviceName.charAt(0).toUpperCase() + values.serviceName.slice(1),
  );
  formData.append("text", values.serviceText);
  if (imageFile.value) formData.append("file", imageFile.value);

  try {
    dataLoading.value = true;
    if (!updatingService) {
      console.log("not up");
      const data = await useMyFetch(`/service/create?id=${categoryId}`, {
        method: "POST",
        body: formData,
      });
      emit("setData", data);
    } else {
      console.log("up");
      const data = await useMyFetch(
        `/service/update?id=${updatingService.id}`,
        {
          method: "PATCH",
          body: formData,
        },
      );
      emit("setData", data);
    }
  } catch (e: any) {
    serverError.value = e?.data?.detail;
  } finally {
    console.log("ffff");
    dataLoading.value = false;
  }
});
</script>

<template>
  <div class="border border-[var(--border-main)] rounded-2xl p-2">
    <div class="flex flex-col gap-4" v-if="updatingService">
      <div class="text-3xl font-bold text-[var(--text-important)]">
        Ви оновлюєте:
      </div>
      <div class="flex flex-col gap-2 basic-back">
        <div class="text-3xl text-[var(--text-important)]">
          Категорія: {{ updatingService.category.name }}
        </div>
        <div class="grid grid-cols-[auto_1fr] gap-3 items-center">
          <NuxtImg
            :src="`${link}/${updatingService.image_link}`"
            class="h-20 w-20 object-cover rounded-lg border-2 border-[var(--border-accent)]"
          />

          <div
            class="text-4xl flex gap-2 text-[var(--text-secondary)] items-center"
          >
            Сервіс:
            <div class="font-semibold leading-tight text-[var(--text-primary)]">
              {{ updatingService?.name }}
            </div>
          </div>

          <div class="col-span-2 text-3xl flex flex-col gap-2">
            <div class="text-[var(--text-secondary)]">Опис сервісу:</div>
            <div>
              {{ updatingService?.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <form class="flex flex-col gap-4 mt-4" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-2 text-3xl">
        <div>Виберіть категорію, з яким свяжеться сервіс</div>
        <UiInputError
          :text="categoryError ? 'Ви повинні вибрати категорію' : ''"
          text-size="text-3xl"
        />
        <UiCompobox
          :disable="!!updatingService"
          :options="options"
          v-model="categoryName"
        />
      </div>
      <UiInputError
        :text="imageError ? 'Ви повинні вибрати зображення' : ''"
        text-size="text-3xl"
      />
      <UiFileInput
        v-model="preview"
        @file-change="(value) => (imageFile = value)"
        :placeholder="
          updatingService
            ? 'Завантажте оновлене зображення'
            : 'Завантажте зображення'
        "
      />
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
      <div class="flex items-center justify-center">
        <div
          class="basic-back text-3xl text-[var(--text-red)] font-bold"
          v-if="serverError"
        >
          {{ serverError }}
        </div>
        <div v-if="dataLoading" class="basic-back text-3xl font-bold">
          <span class="animate-pulse">Завантаження...</span>
        </div>
      </div>
      <UiButton text-size="text-3xl">{{
        updatingService ? "Оновити" : "Створити"
      }}</UiButton>
      <UiButton
        v-if="updatingService"
        text-size="text-3xl"
        @click="emit('closeUpdate')"
        >Відміна оновлення</UiButton
      >
    </form>
  </div>
</template>
