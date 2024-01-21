import { RoomBlueprints } from "../RoomBlueprints";
import { Hero } from "./Hero";
import { Room } from "./Room";

export class Gameplay {
  constructor() {
    this._roomNumber = 1;
    this._room = new Room(RoomBlueprints.nextRandomBlueprint());
    this._hero = new Hero({ xy: this._room.center });
  }

  private _roomNumber: number;
  private _room: Room;
  private _hero: Hero;

  get roomNumber(): number {
    return this._roomNumber;
  }

  get room(): Room {
    return this._room;
  }

  get hero(): Hero {
    return this._hero;
  }

  loadNextRoom() {
    this._roomNumber += 1;
    this._room = new Room(RoomBlueprints.nextRandomBlueprint());
    this._hero = new Hero({ xy: this._room.center });
  }

  restart() {
    this._roomNumber = 1;
    this._room = new Room(RoomBlueprints.nextRandomBlueprint());
    this._hero = new Hero({ xy: this._room.center });
  }
}
