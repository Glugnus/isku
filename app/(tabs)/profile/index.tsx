import ScreenLayout from "@/src/components/ui/screen-layout";
import ProfileHeader from "@/src/features/profile/components/profile-header";
import ProfileQuickStats from "@/src/features/profile/components/profile-quick-stats";

export default function ProfileScreen() {
  return (
    <ScreenLayout scrollable edges={["left", "right"]}>
      <ProfileHeader />
      <ProfileQuickStats />
    </ScreenLayout>
  );
}
