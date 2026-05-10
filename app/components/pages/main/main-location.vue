<script setup>
import UiMap from "~/components/ui/map.vue";
</script>

<template>
  <section id="contact" class="bg-[var(--bg-accent)] text-[var(--text-black)]">
    <div
      class="container mx-auto px-6 lg:px-12 py-16"
      v-gsap.whenVisible.once.from="{ opacity: 0, y: 32 }"
    >
      <div class="grid grid-cols-2 gap-8">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-3">
            <div class="text-5xl font-black leading-none">Контакти</div>

            <div class="text-2xl opacity-80">
              Зв’яжіться з нами або завітайте за адресою
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              class="rounded-3xl bg-black/10 border border-black/15 p-5 flex gap-4"
            >
              <Icon
                name="material-symbols:location-on-rounded"
                class="w-10 h-10 shrink-0"
              />

              <div class="flex flex-col gap-2">
                <div class="text-3xl font-black">Адреса</div>
                <div class="text-2xl leading-relaxed">
                  Київська обл. с. Нижча Дубечня, вул. Шевченка 5.
                </div>
              </div>
            </div>

            <div
              class="rounded-3xl bg-black/10 border border-black/15 p-5 flex gap-4"
            >
              <Icon
                name="material-symbols:call-rounded"
                class="w-10 h-10 shrink-0"
              />

              <div class="flex flex-col gap-2">
                <div class="text-3xl font-black">Телефони</div>

                <div class="flex flex-col text-2xl leading-relaxed">
                  <a href="tel:+380506231848" class="hover:underline">
                    +380 50 623 18 48
                  </a>
                  <a href="tel:+380667921949" class="hover:underline">
                    +380 66 792 19 49
                  </a>
                  <a href="tel:+380664631139" class="hover:underline">
                    +380 66 463 11 39
                  </a>
                </div>
              </div>
            </div>

            <div
              class="rounded-3xl bg-black/10 border border-black/15 p-5 flex gap-4"
            >
              <Icon
                name="material-symbols:mail-rounded"
                class="w-10 h-10 shrink-0"
              />

              <div class="flex flex-col gap-2">
                <div class="text-3xl font-black">Email</div>
                <a
                  href="mailto:smartauto@gmail.com"
                  class="text-2xl hover:underline break-all"
                >
                  smartauto@gmail.com
                </a>
              </div>
            </div>

            <div
              class="rounded-3xl bg-black/10 border border-black/15 p-5 flex gap-4"
            >
              <Icon
                name="material-symbols:schedule-rounded"
                class="w-10 h-10 shrink-0"
              />

              <div class="flex flex-col gap-2">
                <div class="text-3xl font-black">Графік роботи</div>

                <div class="text-2xl leading-relaxed">
                  <div>Пн-Сб: 09:00 - 18:00</div>
                  <div>Нд: 10:00 - 16:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="rounded-[32px] overflow-hidden border-4 border-black/15 bg-black/10 shadow-2xl min-h-[420px] p-2"
        >
          <UiMap />
        </div>
      </div>
    </div>
  </section>
</template>
