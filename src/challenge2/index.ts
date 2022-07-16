import { fromEvent, map, tap } from 'rxjs';
import '../header';

const input = <HTMLInputElement>document.querySelector('#input')!;
const label1 = document.querySelector('#label1')!;
const label2 = document.querySelector('#label2')!;

const input$ = fromEvent<Event>(input, 'input');

const labelText$ = input$.pipe(map((e: Event) => (<HTMLInputElement>e.target).value));

const labelTextReverse$ = labelText$.pipe(map((value: string) => value.split('').reverse().join('')));

labelText$
  .pipe(
    tap((value: string) => {
      label1.textContent = value;
    })
  )
  .subscribe();

labelTextReverse$
  .pipe(
    tap((value: string) => {
      label2.textContent = value;
    })
  )
  .subscribe();
