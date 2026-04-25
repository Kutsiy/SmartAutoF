<template>
  <div
    class="w-full container mx-auto px-12 flex flex-col justify-center prices gap-12"
  >
    <div
      class="w-[500px] h-[60px] bg-[var(--yellow-600)] text-[var(--text-black)] text-4xl flex justify-end items-center px-4 relative rounded-r-2xl before:content-[''] before:bg-[var(--yellow-600)] before:absolute before:w-[10055px] before:h-[60px] before:top-0 before:left-[-10050px] font-bold"
    >
      Ціни на послуги
    </div>
    <div class="w-full mb-10">
      <div
        class="w-full rounded-2xl border border-[var(--border-main)]"
        v-gsap.whenVisible.once.from="{ opacity: 0, x: 62 }"
      >
        <div
          class="w-full h-[40px] bg-[var(--bg-secondary)] border-b-2 border-b-[var(--border-accent)] flex items-center justify-end gap-2 *:cursor-pointer p-2 rounded-t-2xl"
        >
          <Icon name="mingcute:minimize-fill" />
          <Icon name="mingcute:close-fill" />
        </div>
        <div
          class="p-4 bg-[var(--bg-secondary)] backdrop-blur-[5px] grid grid-cols-3 gap-6 rounded-b-2xl"
        >
          <UiAccordion
            title="TITLE"
            :items="[
              { name: 'ITEM', price: 1000 },
              { name: 'ITEM', price: 1000 },
              { name: 'ITEM', price: 1000 },
            ]"
          />
          <UiAccordion title="TITLE" :items="[`Item`]" />
          <UiAccordion title="TITLE" :items="[`Item`]" />
          <UiAccordion title="TITLE" :items="[`Item`]" />
          <UiAccordion title="TITLE" :items="[`Item`]" />
          <UiAccordion title="TITLE" :items="[`Item`]" />
          <UiAccordion title="TITLE" :items="[`Item`]" />
          <UiAccordion title="TITLE" :items="[`Item`]" />
        </div>
      </div>
    </div>
  </div>
</template>
