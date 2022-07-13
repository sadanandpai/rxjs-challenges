import { Subject, fromEvent, map, merge, tap } from "rxjs";

const button1 = <HTMLButtonElement>document.querySelector("#button1")!;
const button2 = <HTMLButtonElement>document.querySelector("#button2")!;
const label = <HTMLLabelElement>document.querySelector("#label")!;

const state$ = new Subject<string>();

const getTextContent = (event: Event) =>
  (<HTMLButtonElement>event.target).textContent!;

const text1$ = fromEvent<Event>(button1, "click").pipe(map(getTextContent));
const text2$ = fromEvent<Event>(button2, "click").pipe(map(getTextContent));

merge(text1$, text2$)
  .pipe(tap((str) => state$.next(str)))
  .subscribe();

state$
  .pipe(
    tap((value) => {
      label.textContent = value;
    })
  )
  .subscribe();
