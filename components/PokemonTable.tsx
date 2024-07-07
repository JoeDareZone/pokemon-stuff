import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import useAllPokemon from "../hooks/useAllPokemon";
import PokemonRow from "./PokemonRow";

type PokemonTableProps = {};

const PokemonTable: React.FC<PokemonTableProps> = ({}) => {
  //   const { pokemon, status, isError, error } = usePokemon("bulbasaur");
  const { pokemon, status, isError, error } = useAllPokemon();

  useEffect(() => {
    console.log(pokemon.length);
  }, [status, isError, error]);

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error instanceof Error && error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {!pokemon ? (
        <Text>No pokemon found!</Text>
      ) : (
        <FlatList
          data={pokemon}
          renderItem={item => <PokemonRow pokemon={item.item} />}
        />
      )}
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
