import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Pokemon } from "../types/pokemon";

const usePokemon = (pokemonName: string) => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  const { status, isError, data, error } = useQuery({
    queryKey: ["pokemon", pokemonName],
    queryFn: () =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(res =>
        setPokemon({
          id: res.data.id,
          name: res.data.name,
          types: res.data.types.map((t: any) => t.type.name),
          sprite: res.data.sprites.back_default,
        })
      ),
  });

  return { pokemon, status, isError, error };
};

export default usePokemon;