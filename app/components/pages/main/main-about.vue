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
  <div class="container mx-auto px-12">
    <div
      class="bg-[var(--bg-secondary)] rounded-2xl p-8 my-6 shadow-lg shadow-black/30 border border-[var(--border-main)]"
      v-gsap.whenVisible.from.once="{ opacity: 0, y: 64 }"
    >
      <div class="flex flex-col gap-6">
        <!-- TITLE -->
        <div class="text-6xl">Про нас:</div>

        <!-- CONTENT -->
        <div
          :class="[
            'relative overflow-hidden flex flex-col gap-6 px-2 py-1 text-3xl leading-[1.6] transition-all duration-500 ease-in-out',
            isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-32 opacity-90 grad',
          ]"
        >
          <!-- TEXT -->
          <p>
            Мережа
            <span class="font-bold text-[var(--text-important)]">
              SmartAuto
            </span>
            — це
            <span class="font-semibold">надійний автосервіс</span> для підтримки
            та ремонту автомобілів різних марок.
          </p>

          <p>
            Наше СТО в Києві — це
            <span class="font-semibold">висококваліфікований сервіс</span>, що
            спеціалізується на
            <span class="font-medium">
              діагностиці, обслуговуванні та ремонті
            </span>
            автомобілів будь-якої складності.
          </p>

          <!-- BLOCK -->
          <div
            class="flex flex-col gap-2 border-l-2 border-[var(--bg-accent)] pl-4 transition-all duration-300 hover:bg-[var(--bg-secondary-hover)] rounded-lg"
          >
            <h3 class="text-4xl font-bold">Наша команда</h3>
            <p>
              Ми пишаємося
              <span class="font-semibold">професіоналізмом наших майстрів</span
              >. Механіки, електрики та діагности мають глибокі знання, тому
              <span class="text-[var(--text-important)] font-semibold">
                ваш автомобіль у надійних руках </span
              >.
            </p>
          </div>

          <!-- BLOCK -->
          <div
            class="flex flex-col gap-2 border-l-2 border-[var(--bg-accent)] pl-4 transition-all duration-300 hover:bg-[var(--bg-secondary-hover)] rounded-lg"
          >
            <h3 class="text-4xl font-bold">Все, що потрібно для вашого авто</h3>

            <p>
              Ми пропонуємо
              <span class="font-semibold">повний спектр послуг</span>:
            </p>

            <ul
              class="list-disc list-inside text-[var(--text-secondary)] space-y-1"
            >
              <li>ремонт двигуна</li>
              <li>обслуговування підвіски</li>
              <li>гальмівна система</li>
              <li>автоелектрика</li>
              <li>комплексна діагностика</li>
            </ul>

            <p>
              Використовуємо лише
              <span class="font-semibold">сертифіковані запчастини</span>
              та сучасні технології.
            </p>
          </div>

          <!-- BLOCK -->
          <div
            class="flex flex-col gap-2 border-l-2 border-[var(--bg-accent)] pl-4 transition-all duration-300 hover:bg-[var(--bg-secondary-hover)] rounded-lg"
          >
            <h3 class="text-4xl font-bold">Технічне обслуговування</h3>

            <p>
              Ми забезпечуємо
              <span class="font-semibold">повний догляд</span> за авто:
            </p>

            <ul class="list-disc list-inside space-y-1">
              <li>заміна мастила та фільтрів</li>
              <li>свічки запалювання</li>
              <li>регулювання ходової</li>
              <li>балансування та розвал-сходження</li>
            </ul>

            <p>
              Це напряму впливає на
              <span class="text-[var(--text-important)] font-semibold">
                безпеку та комфорт </span
              >.
            </p>
          </div>

          <p>
            Наше обладнання відповідає
            <span class="font-semibold">сучасним стандартам</span>, що дозволяє
            виконувати точну діагностику та якісний ремонт.
          </p>

          <p>
            Ми працюємо
            <span class="font-semibold">швидко та ефективно</span>, адже цінуємо
            ваш час. Завжди готові надати консультацію та рекомендації.
          </p>

          <!-- BLOCK -->
          <div
            class="flex flex-col gap-2 border-l-2 border-[var(--bg-accent)] pl-4 transition-all duration-300 hover:bg-[var(--bg-secondary-hover)] rounded-lg"
          >
            <h3 class="text-4xl font-bold">Чому обирають нас</h3>

            <p class="text-[var(--text-secondary)]">
              Нас знаходять за запитами:
              <span class="font-medium">
                СТО Київ, автосервіс Київ, ремонт двигуна, діагностика авто </span
              >.
            </p>

            <p>
              Ми —
              <span class="text-[var(--text-important)] font-semibold">
                надійний сервіс </span
              >, якому довіряють клієнти.
            </p>
          </div>

          <!-- CTA -->
          <p class="text-white font-medium">
            Запишіться на сервіс у SmartAuto вже сьогодні та переконайтеся в
            якості нашої роботи.
          </p>
        </div>

        <!-- BUTTON -->
        <div class="flex justify-center pt-2">
          <button
            @click="toggle"
            class="text-3xl transition-all duration-300 bg-[var(--bg-accent)] px-4 py-2 rounded-xl text-[var(--text-black)] hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 active:scale-95"
          >
            {{ isOpen ? "▲ Приховати" : "▼ Читати далі" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grad::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 80px;

  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(26, 26, 26, 0.6) 60%,
    rgba(26, 26, 26, 0.95) 100%
  );
}
</style>
