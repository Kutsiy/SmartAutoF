<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from "reka-ui";

const model = defineModel({ default: "" });

const {
  defaultValue,
  options = [],
  textSize = "text-3xl",
} = defineProps<{
  defaultValue?: string;
  options?: any[];
  textSize?: "text-xl" | "text-2xl" | "text-3xl" | "text-4xl";
}>();
</script>

<template>
  <ComboboxRoot class="relative" :default-value="defaultValue" v-model="model">
    <ComboboxAnchor
      :class="textSize"
      class="w-full h-full border-2 border-[var(--border-light)] px-2 py-1 flex items-center justify-between rounded-2xl leading-none bg-[var(--bg-third)] shadow-sm outline-none"
    >
      <ComboboxInput
        class="!bg-transparent outline-none h-full selection:bg-grass5 w-full"
        placeholder="Placeholder..."
      />
      <ComboboxTrigger>
        <Icon icon="radix-icons:chevron-down" :class="textSize" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent
      class="absolute z-10 w-full mt-2 min-w-[160px] bg-[var(--bg-third)] overflow-hidden rounded-lg shadow-sm border-2 border-[var(--border-accent)]"
    >
      <ComboboxViewport class="p-[5px] flex flex-col gap-3">
        <ComboboxEmpty class="text-xl font-medium text-center py-2">
          Нічого не знайдено
        </ComboboxEmpty>

        <ComboboxItem
          v-for="option in options"
          :key="option.name"
          :value="option.name"
          class="text-xl hover:bg-[var(--bg-hover)] cursor-pointer leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] py-5 relative select-none"
        >
          <span>
            {{ option.name }}
          </span>
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
