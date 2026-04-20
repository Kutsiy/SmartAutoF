<script setup>
const { data } = await useFetch("http://localhost:8000/category/all");
const listIsOpen = ref(false);
const listItem = ref("Оберіть зі списку");

const changeListItem = (item) => {
  listItem.value = item;
};
</script>

<template>
  <div class="absolute w-full h-[100vh] z-10 service-back">
    <NuxtImg
      src="/background_services.png"
      class="w-full h-full blur-[5px] object-cover"
    />
  </div>
  <div class="w-full h-[100vh] flex justify-center items-center">
    <div class="container mx-auto px-12 z-10 service flex flex-col gap-16">
      <div class="mt-10 flex items-center justify-between">
        <div
          class="w-[500px] h-[60px] bg-[var(--yellow-600)] text-[var(--text-black)] text-4xl flex justify-end items-center px-4 relative before:content-[''] before:bg-[var(--yellow-600)] before:absolute before:w-[55px] before:h-[60px] before:top-0 before:left-[-50px] font-bold"
        >
          Наші сервіси
        </div>
        <div class="relative">
          <div
            @click="listIsOpen = !listIsOpen"
            class="text-3xl py-2 px-4 border border-[var(--yellow-600)] cursor-pointer rounded-sm hover:bg-[var(--bg-hover)] transition-colors"
          >
            <Icon name="radix-icons:caret-down" class="relative top-1" />
            {{ listItem }}
          </div>
          <div
            v-if="listIsOpen"
            class="flex flex-col w-full absolute gap-2 text-2xl top-[4rem] border border-[var(--yellow-600)] bg-[var(--yellow-10)] py-2 px-4 rounded-md *:pl-2 *:cursor-pointer z-30"
          >
            <span
              v-for="value in data"
              class="hover:bg-[var(--yellow-20)] rounded-sm"
              :class="{ 'bg-[var(--yellow-20)]': value.name === listItem }"
              @click="changeListItem(value.name)"
              >{{ value.name }}</span
            >
          </div>
        </div>
      </div>
      <div class="border-2 border-[var(--yellow-50)] rounded-sm">
        <div
          class="w-full h-5 p-4 bg-[var(--black-90)] border-b-2 border-b-[var(--yellow-50)] rounded-tr-xl rounded-tl-xl flex items-center justify-end gap-2 *:cursor-pointer"
        >
          <Icon name="mingcute:minimize-fill" />
          <Icon name="mingcute:close-fill" />
        </div>
        <div
          class="w-full h-full p-4 bg-[var(--black-50)] backdrop-blur-[5px] grid grid-cols-4 gap-4"
        >
          <div
            v-for="value in data"
            class="p-4 text-3xl border border-dashed border-[var(--yellow-50)] flex items-center gap-4"
          >
            <NuxtImg
              src="/HeaderLogo.png"
              class="w-[70px] h-[70px] object-cover relative top-2"
            />
            <span>{{ value.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
