precision mediump float;

uniform sampler2D u_image;
uniform float u_curTimeLocation;

varying vec2 v_texCoord;

void main() {
    gl_FragColor = texture2D(u_image, v_texCoord).bgra;
    // gl_FragColor = texture2D(u_image, v_texCoord).bgra + vec4(u_timeElapsedSinceStartup, u_timeElapsedSinceStartup, u_timeElapsedSinceStartup, u_timeElapsedSinceStartup);
}
