export interface FilmOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: 'movie' | 'series' | 'game';
  Poster: string;
}

export interface ReponseRecherche {
  Search?: FilmOmdb[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface FilmDetailOmdb extends FilmOmdb {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Response: 'True' | 'False';
  Error?: string;
}

export const creerUrlFilm = (nomFilm: string) => {
  const cleApi = import.meta.env.VITE_OMDB_KEY;
  const titre = encodeURIComponent(nomFilm);

  return `https://www.omdbapi.com/?apikey=${cleApi}&s=${titre}`;
};

export const urlDetail = (id: string) => {
  const cleApi = import.meta.env.VITE_OMDB_KEY;
  return `https://www.omdbapi.com/?apikey=${cleApi}&i=${encodeURIComponent(id)}`;
};
