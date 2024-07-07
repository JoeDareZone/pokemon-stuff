import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PokemonRow from "./components/PokemonRow";
import { useEffect, useState } from "react";
import { Pokemon } from "./types/pokemon";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const queryClient = new QueryClient();
  
  const getPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/bulbasaur";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      setPokemon({
        id: json.id,
        name: json.name,
        types: json.types.map((t: any) => t.type.name),
        sprite: json.sprites.back_default,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const info = useQuery({ queryKey: ["pokemon"], queryFn: getPokemon });

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
