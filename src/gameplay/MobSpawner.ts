import { BpxTimer, BpxVector2d, timer_ } from "@beetpx/beetpx";
import { StaticSprite } from "../Sprite";
import { g } from "../globals";
import { Mob, MobTarget } from "./Mob";

export class MobSpawner {
  private static _interval: number = 60;
  private static _spriteIdle: StaticSprite = new StaticSprite(
    g.images.tiles,
    8,
    8,
    80,
    0,
    false,
  );
  private static _spriteSpawning1: StaticSprite = new StaticSprite(
    g.images.tiles,
    8,
    8,
    104,
    0,
    false,
  );
  private static _spriteSpawning2: StaticSprite = new StaticSprite(
    g.images.tiles,
    8,
    8,
    112,
    0,
    false,
  );
  private static _spriteSpawning3: StaticSprite = new StaticSprite(
    g.images.tiles,
    8,
    8,
    96,
    0,
    false,
  );
  private static _spriteSpawning4: StaticSprite = new StaticSprite(
    g.images.tiles,
    8,
    8,
    88,
    0,
    false,
  );

  private readonly _xy: BpxVector2d;
  private _timer: BpxTimer;

  constructor(params: { xy: BpxVector2d }) {
    this._xy = params.xy;
    this._timer = timer_(MobSpawner._interval);
    while (this._timer.framesLeft > MobSpawner._interval / 3) {
      this._timer.update();
    }
  }

  update(target: MobTarget): Mob | null {
    if (this._timer.hasFinished) {
      this._timer.restart();
      return new Mob({ center: this._xy.add(g.ts.div(2)), target });
    }

    this._timer.update();

    return null;
  }

  draw(): void {
    if (this._timer.framesLeft <= 4) {
      MobSpawner._spriteSpawning4.draw(this._xy);
    } else if (this._timer.framesLeft <= 8) {
      MobSpawner._spriteSpawning3.draw(this._xy);
    } else if (this._timer.framesLeft <= 12) {
      MobSpawner._spriteSpawning2.draw(this._xy);
    } else if (this._timer.framesLeft <= 16) {
      MobSpawner._spriteSpawning1.draw(this._xy);
    } else {
      MobSpawner._spriteIdle.draw(this._xy);
    }
  }
}
