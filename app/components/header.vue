<script setup>
import { useUserStore } from "~/store/user.store";

const show = ref(false);
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
  <div class="w-full h-[130px] relative"></div>
  <div
    class="w-full h-[130px] border-b border-b-[var(--border-accent)] backdrop-blur-[10px] z-20 fixed top-0"
    :class="{ isShow: isShow, isHidden: !isShow }"
  >
    <div
      class="w-[30px] h-[30px] flex items-center justify-center bg-[var(--yellow-90)] absolute bottom-0 right-0 text-2xl cursor-pointer z-50"
      @click="showHeader"
    >
      <Icon
        class="cursor-pointer"
        :name="
          isShow
            ? 'material-symbols:keyboard-arrow-up'
            : 'material-symbols:keyboard-arrow-down'
        "
      />
    </div>
    <div class="w-full h-full container mx-auto px-12 relative">
      <div class="w-full h-full text-2xl flex items-center justify-between">
        <NuxtLink
          class="flex items-center justify-center w-[200px] h-[100px] relative"
          to="/"
        >
          <NuxtImg
            src="/HeaderLogo.png"
            height="120"
            width="200"
            class="absolute top-2"
          />
        </NuxtLink>

        <div class="flex flex-col text-xl gap-4">
          <div class="flex items-center gap-4 text-base">
            <div class="opacity-80">
              <div>Консультація спеціаліста</div>
              <div>(066)-463-11-39</div>
            </div>
            <div class="opacity-80">
              <div>Графік роботи</div>
              <div>Пн - Сб: 09:00 - 18:00</div>
            </div>
            <div class="opacity-80">
              Київська обл. с. Нижча Дубечня, вул. Шевченка 5.
            </div>
            <NuxtLink
              to="/consultation"
              class="text-xl border-2 border-[var(--border-accent)] px-2 py-1.5 cursor-pointer hover:bg-[var(--accent-hover)] hover:text-[var(--text-black)] font-bold transition-colors rounded-2xl"
            >
              Отримати консультацію
            </NuxtLink>
            <div
              class="flex items-center gap-2 text-2xl *:font-bold *:cursor-pointer border-l-2 border-l-[var(--border-accent)]"
              v-if="!store.getRegistered || !store.getActive"
            >
              <NuxtLink
                class="text-[var(--yellow-80)] hover:text-[var(--yellow-90)] transition-colors mx-4 my-1"
                to="/auth/login"
              >
                увійти
              </NuxtLink>
              <NuxtLink
                class="border-2 border-[var(--border-accent)] rounded-2xl px-4 py-1 hover:bg-[var(--accent-hover)] hover:text-[var(--text-black)] transition-colors"
                to="/auth/signup"
              >
                зарееструватись
              </NuxtLink>
            </div>
            <div
              v-else
              class="flex-1 flex items-center justify-end gap-2 text-2xl *:font-bold *:cursor-pointer"
            >
              <NuxtLink
                class="w-full border-2 border-[var(--border-accent)] rounded-2xl px-4 py-1 hover:bg-[var(--accent-hover)] hover:text-[var(--text-black)] transition-colors flex items-center gap-4"
                to="/account"
              >
                <Icon
                  name="material-symbols:person"
                  class="relative top-[1px]"
                />
                Акаунт
              </NuxtLink>
            </div>
          </div>
          <nav
            class="flex items-center justify-between relative text-3xl *:min-w-[165px] *:flex *:items-center *:justify-center"
          >
            <NuxtLink
              to="/services"
              @mouseenter="show = true"
              @mouseleave="show = false"
              class="rotate nav__item relative"
            >
              Список послуг
              <Icon
                name="radix-icons:caret-down"
                class="relative top-1"
                :class="{ rotated: show }"
              />
              <div class="absolute h-[65px] w-full top-0 left-[-2px]"></div>
            </NuxtLink>
            <div
              v-if="show"
              @mouseenter="show = true"
              @mouseleave="show = false"
              class="w-full h-[100px] absolute border border-[var(--border-accent)] bg-[var(--bg-main)] top-full mt-3 z-50 rounded-md"
            ></div>
            <NuxtLink class="nav__item" to="/diagnostic"
              >Дігностичні роботи</NuxtLink
            >
            <NuxtLink class="nav__item" to="/prices">Ціни</NuxtLink>
            <NuxtLink class="nav__item" to="/contacts">Контакти</NuxtLink>
            <NuxtLink class="nav__item" to="/reviews">Відгуки</NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav__item.router-link-active {
  @apply !border-2 !border-[var(--border-accent)] !bg-[var(--bg-accent)] !text-[var(--text-black)] font-bold;
}

.nav__item {
  @apply cursor-pointer active:scale-95 bg-[var(--black-20)] px-2.5 py-2 border border-[var(--border-main)] hover:bg-[var(--bg-hover-alpha)] transition-colors transition-transform rounded-2xl;
}

.rotate > span {
  transition: 0.5s;
}
.rotate:hover > span {
  transition: 0.5s;
  transform: rotate(180deg);
}

.rotated {
  transform: rotate(180deg);
}

.isHidden {
  height: 0;
  transition: 0.5s;
  animation: isHidden 0.5s;
  overflow: hidden;
}

@keyframes isHidden {
  from {
    height: 130px;
  }
  to {
    height: 0;
  }
}

.isShow {
  transition: 0.5s;
  animation: isShow 0.5s;
}

@keyframes isShow {
  from {
    height: 0;
    overflow: hidden;
  }
  to {
    height: 130px;
    overflow: hidden;
  }
}
</style>
