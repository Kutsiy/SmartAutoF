<script setup lang="ts">
import Appointment from "~/components/ui/appointment.vue";
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="text-3xl flex flex-col gap-4 col-span-3">
      <div
        class="p-2 grid grid-cols-3 gap-4 border border-[var(--border-main)] rounded-2xl bg-[var(--bg-secondary)]"
      >
        <div class="col-span-2">
          <UiInput
            placeholder="Пошук..."
            class="flex-1 shadow-md shadow-[var(--shadow-strong)]"
            icon-name="material-symbols:search-rounded"
          />
        </div>
        <UiButton text-size="text-3xl"> Створити замовлення </UiButton>
      </div>
      <div
        class="flex flex-col gap-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-main)] p-4"
      >
        <div
          class="pb-2 border-b-2 border-dashed border-[var(--yellow-90)] text-5xl"
        >
          Ваші замовлення
        </div>
        <div
          class="w-full h-[450px] overflow-y-auto flex flex-col gap-4 pr-2 scroll-bar"
        >
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
          <Appointment />
        </div>
      </div>
    </div>

    <div
      class="bg-[var(--bg-secondary)] border border-[var(--border-main)] p-2 rounded-2xl *:h-16"
    >
      <UiCompobox :options="[]" />
    </div>
  </div>
</template>

<style scoped>
.scroll-bar {
  scrollbar-color: grey rgba(0, 0, 0, 0);
}
</style>
