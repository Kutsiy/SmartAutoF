<template>
  <div
    class="w-full container mx-auto px-12 py-6 flex items-center justify-center"
  >
    <div
      class="px-4 py-4 shadow-lg shadow-[var(--shadow-strong)] border-2 border-[var(--border-main)] rounded-2xl flex flex-col gap-6"
    >
      <div class="text-center text-4xl font-black">
        Подайте заявку на консультацію
      </div>
      <div class="flex flex-col gap-4 items-center justify-center *:w-[500px]">
        <div>
          <UiInput label="Ім'я" />
        </div>
        <div>
          <UiInput label="Ваш номер телефону" />
        </div>
        <div>
          <UiTextarea label="Комментар" />
        </div>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="border border-[var(--border-accent)] px-4 py-2 rounded-2xl text-3xl font-bold hover:bg-[var(--bg-accent)] hover:text-[var(--text-black)] transition-colors"
        >
          Подати заявку
        </button>
      </div>
    </div>
  </div>
</template>
