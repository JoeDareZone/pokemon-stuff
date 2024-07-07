import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PokemonRow from "./components/PokemonRow";
import { useEffect, useState } from "react";
import { Pokemon } from "./types/pokemon";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getPokemon } from "./hooks/getPokemon";

export default function App() {
  const queryClient = new QueryClient();

  const { status, isError, data, error } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon.then(),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        {pokemon && <PokemonRow pokemon={pokemon} />}
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
