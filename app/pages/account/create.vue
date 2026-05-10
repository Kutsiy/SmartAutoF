<script setup lang="ts">
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useUserStore } from "~/store/user.store";

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      workType: z.array(z.record(z.any()), { message: "Це поле обов'язкове" }),
      note: z
        .string()
        .max(300, { message: "Це поле не може мати більше 300 символів" })
        .optional(),
      date: z.record(z.any(), { message: "Це поле обов'язкове" }),
      time: z.number({ message: "Це поле обов'язкове" }),
    }),
  ),
});

const userStore = useUserStore();

const [workTypeValue] = defineField("workType");
const [noteValue] = defineField("note");
const [dateValue] = defineField("date");
const [timeValue] = defineField("time");

const workTypes = ref<any[]>([]);
const finalPrice = ref<number>(0);
const finalTime = ref<number>(0);
const timesForAppointment = ref<any[]>([]);

const getWorkTypesData = async () => {
  const data = await useMyFetch("/work/type/all");
  if (Array.isArray(data)) {
    workTypes.value = data;
  }
};

watch(errors, (value) => {
  console.log(userStore.userInfo.userId);
  console.log(value);
});

watch(workTypeValue, (val) => {
  if (val) {
    finalPrice.value = val.reduce(
      (acc: number, val: Record<any, any>) => acc + +val.price,
      0,
    );
    finalTime.value = val.reduce(
      (acc: number, val: Record<any, any>) => acc + +val.duration,
      0,
    );
  }
});

watch(dateValue, async (value) => {
  const data = await useMyFetch("/appointment/date", {
    method: "POST",
    body: {
      appointment_date: `${String(value?.year)}-${String(value?.month).padStart(2, "0")}-${String(value?.day).padStart(2, "0")}`,
    },
  });
  if (Array.isArray(data)) timesForAppointment.value = data;
});

onMounted(async () => {
  await getWorkTypesData();
});

const submit = handleSubmit(async (val) => {
  const data = useMyFetch("/appointment/create", {
    method: "POST",
    body: {
      user_id: userStore.userInfo.userId,
      note: val.note,
      work_type_ids: val.workType.map((value) => value.id),
      appointment_time: `${String(val.time).padStart(2, "0")}:00`,
      appointment_date: `${val.date.year}-${String(val.date.month).padStart(2, "0")}-${String(val.date.day).padStart(2, "0")}`,
    },
  });
});
</script>

