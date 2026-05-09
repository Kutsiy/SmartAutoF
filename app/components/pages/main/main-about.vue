<script setup>
import { ref, nextTick } from "vue";

const isOpen = ref(false);

const toggle = async () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    await nextTick();
    window.scrollBy({ top: 200, behavior: "smooth" });
  } else {
    await nextTick();
    window.scrollBy({ top: -1600, behavior: "smooth" });
  }
};
</script>

<template>
  <section class="container mx-auto px-6 lg:px-12">
    <div
      class="relative overflow-hidden rounded-[36px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-6 lg:p-10 my-8 shadow-[0_0_40px_var(--shadow-soft)]"
      v-gsap.whenVisible.from.once="{ opacity: 0, y: 64 }"
    >
      <div
        class="absolute top-0 right-0 w-[320px] h-[320px] rounded-full bg-[var(--yellow-20)] blur-[120px] opacity-20 pointer-events-none"
      />

      <div class="relative flex flex-col gap-8">
        <div
          class="flex flex-col xl:flex-row xl:items-end justify-between gap-6"
        >
          <div class="flex flex-col gap-4 max-w-[920px]">
            <div
              class="w-fit px-5 py-3 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] text-[var(--text-important)] text-xl font-black"
            >
              SmartAuto Service
            </div>

            <div class="text-5xl lg:text-6xl font-black leading-none">
              Про
              <span class="text-[var(--text-important)]"> нас </span>
            </div>

            <div
              class="text-2xl lg:text-3xl text-[var(--text-secondary)] leading-relaxed"
            >
              Професійний автосервіс для діагностики, ремонту та обслуговування
              автомобілів будь-якої складності.
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 shrink-0">
            <div class="about-stat">
              <div class="about-stat-number">10+</div>
              <div class="about-stat-text">Років досвіду</div>
            </div>

            <div class="about-stat">
              <div class="about-stat-number">500+</div>
              <div class="about-stat-text">Клієнтів</div>
            </div>

            <div class="about-stat">
              <div class="about-stat-number">24/7</div>
              <div class="about-stat-text">Підтримка</div>
            </div>
          </div>
        </div>

        <div
          :class="[
            'relative overflow-hidden transition-all duration-500 ease-in-out',
            isOpen ? 'max-h-[4000px]' : 'max-h-[540px] about-fade',
          ]"
        >
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div class="about-card">
              <div class="about-card-title">
                <Icon
                  name="material-symbols:garage-home-rounded"
                  class="about-icon"
                />

                <span>SmartAuto</span>
              </div>

              <p>
                Мережа
                <span class="highlight"> SmartAuto </span>
                — це сучасний автосервіс для підтримки та ремонту автомобілів
                різних марок.
              </p>

              <p>
                Ми спеціалізуємося на
                <span class="highlight">
                  діагностиці, обслуговуванні та ремонті
                </span>
                будь-якої складності.
              </p>
            </div>

            <div class="about-card">
              <div class="about-card-title">
                <Icon
                  name="material-symbols:group-rounded"
                  class="about-icon"
                />

                <span>Наша команда</span>
              </div>

              <p>
                Наші механіки, електрики та діагности мають великий досвід
                роботи та глибокі технічні знання.
              </p>

              <p>
                Ваш автомобіль —
                <span class="highlight"> у надійних руках </span>
                професіоналів.
              </p>
            </div>

            <div class="about-card">
              <div class="about-card-title">
                <Icon
                  name="material-symbols:build-rounded"
                  class="about-icon"
                />

                <span>Послуги</span>
              </div>

              <ul class="about-list">
                <li>ремонт двигуна</li>
                <li>обслуговування підвіски</li>
                <li>гальмівна система</li>
                <li>автоелектрика</li>
                <li>комплексна діагностика</li>
              </ul>

              <p>
                Використовуємо тільки
                <span class="highlight"> сертифіковані запчастини </span>.
              </p>
            </div>

            <div class="about-card">
              <div class="about-card-title">
                <Icon
                  name="material-symbols:settings-rounded"
                  class="about-icon"
                />

                <span>Технічне обслуговування</span>
              </div>

              <ul class="about-list">
                <li>заміна мастила та фільтрів</li>
                <li>свічки запалювання</li>
                <li>регулювання ходової</li>
                <li>балансування та розвал-сходження</li>
              </ul>

              <p>
                Це напряму впливає на
                <span class="highlight"> безпеку та комфорт </span>.
              </p>
            </div>

            <div class="about-card xl:col-span-2">
              <div class="about-card-title">
                <Icon
                  name="material-symbols:verified-rounded"
                  class="about-icon"
                />

                <span>Чому обирають нас</span>
              </div>

              <div class="flex flex-col gap-5">
                <p>
                  Наше обладнання відповідає сучасним стандартам, що дозволяє
                  виконувати точну діагностику та якісний ремонт.
                </p>

                <p>
                  Ми працюємо
                  <span class="highlight"> швидко та ефективно </span>, адже
                  цінуємо ваш час.
                </p>

                <p class="text-[var(--text-secondary)]">
                  Нас знаходять за запитами: СТО Київ, автосервіс Київ, ремонт
                  двигуна, діагностика авто.
                </p>

                <div
                  class="rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] p-5 text-2xl lg:text-3xl font-bold"
                >
                  Запишіться на сервіс у
                  <span class="text-[var(--text-important)]"> SmartAuto </span>
                  вже сьогодні.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center pt-2">
          <button
            @click="toggle"
            class="min-h-[64px] px-7 rounded-2xl bg-[var(--accent-primary)] text-black text-2xl font-black shadow-[0_0_25px_var(--accent-glow)] hover:scale-[1.04] hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all"
          >
            {{ isOpen ? "Приховати" : "Читати далі" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-card {
  @apply rounded-[28px]
  border
  border-[var(--border-main)]
  bg-[rgba(255,255,255,0.03)]
  backdrop-blur-xl
  p-6
  flex
  flex-col
  gap-5
  text-2xl
  leading-relaxed;
}

.about-card-title {
  @apply flex
  items-center
  gap-4
  text-4xl
  font-black;
}

.about-icon {
  @apply w-10
  h-10
  text-[var(--text-important)]
  shrink-0;
}

.about-list {
  @apply flex
  flex-col
  gap-2
  text-[var(--text-secondary)]
  list-disc
  pl-6;
}

.highlight {
  @apply font-black
  text-[var(--text-important)];
}

.about-stat {
  @apply rounded-2xl
  border
  border-[var(--border-main)]
  bg-[rgba(255,255,255,0.04)]
  backdrop-blur-xl
  p-4
  flex
  flex-col
  items-center
  justify-center
  text-center
  min-w-[120px];
}

.about-stat-number {
  @apply text-4xl
  font-black
  text-[var(--text-important)];
}

.about-stat-text {
  @apply text-lg
  text-[var(--text-secondary)];
}

.about-fade::before {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 180px;
  z-index: 10;

  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(18, 18, 18, 0.7) 45%,
    rgba(18, 18, 18, 0.98) 100%
  );
}
</style>
