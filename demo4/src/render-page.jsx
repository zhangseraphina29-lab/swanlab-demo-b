import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { App } from './App.jsx';

const root = createRoot(document.getElementById('app'));
let revision = 0;

export function renderPage(markup) {
  // Existing widgets move DOM nodes and bind native listeners after each render.
  // Replacing this boundary keeps those mutations outside React reconciliation.
  flushSync(() => root.render(<App key={++revision} markup={markup} />));
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}
