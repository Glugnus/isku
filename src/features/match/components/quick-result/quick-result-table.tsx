import ScoreInputCell from "@/src/features/match/components/quick-result/score-input-cell";
import { SetScore } from "@/src/features/match/types/match.types";
import { QuickMatchResult } from "@/src/features/match/utils/score-calculator";
import { colors } from "@/src/lib/colors";
import { Check } from "lucide-react-native";
import React, { useRef } from "react";
import { ScrollView, Text, View } from "react-native";

interface QuickResultTableProps {
  players: { id: "p1" | "p2"; name: string | null | undefined }[];
  matchResult: QuickMatchResult;
  scoreSets: SetScore[];
  handleScoreChange: (
    index: number,
    playerKey: "p1" | "p2",
    value: string,
  ) => void;
}

export default function QuickResultTable({
  players,
  matchResult,
  scoreSets,
  handleScoreChange,
}: QuickResultTableProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <View className="bg-surface rounded-2xl mt-10 overflow-hidden border border-muted/20">
      <View className="flex-row border-b-2 border-primary/20 bg-background/50 p-3">
        <Text className="text-muted font-bold text-[10px] uppercase w-32">
          Joueur
        </Text>
        <Text className="text-muted font-bold text-[10px] uppercase text-center flex-1">
          Points
        </Text>
      </View>
      <View className="flex-row p-3">
        <View className="w-32 border-r border-muted/20 pr-3">
          {players.map((player) => {
            const isWinner = matchResult.matchWinner === player.id;
            return (
              <React.Fragment key={player.id}>
                <View className="h-14 flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="w-6 items-start justify-center">
                      {isWinner && (
                        <Check
                          color={
                            isWinner
                              ? player.id === "p1"
                                ? colors.primary
                                : colors.secondary
                              : colors.white
                          }
                          size={16}
                          strokeWidth={3}
                        />
                      )}
                    </View>
                    <Text
                      className={`font-oswald text-lg flex-1 ${isWinner ? (player.id === "p1" ? "text-primary" : "text-secondary") : "text-white"}`}
                      numberOfLines={1}
                    >
                      {player.name?.toUpperCase()}
                    </Text>
                  </View>
                </View>
                {player.id === "p1" && (
                  <View className="h-[1px] bg-muted/20 my-2" />
                )}
              </React.Fragment>
            );
          })}
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="ml-3 flex-1"
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          <View className="flex-col">
            {players.map((player) => {
              return (
                <React.Fragment key={player.id}>
                  <View className="h-14 flex-row items-center gap-x-3">
                    {scoreSets.map((set, index) => (
                      <ScoreInputCell
                        key={index}
                        value={set[player.id]}
                        onChangeText={(value) =>
                          handleScoreChange(index, player.id, value)
                        }
                        playerKey={player.id}
                        isWinner={
                          matchResult.setDetails[index]?.setWinner === player.id
                        }
                        isActive={matchResult.activeSetIndex === index}
                        hasError={matchResult.setDetails[index]?.hasError}
                      />
                    ))}
                  </View>
                  {player.id === "p1" && (
                    <View className="h-[1px] bg-transparent my-2" />
                  )}
                </React.Fragment>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
