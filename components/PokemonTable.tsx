import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Pokemon } from "../types/pokemon";
import PokemonRow from "./PokemonRow";
import { useQuery } from "react-query";
import usePokemon from "../hooks/usePokemon";
import axios from "axios";
import useAllPokemon from "../hooks/useAllPokemon";

type PokemonTableProps = {};

const PokemonTable: React.FC<PokemonTableProps> = ({}) => {
//   const { pokemon, status, isError, error } = usePokemon("bulbasaur");
  const { status, isError, error } = useAllPokemon();


  useEffect(() => {
    console.log("status", status)
    console.log("isError", isError)
    console.log('error', error)
  }, [status, isError, error])

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error instanceof Error && error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* {!pokemon ? (
        <Text>No pokemon found!</Text>
      ) : (
        <PokemonRow pokemon={pokemon} />
      )} */}
    </View>
  );
};

export default PokemonTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
