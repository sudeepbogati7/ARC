/**
 * Inlined, render-blocking script that sets the theme before first paint to
 * avoid a flash of the wrong theme (FOUC). Reads a saved override from
 * localStorage; otherwise follows the OS preference.
 *
 * Kept deliberately tiny and dependency-free. Mirrored by ThemeProvider at
 * runtime (which owns toggling + the `theme-change` event).
 */
const script = `(function(){try{
  var saved = localStorage.getItem('archtech-theme');
  var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  var theme = (saved === 'light' || saved === 'dark') ? saved : system;
  document.documentElement.setAttribute('data-theme', theme);
}catch(e){
  document.documentElement.setAttribute('data-theme','dark');
}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
