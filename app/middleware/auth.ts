export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    await useMyFetch("/auth/check", {
      headers: useRequestHeaders(["cookie"]),
    });
  } catch {
    return navigateTo("/");
  }
});
