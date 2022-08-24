export class Stopwatch {
  private startTime: number | null = null;
  private stopTime: number | null = null;

  constructor() {}

  start = () => {
    this.startTime = Stopwatch.getCurrentTime();
  };

  stop = () => {
    this.stopTime = Stopwatch.getCurrentTime();
  };

  reset = () => {
    this.startTime = null;
    this.stopTime = null;
  };

  get duration() {
    if (!this.isStart()) {
      return 0;
    }

    if (this.isStop()) {
      return this.stopTime! - this.startTime!;
    }

    // Stopwatch is running.
    const currentTime = Stopwatch.getCurrentTime();
    return currentTime - this.startTime!;
  }

  isStart = () => {
    return this.startTime !== null;
  };

  isStop = () => {
    return this.stopTime !== null;
  };

  static getCurrentTime = () => {
    return new Date().getTime();
  };
}
