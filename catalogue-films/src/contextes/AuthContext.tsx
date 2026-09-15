import { createContext, useContext, useState, type ReactNode } from 'react';

export interface AuthContexte {
  pseudo: string | null;
  connecter: (pseudo: string) => void;
  deconnecter: () => void;
}

const Contexte = createContext<AuthContexte | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [pseudo, setPseudo] = useState<string | null>(null);

  const connecter = (nouveauPseudo: string) => {
    const pseudoNettoye = nouveauPseudo.trim();
    if (pseudoNettoye) setPseudo(pseudoNettoye);
  };

  return (
    <Contexte.Provider value={{ pseudo, connecter, deconnecter: () => setPseudo(null) }}>
      {children}
    </Contexte.Provider>
  );
}

export function useAuth(): AuthContexte {
  const contexte = useContext(Contexte);
  if (contexte === undefined) {
    throw new Error('useAuth doit être utilisé dans un <AuthProvider>');
  }
  return contexte;
}
