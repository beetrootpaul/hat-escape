import { b_, v_1_1_ } from "@beetpx/beetpx";
import { Hud } from "../Hud";
import { MaxReachedRoom } from "../MaxReachedRoom";
import { Gameplay } from "../gameplay/Gameplay";
import { c } from "../globals";
import { Scene } from "./Scene";
import { SceneRoomTransition } from "./SceneRoomTransition";

export class SceneRoomGameplay implements Scene {
  constructor(params: { gameplay: Gameplay }) {
    this._gameplay = params.gameplay;
  }

  private readonly _gameplay: Gameplay;
  private readonly _hud: Hud = new Hud();

  init(): void {}

  update(): void {
    this._gameplay.light.update();

    this._gameplay.hero.update(
      b_.areDirectionsPressedAsVector(),
      b_.wasJustPressed("a"),
      b_.wasJustPressed("b"),
      this._gameplay.room,
    );

    for (const mobSpawner of this._gameplay.mobSpawners) {
      const spawnedMob = mobSpawner.update(this._gameplay.hero);
      if (spawnedMob) {
        this._gameplay.addMob(spawnedMob);
      }
    }

    for (const mob of this._gameplay.mobs) {
      mob.update(this._gameplay.room);
    }

    this._gameplay.destroyMobsAttackedByHero();
  }

  postUpdate(): Scene | null {
    if (this._gameplay.didHeroReachedLight()) {
      return new SceneRoomTransition({
        gameplay: this._gameplay,
        success: true,
      });
    }
    if (this._gameplay.didHeroGetHitByMob()) {
      return new SceneRoomTransition({
        gameplay: this._gameplay,
        success: false,
      });
    }
    return null;
  }

  draw(): void {
    b_.clearCanvas(c.blueGreen5);
    b_.print("gameplay", v_1_1_, c.blueGreen1);
    b_.print(
      `room ${this._gameplay.roomNumber}`,
      v_1_1_.add(0, 20),
      c.blueGreen1,
    );
    b_.print("TODO", v_1_1_.add(0, 40), c.blueGreen1);

    this._gameplay.room.draw();
    for (const mobSpawner of this._gameplay.mobSpawners) {
      mobSpawner.draw();
    }
    this._gameplay.hero.draw();
    for (const mob of this._gameplay.mobs) {
      mob.draw();
    }
    this._gameplay.light.draw();

    this._hud.draw(this._gameplay.roomNumber, MaxReachedRoom.maxReached);
  }
}
