import { useState } from "react";
import { api } from "../../services/api";
import { Pokemon } from "../PokemonList";
import {
  AbilityAndTypeCard,
  ContainerLi,
  LiHeader,
  LiMain,
  StatCard,
} from "./style";

interface CardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: CardProps) => {
  const [showFurtherInfo, setShowFurtherInfo] = useState(false);
  const [abilities, setAbility] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [statsKeys] = useState<string[]>([
    "Vida",
    "Ataque",
    "Defesa",
    "Ataque Especial",
    "Defesa Especial",
    "Velocidade",
  ]);
  const [statsValues, setStatsValues] = useState<string[]>([]);
  const [showLessInfo, setShowLessInfo] = useState("mais");

  const toggleShowFurtherInfo = () => {
    setShowLessInfo(showLessInfo === "mais" ? "menos" : "mais");

    setShowFurtherInfo(!showFurtherInfo);
  };
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const PokeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.slice(
    34,
    -1
  )}.png`;

  const handleClick = async () => {
    toggleShowFurtherInfo();

    if (showFurtherInfo == false) {
      const response = await api.get(`/pokemon/${pokemon.name}`);

      setStatsValues([]);
      response.data.stats.map((stat: any) => {
        setStatsValues((prevStat) => [...prevStat!, stat["base_stat"]]);
      });

      setAbility([]);
      response.data.abilities.map((ability: any) => {
        setAbility((prevAbility) => [...prevAbility!, ability.ability.name]);
      });

      setTypes([]);
      response.data.types.map((type: any) => {
        setTypes((prevType) => [...prevType!, type["type"]["name"]]);
      });
    }
  };

  return (
    <ContainerLi>
      <LiHeader>
        <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
        <img src={PokeImg} alt={pokemon.name} />
      </LiHeader>
      <span onClick={handleClick}>Mostrar {showLessInfo} informações</span>
      <LiMain>
        {showFurtherInfo ? (
          <>
            <AbilityAndTypeCard>
              <li>
                <p className="key">Abilidades</p>
                {abilities.map((ability: string) => (
                  <p key={ability}> {capitalizeFirstLetter(ability)}</p>
                ))}
              </li>
              <li>
                <p className="key">Tipos</p>
                {types.map((type: string) => (
                  <p key={type}> {capitalizeFirstLetter(type)}</p>
                ))}
              </li>
            </AbilityAndTypeCard>
            <StatCard>
              {statsKeys.map((key, index) => (
                <li key={index}>
                  <p className="key">{key}</p> <p>{statsValues[index]}</p>
                </li>
              ))}
            </StatCard>
          </>
        ) : (
          <></>
        )}
      </LiMain>
    </ContainerLi>
  );
};
