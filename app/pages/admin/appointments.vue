<template>
  <div class="flex gap-4 w-full h-full">
    <div class="flex flex-col gap-4 w-full h-full">
      <div class="basic-back grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <UiInput />
        </div>
        <UiButton text-size="text-3xl">Шукати</UiButton>
      </div>

      <div class="basic-back"></div>
    </div>

    <div class="basic-back w-[320px] h-full">
      <div>
        <UiCompobox />
      </div>
    </div>
  </div>
</template>
