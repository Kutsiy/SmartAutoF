<template>
  <div class="h-[130px] relative">
    <div
      class="fixed container mx-auto px-12 h-[130px] border-b border-b-[var(--border-accent)] text-2xl flex items-center justify-between"
    >
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
        <div class="flex items-center justify-between text-sm">
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
            class="border-2 border-[var(--border-accent)] px-2 py-1.5 cursor-pointer hover:bg-[var(--accent-hover)] hover:text-[var(--text-hover)] font-bold"
          >
            Отримати консультацію
          </div>
        </div>
        <nav class="flex items-center">
          <div
            class="text-[28px] border-2 border-[var(--border-accent)] px-2 py-1.5 cursor-pointer bg-[var(--accent-hover)] text-[var(--text-hover)] font-bold transition-colors"
          >
            Список послуг
          </div>
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
      </div>
    </div>
  </div>
</template>
