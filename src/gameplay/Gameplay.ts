import { Hero } from "./Hero";
import { Room } from "./Room";

export class Gameplay {
  constructor() {
    this._roomNumber = 1;
    this._room = Room.random();
    this._hero = new Hero({ xy: this._room.center });
  }

  private _roomNumber: number;
  private _room: Room;
  private _hero: Hero;

  get currentRoom(): number {
    return this._roomNumber;
  }

  get hero(): Hero {
    return this._hero;
  }

  loadNextRoom() {
    this._roomNumber += 1;
    this._room = Room.random();
    this._hero = new Hero({ xy: this._room.center });
  }

  restart() {
    this._roomNumber = 1;
    this._room = Room.random();
    this._hero = new Hero({ xy: this._room.center });
  }
}
