import React from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { capitalizeFirstLetter } from "../utils/helpers";

type PokemonTypeSelectionProps = {
  onSelectType: (type: string) => void;
};

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  onSelectType,
}) => {
  const pokemonTypes = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dark",
    "Dragon",
    "Steel",
    "Fairy",
  ];

  return (
    <ScrollView horizontal style={styles.container}>
      {pokemonTypes.map(type => (
        <Button
          key={type}
          title={capitalizeFirstLetter(type)}
          onPress={() => onSelectType(type)}
        />
      ))}
      <Button title="All" onPress={() => onSelectType("")} />
    </ScrollView>
  );
};

export default PokemonTypeSelection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 1,
  },
});
