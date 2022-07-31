import { catchError, debounceTime, distinctUntilChanged, filter, from, fromEvent, map, of, switchMap, tap } from 'rxjs';
import { startups } from '../data';
import '../header';

const searchEl = document.querySelector('#search')!;
const loader: HTMLElement = document.querySelector('.loader')!;
const listEl = document.querySelector('#list')!;
const search$ = fromEvent(searchEl, 'input').pipe(map((e: Event) => (<HTMLInputElement>e.target).value));

const http = (url: string) => {
  const rndInterval = Math.floor(Math.random() * 3000);
  const searchText = new URL(url).searchParams.get('search')?.toLowerCase();

  if (!searchText) {
    return of<typeof startups>([]);
  }

  const filteredCompanies = startups.filter((company) => company.toLowerCase().includes(searchText));
  return from(
    new Promise<typeof startups>((resolve, reject) => {
      if (rndInterval > 2500) {
        setTimeout(reject, rndInterval - 1000);
      } else {
        setTimeout(resolve, rndInterval, filteredCompanies);
      }
    })
  );
};

search$
  .pipe(
    debounceTime(333),
    distinctUntilChanged(),
    tap(() => {
      listEl.innerHTML = 'Enter atleast 2 chars';
      loader.style.display = 'none';
    }),
    filter((searchText) => searchText.length > 1),
    tap(() => {
      listEl.innerHTML = '';
      loader.style.display = 'block';
    }),
    switchMap((searchText) => http('https://startups.com?search=' + searchText)),
    map((items: typeof startups) => items.slice(0, 5)),
    tap((items: typeof startups) => {
      if (items.length === 0) {
        listEl.innerHTML = 'No results found';
        loader.style.display = 'none';
      }
    }),
    filter((items: typeof startups) => items.length > 0),
    map((companies: typeof startups) => companies.map((company) => `<li>${company}</li>`).join('')),
    tap((html) => {
      listEl.innerHTML = html;
      loader.style.display = 'none';
    }),
    catchError((_, obs) => {
      listEl.innerHTML = 'Something went wrong!!!';
      loader.style.display = 'none';
      return obs;
    })
  )
  .subscribe();
