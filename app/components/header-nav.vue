<script setup lang="ts">
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "reka-ui";
import { ref } from "vue";

const currentTrigger = ref("");
</script>

<template>
  <NavigationMenuRoot
    v-model="currentTrigger"
    class="relative z-[1] flex w-full justify-center text-2xl"
  >
    <NavigationMenuList class="flex items-center">
      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="group flex items-center justify-between text-[28px] border-2 border-[var(--border-accent)] px-2 py-1.5 cursor-pointer bg-[var(--accent-hover)] text-[var(--text-hover)] font-bold transition-colors"
        >
          Список послуг
          <Icon
            name="radix-icons:caret-down"
            class="text-green10 relative top-[1px] transition-transform duration-[150ms] ease-in group-data-[state=open]:-rotate-180"
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent
          class="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto"
        >
          <ul
            class="one m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]"
          >
            <NavigationMenuListItem
              href="https://stitches.dev/"
              title="Stitches"
            >
              CSS-in-JS with best-in-class developer experience.
            </NavigationMenuListItem>
            <NavigationMenuListItem href="/colors" title="Colors">
              Beautiful, thought-out palettes with auto dark mode.
            </NavigationMenuListItem>
            <NavigationMenuListItem
              href="https://lucide.dev/icons/"
              title="Icons"
            >
              A crisp set of 15x15 icons, balanced and consistent.
            </NavigationMenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          class="ml-[1px] cursor-pointer bg-[var(--bg-secondary)] px-2.5 py-2 border-x border-x-[var(--border-main)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          Дігностичні роботи
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          class="cursor-pointer bg-[var(--bg-secondary)] px-2.5 py-2 border-x border-x-[var(--border-main)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          Дизель сервіс
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          class="cursor-pointer bg-[var(--bg-secondary)] px-2.5 py-2 border-x border-x-[var(--border-main)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          Ремонт вантажівок
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          class="cursor-pointer bg-[var(--bg-secondary)] px-2.5 py-2 border-x border-x-[var(--border-main)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          Легковий сервіс
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>

    <div class="absolute top-full flex w-full justify-center">
      <NavigationMenuViewport
        class="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--reka-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-xl bg-white transition-[width,_height] duration-300 sm:w-[var(--reka-navigation-menu-viewport-width)] border shadow-sm"
      />
    </div>
  </NavigationMenuRoot>
</template>
