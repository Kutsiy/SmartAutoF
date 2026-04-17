<script setup lang="ts">
import AccountAppointment from "~/components/pages/account-appointment.vue";
</script>

<template>
  <div class="text-3xl flex flex-col gap-4">
    <div
      class="pb-2 border-b-2 border-dashed border-[var(--yellow-90)] text-4xl"
    >
      Ваші замовлення
    </div>
    <div
      class="w-full h-[450px] overflow-y-auto flex flex-col gap-2 pr-2 scroll-bar"
    >
      <AccountAppointment />
      <AccountAppointment />
      <AccountAppointment />
      <AccountAppointment />
      <AccountAppointment />
      <AccountAppointment />
      <AccountAppointment />
      <AccountAppointment />
    </div>
  </div>
</template>

<style scoped>
.scroll-bar {
  scrollbar-color: grey rgba(0, 0, 0, 0);
}
</style>
