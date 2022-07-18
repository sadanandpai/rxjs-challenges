import { fromEvent, map, tap } from 'rxjs';
import '../header';

const input = <HTMLInputElement>document.querySelector('#input')!;
const button = document.querySelector('#clear')!;

const click$ = fromEvent<MouseEvent>(button, 'click');

click$
  .pipe(
    // transform
    map(() => ''),
    // for side effects
    tap((value: string) => {
      input.value = value;
    })
  )
  .subscribe();
