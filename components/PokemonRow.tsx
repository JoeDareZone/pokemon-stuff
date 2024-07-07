import React from "react";
import { View, Text, Image } from "react-native";
import { Pokemon } from "../types/pokemon";

type PokemonRowProps = {
  pokemon: Pokemon;
};

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        borderWidth: 1,
        padding: 10,
      }}
    >
      <Text>{pokemon.id}</Text>
      <Text>{pokemon.name}</Text>
      <Text>{pokemon.types.join(", ")}</Text>
      <Image
        source={{ uri: pokemon.sprite }}
        style={{ height: 20, width: 20 }}
      />
    </View>
  );
};

export default PokemonRow;
