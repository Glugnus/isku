import ConfirmModal from "@/src/components/ui/confirm-modal";
import SwipeToDelete from "@/src/components/ui/swipe-to-delete";
import { deleteMatch } from "@/src/features/match/api/matches-api";
import { MatchListItem } from "@/src/features/match/hooks/use-matches-list";
import { getMatchParticipantsTeams } from "@/src/features/match/utils/match-participants-teams";
import { colors } from "@/src/lib/colors";
import { router } from "expo-router";
import { Play, Share2 } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function MatchListCard({
  match,
  onDeleted,
}: {
  match: MatchListItem;
  onDeleted: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { teams } = getMatchParticipantsTeams(match.match_participants);

  const handleDelete = async () => {
    setError(null);
    try {
      setIsDeleting(true);
      await deleteMatch(match.id);
      setShowModal(false);
      onDeleted();
    } catch (err) {
      setError("Une erreur est survenue pendant la suppression du match");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePlayPress = () => {
    if (match.mode === "quick") {
      router.push({
        pathname: "/match/[id]/quick-result",
        params: { id: match.id },
      });
    } else {
      router.push({
        pathname: "/match/[id]/toss",
        params: { id: match.id },
      });
    }
  };

  const handleEditPress = () => {
    router.push({
      pathname: "/match/[id]/edit",
      params: { id: match.id },
    });
  };

  return (
    <SwipeToDelete
      onDelete={() => {
        setShowModal(true);
      }}
    >
      <Pressable
        onPress={() => {
          if (match.status === "planned") {
            handleEditPress();
          }
        }}
        className="flex-row p-4 justify-between items-center bg-surface rounded-2xl border border-background/20"
      >
        <View className="flex-1 mr-4">
          <Text className="text-white font-bold mb-1">
            {teams.team1Name?.toLocaleUpperCase()} vs{" "}
            {teams.team2Name?.toLocaleUpperCase()}
          </Text>
          <Text className="text-muted text-xs capitalize">
            Tennis de table • {""}
            {match.status === "planned" ? "Préparé" : "Terminé"}
          </Text>
        </View>
        <View className="flex-row items-center">
          {match.status === "planned" && (
            <Text className="text-muted text-xs mr-4 font-medium">
              {match.mode === "quick" ? "Mode rapide" : "Mode arbitre"}
            </Text>
          )}
          <Pressable className="bg-background border border-background/30 p-2.5 rounded-xl items-center mr-3 justify-center active:opacity-70">
            <Share2 color={colors.muted} size={18} />
          </Pressable>
          {match.status === "planned" ? (
            <Pressable
              className="bg-primary p-2.5 rounded-xl items-center justify-center active:opacity-80"
              onPress={handlePlayPress}
            >
              <Play color={colors.white} size={18} />
            </Pressable>
          ) : (
            <Text className="font-oswald text-lg text-primary">2 - 1</Text>
          )}
        </View>
      </Pressable>
      <ConfirmModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onConfirm={handleDelete}
        title="Supprimer la rencontre ?"
        message="Êtes-vous sûr de vouloir supprimer ce match ?"
        cancelText="Annuler"
        confirmText="Supprimer"
        isLoading={isDeleting}
        error={error}
      />
    </SwipeToDelete>
  );
}
