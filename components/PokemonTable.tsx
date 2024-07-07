import { Image } from "expo-image";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import useAllPokemon from "../utils/hooks/useAllPokemon";
import PokemonRow from "./PokemonRow";
import PokemonTableHeader from "./PokemonTableHeader";

type PokemonTableProps = {};

const PokemonTable: React.FC<PokemonTableProps> = ({}) => {
  const { pokemon, status, isError, error } = useAllPokemon();

  if (status === "loading") return <Text>Loading...</Text>;

  if (isError)
    return <Text>Error: {error instanceof Error && error.message}</Text>;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={{ height: 100, width: "100%" }}
        contentFit="cover"
      />
      {!pokemon ? (
        <Text>No pokemon found!</Text>
      ) : (
        <FlatList
          data={pokemon}
          ListHeaderComponent={<PokemonTableHeader />}
          stickyHeaderIndices={[0]}
          style={{ marginVertical: 20, width: "100%" }}
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
