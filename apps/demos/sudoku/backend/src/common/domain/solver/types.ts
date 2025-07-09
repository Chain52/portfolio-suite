import SolutionTracer from './SolutionTracer';

export interface Technique {
  apply(tracer: SolutionTracer): void;
}
