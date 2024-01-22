import { b_ } from "@beetpx/beetpx";

export class MaxReachedRoom {
  private static _maxReached: number = 1;

  static get maxReached(): number {
    return this._maxReached;
  }

  static loadFromStorage(): void {
    const persistedState = b_.loadPersistedState();
    if (
      persistedState &&
      "max_reached" in persistedState &&
      typeof persistedState.max_reached === "number"
    ) {
      this._maxReached = Math.max(0, persistedState.max_reached);
    }
  }

  static saveToStorageIfHigher(maybeNewMaxReached: number): void {
    if (maybeNewMaxReached > this._maxReached) {
      this._maxReached = maybeNewMaxReached;
      b_.savePersistedState({ max_reached: maybeNewMaxReached });
    }
  }
}
