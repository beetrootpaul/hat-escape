export class Gameplay {
  private _currentRoom: number = 1;

  get currentRoom(): number {
    return this._currentRoom;
  }

  loadNextRoom() {
    this._currentRoom += 1;
  }

  restart() {
    this._currentRoom = 1;
  }
}
