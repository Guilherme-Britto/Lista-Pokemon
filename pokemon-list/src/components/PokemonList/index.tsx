import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { PokemonCard } from "../PokemonCard";
import { ButtonsContainer } from "./style";

export interface Pokemon {
  name: string;
  url: string;
}

export const ListPokemon = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [pageOffSet, setPageOffSet] = useState(0);
  const pageValues = [
    0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105,
  ];

  const getFilteredPokemon = async (pageOffSet: number) => {
    const response = await api.get("/pokemon", {
      params: {
        limit: 7,
        offset: pageOffSet,
      },
    });
    setFilteredPokemon(response.data.results);
  };

  const getAllPokemon = async () => {
    const response = await api.get("/pokemon", {
      params: {
        limit: 10000,
        offset: 0,
      },
    });
    setAllPokemon(response.data.results);
  };

  useEffect(() => {
    getFilteredPokemon(pageOffSet);
    getAllPokemon();
  }, [pageOffSet]);

  const handleChange = (event: { target: { value: string } }) => {
    if (event.target.value == "") {
      return getFilteredPokemon(pageOffSet);
    }
    const pokemon = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    if (pokemon.length == 0) {
      return getFilteredPokemon(pageOffSet);
    }

    setFilteredPokemon(pokemon);
  };

  const renderBoard = (filteredPokemon: Pokemon[]) => {
    return filteredPokemon.map((pokemon) => (
      <PokemonCard key={pokemon.name} pokemon={pokemon} />
    ));
  };

  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Procurrar Pokemon..."
      />
      {filteredPokemon.length > 0 ? (
        <ul>{renderBoard(filteredPokemon)}</ul>
      ) : (
        <p>carregango...</p>
      )}
      <ButtonsContainer>
        <span
          onClick={() => {
            if (pageOffSet == 0) {
              return;
            }
            setPageOffSet(pageOffSet - 7);
            getFilteredPokemon(pageOffSet);
          }}
        >
          &lt;
        </span>
        {pageValues.map((value, index) => (
          <p
            key={index}
            onClick={() => {
              setPageOffSet(value);
              getFilteredPokemon(pageOffSet);
            }}
          >
            {index + 1}
          </p>
        ))}
        <span
          onClick={() => {
            setPageOffSet(pageOffSet + 7);
            getFilteredPokemon(pageOffSet);
          }}
        >
          &gt;
        </span>
      </ButtonsContainer>
    </>
  );
};
