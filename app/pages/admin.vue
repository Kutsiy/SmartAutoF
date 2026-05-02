<script setup>
import { NavCol, NavColTitle } from "~/components/ui/nav-col";

// onMounted(async () => {
//   try {
//     const data = await useMyFetch("/user/isadmin", {
//       headers: useRequestHeaders(["cookie"]),
//     });
//   } catch (e) {
//     await navigateTo("/");
//   }
// });
</script>

<template>
  <div class="min-w-full min-h-full container m-auto p-2 flex gap-2">
    <div class="min-h-full">
        <div
      class="w-[180px] sticky h-[98vh] overflow-y-auto scroll-bar top-2 border border-[var(--yellow-500)] rounded-2xl flex flex-col gap-2 p-4 text-xl *:cursor-pointer *:w-fit"
    >
      <NavCol>
        <NavColTitle name="material-symbols:person">Профіль</NavColTitle>
        <NuxtLink
          class="hover:text-[var(--text-hover)] transition-colors"
          to="/"
        >
          Головна
        </NuxtLink>
        <NuxtLink
          class="hover:text-[var(--text-hover)] transition-colors"
          to="/account"
        >
          Акаунт
        </NuxtLink>
      </NavCol>
      <NavCol >
        <NavColTitle
          name="eos-icons:admin" class="relative top-1.5""
        >
           Адмін панель
        </NavColTitle>
        <NuxtLink
          class="hover:text-[var(--text-hover)] transition-colors"
          to="/admin"
        >
          Панель приладів
        </NuxtLink>
        <NuxtLink
          class="hover:text-[var(--text-hover)] transition-colors"
          to="/admin/users"
        >
          Користувачі
        </NuxtLink>
        <NuxtLink
          class="hover:text-[var(--text-hover)] transition-colors"
          to="/admin/appointments"
        >
          Замовлення
        </NuxtLink>
      </NavCol>
      <NavCol >
        <NavColTitle
          name="mingcute:hammer-fill" class="relative top-1.5"
        >
           Свторення
        </NavColTitle>
        <NuxtLink
          class="hover:text-[var(--text-hover)] transition-colors"
          to="/admin/create"
        >
          Створити
        </NuxtLink>
        </NavCol>
    </div>
    </div>
    <div class="flex-1 border border-[var(--yellow-500)] rounded-2xl p-4 ">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<style scoped>
.scroll-bar {
  scrollbar-color: grey rgba(0, 0, 0, 0);
}
</style>