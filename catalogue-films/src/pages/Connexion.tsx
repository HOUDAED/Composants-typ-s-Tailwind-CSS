import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bouton } from '../composants/Bouton';
import { useAuth } from '../contextes/AuthContext';

interface EtatConnexion {
  de?: { pathname: string; search?: string; hash?: string };
}

export function Connexion() {
  const [pseudo, setPseudo] = useState('');
  const { connecter } = useAuth();
  const naviguer = useNavigate();
  const emplacement = useLocation();

  const gererEnvoi = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pseudoNettoye = pseudo.trim();
    if (!pseudoNettoye) return;

    connecter(pseudoNettoye);
    const destinationInfo = (emplacement.state as EtatConnexion | null)?.de;
    const destination = destinationInfo
      ? `${destinationInfo.pathname}${destinationInfo.search ?? ''}${destinationInfo.hash ?? ''}`
      : '/';
    naviguer(destination, { replace: true });
  };

  return (
    <section className="mx-auto max-w-md space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Espace personnel</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Connexion</h1>
      </div>
      <form onSubmit={gererEnvoi} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="pseudo" className="block text-sm font-semibold text-slate-700">Pseudo</label>
          <input
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Votre pseudo"
            className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            autoComplete="nickname"
          />
        </div>
        <Bouton libelle="Se connecter" type="submit" desactive={!pseudo.trim()} />
      </form>
    </section>
  );
}
