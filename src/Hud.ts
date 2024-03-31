import { b_, v_ } from "@beetpx/beetpx";
import { c, g } from "./globals";

export class Hud {
  draw(currentRoom: number, maxRoom: number): void {
    const roomLabelSize = b_.measureText("ROOM").wh;
    b_.drawText("ROOM", v_(2, g.vs.y - 3 - roomLabelSize.y), c.redYellow3);
    b_.drawText(
      currentRoom.toString(),
      v_(2 + roomLabelSize.x + 6, g.vs.y - 3 - roomLabelSize.y),
      c.redYellow2,
    );

    const bestLabelSize = b_.measureText("BEST").wh;
    b_.drawText(
      "BEST",
      v_(g.vs.x - 2 - bestLabelSize.x, g.vs.y - 3 - bestLabelSize.y),
      c.blueGreen2,
    );
    const maxRoomSize = b_.measureText(maxRoom.toString()).wh;
    b_.drawText(
      maxRoom.toString(),
      v_(
        g.vs.x - 2 - bestLabelSize.x - 6 - maxRoomSize.x,
        g.vs.y - 3 - bestLabelSize.y,
      ),
      c.blueGreen1,
    );
  }
}
