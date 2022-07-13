import { fromEvent, map, tap } from "rxjs";

const input = <HTMLInputElement>document.querySelector("#input")!;
const label = document.querySelector("#label")!;

const input$ = fromEvent<Event>(input, "input");

input$
  .pipe(
    map((e) => (<HTMLInputElement>e.target).value),
    tap((value) => {
      label.textContent = value;
    })
  )
  .subscribe();
