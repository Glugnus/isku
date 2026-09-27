import ScreenLayout from "@/src/components/ui/screen-layout";
import TrackerCourt from "@/src/features/match/components/tracker/tracker-court";
import TrackerFooter from "@/src/features/match/components/tracker/tracker-footer";
import TrackerHeader from "@/src/features/match/components/tracker/tracker-header";

export default function TrackerScreen() {
  return (
    <ScreenLayout>
      <TrackerHeader />
      <TrackerCourt />
      <TrackerFooter />
    </ScreenLayout>
  );
}
