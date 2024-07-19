import {
  $aspr,
  $d,
  $spr,
  $v,
  $v_0_0,
  BpxAnimatedSprite,
  BpxImageUrl,
  BpxSprite,
  BpxVector2d,
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
    this._sprite = $spr(spriteSheetUrl)(spriteW, spriteH, spriteX, spriteY);
    this._offset = centered ? $v(-spriteW / 2, -spriteH / 2) : $v_0_0;
  }

  update(): void {}

  draw(xy: BpxVector2d, flipX: boolean = false): void {
    $d.sprite(this._sprite, xy.add(this._offset), {
      flipXy: [flipX, false],
    });
  }
}

export class AnimatedSprite {
  private readonly _animatedSprite: BpxAnimatedSprite;
  private readonly _offset: BpxVector2d;

  constructor(
    spritesheetUrl: BpxImageUrl,
    spriteW: number,
    spriteH: number,
    spriteXs: number[],
    spriteY: number,
    centered: boolean,
  ) {
    this._animatedSprite = $aspr(spritesheetUrl)(
      spriteW,
      spriteH,
      spriteXs.map(x => [x, spriteY]),
    );
    this._offset = centered ? $v(-spriteW / 2, -spriteH / 2) : $v_0_0;
  }

  draw(xy: BpxVector2d): void {
    $d.sprite(this._animatedSprite.current, xy.add(this._offset));
  }
}
