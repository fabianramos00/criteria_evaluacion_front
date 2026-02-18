import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';
import './styles/tokens.css';
import './index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <App />,
);
