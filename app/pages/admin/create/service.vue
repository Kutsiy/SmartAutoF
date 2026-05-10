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

    const data = await useMyFetch(`/service/search/?${params}`);
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
  document.body.classList.add("overflow-hidden");
};

const closeAlert = () => {
  deleteServiceId.value = "";
  alertIsOpen.value = false;
  document.body.classList.remove("overflow-hidden");
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
      v-if="alertIsOpen"
      class="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
    >
      <div
        class="relative w-full max-w-[520px] rounded-[32px] border border-[var(--border-main)] bg-[var(--bg-secondary)] p-6 flex flex-col gap-6 shadow-[0_0_50px_var(--shadow-soft)]"
      >
        <div
          class="mx-auto w-20 h-20 rounded-3xl border border-red-500/40 bg-red-500/10 flex items-center justify-center"
        >
          <Icon
            name="material-symbols:delete-rounded"
            class="w-12 h-12 text-red-400"
          />
        </div>

        <div class="flex flex-col gap-3 text-center">
          <div class="text-4xl font-black">Видалити запис?</div>

          <div class="text-2xl text-[var(--text-secondary)]">
            Ви точно хочете видалити? Цю дію неможливо буде скасувати.
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UiButton
            text-size="text-2xl"
            class-name="
            !bg-red-600
            hover:!bg-red-500
            !text-white
            !font-black
            min-h-[58px]
          "
            @click="deleteData"
          >
            Так, видалити
          </UiButton>

          <UiButton
            text-size="text-2xl"
            class-name="
            min-h-[58px]
            border
            border-[var(--border-main)]
            hover:border-[var(--border-accent)]
          "
            @click="closeAlert"
          >
            Скасувати
          </UiButton>
        </div>
      </div>
    </div>
  </Teleport>

  <div class="flex flex-col gap-4">
    <div class="basic-back !bg-[var(--bg-main)] !p-4 grid grid-cols-4 gap-4">
      <div class="col-span-2">
        <UiInput placeholder="Пошук..." v-model="searchString" />
      </div>
      <UiCompobox v-model="searchCategory" :options="categoriesData" />
      <UiButton text-size="text-3xl" @click="search">Пошук</UiButton>
    </div>

    <div class="basic-back !bg-[var(--bg-main)] !p-4 h-full">
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
            class="w-full text-3xl rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-light)] p-2 flex justify-between"
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
