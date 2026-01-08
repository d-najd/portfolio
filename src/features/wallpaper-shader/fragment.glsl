precision mediump float;
uniform sampler2D u_image;
varying vec2 v_texCoord;

uniform float u_curTimeLocation;
uniform vec4 u_backgroundColor;

void main() {
    vec4 curPixel = texture2D(u_image, v_texCoord).bgra;
    bool isTransparent = curPixel.x == 0.0;

    gl_FragColor = !isTransparent ? curPixel : u_backgroundColor;
    // gl_FragColor = !isTransparent ? curPixel : vec4(.5, .5, .5, 1.0);
    // gl_FragColor = texture2D(u_image, v_texCoord).bgra + vec4(u_timeElapsedSinceStartup, u_timeElapsedSinceStartup, u_timeElapsedSinceStartup, u_timeElapsedSinceStartup);
}
