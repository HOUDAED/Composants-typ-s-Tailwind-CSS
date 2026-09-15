import { useEffect, useState, type ChangeEvent, type ReactNode } from 'react';
import { CarteFilm } from './CarteFilm';
import {
  creerUrlFilm,
  type FilmOmdb,
  type ReponseRecherche,
} from '../lib/omdb';

export function RechercheFilms() {
  const [terme, setTerme] = useState('');
  const [films, setFilms] = useState<FilmOmdb[]>([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const termeNettoye = terme.trim();

  useEffect(() => {
    if (!termeNettoye) return;

    const controleur = new AbortController();

    const rechercher = async () => {
      setChargement(true);
      setErreur(null);

      try {
        const reponse = await fetch(creerUrlFilm(termeNettoye), {
          signal: controleur.signal,
        });

        if (!reponse.ok) {
          throw new Error(`Erreur HTTP ${reponse.status}`);
        }

        const donnees = (await reponse.json()) as ReponseRecherche;

        if (donnees.Response === 'False') {
          if (donnees.Error === 'Movie not found!') {
            setFilms([]);
            return;
          }

          throw new Error(donnees.Error ?? "L'API OMDb a refusé la recherche.");
        }

        setFilms(donnees.Search ?? []);
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === 'AbortError') return;

        setFilms([]);
        setErreur(e instanceof Error ? e.message : 'Erreur inconnue');
      } finally {
        if (!controleur.signal.aborted) setChargement(false);
      }
    };

    void rechercher();

    return () => controleur.abort();
  }, [termeNettoye]);

  const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    const nouveauTerme = e.target.value;
    setTerme(nouveauTerme);

    if (!nouveauTerme.trim()) {
      setFilms([]);
      setChargement(false);
      setErreur(null);
    }
  };

  const afficherResultats = (): ReactNode => {
    if (!termeNettoye) {
      return <p className="text-slate-600">Tapez un titre pour lancer la recherche.</p>;
    }

    if (chargement) {
      return <p className="text-slate-600">Chargement…</p>;
    }

    if (erreur) {
      return (
        <p role="alert" className="text-red-600">
          {erreur}
        </p>
      );
    }

    if (films.length === 0) {
      return (
        <p className="text-slate-600">
          Aucun film ne correspond à « {termeNettoye} ».
        </p>
      );
    }

    return (
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {films.map((film) => (
          <li key={film.imdbID} className="list-none">
            <CarteFilm film={film} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="recherche-film" className="block text-sm font-semibold text-slate-700">
          Titre du film
        </label>
        <input
          id="recherche-film"
          type="search"
          value={terme}
          onChange={gererSaisie}
          placeholder="Ex. Batman"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div aria-live="polite">{afficherResultats()}</div>
    </section>
  );
}
