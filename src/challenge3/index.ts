import { fromEvent, map, tap } from "rxjs";

const reverse = (s: string) => s.split("").reverse().join("");

const input = <HTMLInputElement>document.querySelector("#input")!;
const label = document.querySelector("#label")!;

const input$ = fromEvent<Event>(input, "input");

input$
  .pipe(
    map((e) => (<HTMLInputElement>e.target).value),
    map((str) => reverse(str)),
    tap((value) => {
      label.textContent = value;
    })
  )
  .subscribe();
