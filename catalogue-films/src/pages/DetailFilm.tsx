import { useParams } from 'react-router-dom';
import { Bouton } from '../composants/Bouton';
import { useFavoris } from '../contextes/FavorisContext';
import { useFetch } from '../hooks/useFetch';
import { type FilmDetailOmdb, urlDetail } from '../lib/omdb';

export function DetailFilm() {
  const { id } = useParams();
  const { donnees, chargement, erreur } = useFetch<FilmDetailOmdb>(id ? urlDetail(id) : null);
  const { favoris, dispatch } = useFavoris();

  if (chargement) return <p className="text-slate-600">Chargement…</p>;
  if (erreur) return <p role="alert" className="text-red-600">{erreur}</p>;
  if (!donnees || donnees.Response === 'False') {
    return <p className="text-slate-600">Ce film est introuvable.</p>;
  }

  const estFavori = favoris.some((film) => film.imdbID === donnees.imdbID);
  const filmPourFavoris = {
    imdbID: donnees.imdbID,
    Title: donnees.Title,
    Year: donnees.Year,
    Type: donnees.Type,
    Poster: donnees.Poster,
  };

  return (
    <article className="grid gap-8 md:grid-cols-[minmax(220px,300px)_1fr]">
      {donnees.Poster === 'N/A' ? (
        <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-slate-200 text-slate-500">Pas d'affiche</div>
      ) : (
        <img src={donnees.Poster} alt={`Affiche de ${donnees.Title}`} className="w-full rounded-xl object-cover shadow-sm" />
      )}
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Détail du film</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">{donnees.Title}</h1>
          <p className="mt-2 text-slate-500">{donnees.Year} · {donnees.Genre} · {donnees.Runtime}</p>
        </div>
        <p className="max-w-2xl leading-7 text-slate-600">{donnees.Plot}</p>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div><dt className="font-semibold text-slate-900">Réalisateur</dt><dd className="text-slate-600">{donnees.Director}</dd></div>
          <div><dt className="font-semibold text-slate-900">Acteurs</dt><dd className="text-slate-600">{donnees.Actors}</dd></div>
        </dl>
        <Bouton
          libelle={estFavori ? 'Déjà dans les favoris' : 'Ajouter aux favoris'}
          desactive={estFavori}
          onClick={() => dispatch({ type: 'ajouter', film: filmPourFavoris })}
        />
      </div>
    </article>
  );
}
