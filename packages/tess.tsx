import Example from './Example';
import { createRoot } from './reacts-dom/root/index';

const root = createRoot(document.querySelector('#root'));
root.render(<Example />);
