import axios from "axios";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { PokemonListSchema, PokemonSchema } from "../../models/pokemon.schema";
import { Pokemon } from "../../types/pokemon";
import { capitalizeFirstLetter } from "../helpers";

const fetchPokemon = async ({ pageParam = 0, limit = 20 }) => {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`
  );
  try {
    return PokemonListSchema.parse(res.data.results);
  } catch (error) {
    console.error("Failed to validate Pokemon list", error);
    throw error;
  }
};

const useAllPokemon = (limit: number) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

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
        return lastPage.length === limit ? pages.length * limit : undefined;
      },
      onSuccess: async data => {
        try {
          const allPokemon = await Promise.all(
            data.pages.flat().map(async (p: any) => {
              const res = await axios.get(p.url);
              const validatedData = PokemonSchema.parse(res.data);
              return {
                id: validatedData.id,
                name: capitalizeFirstLetter(validatedData.name),
                types: validatedData.types.map((t: any) =>
                  capitalizeFirstLetter(t.type.name)
                ),
                sprite: validatedData.sprites.front_default,
              };
            })
          );
          setPokemon(allPokemon);
        } catch (error) {
          console.error("Failed to validate Pokemon data", error);
          setValidationError(
            "Failed to validate Pokemon data. Please try again later."
          );
        }
      },
      onError: error => {
        console.error("Error fetching Pokémon", error);
        setValidationError("Failed to fetch Pokémon. Please try again later.");
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
    validationError,
  };
};

export default useAllPokemon;
