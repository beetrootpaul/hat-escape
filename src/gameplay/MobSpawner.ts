import { $timerSeq, BpxTimerSequence, BpxVector2d } from "@beetpx/beetpx";
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
  private _timer: BpxTimerSequence<"first_spawn" | "looped_spawn">;

  constructor(params: { xy: BpxVector2d }) {
    this._xy = params.xy;
    this._timer = $timerSeq(
      {
        intro: [["first_spawn", MobSpawner._interval / 3]],
        loop: [["looped_spawn", MobSpawner._interval]],
      },
      { paused: true },
    );
  }

  pause(): void {
    this._timer.pause();
  }

  restart(): void {
    this._timer.restart();
  }

  update(target: MobTarget): Mob | null {
    if (this._timer.justFinishedPhase) {
      return new Mob({ center: this._xy.add(g.ts.div(2)), target });
    }

    return null;
  }

  draw(): void {
    if (this._timer.framesLeft <= 4 || this._timer.justFinishedPhase) {
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
