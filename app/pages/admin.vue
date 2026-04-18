<template>
  <div class="w-full h-full container m-auto p-12 flex gap-6">
    <div
      class="w-[250px] border border-[var(--yellow-500)] rounded-md flex flex-col gap-4 items-center p-4 text-3xl *:cursor-pointer"
    >
      <NuxtLink
        class="hover:border-b-2 hover:border-b-[var(--yellow-90)]"
        to="/"
      >
        Головна
      </NuxtLink>
      <NuxtLink
        class="hover:border-b-2 hover:border-b-[var(--yellow-90)]"
        to="/account"
      >
        Аккаунт
      </NuxtLink>
      <NuxtLink
        class="hover:border-b-2 hover:border-b-[var(--yellow-90)]"
        to="/admin"
      >
        Панель приладів
      </NuxtLink>
    </div>
    <div class="flex-1 border border-[var(--yellow-500)] rounded-md p-4">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>
