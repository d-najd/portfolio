attribute vec2 a_position;
attribute vec3 a_color;
varying vec3 v_color;

uniform vec3 test;
uniform float time_since_startup;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    // v_color = a_color;
    v_color = vec3(a_position, 1.0);
    // v_color = vec3(sin(time_since_startup), 0.0, 0.0);
    // v_color = test;
    // v_color = vec3(test.x + 0.5, test.y + 0.5, test.z + 0.5);
}
