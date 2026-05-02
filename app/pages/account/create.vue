<script setup lang="ts">
const compoboxValue = ref();

watch(compoboxValue, (val) => {
  console.log(val);
});
</script>

<template>
  <div class="basic-back h-full w-full flex flex-col gap-4">
    <div
      class="text-4xl p-2 rounded-2xl bg-[var(--bg-main)] w-fit font-bold border border-[var(--border-light)]"
    >
      Стоворіть замовлення
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2 text-3xl">
        <div>Виберіть типи роботи</div>
        <UiCompobox multiple v-model="compoboxValue" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2 text-3xl">
          <div>
            Введіть
            <span class="text-[var(--text-important)]">ваш</span> коментар:
          </div>
          <UiTextarea
            :black-bg="true"
            placeholder="Введіть коментар за бажанням..."
          />
        </div>
        <div class="grid grid-rows-auto gap-2">
          <div class="flex flex-col gap-2 text-3xl">
            <div>
              Виберіть дату коли
              <span class="text-[var(--text-important)]">вам</span> зручніше
              потрапити до нас:
            </div>
            <UiCalendar />
          </div>
          <div class="flex flex-col gap-2 text-3xl">
            <div>Виберіть час</div>
            <UiCompobox multiple v-model="compoboxValue" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div
        class="text-3xl px-4 py-2 rounded-2xl bg-[var(--bg-main)] w-fit font-bold border border-[var(--border-accent)]"
      >
        Ітогова ціна:
      </div>
      <UiButton text-size="text-3xl">Створити замовлення</UiButton>
    </div>
  </div>
</template>
