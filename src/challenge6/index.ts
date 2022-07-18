import { fromEvent, map, merge, scan, startWith, tap } from 'rxjs';
import '../header';

const minus = <HTMLButtonElement>document.querySelector('#minus')!;
const plus = <HTMLButtonElement>document.querySelector('#plus')!;
const label = <HTMLLabelElement>document.querySelector('#label')!;

const minus$ = fromEvent<Event>(minus, 'click').pipe(map(() => -1));
const plus$ = fromEvent<Event>(plus, 'click').pipe(map(() => 1));

merge(minus$, plus$)
  .pipe(
    // starting value of the stream
    startWith(0),
    // state in functional way
    scan((v: number, prevV: number) => v + prevV),
    tap((value: number) => {
      label.textContent = String(value);
    })
  )
  .subscribe();
