<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const { updatingCategory } = defineProps<{
  updatingCategory?: Record<any, any> | null;
}>();

watch(
  () => updatingCategory,
  (val) => {
    preview.value = val?.image_link ? `${link.value}/${val?.image_link}` : "";
    categoryName.value = val?.name ? val?.name : "";
  },
);

const schema = toTypedSchema(
  z.object({
    categoryName: z
      .string({ message: "Поле назви не може бути пустим" })
      .min(4, "Повинно бути більше 4 символів"),
  }),
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const emit = defineEmits(["setValue", "closeUpdate"]);
const [categoryName] = defineField("categoryName");
const isLoading = ref(false);
const errorMessage = ref("");
const isSuccess = ref(false);
const file = ref();
const preview = ref<string | null>(null);
const link = ref("http://localhost:8000/uploads");

const submitFunc = handleSubmit(async (value) => {
  isSuccess.value = false;
  if (!file.value && !preview.value) {
    errorMessage.value = "Зображення не може бути пустим";
    return;
  }

  try {
    if (updatingCategory?.name === value.categoryName && !file.value) {
      errorMessage.value = "Ви нічого не оновили.";
      return;
    }
    const formData = new FormData();
    formData.append(
      "name",
      value.categoryName.charAt(0).toUpperCase() + value.categoryName.slice(1),
    );
    if (file.value) formData.append("file", file.value);
    isLoading.value = true;

    let data;
    if (updatingCategory) {
      data = await useMyFetch(`/category/update?id=${updatingCategory?.id}`, {
        method: "PATCH",
        body: formData,
      });
    } else {
      data = await useMyFetch("/category/create", {
        method: "POST",
        body: formData,
      });
    }
    isSuccess.value = true;
    emit("setValue", data);
    errorMessage.value = "";
  } catch (e: any) {
    errorMessage.value = e?.data?.detail;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <template v-if="updatingCategory">
    <div class="flex flex-col gap-4 py-2">
      <div class="text-4xl">Ви оновлюєте</div>
      <div class="basic-back">
        <div
          :class="[
            'bg-[var(--bg-main)] p-4 text-3xl rounded-2xl flex items-center justify-between',
          ]"
        >
          <div class="flex gap-4 items-center">
            <NuxtImg
              :src="`${link}/${updatingCategory?.image_link}`"
              class="h-20 w-20 object-cover rounded-md border-2 border-[var(--border-accent)]"
            />
            <div>
              <span class="text-[var(--text-secondary)] flex items-center"
                >Назва категорії:</span
              >
              {{ updatingCategory?.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <form @submit.prevent="submitFunc" class="flex flex-col gap-4">
    <div class="w-full flex items-center justify-center">
      <div
        v-if="isLoading"
        class="text-center text-3xl font-bold animate-pulse bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-2xl px-4 py-2"
      >
        Завантаження...
      </div>
      <div
        v-if="isSuccess"
        class="text-center text-3xl font-bold text-[var(--text-success)] bg-[var(--bg-secondary)] border border-[var(--border-main)] rounded-2xl px-4 py-2"
      >
        Категорія успішно {{ updatingCategory ? "оновлена" : "створенна" }}
      </div>
      <UiInputError
        v-if="!(isSuccess || isLoading)"
        :text="errors.categoryName || errorMessage"
        text-size="text-3xl"
      />
    </div>
    <UiFileInput
      v-model="preview"
      @file-change="(value) => (file = value)"
      :placeholder="
        updatingCategory
          ? 'Завантажте оновлене зображення'
          : 'Завантажте зображення'
      "
    />
    <UiInput
      :placeholder="
        updatingCategory
          ? 'Введіть нову назву категорії...'
          : 'Введіть назву категорії...'
      "
      v-model:model-value="categoryName"
    />
    <UiButton text-size="text-4xl">{{
      updatingCategory ? "Оновити" : "Створити"
    }}</UiButton>
    <UiButton
      text-size="text-4xl"
      v-if="updatingCategory"
      @click="$emit('closeUpdate')"
      >Відміна оновлення</UiButton
    >
  </form>
</template>
