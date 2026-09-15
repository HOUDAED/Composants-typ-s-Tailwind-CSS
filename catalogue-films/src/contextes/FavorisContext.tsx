import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import type { FilmOmdb } from '../lib/omdb';

export type ActionFavoris =
  | { type: 'ajouter'; film: FilmOmdb }
  | { type: 'retirer'; id: string }
  | { type: 'vider' };

export function reducerFavoris(etat: FilmOmdb[], action: ActionFavoris): FilmOmdb[] {
  switch (action.type) {
    case 'ajouter':
      return etat.some((film) => film.imdbID === action.film.imdbID)
        ? etat
        : [...etat, action.film];
    case 'retirer':
      return etat.filter((film) => film.imdbID !== action.id);
    case 'vider':
      return [];
  }
}

interface FavorisContexte {
  favoris: FilmOmdb[];
  dispatch: Dispatch<ActionFavoris>;
}

const Contexte = createContext<FavorisContexte | undefined>(undefined);

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [favoris, dispatch] = useReducer(reducerFavoris, []);

  return <Contexte.Provider value={{ favoris, dispatch }}>{children}</Contexte.Provider>;
}

export function useFavoris(): FavorisContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error('useFavoris doit être utilisé dans un <FavorisProvider>');
  }
  return contexte;
}
