const float MAX_KERNEL_SIZE = 16.0;

// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float randK(vec2 co, float seed) {
    const highp float a = 12.9898, b = 78.233, c = 43758.5453;
    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);
    return fract(sin(sn) * c + seed);
}