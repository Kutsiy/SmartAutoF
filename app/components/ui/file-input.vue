<script setup lang="ts">
import { ref } from "vue";

const file = ref(null);
const preview = defineModel<string | null>({ default: null });
const emit = defineEmits(["fileChange"]);
const { placeholder } = defineProps({
  placeholder: String,
});

const onFileChange = (e: any) => {
  const selected = e.target.files[0];
  if (!selected) return;

  file.value = selected;
  preview.value = URL.createObjectURL(selected);
  emit("fileChange", file.value);
};
</script>

<template>
  <label
    class="flex flex-col gap-3 p-4 rounded-2xl border-2 border-dashed border-[var(--border-main)] bg-[var(--bg-card)] cursor-pointer hover:border-[var(--border-accent)] hover:bg-[var(--bg-hover)] transition"
  >
    <div
      class="w-full h-48 rounded-xl overflow-hidden bg-[var(--bg-secondary)] flex items-center justify-center"
    >
      <NuxtImg
        v-if="preview"
        :src="preview"
        class="w-48 h-48 p-2 object-cover"
      />

      <span v-else class="text-[var(--text-muted)] text-sm">
        Превью з'явиться тут
      </span>
    </div>

    <div class="text-center">
      <p class="text-[var(--text-primary)]">{{ placeholder }}</p>
    </div>

    <UiButton text-size="text-2xl" render-as="div"> Вибрати файл </UiButton>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="onFileChange"
    />
  </label>
</template>
