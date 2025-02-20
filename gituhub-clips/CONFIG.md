# Config for encoding

1. Record clips using simple screen recorder, MP4, H.264, 30fps
2. Re-encode clips with the following command (this is needed since DaVinci
   Resolve doesn't accept many codecs and formats).

```shell
ffmpeg -i input.mp4 
  -c:v dnxhd 
  -profile:v dnxhr_lb 
  output.mov
```

3. Add clips to DaVinci Resolve
4. Add Text using Fusion and override properties
   ```size 0.04, layout center y 0.875```
5. Add ~10 frames delay before any action and ~20 frames after action is shown,
   change this per case basis
6. Export video with settings 720p, 30fps, mkv.
7. Re-encode the video (optimized for smallest size) with following settings

```shell
ffmpeg -i input.mkv   
  -c:v libaom-av1 -crf 27 -cpu-used 4   
  -vf "scale=720:-2:flags=lanczos,fps=24"   
  -strict experimental 
  -an output.webm
```