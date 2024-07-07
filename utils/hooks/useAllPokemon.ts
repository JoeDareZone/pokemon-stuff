import axios from "axios";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Pokemon } from "../../types/pokemon";
import { capitalizeFirstLetter } from "./helpers";

const useAllPokemon = (limit: number, offset: number) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const { status, isError, error, isFetching } = useQuery({
    queryKey: ["allPokemon", limit, offset],
    queryFn: async () => {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      return res.data.results;
    },
    onSuccess: data => {
      Promise.all(data.map((p: any) => axios.get(p.url))).then(results => {
        const detailedPokemon = results.map(res => ({
          id: res.data.id,
          name: capitalizeFirstLetter(res.data.name),
          types: res.data.types.map((t: any) =>
            capitalizeFirstLetter(t.type.name)
          ),
          sprite: res.data.sprites.front_default,
        }));
        setPokemon(prev => [...prev, ...detailedPokemon]);
      });
    },
  });

  return { pokemon, status, isError, error, isFetching };
};

export default useAllPokemon;
