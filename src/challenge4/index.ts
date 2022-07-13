import { fromEvent, map, merge, tap } from "rxjs";

const button1 = <HTMLButtonElement>document.querySelector("#button1")!;
const button2 = <HTMLButtonElement>document.querySelector("#button2")!;
const label = <HTMLLabelElement>document.querySelector("#label")!;

const text1$ = fromEvent<Event>(button1, "click").pipe(
  map((event) => (<HTMLButtonElement>event.target).textContent)
);
const text2$ = fromEvent<Event>(button2, "click").pipe(
  map((event) => (<HTMLButtonElement>event.target).textContent)
);

merge(text1$, text2$)
  .pipe(
    tap((value) => {
      label.textContent = value;
    })
  )
  .subscribe();
