import {
  b_,
  black_,
  BpxEasing,
  BpxTimer,
  rgb_,
  timer_,
  u_,
  v_,
  v_0_0_,
  white_,
} from "@beetpx/beetpx";
import { Collisions } from "./collisions/Collisions";
import { Hero } from "./Hero";
import { Light } from "./Light";
import { Room } from "./Room";

export class Game {
  #hero: Hero;
  #room: Room;
  #roomCounter: number;
  #light: Light;
  #roomTransition: BpxTimer | null;
  #shouldRespawn: boolean;

  constructor() {
    this.#roomCounter = 1;
    this.#room = new Room();
    this.#hero = new Hero(this.#room.getCenter());
    this.#light = new Light(this.#room.getLightXy());
    this.#roomTransition = null;
    this.#shouldRespawn = false;
  }

  update(): void {
    if (this.#roomTransition) {
      this.#roomTransition.update();
      if (this.#roomTransition.hasFinished) {
        this.#roomTransition = null;
      }
    }

    if (
      this.#shouldRespawn &&
      this.#roomTransition &&
      this.#roomTransition.progress > 0.5
    ) {
      this.#shouldRespawn = false;
      this.#roomCounter += 1;
      this.#room = new Room();
      this.#hero.respawnAt(this.#room.getCenter());
      this.#light = new Light(this.#room.getLightXy());
    }

    if (
      !this.#roomTransition &&
      Collisions.areColliding(
        this.#light.getCollisionCircle(),
        this.#hero.getCollisionCircle(),
      )
    ) {
      this.#roomTransition = timer_(60);
      this.#shouldRespawn = true;
    }

    if (!this.#roomTransition) {
      const directions = b_.areDirectionsPressedAsVector();
      this.#hero.move(directions);
    }
  }

  draw(): void {
    b_.clearCanvas(black_);
    this.#room.draw();
    this.#light.draw();
    this.#hero.draw();

    b_.print(`room ${this.#roomCounter}`, v_0_0_, white_);

    if (this.#roomTransition) {
      const x1 = Math.max(
        0,
        u_.lerp(128, 0, BpxEasing.inQuartic(this.#roomTransition.progress * 3)),
      );
      const x2 = Math.min(
        128,
        u_.lerp(
          128,
          0,
          BpxEasing.outQuartic(this.#roomTransition.progress * 3 - 2),
        ),
      );
      b_.rectFilled(v_(x1, 0), v_(x2, 128), rgb_(110, 110, 110));
    }
  }
}
