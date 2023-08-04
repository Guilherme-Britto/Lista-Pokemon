import { HomeStyle } from "./style";
import { ListPokemon } from "../components/PokemonList";

export const Home = () => {
  return (
    <HomeStyle>
      <header>
        <img
          className="logo"
          src="https://craig1123.github.io/pokedex/img/Pokedex.png"
          alt="Pokedex"
        />
      </header>
      <main>
        <ListPokemon />
      </main>
    </HomeStyle>
  );
};
