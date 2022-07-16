import {
  BehaviorSubject,
  fromEvent,
  map,
  merge,
  startWith,
  tap,
  withLatestFrom,
} from "rxjs";

const minus = <HTMLButtonElement>document.querySelector("#minus")!;
const plus = <HTMLButtonElement>document.querySelector("#plus")!;
const input = <HTMLInputElement>document.querySelector("#input")!;

const state$ = new BehaviorSubject<number>(0);
const minus$ = fromEvent<Event>(minus, "click").pipe(map(() => -1));
const plus$ = fromEvent<Event>(plus, "click").pipe(map(() => 1));
const input$ = fromEvent<Event>(input, "input").pipe(
  map((e) => (<HTMLInputElement>e.target).value),
  map((value) => parseInt(value)),
  map((value) => (Number.isNaN(value) ? 0 : value))
);

merge(minus$, plus$)
  .pipe(
    startWith(0),
    withLatestFrom(state$),
    map(([change, total]) => total + change),
    tap((total) => {
      state$.next(total);
    })
  )
  .subscribe();

input$
  .pipe(
    tap((value) => {
      state$.next(value);
    })
  )
  .subscribe();

state$
  .pipe(
    tap((value) => {
      input.value = String(value);
    })
  )
  .subscribe();
