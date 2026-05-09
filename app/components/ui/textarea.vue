<script setup>
const {
  label,
  placeholder,
  type = "text",
  bigText = false,
  smallText = false,
  iconName,
  blackBg = false,
} = defineProps({
  label: String,
  placeholder: String,
  type: String,
  bigText: Boolean,
  smallText: Boolean,
  iconName: String,
  blackBg: Boolean,
});

const id = ref("");
const passwordType = ref(false);
const innerType = ref("");
const emit = defineEmits(["input"]);

onMounted(() => {
  id.value = label + useId();
  passwordType.value = type === "password";
  innerType.value = type;
});

const model = defineModel();

const changePasswordType = (change) => {
  innerType.value = change;
};

const onInput = (payload) => {
  emit("input", payload);
};
</script>

<template>
  <div class="h-full flex flex-col gap-2 text-3xl rounded-2xl">
    <label
      v-if="label"
      :for="id"
      class="text-2xl text-[var(--text-secondary)] font-medium"
    >
      {{ label }}
    </label>

    <div
      :class="{ '!bg-[var(--bg-main)]': blackBg }"
      class="h-full flex items-center rounded-2xl border border-[var(--border-main)] bg-[var(--bg-third)] focus-within:border-[var(--border-accent)] focus-within:shadow-[var(--shadow-glow)] transition-all duration-200"
    >
      <span
        v-if="iconName"
        class="cursor-pointer p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition relative top-1"
      >
        <Icon :name="iconName" class="w-[30px] h-[30px]" />
      </span>
      <textarea
        :type="innerType"
        :placeholder="placeholder"
        :id="id"
        v-model="model"
        class="scroll-bar resize-none h-full w-full px-4 py-3 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
        :class="[bigText ? 'py-4' : '', smallText ? '!py-1' : '']"
        @input="onInput"
      />

      <span
        v-if="passwordType"
        class="cursor-pointer p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition relative top-0.5"
        @mousedown="changePasswordType('text')"
        @mouseup="changePasswordType('password')"
        @mouseleave="changePasswordType('password')"
      >
        <Icon v-if="innerType === 'text'" name="material-symbols:undereye" />
        <Icon v-else name="material-symbols:undereye-outline" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.scroll-bar {
  scrollbar-color: grey rgba(0, 0, 0, 0);
}
</style>
