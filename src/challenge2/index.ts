import { fromEvent, map, tap } from "rxjs";

const input = <HTMLInputElement>document.querySelector("#input")!;
const label1 = document.querySelector("#label1")!;
const label2 = document.querySelector("#label2")!;

const input$ = fromEvent<Event>(input, "input");

const labelText$ = input$.pipe(map((e) => (<HTMLInputElement>e.target).value));

const labelTextReverse$ = labelText$.pipe(
  map((value) => value.split("").reverse().join(""))
);

labelText$
  .pipe(
    tap((value) => {
      label1.textContent = value;
    })
  )
  .subscribe();

labelTextReverse$
  .pipe(
    tap((value) => {
      label2.textContent = value;
    })
  )
  .subscribe();
