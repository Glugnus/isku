import { Text } from "react-native";

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <Text className="text-white text-xs font-bold uppercase tracking-widest mb-3">
      {title}
    </Text>
  );
}
