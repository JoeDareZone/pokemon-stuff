import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Pokemon } from "../types/pokemon";

const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const { status, isError, data, error } = useQuery({
    queryKey: ["allPokemon"],
    queryFn: async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      return res.data.results;
    },
    onSuccess: data => {
      Promise.all(data.map((p: any) => axios.get(p.url))).then(results => {
        const detailedPokemon = results.map(res => ({
          id: res.data.id,
          name: res.data.name,
          types: res.data.types.map((t: any) => t.type.name),
          sprite: res.data.sprites.back_default,
        }));
        setPokemon(detailedPokemon);
      });
    },
  });

  return { pokemon, status, isError, error };
};

export default usePokemon;
