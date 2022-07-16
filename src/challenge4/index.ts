import { Subject, fromEvent, map, merge, tap, Observable } from 'rxjs';
import '../header';

const buttons = Array.from(document.querySelectorAll('button'));
const label = <HTMLLabelElement>document.querySelector('#label')!;

const state$ = new Subject<string>();

const getTextContent = (event: Event) => (<HTMLButtonElement>event.target).textContent!;

const buttonsObservables: Observable<string>[] = buttons.map((button) =>
  fromEvent<Event>(button, 'click').pipe(map(getTextContent))
);

merge(...buttonsObservables)
  .pipe(tap((str: string) => state$.next(str)))
  .subscribe();

state$
  .pipe(
    tap((value: string) => {
      label.textContent = value;
    })
  )
  .subscribe();
