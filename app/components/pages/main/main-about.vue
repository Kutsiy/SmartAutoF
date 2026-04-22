<script setup>
const isOpen = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="container mx-auto px-12 flex flex-col justify-center gap-6 my-6">
    <div class="w-full flex flex-col gap-4">
      <div class="text-6xl">Про нас:</div>
      <div
        :class="
          isOpen
            ? `h-full`
            : `h-32 before:content-[''] shadow-lg shadow-black before:w-full before:absolute before:left-0 before:right-0 before:bottom-0 before:h-12 grad before:shadow-[-5px_0px_40px_black]`
        "
        class="text-3xl overflow-hidden relative flex flex-col gap-4 leading-8"
      >
        <p>
          Мережа
          <span class="font-bold text-[var(--text-important)]">SmartAuto</span>
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

        <div class="flex flex-col gap-2">
          <h3 class="text-4xl font-bold">Наша команда</h3>
          <p>
            Ми пишаємося
            <span class="font-semibold">професіоналізмом наших майстрів</span>.
            Механіки, електрики та діагности мають глибокі знання, тому
            <span class="text-[var(--text-important)] font-semibold">
              ваш автомобіль у надійних руках </span
            >.
          </p>
        </div>

        <div class="flex flex-col gap-2">
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
            <span class="font-semibold"> сертифіковані запчастини </span>
            та сучасні технології.
          </p>
        </div>

        <div class="flex flex-col gap-2">
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

        <div class="flex flex-col gap-2">
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

        <!-- FINAL CTA -->
        <p class="text-white font-medium">
          Запишіться на сервіс у SmartAuto вже сьогодні та переконайтеся в
          якості нашої роботи.
        </p>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <div
        class="text-3xl cursor-pointer hover:scale-110 transition-transform bg-[var(--bg-accent)] px-2 py-1 rounded-md text-[var(--text-black)]"
        @click="open"
      >
        {{ isOpen ? "Приховати" : "Читати далі" }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.grad::before {
  background: #000000;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.9) 40%,
    rgba(0, 0, 0, 0.7) 80%,
    rgba(0, 0, 0, 0.25) 100%
  );
}
</style>
