import ScreenLayout from "@/src/components/ui/screen-layout";
import SignOutButton from "@/src/features/auth/components/social-auth-buttons/sign-out-button";
import ProfileDonation from "@/src/features/profile/components/profile-donation";
import ProfileHeader from "@/src/features/profile/components/profile-header";
import ProfileQuickStats from "@/src/features/profile/components/profile-quick-stats";

export default function ProfileScreen() {
  return (
    <ScreenLayout scrollable edges={["left", "right"]}>
      <ProfileHeader />
      <ProfileQuickStats />
      <ProfileDonation />
      <SignOutButton />
    </ScreenLayout>
  );
}
