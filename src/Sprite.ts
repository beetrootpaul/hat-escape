import {
  b_,
  BpxImageUrl,
  BpxSprite,
  BpxVector2d,
  spr_,
  u_,
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
    this._sprite = spr_(spriteSheetUrl)(spriteX, spriteY, spriteW, spriteH);
    this._offset = centered ? v_(-spriteW / 2, -spriteH / 2) : v_0_0_;
  }

  update(): void {}

  draw(xy: BpxVector2d): void {
    b_.sprite(this._sprite, xy.add(this._offset));
  }
}

export class AnimatedSprite {
  private readonly _sprites: BpxSprite[];
  private readonly _offset: BpxVector2d;
  private _frame: number = 0;
  private readonly _framesN: number;

  constructor(
    spritesheetUrl: BpxImageUrl,
    spriteW: number,
    spriteH: number,
    spriteXs: number[],
    spriteY: number,
    centered: boolean,
  ) {
    this._framesN = spriteXs.length;

    this._sprites = u_
      .range(this._framesN)
      .map((frame) =>
        spr_(spritesheetUrl)(spriteXs[frame]!, spriteY, spriteW, spriteH),
      );
    this._offset = centered ? v_(-spriteW / 2, -spriteH / 2) : v_0_0_;
  }

  update(): void {
    this._frame = (this._frame + 1) % this._framesN;
  }

  draw(xy: BpxVector2d): void {
    b_.sprite(this._sprites[this._frame]!, xy.add(this._offset));
  }
}
