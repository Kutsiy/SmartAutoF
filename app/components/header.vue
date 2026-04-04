<script setup>
const show = ref(false);
</script>

<template>
  <div class="w-full h-[130px] relative"></div>
  <div
    class="w-full h-[130px] border-b border-b-[var(--border-accent)] backdrop-blur-[10px] z-20 fixed top-0"
  >
    <div class="w-full h-full container mx-auto px-12 relative">
      <div class="w-full h-full text-2xl flex items-center justify-between">
        <div
          class="flex items-center justify-center w-[200px] h-[100px] relative"
        >
          <NuxtImg
            src="/HeaderLogo.png"
            height="120"
            width="200"
            class="absolute top-2"
          />
        </div>

        <div class="flex flex-col text-xl gap-4">
          <div class="flex items-center justify-between text-base">
            <div>
              <div>Консультація спеціаліста</div>
              <div>(066)-463-11-39</div>
            </div>
            <div>
              <div>Графік роботи</div>
              <div>Пн - Сб: 09:00 - 18:00</div>
            </div>
            <div>Київська обл. с. Нижча Дубечня, вул. Шевченка 5.</div>
            <div
              class="text-xl border-2 border-[var(--border-accent)] px-2 py-1.5 cursor-pointer hover:bg-[var(--accent-hover)] hover:text-[var(--text-hover)] font-bold transition-colors"
            >
              Отримати консультацію
            </div>
          </div>
          <nav class="flex items-center relative text-3xl">
            <div
              @mouseenter="show = true"
              @mouseleave="show = false"
              class="rotate text-[28px] border-2 border-[var(--border-accent)] px-2 py-1.5 cursor-pointer bg-[var(--accent-hover)] text-[var(--text-hover)] font-bold transition-colors flex items-center relative"
            >
              Список послуг
              <Icon
                name="radix-icons:caret-down"
                class="relative top-1"
                :class="{ rotated: show }"
              />
              <div class="absolute w-[245px] h-[58px] top-0 left-[-2px]"></div>
            </div>
            <div
              v-if="show"
              @mouseenter="show = true"
              @mouseleave="show = false"
              class="w-full h-[100px] absolute border border-[var(--border-accent)] bg-[var(--bg-main)] top-full mt-2 z-50"
            ></div>
            <div
              class="ml-[1px] cursor-pointer bg-[var(--bg-secondary)] px-2.5 py-2 border-x border-x-[var(--border-main)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              Дігностичні роботи
            </div>
            <div
              class="cursor-pointer bg-[var(--bg-secondary)] px-2.5 py-2 border-r border-r-[var(--border-main)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              Дизель сервіс
            </div>
            <div
              class="cursor-pointer bg-[var(--bg-secondary)] px-2.5 py-2 border-r border-r-[var(--border-main)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              Ремонт вантажівок
            </div>
            <div
              class="cursor-pointer bg-[var(--bg-secondary)] px-2.5 py-2 border-r border-r-[var(--border-main)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              Легковий сервіс
            </div>
          </nav>
          <!-- <HeaderNav /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.rotate > span {
  transition: 0.5s;
}
.rotate:hover > span {
  transition: 0.5s;
  transform: rotate(180deg);
}

.rotated {
  transform: rotate(180deg);
}
</style>
