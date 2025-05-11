import ReactDOM from 'react-dom/client';
import App from "./App.jsx"

console.log("ChefClaude: index.jsx script started.");
const rootElement = document.getElementById('root');

if (rootElement) {
  console.log("ChefClaude: Found root element with ID 'root'. Rendering React app...");
  ReactDOM.createRoot(rootElement).render(<App />);
  console.log("ChefClaude: React app rendering initiated.");
} else {
  console.error("ChefClaude: CRITICAL - Root element with ID 'root' not found in your HTML. React cannot mount the application. Please ensure your main HTML file (e.g., index.html or public/index.html) contains a line like: <div id=\"root\"></div>");
}