import axios from "axios";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { pokemonListSchema, pokemonSchema } from "../../models/pokemon.schema";
import { Pokemon } from "../../types/pokemon";
import { capitalizeFirstLetter } from "../helpers";

const fetchPokemon = async ({
  pageParam,
  limit,
}: {
  pageParam: number;
  limit: number;
}) => {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
  );
  return pokemonListSchema.parse(res.data.results);
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
    async ({ pageParam }) => {
      const pokemonList = await fetchPokemon({ pageParam, limit });

      const allPokemon = await Promise.all(
        pokemonList.map(async p => {
          const res = await axios.get(p.url);
          return pokemonSchema.parse(res.data);
        })
      );

      return allPokemon.map(pokemon => ({
        id: pokemon.id,
        name: capitalizeFirstLetter(pokemon.name),
        types: pokemon.types.map(t => capitalizeFirstLetter(t.type.name)),
        sprite: pokemon.sprites.front_default,
      }));
    },
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === limit ? allPages.length * limit : undefined,
      onError: error => console.error(error instanceof Error && error.message),
      onSuccess: data => setPokemon(data.pages.flat()),
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
