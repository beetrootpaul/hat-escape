import { b_, BpxAudioPlaybackId } from "@beetpx/beetpx";
import { g } from "../globals";

export class AudioManager {
  private static _playbackMusicDamped: BpxAudioPlaybackId | null = null;
  private static _playbackMusicRegular: BpxAudioPlaybackId | null = null;

  static restart() {
    b_.stopAllPlaybacks();
  }

  static startMusicDamped(): void {
    this._playbackMusicDamped = b_.playSoundSequence({
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
    this._playbackMusicRegular = b_.playSoundSequence(
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
      true,
    );
  }

  static makeMusicNotDamped() {
    if (this._playbackMusicDamped) {
      b_.mutePlayback(this._playbackMusicDamped);
    }
    if (this._playbackMusicRegular) {
      b_.unmutePlayback(this._playbackMusicRegular);
    }
  }

  static makeMusicDamped() {
    if (this._playbackMusicDamped) {
      b_.unmutePlayback(this._playbackMusicDamped);
    }
    if (this._playbackMusicRegular) {
      b_.mutePlayback(this._playbackMusicRegular);
    }
  }
}
