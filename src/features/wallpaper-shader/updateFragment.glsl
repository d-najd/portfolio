precision mediump float;
uniform sampler2D u_image;
uniform sampler2D u_updateTexture;
varying vec2 v_texCoord;

uniform float u_curTimeLocation;
uniform vec4 u_backgroundColor;
uniform ivec2 u_islandCenterPx;
uniform vec2 u_islandCenter;

struct StarElement {
    vec2 position;
};

uniform StarElement starElements[30];

void main() {
    vec4 curPixel = texture2D(u_image, v_texCoord).rgba;
    gl_FragColor = curPixel;
}
