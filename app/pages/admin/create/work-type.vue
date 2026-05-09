<script setup lang="ts">
// Search
const searchString = ref("");
const searchService = ref("");

// State
const dataIsLoading = ref(true);
const alertIsOpen = ref(false);

// Data
const dataWorkType = ref<any[]>([]);
const dataServices = ref<any[]>([]);
const dataServicesRaw = ref<any[]>([]);
const updatingData = ref<Record<any, any> | null>(null);
const deleteDataId = ref("");

// Search

const search = async () => {
  dataIsLoading.value = true;
  if (searchString.value || searchService.value) {
    const queryParams = new URLSearchParams();

    if (searchString.value) {
      queryParams.append("search", searchString.value);
    }

    if (searchService.value) {
      queryParams.append("service", searchService.value);
    }

    const data = await useMyFetch(`work/type/search?${queryParams}`);
    if (Array.isArray(data)) dataWorkType.value = data;
  } else {
    const data = await useMyFetch("/work/type/all");
    if (Array.isArray(data)) {
      dataWorkType.value = data;
    }
  }
  dataIsLoading.value = false;
};

// Updating

const setUpdating = (workType: Record<any, any> | null) => {
  updatingData.value =
    updatingData?.value?.id !== workType?.id ? workType : null;
};

const closeUpdate = () => {
  updatingData.value = null;
};

// Deleting

const openAlert = (id: string) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  alertIsOpen.value = true;
  deleteDataId.value = id;
};

const closeAlert = () => {
  alertIsOpen.value = false;
  deleteDataId.value = "";
};

const deleteData = async () => {
  try {
    await useMyFetch(`/work/type/delete?id=${deleteDataId.value}`, {
      method: "DELETE",
    });
    dataWorkType.value = dataWorkType.value.filter(
      (value) => value.id !== deleteDataId.value,
    );
    closeAlert();
  } catch (e: any) {}
};

const getData = async () => {
  const services = await useMyFetch("/service/all");
  if (Array.isArray(services)) {
    dataServicesRaw.value = services;
    dataServices.value = [
      null,
      ...new Set(services.map((value) => value.name)),
    ];
  }
  const data = await useMyFetch("/work/type/all");
  if (Array.isArray(data)) {
    dataWorkType.value = data;
  }
};

const setData = (data: any) => {
  const index = dataWorkType.value.findIndex((item) => item.id === data.id);

  if (index !== -1) {
    dataWorkType.value[index] = data;
  } else {
    dataWorkType.value.push(data);
  }
  if (updatingData.value) closeUpdate();
};

onMounted(async () => {
  try {
    await getData();
  } finally {
    dataIsLoading.value = false;
  }
});
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
    <div class="basic-back !bg-[var(--bg-main)] !p-4 grid grid-cols-4 gap-4">
      <div class="col-span-2">
        <UiInput placeholder="Знайти тип роботи..." v-model="searchString" />
      </div>
      <UiCompobox v-model="searchService" :options="dataServices" />
      <UiButton text-size="text-3xl" @click="search">Пошук</UiButton>
    </div>

    <div class="basic-back !bg-[var(--bg-main)] !p-4">
      <template v-if="dataIsLoading">
        <div class="text-5xl animate-pulse font-bold text-center">
          Завантаження...
        </div>
      </template>

      <template v-else>
        <div v-if="!dataWorkType.length" class="text-5xl font-bold text-center">
          Жодних типів роботи ще не створено
        </div>

        <div
          v-else
          class="h-[460px] scroll-bar overflow-y-auto flex flex-col gap-4 pr-2"
        >
          <div
            v-for="workType in dataWorkType"
            :class="{
              'border-2 border-[var(--border-accent)]':
                updatingData?.id === workType.id,
            }"
            class="bg-[var(--bg-secondary)] rounded-2xl text-3xl p-2 flex justify-between"
          >
            <div class="flex flex-col gap-2">
              <div class="text-[var(--text-important)]">
                Сервіс:
                {{ workType?.service?.name }}
              </div>
              <div>
                <div>
                  <span class="text-[var(--text-secondary)]"
                    >Назва типу роботи:</span
                  >
                  {{ workType?.name }}
                </div>
                <div>
                  <span class="text-[var(--text-secondary)]"
                    >Короткий опис:</span
                  >
                  {{ workType?.text }}
                </div>
                <div>
                  <span class="text-[var(--text-secondary)]">Ціна:</span>
                  {{ workType?.price }}
                  <span class="text-[var(--text-important)]">грн</span>
                </div>
                <div>
                  <span class="text-[var(--text-secondary)]"
                    >Час виконання типу роботи:</span
                  >
                  {{ workType?.duration }}
                  <span class="text-[var(--text-important)]">хвилини</span>
                </div>
              </div>
            </div>

            <div class="flex gap-2">
              <Icon
                name="iconoir:empty-page"
                class="text-4xl cursor-pointer hover:scale-[1.1]"
              />
              <Icon
                @click="setUpdating(workType)"
                name="material-symbols:edit-rounded"
                class="text-4xl cursor-pointer hover:scale-[1.1]"
              />
              <Icon
                @click="openAlert(workType.id)"
                name="material-symbols-light:delete-outline"
                class="text-[var(--text-red)] text-4xl cursor-pointer hover:scale-[1.1]"
              />
            </div>
          </div>
        </div>
      </template>
    </div>

    <FeatureAdminCreateWorkType
      :updating-data="updatingData"
      :service-data-raw="dataServicesRaw"
      :service-data="dataServices"
      @set-data="setData"
      @close-update="closeUpdate"
    />
  </div>
</template>

<style scoped>
.scroll-bar {
  scrollbar-color: grey rgba(0, 0, 0, 0);
}
</style>
