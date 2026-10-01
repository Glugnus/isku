import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { useRef, useState } from "react";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";

export const useStatsTabSelector = () => {
  const { match, sets } = useMatchStore();

  const mode = match?.mode;
  const totalSetsCount =
    match?.status === "completed" ? sets.length : sets.length + 1;

  const tabs = [
    "Match",
    ...Array.from({ length: totalSetsCount }, (_, i) => `Set ${i + 1}`),
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
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
