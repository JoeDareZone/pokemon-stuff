import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import useAllPokemon from "../utils/hooks/useAllPokemon";
import PokemonRow from "./PokemonRow";
import PokemonTableHeader from "./PokemonTableHeader";

const PokemonTable: React.FC = () => {
  const [limit] = useState(20);

  const {
    pokemon,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    status,
  } = useAllPokemon(limit);

  if (isError) {
    console.log(error instanceof Error && error.message);
    Alert.alert("We couldn't find any pokemon :(", "Please try again later");
  }

  if (status === "loading") {
    return <ActivityIndicator size={"large"} style={{ marginTop: 20 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemon || []}
        ListHeaderComponent={<PokemonTableHeader />}
        stickyHeaderIndices={[0]}
        style={{ marginVertical: 20, width: "100%" }}
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
    alignItems: "center",
    justifyContent: "center",
  },
});
