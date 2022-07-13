import { fromEvent, map, merge, scan, startWith, tap } from "rxjs";

const minus = <HTMLButtonElement>document.querySelector("#minus")!;
const plus = <HTMLButtonElement>document.querySelector("#plus")!;
const label = <HTMLLabelElement>document.querySelector("#label")!;

const minus$ = fromEvent<Event>(minus, "click").pipe(map(() => -1));
const plus$ = fromEvent<Event>(plus, "click").pipe(map(() => 1));

merge(minus$, plus$)
  .pipe(
    startWith(0),
    scan((v, prevV) => v + prevV),
    tap((value) => {
      label.textContent = String(value);
    })
  )
  .subscribe();
