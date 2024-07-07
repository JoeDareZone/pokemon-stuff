import React from "react";
import { Button, StyleSheet, View, ScrollView } from "react-native";

type PokemonTypeSelectionProps = {
  onSelectType: (type: string) => void;
};

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({ onSelectType }) => {
  const types = [
    "normal", "fire", "water", "grass", "electric", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dark", "dragon", "steel", "fairy"
  ];

  return (
    <ScrollView horizontal style={styles.container}>
      {types.map(type => (
        <Button
          key={type}
          title={capitalizeFirstLetter(type)}
          onPress={() => onSelectType(type)}
        />
      ))}
      <Button
        title="All"
        onPress={() => onSelectType('')}
      />
    </ScrollView>
  );
};

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default PokemonTypeSelection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
});