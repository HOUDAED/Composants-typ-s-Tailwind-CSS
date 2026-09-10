export interface FilmOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface ReponseRecherche {
  Search?: FilmOmdb[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}
export const creerUrlFilm =(filmname: string) =>{
    const myapikey = import.meta.env.VITE_OMDB_KEY
    const myfilmname = encodeURI(filmname) 
    return `https://www.omdbapi.com/?apikey=${myapikey}&s=${myfilmname}`
}
