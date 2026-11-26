import './styles/index.css';
import './controller.js';
import './demo4-ui.js';
import './tab-motion.js';

// Controllers install document-level listeners once; reload them cleanly on edits.
if (import.meta.hot) {
  import.meta.hot.accept(() => window.location.reload());
}
