<script setup lang="ts">
const compoboxValue = ref();

watch(compoboxValue, (val) => {
  console.log(val);
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
        class="hidden md:flex w-20 h-20 rounded-3xl border border-[var(--border-accent)] bg-[var(--yellow-10)] items-center justify-center shadow-[0_0_30px_var(--yellow-20)]"
      >
        <Icon
          name="material-symbols:calendar-add-on-rounded"
          class="w-12 h-12 text-[var(--text-important)]"
        />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <div
          class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-3"
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

          <UiCompobox multiple v-model="compoboxValue" />
        </div>

        <div
          class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-3"
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
              placeholder="Введіть коментар за бажанням..."
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-5">
        <div
          class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-3"
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

          <UiCalendar />
        </div>

        <div
          class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col gap-3"
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

          <UiCompobox multiple v-model="compoboxValue" />
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div
      class="rounded-[28px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
    >
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
          <div class="text-xl text-[var(--text-secondary)]">Ітогова ціна</div>

          <div class="text-4xl font-black">{{ 0 }} грн</div>
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
  </div>
</template>
