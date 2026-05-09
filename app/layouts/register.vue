<template>
  <div class="w-[220px] p-4">
    <UiButton
      text-size="text-2xl"
      class-name="
        gap-3
        hover:scale-105
        transition-all
        border
        border-[var(--border-main)]
        hover:border-[var(--border-accent)]
        hover:bg-[var(--bg-hover)]
        px-4
        py-2
        hover:text-[var(--text-primary)]
      "
      render-as="link"
      to="/"
    >
      <Icon
        name="material-symbols:arrow-left-alt-rounded"
        class="relative top-[2px]"
      />

      <span>Вийти</span>
    </UiButton>
  </div>

  <div
    class="h-full container mx-auto px-6 lg:px-12 flex items-center justify-center py-6"
  >
    <div
      class="w-full max-w-[720px] border border-[var(--border-main)] bg-[var(--bg-secondary)] rounded-[32px] p-4 lg:p-6 shadow-[0_0_30px_var(--shadow-soft)]"
    >
      <slot />
    </div>
  </div>
</template>
