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
  document.body.classList.add("overflow-hidden");
};

const closeAlert = () => {
  alertIsOpen.value = false;
  deleteDataId.value = "";
  document.body.classList.remove("overflow-hidden");
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
                  <span class="text-[var(--text-important)]">хвилин</span>
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
