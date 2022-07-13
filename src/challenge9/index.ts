import { combineLatest, fromEvent, map, pipe, startWith, tap } from "rxjs";

const input1 = <HTMLInputElement>document.querySelector("#input1")!;
const input2 = <HTMLInputElement>document.querySelector("#input2")!;
const label = <HTMLLabelElement>document.querySelector("#label")!;

const fetchValueFromInput = pipe(
  map((e: Event) => (<HTMLInputElement>e.target).value),
  map((v) => parseInt(v)),
  map((v) => (Number.isNaN(v) ? 0 : v)),
  startWith(0)
);

const input1$ = fromEvent<Event>(input1, "input").pipe(fetchValueFromInput);
const input2$ = fromEvent<Event>(input2, "input").pipe(fetchValueFromInput);

combineLatest([input1$, input2$])
  .pipe(
    map(([num1, num2]) => num1 + num2),
    tap((v) => {
      label.textContent = String(v);
    })
  )
  .subscribe();
