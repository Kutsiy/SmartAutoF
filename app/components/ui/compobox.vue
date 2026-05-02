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
  multiple = false,
} = defineProps<{
  defaultValue?: string;
  options?: any[];
  textSize?: "text-xl" | "text-2xl" | "text-3xl" | "text-4xl";
  multiple?: boolean;
  disable?: boolean;
}>();
</script>

<template>
  <ComboboxRoot
    :disabled="disable"
    class="relative"
    :default-value="defaultValue"
    v-model="model"
    :multiple="multiple"
  >
    <ComboboxAnchor
      :class="textSize"
      class="w-full h-full border-2 border-[var(--border-light)] px-2 py-1 flex items-center justify-between rounded-2xl leading-none bg-[var(--bg-third)] shadow-sm outline-none"
    >
      <div class="flex flex-col" :class="{ 'gap-2': model.length !== 0 }">
        <ComboboxInput
          :class="{ 'text-[var(--text-secondary)]': disable }"
          class="!bg-transparent outline-none h-full selection:bg-grass5 w-full"
          placeholder="Placeholder..."
        />

        <div
          v-if="multiple && Array.isArray(model)"
          class="flex gap-2 flex-wrap"
        >
          <span
            v-for="item in model"
            :key="item"
            class="px-2 py-1 bg-[var(--bg-hover)] rounded"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <ComboboxTrigger>
        <Icon
          :icon="
            !disable
              ? 'radix-icons:chevron-down'
              : 'material-symbols:close-rounded'
          "
          :class="textSize"
        />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent
      class="absolute z-10 w-full mt-2 min-w-[160px] bg-[var(--bg-third)] overflow-hidden rounded-lg shadow-sm border-2 border-[var(--border-accent)]"
    >
      <ComboboxViewport
        class="p-[5px] flex flex-col gap-3 max-h-[300px] scroll-bar overflow-y-auto"
      >
        <ComboboxEmpty class="text-xl font-medium text-center py-2">
          Нічого не знайдено
        </ComboboxEmpty>

        <ComboboxItem
          v-for="option in options"
          :key="option"
          :value="option"
          class="text-xl hover:bg-[var(--bg-hover)] cursor-pointer leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] py-5 relative select-none"
        >
          <span>
            {{ option }}
          </span>
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>

<style scoped>
.scroll-bar {
  scrollbar-color: grey rgba(0, 0, 0, 0);
}
</style>
