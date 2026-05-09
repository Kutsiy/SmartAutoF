<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from "reka-ui";

const radioState = defineModel({ default: "all" });

const emit = defineEmits(["update"]);
</script>

<template>
  <RadioGroupRoot
    v-model="radioState"
    @update:modelValue="emit('update')"
    class="flex flex-col gap-4 text-3xl"
    default-value="default"
    aria-label="View density"
  >
    <div class="flex items-center">
      <RadioGroupItem
        id="r1"
        class="bg-white w-[1.125rem] h-[1.125rem] rounded-full border data-[active=true]:border-stone-700 data-[active=true]:bg-stone-700 dark:data-[active=true]:bg-white shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-stone-700 outline-none cursor-default"
        value="all"
      >
        <RadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-white dark:after:bg-stone-700"
        />
      </RadioGroupItem>
      <label
        class="text-stone-700 dark:text-white leading-none pl-[15px]"
        for="r1"
      >
        Усі
      </label>
    </div>
    <div class="flex items-center">
      <RadioGroupItem
        id="r1"
        class="bg-white w-[1.125rem] h-[1.125rem] rounded-full border data-[active=true]:border-stone-700 data-[active=true]:bg-stone-700 dark:data-[active=true]:bg-white shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-stone-700 outline-none cursor-default"
        value="active"
      >
        <RadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-white dark:after:bg-stone-700"
        />
      </RadioGroupItem>
      <label
        class="text-stone-700 dark:text-white leading-none pl-[15px]"
        for="r1"
      >
        Активований
      </label>
    </div>
    <div class="flex items-center">
      <RadioGroupItem
        id="r3"
        class="bg-white w-[1.125rem] h-[1.125rem] rounded-full border data-[active=true]:border-stone-700 data-[active=true]:bg-stone-700 dark:data-[active=true]:bg-white shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-stone-700 outline-none cursor-default"
        value="inactive"
      >
        <RadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-white dark:after:bg-stone-700"
        />
      </RadioGroupItem>
      <label
        class="text-stone-700 dark:text-white leading-none pl-[15px]"
        for="r3"
      >
        Неактивований
      </label>
    </div>
  </RadioGroupRoot>
</template>
