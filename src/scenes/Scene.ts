export interface Scene {
  init(): void;

  pauseAnimations(): void;

  resumeAnimations(): void;

  update(): void;

  postUpdate(): Scene | null;

  draw(): void;
}
