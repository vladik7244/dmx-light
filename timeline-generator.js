const fs = require("fs");
const R = require("ramda");
const d3 = require("d3-interpolate");

class TimelineGenerator {
  constructor(fps = 24, frameSize = 64) {
    this.frameSize = frameSize;
    this.fps = fps;

    this.keyframes = [];
  }

  setKeyFrames(keyframes) {
    this.keyframes = keyframes;
  }

  compileKeyFrames() {
    let duration = 0;
    const keyframes = [];

    for (let i = 0; i < this.keyframes.length; i++) {
      const keyframe = this.keyframes[i];

      const from = duration;
      const to = keyframe.ts;

      duration = to;

      const rule = keyframe.rule || {};

      keyframes.push({
        ...keyframe,
        from,
        to,
        lamps: [
          rule.l1 || rule.l || rule.all,
          rule.l2 || rule.l || rule.all,
          rule.l3 || rule.cl || rule.c || rule.all,
          rule.l4 || rule.cl || rule.c || rule.all,
          rule.r1 || rule.cr || rule.c || rule.all,
          rule.r2 || rule.cr || rule.c || rule.all,
          rule.r3 || rule.r || rule.all,
          rule.r4 || rule.r || rule.all
        ]
      });
    }
    // console.log(JSON.stringify(keyframes, null, 2));
    return {
      keyframes: keyframes.map(k => ({
        ...k,
        lamps: k.lamps.map(lamp => {
          if (!lamp) {
            return !lamp;
          }

          return [
            lamp[0],
            lamp[1],
            lamp[2],
            lamp[3],
            lamp[4],
            lamp[5],
            lamp[6],
            lamp[7]
          ];
        })
      })),
      duration
    };
  }

  save(fileName) {
    const { keyframes, duration } = this.compileKeyFrames();
    const frames = Math.ceil(duration * this.fps);
    const buffer = Buffer.alloc(frames * 64, 0);
    const prevLampStates = [];
    let keyFrameCount = 0;
    let keyFrameHash = keyframes.map(a => a.ts);

    for (let frame = 0; frame < frames; frame++) {
      const ts = frame / this.fps;
      const activeKeyFrame = this.getActiveKeyframes(keyframes, ts)[0];

      if (activeKeyFrame) {
        for (let lamp = 0; lamp < activeKeyFrame.lamps.length; lamp++) {
          const prevLampState = prevLampStates[lamp];
          const currentRule = activeKeyFrame.lamps[lamp];

          const lampRule = R.range(0, 8).map((_, i) => {
            if (currentRule !== undefined && currentRule[i] !== undefined) {
              return currentRule[i];
            }

            if (prevLampState !== undefined && prevLampState[i] !== undefined) {
              return prevLampState[i];
            }

            return 0;
          });

          let lampState = prevLampState;

          const t =
            (ts - activeKeyFrame.from) /
            (activeKeyFrame.to - activeKeyFrame.from);

          if (activeKeyFrame.animate) {
            lampState = d3.interpolate(prevLampState, lampRule)(t);
          } else {
            lampState = prevLampState;
          }

          if (Math.abs(activeKeyFrame.ts - ts) < 0.041666) {
            if (lamp === 0) {
              keyFrameCount++;
              keyFrameHash.splice(keyFrameHash.indexOf(activeKeyFrame.ts), 1);
            }
            lampState = lampRule;
            prevLampStates[lamp] = lampState;
          }

          this.setLamp(buffer, frame, lamp, lampState);
        }
      }
    }
    console.log(keyFrameCount, keyframes.length);
    console.log("UNSET keyframes", keyFrameHash);

    fs.writeFileSync(fileName, buffer);
  }

  prevLampState(prevLampRule) {
    if (Array.isArray(prevLampRule)) {
      return prevLampRule;
    } else {
      return prevLampRule.to;
    }
  }

  getActiveKeyframes(keyframes, ts) {
    return keyframes.filter(keyframe => {
      return keyframe.from <= ts && ts <= keyframe.to;
    });
  }

  setLamp(buffer, frame, lamp, values = []) {
    // console.log('LEN', values.length, values);
    for (let i = 0; i < values.length; i++) {
      // console.log(i);
      if (i === 7 && values[i] === 152) {
        // console.log(frame, lamp, values);
      }
      if (values[i] !== undefined) {
        buffer.writeUInt8(values[i], frame * this.frameSize + lamp * 8 + i);
      }
    }
  }
}

module.exports = { TimelineGenerator };
