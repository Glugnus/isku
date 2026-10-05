import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";

export const useStatsTabSelector = () => {
  const { match, sets } = useMatchStore();
  const { currentSet } = useLocalSearchParams<{ currentSet: string }>();
  const mode = match?.mode;
  const totalSetsCount =
    match?.status === "completed" ? sets.length : sets.length + 1;
  const tabs = [
    "Match",
    ...Array.from({ length: totalSetsCount }, (_, i) => `Set ${i + 1}`),
  ];

  const targetTab = currentSet ? `Set ${currentSet}` : null;
  const initialTab =
    targetTab && tabs.includes(targetTab) ? targetTab : tabs[0];

  const [selectedTab, setSelectedTab] = useState(initialTab);

  const pagerRef = useRef<PagerView>(null);

  const onTabChange = (tab: string) => {
    const index = tabs.indexOf(tab);
    pagerRef.current?.setPage(index);
    setSelectedTab(tab);
  };

  const onPageSelected = (e: PagerViewOnPageSelectedEvent) => {
    setSelectedTab(tabs[e.nativeEvent.position]);
  };

  const initialPage = tabs.indexOf(selectedTab);

  return {
    tabs,
    selectedTab,
    pagerRef,
    setSelectedTab,
    onTabChange,
    mode,
    initialPage,
    onPageSelected,
  };
};
