import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

// Domain-warped fbm noise lit in the brand blue: a slow, liquid light field
// that leans toward the pointer.
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

// 2D simplex noise by Ian McEwan / Ashima Arts (MIT). Floating-point hashes
// (fract(sin(x)*k) and friends) amplify tiny rounding differences, and GPU
// drivers round the same expression differently in neighbouring cells — on
// real hardware that shows up as hard seams and diagonal streaks. This
// version only does exact small-integer arithmetic (mod 289), so every GPU
// produces the identical, seamless field.
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 10.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Simplex has more contrast than value noise; compress it so the field stays soft.
float noise(vec2 p) { return snoise(p) * 0.38 + 0.5; }

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 1.9 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.05;

  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  vec2 q = vec2(fbm(p * 0.75 + vec2(0.0, t)), fbm(p * 0.75 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 0.75 + 1.7 * q + vec2(1.7, 9.2) + t * 1.4),
                fbm(p * 0.75 + 1.7 * q + vec2(8.3, 2.8) - t * 1.2));
  float f = fbm(p * 0.7 + 1.5 * r + m * 0.15);

  vec2 anchor = vec2(0.42, 0.18) + m * 0.18;
  float glow = exp(-1.6 * length((p - anchor) * vec2(0.8, 1.15)));
  float intensity = smoothstep(0.26, 0.86, f) * (0.3 + glow * 1.45);

  vec3 col = vec3(0.039);
  col = mix(col, vec3(0.03, 0.05, 0.22), smoothstep(0.0, 0.35, intensity));
  col = mix(col, vec3(0.17, 0.36, 1.0), smoothstep(0.25, 0.85, intensity));
  col = mix(col, vec3(0.70, 0.82, 1.0), smoothstep(0.85, 1.35, intensity) * 0.55);

  col *= 1.0 - 0.6 * smoothstep(0.3, 1.0, length((uv - vec2(0.6, 0.55)) * vec2(1.1, 1.3)));

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

export default function HeroShader({ className = '' }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    // A fresh canvas per mount. A canvas keeps its context for life, so once
    // that context is lost (our own cleanup on remount, or the GPU dropping it)
    // the element can only ever paint as a blank white box. Owning the element
    // here means every mount gets a live context, and a lost one is simply
    // removed, leaving the dark section and CSS glow underneath.
    const canvas = document.createElement('canvas')
    canvas.className = 'absolute inset-0 h-full w-full'
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)
    host.appendChild(canvas)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'uRes')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uMouse = gl.getUniformLocation(program, 'uMouse')

    // The field is soft by nature, so render well under native resolution
    // and let the browser upscale — big savings on phones and 4K screens.
    const isSmall = window.innerWidth < 768
    const scale = isSmall ? 0.35 : 0.5

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale))
      const h = Math.max(1, Math.round(canvas.clientHeight * scale))
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - r.left) / r.width
      mouse.ty = 1 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) loop()
    })
    io.observe(canvas)

    const start = performance.now()
    let frame = 0
    const render = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04
      gl.uniform1f(uTime, (performance.now() - start) / 1000 + 20)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const reduced = prefersReducedMotion()
    function loop() {
      cancelAnimationFrame(frame)
      if (!visible || document.hidden) return
      render()
      if (!reduced) frame = requestAnimationFrame(loop)
    }
    const onVisibility = () => !document.hidden && loop()
    document.addEventListener('visibilitychange', onVisibility)

    const onLost = () => {
      cancelAnimationFrame(frame)
      canvas.remove()
    }
    canvas.addEventListener('webglcontextlost', onLost)
    loop()

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('webglcontextlost', onLost)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      canvas.remove()
    }
  }, [])

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      {/* CSS fallback shows if WebGL is unavailable or the context is lost. */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_35%,rgba(43,91,255,0.55),rgba(10,10,10,0)_70%)]" />
      {/* Film grain as a static SVG texture, layered above the canvas: it
          renders identically everywhere, unlike per-pixel noise in a shader. */}
      <div className="hero-grain absolute inset-0 z-[1]" />
    </div>
  )
}
