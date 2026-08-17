"use client";

import React, { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  life: number;
  maxLife: number;
}

export default function WaterBackground() {
  const glCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const glCanvas = glCanvasRef.current;
    const canvas = canvasRef.current;
    if (!glCanvas || !canvas) return;

    // WebGL Context
    const gl = glCanvas.getContext("webgl") || (glCanvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      console.warn("WebGL not supported.");
      return;
    }

    // 2D Context for splash click effect overlay
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (glCanvas.width = canvas.width = window.innerWidth);
    let height = (glCanvas.height = canvas.height = window.innerHeight);

    // Particles and ripples arrays for 2D splash layer
    const ripples: Ripple[] = [];
    const particles: Particle[] = [];

    // Mouse coordinates tracker
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    // Scroll tracker
    let scrollOffset = window.scrollY;
    let targetScrollOffset = scrollOffset;

    // Click ripple tracker for WebGL shader
    let clickX = 0;
    let clickY = 0;
    let clickIntensity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = height - e.clientY; // invert Y for WebGL coordinates
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = height - e.touches[0].clientY;
      }
    };

    const handleScroll = () => {
      targetScrollOffset = window.scrollY;
    };

    const handleCanvasClick = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // 1. Trigger WebGL Caustics Distortion
      clickX = clientX;
      clickY = height - clientY; // Invert Y for WebGL coordinates
      clickIntensity = 1.0;

      // 2. Trigger 2D Canvas Ripple Ring
      ripples.push({
        x: clientX,
        y: clientY,
        radius: 2,
        maxRadius: Math.random() * 80 + 120,
        alpha: 0.8,
        speed: Math.random() * 2.5 + 3.5,
      });

      // 3. Trigger 2D Canvas Water Splash Droplets
      const particleCount = Math.floor(Math.random() * 12) + 16;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 3;
        particles.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 2.0, // slight upward force
          alpha: 1.0,
          size: Math.random() * 3.0 + 1.5,
          life: 0,
          maxLife: Math.random() * 35 + 35,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleCanvasClick);
    window.addEventListener("touchstart", handleCanvasClick, { passive: true });

    // Handle resize
    const handleResize = () => {
      width = glCanvas.width = canvas.width = window.innerWidth;
      height = glCanvas.height = canvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
    };
    window.addEventListener("resize", handleResize);

    // Shaders code
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_scroll;
      uniform vec2 u_click_pos;
      uniform float u_click_intensity;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 uv_aspect = uv;
        uv_aspect.x *= u_resolution.x / u_resolution.y;

        // Mouse hover distortion
        vec2 mouse_pos = u_mouse / u_resolution.xy;
        mouse_pos.x *= u_resolution.x / u_resolution.y;
        float dist_to_mouse = length(uv_aspect - mouse_pos);
        if (dist_to_mouse < 0.25) {
          float strength = (1.0 - (dist_to_mouse / 0.25)) * 0.03;
          uv_aspect += normalize(uv_aspect - mouse_pos) * strength;
        }

        // Tap splash distortion
        vec2 click_pos = u_click_pos / u_resolution.xy;
        click_pos.x *= u_resolution.x / u_resolution.y;
        float dist_to_click = length(uv_aspect - click_pos);
        if (u_click_intensity > 0.01 && dist_to_click < 0.6) {
          float wave = sin(dist_to_click * 40.0 - u_time * 8.0) * 0.015 * u_click_intensity;
          wave *= (1.0 - dist_to_click / 0.6);
          uv_aspect += normalize(uv_aspect - click_pos) * wave;
        }

        // Whirling/waving caustic pattern
        vec2 p = uv_aspect * 2.5 - vec2(20.0);
        vec2 i = vec2(p);
        float c = 1.0;
        float intent = 0.006;
        
        for (int n = 0; n < 4; n++) {
          float t = u_time * (1.0 - (2.0 / float(n + 1))) + u_scroll * 0.005;
          i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
          c += 1.0 / length(vec2(p.x / (sin(i.x + t) / intent), p.y / (cos(i.y + t) / intent)));
        }

        c /= float(4);
        c = 1.15 - pow(c, 1.3);

        float wave_height = clamp(c, 0.0, 1.0);

        // Color palette matching the dark sand and bronze highlights
        vec3 dark_sand = vec3(0.06, 0.05, 0.05);
        vec3 bronze_highlights = vec3(0.18, 0.13, 0.10);
        vec3 specular_color = vec3(0.95, 0.85, 0.75);

        vec3 water_color = mix(dark_sand, bronze_highlights, wave_height);
        float sparkles = pow(wave_height, 22.0) * 0.6;
        
        // Twinkles
        float micro = sin(uv_aspect.x * 200.0 + u_time * 5.0) * cos(uv_aspect.y * 200.0 - u_time * 5.0);
        if (micro > 0.985 && wave_height > 0.6) {
          sparkles += (micro - 0.985) * 8.0 * wave_height;
        }

        vec3 final_color = water_color + (specular_color * sparkles);
        gl_FragColor = vec4(final_color, 0.95);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const scrollLocation = gl.getUniformLocation(program, "u_scroll");
    const clickPosLocation = gl.getUniformLocation(program, "u_click_pos");
    const clickIntensityLocation = gl.getUniformLocation(program, "u_click_intensity");

    let startTime = Date.now();

    // Combined render loop (WebGL Caustics + 2D Overlay Splash)
    const render = () => {
      const currentTime = Date.now();
      const time = (currentTime - startTime) * 0.003;

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      scrollOffset += (targetScrollOffset - scrollOffset) * 0.08;

      if (clickIntensity > 0.0) {
        clickIntensity -= 0.015;
      } else {
        clickIntensity = 0.0;
      }

      // --- WEBGL RENDER (Water Caustic background) ---
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, width, height);
      gl.uniform2f(mouseLocation, mouseX, mouseY);
      gl.uniform1f(scrollLocation, scrollOffset);
      gl.uniform2f(clickPosLocation, clickX, clickY);
      gl.uniform1f(clickIntensityLocation, clickIntensity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // --- 2D CANVAS RENDER (Interactive Splash & Ripple droplets) ---
      ctx.clearRect(0, 0, width, height);

      // Update and draw 2D Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += ripple.speed;
        ripple.alpha = 1 - ripple.radius / ripple.maxRadius;

        if (ripple.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 245, 235, ${ripple.alpha * 0.25})`;
        ctx.lineWidth = 3.0 * (1 - ripple.radius / ripple.maxRadius) + 0.5;
        ctx.stroke();

        if (ripple.radius > 20) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius - 15, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 245, 235, ${ripple.alpha * 0.12})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Update and draw 2D Water droplets
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // Gravity
        p.vx *= 0.97; // Air friction
        p.vy *= 0.97;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.85})`);
        grad.addColorStop(0.3, `rgba(255, 240, 220, ${p.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(224, 98, 62, 0)`); // fades out with a touch of highlight amber

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    gl.viewport(0, 0, width, height);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleCanvasClick);
      window.removeEventListener("touchstart", handleCanvasClick);
      window.removeEventListener("resize", handleResize);

      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <>
      <canvas
        ref={glCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[1] bg-transparent"
      />
    </>
  );
}
