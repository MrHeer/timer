export type Listener = () => void;

export type Ticker = {
  onTick: (listener: Listener) => void;
};

export const requestAnimationTicker: Ticker = {
  onTick: requestAnimationFrame,
};
