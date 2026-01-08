precision mediump float;
uniform sampler2D u_image;
varying vec2 v_texCoord;

uniform float u_curTimeLocation;
uniform vec4 u_backgroundColor;
uniform ivec2 u_islandCenter;

void main() {
    vec4 curPixel = texture2D(u_image, v_texCoord).bgra;
    bool isTransparent = curPixel.x == 0.0;
    vec4 transparentColor = vec4(0.0, 0.0, 0.0, 0.0);

    gl_FragColor = !isTransparent ? curPixel : transparentColor;
}
