import { useMatchStore } from "@/src/features/match/store/use-match-store";
import {
  MatchDetails,
  MatchSet,
  StatsTab,
} from "@/src/features/match/types/match.types";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";

export const useStatsTabSelector = (override?: {
  sets?: MatchSet[];
  mode?: MatchDetails["mode"];
  status?: string;
}) => {
  const { t } = useTranslation("match");
  const store = useMatchStore();
  const match = store.match;

  const sets = override?.sets ?? store.sets;
  const mode = override?.mode ?? match?.mode;
  const status = override?.status ?? match?.status;

  const { currentSet } = useLocalSearchParams<{ currentSet: string }>();
  const totalSetsCount = status === "completed" ? sets.length : sets.length + 1;
  const tabs: StatsTab[] = [
    { key: "match", label: t("stats.tabs.match") },
    ...Array.from({ length: totalSetsCount }, (_, i) => ({
      key: `set-${i + 1}`,
      label: t("stats.tabs.set", { number: i + 1 }),
      setNumber: i + 1,
    })),
  ];

  const targetTabKey = currentSet ? `set-${currentSet}` : null;
  const initialTabKey =
    targetTabKey && tabs.some((t) => t.key === targetTabKey)
      ? targetTabKey
      : tabs[0].key;

  const [selectedTabKey, setSelectedTabKey] = useState(initialTabKey);

  const pagerRef = useRef<PagerView>(null);

  const onTabChange = (tab: StatsTab) => {
    const index = tabs.indexOf(tab);
    pagerRef.current?.setPage(index);
    setSelectedTabKey(tab.key);
  };

  const onPageSelected = (e: PagerViewOnPageSelectedEvent) => {
    setSelectedTabKey(tabs[e.nativeEvent.position].key);
  };

  const initialPage = tabs.findIndex((t) => t.key === selectedTabKey);

  return {
    tabs,
    selectedTabKey,
    pagerRef,
    setSelectedTabKey,
    onTabChange,
    mode,
    initialPage,
    onPageSelected,
  };
};
