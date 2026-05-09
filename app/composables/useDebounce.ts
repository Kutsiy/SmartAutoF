export const useDebounce = () => {
  return function debounce(func: (...args: any[]) => any, timeout = 300) {
    let timer: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: any[]) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };
};
