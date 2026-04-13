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
  <div class="flex flex-col gap-2">
    <div :class="{ 'flex gap-2 items-center': passwordType }">
      <label v-if="label" :for="id" class="text-xl">{{ label }}</label>
      <span
        v-if="passwordType"
        class="text-3xl cursor-pointer relative top-[2px]"
        @mousedown="changePasswordType('text')"
        @mouseup="changePasswordType('password')"
        @mouseleave="changePasswordType('password')"
        ><Icon
          v-if="innerType === 'text'"
          name="material-symbols:undereye" /><Icon
          v-if="innerType === 'password'"
          name="material-symbols:undereye-outline"
      /></span>
    </div>
    <input
      :type="innerType"
      :placeholder="placeholder"
      :id="id"
      v-model="model"
      class="p-2 text-2xl text-[var(--text-black)] rounded-sm"
      :class="{ '!text-4xl': bigText }"
      @input="onInput"
    />
  </div>
</template>