<template>
  <div
    class="basic-back !p-4 !bg-[var(--bg-main)] h-full w-full flex flex-col gap-6"
  >
    <div class="flex items-center justify-between gap-4">
      <div class="flex flex-col gap-2">
        <div class="text-5xl font-black leading-none">
          Створити
          <span class="text-[var(--text-important)]">замовлення</span>
        </div>

        <div class="text-xl text-[var(--text-secondary)]">
          Оберіть роботи, дату та зручний час візиту
        </div>
      </div>

      <div
        class="flex w-20 h-20 rounded-3xl border border-[var(--border-accent)] bg-[var(--yellow-10)] items-center justify-center shadow-[0_0_30px_var(--yellow-20)]"
      >
        <Icon
          name="material-symbols:calendar-add-on-rounded"
          class="w-12 h-12 text-[var(--text-important)]"
        />
      </div>
    </div>

    <form @submit.prevent="submit" class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <div
            class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-3"
            :class="{ 'border-red-500': errors.workType }"
          >
            <div class="flex items-center gap-3 text-3xl font-black">
              <Icon
                name="material-symbols:build-rounded"
                class="w-9 h-9 text-[var(--text-important)]"
              />
              <span>Типи роботи</span>
            </div>

            <div class="text-xl text-[var(--text-secondary)]">
              Можна вибрати декілька робіт одразу
            </div>

            <UiCompobox multiple v-model="workTypeValue" :options="workTypes">
              <template #multiply="{ item }">
                <div class="flex gap-2 items-center">
                  {{ item.name }}
                  <span
                    class="bg-[var(--accent-primary)] rounded-md p-2 shadow-sm shadow-[var(--shadow-glow)] text-black"
                    >{{ item.price }} ГРН</span
                  >
                </div>
              </template>
              <template #item="{ option }">
                <div
                  v-if="option"
                  class="w-full flex justify-between items-center"
                >
                  <div class="text-2xl">{{ option.name }}</div>
                  <div
                    class="p-2 bg-[var(--accent-primary)] shadow-sm shadow-[var(--shadow-glow)] rounded-md text-black"
                  >
                    {{ option.price }} ГРН
                  </div>
                </div>
                <div v-else>Пусте значення</div>
              </template>
            </UiCompobox>
            <UiInputError
              :text="errors.workType ? errors.workType : ''"
              text-size="text-3xl"
            />
          </div>

          <div
            class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-3"
            :class="{ 'border-red-500': errors.note }"
          >
            <div class="flex items-center gap-3 text-3xl font-black">
              <Icon
                name="material-symbols:chat-rounded"
                class="w-9 h-9 text-[var(--text-important)]"
              />
              <span>Коментар</span>
            </div>

            <div class="text-xl text-[var(--text-secondary)]">
              Опишіть проблему або додаткові побажання
            </div>

            <div class="h-[220px]">
              <UiTextarea
                :black-bg="true"
                v-model="noteValue"
                placeholder="Введіть коментар за бажанням..."
              />
            </div>
            <UiInputError
              :text="errors.note ? errors.note : ''"
              text-size="text-3xl"
            />
          </div>
        </div>

        <div class="flex flex-col gap-5">
          <div
            class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-3"
            :class="{ 'border-red-500': errors.date }"
          >
            <div class="flex items-center gap-3 text-3xl font-black">
              <Icon
                name="material-symbols:calendar-month-rounded"
                class="w-9 h-9 text-[var(--text-important)]"
              />
              <span>Дата візиту</span>
            </div>

            <div class="text-xl text-[var(--text-secondary)]">
              Оберіть день, коли вам зручно приїхати
            </div>

            <UiCalendar v-model="dateValue" />
            <UiInputError
              :text="errors.date ? errors.date : ''"
              text-size="text-3xl"
            />
          </div>

          <div
            class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-3"
            :class="{ 'border-red-500': errors.time }"
          >
            <div class="flex items-center gap-3 text-3xl font-black">
              <Icon
                name="material-symbols:schedule-rounded"
                class="w-9 h-9 text-[var(--text-important)]"
              />
              <span>Час</span>
            </div>

            <div class="text-xl text-[var(--text-secondary)]">
              Оберіть зручний час запису
            </div>

            <UiCompobox :options="timesForAppointment" v-model="timeValue" />
            <UiInputError
              :text="errors.time ? errors.time : ''"
              text-size="text-3xl"
            />
          </div>
        </div>
      </div>

      <div
        class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex items-center justify-between gap-4"
      >
        <div class="felx gap-4">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] flex items-center justify-center"
              >
                <Icon
                  name="solar:dollar-bold"
                  class="w-9 h-9 text-[var(--text-important)]"
                />
              </div>

              <div class="flex flex-col gap-1">
                <div class="text-xl text-[var(--text-secondary)]">
                  Ітогова ціна
                </div>

                <div class="text-4xl font-black">{{ finalPrice }} грн</div>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] flex items-center justify-center"
              >
                <Icon
                  name="material-symbols:alarm"
                  class="w-9 h-9 text-[var(--text-important)]"
                />
              </div>

              <div class="flex flex-col gap-1">
                <div class="text-xl text-[var(--text-secondary)]">
                  Ітоговий час
                </div>

                <div class="text-4xl font-black">{{ finalTime }} хвилин</div>
              </div>
            </div>
          </div>
        </div>
        <UiButton
          text-size="text-3xl"
          class-name="
          min-h-[68px]
          px-8
          !bg-[var(--accent-primary)]
          hover:!bg-[var(--accent-hover)]
          !text-black
          !font-black
          !shadow-[0_0_30px_var(--accent-glow)]
          hover:scale-[1.02]
          !transition-all
        "
        >
          <div class="flex items-center justify-center gap-3">
            <Icon name="material-symbols:add-task-rounded" class="w-8 h-8" />
            <span>Створити замовлення</span>
          </div>
        </UiButton>
      </div>
    </form>
  </div>
</template>
