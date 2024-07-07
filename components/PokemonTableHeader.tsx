import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PokemonTableHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.idText}>ID</Text>
      <Text style={styles.nameText}>Name</Text>
      <Text style={styles.typesText}>Types</Text>
      <Text style={styles.imageText}>Sprite</Text>
    </View>
  );
};

export default PokemonTableHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderWidth: 1,
    padding: 10,
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
    fontWeight: "bold",
  },
  typesText: {
    flex: 3,
    textAlign: "left",
    fontWeight: "bold",
  },
  imageText: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
  },
});
