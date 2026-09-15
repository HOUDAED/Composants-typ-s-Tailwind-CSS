import { Link } from 'react-router-dom';

export function Accueil() {
  return (
    <section className="space-y-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Votre prochaine séance</p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
        Trouvez le film qui mérite votre soirée.
      </h1>
      <p className="max-w-2xl text-lg leading-8 text-slate-600">
        Explorez le catalogue OMDb et retrouvez rapidement les informations essentielles de vos films préférés.
        Mettez vos découvertes de côté dans une liste de favoris personnelle.
      </p>
      <Link to="/recherche" className="inline-flex rounded-md bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2">
        Commencer une recherche
      </Link>
    </section>
  );
}
