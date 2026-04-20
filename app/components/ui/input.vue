<script setup>
const {
  label,
  placeholder,
  type = "text",
  bigText = false,
} = defineProps({
  label: String,
  placeholder: String,
  type: String,
  bigText: Boolean,
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
  <div class="flex flex-col gap-2 text-3xl">
    <label
      v-if="label"
      :for="id"
      class="text-2xl text-[var(--text-secondary)] font-medium"
    >
      {{ label }}
    </label>

    <div
      class="flex items-center rounded-lg border border-[var(--border-main)] bg-[var(--bg-secondary)] focus-within:border-[var(--border-accent)] focus-within:shadow-[var(--shadow-glow)] transition-all duration-200"
    >
      <input
        :type="innerType"
        :placeholder="placeholder"
        :id="id"
        v-model="model"
        class="w-full px-4 py-3 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
        :class="bigText ? 'py-4' : ''"
        @input="onInput"
      />

      <span
        v-if="passwordType"
        class="cursor-pointer p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
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
