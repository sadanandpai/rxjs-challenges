import { fromEvent, map, tap, withLatestFrom } from 'rxjs';
import '../header';

const input = <HTMLInputElement>document.querySelector('#input')!;
const button = <HTMLButtonElement>document.querySelector('#button')!;
const label = <HTMLLabelElement>document.querySelector('#label')!;

const input$ = fromEvent<Event>(input, 'input').pipe(map((e: Event) => (<HTMLInputElement>e.target).value));
const click$ = fromEvent<Event>(button, 'click');

click$
  .pipe(
    // get latest value from input$ on every click
    withLatestFrom(input$),
    map(([_, input]: [Event, string]) => input),
    tap((value: string) => {
      label.textContent = value;
    })
  )
  .subscribe();
