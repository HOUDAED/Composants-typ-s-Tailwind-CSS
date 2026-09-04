import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {Bouton} from './composants/Bouton.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1> Catalogue de films</h1>
      <div>
        <Bouton libelle="Valider" />
        <Bouton libelle="Supprimer"  />
        <Bouton libelle="Indisponible" desactive />
      </div>
    </>
  )
}

export default App
