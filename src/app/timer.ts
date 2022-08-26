import { Observable } from 'rxjs';
import { State } from './interface';

export abstract class Timer {
  abstract get state$(): Observable<State>;
  abstract get state(): State;
  abstract get time$(): Observable<number>;
  abstract get time(): number;
  abstract start(): void;
  abstract stop(): void;
}
