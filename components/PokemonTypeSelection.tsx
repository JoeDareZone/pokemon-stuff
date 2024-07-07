import React from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { pokemonTypes } from "../utils/constants";
import { capitalizeFirstLetter } from "../utils/helpers";

type PokemonTypeSelectionProps = {
  onSelectType: (type: string) => void;
};

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  onSelectType,
}) => {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {pokemonTypes.map(type => (
        <View key={type} style={styles.buttonContainer}>
          <Button
            title={capitalizeFirstLetter(type)}
            onPress={() => onSelectType(type)}
          />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="All" onPress={() => onSelectType("")} />
      </View>
    </ScrollView>
  );
};

export default PokemonTypeSelection;

const styles = StyleSheet.create({
  container: {
    maxHeight: 40,
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});
