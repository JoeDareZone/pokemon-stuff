import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Pokemon } from "../types/pokemon";
import PokemonRow from "./PokemonRow";
import { useQuery } from "react-query";
import usePokemon from "../hooks/getPokemon";
import axios from "axios";

type PokemonTableProps = {};

const PokemonTable: React.FC<PokemonTableProps> = ({}) => {
  const { pokemon, status, isError, error } = usePokemon("bulbasaur");

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error instanceof Error && error.message}</Text>;
  }

  return (
    <View>
      {!pokemon ? (
        <Text>No pokemon found!</Text>
      ) : (
        <PokemonRow pokemon={pokemon} />
      )}
    </View>
  );
};

export default PokemonTable;
