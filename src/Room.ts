import { b_, BpxVector2d, rgb_, u_, v_ } from "@beetpx/beetpx";
import { g } from "./globals";
import { Wall } from "./Wall";

export class Room {
  static #boundaries: Wall[] = [
    new Wall(v_(0, 0), v_(128, 8)),
    new Wall(v_(0, 120), v_(128, 8)),
  ];
  static #wallConfigurations: Array<Wall[]> = [
    [],
    [new Wall(v_(40, 40), v_(64, 8))],
    [new Wall(v_(20, 50), v_(4, 38)), new Wall(v_(100, 50), v_(4, 38))],
  ];

  #offset: BpxVector2d = v_(2, 2);

  #walls: Wall[];

  constructor() {
    this.#walls = Room.#boundaries;
    this.#walls = this.#walls.concat(
      u_.randomElementOf(Room.#wallConfigurations)!,
    );
  }

  draw(): void {
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        b_.rectFilled(
          this.#offset.add(g.tile.mul(v_(col, row))),
          g.tile.sub(1),
          rgb_(60, 60, 100),
        );
      }
    }

    for (const wall of this.#walls) {
      wall.draw();
    }
  }

  getCenter(): BpxVector2d {
    return this.#offset.add(g.tile.mul(8));
  }

  getLightXy(): BpxVector2d {
    return this.#offset.add(
      u_.randomElementOf([
        v_(16, 16),
        v_(6 + g.tile.x * 13, 6),
        v_(6, 6 + g.tile.y * 13),
        v_(6 + g.tile.x * 13, 6 + g.tile.y * 13),
      ])!,
    );
  }
}
