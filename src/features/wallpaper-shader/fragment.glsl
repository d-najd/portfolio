precision mediump float;
varying vec3 v_color;

uniform sampler2D u_texture;

void main() {
    vec2 pos = (v_color.xy + 1.0) / 2.0;

    gl_FragColor = texture2D(u_texture, pos);
    // gl_FragColor = vec4(v_color.x * 5.0, v_color.y * -5.0, 0.0, 1.0);

    // gl_FragColor = vec4(v_color, 1.0);
}
