import { Bouton } from './composants/Bouton'
import { ListeFilms } from './composants/ListeFilms'
import { FILMS, filtrerParGenre, trierPar } from './lib/utils'

function App() {
  const tousLesFilms = trierPar(FILMS, 'titre')
  const filmsSF = trierPar(filtrerParGenre(FILMS, 'SF'), 'titre')
  const filmsVide = trierPar(filtrerParGenre(FILMS, 'Western'), 'titre')

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800 md:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Catalogue de films
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Mini design system typé</h1>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">Tous les films</h2>
            <Bouton libelle="Valider" variante="primaire" />
          </div>
          <ListeFilms films={tousLesFilms} onSelection={(film) => console.log(`Détails: ${film.titre}`)} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Genre : SF</h2>
          <ListeFilms films={filmsSF} messageVide="Aucun film de type SF." />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Genre vide</h2>
          <ListeFilms films={filmsVide} messageVide="Aucun film pour ce filtre." />
        </section>
      </div>
    </main>
  )
}

export default App
