<script setup>
import User from "~/components/ui/user-row.vue";

const users = ref();

onMounted(async () => {
  const data = await useMyFetch("/user/all");
  users.value = data;
  console.log(data);
});
</script>

<template>
  <div
    class="w-full h-full border-2 border-dashed border-[var(--yellow-50)] rounded-md p-3 text-sm"
  >
    <div
      class="grid grid-cols-4 auto-rows-min gap-4 p-2 border-b-2 border-dashed border-[var(--yellow-90)]"
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
</template>
