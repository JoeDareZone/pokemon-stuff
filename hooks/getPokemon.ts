import { useState } from "react";
import { Pokemon } from "../types/pokemon";

export const getPokemon = async () => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  const url = "https://pokeapi.co/api/v2/pokemon/bulbasaur";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    setPokemon({
      id: json.id,
      name: json.name,
      types: json.types.map((t: any) => t.type.name),
      sprite: json.sprites.back_default,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  return { pokemon };
};
