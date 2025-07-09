export const mockReadOnlyPropertyDescriptor = <T>(res: T) => ({
  configurable: true,
  enumerable: true,
  get: (): T => res
});
