<script setup lang="ts">
const serviceData = ref<any[]>();
const mainLink = ref("http://localhost:8000/uploads");

onMounted(async () => {
  const data = await useMyFetch("/service/all");
  if (Array.isArray(data)) serviceData.value = data;
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="basic-back grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <UiInput placeholder="Пошук..." />
      </div>
      <UiButton text-size="text-3xl">Пошук</UiButton>
    </div>

    <div class="basic-back">
      <div
        class="max-h-[420px] overflow-y-hidden flex flex-col gap-2 justify-center items-center"
      >
        <div
          v-for="service in serviceData"
          class="w-full text-3xl rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] p-2 flex justify-between"
        >
          <div class="flex flex-col gap-2">
            <div>Категорія: {{ service.category.name }}</div>
            <div class="grid grid-cols-[auto_1fr] gap-3 items-center">
              <NuxtImg
                :src="`${mainLink}/${service.image_link}`"
                class="h-16 w-16 object-cover rounded-lg"
              />

              <div class="text-4xl flex gap-2">
                Сервіс:
                <div class="font-semibold leading-tight">
                  {{ service?.name }}
                </div>
              </div>

              <div class="col-span-2 text-3xl flex flex-col gap-2">
                <div>Опис сервісу:</div>
                <div>
                  {{ service?.text }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <Icon
              name="material-symbols:edit-rounded"
              class="text-4xl cursor-pointer hover:scale-[1.1]"
            />
            <Icon
              name="material-symbols-light:delete-outline"
              class="text-[var(--text-red)] text-4xl cursor-pointer hover:scale-[1.1]"
            />
          </div>
        </div>
      </div>
    </div>

    <FeatureAdminCreateService />
  </div>
</template>
