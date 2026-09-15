import { RechercheFilms } from './composants/RechercheFilms';

function App() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            TP4 · React, TypeScript & API
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Recherche de films
          </h1>
          <p className="max-w-2xl text-slate-600">
            Recherchez un titre dans le catalogue OMDb.
          </p>
        </header>

        <RechercheFilms />
      </div>
    </main>
  );
}

export default App;
