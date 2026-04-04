<script setup lang="ts">
import CarCanvas from "~/components/car-canvas.vue";
</script>

<template>
  <div class="w-full h-[100vh] absolute top-0 left-0 overflow-y-hidden">
    <NuxtImg
      src="/background.png"
      class="w-full h-[100vh] object-cover select-none blur-[5px] grayscale-[20%] rotate-180 bg-no-repeat"
      draggable="false"
    />
  </div>
  <div class="w-full h-[calc(100vh-130px)] relative flex justify-center">
    <div class="w-full container mx-auto px-12 z-10 top-0 left-0">
      <div class="w-full h-[calc(100vh-130px)] flex justify-between">
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
            <div class="text-5xl/[60px]">
              - особливий підхід до кожного клієнта
            </div>
          </div>
          <div class="text-3xl text-center">
            Довірте свій комфорт нашим фахівцям! Звертайтеся в наш автосервіс
            прямо зараз!
          </div>
        </div>
        <div
          class="w-[calc((100%/2)-50px)] h-[calc(100vh-130px)] flex flex-col items-center justify-center"
        >
          <div
            class="w-full h-5 p-4 bg-[var(--black-95)] rounded-tr-xl rounded-tl-xl flex items-center justify-end gap-2 *:cursor-pointer canvas-box-shadow"
          >
            <Icon name="mingcute:minimize-fill" />
            <Icon name="mingcute:close-fill" />
          </div>
          <div
            class="w-full h-[500px] bg-[var(--black-80)] rounded-br-xl rounded-bl-xl backdrop-blur-md canvas-box-shadow"
          >
            <CarCanvas />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.canvas-box-shadow {
  box-shadow: 3px 2px 4px 1px var(--black-50);
}
</style>
