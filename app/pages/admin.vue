<script setup>
import { NavCol, NavColTitle } from "~/components/ui/nav-col";
</script>

<template>
  <div class="min-h-screen container mx-auto p-4">
    <div class="grid grid-cols-[260px_1fr] gap-6 min-h-[calc(100vh-32px)]">
      <aside
        class="sticky top-4 h-[calc(100vh-32px)] overflow-y-auto scroll-bar basic-back border border-[var(--border-main)] rounded-[28px] p-4 flex flex-col gap-5 shadow-[0_0_30px_var(--shadow-soft)]"
      >
        <div
          class="rounded-2xl border border-[var(--border-accent)] bg-[var(--yellow-10)] p-4 flex items-center gap-3"
        >
          <div
            class="w-12 h-12 rounded-2xl bg-[var(--accent-primary)] flex items-center justify-center shadow-[0_0_20px_var(--accent-glow)]"
          >
            <Icon
              name="material-symbols:admin-panel-settings-rounded"
              class="w-8 h-8 text-black"
            />
          </div>

          <div class="flex flex-col leading-none">
            <div class="text-2xl font-black">Admin</div>
            <div class="text-lg text-[var(--text-secondary)]">Panel</div>
          </div>
        </div>

        <NavCol>
          <NavColTitle name="material-symbols:person-rounded">
            Профіль
          </NavColTitle>

          <NuxtLink class="nav-link" to="/">
            <Icon name="material-symbols:home-rounded" class="nav-icon" />
            <span>Головна</span>
          </NuxtLink>

          <NuxtLink class="nav-link" to="/account">
            <Icon
              name="material-symbols:account-circle-full"
              class="nav-icon"
            />
            <span>Акаунт</span>
          </NuxtLink>
        </NavCol>

        <NavCol>
          <NavColTitle name="eos-icons:admin" class="relative top-1.5">
            Адмін панель
          </NavColTitle>

          <NuxtLink class="nav-link" to="/admin">
            <Icon name="material-symbols:dashboard-rounded" class="nav-icon" />
            <span>Панель приладів</span>
          </NuxtLink>

          <NuxtLink class="nav-link" to="/admin/users">
            <Icon name="material-symbols:group-rounded" class="nav-icon" />
            <span>Користувачі</span>
          </NuxtLink>

          <NuxtLink class="nav-link" to="/admin/appointments">
            <Icon
              name="material-symbols:calendar-month-rounded"
              class="nav-icon"
            />
            <span>Замовлення</span>
          </NuxtLink>

          <NuxtLink class="nav-link" to="/admin/consultation">
            <Icon
              name="material-symbols:support-agent-rounded"
              class="nav-icon"
            />
            <span>Консультації</span>
          </NuxtLink>
        </NavCol>

        <NavCol>
          <NavColTitle name="mingcute:hammer-fill" class="relative top-1.5">
            Створення
          </NavColTitle>

          <NuxtLink class="nav-link" to="/admin/create">
            <Icon name="material-symbols:add-circle-rounded" class="nav-icon" />
            <span>Створити</span>
          </NuxtLink>
        </NavCol>
      </aside>

      <!-- CONTENT -->
      <main
        class="min-w-0 basic-back border border-[var(--border-main)] rounded-[32px] p-4 shadow-[0_0_40px_var(--shadow-soft)] overflow-hidden"
      >
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped>
.scroll-bar {
  scrollbar-width: thin;
  scrollbar-color: var(--border-accent) transparent;
}

.scroll-bar::-webkit-scrollbar {
  width: 6px;
}

.scroll-bar::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background: var(--border-accent);
  border-radius: 999px;
}

.nav-link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 16px;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-secondary);
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    border-color 0.25s ease;
  border: 1px solid transparent;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
  border-color: var(--border-accent);
  transform: translateX(4px);
}

.nav-icon {
  width: 24px;
  height: 24px;
  color: var(--text-important);
}

.router-link-exact-active.nav-link {
  color: var(--text-black);
  background: var(--accent-primary);
  border-color: var(--border-accent);
  box-shadow: 0 0 20px var(--accent-glow);
}

.router-link-exact-active .nav-icon {
  color: var(--text-black);
}
</style>
