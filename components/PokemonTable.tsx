import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Pokemon } from "../types/pokemon";
import PokemonRow from "./PokemonRow";
import { useQuery } from "react-query";
import { getPokemon } from "../hooks/getPokemon";

type PokemonTableProps = {};

const PokemonTable: React.FC<PokemonTableProps> = ({}) => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  const { status, isError, data, error } = useQuery({
    queryKey: ["pokemon"],
    queryFn: () => getPokemon().then(result => setPokemon(result.pokemon)),
  });

  if (!pokemon) return;
  return <PokemonRow pokemon={pokemon} />;
};

export default PokemonTable;
