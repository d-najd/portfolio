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
    float errorRate = 0.05;
    vec4 curPixel = texture2D(u_updateTexture, v_texCoord).rgba;
    vec4 transparentColor = vec4(0.0, 1.0, 0.0, 1.0);

    vec4 finalColor = curPixel;

    for (int i = 0; i < 30; i++) {
        if ((starElements[i].position.x > v_texCoord.x-errorRate &&
        starElements[i].position.x < v_texCoord.x+errorRate) && (
        (starElements[i].position.y > v_texCoord.y-errorRate) &&
        starElements[i].position.y < v_texCoord.y+errorRate)) {
            finalColor = vec4(1.0, 0.0, 0.0, 1.0);

            break;
        }
    }

    // vec4 finalColor = (v_texCoord.x < 0.1 && v_texCoord.y < 0.1) ? transparentColor : curPixel;

    gl_FragColor = finalColor;
}
