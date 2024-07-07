import React from "react";
import { StyleSheet, Text, View } from "react-native";

type PokemonTypeSelectionProps = {
  prop: any;
};

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  prop,
}) => {
  return (
    <View style={styles.container}>
      <Text>PokemonTypeSelection</Text>
    </View>
  );
};

export default PokemonTypeSelection;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});
