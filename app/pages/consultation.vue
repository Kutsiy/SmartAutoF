<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useUserStore } from "~/store/user.store";

const { errors, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z
        .string({
          message: "Це поле обов'язкове",
        })
        .min(2, "Ім’я повинно бути більше 2 символів")
        .max(40, "Ім’я повинно бути меньше 40 символів"),

      phone_number: z
        .string({
          message: "Це поле обов'язкове",
        })
        .min(8, "Номер телефону занадто короткий")
        .max(20, "Номер телефону занадто довгий")
        .regex(/^[+]?[0-9\s\-()]+$/, "Некоректний номер телефону"),

      note: z
        .string()
        .max(300, "Коментар повинен бути меньше 300 символів")
        .optional(),
    }),
  ),
});

const [name] = defineField("name");
const [phone_number] = defineField("phone_number");
const [note] = defineField("note");

const dataLoading = ref(false);
const successMessage = ref("");
const serverError = ref("");

const userStore = useUserStore();

onMounted(() => {
  name.value = userStore.userInfo.userName;
  phone_number.value = userStore.userInfo.userPhoneNumber;
  resetForm({
    values: {
      name: name.value,
      phone_number: phone_number.value,
    },
  });
});

const onSubmit = handleSubmit(async (values) => {
  successMessage.value = "";
  serverError.value = "";

  try {
    dataLoading.value = true;

    const queryString = new URLSearchParams();

    if (userStore.isRegistered && userStore.userInfo.userId) {
      queryString.append("id", userStore.userInfo.userId);
    }
    console.log(userStore.userInfo);

    await useMyFetch(`/consultation/create?${queryString}`, {
      method: "POST",
      body: {
        name: values.name,
        phone_number: values.phone_number,
        note: values.note,
      },
    });

    successMessage.value = "Ваша заявка успішно відправлена!";

    resetForm();
  } catch (e: any) {
    serverError.value = e?.data?.detail || "Помилка при створенні заявки";
  } finally {
    dataLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-6 lg:px-12 pt-6">
      <div class="w-fit">
        <UiButton
          text-size="text-2xl"
          class-name="
            gap-3
            hover:scale-105
            transition-transform
          "
          render-as="link"
          to="/"
        >
          <Icon
            name="material-symbols:arrow-left-alt-rounded"
            class="relative top-[2px]"
          />

          <span>На головну</span>
        </UiButton>
      </div>
    </div>

    <div
      class="container mx-auto px-6 lg:px-12 py-10 flex items-center justify-center"
    >
      <div
        class="w-full max-w-[950px] basic-back border border-[var(--border-main)] shadow-[0_0_40px_var(--shadow-strong)] rounded-[32px] overflow-hidden"
      >
        <div class="grid lg:grid-cols-[420px_1fr]">
          <div
            class="hidden lg:flex flex-col justify-between border-r border-[var(--border-main)] rounded-2xl bg-[var(--bg-accent)] p-8"
          >
            <div class="flex flex-col gap-6">
              <div
                class="w-24 h-24 rounded-3xl flex items-center justify-center bg-[var(--yellow-90)] shadow-[0_0_30px_var(--accent-glow)]"
              >
                <Icon
                  name="material-symbols:support-agent-rounded"
                  class="w-14 h-14 text-black"
                />
              </div>

              <div class="flex flex-col gap-4">
                <div class="text-5xl font-black leading-tight text-black">
                  Консультація
                </div>

                <div class="text-2xl leading-relaxed text-[var(--text-muted)]">
                  Залиште заявку та ми зв’яжемося з вами найближчим часом
                </div>
              </div>
            </div>

            <div
              class="flex items-center gap-4 border border-[var(--border-main)] rounded-2xl p-4 bg-[var(--bg-main)]"
            >
              <Icon
                name="material-symbols:verified-rounded"
                class="w-10 h-10 text-[var(--text-important)]"
              />

              <div class="text-xl">Відповідаємо максимально швидко</div>
            </div>
          </div>

          <div class="p-6 lg:p-10">
            <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
              <div class="flex flex-col gap-2">
                <div class="text-4xl lg:text-5xl font-black leading-none">
                  Подати заявку
                </div>

                <div class="text-xl text-[var(--text-secondary)]">
                  Заповніть форму нижче
                </div>
              </div>

              <div class="grid grid-cols-1 gap-5">
                <div class="grid gap-2">
                  <UiInput
                    v-model="name"
                    label="Ім’я"
                    placeholder="Введіть ваше ім’я"
                    icon-name="material-symbols:badge-outline-rounded"
                    big-text
                  />

                  <UiInputError
                    :text="errors.name || ''"
                    text-size="text-3xl"
                  />
                </div>

                <div class="grid gap-2">
                  <UiInput
                    v-model="phone_number"
                    label="Номер телефону"
                    placeholder="+380 99 123 45 67"
                    icon-name="material-symbols:call-outline-rounded"
                    big-text
                  />

                  <UiInputError
                    :text="errors.phone_number || ''"
                    text-size="text-3xl"
                  />
                </div>

                <div class="grid gap-2">
                  <div class="h-[180px]">
                    <UiTextarea
                      v-model="note"
                      label="Коментар"
                      placeholder="Опишіть ваше питання..."
                    />
                  </div>

                  <div class="flex items-center justify-between">
                    <UiInputError
                      :text="errors.note || ''"
                      text-size="text-2xl"
                    />

                    <div class="text-lg text-[var(--text-secondary)]">
                      {{ note?.length || 0 }}/300
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="serverError || successMessage || dataLoading"
                class="flex items-center justify-center min-h-[70px]"
              >
                <div
                  v-if="serverError"
                  class="basic-back text-2xl font-bold text-[var(--text-red)] animate-pulse"
                >
                  {{ serverError }}
                </div>

                <div
                  v-else-if="successMessage"
                  class="basic-back text-2xl font-bold text-green-400"
                >
                  {{ successMessage }}
                </div>

                <div
                  v-else-if="dataLoading"
                  class="basic-back text-2xl font-bold"
                >
                  <span class="animate-pulse"> Відправка заявки... </span>
                </div>
              </div>

              <UiButton
                class-name="
                  w-full
                  hover:!bg-[var(--accent-hover)]
                  !font-black
                  !shadow-[0_0_30px_var(--accent-glow)]
                  hover:scale-[1.02]
                  !transition-all
                  duration-300
                  min-h-[72px]
                "
                text-size="text-3xl"
              >
                <div class="flex items-center justify-center gap-3">
                  <Icon name="material-symbols:send-rounded" class="w-8 h-8" />

                  <span>Подати заявку</span>
                </div>
              </UiButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
