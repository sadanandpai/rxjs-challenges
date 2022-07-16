import { BehaviorSubject, filter, fromEvent, map, merge, startWith, tap, withLatestFrom } from 'rxjs';
import '../header';

const minus = <HTMLButtonElement>document.querySelector('#minus')!;
const plus = <HTMLButtonElement>document.querySelector('#plus')!;
const label = <HTMLLabelElement>document.querySelector('#label')!;

const state$ = new BehaviorSubject<number>(0);
const minus$ = fromEvent<Event>(minus, 'click').pipe(map(() => -1));
const plus$ = fromEvent<Event>(plus, 'click').pipe(map(() => 1));

merge(minus$, plus$)
  .pipe(
    startWith(0),
    withLatestFrom(state$),
    map(([change, total]: [number, number]) => total + change),
    filter((total: number) => total >= 0),
    tap((total: number) => {
      state$.next(total);
    })
  )
  .subscribe();

state$
  .pipe(
    tap((value: number) => {
      label.textContent = String(value);
    })
  )
  .subscribe();
