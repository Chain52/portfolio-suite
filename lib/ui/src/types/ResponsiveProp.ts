import TailwindBreakpoint from './TailwindBreakpoint';

type ResponsiveProp<T> = T | { [key in TailwindBreakpoint]?: T };

export default ResponsiveProp;
