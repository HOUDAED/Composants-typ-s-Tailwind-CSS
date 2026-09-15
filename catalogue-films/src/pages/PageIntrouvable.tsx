import { Link } from 'react-router-dom';

export function PageIntrouvable() {
  return (
    <section className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">404</p>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cette page n'existe pas.</h1>
      <Link to="/" className="font-semibold text-blue-700 hover:text-blue-800">Retourner à l'accueil</Link>
    </section>
  );
}
