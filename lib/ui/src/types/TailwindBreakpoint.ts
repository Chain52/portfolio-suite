const TailwindBreakpoint = Object.freeze({
  Base: 'base',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  XL: 'xl',
  TwoXL: '2xl'
});
type TailwindBreakpoint =
  (typeof TailwindBreakpoint)[keyof typeof TailwindBreakpoint];

export default TailwindBreakpoint;
