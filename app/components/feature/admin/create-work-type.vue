<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const {
  updatingData = null,
  serviceDataRaw,
  serviceData,
} = defineProps<{
  updatingData: Record<any, any> | null;
  serviceDataRaw: any[];
  serviceData: any[];
}>();

// Data
const serviceName = ref("");

// Emit
const emit = defineEmits(["setData", "closeUpdate"]);

// State
const dataIsLoading = ref(false);
const mainError = ref("");
const serviceError = ref("");

// Updating

watch(
  () => updatingData,
  (value) => {
    serviceName.value = value?.service.name ? value.service.name : null;
    workTypeName.value = value?.name ? value.name : null;
    workTypeText.value = value?.text ? value.text : null;
    workTypePrice.value = value?.price ? value.price : null;
    workTypeTime.value = value?.duration ? String(value?.duration) : undefined;
  },
);

// FORM START

const { errors, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      workTypeName: z
        .string({
          message: "Це поле обов'язкове",
        })
        .min(4, {
          message: "Повинно бути більше 4 символів",
        })
        .max(40, {
          message: "Повинно бути меньше 40 символів",
        }),
      workTypeText: z
        .string({
          message: "Це поле обов'язкове",
        })
        .min(10, {
          message: "Повинно бути більше 10 символів",
        })
        .max(300, {
          message: "Повинно бути меньше 300 символів",
        }),
      workTypePrice: z
        .string({
          message: "Це поле обов'язкове",
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
          message: "Повинно бути число",
        }),
      workTypeTime: z
        .string({
          message: "Це поле обов'язкове",
        })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
          message: "Повинно бути число",
        }),
    }),
  ),
});

const [workTypeName] = defineField("workTypeName");
const [workTypeText] = defineField("workTypeText");
const [workTypePrice] = defineField("workTypePrice");
const [workTypeTime] = defineField("workTypeTime");

const onSubmit = handleSubmit(async (value) => {
  dataIsLoading.value = true;

  if (!serviceName.value) {
    serviceError.value = "Виберіть сервіс";
    return;
  }

  if (
    updatingData &&
    workTypeName.value === updatingData.name &&
    workTypeText.value === updatingData.text &&
    workTypePrice.value === updatingData.price &&
    workTypeTime.value === updatingData.duration
  ) {
    mainError.value = "Ви нічого не оновили";
    return;
  }

  const serviceId = serviceDataRaw.find((value) => {
    return value.name === serviceName.value;
  }).id;

  try {
    if (updatingData) {
      const data = await useMyFetch(`/work/type/update?id=${updatingData.id}`, {
        method: "PATCH",
        body: {
          name: value.workTypeName,
          text: value.workTypeText,
          price: value.workTypePrice,
          duration: value.workTypeTime,
        },
      });
      emit("setData", data);
    } else {
      const data = await useMyFetch(`/work/type/add?id=${serviceId}`, {
        method: "POST",
        body: {
          name: value.workTypeName,
          text: value.workTypeText,
          price: value.workTypePrice,
          duration: value.workTypeTime,
        },
      });
      emit("setData", data);
    }
  } catch (e: any) {
    mainError.value = e?.data?.detail;
  } finally {
    dataIsLoading.value = false;
    resetForm();
  }
});

// FORM END
</script>

<template>
  <div
    class="border border-[var(--border-main)] rounded-2xl p-4 bg-[var(--bg-main)]"
  >
    <div
      v-if="updatingData"
      class="flex flex-col gap-4 text-[var(--text-important)]"
    >
      <div class="text-3xl">Ви зараз оновлюєте:</div>
      <div class="basic-back mb-4 text-3xl">
        <div class="flex flex-col gap-2">
          <div class="text-[var(--text-important)]">
            Сервіс:
            {{ updatingData.service.name }}
          </div>
          <div>
            <div>
              <span class="text-[var(--text-secondary)]"
                >Назва типу роботи:</span
              >
              {{ updatingData.name }}
            </div>
            <div>
              <span class="text-[var(--text-secondary)]">Короткий опис:</span>
              {{ updatingData.text }}
            </div>
            <div>
              <span class="text-[var(--text-secondary)]">Ціна:</span>
              {{ updatingData.price }}
              <span class="text-[var(--text-important)]">грн</span>
            </div>
            <div>
              <span class="text-[var(--text-secondary)]"
                >Час виконання типу роботи:</span
              >
              {{ updatingData?.duration }}
              <span class="text-[var(--text-important)]">хвилини</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div
        class="felx flex-col gap-2"
        :class="{
          'border border-red-500 rounded-2xl p-2': serviceError,
        }"
      >
        <UiInputError
          :text="serviceError ? serviceError : ''"
          text-size="text-3xl"
        />
        <UiCompobox
          :options="serviceData"
          v-model="serviceName"
          :disable="!!updatingData"
        />
      </div>
      <div
        class="felx flex-col gap-1"
        :class="{
          'border border-red-500 rounded-2xl p-2': errors?.workTypeName,
        }"
      >
        <UiInputError
          :text="errors?.workTypeName ? errors?.workTypeName : ''"
          text-size="text-3xl"
        />
        <UiInput label="Назва типу работи:" v-model="workTypeName" />
      </div>
      <div
        class="flex flex-col gap-1"
        :class="{
          'border border-red-500 rounded-2xl p-2': errors?.workTypeText,
        }"
      >
        <UiInputError
          :text="errors?.workTypeText ? errors?.workTypeText : ''"
          text-size="text-3xl"
        />
        <div class="h-[300px]">
          <UiTextarea
            label="Невеликий опис типу работи:"
            v-model="workTypeText"
          />
        </div>
      </div>
      <div
        class="flex flex-col gap-1"
        :class="{
          'border border-red-500 rounded-2xl p-2': errors?.workTypePrice,
        }"
      >
        <UiInputError
          :text="errors?.workTypePrice ? errors?.workTypePrice : ''"
          text-size="text-3xl"
        />
        <UiInput label="Ціна виконання(в гривнях):" v-model="workTypePrice" />
      </div>
      <div
        class="flex flex-col gap-1"
        :class="{
          'border border-red-500 rounded-2xl p-2': errors?.workTypeTime,
        }"
      >
        <UiInputError
          :text="errors?.workTypeTime ? errors?.workTypeTime : ''"
          text-size="text-3xl"
        />
        <UiInput
          label="Приблизний час виконання(в хвилинах):"
          v-model="workTypeTime"
        />
      </div>
      <div class="flex items-center justify-center text-3xl">
        <div v-if="dataIsLoading" class="animate-pulse basic-back">
          Завантаження...
        </div>
        <div v-if="mainError" class="text-[var(--text-red)] basic-back">
          {{ mainError }}
        </div>
      </div>
      <UiButton text-size="text-3xl">{{
        updatingData ? "Оновити" : "Створити"
      }}</UiButton>
      <UiButton
        @click="
          () => {
            emit('closeUpdate');
            resetForm();
          }
        "
        text-size="text-3xl"
        v-if="updatingData"
        >Відмінити оновлення</UiButton
      >
    </form>
  </div>
</template>
