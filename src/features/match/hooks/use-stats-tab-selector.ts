import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { MatchDetails, MatchSet } from "@/src/features/match/types/match.types";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";

export const useStatsTabSelector = (override?: {
  sets?: MatchSet[];
  mode?: MatchDetails["mode"];
  status?: string;
}) => {
  const store = useMatchStore();

  const match = store.match;

  const sets = override?.sets ?? store.sets;
  const mode = override?.mode ?? match?.mode;
  const status = override?.status ?? match?.status;

  const { currentSet } = useLocalSearchParams<{ currentSet: string }>();
  const totalSetsCount = status === "completed" ? sets.length : sets.length + 1;
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
