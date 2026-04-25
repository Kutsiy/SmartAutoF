<script setup lang="ts">
import Appointment from "~/components/ui/appointment.vue";
</script>

<template>
  <div class="text-3xl flex flex-col gap-4">
    <div
      class="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-main)] p-2 flex justify-between gap-10"
    >
      <UiInput
        placeholder="Пошук..."
        class="flex-1 shadow-md shadow-[var(--shadow-strong)]"
        icon-name="material-symbols:search-rounded"
      />
      <button
        class="px-2 py-1 border-2 border-[var(--border-accent)] rounded-2xl hover:bg-[var(--bg-accent)] hover:text-[var(--text-black)]"
      >
        Створити замовлення
      </button>
    </div>
    <div
      class="flex flex-col gap-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-main)] p-2"
    >
      <div
        class="pb-2 border-b-2 border-dashed border-[var(--yellow-90)] text-4xl"
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
</template>

<style scoped>
.scroll-bar {
  scrollbar-color: grey rgba(0, 0, 0, 0);
}
</style>
