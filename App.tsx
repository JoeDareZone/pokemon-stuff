import { Image } from "expo-image";
import { SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import PokemonTable from "./components/PokemonTable";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={require("./assets/logo.png")}
          style={{ height: 100, width: "100%" }}
          contentFit="cover"
        />
        <PokemonTable />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
