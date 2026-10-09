import ScreenLoader from "@/src/components/ui/screen-loader";
import ProfileStatCard from "@/src/features/profile/components/profile-stat-card";
import ProfileStatRow from "@/src/features/profile/components/profile-stat-row";
import { useProfileStatsContext } from "@/src/features/profile/hooks/use-profile-stats-context";
import { colors } from "@/src/lib/colors";
import {
  AlertTriangle,
  CheckCircle,
  ChevronsUp,
  Flame,
  RotateCcw,
  Shield,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react-native";
import { Text, View } from "react-native";

export default function ProfileStats() {
  const { serveStats, performanceStats, isFetching, error } =
    useProfileStatsContext();
  const SERVICE_STATS = [
    {
      id: "serve",
      icon: <Target color={colors.secondary} size={18} />,
      label: "Sur son service",
      subValue: `${serveStats?.pointsWonOnServe} / ${serveStats.pointsPlayedOnServe}`,
      value: `${serveStats?.servePointsWonRate}%`,
    },
    {
      id: "return",
      icon: <Shield color={colors.primary} size={18} />,
      label: "En retour",
      subValue: `${serveStats?.pointsWonOnReturn} / ${serveStats?.pointsPlayedOnReturn}`,
      value: `${serveStats?.returnPointsWonRate}%`,
    },
  ];

  const STATS = [
    {
      id: "winners",
      icon: <CheckCircle color={colors.secondary} size={18} />,
      label: "Coups Gagnants",
      subValue: `${performanceStats?.winners} / ${performanceStats.pointsPlayed}`,
      value: `${performanceStats?.winnersRate}%`,
    },
    {
      id: "ufe",
      icon: <AlertTriangle color={colors.red} size={18} />,
      label: "Fautes Directes",
      subValue: `${performanceStats?.ufe} / ${performanceStats.pointsPlayed}`,
      value: `${performanceStats?.ufeRate}%`,
    },
    {
      id: "lead",
      icon: <ChevronsUp color={colors.primary} size={18} />,
      label: "Plus Grande Avance",
      value: performanceStats?.maxLead,
    },
    {
      id: "streak",
      icon: <Flame color={colors.primary} size={18} />,
      label: "Plus Longue Série (Points)",
      value: performanceStats?.longestStreak,
    },
    {
      id: "deficit",
      icon: <RotateCcw color={colors.secondary} size={18} />,
      label: "Retard Max Remonté",
      value: performanceStats?.maxDeficit,
    },
  ];
  return (
    <View>
      {isFetching ? (
        <ScreenLoader />
      ) : (
        <>
          <ProfileStatCard
            title="Service & Retour"
            icon={<Zap size={24} color={colors.primary} />}
          >
            {SERVICE_STATS.map(
              ({ id, label, value, subValue, icon }, index) => (
                <ProfileStatRow
                  key={id}
                  label={label}
                  value={value}
                  subValue={subValue}
                  icon={icon}
                  isLast={index === SERVICE_STATS.length - 1}
                />
              ),
            )}
          </ProfileStatCard>
          <ProfileStatCard
            title="Performances"
            icon={<TrendingUp size={24} color={colors.primary} />}
          >
            {STATS.map(({ id, label, value, subValue, icon }, index) => (
              <ProfileStatRow
                key={id}
                label={label}
                value={value}
                subValue={subValue}
                icon={icon}
                isLast={index === STATS.length - 1}
              />
            ))}
          </ProfileStatCard>
        </>
      )}
      {error && (
        <Text className="text-danger text-center text-xs">{error}</Text>
      )}
    </View>
  );
}
