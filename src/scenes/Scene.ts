export interface Scene {
  init(): void;

  pauseAnimationsAndTimers(): void;

  resumeAnimationsAndTimers(): void;

  update(): void;

  postUpdate(): Scene | null;

  draw(): void;
}
