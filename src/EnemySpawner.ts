import { b_, BpxTimer, BpxVector2d, rgb_, timer_, v_ } from "@beetpx/beetpx";
import { Enemy } from "./Enemy";
import { EnemyTarget } from "./EnemyTarget";

export class EnemySpawner {
  #xy: BpxVector2d;

  #timer: BpxTimer = timer_(60);

  constructor(xy: BpxVector2d) {
    this.#xy = xy;
    for (let i = 0; i < 30; i++) {
      this.#timer.update();
    }
  }

  update(target: EnemyTarget): Enemy | null {
    this.#timer.update();

    if (this.#timer.hasFinished) {
      this.#timer = timer_(60);
      return new Enemy(this.#xy, target);
    }

    return null;
  }

  restart(): void {
    for (let i = 0; i < 30; i++) {
      this.#timer.update();
    }
  }

  draw(): void {
    b_.ellipse(this.#xy.sub(4), v_(9, 9), rgb_(100, 30, 30));
  }
}
