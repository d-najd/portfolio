# Config for encoding

* Clips are created using DaVinci Resolve
* Clips are exported with settings 720p, 30fps, mkv.
* Text is added using DaVinci Resolve Fusion
* Text is properties: size 0.04, layout center y 0.875
* There are roughly 10 frames before any action is shown on screen and 20 delay
  after although this is changed per clip basis

```shell
ffmpeg -i Window-Features.mkv 
  -vf "fps=12,scale=520:-1:flags=lanczos"       
  -c:v libwebp        
  -lossless 0 -q:v 70 -compression_level 6        
  -preset default -loop 0        
  output.webp
```