import { filter, fromEvent, map, tap } from 'rxjs';
import { startups } from '../data';
import '../header';

const searchEl = document.querySelector('#search')!;
const listEl = document.querySelector('#list')!;
const search$ = fromEvent(searchEl, 'input').pipe(map((e: Event) => (<HTMLInputElement>e.target).value));

search$
  .pipe(
    tap(() => (listEl.innerHTML = '')),
    filter((text) => text !== ''),
    map((text) => text.toLowerCase()),
    map((text) => startups.filter((item) => item.toLowerCase().includes(text))),
    map((items: typeof startups) => items.slice(0, 5)),
    map((items) => items.map((item) => `<li>${item}</li>`).join('')),
    tap((itemsEl) => {
      listEl.innerHTML = itemsEl;
    })
  )
  .subscribe();
