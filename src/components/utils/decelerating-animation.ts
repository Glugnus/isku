export interface RunDeceleratingAnimationOptions {
  initialDelay?: number;
  decelerationFactor?: number;
  maxSteps: number;
  onStep: (step: number) => void;
  onComplete: () => void;
}

export const runDeceleratingAnimation = ({
  initialDelay = 45,
  decelerationFactor = 1.18,
  maxSteps,
  onStep,
  onComplete,
}: RunDeceleratingAnimationOptions) => {
  let delay = initialDelay;
  let step = 0;
  let timeoutId: ReturnType<typeof setTimeout>;
  let isCancelled = false;

  if (isCancelled) return;
  if (maxSteps <= 0) {
    onComplete();
    return;
  }
  const loop = () => {
    onStep(step);
    step++;

    if (step < maxSteps) {
      delay = Math.floor(delay * decelerationFactor);
      timeoutId = setTimeout(loop, delay);
    } else {
      onComplete();
    }
  };

  loop();

  return () => {
    isCancelled = true;
    clearTimeout(timeoutId);
  };
};
