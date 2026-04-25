<script setup>
import UiMap from "~/components/ui/map.vue";
</script>

<template>
  <div class="bg-[var(--bg-accent)]">
    <div
      class="w-full container mx-auto p-12"
      v-gsap.whenVisible.once.from="{ opacity: 0, y: 32 }"
    >
      <div class="w-full grid grid-cols-2">
        <div class="flex flex-col text-2xl text-[var(--text-black)] gap-4">
          <div class="flex flex-col gap-2">
            <div class="text-3xl">Адреса:</div>
            <div>Київська обл. с. Нижча Дубечня, вул. Шевченка 5.</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-3xl">Телефони:</div>
            <div>
              <div>+380506231848</div>
              <div>+380667921949</div>
              <div>+380664631139</div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-3xl">Email:</div>
            <div>smartauto@gmail.com</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-3xl">Графік роботи:</div>
            <div>
              <div>Пн-Сб: 09:00 - 18:00</div>
              <div>Нд: 10:00 - 16:00</div>
            </div>
          </div>
        </div>
        <div>
          <UiMap />
        </div>
      </div>
    </div>
  </div>
</template>
