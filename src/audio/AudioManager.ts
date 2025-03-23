import { $x, BpxAudioPlaybackId } from "@beetpx/beetpx";
import { g } from "../globals";

export class AudioManager {
  private static _playbackMusicDamped: BpxAudioPlaybackId | null = null;
  private static _playbackMusicRegular: BpxAudioPlaybackId | null = null;

  static startMusicDamped(): void {
    this._playbackMusicDamped = $x.startPlaybackSequence({
      loop: [
        [
          { url: g.music.drums1Damped },
          { url: g.music.bass1Damped },
          { url: g.music.melody1Damped },
        ],
        [
          { url: g.music.drums1Damped },
          { url: g.music.bass1Damped },
          { url: g.music.melody2Damped },
        ],
      ],
    });
    this._playbackMusicRegular = $x.startPlaybackSequence(
      {
        loop: [
          [
            { url: g.music.drums1 },
            { url: g.music.bass1 },
            { url: g.music.melody1 },
          ],
          [
            { url: g.music.drums1 },
            { url: g.music.bass1 },
            { url: g.music.melody2 },
          ],
        ],
      },
      { muteOnStart: true },
    );
  }

  static makeMusicNotDamped() {
    if (this._playbackMusicDamped) {
      $x.mutePlayback(this._playbackMusicDamped);
    }
    if (this._playbackMusicRegular) {
      $x.unmutePlayback(this._playbackMusicRegular);
    }
  }

  static makeMusicDamped() {
    if (this._playbackMusicDamped) {
      $x.unmutePlayback(this._playbackMusicDamped);
    }
    if (this._playbackMusicRegular) {
      $x.mutePlayback(this._playbackMusicRegular);
    }
  }
}
