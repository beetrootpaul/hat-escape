export interface Scene {
  init(): void;

  update(): void;

  postUpdate(): Scene | null;

  draw(): void;
}
