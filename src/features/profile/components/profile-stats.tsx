import ProfileStatCard from "@/src/features/profile/components/profile-stat-card";
import ProfileStatRow from "@/src/features/profile/components/profile-stat-row";
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
import { View } from "react-native";

export default function ProfileStats() {
  const SERVICE_STATS = [
    {
      id: "serve",
      icon: <Target color={colors.secondary} size={18} />,
      label: "Sur son service",
      value: 60,
      subValue: `60% (sur 100 joué)`,
    },
    {
      id: "return",
      icon: <Shield color={colors.primary} size={18} />,
      label: "En retour",
      value: 55,
      subValue: `55% (sur 100 joué)`,
    },
  ];

  const STATS = [
    {
      id: "winners",
      icon: <CheckCircle color={colors.secondary} size={18} />,
      label: "Coups Gagnants",
      value: 5,
      subValue: `5% des pts gagnés`,
    },
    {
      id: "ufe",
      icon: <AlertTriangle color={colors.red} size={18} />,
      label: "Fautes Directes",
      value: 5,
      subValue: `5% des pts perdus`,
    },
    {
      id: "lead",
      icon: <ChevronsUp color={colors.primary} size={18} />,
      label: "Plus Grande Avance",
      value: 5,
    },
    {
      id: "streak",
      icon: <Flame color={colors.primary} size={18} />,
      label: "Plus Longue Série (Points)",
      value: 5,
    },
    {
      id: "deficit",
      icon: <RotateCcw color={colors.secondary} size={18} />,
      label: "Retard Max Remonté",
      value: 5,
    },
  ];
  return (
    <View>
      <ProfileStatCard
        title="Service & Retour"
        icon={<Zap size={24} color={colors.primary} />}
      >
        {SERVICE_STATS.map(({ id, label, value, subValue, icon }, index) => (
          <ProfileStatRow
            key={id}
            label={label}
            value={value}
            subValue={subValue}
            icon={icon}
            isLast={index === SERVICE_STATS.length - 1}
          />
        ))}
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
    </View>
  );
}
