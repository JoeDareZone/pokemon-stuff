import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Pokemon } from "../types/pokemon";
import { blurhash } from "../utils/constants";

type PokemonRowProps = {
  pokemon: Pokemon;
};

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.idText}>{pokemon.id}</Text>
      <Text style={styles.nameText}>{pokemon.name}</Text>
      <Text style={styles.typesText}>{pokemon.types.join(" / ")}</Text>
      <Image
        source={{ uri: pokemon.sprite }}
        style={styles.image}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={200}
      />
    </View>
  );
};

export default PokemonRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    minHeight: 70,
    alignItems: "center",
  },
  idText: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
  },
  nameText: {
    flex: 2,
    textAlign: "left",
  },
  typesText: {
    flex: 3,
    textAlign: "left",
  },
  image: {
    flex: 1,
    height: "100%",
    width: null,
  },
});
