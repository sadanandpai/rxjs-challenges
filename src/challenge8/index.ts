import { BehaviorSubject, fromEvent, map, merge, startWith, tap, withLatestFrom } from 'rxjs';
import '../header';

const minus = <HTMLButtonElement>document.querySelector('#minus')!;
const plus = <HTMLButtonElement>document.querySelector('#plus')!;
const input = <HTMLInputElement>document.querySelector('#input')!;

const state$ = new BehaviorSubject<number>(0);
const minus$ = fromEvent<Event>(minus, 'click').pipe(map(() => -1));
const plus$ = fromEvent<Event>(plus, 'click').pipe(map(() => 1));
const input$ = fromEvent<Event>(input, 'input').pipe(
  map((e: Event) => (<HTMLInputElement>e.target).value),
  map((value: string) => parseInt(value)),
  map((value: number) => (Number.isNaN(value) ? 0 : value))
);

merge(minus$, plus$)
  .pipe(
    startWith(0),
    withLatestFrom(state$),
    map(([change, total]: [number, number]) => total + change),
    tap((total: number) => {
      state$.next(total);
    })
  )
  .subscribe();

input$
  .pipe(
    tap((value: number) => {
      state$.next(value);
    })
  )
  .subscribe();

state$
  .pipe(
    tap((value: number) => {
      input.value = String(value);
    })
  )
  .subscribe();
