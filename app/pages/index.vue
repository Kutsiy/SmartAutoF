<template>
  <div class="w-full h-[100vh] absolute top-0 left-0">
    <NuxtImg
      src="/background.png"
      class="w-full h-[100vh] object-cover select-none blur-[5px] grayscale-[20%] rotate-180 bg-no-repeat"
      draggable="false"
    />
  </div>
  <div class="w-full h-[calc(100vh-130px)] relative flex justify-center">
    <div class="w-full container mx-auto px-12 z-10 top-0 left-0">
      <div class="w-full flex justify-between">
        <div
          class="w-[calc((100%/2)-50px)] h-[calc(100vh-130px)] pb-10 flex flex-col items-center justify-center gap-5"
        >
          <div
            class="py-4 text-5xl font-bold flex flex-col items-center justify-center gap-5 border-b border-dashed border-b-white *:text-center"
          >
            <div>
              Сучасний автосервіс
              <span class="text-[var(--text-important)]">SmartAuto</span>
            </div>
            <div>- особливий підхід до кожного клієнта</div>
          </div>
          <div class="text-3xl text-center">
            Довірте свій комфорт нашим фахівцям! Звертайтеся в наш автосервіс
            прямо зараз!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
