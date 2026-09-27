import Button from "@/src/components/ui/button";
import ConfirmModal from "@/src/components/ui/confirm-modal";
import SelectableCard from "@/src/components/ui/selectable-card";
import { useToss } from "@/src/features/match/hooks/use-toss";
import { MatchTeams, PlayerKey } from "@/src/features/match/types/match.types";
import { colors } from "@/src/lib/colors";
import { Dices, Lock, Play } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function TossComponent({
  teams,
  onStartMatch,
}: {
  teams: MatchTeams | null;
  onStartMatch: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    firstServer,
    setFirstServer,
    handleRandomToss,
    isTossing,
    isTossDone,
    unlockToss,
    annimServer,
  } = useToss();
  const displayedServer = isTossing ? annimServer : firstServer;

  const handleSelectServer = (player: PlayerKey) => {
    if (isTossing) return;
    if (isTossDone) {
      setIsModalOpen(true);
      return;
    }
    setFirstServer(player);
  };

  return (
    <View className="mb-12 flex-1">
      <View className="my-auto">
        <View className="flex-row items-center justify-between mb-12">
          <View className="flex-row items-center gap-x-2">
            <Text className="text-white text-xs font-bold uppercase tracking-widest">
              Premier Serveur
            </Text>
            {isTossDone && (
              <View className="bg-primary/20 border border-primary px-2 py-0.5 rounded-full flex-row items-center ml-2">
                <Lock size={10} color={colors.primary} />
              </View>
            )}
          </View>
          <Pressable
            disabled={isTossing}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={isTossDone ? () => setIsModalOpen(true) : handleRandomToss}
            className={`active:opacity-70 flex-row items-center px-3 py-2 rounded-lg border ${isTossDone ? "bg-surface border-primary/40 opacity-90" : "bg-surface/80 border-primary/30"}`}
          >
            {isTossDone ? (
              <Lock size={14} color={colors.primary} />
            ) : (
              <Dices size={16} color={colors.primary} />
            )}
            <Text className="text-primary ml-2 text-xs font-bold uppercase tracking-wider">
              {isTossDone
                ? "Toss Effectué"
                : isTossing
                  ? "Toss..."
                  : "Toss Officiel"}
            </Text>
          </Pressable>
        </View>
        <View className="flex-row gap-x-4 mb-12">
          <SelectableCard
            title={teams?.team1Name || "Joueur 1"}
            isSelected={displayedServer === "p1"}
            onPress={() => {
              handleSelectServer("p1");
            }}
            variant="primary"
          />
          <SelectableCard
            title={teams?.team2Name || "Joueur 2"}
            isSelected={displayedServer === "p2"}
            onPress={() => {
              handleSelectServer("p2");
            }}
            variant="secondary"
          />
        </View>
      </View>
      <Button
        title="Démarrer le match"
        onPress={onStartMatch}
        disabled={isTossing}
        variant={displayedServer === "p1" ? "primary" : "secondary"}
        leftIcon={
          <Play
            size={24}
            color={displayedServer === "p1" ? colors.background : colors.white}
          />
        }
        className="mt-auto"
      />
      <ConfirmModal
        visible={isModalOpen}
        title="Toss déjà Effectué"
        message="Le premier serveur a déjà été défini par le Toss officiel"
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          unlockToss();
          setIsModalOpen(false);
        }}
        cancelText="Conserver"
        confirmText="Relancer"
      />
    </View>
  );
}
