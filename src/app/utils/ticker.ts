export type Listener = (step: number) => void;

export interface Ticker {
  start: (listener: Listener) => void;
  stop: () => void;
}

export class IntervalTicker implements Ticker {
  private id: number | null = null;

  constructor(private step = 10) {}

  start = (listener: Listener) => {
    this.id = setInterval(() => listener(this.step), this.step);
  };

  stop = () => {
    if (this.id !== null) {
      clearInterval(this.id);
    }
  };
}
