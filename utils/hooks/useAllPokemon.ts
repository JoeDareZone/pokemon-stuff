import axios from "axios";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Pokemon } from "../../types/pokemon";
import { capitalizeFirstLetter } from "../helpers";

const fetchPokemon = async ({ pageParam = 0, limit = 20 }) => {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
  );
  return res.data.results;
};

const useAllPokemon = (limit: number) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    status,
  } = useInfiniteQuery(
    ["allPokemon"],
    ({ pageParam = 0 }) => fetchPokemon({ pageParam, limit }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === limit) {
          return pages.length * limit;
        }
        return undefined;
      },
      onSuccess: async data => {
        const allPokemon = await Promise.all(
          data.pages.flat().map(async (p: any) => {
            const res = await axios.get(p.url);
            return {
              id: res.data.id,
              name: capitalizeFirstLetter(res.data.name),
              types: res.data.types.map((t: any) =>
                capitalizeFirstLetter(t.type.name)
              ),
              sprite: res.data.sprites.front_default,
            };
          })
        );
        setPokemon(allPokemon);
      },
    }
  );

  return {
    pokemon,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    status,
  };
};

export default useAllPokemon;
