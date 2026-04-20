<script setup>
const route = useRoute();

const id = route.params.id;
const user = ref();
const loading = ref(true);
const emailIsCopied = ref(false);

onMounted(async () => {
  try {
    const data = await useMyFetch(`/user/?id=${id}`);
    user.value = data;
  } catch (e) {
  } finally {
    loading.value = false;
  }
});

const copyToClipboard = async () => {
  if (!user.value?.email) return;

  try {
    await navigator.clipboard.writeText(user.value.email);
    emailIsCopied.value = true;
    setTimeout(() => (emailIsCopied.value = false), 3000);
  } catch (e) {
    console.error("Clipboard error", e);
  }
};
</script>

<template>
  <div
    v-if="loading"
    class="flex justify-center items-center h-40 text-gray-400 animate-pulse text-4xl"
  >
    LOADING...
  </div>
  <div
    v-else
    class="grid grid-cols-2 gap-8 text-3xl p-6 border-2 border-dashed border-[var(--yellow-500)] rounded-md"
  >
    <div class="flex flex-col gap-6">
      <div>Ім'я: {{ user?.name }}</div>
      <div class="flex flex-col gap-2">
        <div
          class="text-xl transition-opacity font-bold text-green-400/90"
          :class="{
            'opacity-100 h-full': emailIsCopied,
            'opacity-0 h-0': !emailIsCopied,
          }"
        >
          Email скопійовано
        </div>
        <button
          class="w-fit border-2 border-[var(--black-500)] px-2 py-1 rounded-md bg-[var(--black-700)] cursor-pointer hover:scale-105 transition-transform"
          @click="copyToClipboard"
        >
          Email: {{ user?.email }}
        </button>
      </div>
      <div>Ролі: {{ user?.role.map((v) => `[ ${v} ]`).join(", ") }}</div>
      <div>Номер телефону: +2113132131</div>
    </div>
    <div class="flex flex-col gap-10 text-2xl">
      <div>
        Статус активації акаунту:
        <span
          :class="
            user?.isActivate
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          "
          class="px-2 py-1 rounded-md"
          >{{ user?.isActivate ? "Активований" : "Неактивований" }}</span
        >
      </div>
      <div>
        Статус акаунту:
        <span
          :class="
            !user?.isBanned
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          "
          class="px-2 py-1 rounded-md"
          >{{ !user?.isBanned ? "Активний" : "Заблокований" }}</span
        >
      </div>
    </div>
  </div>
</template>
