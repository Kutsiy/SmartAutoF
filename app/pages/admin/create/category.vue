<script setup lang="ts">
const alertIsOpen = ref(false);
const idToDelete = ref();
const dataLoading = ref(true);
const link = ref("http://localhost:8000/uploads");
const categoriesData = ref<any[]>([]);
const searchString = ref("");

const updatingCategory = ref<Record<any, any> | null>(null);

const getData = async () => {
  const data = await useMyFetch("/category/all");
  if (Array.isArray(data)) categoriesData.value = data;
};

const searchData = async () => {
  dataLoading.value = true;
  if (searchString.value) {
    const data = await useMyFetch(
      `/category/search/?search=${searchString.value}`,
    );
    console.log(data);
    if (Array.isArray(data)) categoriesData.value = data;
  } else {
    getData();
  }
  dataLoading.value = false;
};

onMounted(async () => {
  await getData();
  dataLoading.value = false;
});

const openAlert = (id: string) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  document.body.classList.add("overflow-hidden");
  alertIsOpen.value = true;
  idToDelete.value = id;
};

const closeAlert = () => {
  document.body.classList.remove("overflow-hidden");
  alertIsOpen.value = false;
  idToDelete.value = "";
};

const deleteById = async () => {
  await useMyFetch(`/category/delete/?id=${idToDelete.value}`, {
    method: "DELETE",
  });
  categoriesData.value = categoriesData.value.filter(
    (value) => value.id !== idToDelete.value,
  );
  closeAlert();
};

const setUpdate = (category: Record<any, any>) => {
  updatingCategory.value =
    updatingCategory?.value?.id !== category.id ? { ...category } : null;
};

const closeUpdate = () => (updatingCategory.value = null);

const setCategoryData = (data: Record<any, any>) => {
  const index = categoriesData.value.findIndex((item) => item.id === data.id);

  if (index !== -1) {
    categoriesData.value[index] = data;
  } else {
    categoriesData.value.push(data);
  }
  if (updatingCategory.value) closeUpdate();
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
            @click="deleteById"
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

  <div class="h-full rounded-2xl grid gap-4 flex-1">
    <div
      class="h-fit border border-[var(--border-main)] !bg-[var(--bg-main)] !p-4 rounded-2xl grid grid-cols-3 gap-4"
    >
      <div class="col-span-2">
        <UiInput placeholder="Пошук..." v-model="searchString" />
      </div>
      <UiButton text-size="text-3xl" @click="searchData">Пошук</UiButton>
    </div>
    <div
      class="h-full border border-[var(--border-main)] !bg-[var(--bg-main)] rounded-2xl row-span-2 p-4"
    >
      <template v-if="dataLoading">
        <div
          class="w-full h-full flex items-center justify-center text-5xl animate-pulse"
        >
          Завантаження...
        </div>
      </template>
      <template v-else>
        <div
          v-if="categoriesData.length"
          class="h-[450px] flex flex-col gap-4 scroll-bar pl-4 pr-4 py-1 overflow-y-auto"
        >
          <div
            :class="{
              'bg-[var(--bg-secondary)] p-4 text-3xl rounded-2xl flex items-center justify-between hover:scale-[1.005] transition-transform': true,
              'border-2 border-[var(--border-accent)]':
                updatingCategory?.id === category.id,
            }"
            v-for="category in categoriesData"
          >
            <div class="flex gap-4 items-center">
              <NuxtImg
                :src="`${link}/${category?.image_link}`"
                class="h-20 w-20 object-cover rounded-md border-2 border-[var(--border-accent)]"
              />
              <div>
                <span class="text-[var(--text-secondary)] flex items-center"
                  >Назва категорії:</span
                >
                {{ category?.name }}
              </div>
            </div>
            <div class="flex gap-4 *:transition-transform">
              <Icon
                @click="setUpdate(category)"
                name="material-symbols:edit-rounded"
                class="text-4xl cursor-pointer hover:scale-[1.1]"
              />
              <Icon
                @click="openAlert(category.id)"
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

    <FeatureAdminCreateCategory
      @set-value="setCategoryData"
      :updating-category="updatingCategory"
      @close-update="closeUpdate"
    />
  </div>
</template>
