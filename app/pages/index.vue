<template>
  <div class="w-full h-[calc(100vh-130px)] relative flex justify-center">
    <div class="w-full absolute top-0 left-0">
      <NuxtImg
        src="/background.png"
        class="w-full h-[calc(100vh-130px)] object-cover select-none blur-[5px] grayscale-[20%] rotate-180"
        draggable="false"
      />
    </div>

    <div class="w-full container mx-auto px-12 z-10 top-0 left-0">
      <div class="w-full flex justify-between">
        <div
          class="w-[calc(100%/2)] h-[calc(100vh-130px)] pb-10 flex flex-col items-center justify-center gap-5"
        >
          <div
            class="py-4 text-4xl font-bold flex flex-col items-center justify-center gap-5 border-b border-b-white"
          >
            <div>Сучасний автосервіс SmartAuto</div>
            <div>- особливий підхід до кожного клієнта</div>
          </div>
          <div class="text-2xl text-center">
            Довірте свій комфорт нашим фахівцям! Звертайтеся в наш автосервіс
            прямо зараз!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
