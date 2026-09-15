import { Navigate, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Layout } from './composants/Layout';
import { useAuth } from './contextes/AuthContext';
import { Accueil } from './pages/Accueil';
import { Connexion } from './pages/Connexion';
import { DetailFilm } from './pages/DetailFilm';
import { Favoris } from './pages/Favoris';
import { PageIntrouvable } from './pages/PageIntrouvable';
import { Recherche } from './pages/Recherche';

function RouteProtegee({ children }: { children: ReactNode }) {
  const { pseudo } = useAuth();
  if (!pseudo) return <Navigate to="/connexion" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Accueil />} />
        <Route path="recherche" element={<Recherche />} />
        <Route path="films/:id" element={<DetailFilm />} />
        <Route path="favoris" element={<RouteProtegee><Favoris /></RouteProtegee>} />
        <Route path="connexion" element={<Connexion />} />
        <Route path="*" element={<PageIntrouvable />} />
      </Route>
    </Routes>
  );
}

export default App;
