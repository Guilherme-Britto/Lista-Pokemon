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
  const [filteredPageValues, setFilteredPageValues] = useState([
    0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60,
  ]);
  const pageValues = [
    0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108,
    114, 120, 126, 132, 138, 144, 150, 156, 162, 168, 174, 180, 186, 192, 198,
    204, 210, 216, 222, 228, 234, 240, 246, 252, 258, 264, 270, 276, 282, 288,
    294, 300, 306, 312, 318, 324, 330, 336, 342, 348, 354, 360, 366, 372, 378,
    384, 390, 396, 402, 408, 414, 420, 426, 432, 438, 444, 450, 456, 462, 468,
    474, 480, 486, 492, 498, 504, 510, 516, 522, 528, 534, 540, 546, 552, 558,
    564, 570, 576, 582, 588, 594, 600, 606, 612, 618, 624, 630, 636, 642, 648,
    654, 660, 666, 672, 678, 684, 690, 696, 702, 708, 714, 720, 726, 732, 738,
    744, 750, 756, 762, 768, 774, 780, 786, 792, 798, 804, 810, 816, 822, 828,
    834, 840, 846, 852, 858, 864, 870, 876, 882, 888, 894, 900, 906, 912, 918,
    924, 930, 936, 942, 948, 954, 960, 966, 972, 978, 984, 990, 996, 1002, 1008,
    1014, 1020, 1026, 1032, 1038, 1044, 1050, 1056, 1062, 1068, 1074, 1080,
    1086, 1092, 1098, 1104, 1110, 1116, 1122, 1128, 1134, 1140, 1146, 1152,
    1158, 1164, 1170, 1176, 1182, 1188, 1194, 1200, 1206, 1212, 1218, 1224,
    1230, 1236, 1242, 1248, 1254, 1260, 1266, 1272, 1278,
  ];

  const getFilteredPageValues = (pageOffSet: number) => {
    if (pageOffSet <= 24) {
      return setFilteredPageValues([0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60]);
    }
    if (pageOffSet >= 1242) {
      return setFilteredPageValues([
        1218, 1224, 1230, 1236, 1242, 1248, 1254, 1260, 1266, 1272, 1278,
      ]);
    }

    const index = pageValues.indexOf(pageOffSet);
    setFilteredPageValues(pageValues.slice(index - 5, index + 6));
  };

  const getFilteredPokemon = async (pageOffSet: number) => {
    const response = await api.get("/pokemon", {
      params: {
        limit: 6,
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
    getFilteredPageValues(pageOffSet);
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
            setPageOffSet(pageOffSet - 6);
            getFilteredPageValues(pageOffSet);
            getFilteredPokemon(pageOffSet);
          }}
        >
          &lt;
        </span>
        {filteredPageValues.map((value, index) => (
          <button
            className={value === pageOffSet ? "clicked" : "notClicked"}
            key={index}
            onClick={() => {
              setPageOffSet(value);
              getFilteredPageValues(pageOffSet);
              getFilteredPokemon(pageOffSet);
            }}
          >
            {value === 0 ? "1" : value / 6 + 1}
          </button>
        ))}
        <span
          onClick={() => {
            if (pageOffSet == 1278) {
              return;
            }
            setPageOffSet(pageOffSet + 6);
            getFilteredPageValues(pageOffSet);
            getFilteredPokemon(pageOffSet);
          }}
        >
          &gt;
        </span>
      </ButtonsContainer>
    </>
  );
};
