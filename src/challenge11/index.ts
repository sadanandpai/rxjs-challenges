import {
  fromEvent,
  interval,
  map,
  merge,
  BehaviorSubject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
  distinctUntilChanged,
  filter,
  throttleTime,
} from 'rxjs';
import '../header';

const timer = <HTMLLabelElement>document.querySelector('#timer')!;
const start = <HTMLButtonElement>document.querySelector('#start')!;
const reset = <HTMLButtonElement>document.querySelector('#reset')!;
const pause = <HTMLButtonElement>document.querySelector('#pause')!;
const lap = <HTMLButtonElement>document.querySelector('#lap')!;
const laps = <HTMLButtonElement>document.querySelector('.laps')!;

const state$ = new BehaviorSubject<number>(0);
const start$ = fromEvent(start, 'click').pipe(map(() => true));
const pause$ = fromEvent(pause, 'click').pipe(map(() => false));
const reset$ = fromEvent(reset, 'click').pipe(map(() => false));
const lap$ = fromEvent(lap, 'click').pipe(map(() => false));

const tenthSecondTillStopped$ = interval(100).pipe(takeUntil(merge(pause$, reset$)));

start$
  .pipe(
    // limit the number clicks
    throttleTime(500),
    // unsubscribes inner observable on start click
    switchMap(() => tenthSecondTillStopped$),
    withLatestFrom(state$),
    map(([_, value]) => value + 0.1),
    map((value) => +value.toFixed(1)),
    tap((num) => {
      state$.next(num);
    })
  )
  .subscribe();

reset$
  .pipe(
    tap(() => {
      state$.next(0);
      laps.innerHTML = '';
    })
  )
  .subscribe();

lap$
  .pipe(
    withLatestFrom(state$),
    // fetch only unique values
    distinctUntilChanged((prev, [_, time]) => prev[1] === time),
    filter(([_, value]) => !!value),
    map(([_, value]) => {
      const li = document.createElement('li');
      li.textContent = `${value} seconds`;
      return li;
    }),
    tap((el) => laps.prepend(el))
  )
  .subscribe();

state$
  .pipe(
    tap((num) => {
      timer.textContent = num + 's';
    })
  )
  .subscribe();
