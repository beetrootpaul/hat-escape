import {
  aspr_,
  b_,
  BpxAnimatedSprite,
  BpxImageUrl,
  BpxSprite,
  BpxVector2d,
  spr_,
  v_,
  v_0_0_,
} from "@beetpx/beetpx";

export class StaticSprite {
  private readonly _sprite: BpxSprite;
  private readonly _offset: BpxVector2d;

  constructor(
    spriteSheetUrl: BpxImageUrl,
    spriteW: number,
    spriteH: number,
    spriteX: number,
    spriteY: number,
    centered: boolean,
  ) {
    this._sprite = spr_(spriteSheetUrl)(spriteW, spriteH, spriteX, spriteY);
    this._offset = centered ? v_(-spriteW / 2, -spriteH / 2) : v_0_0_;
  }

  update(): void {}

  draw(xy: BpxVector2d): void {
    b_.drawSprite(this._sprite, xy.add(this._offset));
  }
}

export class AnimatedSprite {
  private readonly _animatedSprite: BpxAnimatedSprite;
  private readonly _offset: BpxVector2d;
  private _frame: number;
  private readonly _framesN: number;

  constructor(
    spritesheetUrl: BpxImageUrl,
    spriteW: number,
    spriteH: number,
    spriteXs: number[],
    spriteY: number,
    centered: boolean,
  ) {
    this._frame = 0;
    this._framesN = spriteXs.length;

    // TODO: this animates even when the game is paused. Fix it
    this._animatedSprite = aspr_(spritesheetUrl)(
      spriteW,
      spriteH,
      spriteXs.map((x) => [x, spriteY]),
    );
    this._offset = centered ? v_(-spriteW / 2, -spriteH / 2) : v_0_0_;
  }

  update(): void {
    this._frame = (this._frame + 1) % this._framesN;
  }

  draw(xy: BpxVector2d): void {
    b_.drawSprite(this._animatedSprite.current, xy.add(this._offset));
  }
}
