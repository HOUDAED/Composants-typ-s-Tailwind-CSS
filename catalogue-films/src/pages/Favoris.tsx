import { Link } from 'react-router-dom';
import { Bouton } from '../composants/Bouton';
import { CarteFilm } from '../composants/CarteFilm';
import { useFavoris } from '../contextes/FavorisContext';

export function Favoris() {
  const { favoris, dispatch } = useFavoris();

  if (favoris.length === 0) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mes favoris</h1>
        <p className="text-slate-600">Vous n'avez encore mis aucun film de côté.</p>
        <Link to="/recherche" className="font-semibold text-blue-700 hover:text-blue-800">Découvrir des films</Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Votre sélection</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mes favoris</h1>
        </div>
        <Bouton libelle="Vider la liste" variante="danger" onClick={() => dispatch({ type: 'vider' })} />
      </div>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {favoris.map((film) => (
          <li key={film.imdbID} className="list-none">
            <CarteFilm film={film} />
            <Bouton libelle="Retirer" variante="secondaire" onClick={() => dispatch({ type: 'retirer', id: film.imdbID })} />
          </li>
        ))}
      </ul>
    </section>
  );
}
