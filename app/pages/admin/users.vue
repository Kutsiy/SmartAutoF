<script setup>
import Compobox from "~/components/ui/compobox.vue";
import Input from "~/components/ui/input.vue";
import User from "~/components/ui/user-row.vue";

const users = ref();

onMounted(async () => {
  const data = await useMyFetch("/user/all");
  users.value = data;
});
</script>

<template>
  <div class="w-full h-full rounded-2xl text-sm">
    <div class="flex gap-4 h-full w-full">
      <div class="flex-1 flex flex-col gap-4">
        <div
          class="grid grid-cols-4 grid-rows-[45px] bg-[var(--bg-secondary)] rounded-2xl p-2 border border-[var(--border-main)]"
        >
          <Input
            placeholder="Пошук..."
            class="col-span-2"
            icon-name="material-symbols:search-rounded"
          />
          <div
            class="col-start-4 border-2 border-[var(--border-accent)] rounded-2xl flex items-center justify-center text-2xl cursor-pointer hover:bg-[var(--bg-accent)] hover:text-[var(--text-black)] transition-colors"
          >
            Створити користувача
          </div>
        </div>
        <div
          class="flex flex-col h-fit bg-[var(--bg-secondary)] rounded-2xl p-2 border border-[var(--border-main)]"
        >
          <div
            class="grid grid-cols-4 auto-rows-min gap-4 p-2 border-b-2 border-dashed border-[var(--yellow-90)] rounded-t-2xl"
          >
            <div>Ім'я</div>
            <div>Email</div>
            <div>Ролі користувача</div>
            <div>Статус акаунту</div>
          </div>
          <div class="pt-2">
            <NuxtLink v-for="user in users" :to="`/admin/user/${user.id}`"
              ><User
                :name="user.name"
                :email="user.email"
                :roles="user.role"
                :is-active="user.isActivate"
            /></NuxtLink>
          </div>
        </div>
      </div>
      <div
        class="h-full min-w-[320px] flex flex-col gap-4 bg-[var(--bg-secondary)] rounded-2xl p-2 border border-[var(--border-main)]"
      >
        <Compobox text-size="text-xl" />
        <Compobox text-size="text-xl" />
        <Compobox text-size="text-xl" />
      </div>
    </div>
  </div>
</template>
