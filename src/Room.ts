import { b_, BpxVector2d, rgb_, u_, v_ } from "@beetpx/beetpx";
import { g } from "./globals";

export class Room {
  draw(): void {
    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 11; col++) {
        b_.rectFilled(
          g.tile.mul(v_(col, row)),
          g.tile.sub(1),
          rgb_(60, 60, 100),
        );
      }
    }
  }

  getCenter(): BpxVector2d {
    return g.tile.mul(5.5);
  }

  getLightXy(): BpxVector2d {
    return u_.randomElementOf([
      v_(6, 6),
      v_(6 + g.tile.x * 10, 6),
      v_(6, 6 + g.tile.y * 10),
      v_(6 + g.tile.x * 10, 6 + g.tile.y * 10),
    ])!;
  }
}
