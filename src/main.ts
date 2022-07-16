import "./style.css";

import { map, range, tap } from "rxjs";

const challengesCount = 10;
const main = document.querySelector("main")!;

const createChallengeAnchorElement = (idx: number) => {
  const a = document.createElement("a");
  a.classList.add("challenge");
  a.textContent = `Challenge ${idx}`;
  a.href = `/src/challenge${idx}/`;
  return a;
};

range(1, challengesCount)
  .pipe(
    map(createChallengeAnchorElement),
    tap((el) => main.appendChild(el))
  )
  .subscribe();
