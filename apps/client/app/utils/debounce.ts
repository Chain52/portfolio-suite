export function debounce(callback: () => void, ms = 1000) {
  let timer: NodeJS.Timeout | undefined;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      callback();
    }, ms);
  };
}
