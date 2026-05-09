<template>
  <div
    class="relative overflow-hidden flex items-center justify-center px-6 pt-6"
  >
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-[var(--yellow-20)] blur-[140px] opacity-25 pointer-events-none"
    />

    <div
      class="relative z-10 w-full max-w-[820px] rounded-[40px] border border-[var(--border-main)] bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl p-8 lg:p-14 flex flex-col items-center text-center gap-8 shadow-[0_0_50px_var(--shadow-soft)]"
      v-gsap.whenVisible.once.from="{ opacity: 0, y: 40 }"
    >
      <div
        class="rounded-[32px] bg-[var(--yellow-10)] flex items-center justify-center shadow-[0_0_40px_var(--yellow-20)]"
      >
        <Icon
          name="material-symbols:error-rounded"
          class="w-20 h-20 text-[var(--text-important)]"
        />
      </div>

      <div class="flex flex-col gap-4">
        <div
          class="text-[120px] lg:text-[160px] leading-none font-black text-[var(--text-important)] tracking-wider"
        >
          404
        </div>

        <div class="text-4xl lg:text-5xl font-black leading-tight">
          Сторінку не знайдено
        </div>

        <div
          class="max-w-[620px] text-2xl lg:text-3xl text-[var(--text-secondary)] leading-relaxed"
        >
          Можливо сторінка була видалена, переміщена або посилання введено
          неправильно.
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center w-full justify-center">
        <NuxtLink
          to="/"
          class="min-w-[240px] min-h-[64px] px-7 rounded-2xl bg-[var(--accent-primary)] text-black text-2xl font-black flex items-center justify-center gap-3 shadow-[0_0_35px_var(--accent-glow)] hover:bg-[var(--accent-hover)] hover:scale-[1.03] active:scale-[0.98] transition-all"
        >
          <Icon name="material-symbols:home-rounded" class="w-8 h-8" />

          <span>На головну</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
