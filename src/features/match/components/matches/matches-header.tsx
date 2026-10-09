import { Text } from "react-native";

export default function MatchesHeader({
  title,
  isPrepared,
}: {
  title: string;
  isPrepared: boolean;
}) {
  return (
    <Text
      className={`${isPrepared ? "text-primary" : "text-secondary"} text-lg font-oswald mt-2 mb-3 uppercase tracking-wider`}
    >
      {title}
    </Text>
  );
}
