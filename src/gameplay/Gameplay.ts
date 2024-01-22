import { RoomBlueprints } from "../RoomBlueprints";
import { Collisions } from "../collisions/Collisions";
import { Hero } from "./Hero";
import { Light } from "./Light";
import { Room } from "./Room";

export class Gameplay {
  constructor() {
    this._roomNumber = 1;
    this._room = new Room(RoomBlueprints.nextRandomBlueprint());
    this._hero = new Hero({ center: this._room.center });
    this._light = new Light({ center: this._room.lightCenter });
    this._reachedLight = false;
  }

  private _roomNumber: number;
  private _room: Room;
  private _hero: Hero;
  private _light: Light;
  private _reachedLight: boolean;

  get roomNumber(): number {
    return this._roomNumber;
  }

  get room(): Room {
    return this._room;
  }

  get hero(): Hero {
    return this._hero;
  }

  get light(): Light {
    return this._light;
  }

  didHeroReachedLight(): boolean {
    if (this._reachedLight) return true;

    return Collisions.areColliding(
      this._hero.collisionCircle,
      this._light.collisionCircle,
    );
  }

  loadNextRoom() {
    this._roomNumber += 1;
    this._room = new Room(RoomBlueprints.nextRandomBlueprint());
    this._hero = new Hero({ center: this._room.center });
    this._light = new Light({ center: this._room.lightCenter });
    this._reachedLight = false;
  }

  restart() {
    this._roomNumber = 1;
    this._room = new Room(RoomBlueprints.nextRandomBlueprint());
    this._hero = new Hero({ center: this._room.center });
    this._light = new Light({ center: this._room.lightCenter });
    this._reachedLight = false;
  }
}
