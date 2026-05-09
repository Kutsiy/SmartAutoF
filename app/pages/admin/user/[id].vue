<script setup>
const route = useRoute();

const id = route.params.id;

const user = ref(null);
const loading = ref(true);
const serverError = ref("");
const emailIsCopied = ref(false);

onMounted(async () => {
  try {
    const data = await useMyFetch(`/user/?id=${id}`);
    user.value = data;
  } catch (e) {
    serverError.value = e?.data?.detail || "Помилка завантаження користувача";
  } finally {
    loading.value = false;
  }
});

const copyToClipboard = async () => {
  if (!user.value?.email) return;

  try {
    await navigator.clipboard.writeText(user.value.email);
    emailIsCopied.value = true;

    setTimeout(() => {
      emailIsCopied.value = false;
    }, 3000);
  } catch (e) {
    console.error("Clipboard error", e);
  }
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div
      v-if="loading"
      class="basic-back min-h-[260px] flex flex-col items-center justify-center gap-4 text-3xl font-bold text-[var(--text-secondary)]"
    >
      <Icon
        name="material-symbols:progress-activity-rounded"
        class="w-14 h-14 animate-spin text-[var(--text-important)]"
      />

      <span class="animate-pulse">Завантаження...</span>
    </div>

    <div
      v-else-if="serverError"
      class="basic-back min-h-[220px] flex flex-col items-center justify-center gap-4 text-center"
    >
      <Icon
        name="material-symbols:error-rounded"
        class="w-16 h-16 text-[var(--text-red)]"
      />

      <div class="text-3xl font-black text-[var(--text-red)]">
        {{ serverError }}
      </div>
    </div>

    <template v-else>
      <!-- HEADER -->
      <div class="basic-back border border-[var(--border-main)]">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-5 min-w-0">
            <div
              class="w-24 h-24 rounded-3xl border border-[var(--border-accent)] bg-[var(--yellow-10)] shadow-[0_0_30px_var(--yellow-20)] flex items-center justify-center shrink-0"
            >
              <Icon
                name="material-symbols:person-rounded"
                class="w-14 h-14 text-[var(--text-important)]"
              />
            </div>

            <div class="flex flex-col gap-2 min-w-0">
              <div class="text-5xl font-black leading-none truncate">
                {{ user?.name }}
              </div>

              <div class="text-xl text-[var(--text-secondary)] truncate">
                ID: {{ user?.id }}
              </div>
            </div>
          </div>

          <NuxtLink
            to="/admin/users"
            class="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl border border-[var(--border-main)] text-2xl font-bold hover:border-[var(--border-accent)] hover:bg-[var(--bg-secondary)] transition-all"
          >
            <Icon
              name="material-symbols:arrow-back-rounded"
              class="w-7 h-7 text-[var(--text-important)]"
            />

            <span>Назад</span>
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
        <div class="basic-back !p-4 border border-[var(--border-main)]">
          <div class="flex flex-col gap-6">
            <div class="flex items-center justify-between gap-4">
              <div>
                <div class="text-4xl font-black">Інформація</div>
                <div class="text-xl text-[var(--text-secondary)]">
                  Дані користувача
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex items-center gap-4"
              >
                <Icon
                  name="material-symbols:badge-outline-rounded"
                  class="w-9 h-9 text-[var(--text-important)] shrink-0"
                />

                <div class="flex flex-col gap-1 min-w-0">
                  <div class="text-xl text-[var(--text-secondary)]">Ім’я</div>
                  <div class="text-3xl font-bold truncate">
                    {{ user?.name || "Не вказано" }}
                  </div>
                </div>
              </div>

              <div
                class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex items-center gap-4"
              >
                <Icon
                  name="material-symbols:call-outline-rounded"
                  class="w-9 h-9 text-[var(--text-important)] shrink-0"
                />

                <div class="flex flex-col gap-1 min-w-0">
                  <div class="text-xl text-[var(--text-secondary)]">
                    Номер телефону
                  </div>
                  <div class="text-3xl font-bold truncate">
                    {{ user?.phoneNumber || "Не вказано" }}
                  </div>
                </div>
              </div>

              <button
                type="button"
                @click="copyToClipboard"
                class="md:col-span-2 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex items-center justify-between gap-4 text-left hover:border-[var(--border-accent)] hover:shadow-[0_0_25px_var(--yellow-20)] transition-all"
              >
                <div class="flex items-center gap-4 min-w-0">
                  <Icon
                    name="material-symbols:mail-outline-rounded"
                    class="w-9 h-9 text-[var(--text-important)] shrink-0"
                  />

                  <div class="flex flex-col gap-1 min-w-0">
                    <div class="text-xl text-[var(--text-secondary)]">
                      Email
                    </div>
                    <div class="text-3xl font-bold truncate">
                      {{ user?.email || "Не вказано" }}
                    </div>
                  </div>
                </div>

                <div
                  class="px-4 py-2 rounded-2xl border text-xl font-bold shrink-0 transition-all"
                  :class="
                    emailIsCopied
                      ? 'border-green-400/50 bg-green-500/20 text-green-400'
                      : 'border-[var(--border-accent)] text-[var(--text-important)]'
                  "
                >
                  {{ emailIsCopied ? "Скопійовано" : "Копіювати" }}
                </div>
              </button>

              <div
                class="md:col-span-2 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5"
              >
                <div class="flex items-center gap-3 mb-4">
                  <Icon
                    name="material-symbols:shield-person-rounded"
                    class="w-9 h-9 text-[var(--text-important)]"
                  />

                  <div class="text-2xl font-bold">Ролі користувача</div>
                </div>

                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="role in user?.role || []"
                    :key="role"
                    class="px-4 py-2 rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] text-2xl font-bold text-[var(--text-important)]"
                  >
                    {{ role }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <aside class="flex flex-col gap-6">
          <div class="basic-back !p-4 border border-[var(--border-main)]">
            <div class="flex flex-col gap-5">
              <div>
                <div class="text-4xl font-black">Статуси</div>
                <div class="text-xl text-[var(--text-secondary)]">
                  Стан акаунту
                </div>
              </div>

              <div class="flex flex-col gap-4">
                <div
                  class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex items-center justify-between gap-4"
                >
                  <div class="flex items-center gap-4">
                    <Icon
                      name="material-symbols:verified-user-rounded"
                      class="w-9 h-9 text-[var(--text-important)]"
                    />

                    <div class="text-2xl font-bold">Активація</div>
                  </div>

                  <span
                    class="px-4 py-2 rounded-2xl text-xl font-black"
                    :class="
                      user?.isActivate
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    "
                  >
                    {{ user?.isActivate ? "Активований" : "Неактивований" }}
                  </span>
                </div>

                <div
                  class="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-secondary)] p-5 flex items-center justify-between gap-4"
                >
                  <div class="flex items-center gap-4">
                    <Icon
                      name="streamline-plump:block-1-solid"
                      class="w-9 h-9 text-[var(--text-important)]"
                    />

                    <div class="text-2xl font-bold">Блокування</div>
                  </div>

                  <span
                    class="px-4 py-2 rounded-2xl text-xl font-black"
                    :class="
                      !user?.isBanned
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    "
                  >
                    {{ !user?.isBanned ? "Активний" : "Заблокований" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </template>
  </div>
</template>
