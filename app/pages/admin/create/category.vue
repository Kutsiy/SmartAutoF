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
          <UiButton text-size="text-2xl" @click="deleteById">Так</UiButton>
          <UiButton text-size="text-2xl" @click="closeAlert">Ні</UiButton>
        </div>
      </div>
    </div>
  </Teleport>

  <div class="h-full rounded-2xl grid gap-4 flex-1">
    <div
      class="h-fit border border-[var(--border-main)] bg-[var(--bg-secondary)] p-2 rounded-2xl grid grid-cols-3 gap-4"
    >
      <div class="col-span-2">
        <UiInput placeholder="Пошук..." v-model="searchString" />
      </div>
      <UiButton text-size="text-3xl" @click="searchData">Пошук</UiButton>
    </div>
    <div
      class="h-full border border-[var(--border-main)] bg-[var(--bg-secondary)] rounded-2xl row-span-2 p-4"
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
              'bg-[var(--bg-main)] p-4 text-3xl rounded-2xl flex items-center justify-between hover:scale-[1.005] transition-transform': true,
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
    <div class="border border-[var(--border-main)] rounded-2xl p-2">
      <FeatureAdminCreateCategory
        @set-value="setCategoryData"
        :updating-category="updatingCategory"
        @close-update="closeUpdate"
      />
    </div>
  </div>
</template>
