import { runDeceleratingAnimation } from "@/src/components/utils/decelerating-animation";
import { useMatchStore } from "@/src/features/match/store/use-match-store";
import { useCallback, useEffect, useRef, useState } from "react";

export const useToss = () => {
  const [isTossing, setIsTossing] = useState(false);
  const [isTossDone, setIsTossDone] = useState(false);
  const [annimServer, setAnnimServer] = useState<"p1" | "p2">("p1");
  const { firstServer, setFirstServer } = useMatchStore();

  const cancelAnimationRef = useRef<(() => void) | null>(null);

  const clearTossTimeout = useCallback(() => {
    if (cancelAnimationRef.current) {
      cancelAnimationRef.current();
      cancelAnimationRef.current = null;
    }
  }, []);

  useEffect(() => {
    return clearTossTimeout;
  }, [clearTossTimeout]);

  const handleRandomToss = () => {
    clearTossTimeout();
    setAnnimServer("p1");
    setIsTossing(true);
    setIsTossDone(false);
    const finalServer = Math.floor(Math.random() * 2) + 1 === 1 ? "p1" : "p2";
    cancelAnimationRef.current = runDeceleratingAnimation({
      maxSteps: finalServer === "p1" ? 16 : 15,
      onStep: () => setAnnimServer((prev) => (prev === "p1" ? "p2" : "p1")),
      onComplete: () => {
        setFirstServer(finalServer);
        setIsTossing(false);
        setIsTossDone(true);
        cancelAnimationRef.current = null;
      },
    });
  };

  const unlockToss = () => {
    setIsTossDone(false);
  };

  return {
    firstServer,
    setFirstServer,
    handleRandomToss,
    isTossing,
    isTossDone,
    unlockToss,
    annimServer,
  };
};
