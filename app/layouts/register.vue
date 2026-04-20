<template>
  <NuxtLink
    class="absolute text-2xl m-2 p-1 cursor-pointer hover:border hover:border-[var(--yellow-50)] hover:rounded-md"
    to="/"
  >
    <Icon name="material-symbols:arrow-left-alt" class="relative top-[3px]" />
    Вийти
  </NuxtLink>
  <div
    class="h-full container mx-auto px-12 flex items-center justify-center py-6"
  >
    <div class="border-4 border-[var(--yellow-500)] rounded-md p-4">
      <slot />
    </div>
  </div>
</template>
