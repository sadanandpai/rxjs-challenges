const level = parseInt(window.location.pathname.split('/challenge').at(-1) ?? '1');
const headerText = 'Challenge ' + level;

document.title = headerText;
const h1 = document.createElement('h1');
h1.textContent = headerText;
document.body.prepend(h1);

const a = document.createElement('a');
a.href = '../../';
a.textContent = 'HOME';
document.body.prepend(a);
