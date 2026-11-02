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
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function ProfileStats() {
  const { t } = useTranslation("profile");
  const { serveStats, performanceStats, isFetching, error } =
    useProfileStatsContext();
  const SERVICE_STATS = [
    {
      id: "serve",
      icon: <Target color={colors.secondary} size={18} />,
      label: t("stats.service.ownServe"),
      subValue: `${serveStats?.pointsWonOnServe} / ${serveStats.pointsPlayedOnServe}`,
      value: `${serveStats?.servePointsWonRate}%`,
    },
    {
      id: "return",
      icon: <Shield color={colors.primary} size={18} />,
      label: t("stats.service.return"),
      subValue: `${serveStats?.pointsWonOnReturn} / ${serveStats?.pointsPlayedOnReturn}`,
      value: `${serveStats?.returnPointsWonRate}%`,
    },
  ];

  const STATS = [
    {
      id: "winners",
      icon: <CheckCircle color={colors.secondary} size={18} />,
      label: t("stats.performance.winners"),
      subValue: `${performanceStats?.winners} / ${performanceStats.pointsPlayed}`,
      value: `${performanceStats?.winnersRate}%`,
    },
    {
      id: "ufe",
      icon: <AlertTriangle color={colors.red} size={18} />,
      label: t("stats.performance.unforcedErrors"),
      subValue: `${performanceStats?.ufe} / ${performanceStats.pointsPlayed}`,
      value: `${performanceStats?.ufeRate}%`,
    },
    {
      id: "lead",
      icon: <ChevronsUp color={colors.primary} size={18} />,
      label: t("stats.performance.maxLead"),
      value: performanceStats?.maxLead,
    },
    {
      id: "streak",
      icon: <Flame color={colors.primary} size={18} />,
      label: t("stats.performance.longestStreak"),
      value: performanceStats?.longestStreak,
    },
    {
      id: "deficit",
      icon: <RotateCcw color={colors.secondary} size={18} />,
      label: t("stats.performance.maxDeficit"),
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
            title={t("stats.service.title")}
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
            title={t("stats.performance.title")}
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
