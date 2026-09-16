import { Link, NavLink, Outlet } from 'react-router-dom';
import { Bouton } from './Bouton';
import { useAuth } from '../contextes/AuthContext';
import { useFavoris } from '../contextes/FavorisContext';
import { useTheme } from '../contextes/ThemeContext';

const classeLien = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold text-blue-700'
    : 'text-slate-600 transition-colors hover:text-blue-700';

export function Layout() {
  const { pseudo, deconnecter } = useAuth();
  const { favoris } = useFavoris();
  const { theme, basculer } = useTheme();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-5 px-4 py-4 md:px-8">
          <Link to="/" className="mr-auto text-xl font-bold tracking-tight text-slate-900">
            CineScope
          </Link>
          <nav aria-label="Navigation principale" className="flex items-center gap-4 text-sm">
            <NavLink to="/" end className={classeLien}>Accueil</NavLink>
            <NavLink to="/recherche" className={classeLien}>Recherche</NavLink>
            <NavLink to="/favoris" className={classeLien}>
              Favoris <span className="font-semibold text-blue-600">({favoris.length})</span>
            </NavLink>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <Bouton
              libelle={theme === 'clair' ? 'Mode sombre' : 'Mode clair'}
              variante="secondaire"
              onClick={basculer}
            />
            {pseudo ? (
              <>
                <span className="hidden text-slate-500 sm:inline">Connecté en tant que <strong className="text-slate-800">{pseudo}</strong></span>
                <Bouton libelle="Déconnexion" variante="secondaire" onClick={deconnecter} />
              </>
            ) : (
              <Link to="/connexion" className="font-semibold text-blue-700 hover:text-blue-800">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-slate-500 md:px-8">
          CineScope · Recherche de films avec OMDb
        </div>
      </footer>
    </div>
  );
}
