import ScreenLoader from "@/src/components/ui/screen-loader";
import { useAuthContext } from "@/src/features/auth/hooks/use-auth-context";
import ProfileStatCard from "@/src/features/profile/components/profile-stat-card";
import ProfileStatRow from "@/src/features/profile/components/profile-stat-row";
import { colors } from "@/src/lib/colors";
import { Activity, Share2, Target, Trophy } from "lucide-react-native";
import { Text, View } from "react-native";
import { useProfileStats } from "../hooks/use-profile-stats";

export default function ProfileQuickStats() {
  const { profile } = useAuthContext();
  const { quickStats, isFetching, error } = useProfileStats(profile?.id);
  const QUICK_STATS = [
    {
      id: "wins",
      Icon: Trophy,
      value: quickStats.wins.toString(),
      label: "Victoires",
    },
    {
      id: "winRate",
      Icon: Activity,
      value: `${quickStats.winRate}%`,
      label: "Taux",
    },
    {
      id: "sharedStories",
      Icon: Share2,
      value: (profile?.stories_shared ?? 0).toString(),
      label: "Stories",
    },
  ];

  const GLOBAL_STATS = [
    {
      id: "total",
      label: "Matchs terminés",
      value: quickStats.matchesPlayed.toString(),
    },
    {
      id: "losses",
      label: "Matchs perdus",
      value: quickStats.losses.toString(),
    },
    {
      id: "sets",
      label: "Sets disputés",
      value: quickStats.setsPlayed.toString(),
    },
    {
      id: "pending",
      label: "Matchs en attente",
      value: quickStats.pending.toString(),
    },
  ];

  return (
    <>
      {isFetching ? (
        <ScreenLoader />
      ) : (
        <>
          <View className="flex-row w-full justify-between mb-4 gap-4">
            {QUICK_STATS.map(({ id, Icon, value, label }) => (
              <View
                key={id}
                className="flex-1 bg-surface p-3 rounded-2xl border border-muted/20 items-center justify-center"
              >
                <Icon color={colors.primary} size={24} />
                <Text className="text-2xl font-oswald text-white">{value}</Text>
                <Text
                  className="text-muted text-xs uppercase mt-1 text-center"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>
          <ProfileStatCard
            title="Bilan Global"
            icon={<Target size={24} color={colors.primary} />}
          >
            {GLOBAL_STATS.map(({ id, label, value }, index) => (
              <ProfileStatRow
                key={id}
                label={label}
                value={value}
                isLast={index === GLOBAL_STATS.length - 1}
              />
            ))}
          </ProfileStatCard>
        </>
      )}
      {error && (
        <Text className="text-danger text-center text-xs">{error}</Text>
      )}
    </>
  );
}
