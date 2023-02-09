// @ts-ignore
const { Typed } = window;

const typed2 = new Typed('#strike', {
  strings: [
    'search',
    'recherche',
    'procurar',
    "検索",
    'поиск',
    'खोज',
    'ricerca',
  ],
  typeSpeed: 80,
  backSpeed: 60,
  smartBackspace: false,
  loop: true,
  shuffle: false,
  backDelay: 2000,
  startDelay: 3000,
});

// force the start of cursor animation while the `startDelay` is ticking
if (typed2.cursor != null) {
  // can't use `toggleBlinking(true)` here, as it has some extra checks
  // whether animation has started...which defeats the purpose
  typed2.cursor.classList.add('typed-cursor--blink');
}
