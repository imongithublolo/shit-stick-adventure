/* ============================================================
   SHIT STICK ADVENTURE — CRT shader pack (boot/crt.js)
   ------------------------------------------------------------
   Shader adapted from "Serenity Shader"
   https://github.com/gingerbeardman/webgl-crt-shader — MIT License
   Copyright (c) gingerbeardman — thanks man!!
   Post-processor + preview + settings UI bolted on for SSA.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- shader sources ---------------- */

  var VERT_SRC = [
    "attribute vec2 aPos;",
    "varying vec2 vUv;",
    "void main() {",
    "  vUv = aPos * 0.5 + 0.5;",
    "  gl_Position = vec4(aPos, 0.0, 1.0);",
    "}"
  ].join("\n");

  // GLSL ES 1.0 (WebGL1) — kept close to the original Serenity Shader
  var FRAG_SRC = [
    "#ifdef GL_FRAGMENT_PRECISION_HIGH",
    "precision highp float;",
    "#else",
    "precision mediump float;",
    "#endif",
    "uniform sampler2D tDiffuse;",
    "uniform float scanlineIntensity;",
    "uniform float scanlineCount;",
    "uniform float time;",
    "uniform float yOffset;",
    "uniform float brightness;",
    "uniform float contrast;",
    "uniform float saturation;",
    "uniform float bloomIntensity;",
    "uniform float bloomThreshold;",
    "uniform float rgbShift;",
    "uniform float adaptiveIntensity;",
    "uniform float vignetteStrength;",
    "uniform float curvature;",
    "uniform float flickerStrength;",
    "varying vec2 vUv;",
    "",
    "const float PI = 3.14159265;",
    "const vec3 LUMA = vec3(0.299, 0.587, 0.114);",
    "const float BLOOM_THRESHOLD_FACTOR = 0.5;",
    "const float BLOOM_FACTOR_MULT = 1.5;",
    "const float RGB_SHIFT_SCALE = 0.005;",
    "const float RGB_SHIFT_INTENSITY = 0.08;",
    "",
    "vec2 curveRemapUV(vec2 uv, float curvature) {",
    "  vec2 coords = uv * 2.0 - 1.0;",
    "  float curveAmount = curvature * 0.25;",
    "  float dist = dot(coords, coords);",
    "  coords = coords * (1.0 + dist * curveAmount);",
    "  return coords * 0.5 + 0.5;",
    "}",
    "",
    "vec4 sampleBloom(sampler2D tex, vec2 uv, float radius, vec4 centerSample) {",
    "  vec2 o = vec2(radius);",
    "  vec4 c = centerSample * 0.4;",
    "  vec4 cross = (",
    "    texture2D(tex, uv + vec2(o.x, 0.0)) +",
    "    texture2D(tex, uv - vec2(o.x, 0.0)) +",
    "    texture2D(tex, uv + vec2(0.0, o.y)) +",
    "    texture2D(tex, uv - vec2(0.0, o.y))",
    "  ) * 0.15;",
    "  return c + cross;",
    "}",
    "",
    "float vignetteApprox(vec2 uv, float strength) {",
    "  vec2 vigCoord = uv * 2.0 - 1.0;",
    "  float dist = max(abs(vigCoord.x), abs(vigCoord.y));",
    "  return 1.0 - dist * dist * strength;",
    "}",
    "",
    "void main() {",
    "  vec2 uv = vUv;",
    "",
    "  if (curvature > 0.001) {",
    "    uv = curveRemapUV(uv, curvature);",
    "    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {",
    "      gl_FragColor = vec4(0.0);",
    "      return;",
    "    }",
    "  }",
    "",
    "  vec4 pixel = texture2D(tDiffuse, uv);",
    "",
    "  if (bloomIntensity > 0.001) {",
    "    float pixelLum = dot(pixel.rgb, LUMA);",
    "    float bloomThresholdHalf = bloomThreshold * BLOOM_THRESHOLD_FACTOR;",
    "    if (pixelLum > bloomThresholdHalf) {",
    "      vec4 bloomSample = sampleBloom(tDiffuse, uv, 0.005, pixel);",
    "      bloomSample.rgb *= brightness;",
    "      float bloomLum = dot(bloomSample.rgb, LUMA);",
    "      float bloomFactor = bloomIntensity * max(0.0, (bloomLum - bloomThreshold) * BLOOM_FACTOR_MULT);",
    "      pixel.rgb += bloomSample.rgb * bloomFactor;",
    "    }",
    "  }",
    "",
    "  if (rgbShift > 0.005) {",
    "    float shift = rgbShift * RGB_SHIFT_SCALE;",
    "    pixel.r += texture2D(tDiffuse, vec2(uv.x + shift, uv.y)).r * RGB_SHIFT_INTENSITY;",
    "    pixel.b += texture2D(tDiffuse, vec2(uv.x - shift, uv.y)).b * RGB_SHIFT_INTENSITY;",
    "  }",
    "",
    "  pixel.rgb *= brightness;",
    "",
    "  float luminance = dot(pixel.rgb, LUMA);",
    "  pixel.rgb = (pixel.rgb - 0.5) * contrast + 0.5;",
    "  pixel.rgb = mix(vec3(luminance), pixel.rgb, saturation);",
    "",
    "  float lightingMask = 1.0;",
    "",
    "  if (scanlineIntensity > 0.001) {",
    "    float scanlineY = (uv.y + yOffset) * scanlineCount;",
    "    float scanlinePattern = abs(sin(scanlineY * PI));",
    "    float adaptiveFactor = 1.0;",
    "    if (adaptiveIntensity > 0.001) {",
    "      float yPattern = sin(uv.y * 30.0) * 0.5 + 0.5;",
    "      adaptiveFactor = 1.0 - yPattern * adaptiveIntensity * 0.2;",
    "    }",
    "    lightingMask *= 1.0 - scanlinePattern * scanlineIntensity * adaptiveFactor;",
    "  }",
    "",
    "  if (flickerStrength > 0.001) {",
    "    lightingMask *= 1.0 + sin(time * 110.0) * flickerStrength;",
    "  }",
    "",
    "  if (vignetteStrength > 0.001) {",
    "    lightingMask *= vignetteApprox(uv, vignetteStrength);",
    "  }",
    "",
    "  pixel.rgb *= lightingMask;",
    "",
    "  gl_FragColor = pixel;",
    "}"
  ].join("\n");

  /* ---------------- params / presets ---------------- */

  var DEFAULTS = {
    enabled: true,
    smoothing: true,
    scanlineIntensity: 0.4,
    scanlineCount: 480,
    adaptiveIntensity: 0.3,
    brightness: 1.15,
    contrast: 1.05,
    saturation: 1.1,
    bloomIntensity: 0.35,
    bloomThreshold: 0.5,
    rgbShift: 0.6,
    vignetteStrength: 0.3,
    curvature: 0.12,
    flickerStrength: 0.01
  };

  var PRESETS = {
    subtle: {
      enabled: true, smoothing: true,
      scanlineIntensity: 0.22, scanlineCount: 480, adaptiveIntensity: 0.12,
      brightness: 1.05, contrast: 1.02, saturation: 1.04,
      bloomIntensity: 0.18, bloomThreshold: 0.6, rgbShift: 0.15,
      vignetteStrength: 0.12, curvature: 0.05, flickerStrength: 0.003
    },
    classic: { ...DEFAULTS },
    crusty: {
      enabled: true, smoothing: false,
      scanlineIntensity: 0.62, scanlineCount: 480, adaptiveIntensity: 0.5,
      brightness: 1.3, contrast: 1.15, saturation: 1.25,
      bloomIntensity: 0.6, bloomThreshold: 0.4, rgbShift: 1.0,
      vignetteStrength: 0.5, curvature: 0.28, flickerStrength: 0.035
    }
  };

  var CONTROLS = [
    { key: "scanlineIntensity", label: "scanline intensity", min: 0, max: 1, step: 0.01 },
    { key: "scanlineCount", label: "scanline count", min: 120, max: 900, step: 10 },
    { key: "adaptiveIntensity", label: "adaptive glow", min: 0, max: 1, step: 0.01 },
    { key: "brightness", label: "brightness", min: 0.6, max: 1.8, step: 0.01 },
    { key: "contrast", label: "contrast", min: 0.6, max: 1.8, step: 0.01 },
    { key: "saturation", label: "saturation", min: 0, max: 2, step: 0.01 },
    { key: "bloomIntensity", label: "bloom intensity", min: 0, max: 1.5, step: 0.01 },
    { key: "bloomThreshold", label: "bloom threshold", min: 0, max: 1, step: 0.01 },
    { key: "rgbShift", label: "rgb shift (chroma bleed)", min: 0, max: 1, step: 0.01 },
    { key: "vignetteStrength", label: "vignette", min: 0, max: 2, step: 0.01 },
    { key: "curvature", label: "screen curvature", min: 0, max: 0.5, step: 0.005 },
    { key: "flickerStrength", label: "flicker", min: 0, max: 0.15, step: 0.001 }
  ];

  var GROUPS = [
    { title: "SCANLINES", keys: ["scanlineIntensity", "scanlineCount", "adaptiveIntensity"] },
    { title: "PICTURE", keys: ["brightness", "contrast", "saturation"] },
    { title: "GLOW / BLOOM", keys: ["bloomIntensity", "bloomThreshold", "rgbShift"] },
    { title: "FRAMING", keys: ["vignetteStrength", "curvature", "flickerStrength"] }
  ];

  /* ---------------- tiny WebGL helper ---------------- */

  var UNIFORM_NAMES = [
    "tDiffuse", "scanlineIntensity", "scanlineCount", "time", "yOffset",
    "brightness", "contrast", "saturation", "bloomIntensity", "bloomThreshold",
    "rgbShift", "adaptiveIntensity", "vignetteStrength", "curvature",
    "flickerStrength"
  ];

  function compileShader(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      throw new Error("shader: " + gl.getShaderInfoLog(sh));
    }
    return sh;
  }

  function createRenderer(canvas) {
    var gl = canvas.getContext("webgl", {
      alpha: false, antialias: false, depth: false, stencil: false
    });
    if (!gl) return null;
    try {
      var prog = gl.createProgram();
      gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT_SRC));
      gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw new Error("link: " + gl.getProgramInfoLog(prog));
      }
      gl.useProgram(prog);

      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );
      var aPos = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      var tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255])
      );

      var uniforms = {};
      UNIFORM_NAMES.forEach(function (n) {
        uniforms[n] = gl.getUniformLocation(prog, n);
      });

      return {
        canvas: canvas,
        gl: gl,
        setSize: function (w, h) {
          canvas.width = w; canvas.height = h;
          gl.viewport(0, 0, w, h);
        },
        setSmoothing: function (on) {
          gl.bindTexture(gl.TEXTURE_2D, tex);
          var f = on ? gl.LINEAR : gl.NEAREST;
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, f);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, f);
        },
        render: function (src, p, time) {
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
          gl.uniform1i(uniforms.tDiffuse, 0);
          gl.uniform1f(uniforms.scanlineIntensity, p.scanlineIntensity);
          gl.uniform1f(uniforms.scanlineCount, p.scanlineCount);
          gl.uniform1f(uniforms.time, time);
          gl.uniform1f(uniforms.yOffset, 0.0);
          gl.uniform1f(uniforms.brightness, p.brightness);
          gl.uniform1f(uniforms.contrast, p.contrast);
          gl.uniform1f(uniforms.saturation, p.saturation);
          gl.uniform1f(uniforms.bloomIntensity, p.bloomIntensity);
          gl.uniform1f(uniforms.bloomThreshold, p.bloomThreshold);
          gl.uniform1f(uniforms.rgbShift, p.rgbShift);
          gl.uniform1f(uniforms.adaptiveIntensity, p.adaptiveIntensity);
          gl.uniform1f(uniforms.vignetteStrength, p.vignetteStrength);
          gl.uniform1f(uniforms.curvature, p.curvature);
          gl.uniform1f(uniforms.flickerStrength, p.flickerStrength);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
      };
    } catch (e) {
      return null;
    }
  }

  /* ---------------- shared controls builder ---------------- */

  function fmt(key, val) {
    if (key === "scanlineCount") return String(Math.round(val));
    var d = key === "flickerStrength" || key === "curvature" ? 3 : 2;
    return (+val).toFixed(d);
  }

  function buildControls(container, params, onChange) {
    var refreshFns = [];

    GROUPS.forEach(function (g) {
      var grp = document.createElement("div");
      grp.className = "grp";
      var t = document.createElement("div");
      t.className = "grp-title";
      t.textContent = g.title;
      grp.appendChild(t);

      g.keys.forEach(function (key) {
        var def = null;
        for (var i = 0; i < CONTROLS.length; i++) {
          if (CONTROLS[i].key === key) { def = CONTROLS[i]; break; }
        }
        var ctl = document.createElement("div");
        ctl.className = "ctl";
        var lab = document.createElement("div");
        lab.className = "lab";
        var b = document.createElement("b");
        b.textContent = def.label;
        var span = document.createElement("span");
        span.textContent = fmt(key, params[key]);
        lab.appendChild(b);
        lab.appendChild(span);
        var input = document.createElement("input");
        input.type = "range";
        input.min = def.min;
        input.max = def.max;
        input.step = def.step;
        input.value = params[key];
        input.addEventListener("input", function () {
          var v = parseFloat(input.value);
          params[key] = v;
          span.textContent = fmt(key, v);
          if (onChange) onChange(params, key);
        });
        refreshFns.push(function () {
          input.value = params[key];
          span.textContent = fmt(key, params[key]);
        });
        ctl.appendChild(lab);
        ctl.appendChild(input);
        grp.appendChild(ctl);
      });
      container.appendChild(grp);
    });

    // checkboxes
    [["enabled", "CRT on"], ["smoothing", "pixel smoothing (off = extra crunchy)"]].forEach(function (pair) {
      var key = pair[0], label = pair[1];
      var lab = document.createElement("label");
      lab.className = "chk";
      var box = document.createElement("input");
      box.type = "checkbox";
      box.checked = !!params[key];
      box.addEventListener("change", function () {
        params[key] = box.checked;
        if (onChange) onChange(params, key);
      });
      refreshFns.push(function () { box.checked = !!params[key]; });
      var txt = document.createElement("span");
      txt.textContent = label;
      lab.appendChild(box);
      lab.appendChild(txt);
      container.appendChild(lab);
    });

    return { refresh: function () { refreshFns.forEach(function (f) { f(); }); } };
  }

  /* ---------------- setup-screen live preview ---------------- */

  var preview = null; // {renderer, srcCanvas, raf, penImg, params}

  function drawPreviewScene(ctx, w, h, t, penImg) {
    // crude fake "game frame": sky, hills, dialog, bobbing pen
    var sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#8fd3ff");
    sky.addColorStop(1, "#dff4c9");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // sun
    ctx.fillStyle = "#ffe95c";
    ctx.beginPath();
    ctx.arc(w * 0.82, h * 0.2 + Math.sin(t * 0.8) * 3, 26, 0, Math.PI * 2);
    ctx.fill();

    // hills
    ctx.fillStyle = "#7ac74f";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.72);
    ctx.quadraticCurveTo(w * 0.3, h * 0.55, w * 0.55, h * 0.72);
    ctx.quadraticCurveTo(w * 0.8, h * 0.86, w, h * 0.68);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();
    ctx.fillStyle = "#5fae3d";
    ctx.fillRect(0, h * 0.86, w, h * 0.14);

    // title
    ctx.fillStyle = "#17130f";
    ctx.font = "bold 30px 'Comic Sans MS', 'Comic Neue', cursive";
    ctx.textAlign = "center";
    ctx.fillText("SHIT STICK", w / 2, h * 0.2);
    ctx.fillText("ADVENTURE", w / 2, h * 0.31);

    // dialog box
    var dw = w * 0.72, dh = 52, dx = (w - dw) / 2, dy = h - dh - 26;
    ctx.fillStyle = "rgba(255,255,255,0.94)";
    ctx.strokeStyle = "#17130f";
    ctx.lineWidth = 3;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(dx, dy, dw, dh, 10);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillRect(dx, dy, dw, dh);
      ctx.strokeRect(dx, dy, dw, dh);
    }
    ctx.fillStyle = "#17130f";
    ctx.font = "16px 'Comic Sans MS', 'Comic Neue', cursive";
    var lines = ["hello i am shitstick", "press the buttons!!"];
    var idx = Math.floor(t / 1.6) % 2;
    ctx.fillText(lines[idx], w / 2, dy + 32);

    // bobbing pen
    if (penImg && penImg.complete && penImg.naturalWidth) {
      var size = 110;
      var bob = Math.sin(t * 3.2) * 10;
      ctx.drawImage(penImg, w / 2 - size / 2, h * 0.38 + bob - size * 0.2, size, size);
    }
  }

  function mountPreview(canvasEl, params) {
    unmountPreview();
    var renderer = createRenderer(canvasEl);
    if (!renderer) return false;
    var src = document.createElement("canvas");
    src.width = 480;
    src.height = 360;
    var ctx = src.getContext("2d");
    var penImg = new Image();
    penImg.src = "boot/shitstick.png";

    var state = { renderer: renderer, src: src, raf: 0, pen: penImg, params: params };
    function loop(ts) {
      if (!canvasEl.isConnected) { unmountPreview(); return; }
      var t = ts * 0.001;
      drawPreviewScene(ctx, src.width, src.height, t, penImg);
      renderer.setSmoothing(!!params.smoothing);
      renderer.setSize(480, 360);
      renderer.render(src, params, t);
      state.raf = requestAnimationFrame(loop);
    }
    state.raf = requestAnimationFrame(loop);
    preview = state;
    return true;
  }

  function unmountPreview() {
    if (preview) {
      cancelAnimationFrame(preview.raf);
      preview = null;
    }
  }

  /* ---------------- preserveDrawingBuffer patch ---------------- */

  var patched = false;
  function installContextPatch() {
    if (patched) return;
    patched = true;
    var orig = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, opts) {
      if (
        typeof type === "string" &&
        type.indexOf("webgl") === 0 &&
        this &&
        this.id === "gameCanvas"
      ) {
        opts = Object.assign({}, opts || {}, { preserveDrawingBuffer: true });
        return orig.apply(this, [type, opts]);
      }
      return orig.apply(this, [type, opts]);
    };
  }

  /* ---------------- in-game post processor ---------------- */

  var post = null; // {canvas, renderer, raf, gameCanvas, on, params}

  function syncLoop() {
    if (!post) return;
    var gc = document.getElementById("gameCanvas");
    if (!gc) {
      post.raf = requestAnimationFrame(syncLoop);
      return;
    }
    post.gameCanvas = gc;

    if (post.on) {
      var r = gc.getBoundingClientRect();
      var c = post.canvas;
      c.style.left = r.left + "px";
      c.style.top = r.top + "px";
      c.style.width = r.width + "px";
      c.style.height = r.height + "px";
      c.style.display = "block";
      if (c.width !== gc.width || c.height !== gc.height) {
        post.renderer.setSize(gc.width, gc.height);
      }
      post.renderer.setSmoothing(!!post.params.smoothing);
      post.renderer.render(gc, post.params, performance.now() * 0.001);
    }
    post.raf = requestAnimationFrame(syncLoop);
  }

  function makeCornerUI() {
    if (document.getElementById("crtUI")) return;
    var wrap = document.createElement("div");
    wrap.id = "crtUI";

    var bToggle = document.createElement("button");
    bToggle.id = "crtToggleBtn";
    bToggle.textContent = "CRT";
    bToggle.title = "toggle CRT shader";
    bToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggle();
    });

    var bGear = document.createElement("button");
    bGear.id = "crtGearBtn";
    bGear.textContent = "\u2699 settings";
    bGear.title = "CRT settings";
    bGear.addEventListener("click", function (e) {
      e.stopPropagation();
      openPanel();
    });

    // keep game input away from these buttons
    ["pointerdown", "mousedown", "touchstart", "touchend", "wheel"].forEach(function (ev) {
      wrap.addEventListener(ev, function (e) { e.stopPropagation(); }, { passive: false });
    });

    wrap.appendChild(bToggle);
    wrap.appendChild(bGear);
    document.body.appendChild(wrap);
    updateCornerUI();
  }

  function updateCornerUI() {
    var b = document.getElementById("crtToggleBtn");
    if (b && post) {
      if (post.on) { b.classList.add("on"); b.textContent = "CRT \u2714"; }
      else { b.classList.remove("on"); b.textContent = "CRT"; }
    }
  }

  var panelCtrl = null;
  function openPanel() {
    if (!post) return;
    var panel = document.getElementById("crtPanel");
    if (panel) { panel.remove(); return; } // toggle closed
    panel = document.createElement("div");
    panel.id = "crtPanel";

    var h = document.createElement("h4");
    h.textContent = "CRT SETTINGS";
    panel.appendChild(h);

    var x = document.createElement("button");
    x.className = "close-x";
    x.textContent = "\u2716";
    x.addEventListener("click", function (e) { e.stopPropagation(); panel.remove(); });
    panel.appendChild(x);

    var presets = document.createElement("div");
    presets.className = "presets";
    ["subtle", "classic", "crusty"].forEach(function (name) {
      var b = document.createElement("button");
      b.className = "preset";
      b.textContent = name.toUpperCase();
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        Object.assign(post.params, PRESETS[name]);
        if (panelCtrl) panelCtrl.refresh();
        persistParams();
      });
      presets.appendChild(b);
    });
    panel.appendChild(presets);

    var body = document.createElement("div");
    panel.appendChild(body);
    panelCtrl = buildControls(body, post.params, function () { persistParams(); });

    ["pointerdown", "mousedown", "touchstart", "wheel"].forEach(function (ev) {
      panel.addEventListener(ev, function (e) { e.stopPropagation(); }, { passive: false });
    });

    document.body.appendChild(panel);
  }

  function persistParams() {
    try {
      if (typeof window.__ssaOnCrtChange === "function") {
        window.__ssaOnCrtChange(JSON.parse(JSON.stringify(post.params)));
      }
    } catch (e) { /* ignore */ }
    updateCornerUI();
  }

  function startPost(params) {
    if (post) return true;
    installContextPatch();
    var canvas = document.createElement("canvas");
    canvas.id = "crtCanvas";
    Object.assign(canvas.style, {
      position: "fixed",
      display: "none",
      "pointer-events": "none",
      "z-index": "900",
      left: "0px", top: "0px", width: "0px", height: "0px"
    });
    var renderer = createRenderer(canvas);
    if (!renderer) { return false; }
    document.body.appendChild(canvas);
    post = {
      canvas: canvas,
      renderer: renderer,
      raf: 0,
      gameCanvas: null,
      on: !!(params && params.enabled),
      params: params
    };
    makeCornerUI();
    post.raf = requestAnimationFrame(syncLoop);
    updateCornerUI();
    return true;
  }

  function toggle() {
    if (!post) return false;
    post.on = !post.on;
    if (post.on) {
      post.params.enabled = true;
    }
    if (!post.on) post.canvas.style.display = "none";
    persistParams();
    return post.on;
  }

  function isOn() { return !!(post && post.on); }

  /* ---------------- export ---------------- */

  window.SSA_CRT = {
    DEFAULTS: DEFAULTS,
    PRESETS: PRESETS,
    CONTROLS: CONTROLS,
    GROUPS: GROUPS,
    buildControls: buildControls,
    mountPreview: mountPreview,
    unmountPreview: unmountPreview,
    installContextPatch: installContextPatch,
    startPost: startPost,
    toggle: toggle,
    isOn: isOn,
    getParams: function () { return post ? post.params : null; }
  };
})();
