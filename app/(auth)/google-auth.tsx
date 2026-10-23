import ScreenLayout from "@/src/components/ui/screen-layout";
import ScreenLoader from "@/src/components/ui/screen-loader";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {
  return (
    <ScreenLayout>
      <ScreenLoader />
    </ScreenLayout>
  );
}
