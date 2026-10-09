import { TextLogo } from "@/src/components/ui/text-logo";
import { Text } from "react-native";

interface AuthHeaderProps {
  subtitle?: string;
}

export default function AuthHeader({ subtitle }: AuthHeaderProps) {
  return (
    <>
      <TextLogo
        className="items-center justify-center mb-2 mt-6"
        width={300}
        height={120}
      />
      <Text className="text-muted text-center mb-8">{subtitle}</Text>
    </>
  );
}
