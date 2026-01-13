precision mediump float;
uniform sampler2D u_image;
uniform sampler2D u_updateTexture;
varying vec2 v_texCoord;

/*
uniform float u_curTimeLocation;
uniform vec4 u_backgroundColor;
uniform ivec2 u_islandCenterPx;
uniform vec2 u_islandCenter;

struct StarElement {
    vec2 position;
};

uniform StarElement starElements[30];
*/

void main() {
    // vec4 curPixel = texture2D(u_updateTexture, v_texCoord).bgra;

    gl_FragColor =
    ((0.2 > v_texCoord.x &&
    0.2 < v_texCoord.x+0.1) && (
    (0.2 > v_texCoord.y) &&
    0.2 < v_texCoord.y+0.1
    ));

    /*
    transparentColor =
    ((0.2 > v_texCoord.x &&
    0.2 < v_texCoord.x+0.1) && (
    (0.2 > v_texCoord.y) &&
    0.2 < v_texCoord.y+0.1
    ))
    ? vec4(1.0, 0.0, 0.0, 1.0) : transparentColor;
    */


    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    /*
    bool isTransparent = curPixel.x == 0.0;
    vec4 transparentColor = vec4(0.0, 0.0, 0.0, 0.0);

    transparentColor = ((starElements[1].position.x > v_texCoord.x-0.1 &&
                        starElements[1].position.x < v_texCoord.x+0.1) && (
                        (starElements[1].position.y > v_texCoord.y-0.1) &&
                        starElements[1].position.y < v_texCoord.y+0.1)) ? vec4(1.0, 0.0, 0.0, 1.0) : transparentColor;

    gl_FragColor = !isTransparent ? curPixel : transparentColor;
    */
}
