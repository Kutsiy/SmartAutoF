export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    await useMyFetch("/user/isadmin", {
      headers: useRequestHeaders(["cookie"]),
    });
  } catch {
    return navigateTo("/");
  }
});
