<template>
  <div
    class="w-full h-[100vh] mt-20 container mx-auto px-12 flex justify-center prices"
  >
    <div class="w-full p-4">
      <div
        class="w-full h-full border-2 border-[var(--yellow-50)] rounded-sm"
        v-gsap.whenVisible.once.from="{ opacity: 0, x: 62 }"
      >
        <div
          class="w-full h-[40px] bg-[var(--black-900)] border-b-2 border-b-[var(--yellow-50)] flex items-center justify-end gap-2 *:cursor-pointer p-2"
        >
          <Icon name="mingcute:minimize-fill" />
          <Icon name="mingcute:close-fill" />
        </div>
        <div class="p-2 bg-[var(--black-50)] backdrop-blur-[5px]">BOB</div>
      </div>
    </div>
  </div>
</template>
