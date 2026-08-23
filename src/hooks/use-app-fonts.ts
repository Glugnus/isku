import { Orbitron_700Bold } from "@expo-google-fonts/orbitron";
import { Oswald_700Bold } from "@expo-google-fonts/oswald";
import { useFonts } from "expo-font";

export default function useAppFonts() {
  const [loaded, error] = useFonts({
    "Oswald-Bold": Oswald_700Bold,
    "Orbitron-Bold": Orbitron_700Bold,
  });
  return { loaded, error };
}
