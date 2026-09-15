import { RechercheFilms } from '../composants/RechercheFilms';

export function Recherche() {
  return (
    <section className="space-y-3">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Catalogue</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Recherche de films</h1>
      </div>
      <RechercheFilms />
    </section>
  );
}
