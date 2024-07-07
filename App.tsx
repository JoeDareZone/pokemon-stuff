import { SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import PokemonTable from "./components/PokemonTable";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <PokemonTable />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
