import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Disable developer tools and prevent copying
if (process.env.NODE_ENV === 'production') {
  // Disable right click
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Disable keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Prevent F12 key
    if (e.key === 'F12') e.preventDefault();
    
    // Prevent Ctrl+Shift+I (Chrome dev tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') e.preventDefault();
    
    // Prevent Ctrl+Shift+J (Chrome dev tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') e.preventDefault();
    
    // Prevent Ctrl+Shift+C (Chrome dev tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') e.preventDefault();
    
    // Prevent Ctrl+U (View source)
    if (e.ctrlKey && e.key === 'u') e.preventDefault();
  });

  // Disable developer tools
  window.addEventListener('devtoolschange', function(e: CustomEvent) {
    if ((e as CustomEvent<{ isOpen: boolean }>).detail.isOpen) {
      window.location.reload();
    }
  } as EventListener);
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);