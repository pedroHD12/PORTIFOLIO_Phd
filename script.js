export function createNavigationController({ menu, button, documentRef = document }) {
  const isOpen = () => menu.getAttribute('data-open') === 'true';

  const setOpen = (open) => {
    menu.setAttribute('data-open', String(open));
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  const close = () => setOpen(false);
  const toggle = () => setOpen(!isOpen());

  button.addEventListener('click', toggle);
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });
  documentRef.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      close();
      button.focus();
    }
  });
  documentRef.addEventListener('click', (event) => {
    if (isOpen() && !menu.contains(event.target) && !button.contains(event.target)) close();
  });

  return { close, toggle };
}

if (typeof document !== 'undefined') {
  const menu = document.getElementById('site-navigation');
  const button = document.getElementById('menu-toggle');
  if (menu && button) createNavigationController({ menu, button });
}