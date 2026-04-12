<template>
  <NuxtLayout name="register">
    <form class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <UiInput placeholder="Name" label="Name:" />
        <UiInput placeholder="Email" label="Email:" type="email" />
        <UiInput placeholder="Password" label="Password:" type="password" />
        <UiInput
          placeholder="Confirm password"
          label="Confirm password:"
          type="password"
        />
      </div>
      <button
        class="w-full p-2 font-bold flex items-center justify-center border-2 border-[var(--yellow-90)] rounded-md bg-[var(--yellow-500)] hover:bg-[var(--yellow-600)] transition-colors text-[var(--text-black)]"
      >
        Sign Up
      </button>
    </form>
  </NuxtLayout>
</template>
