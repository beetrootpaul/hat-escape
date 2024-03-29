import { b_, u_, v_ } from "@beetpx/beetpx";
import { c, g } from "./globals";

export class Hud {
  draw(currentRoom: number, maxRoom: number): void {
    const roomLabelSize = u_.measureText("ROOM");
    b_.drawText("ROOM", v_(2, g.vs.y - 3 - roomLabelSize[1].y), c.redYellow3);
    b_.drawText(
      currentRoom.toString(),
      v_(2 + roomLabelSize[1].x + 6, g.vs.y - 3 - roomLabelSize[1].y),
      c.redYellow2,
    );

    const bestLabelSize = u_.measureText("BEST");
    b_.drawText(
      "BEST",
      v_(g.vs.x - 2 - bestLabelSize[1].x, g.vs.y - 3 - bestLabelSize[1].y),
      c.blueGreen2,
    );
    const maxRoomSize = u_.measureText(maxRoom.toString());
    b_.drawText(
      maxRoom.toString(),
      v_(
        g.vs.x - 2 - bestLabelSize[1].x - 6 - maxRoomSize[1].x,
        g.vs.y - 3 - bestLabelSize[1].y,
      ),
      c.blueGreen1,
    );
  }
}
