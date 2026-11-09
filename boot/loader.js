/* ============================================================
   SHIT STICK ADVENTURE — boot loader
   flow: CRT setup -> cache download -> PWA prompt -> credits -> game
   ============================================================ */
(function () {
  "use strict";

  var MANIFEST = self.__SSA_FILES || { version: "v0", files: [] };
  var KEY = "ssa_setup_v1";
  var CACHE_PREFIX = "ssa-";
  var PEN = "boot/shitstick.png";

  /* ---------------- state ---------------- */

  var state = null;
  try { state = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { state = null; }
  if (!state || typeof state !== "object") state = null;

  var crtAccepted = false;
  var crtParams = null;
  var gameStarted = false;
  var bootedOk = false;
  var installEvt = null;
  var dlActive = false;
  var standalone =
    (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
    window.navigator.standalone === true;

  function saveState(patch) {
    var s = {
      version: MANIFEST.version,
      crt: crtAccepted,
      crtParams: crtParams ? JSON.parse(JSON.stringify(crtParams)) : null,
      pwaDismissed: !!(state && state.pwaDismissed),
      done: !!(state && state.done)
    };
    if (patch) Object.assign(s, patch);
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* private mode */ }
    state = s;
  }

  // persist live CRT tweaks made in-game
  window.__ssaOnCrtChange = function (params) {
    crtParams = params;
    if (state) saveState();
  };

  /* ---------------- dom helpers ---------------- */

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function img(cls, src) {
    var i = el("img", cls);
    i.src = src;
    i.draggable = false;
    i.alt = "";
    return i;
  }
  function boot() { return document.getElementById("boot"); }

  function showScreen(id) {
    var b = boot();
    b.classList.remove("dark");
    var all = b.querySelectorAll(".screen");
    for (var i = 0; i < all.length; i++) all[i].classList.remove("on");
    var target = document.getElementById(id);
    if (target) target.classList.add("on");
  }

  function headerInto(screen, sub) {
    var t = el("div", "game-title");
    t.appendChild(img(null, PEN));
    var h = el("h1", null, "SHIT STICK ADVENTURE");
    t.appendChild(h);
    screen.appendChild(t);
    screen.appendChild(el("p", "sub", sub));
  }

  function loadScript(src, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      var done = false;
      var timer = setTimeout(function () {
        if (!done) { done = true; reject(new Error("timeout " + src)); }
      }, timeoutMs || 5000);
      s.onload = function () {
        if (!done) { done = true; clearTimeout(timer); resolve(); }
      };
      s.onerror = function () {
        if (!done) { done = true; clearTimeout(timer); reject(new Error("failed " + src)); }
      };
      s.src = src;
      document.body.appendChild(s);
    });
  }

  function wait(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  function fmtMB(bytes) {
    return (bytes / 1048576).toFixed(1);
  }

  /* ============================================================
     SCREEN: CRT SETUP
     ============================================================ */

  function buildCrtScreen() {
    var sc = el("div", "screen");
    sc.id = "scr-crt";
    headerInto(sc, "web edition — offline PWA port");

    sc.appendChild(el("h2", "q", "also download the CRT shader pack??"));
    sc.appendChild(el("p", "hint", "makes the game look like a crusty old TV from 1987. tiny (~15 KB) and u can toggle it off anytime"));

    var wrap = el("div", "crt-wrap");
    var left = el("div");

    // presets
    var presets = el("div", "presets");
    var presetBtns = {};
    ["subtle", "classic", "crusty"].forEach(function (name) {
      var b = el("button", "preset", name.toUpperCase());
      b.addEventListener("click", function () {
        if (!window.SSA_CRT || !crtParams) return;
        Object.assign(crtParams, window.SSA_CRT.PRESETS[name]);
        if (crtCtrls) crtCtrls.refresh();
        selectPreset(name);
      });
      presetBtns[name] = b;
      presets.appendChild(b);
    });
    left.appendChild(presets);

    var ctrlHost = el("div");
    left.appendChild(ctrlHost);

    var actions = el("div", "crt-actions");
    var yes = el("button", "btn go big", "YES!! DOWNLOAD CRT PACK");
    yes.addEventListener("click", function () {
      crtAccepted = true;
      if (window.SSA_CRT) window.SSA_CRT.unmountPreview();
      saveState();
      gotoDownload();
    });
    var nah = el("button", "btn-plain", "nah, no CRT for me");
    nah.addEventListener("click", function () {
      crtAccepted = false;
      if (window.SSA_CRT) window.SSA_CRT.unmountPreview();
      saveState();
      gotoDownload();
    });
    actions.appendChild(yes);
    actions.appendChild(nah);
    actions.appendChild(el("div", "crt-note", "either way the game still works — this just decides the vibes"));
    left.appendChild(actions);

    var right = el("div");
    var card = el("div", "preview-card");
    var pv = document.createElement("canvas");
    pv.width = 480; pv.height = 360;
    card.appendChild(pv);
    card.appendChild(el("div", "preview-cap", "LIVE PREVIEW — drag the sliders!!"));
    right.appendChild(card);
    var sticker = el("div", "crt-sticker");
    sticker.appendChild(img(null, PEN));
    right.appendChild(sticker);

    wrap.appendChild(left);
    wrap.appendChild(right);
    sc.appendChild(wrap);

    document.getElementById("boot").appendChild(sc);

    var crtCtrls = null;
    function selectPreset(name) {
      for (var k in presetBtns) presetBtns[k].classList.remove("sel");
      presetBtns[name].classList.add("sel");
    }

    // built once crt.js is available (called from init)
    return {
      activate: function () {
        selectPreset("classic");
        crtParams = JSON.parse(JSON.stringify(window.SSA_CRT.PRESETS.classic));
        crtCtrls = window.SSA_CRT.buildControls(ctrlHost, crtParams, function () {
          for (var k in presetBtns) presetBtns[k].classList.remove("sel");
        });
        window.SSA_CRT.mountPreview(pv, crtParams);
      }
    };
  }

  /* ============================================================
     SCREEN: DOWNLOAD / CACHE
     ============================================================ */

  function buildDownloadScreen() {
    var sc = el("div", "screen");
    sc.id = "scr-dl";
    sc.appendChild(img("pen", PEN));
    sc.appendChild(el("h2", "q", "CACHING UR GAME"));
    sc.appendChild(el("p", "hint", "downloading everything so u can play OFFLINE forever. this only happens once!!"));

    var dl = el("div", "dl");
    var pct = el("div", "pct", "0%");
    var bar = el("div", "bar");
    var fill = el("div", "bar-fill");
    bar.appendChild(fill);
    var meta = el("div", "dl-meta", "0.0 MB / 0.0 MB");
    var file = el("div", "dl-file", "\u00a0");
    dl.appendChild(pct);
    dl.appendChild(bar);
    dl.appendChild(meta);
    dl.appendChild(file);
    sc.appendChild(dl);

    var err = el("div", "err-box");
    err.style.display = "none";
    var errH = el("h3", null, "the download pooped itself");
    var errP = el("p", null, "some files didnt make it. check ur internet and try again.");
    var retry = el("button", "btn go", "RETRY");
    err.appendChild(errH);
    err.appendChild(errP);
    err.appendChild(retry);
    sc.appendChild(err);

    document.getElementById("boot").appendChild(sc);

    var dlTitle = sc.querySelector("h2");
    var dlHint = sc.querySelector(".hint");

    return {
      setMode: function (updating) {
        if (updating) {
          dlTitle.textContent = "UPDATING SHITSTICK";
          dlHint.textContent = "new version detected!! refreshing ur offline copy…";
        }
      },
      progress: function (doneBytes, totalBytes, currentFile) {
        var ratio = totalBytes > 0 ? doneBytes / totalBytes : 0;
        if (ratio > 0.999) ratio = 1;
        var shown = Math.floor(ratio * 100);
        pct.textContent = shown + "%";
        fill.style.width = (ratio * 100).toFixed(1) + "%";
        meta.textContent = fmtMB(doneBytes) + " MB / " + fmtMB(totalBytes) + " MB";
        file.textContent = currentFile || "\u00a0";
      },
      fail: function (msg) {
        err.style.display = "block";
        if (msg) errP.textContent = msg;
      },
      onRetry: function (fn) { retry.addEventListener("click", fn); }
    };
  }

  /* ---------------- download engine ---------------- */

  function fetchAndCache(cache, entry, onBytes) {
    var path = entry.p;
    return fetch(path, { cache: "reload", credentials: "same-origin" }).then(function (resp) {
      if (!resp.ok) throw new Error("HTTP " + resp.status + " " + path);
      // stream bytes for smooth progress, then rebuild the response
      if (!resp.body || typeof resp.body.getReader !== "function") {
        return resp.arrayBuffer().then(function (buf) {
          onBytes(buf.byteLength);
          return { buf: buf, type: resp.headers.get("content-type") || "" };
        });
      }
      var reader = resp.body.getReader();
      var chunks = [];
      var received = 0;
      function pump() {
        return reader.read().then(function (r) {
          if (r.done) return { buf: chunks, type: resp.headers.get("content-type") || "" };
          chunks.push(r.value);
          received += r.value.byteLength;
          onBytes(r.value.byteLength);
          return pump();
        });
      }
      return pump().then(function (res) {
        // merge chunks for cache.put
        var total = 0;
        chunks.forEach(function (c) { total += c.byteLength; });
        var merged = new Uint8Array(total);
        var off = 0;
        chunks.forEach(function (c) { merged.set(c, off); off += c.byteLength; });
        res.buf = merged.buffer;
        return res;
      });
    }).then(function (res) {
      var resp2 = new Response(res.buf, {
        headers: { "Content-Type": res.type || "application/octet-stream" }
      });
      var reqs = [new Request(path, { credentials: "same-origin" })];
      if (path === "index.html") {
        reqs.push(new Request("./", { credentials: "same-origin" }));
      }
      return Promise.all(reqs.map(function (req) {
        return cache.put(req, path === "index.html" ? resp2.clone() : resp2);
      }));
    });
  }

  function runDownload(screenApi) {
    dlActive = true;
    var end = function (res) { dlActive = false; return res; };
    if (!("caches" in window)) {
      // can't cache (private mode etc) — let it pass online-only
      screenApi.progress(1, 1, "(private mode — skipping offline cache)");
      return wait(900).then(function () { end(); return { ok: true, skipped: true }; });
    }

    var files = MANIFEST.files.filter(function (f) {
      if (f.p === "boot/crt.js" && !crtAccepted) return false;
      return true;
    });

    return caches.open(CACHE_PREFIX + MANIFEST.version).then(function (cache) {
      // resume: skip files already cached with this version
      return Promise.all(files.map(function (f) {
        return cache.match(new Request(f.p, { credentials: "same-origin" })).then(function (m) {
          return m ? null : f;
        });
      })).then(function (todoMask) {
        var todo = todoMask.filter(function (f) { return f; });
        var totalBytes = 0;
        todo.forEach(function (f) { totalBytes += f.s; });
        var doneBytes = 0;
        screenApi.progress(0, Math.max(totalBytes, 1), "starting…");

        if (todo.length === 0) return { ok: true };

        var CONC = 6;
        var idx = 0;
        var failed = [];

        function worker() {
          if (idx >= todo.length) return Promise.resolve();
          var entry = todo[idx++];
          var got = 0;
          screenApi.progress(doneBytes, Math.max(totalBytes, 1), entry.p);
          return fetchAndCache(cache, entry, function (chunkBytes) {
            got += chunkBytes;
            var over = Math.max(0, got - entry.s);
            screenApi.progress(Math.min(doneBytes + got, totalBytes), Math.max(totalBytes, 1), entry.p);
            void over;
          }).then(function () {
            doneBytes += entry.s;
            screenApi.progress(doneBytes, Math.max(totalBytes, 1), null);
          }).catch(function () {
            // one retry
            return fetchAndCache(cache, entry, function () {}).then(function () {
              doneBytes += entry.s;
              screenApi.progress(doneBytes, Math.max(totalBytes, 1), null);
            }).catch(function (e) {
              failed.push(entry.p);
              doneBytes += entry.s;
              screenApi.progress(doneBytes, Math.max(totalBytes, 1), null);
            });
          }).then(worker);
        }

        var workers = [];
        for (var i = 0; i < CONC; i++) workers.push(worker());
        return Promise.all(workers).then(function () {
          if (failed.length > 0) {
            return { ok: false, failed: failed };
          }
          return { ok: true };
        });
      });
    }).then(end, function (err) { end(err); throw err; });
  }

  /* ============================================================
     SCREEN: PWA INSTALL
     ============================================================ */

  function buildPwaScreen() {
    var sc = el("div", "screen");
    sc.id = "scr-pwa";
    sc.appendChild(el("div", "tag", "almost there!!"));

    var card = el("div", "pwa-card");
    card.appendChild(img("pen", PEN));
    card.appendChild(el("h2", "q", "install shit stick adventure?"));
    card.appendChild(el("p", "hint", "for the best experience!!"));

    var rows = el("div", "pwa-rows");
    [["\u2714", "works fully OFFLINE (no wifi, no problem)"],
     ["\u2714", "own icon on ur desktop / home screen"],
     ["\u2714", "opens in its own window, no browser bars"]].forEach(function (pair) {
      var r = el("div");
      var s = el("span", null, pair[0]);
      r.appendChild(s);
      r.appendChild(document.createTextNode(pair[1]));
      rows.appendChild(r);
    });
    card.appendChild(rows);

    var actions = el("div", "pwa-actions");
    var install = el("button", "btn go big", "checking…");
    install.disabled = true;
    var skip = el("button", "btn-plain", "nah, just play");
    actions.appendChild(install);
    actions.appendChild(skip);
    card.appendChild(actions);

    var hint = el("div", "pwa-hint", "");
    card.appendChild(hint);

    var ios = el("div", "pwa-ios");
    ios.style.display = "none";
    ios.innerHTML = "on iPhone/iPad: tap the <b>Share</b> button \u2191 then <b>\u201cAdd to Home Screen\u201d</b>";
    card.appendChild(ios);

    var reset = el("button", "btn-plain", "reset setup");
    reset.style.marginTop = "14px";
    card.appendChild(reset);

    sc.appendChild(card);
    document.getElementById("boot").appendChild(sc);

    return {
      installBtn: install,
      hint: hint,
      iosBox: ios,
      skipBtn: skip,
      resetBtn: reset,
      card: card
    };
  }

  function gotoPwa() {
    // respect earlier dismissal / already-installed state
    if (standalone || (state && state.pwaDismissed)) {
      showCredits();
      return;
    }
    var ui = buildPwaScreen();

    function finish() {
      showCredits();
    }

    ui.skipBtn.addEventListener("click", function () {
      saveState({ pwaDismissed: true });
      finish();
    });
    ui.resetBtn.addEventListener("click", function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      location.reload();
    });

    showScreen("scr-pwa");

    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (installEvt) {
      ui.installBtn.disabled = false;
      ui.installBtn.textContent = "INSTALL APP";
      ui.installBtn.addEventListener("click", function () {
        ui.installBtn.disabled = true;
        ui.installBtn.textContent = "installing…";
        installEvt.prompt();
        installEvt.userChoice.then(function (choice) {
          if (choice && choice.outcome === "accepted") {
            ui.installBtn.textContent = "INSTALLED!! \u2714";
            ui.hint.textContent = "see u on ur desktop \u{1F389}";
            setTimeout(finish, 1400);
          } else {
            ui.installBtn.textContent = "INSTALL APP";
            ui.installBtn.disabled = false;
            ui.hint.textContent = "(u can also install later from the browser menu)";
          }
        });
      });
      window.addEventListener("appinstalled", function () {
        ui.installBtn.textContent = "INSTALLED!! \u2714";
        setTimeout(finish, 900);
      });
    } else if (isIOS && !standalone) {
      ui.installBtn.style.display = "none";
      ui.iosBox.style.display = "block";
      ui.skipBtn.textContent = "ok got it, play";
    } else {
      ui.installBtn.style.display = "none";
      ui.hint.textContent = "u can also install it later from the browser menu (\u201cinstall app\u201d)";
      ui.skipBtn.textContent = "LET'S PLAY";
    }
  }

  /* ============================================================
     SCREEN: CREDITS -> GAME
     ============================================================ */

  function showCredits() {
    var b = boot();
    var sc = el("div", "screen");
    sc.id = "scr-credits";
    var c = el("div", "credits");
    c.appendChild(document.createTextNode("port and optimization by b29s"));
    var sm = el("span", "sm", "starting the game…");
    c.appendChild(sm);
    sc.appendChild(c);
    b.appendChild(sc);
    showScreen("scr-credits");
    b.classList.add("dark");

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        c.classList.add("show");
      });
    });

    setTimeout(function () {
      c.classList.remove("show");
      startGame(); // boot the game behind the fading overlay
      setTimeout(function () {
        b.classList.add("hidden");
      }, 1000);
    }, 2600);
  }

  /* ============================================================
     GAME START
     ============================================================ */

  function startGame() {
    if (gameStarted) return;
    gameStarted = true;

    var boot = function () {
      var s = document.createElement("script");
      s.src = "js/main.js";
      s.onload = function () {
        // main.js is designed for a natural page load: it loads 12 more
        // scripts (pixi, effekseer, rmmz core...) and only boots the game
        // on the window 'load' event. that event already fired during our
        // setup screens, so we wait for main.js's own ready conditions and
        // then re-dispatch 'load' to kick off the RPG Maker boot sequence.
        function waitReady(tries) {
          if (gameStarted !== true) return;
          var ready = false;
          try {
            ready =
              document.readyState === "complete" &&
              typeof main !== "undefined" &&
              main.numScripts > 0 &&
              main.loadCount >= main.numScripts &&
              main.xhrSucceeded === true;
          } catch (e) { ready = false; }
          if (ready) {
            setTimeout(function () { window.dispatchEvent(new Event("load")); }, 60);
          } else if (tries < 1200) { // ~60s max
            setTimeout(function () { waitReady(tries + 1); }, 50);
          }
        }
        waitReady(0);
      };
      s.onerror = function () {
        // total failure — show something at least
        document.body.innerHTML =
          '<div style="color:#fff;font-family:Comic Sans MS,cursive;padding:40px;text-align:center">' +
          'the game files could not load. try refreshing the page.</div>';
      };
      document.body.appendChild(s);
    };

    // make sure the CRT pack is actually loaded before starting the game
    // (on repeat visits only the cache holds it — sw serves it offline)
    var prepCrt = function (next) {
      if (!crtAccepted || window.SSA_CRT) { next(); return; }
      loadScript("boot/crt.js", 6000).then(next, function () {
        // pack unavailable (declined offline etc) — plain game, no CRT
        crtAccepted = false;
        next();
      });
    };

    prepCrt(function () {
      if (crtAccepted && window.SSA_CRT && crtParams) {
        try {
          window.SSA_CRT.installContextPatch();
          window.SSA_CRT.startPost(crtParams);
        } catch (e) { /* CRT optional — never block the game */ }
      }
      boot();
    });
  }

  /* ============================================================
     FLOW
     ============================================================ */

  var crtScreenApi = null;
  var dlScreenApi = null;

  function gotoDownload() {
    if (!dlScreenApi) dlScreenApi = buildDownloadScreen();
    dlScreenApi.setMode(!!state && !!state.done && state.version !== MANIFEST.version);
    dlScreenApi.onRetry(function () {
      location.reload();
    });
    showScreen("scr-dl");
    runDownload(dlScreenApi).then(function (res) {
      if (!res || !res.ok) {
        dlScreenApi.fail("failed files: " + (res && res.failed ? res.failed.slice(0, 5).join(", ") + (res.failed.length > 5 ? " …" : "") : "unknown"));
        return;
      }
      saveState({ done: true });
      registerSW().then(function () { gotoPwa(); });
    });
  }

  function registerSW() {
    if (!("serviceWorker" in navigator)) return Promise.resolve();
    return navigator.serviceWorker
      .register("sw.js", { scope: "./", updateViaCache: "none" })
      .catch(function () { /* offline mode just won't update */ })
      .then(function () {
        return new Promise(function (resolve) {
          var t = setTimeout(resolve, 2500);
          if (navigator.serviceWorker.ready && navigator.serviceWorker.controller) {
            clearTimeout(t); resolve();
          }
        });
      });
  }

  function init() {
    // capture install prompt as early as possible
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      installEvt = e;
    });

    var firstRun = !state || typeof state.crt !== "boolean";
    var cached = !!(state && state.done && state.version === MANIFEST.version);
    crtAccepted = !!(state && state.crt);
    if (state && state.crtParams) crtParams = state.crtParams;

    // build screens
    crtScreenApi = buildCrtScreen();
    dlScreenApi = buildDownloadScreen();

    bootedOk = true;

    if (firstRun) {
      // first visit: ask about CRT BEFORE downloading anything
      loadScript("boot/crt.js", 6000).then(function () {
        showScreen("scr-crt");
        crtScreenApi.activate();
      }).catch(function () {
        // no CRT pack available — straight to download
        crtAccepted = false;
        gotoDownload();
      });
    } else if (!cached) {
      // resume (interrupted download) or update (new deploy)
      gotoDownload();
    } else {
      // repeat visit, all cached — short path
      saveState();
      registerSW().then(function () {
        if (!standalone && !state.pwaDismissed) {
          gotoPwa();
        } else {
          showCredits();
        }
      });
    }
  }

  /* ---------------- safety nets ---------------- */

  // if the boot flow explodes, at least get the game on screen
  function forceStart() {
    var b = boot();
    if (gameStarted) return;
    if (crtAccepted && !window.SSA_CRT) crtAccepted = false; // no pack, no CRT
    if (b) b.classList.add("hidden");
    startGame();
  }

  setInterval(function () {
    if (gameStarted || dlActive) return;
    var b = boot();
    if (!b || b.classList.contains("hidden")) return;
    var anyOn = b.querySelector(".screen.on");
    if (!anyOn) {
      console.warn("[ssa-boot] watchdog: forcing game start");
      forceStart();
    }
  }, 10000);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
