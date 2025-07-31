const LoadStatus = Object.freeze({
  Idle: 'idle',
  Loading: 'loading',
  Loaded: 'loaded'
});
type LoadStatus = (typeof LoadStatus)[keyof typeof LoadStatus];

export default LoadStatus;
