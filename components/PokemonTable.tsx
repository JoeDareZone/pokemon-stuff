import React, { useEffect, useState } from "react";
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
    validationError,
  } = useAllPokemon(POKEMON_LIMIT);

  const onSelectType = (type: string) => setSelectedType(type);

  useEffect(() => {
    if (validationError) {
      Alert.alert("Something went wrong!", "Please try again later");
    }
  }, [validationError]);

  if (isError) {
    console.error(error instanceof Error && error.message);
    Alert.alert("We couldn't find any pokemon :(", "Please try again later");
  }

  return (
    <View style={styles.container}>
      <PokemonTypeSelection onSelectType={onSelectType} />
      {status === "loading" ? (
        <ActivityIndicator size={"large"} style={{ marginTop: 20 }} />
      ) : (
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
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#ddd" }} />
          )}
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
      )}
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
