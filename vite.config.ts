import { defineConfig } from 'vite';
import { resolve } from 'path';

const challenges = new Array(11)
  .fill(0)
  .map((_, idx) => `./src/challenge${idx + 1}/`)
  .reduce((acc, cur, idx) => {
    acc['challenge' + (idx + 1)] = resolve(cur, 'index.html');
    return acc;
  }, {});

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rxjs-challenges/dist/',
  build: {
    rollupOptions: {
      input: {
        main: resolve('.', 'index.html'),
        ...challenges,
      },
    },
  },
});
