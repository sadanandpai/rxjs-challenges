import { fromEvent, map, tap } from "rxjs";

const input = <HTMLInputElement>document.querySelector("#input")!;
const button = document.querySelector("#clear")!;

const click$ = fromEvent<MouseEvent>(button, "click");

click$
  .pipe(
    map(() => ""),
    tap((value) => {
      input.value = value;
    })
  )
  .subscribe();
