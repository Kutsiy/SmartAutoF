export const useBodyFetch = async (request: string, opts: any) => {
  const baseURL = "http://localhost:8000";
  return await $fetch(request, { baseURL, credentials: "include", ...opts });
};
