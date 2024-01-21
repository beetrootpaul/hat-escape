import { b_, BpxVector2d, rgb_, u_, v_ } from "@beetpx/beetpx";
import { g } from "../globals";
import { Wall } from "./Wall";

export class Room {
  static #boundaries: Wall[] = [
    new Wall(v_(0, 0), v_(128, 4)),
    new Wall(v_(0, 124), v_(128, 4)),
    new Wall(v_(0, 0), v_(4, 128)),
    new Wall(v_(124, 0), v_(4, 128)),
  ];
  static #wallConfigurations: Array<Wall[]> = [
    [],
    [new Wall(v_(40, 40), v_(64, 16))],
    [new Wall(v_(20, 50), v_(16, 38)), new Wall(v_(116, 50), v_(16, 38))],
  ];

  #offset: BpxVector2d = v_(2, 2);

  walls: Wall[];

  constructor() {
    this.walls = Room.#boundaries;
    this.walls = this.walls.concat(
      u_.randomElementOf(Room.#wallConfigurations)!,
    );
  }

  draw(): void {
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        b_.rectFilled(
          this.#offset.add(g.ts.mul(v_(col, row))),
          g.ts.sub(1),
          rgb_(40, 40, 80),
        );
      }
    }

    for (const wall of this.walls) {
      wall.draw();
    }
  }

  getCenter(): BpxVector2d {
    return this.#offset.add(g.ts.mul(8));
  }

  getLightXy(): BpxVector2d {
    return this.#offset.add(
      u_.randomElementOf([
        v_(16, 16),
        v_(8 + g.ts.x * 13, 8),
        v_(8, 6 + g.ts.y * 13),
        v_(8 + g.ts.x * 13, 8 + g.ts.y * 13),
      ])!,
    );
  }
}
