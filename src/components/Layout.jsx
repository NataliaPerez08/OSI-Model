export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">Modelo OSI – Animación</h1>
        <p className="text-xs text-slate-400">
          Demo en React + Vite + Tailwind para GitHub Pages
        </p>
      </header>
      <main className="p-6 flex-1">{children}</main>
      <footer className="border-t border-slate-800 text-xs text-slate-500 text-center py-3">
        Hecho para pruebas y portafolio · by Natalia (+ un bot)
      </footer>
    </div>
  );
}
