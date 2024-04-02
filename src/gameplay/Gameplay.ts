import { MaxReachedRoom } from "../MaxReachedRoom";
import { RoomBlueprints } from "../RoomBlueprints";
import { Collisions } from "../collisions/Collisions";
import { Hero } from "./Hero";
import { Light } from "./Light";
import { Mob } from "./Mob";
import { MobSpawner } from "./MobSpawner";
import { Room } from "./Room";

export class Gameplay {
  constructor() {
    this._roomNumber = 1;
    this._room = new Room(RoomBlueprints.nextRandomBlueprint());
    this._hero = new Hero({ center: this._room.center });
    this._light = new Light({ center: this._room.lightCenter });
    this._spawners = this._room.mobSpawners.map(xy => new MobSpawner({ xy }));
    this._mobs = [];
    this._reachedLight = false;
    this._touchedMob = false;
  }

  private _roomNumber: number;
  private _room: Room;
  private _hero: Hero;
  private _light: Light;
  private _spawners: MobSpawner[];
  private _mobs: Mob[];
  private _reachedLight: boolean;
  private _touchedMob: boolean;

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

  get mobSpawners(): MobSpawner[] {
    return this._spawners;
  }

  get mobs(): Mob[] {
    return this._mobs;
  }

  addMob(mob: Mob) {
    this._mobs.push(mob);
  }

  didHeroReachedLight(): boolean {
    if (this._reachedLight) return true;

    return Collisions.areColliding(
      this._hero.collisionCircle,
      this._light.collisionCircle,
    );
  }

  didHeroGetHitByMob(): boolean {
    if (this._touchedMob) return true;
    if (this._hero.isDashing) return false;
    if (this._hero.isAttacking) return false;

    const hcc = this._hero.collisionCircle;
    return this._mobs.some(m =>
      Collisions.areColliding(m.collisionCircle, hcc),
    );
  }

  destroyMobsAttackedByHero(): void {
    if (!this._hero.isAttacking) return;

    const hcc = this._hero.attackCollisionCircle;
    this._mobs = this._mobs.filter(
      m => !Collisions.areColliding(m.collisionCircle, hcc),
    );
  }

  loadNextRoom() {
    this._roomNumber += 1;
    this._room = new Room(RoomBlueprints.nextRandomBlueprint());
    this._hero = new Hero({ center: this._room.center });
    this._light = new Light({ center: this._room.lightCenter });
    this._spawners = this._room.mobSpawners.map(xy => new MobSpawner({ xy }));
    this._mobs = [];
    this._reachedLight = false;
    this._touchedMob = false;

    MaxReachedRoom.saveToStorageIfHigher(this._roomNumber);
  }

  restart() {
    this._roomNumber = 1;
    this._room = new Room(RoomBlueprints.nextRandomBlueprint());
    this._hero = new Hero({ center: this._room.center });
    this._light = new Light({ center: this._room.lightCenter });
    this._spawners = this._room.mobSpawners.map(xy => new MobSpawner({ xy }));
    this._mobs = [];
    this._reachedLight = false;
    this._touchedMob = false;
  }
}
