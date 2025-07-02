export const TailwindBreakpoint = Object.freeze({
  Base: "base",
  Small: "sm",
  Medium: "md",
  Large: "lg",
  XL: "xl",
  TwoXL: "2xl"
});
export type TailwindBreakpoint =
  (typeof TailwindBreakpoint)[keyof typeof TailwindBreakpoint];
