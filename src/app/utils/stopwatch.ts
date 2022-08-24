import { requestAnimationTicker } from './ticker';

export class Stopwatch {
  private startTime: number | null = null;
  private stopTime: number | null = null;
  private currentTime: number;

  constructor(ticker = requestAnimationTicker) {
    this.currentTime = Stopwatch.getCurrentTime();
    ticker.onTick(this.tick);
  }

  start = () => {
    this.startTime = Stopwatch.getCurrentTime();
  };

  tick = () => {
    this.currentTime = Stopwatch.getCurrentTime();
  };

  stop = () => {
    this.stopTime = Stopwatch.getCurrentTime();
  };

  reset = () => {
    this.startTime = null;
    this.stopTime = null;
  };

  get duration() {
    this.assertStarted();
    if (this.isStop()) {
      return this.stopTime! - this.startTime!;
    }
    return this.currentTime - this.startTime!;
  }

  isStart = () => {
    return this.startTime !== null;
  };

  isStop = () => {
    return this.stopTime !== null;
  };

  private assertStarted = () => {
    if (!this.isStart()) {
      throw 'Please start the timer.';
    }
  };

  static getCurrentTime = () => {
    return new Date().getTime();
  };
}
