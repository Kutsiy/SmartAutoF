type Opts = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<any, any>;
};

export const useMyFetch = async (request: string, opts?: Opts) => {
  const baseURL = "http://localhost:8000";
  let data;
  try {
    data = await $fetch(request, {
      baseURL,
      credentials: "include",
      ...opts,
    });
  } catch (err: any) {
    if (err?.response?.status !== 401) {
      throw err;
    }

    await $fetch("/auth/refresh", {
      baseURL,
      credentials: "include",
    });

    data = await $fetch(request, {
      baseURL,
      credentials: "include",
      ...opts,
    });
  }
  return data;
};
