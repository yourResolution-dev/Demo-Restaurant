import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Fonts the first screen needs. They are preloaded in index.html, so they download in
// parallel with this script; waiting for them avoids the text jumping when they swap in.
const CRITICAL_FONTS = [
  '700 1em "Playfair Display"',
  'italic 400 1em "Playfair Display"',
  '400 1em "Plus Jakarta Sans"',
  'italic 400 1em "Cormorant Garamond"',
];
const FONT_WAIT_MS = 1000;

const fontsReady = Promise.race([
  Promise.all(CRITICAL_FONTS.map((font) => document.fonts.load(font))),
  new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS)),
]).catch(() => undefined);

fontsReady.then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
