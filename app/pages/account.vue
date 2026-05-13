<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const userIsAdmin = ref(false);

onMounted(async () => {
  try {
    const data = await useMyFetch("/user/isadmin", {
      headers: useRequestHeaders(["cookie"]),
    });
    userIsAdmin.value = true;
  } catch (e) {
    userIsAdmin.value = true;
  }
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="container mx-auto px-6 lg:px-12 py-6">
      <div
        class="basic-back border border-[var(--border-main)] rounded-[28px] shadow-[0_0_30px_var(--shadow-soft)] overflow-hidden"
      >
        <nav
          class="grid grid-cols-4 gap-3 p-3"
          :class="{ 'grid-cols-5': userIsAdmin }"
        >
          <NuxtLink
            to="/"
            class="group relative overflow-hidden rounded-2xl px-5 py-4 flex items-center justify-center gap-3 text-2xl font-bold border border-transparent hover:border-[var(--border-accent)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-black)] transition-all duration-300 hover:scale-[1.02]"
          >
            <Icon
              name="material-symbols:home-rounded"
              class="w-7 h-7 text-[var(--text-important)] group-hover:text-black transition-colors"
            />

            <span>Головна</span>
          </NuxtLink>

          <NuxtLink
            to="/account"
            class="group relative overflow-hidden rounded-2xl px-5 py-4 flex items-center justify-center gap-3 text-2xl font-bold border border-transparent hover:border-[var(--border-accent)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-black)] transition-all duration-300 hover:scale-[1.02]"
          >
            <Icon
              name="material-symbols:person-rounded"
              class="w-7 h-7 text-[var(--text-important)] group-hover:text-black transition-colors"
            />

            <span>Акаунт</span>
          </NuxtLink>

          <NuxtLink
            to="/account/appointments"
            class="group relative overflow-hidden rounded-2xl px-5 py-4 flex items-center justify-center gap-3 text-2xl font-bold border border-transparent hover:border-[var(--border-accent)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-black)] transition-all duration-300 hover:scale-[1.02]"
          >
            <Icon
              name="material-symbols:calendar-month-rounded"
              class="w-7 h-7 text-[var(--text-important)] group-hover:text-black transition-colors"
            />

            <span>Мої замовлення</span>
          </NuxtLink>

          <NuxtLink
            to="/account/consultations"
            class="group relative overflow-hidden rounded-2xl px-5 py-4 flex items-center justify-center gap-3 text-2xl font-bold border border-transparent hover:border-[var(--border-accent)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-black)] transition-all duration-300 hover:scale-[1.02]"
          >
            <Icon
              name="material-symbols:home-rounded"
              class="w-7 h-7 text-[var(--text-important)] group-hover:text-black transition-colors"
            />

            <span>Мої консультації</span>
          </NuxtLink>

          <NuxtLink
            v-if="userIsAdmin"
            to="/admin"
            class="group relative overflow-hidden rounded-2xl px-5 py-4 flex items-center justify-center gap-3 text-2xl font-bold border border-transparent hover:border-[var(--border-accent)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-black)] transition-all duration-300 hover:scale-[1.02]"
          >
            <Icon
              name="material-symbols:admin-panel-settings-rounded"
              class="w-7 h-7 text-[var(--text-important)] group-hover:text-black transition-colors"
            />

            <span>Адмін панель</span>
          </NuxtLink>
        </nav>
      </div>
    </div>

    <div class="container mx-auto px-12 pb-8 flex-1 h-full">
      <div
        class="h-full basic-back border border-[var(--border-main)] rounded-[32px] shadow-[0_0_40px_var(--shadow-soft)]"
      >
        <div class="p-6 h-full">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  border-bottom: 2px solid var(--yellow-90);
}
</style>
