<script setup lang="ts">
import UiCarCanvas from "~/components/ui/car-canvas.vue";
</script>

<template>
  <div class="absolute inset-0 hero-back">
    <NuxtImg
      src="/background.png"
      class="w-full h-full object-cover select-none blur-[7px] grayscale-[25%] scale-105 opacity-40"
      draggable="false"
    />
  </div>

  <div class="relative z-10">
    <div class="container mx-auto px-6 lg:px-12 py-10 lg:py-20">
      <div
        class="grid grid-cols-1 xl:grid-cols-[1fr_1.05fr] gap-10 items-center"
      >
        <div
          class="flex flex-col gap-8"
          v-gsap.whenVisible.once.from="{ opacity: 0, x: -32 }"
        >
          <div
            class="w-fit px-5 py-3 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] text-[var(--text-important)] text-xl font-black shadow-[0_0_30px_var(--yellow-20)]"
          >
            SmartAuto Service
          </div>

          <div class="flex flex-col gap-5">
            <h1
              class="text-6xl/[1.05] lg:text-7xl/[1] font-black tracking-tight"
            >
              Сучасний
              <span class="text-[var(--text-important)]"> автосервіс </span>

              нового покоління
            </h1>

            <div
              class="max-w-[760px] text-2xl lg:text-3xl text-[var(--text-secondary)] leading-relaxed"
            >
              Професійний ремонт, діагностика та обслуговування автомобілів з
              особливим підходом до кожного клієнта.
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/consultation"
              class="min-h-[68px] px-7 rounded-2xl bg-[var(--accent-primary)] text-black text-2xl font-black flex items-center justify-center shadow-[0_0_35px_var(--accent-glow)] hover:scale-[1.03] hover:bg-[var(--accent-hover)] transition-all"
            >
              Отримати консультацію
            </NuxtLink>

            <NuxtLink
              to="/services"
              class="min-h-[68px] px-7 rounded-2xl border border-[var(--border-main)] bg-[rgba(255,255,255,0.04)] backdrop-blur-xl text-2xl font-bold flex items-center justify-center hover:border-[var(--border-accent)] hover:bg-[var(--bg-hover)] transition-all"
            >
              Переглянути послуги
            </NuxtLink>
          </div>

          <div class="grid grid-cols-3 gap-4 pt-4">
            <div class="hero-stat">
              <div class="hero-stat-number">10+</div>
              <div class="hero-stat-text">Років досвіду</div>
            </div>

            <div class="hero-stat">
              <div class="hero-stat-number">500+</div>
              <div class="hero-stat-text">Клієнтів</div>
            </div>

            <div class="hero-stat">
              <div class="hero-stat-number">24/7</div>
              <div class="hero-stat-text">Підтримка</div>
            </div>
          </div>
        </div>

        <div
          class="relative"
          v-gsap.whenVisible.once.from="{ opacity: 0, x: 32 }"
        >
          <div
            class="rounded-[32px] overflow-hidden border border-[var(--border-main)] bg-[rgba(20,20,20,0.72)] backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.45)]"
          >
            <div
              class="h-[62px] px-5 border-b border-[var(--border-main)] flex items-center justify-between bg-[rgba(255,255,255,0.03)]"
            >
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full bg-red-500" />
                <div class="w-3 h-3 rounded-full bg-yellow-400" />
                <div class="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div class="text-lg font-bold text-[var(--text-secondary)]">
                SmartAuto Interactive
              </div>

              <Icon
                name="material-symbols:directions-car-rounded"
                class="w-7 h-7 text-[var(--text-important)]"
              />
            </div>

            <div class="w-full h-[520px] bg-[rgba(0,0,0,0.28)]">
              <UiCarCanvas />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-stat {
  @apply rounded-2xl
  border
  border-[var(--border-main)]
  bg-[var(--bg-secondary)]
  p-5
  flex
  flex-col
  gap-2;
}

.hero-stat-number {
  @apply text-5xl
  text-[var(--text-important)];
}

.hero-stat-text {
  @apply text-xl
  text-[var(--text-secondary)];
}
</style>
