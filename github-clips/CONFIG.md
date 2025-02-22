# Config for encoding

1. Record clips using simple screen recorder, MP4, H.264, 30fps
2. Re-encode clips with the following command (this is needed since DaVinci
   Resolve doesn't accept many codecs and formats).

```shell
ffmpeg -i input.mp4 -c:v dnxhd -profile:v dnxhr_lb output.mov
```

3. Add clips to DaVinci Resolve
4. Add Text using Fusion and override properties
   ```size 0.04, layout center y 0.875```
5. Add ~10 frames delay before any action and ~20 frames after action is shown,
   change this per case basis
6. Export video with settings 720p, 30fps, mkv.
7. Re-encode the video using the following settings, first one is for GitHub
   README.md second one is for videos in website (second is ~4.5x smaller)

### For websites

```shell
ffmpeg -i input.mkv -c:v libaom-av1 -crf 27 -cpu-used 4 -vf "scale=720:-2:flags=lanczos,fps=24" -strict experimental -an output.webm
````

### For GitHub Readme

```shell
ffmpeg -i input.mkv -vf "fps=16,scale=520:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5" -loop 0 -an -sn -dn -f gif - | gifsicle --lossy=30 -O3 -o output.gif
```