// PRISM — WebGL Raymarching Shader
// Adapted for #prism-canvas inside the portfolio hero container

const canvas = document.getElementById('prism-canvas');
if (!canvas) throw new Error('#prism-canvas not found');

const container = canvas.parentElement;

const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    || canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false });
if (!gl) { console.error('WebGL not supported'); }

// ── Resize to container ────────────────────────────────────────────────────
function resizeCanvas() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ── Shaders ────────────────────────────────────────────────────────────────
const vertexSrc = `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const fragmentSrc = `
    precision highp float;

    uniform float uTime;
    uniform vec2  uResolution;
    uniform vec2  uMouse;

    #define PI  3.14159265359
    #define TAU 6.28318530718
    #define MAX_STEPS 80
    #define MAX_DIST  50.0
    #define SURF_DIST 0.001

    float hash(float n) { return fract(sin(n) * 43758.5453123); }

    mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
    }

    float sdOctahedron(vec3 p, float s) {
        p = abs(p);
        float m = p.x + p.y + p.z - s;
        vec3 q;
        if (3.0 * p.x < m) q = p.xyz;
        else if (3.0 * p.y < m) q = p.yzx;
        else if (3.0 * p.z < m) q = p.zxy;
        else return m * 0.57735027;
        float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
        return length(vec3(q.x, q.y - s + k, q.z - k));
    }

    float sdTriPrism(vec3 p, vec2 h) {
        vec3 q = abs(p);
        return max(q.z - h.y, max(q.x * 0.866025 + p.y * 0.5, -p.y) - h.x * 0.5);
    }

    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    float smax(float a, float b, float k) { return -smin(-a, -b, k); }

    float map(vec3 p) {
        vec2 m = (uMouse - 0.5) * 2.5;
        p.xy += m * 0.4;

        p.xz *= rot(uTime * 0.12);
        p.xy *= rot(uTime * 0.08);

        vec3 p1 = p;
        p1.yz *= rot(uTime * 0.15);

        float core_distort = sin(p1.x * 3.0 + uTime)
                           * sin(p1.y * 3.0 + uTime)
                           * sin(p1.z * 3.0 + uTime) * 0.1;
        float core = sdOctahedron(p1, 1.6) + core_distort;

        vec3 p2 = p1;
        p2.xy *= rot(PI * 0.25 + uTime * 0.2);
        float prism = sdTriPrism(p2, vec2(1.4, 2.0));
        core = smax(core, -prism, 0.2);

        float d = core;
        float k_blend = 0.2 + 0.15 * (0.5 + 0.5 * sin(uTime * 1.5));

        for (int i = 0; i < 4; i++) {
            float fi = float(i);
            float angle  = fi * TAU / 4.0 + uTime * 0.3;
            float radius = 3.0 + 0.3 * sin(uTime * 0.4 + fi);
            vec3 pos = vec3(cos(angle) * radius, sin(angle * 0.7) * 1.0, sin(angle) * radius);
            vec3 po  = p - pos;
            po.xy *= rot(uTime * 0.5 + fi);
            float sat_distort = sin(po.x * 5.0 + fi) * sin(po.y * 5.0 + fi) * sin(po.z * 5.0 + fi) * 0.05;
            d = smin(d, sdOctahedron(po, 0.4) + sat_distort, k_blend);
        }
        return d;
    }

    vec3 getNormal(vec3 p) {
        vec2 e = vec2(0.001, 0.0);
        return normalize(vec3(
            map(p + e.xyy) - map(p - e.xyy),
            map(p + e.yxy) - map(p - e.yxy),
            map(p + e.yyx) - map(p - e.yyx)
        ));
    }

    float raymarch(vec3 ro, vec3 rd) {
        float t = 0.0;
        for (int i = 0; i < MAX_STEPS; i++) {
            vec3 p = ro + rd * t;
            float d = map(p);
            if (abs(d) < SURF_DIST || t > MAX_DIST) break;
            t += d * 0.7;
        }
        return t;
    }

    vec3 getBackground(vec3 rd) {
        float stars = 0.0;
        vec3 p = rd * 100.0;
        float h = hash(dot(p, vec3(12.9898, 78.233, 54.53)));
        if (h > 0.98) stars = pow(h - 0.98, 10.0) * 20.0;
        vec3 nebula = vec3(0.0);
        nebula += vec3(0.3, 0.15, 0.5) * pow(max(0.0, sin(rd.x * 2.0 + uTime * 0.1)), 3.0) * 0.2;
        nebula += vec3(0.15, 0.3, 0.6) * pow(max(0.0, sin(rd.y * 2.5 + uTime * 0.05)), 3.0) * 0.2;
        return stars + nebula;
    }

    void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

        vec2 m   = (uMouse - 0.5) * 0.5;
        vec3 ro  = vec3(m.x * 2.0, m.y * 2.0, 5.5);
        vec3 rd  = normalize(vec3(uv, -1.0));
        rd.xy *= rot(m.x * 0.2);
        rd.yz *= rot(m.y * 0.2);

        float t = raymarch(ro, rd);
        vec3 color = vec3(0.0);

        if (t < MAX_DIST) {
            vec3 p      = ro + rd * t;
            vec3 normal = getNormal(p);
            vec3 viewDir = normalize(ro - p);

            float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
            float ior = 1.5;
            vec3 refractDir = refract(rd, normal, 1.0 / ior);

            if (length(refractDir) > 0.0) {
                float t2 = raymarch(p - normal * 0.01, refractDir);
                if (t2 < MAX_DIST) {
                    vec3 p2      = p - normal * 0.01 + refractDir * t2;
                    vec3 normal2 = getNormal(p2);
                    vec3 r = refract(refractDir, -normal2, ior - 0.2);
                    vec3 g = refract(refractDir, -normal2, ior);
                    vec3 b = refract(refractDir, -normal2, ior + 0.2);
                    vec3 bgR = getBackground(r) * vec3(1.4, 0.7, 0.7);
                    vec3 bgG = getBackground(g) * vec3(0.7, 1.4, 0.8);
                    vec3 bgB = getBackground(b) * vec3(0.7, 0.8, 1.4);
                    color = vec3(bgR.x, bgG.y, bgB.z);
                    color = pow(color, vec3(0.7)) * 5.0;
                } else {
                    color = getBackground(refractDir) * 2.0;
                }
            }

            vec3 lightDir = normalize(vec3(1.0, 1.0, -1.0));
            vec3 halfDir  = normalize(lightDir + viewDir);
            float spec    = pow(max(dot(normal, halfDir), 0.0), 150.0);
            color += spec * vec3(1.0) * 3.5;

            vec3 fresnelColor = vec3(
                0.5 + 0.5 * sin(fresnel * TAU + uTime),
                0.5 + 0.5 * sin(fresnel * TAU + uTime + TAU / 3.0),
                0.5 + 0.5 * sin(fresnel * TAU + uTime + TAU * 2.0 / 3.0)
            );
            color += fresnel * fresnelColor * 1.2;

            float edge = pow(1.0 - abs(dot(viewDir, normal)), 4.0);
            color += edge * vec3(0.6, 0.7, 1.0) * 0.7;

            float sss = pow(max(dot(-normal, lightDir), 0.0), 2.0);
            color += sss * vec3(1.0, 0.6, 0.8) * 0.5;

        } else {
            color = getBackground(rd);
        }

        float alpha = (t < MAX_DIST) ? 1.0 : 0.0;

        float vignette = smoothstep(0.3, 1.0, 1.0 - length(uv) * 0.4);
        color *= vignette;
        color *= vec3(0.96, 0.99, 1.06);
        color  = pow(color, vec3(0.88)) * 1.12;

        gl_FragColor = vec4(color, alpha);
    }
`;

// ── Compile & link ─────────────────────────────────────────────────────────
function createShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(s));
        return null;
    }
    return s;
}

function createProgram(vs, fs) {
    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error('Program error:', gl.getProgramInfoLog(p));
        return null;
    }
    return p;
}

const program = createProgram(
    createShader(gl.VERTEX_SHADER, vertexSrc),
    createShader(gl.FRAGMENT_SHADER, fragmentSrc)
);

// ── Geometry (full-quad) ───────────────────────────────────────────────────
const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

// ── Uniforms ───────────────────────────────────────────────────────────────
const uTime = gl.getUniformLocation(program, 'uTime');
const uResolution = gl.getUniformLocation(program, 'uResolution');
const uMouse = gl.getUniformLocation(program, 'uMouse');

// ── Mouse tracking ─────────────────────────────────────────────────────────
const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
canvas.addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) / r.width;
    mouse.ty = 1.0 - (e.clientY - r.top) / r.height;
});

// ── Render loop ────────────────────────────────────────────────────────────
const startTime = Date.now();

function render() {
    const t = (Date.now() - startTime) * 0.001;

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.uniform1f(uTime, t);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform2f(uMouse, mouse.x, mouse.y);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
}
render();
