import { fromEvent, interval, map, takeUntil } from "rxjs";

const timer = <HTMLLabelElement>document.querySelector("#timer")!;
const start = <HTMLButtonElement>document.querySelector("#start")!;
const stop = <HTMLButtonElement>document.querySelector("#stop")!;

const startClick$ = fromEvent(start, "click").pipe(map(() => true));
const stopClick$ = fromEvent(stop, "click").pipe(map(() => false));

let tenthSecond$ = interval(100);
startClick$.subscribe(() => {
  tenthSecond$
    .pipe(
      map((item) => item / 10),
      takeUntil(stopClick$)
    )
    .subscribe((num) => (timer.textContent = num + "s"));
});
