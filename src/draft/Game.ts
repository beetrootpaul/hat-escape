import {
  b_,
  black_,
  BpxEasing,
  BpxRgbColor,
  BpxTimer,
  green_,
  rgb_,
  timer_,
  u_,
  v_,
  v_1_1_,
  white_,
} from "@beetpx/beetpx";
import { Collisions } from "../collisions/Collisions";
import { Enemy } from "./Enemy";
import { Hero } from "./Hero";
import { Room } from "./Room";

export class Game {
  readonly #hero: Hero;
  #room: Room;
  #roomCounter: number;
  #roomTransition: BpxTimer | null;
  #shouldRespawn: boolean;
  #enemies: Array<Enemy> = [];
  #transitionColor: BpxRgbColor = green_;

  constructor() {
    this.#roomCounter = 1;
    this.#room = new Room();
    this.#hero = new Hero(this.#room.getCenter());
    this.#roomTransition = null;
    this.#shouldRespawn = false;
  }

  update(): void {
    this.#enemies = this.#enemies.filter((e) => e.isAlive);

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
      this.#enemies = [];
    }

    if (!this.#roomTransition) {
      this.#roomTransition = timer_(60);
      this.#shouldRespawn = true;
      this.#transitionColor = rgb_(110, 110, 110);
    }

    if (!this.#roomTransition) {
      const attackCc = this.#hero.getAttackCollisionCircle();
      if (attackCc) {
        for (const enemy of this.#enemies) {
          if (Collisions.areColliding(enemy.getCollisionCircle(), attackCc)) {
            enemy.destroy();
          }
        }
      }
    }

    if (!this.#roomTransition && !this.#hero.isDashing()) {
      for (const enemy of this.#enemies) {
        if (
          Collisions.areColliding(
            enemy.getCollisionCircle(),
            this.#hero.getCollisionCircle(),
          )
        ) {
          this.#roomTransition = timer_(120);
          this.#shouldRespawn = true;
          this.#roomCounter = 0;
          this.#transitionColor = rgb_(130, 13, 13);
          break;
        }
      }
    }

    if (!this.#roomTransition || this.#roomTransition.progress > 0.6) {
      const directions = b_.areDirectionsPressedAsVector();
      if (!this.#hero.isDashing()) {
        this.#hero.move(directions);
      }
      this.#hero.update(this.#room.walls);
      if (b_.isPressed("a") && this.#hero.canDash()) {
        this.#hero.dash();
      }
      if (b_.isPressed("b") && this.#hero.canAttack()) {
        this.#hero.attack();
      }
    }

    for (const enemy of this.#enemies) {
      enemy.update(this.#room.walls);
    }
  }

  draw(): void {
    b_.clearCanvas(black_);
    this.#room.draw();
    this.#hero.draw();
    for (const enemy of this.#enemies) {
      enemy.draw();
    }

    u_.printWithOutline(`room ${this.#roomCounter}`, v_1_1_, white_, black_);

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
      b_.rectFilled(v_(x1, 0), v_(x2, 128), this.#transitionColor);
    }
  }
}
