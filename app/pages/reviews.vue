<template>
  <section class="container mx-auto px-6 lg:px-12 py-14">
    <div class="flex flex-col gap-10">
      <!-- TITLE -->
      <div class="flex flex-col gap-4">
        <div
          class="w-fit px-5 py-3 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] text-[var(--text-important)] text-xl font-black"
        >
          SmartAuto Reviews
        </div>

        <div class="text-5xl lg:text-6xl font-black leading-none">
          Відгуки
          <span class="text-[var(--text-important)]"> клієнтів </span>
        </div>

        <div
          class="max-w-[820px] text-2xl lg:text-3xl text-[var(--text-secondary)] leading-relaxed"
        >
          Нам довіряють власники автомобілів, які цінують якість, швидкість та
          професійний підхід.
        </div>
      </div>

      <!-- REVIEWS -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <!-- BIG CARD -->
        <div
          class="relative overflow-hidden rounded-[32px] bg-[var(--bg-accent)] text-black p-8 shadow-[0_0_40px_var(--yellow-20)] flex flex-col justify-between min-h-[340px]"
          v-gsap.whenVisible.once.from="{ opacity: 0, x: -32 }"
        >
          <div
            class="absolute top-0 right-0 w-[220px] h-[220px] rounded-full bg-white/20 blur-[80px] opacity-40"
          />

          <div class="relative flex flex-col gap-6">
            <div class="flex items-center gap-3">
              <Icon
                name="material-symbols:format-quote-rounded"
                class="w-14 h-14"
              />

              <div class="text-4xl font-black">Швидко та без зайвого</div>
            </div>

            <p class="text-3xl leading-relaxed font-medium">
              Замовлення виконали дуже швидко, без тупих затримок. Якість
              реально на рівні.
            </p>
          </div>

          <div class="relative flex items-center gap-4 pt-8">
            <div
              class="w-16 h-16 rounded-2xl bg-black/10 flex items-center justify-center text-3xl font-black"
            >
              О
            </div>

            <div class="flex flex-col">
              <div class="text-2xl font-black">Олександр</div>

              <div class="text-lg opacity-70">Постійний клієнт</div>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDE -->
        <div class="grid grid-cols-1 gap-6">
          <!-- CARD -->
          <div
            class="review-card"
            v-gsap.whenVisible.once.from="{ opacity: 0, x: 32 }"
          >
            <div class="flex flex-col gap-5">
              <div class="flex items-center gap-3">
                <Icon
                  name="material-symbols:star-rounded"
                  class="review-icon"
                />

                <div class="text-4xl font-black">Рекомендую</div>
              </div>

              <p class="review-text">
                Все чітко: написав → зробили → отримав результат. Без нервів і
                зайвих питань.
              </p>
            </div>

            <div class="review-user">— Ірина</div>
          </div>

          <!-- CARD -->
          <div
            class="review-card"
            v-gsap.whenVisible.once.from="{ opacity: 0, x: 32 }"
          >
            <div class="flex flex-col gap-5">
              <div class="flex items-center gap-3">
                <Icon
                  name="material-symbols:verified-rounded"
                  class="review-icon"
                />

                <div class="text-4xl font-black">Професійний підхід</div>
              </div>

              <p class="review-text">
                Видно досвід: все пояснили нормально і зробили без косяків з
                першого разу.
              </p>
            </div>

            <div class="review-user">— Дмитро</div>
          </div>
        </div>

        <!-- FULL WIDTH -->
        <div
          class="xl:col-span-2 relative overflow-hidden rounded-[32px] border border-[var(--border-main)] bg-[rgba(255,255,255,0.03)] backdrop-blur-xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-[0_0_35px_var(--shadow-soft)]"
          v-gsap.whenVisible.once.from="{ opacity: 0, y: 32 }"
        >
          <div
            class="absolute top-0 right-0 w-[260px] h-[260px] rounded-full bg-[var(--yellow-20)] blur-[100px] opacity-20"
          />

          <div class="relative flex flex-col gap-5 max-w-[760px]">
            <div class="flex items-center gap-3">
              <Icon
                name="material-symbols:bolt-rounded"
                class="w-10 h-10 text-[var(--text-important)]"
              />

              <div class="text-4xl font-black">Топ сервіс</div>
            </div>

            <p
              class="text-2xl lg:text-3xl text-[var(--text-secondary)] leading-relaxed"
            >
              Зручно, швидко і без зайвого геморою. Саме так і має працювати
              сучасний автосервіс.
            </p>
          </div>

          <div class="relative flex items-center gap-4">
            <div
              class="w-16 h-16 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] flex items-center justify-center text-3xl font-black text-[var(--text-important)]"
            >
              А
            </div>

            <div class="flex flex-col">
              <div class="text-2xl font-black">Андрій</div>

              <div class="text-lg text-[var(--text-secondary)]">
                Клієнт SmartAuto
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.review-card {
  @apply relative
  overflow-hidden
  rounded-[32px]
  border
  border-[var(--border-main)]
  bg-[rgba(255,255,255,0.03)]
  backdrop-blur-xl
  p-8
  min-h-[240px]
  flex
  flex-col
  justify-between
  gap-8
  shadow-[0_0_30px_var(--shadow-soft)];
}

.review-icon {
  @apply w-10
  h-10
  text-[var(--text-important)];
}

.review-text {
  @apply text-2xl
  lg:text-3xl
  text-[var(--text-secondary)]
  leading-relaxed;
}

.review-user {
  @apply text-2xl
  font-black
  text-[var(--text-important)];
}
</style>
