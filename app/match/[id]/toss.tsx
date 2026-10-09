import ScreenLayout from "@/src/components/ui/screen-layout";
import ScreenLoader from "@/src/components/ui/screen-loader";
import TossComponent from "@/src/features/match/components/toss/toss-component";
import { useInitMatch } from "@/src/features/match/hooks/use-init-match";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function TossScreen() {
  const router = useRouter();
  const { id: matchId } = useLocalSearchParams<{
    id: string;
  }>();

  const { teams, isFetching, fetchError } = useInitMatch(matchId!);
  const { updateMatchStatus } = useMatchStore();
  const onStartMatch = () => {
    updateMatchStatus("ongoing");
    router.replace({
      pathname: "/match/[id]/tracker",
      params: {
        id: matchId,
      },
    });
  };
  return (
    <ScreenLayout>
      {isFetching ? (
        <ScreenLoader />
      ) : fetchError ? (
        <Text className="text-center mb-4 font-bold text-danger">
          {fetchError}
        </Text>
      ) : (
        <>
          <View className="mt-12 mb-12 items-center">
            <Text className="font-oswald text-3xl uppercase tracking-widest mb-2 text-center text-primary">
              Avant-match
            </Text>
            <Text className="text-muted text-sm uppercase tracking-wider text-center">
              Définissez le premier serveur
            </Text>
          </View>
          <TossComponent teams={teams} onStartMatch={onStartMatch} />
        </>
      )}
    </ScreenLayout>
  );
}
