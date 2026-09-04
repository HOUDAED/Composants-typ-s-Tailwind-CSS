// src/lib/utils.ts — version simplifiée, fournie pour le TP2
//
// Ce fichier contient le strict nécessaire pour démarrer le TP2 :
// le type Film, les données, et les deux fonctions réutilisées.
//
// Si vous avez terminé le TP1, GARDEZ VOTRE FICHIER : il fait déjà tout
// cela, et davantage. Ce fichier n'est là que pour ne pas rester bloqué.

export type StatutFilm = "vu" | "a_voir" | "abandonne";

export interface Film {
  id: number;
  titre: string;
  annee: number;
  genres: string[];
  note: number;
  statut: StatutFilm;
}

export const FILMS: Film[] = [
  { id: 1, titre: "Alien", annee: 1979, genres: ["SF", "Horreur"], note: 8.5, statut: "vu" },
  { id: 2, titre: "Blade Runner", annee: 1982, genres: ["SF", "Thriller"], note: 8.1, statut: "vu" },
  { id: 3, titre: "Arrival", annee: 2016, genres: ["SF", "Drame"], note: 7.9, statut: "a_voir" },
  { id: 4, titre: "Dune", annee: 2021, genres: ["SF", "Aventure"], note: 8.0, statut: "a_voir" },
  { id: 5, titre: "Solaris", annee: 1972, genres: ["SF", "Drame"], note: 8.4, statut: "abandonne" },
];

/** Trie une liste par l'une de ses clés. */
export function trierPar<T>(liste: T[], cle: keyof T): T[] {
  return [...liste].sort((a, b) => (a[cle] > b[cle] ? 1 : -1));
}

/** Filtre par genre. Sans genre, renvoie la liste entière. */
export function filtrerParGenre(liste: Film[], genre?: string): Film[] {
  if (!genre) return liste;
  return liste.filter((film) => film.genres.includes(genre));
}
