import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { POKEMON_LIMIT } from "../utils/constants";
import useAllPokemon from "../utils/hooks/useAllPokemon";
import PokemonRow from "./PokemonRow";
import PokemonTableHeader from "./PokemonTableHeader";
import PokemonTypeSelection from "./PokemonTypeSelection";

const PokemonTable: React.FC = () => {
  const [selectedType, setSelectedType] = useState("");
  const {
    pokemon,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    status,
  } = useAllPokemon(POKEMON_LIMIT);

  const onSelectType = (type: string) => setSelectedType(type);

  if (isError) {
    console.log(error instanceof Error && error.message);
    Alert.alert("We couldn't find any pokemon :(", "Please try again later");
  }

  if (status === "loading")
    return <ActivityIndicator size={"large"} style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <PokemonTypeSelection onSelectType={onSelectType} />
      <FlatList
        data={
          selectedType
            ? pokemon.filter(p => p.types.includes(selectedType))
            : pokemon || []
        }
        ListHeaderComponent={<PokemonTableHeader />}
        stickyHeaderIndices={[0]}
        style={styles.flatList}
        renderItem={({ item }) => <PokemonRow pokemon={item} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size={"large"} style={{ marginTop: 20 }} />
          ) : null
        }
      />
    </View>
  );
};

export default PokemonTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
});
