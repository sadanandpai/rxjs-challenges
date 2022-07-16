import { exhaustMap, fromEvent, interval, map, takeUntil, tap } from 'rxjs';
import '../header';

const timer = <HTMLLabelElement>document.querySelector('#timer')!;
const start = <HTMLButtonElement>document.querySelector('#start')!;
const stop = <HTMLButtonElement>document.querySelector('#stop')!;

const startClick$ = fromEvent(start, 'click');
const stopClick$ = fromEvent(stop, 'click');

let tenthSecondTillStopped$ = interval(100).pipe(takeUntil(stopClick$));
startClick$
  .pipe(
    exhaustMap(() => tenthSecondTillStopped$),
    map((item: number) => item / 10),
    tap((num) => {
      timer.textContent = num + 's';
    })
  )
  .subscribe();
