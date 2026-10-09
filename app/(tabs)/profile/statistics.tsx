import ScreenLayout from "@/src/components/ui/screen-layout";
import ProfileStats from "@/src/features/profile/components/profile-stats";

export default function ProfileStatisticsScreen() {
  return (
    <ScreenLayout scrollable edges={["left", "right"]}>
      <ProfileStats />
    </ScreenLayout>
  );
}
