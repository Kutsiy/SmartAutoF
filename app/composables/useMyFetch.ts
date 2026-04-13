export const useMyFetch: typeof useFetch = (request, opts) => {
  const baseURL = "http://localhost:8000";
  return useFetch(request, { baseURL, credentials: "include", ...opts });
};
