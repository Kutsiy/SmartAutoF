<script setup>
import { useUserStore } from "~/store/user.store";

const scrollY = ref(0);
const isShow = ref(true);

const showHeader = (event) => {
  if (window.scrollY < scrollY.value) isShow.value = true;
  else isShow.value = false;
  scrollY.value = window.scrollY;
};

const store = useUserStore();

onMounted(() => {
  window.addEventListener("scroll", showHeader);
});

onUnmounted(() => {
  window.removeEventListener("scroll", showHeader);
});
</script>

<template>
  <div class="h-[168px] w-full"></div>

  <header
    class="fixed z-[100000] top-0 left-0 w-full border-b border-[var(--border-main)] backdrop-blur-2xl bg-[rgba(10,10,10,0.82)] transition-transform duration-500"
    :class="{ '-translate-y-full': !isShow }"
  >
    <div class="container mx-auto px-6 lg:px-12">
      <div class="h-[96px] flex items-center justify-between gap-6">
        <NuxtLink
          to="/"
          class="shrink-0 flex items-center justify-center h-full hover:scale-[1.02] transition-transform"
        >
          <span class="text-6xl text-[var(--text-important)] tracking-wider"
            >SmartAuto</span
          >
        </NuxtLink>

        <div
          class="hidden xl:flex items-center gap-5 text-sm text-[var(--text-secondary)]"
        >
          <div class="info-pill">
            <Icon name="material-symbols:call-outline" class="info-icon" />
            <div class="flex flex-col leading-tight">
              <span class="font-bold text-white">Консультація</span>
              <span>(066)-463-11-39</span>
            </div>
          </div>

          <div class="info-pill">
            <Icon name="material-symbols:schedule-rounded" class="info-icon" />
            <div class="flex flex-col leading-tight">
              <span class="font-bold text-white">Графік</span>
              <span>Пн - Сб: 09:00 - 18:00</span>
            </div>
          </div>

          <div class="info-pill max-w-[300px]">
            <Icon
              name="material-symbols:location-on-rounded"
              class="info-icon"
            />
            <span class="leading-tight"> Київська обл. с. Нижча Дубечня </span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/consultation"
            class="flex items-center justify-center px-5 h-[48px] rounded-2xl bg-[var(--accent-primary)] text-black font-black text-lg shadow-[0_0_24px_var(--accent-glow)] hover:scale-[1.03] hover:bg-[var(--accent-hover)] transition-all"
          >
            Консультація
          </NuxtLink>

          <template v-if="!store.getRegistered || !store.getActive">
            <NuxtLink to="/auth/login" class="auth-secondary">
              Увійти
            </NuxtLink>

            <NuxtLink to="/auth/signup" class="auth-primary">
              Реєстрація
            </NuxtLink>
          </template>

          <NuxtLink v-else to="/account" class="auth-secondary gap-3">
            <Icon
              name="material-symbols:person-rounded"
              class="text-[var(--text-important)] w-6 h-6"
            />
            <span>Акаунт</span>
          </NuxtLink>
        </div>
      </div>

      <nav
        class="h-[72px] flex items-center justify-end gap-4 no-scrollbar border-t border-[var(--border-main)]"
      >
        <NuxtLink to="/services" class="nav-item">
          <Icon name="material-symbols:build-rounded" class="nav-icon" />
          <span>Послуги</span>
        </NuxtLink>

        <NuxtLink
          class="nav-item"
          :to="{ path: '/', hash: '#contact' }"
          active-class="b"
          exact-active-class="a"
        >
          <Icon
            name="material-symbols:phone-in-talk-watchface-indicator-sharp"
            class="nav-icon"
          />
          <span>Контакти</span>
        </NuxtLink>

        <NuxtLink class="nav-item" to="/reviews">
          <Icon name="material-symbols:reviews-rounded" class="nav-icon" />
          <span>Відгуки</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.info-pill {
  @apply min-h-[46px]
    px-4
    rounded-2xl
    border
    border-[var(--border-main)]
    bg-[var(--bg-secondary)]
    flex
    items-center
    gap-3;
}

.info-icon {
  @apply w-6 h-6 text-[var(--text-important)] shrink-0;
}

.auth-secondary {
  @apply h-[48px]
    px-4
    text-2xl
    rounded-2xl
    border
    border-[var(--border-main)]
    bg-[var(--bg-secondary)]
    flex
    items-center
    font-bold
    hover:border-[var(--border-accent)]
    hover:bg-[var(--bg-hover)]
    transition-all;
}

.auth-primary {
  @apply h-[48px]
    px-5
    text-2xl
    rounded-2xl
    bg-[var(--bg-accent)]
    border
    border-[var(--border-accent)]
    text-black
    font-black
    flex
    items-center
    hover:scale-[1.03]
    transition-all;
}

.nav-item {
  @apply py-2
    px-5
    rounded-2xl
    flex
    items-center
    gap-3
    text-3xl
    font-black
    border
    border-[var(--border-main)]
    bg-[var(--bg-secondary)]
    hover:border-[var(--border-accent)]
    hover:bg-[var(--bg-hover)]
    hover:scale-[1.02]
    transition-all;
}

.nav-icon {
  @apply w-8 h-8 text-[var(--text-important)];
}

.nav-item.router-link-exact-active {
  @apply bg-[var(--bg-accent)]
    text-black
    border-[var(--border-accent)]
    shadow-[0_0_24px_var(--accent-glow)];
}

.router-link-exact-active .nav-icon {
  @apply text-black;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
