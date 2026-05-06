<script setup lang="ts">
const config = useRuntimeConfig();
const serviceData = ref<any[]>([]);
const categoriesData = ref<any[]>([]);
const mainLink = config.public.uploadFileLink;

const deleteServiceId = ref("");

const alertIsOpen = ref(false);

const dataLoading = ref(true);

const searchString = ref();
const searchCategory = ref();

const updatingService = ref<Record<any, any> | null>(null);

const setUpdatingService = (service: any) => {
  updatingService.value =
    updatingService?.value?.id !== service.id ? service : null;
};

const getData = async () => {
  const data = await useMyFetch("/service/all");
  if (Array.isArray(data)) {
    serviceData.value = data;
    categoriesData.value = [
      null,
      ...new Set(data.map((value) => value.category.name)),
    ];
  }
};

const search = async () => {
  dataLoading.value = true;
  if (searchString.value || searchCategory.value) {
    const params = new URLSearchParams();

    if (searchString.value) {
      params.append("search", searchString.value);
    }

    if (searchCategory.value) {
      params.append("category", searchCategory.value);
    }

    const data = await useMyFetch(`/service/search/?${params.toString()}`);
    if (Array.isArray(data)) serviceData.value = data;
  } else {
    getData();
  }
  dataLoading.value = false;
};

const closeUpdate = () => {
  updatingService.value = null;
};

onMounted(async () => {
  await getData();
  dataLoading.value = false;
});

const setData = (data: Record<any, any>) => {
  const index = serviceData.value.findIndex((item) => item.id === data.id);

  if (index !== -1) {
    serviceData.value[index] = data;
  } else {
    serviceData.value.push(data);
  }
  if (updatingService.value) closeUpdate();
};

const openAlert = (id: string) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  deleteServiceId.value = id;
  alertIsOpen.value = true;
};

const closeAlert = () => {
  deleteServiceId.value = "";
  alertIsOpen.value = false;
};

const deleteData = async () => {
  await useMyFetch(`/service/delete/?id=${deleteServiceId.value}`, {
    method: "DELETE",
  });

  serviceData.value = serviceData.value?.filter(
    (val) => val.id !== deleteServiceId.value,
  );
  closeAlert();
};
</script>

<template>
  <Teleport to="body">
    <div
      class="absolute w-full h-full top-0 bg-[var(--black-50)] z-50 flex items-center justify-center"
      v-if="alertIsOpen"
    >
      <div
        class="w-[500px] h-[350px] bg-[var(--bg-secondary)] border border-[var(--border-accent)] rounded-2xl flex flex-col p-2 gap-6 justify-center"
      >
        <div class="text-3xl font-bold text-center">
          Ви точно хочите видалити?
        </div>
        <div class="flex flex-col gap-2">
          <UiButton text-size="text-2xl" @click="deleteData">Так</UiButton>
          <UiButton text-size="text-2xl" @click="closeAlert">Ні</UiButton>
        </div>
      </div>
    </div>
  </Teleport>

  <div class="flex flex-col gap-4">
    <div class="basic-back grid grid-cols-4 gap-4">
      <div class="col-span-2">
        <UiInput placeholder="Пошук..." v-model="searchString" />
      </div>
      <UiCompobox v-model="searchCategory" :options="categoriesData" />
      <UiButton text-size="text-3xl" @click="search">Пошук</UiButton>
    </div>

    <div class="basic-back h-full">
      <template v-if="dataLoading">
        <div
          class="w-full h-full flex items-center justify-center text-5xl animate-pulse"
        >
          Завантаження...
        </div>
      </template>

      <template v-else>
        <div
          class="h-[460px] flex flex-col gap-4 scroll-bar pl-4 pr-4 py-1 overflow-y-auto"
          v-if="serviceData.length"
        >
          <div
            :class="{
              '!border-2 !border-[var(--border-accent)]':
                updatingService?.id === service.id,
            }"
            v-for="service in serviceData"
            class="w-full text-3xl rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] p-2 flex justify-between"
          >
            <div class="flex flex-col gap-2">
              <div class="text-[var(--text-important)]">
                Категорія: {{ service?.category?.name }}
              </div>
              <div class="grid grid-cols-[auto_1fr] gap-3 items-center">
                <NuxtImg
                  :src="`${mainLink}/${service.image_link}`"
                  class="h-20 w-20 object-cover rounded-lg border-2 border-[var(--border-accent)]"
                />

                <div
                  class="text-4xl flex gap-2 text-[var(--text-secondary)] items-center"
                >
                  Сервіс:
                  <div
                    class="font-semibold leading-tight text-[var(--text-primary)]"
                  >
                    {{ service?.name }}
                  </div>
                </div>

                <div class="col-span-2 text-3xl flex flex-col gap-2">
                  <div class="text-[var(--text-secondary)]">Опис сервісу:</div>
                  <div>
                    {{ service?.text }}
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-2">
              <Icon
                @click="setUpdatingService(service)"
                name="material-symbols:edit-rounded"
                class="text-4xl cursor-pointer hover:scale-[1.1]"
              />
              <Icon
                @click="openAlert(service.id)"
                name="material-symbols-light:delete-outline"
                class="text-[var(--text-red)] text-4xl cursor-pointer hover:scale-[1.1]"
              />
            </div>
          </div>
        </div>

        <div
          v-else
          class="w-full h-full flex items-center justify-center text-4xl font-bold"
        >
          {{
            searchString
              ? `За запитом ${searchString} жодної категорії ще не знайдено`
              : "Жодної категорії ще не створенно..."
          }}
        </div>
      </template>
    </div>
  </div>

  <FeatureAdminCreateService
    @set-data="setData"
    :updating-service="updatingService"
    @close-update="closeUpdate"
  />
</template>

<style scoped>
.scroll-bar {
  scrollbar-color: grey rgba(0, 0, 0, 0);
}
</style>
