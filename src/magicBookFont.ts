import { $font, $spr, $v, BpxFont, BpxGlyph } from "@beetpx/beetpx";
import { g } from "./globals";

type Metrics = {
  name: string;
  size: number;
  ascent: number;
  descent: number;
  char_count: number;
  kerning_count: number;
  chars: number[];
  advance: number[];
  offset_x: number[];
  offset_y: number[];
  width: number[];
  height: number[];
  pack_x: number[];
  pack_y: number[];
  kerning: number[];
};

export const magicBookFontFrom = (metrics: Metrics): BpxFont => {
  const glyphs = new Map<string, BpxGlyph>([]);

  metrics.chars.forEach((charCode, idx) => {
    glyphs.set(String.fromCharCode(charCode), {
      type: "sprite",
      sprite: $spr(g.images.font)(
        metrics.width[idx]!,
        metrics.height[idx]!,
        metrics.pack_x[idx]!,
        metrics.pack_y[idx]!,
      ),
      isTextColor: color =>
        color?.cssHex === "#ffffff" || color?.cssHex === "#fefefe",
      offset: $v(
        metrics.offset_x[idx]!,
        metrics.height[idx]! + metrics.offset_y[idx]!,
      ),
      advance: metrics.advance[idx]! + 1,
    });
  });

  for (let idx = 0; idx < metrics.kerning_count; idx++) {
    const charLeft = String.fromCharCode(metrics.kerning[3 * idx]!);
    const charRight = String.fromCharCode(metrics.kerning[3 * idx + 1]!);
    const kerning = metrics.kerning[3 * idx + 2]!;
    const glyph = glyphs.get(charRight);
    if (glyph) {
      glyph.kerning ??= {};
      glyph.kerning[charLeft] = kerning;
    }
  }

  // manual corrections to the font
  glyphs.get("j")!.advance += 1;

  return $font({
    ascent: metrics.ascent,
    descent: -metrics.descent,
    lineGap: 3,
    glyphs: glyphs,
  });
};
