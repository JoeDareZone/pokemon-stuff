import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import useAllPokemon from "../utils/hooks/useAllPokemon";
import PokemonRow from "./PokemonRow";
import PokemonTableHeader from "./PokemonTableHeader";

const PokemonTable: React.FC = () => {
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);

  const { pokemon, status, isError, error, isFetching } = useAllPokemon(
    limit,
    offset
  );

  const loadMore = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error instanceof Error && error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemon}
        ListHeaderComponent={<PokemonTableHeader />}
        stickyHeaderIndices={[0]}
        style={{ marginVertical: 20, width: "100%" }}
        renderItem={({ item }) => <PokemonRow pokemon={item} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <Text>Loading more...</Text> : null}
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
