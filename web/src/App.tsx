import { useState, useEffect } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import axios from 'axios';

import "./styles/main.css";

import logoImg from "./assets/logo-nlw-esports.svg";

import { CreateAdModal } from "./components/CreateAdModal";

// JSX: JavaScript + XML (HTML)

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}
/* React-Hook-Form para trabalhar com formulários e fazer as validações 
    Ir em GetStarted e pesquisar sobre Schema Validation
    Usar Zod para fazer a validação do back-end
    Keen-Slider biblioteca de carrossel para adicionar mais jogos na aplicação
    Fazer o Select de games usando o RadixSelect
    Autenticação com o login do Discord
*/

function App() {
  const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
      axios('http://localhost:3333/games').then(response => 
        setGames(response.data));
    }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        esta aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner 
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    
    </div>
  );
}

export default App;
