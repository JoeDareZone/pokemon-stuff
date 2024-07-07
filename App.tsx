import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PokemonRow from "./components/PokemonRow";
import { useEffect, useState } from "react";
import { Pokemon } from "./types/pokemon";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import PokemonTable from "./components/PokemonTable";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <PokemonTable />
    </QueryClientProvider>
  );
}

