import { fromEvent, map, tap } from 'rxjs';
import '../header';

const input = <HTMLInputElement>document.querySelector('#input')!;
const button = document.querySelector('#clear')!;

const click$ = fromEvent<MouseEvent>(button, 'click');

click$
  .pipe(
    map(() => ''),
    tap((value: string) => {
      input.value = value;
    })
  )
  .subscribe();
