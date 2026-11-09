/*:
 * @plugindesc Footstep Sounds MZ v1.0 — by ComputerToot
 * @author ComputerToot
 * @target MZ
 *
 * @help
 * ────────────────────────────────
 * TOOT_FootstepSoundsMZ — v1.0 
 * ────────────────────────────────
 * SUMMARY
 *  • Plays footstep sounds for the Player and moving Events.
 *  • Two detection modes:
 *      - Region Mode  : uses Region ID under the character.
 *      - Terrain Mode : uses Tileset Terrain Tag (0–7) under the character.
 *  • Autotile-safe terrain tag detection (A2–A5, B–E layers).
 *  • Events can opt in and fade with distance from the player.
 *
 * EVENT NOTETAGS (put these in the Event's Note box)
 *   <NPC>
 *      Treat this event like the player for tile-based sounds (uses Mode & maps).
 *
 *   <EventSound: filename>
 *      Always plays this exact SE when the event moves. Ignores Mode & maps.
 *      File must be in audio/se/. Extension optional (e.g., footsteps1 or footsteps1.ogg).
 *
 *   <EventPitch: N>       e.g. <EventPitch: 100>
 *   <EventPitch: A-B>     e.g. <EventPitch: 85-120>
 *      For <EventSound: ...> events: set fixed (N) or random range (A–B) pitch.
 *      Clamped to 50–150.
 *
 *   <EventVolume: N>      e.g. <EventVolume: 70>
 *      For <EventSound: ...> events: set fixed volume 0–100.
 *      If omitted, uses the global "Event Volume" parameter.
 *
 *   <Fade>
 *      Enables distance-based attenuation using the plugin’s fade settings:
 *        • Fade Percent Loss Per Tile: percent of volume lost per tile (e.g., 20%).
 *          Internally multiplies by (1 - loss%) each tile (e.g., 0.8^distance).
 *        • Fade Cutoff Distance (Tiles): if distance >= cutoff, volume = 0.
 *          Set 0 to disable the cutoff (no hard mute).
 *
 * PRIORITY RULES
 *  • <EventSound: ...> overrides everything and always plays that sound.
 *  • Otherwise, <NPC> uses Mode & mappings like the Player.
 *  • Events without these tags are ignored by this plugin.
 *
 * INSTALL
 *  1) Save as: TOOT_FootstepSoundsMZ.js
 *  2) Put in: js/plugins/
 *  3) Enable in Plugin Manager.
 *
 * TIPS
 *  • PitchMin/Max randomizes pitch for Player and <NPC> footsteps only.
 *  • A1 animated tiles rarely carry terrain tags—use Region Mode there.
 *  • To debug: try <EventSound: Cursor2> on a moving event so it’s obvious.
 *
 * COMPAT
 *  • Hooks Game_Player.prototype.increaseSteps and Game_Event.prototype.increaseSteps.
 *    If another plugin overwrites these without calling originals, adjust order.
 *
 * API
 *  • window.TOOT_Footsteps_playFootstepAt(x, y)
 *      Plays a footstep SE based on current Mode at map coords (x, y).
 *
 * LICENSE — Creative Commons Zero v1.0 Universal (CC0)
 *  Public domain. Do anything you like, commercial included.
 *  https://creativecommons.org/publicdomain/zero/1.0/
 *
 * @param Mode
 * @text Active Mode
 * @type select
 * @option Region Mode
 * @value region
 * @option Terrain Mode
 * @value terrain
 * @default region
 *
 * @param Region Sounds
 * @type struct<RegionSounds>[]
 * @desc Map Region IDs to SE names.
 * @default []
 *
 * @param Terrain Sounds
 * @type struct<TerrainSounds>[]
 * @desc Map Terrain Tags (0–7) to SE names.
 * @default []
 *
 * @param PitchMin
 * @type number
 * @min 50
 * @max 150
 * @desc Minimum SE pitch (MZ uses 50–150). Applies to Player and <NPC> events.
 * @default 90
 *
 * @param PitchMax
 * @type number
 * @min 50
 * @max 150
 * @desc Maximum SE pitch (MZ uses 50–150). Applies to Player and <NPC> events.
 * @default 110
 *
 * @param Volume
 * @type number
 * @min 0
 * @max 100
 * @desc SE volume (0–100) for Player footsteps (and default for <NPC>).
 * @default 90
 *
 * @param Event Volume
 * @type number
 * @min 0
 * @max 100
 * @desc Default SE volume (0–100) for event footsteps.
 * @default 90
 *
 * @param Fade Percent Loss Per Tile
 * @type number
 * @min 0
 * @max 100
 * @desc Percent of volume lost per tile for faded events (0 = no loss, 100 = mute instantly).
 * @default 20
 *
 * @param Fade Cutoff Distance (Tiles)
 * @type number
 * @min 0
 * @max 99
 * @desc Distance in tiles where faded events become silent (0 = no cutoff). Default 6.
 * @default 6
 */

/*~struct~RegionSounds:
 * @param RegionID
 * @text Region ID
 * @type number
 * @min 1
 * @desc Region ID to assign.
 * @default 1
 *
 * @param SoundEffect
 * @text Sound Effect
 * @type file
 * @dir audio/se
 * @desc SE to play on this region (extension allowed; stripped automatically).
 * @default footsteps1.ogg
 */

/*~struct~TerrainSounds:
 * @param TerrainID
 * @text Terrain Tag
 * @type number
 * @min 0
 * @max 7
 * @desc Terrain tag to assign (0–7).
 * @default 0
 *
 * @param SoundEffect
 * @text Sound Effect
 * @type file
 * @dir audio/se
 * @desc SE to play on this terrain (extension allowed; stripped automatically).
 * @default footsteps1.ogg
 */

(() => {
  "use strict";

  // ────────────────────────────────────────────────────────────────────────────
  // Parameters
  // ────────────────────────────────────────────────────────────────────────────
  const PLUGIN_NAME = "TOOT_FootstepSoundsMZ";
  const params = PluginManager.parameters(PLUGIN_NAME);

  const mode      = String(params["Mode"] || "region"); // 'region' | 'terrain'
  const volPlayer = clamp0to100(toInt(params["Volume"], 90));
  const volEvtDef = clamp0to100(toInt(params["Event Volume"], 90));
  let pitchLo     = clampPitch(toInt(params["PitchMin"], 90));
  let pitchHi     = clampPitch(toInt(params["PitchMax"], 110));
  if (pitchHi < pitchLo) { const t = pitchLo; pitchLo = pitchHi; pitchHi = t; }

  const fadeLossPercent = clamp0to100(toInt(params["Fade Percent Loss Per Tile"], 20)); // % lost per tile
  const fadeMulPerTile  = 1 - (fadeLossPercent / 100);                                   // remaining per tile
  const fadeCutoffTiles = Math.max(0, toInt(params["Fade Cutoff Distance (Tiles)"], 6)); // 0 = disabled

  function parseStructArray(key) {
    const raw = params[key] || "[]";
    try {
      return JSON.parse(raw).map(s => {
        try { return JSON.parse(s); } catch(_) { return null; }
      }).filter(Boolean);
    } catch(_) {
      return [];
    }
  }

  const regionMap  = parseStructArray("Region Sounds");
  const terrainMap = parseStructArray("Terrain Sounds");

  // ────────────────────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────────────────────
  function toInt(n, dflt) {
    const v = Number(n);
    return isNaN(v) ? dflt : Math.round(v);
  }
  function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
  }
  function clamp0to100(n) { return clamp(n, 0, 100); }
  function clampPitch(n)  { return clamp(n, 50, 150); }
  function stripExt(name) { return name ? String(name).replace(/\.(ogg|m4a|wav)$/i, "") : null; }
  function rngPitch(lo, hi) {
    lo = clampPitch(lo); hi = clampPitch(hi);
    return Math.floor(Math.random() * (hi - lo + 1)) + lo;
  }
  function findRegionSe(regionId) {
    for (let i = 0; i < regionMap.length; i++) {
      const e = regionMap[i];
      if (Number(e.RegionID) === Number(regionId)) return stripExt(e.SoundEffect);
    }
    return null;
  }
  function findTerrainSe(tag) {
    for (let i = 0; i < terrainMap.length; i++) {
      const e = terrainMap[i];
      if (Number(e.TerrainID) === Number(tag)) return stripExt(e.SoundEffect);
    }
    return null;
  }

  // Autotile-safe Terrain Tag check (MZ)
  function terrainTagAt(x, y) {
    // Try direct tag first (works for most tiles)
    const base = $gameMap.terrainTag(x, y);
    if (base) return base;

    // Fallback: inspect layered tile flags if available
    if ($gameMap.layeredTiles) {
      const tiles = $gameMap.layeredTiles(x, y); // lower1, lower2, upper1, upper2
      const flags = $gameMap.tilesetFlags();
      for (let i = 0; i < tiles.length; i++) {
        const id = tiles[i];
        if (!id) continue;
        const f  = flags[id] || 0;
        const tt = (f >> 12) & 0x0F; // bits 12–15 store terrain tag in MZ
        if (tt) return tt;
      }
    }
    return 0;
  }

  function seForTile(x, y) {
    if (mode === "region") {
      return findRegionSe($gameMap.regionId(x, y));
    } else {
      return findTerrainSe(terrainTagAt(x, y));
    }
  }

  function playSeNamed(name, volume, pitch) {
    if (!name) return;
    AudioManager.playSe({
      name: name,
      volume: clamp0to100(volume),
      pitch: clampPitch(pitch),
      pan: 0
    });
  }

  // Expose a helper for other scripts
  window.TOOT_Footsteps_playFootstepAt = function(x, y) {
    const seName = seForTile(x, y);
    if (seName) playSeNamed(seName, volPlayer, rngPitch(pitchLo, pitchHi));
  };

  // ────────────────────────────────────────────────────────────────────────────
  // Player hook (MZ uses same method name)
  // ────────────────────────────────────────────────────────────────────────────
  const _Game_Player_increaseSteps = Game_Player.prototype.increaseSteps;
  Game_Player.prototype.increaseSteps = function() {
    _Game_Player_increaseSteps.call(this);
    if (!$gameMap || this.isInVehicle() || this.isTransferring()) return;
    const seName = seForTile(this.x, this.y);
    if (seName) playSeNamed(seName, volPlayer, rngPitch(pitchLo, pitchHi));
  };

  // ────────────────────────────────────────────────────────────────────────────
  // Event notetags + hook
  //   <NPC>
  //   <EventSound: filename>
  //   <EventPitch: N> or <EventPitch: A-B>
  //   <EventVolume: N>
  //   <Fade>
  // ────────────────────────────────────────────────────────────────────────────
  function parseEventNotesTootFlags(evData) {
    const out = {
      npc: false,
      sound: null,
      pitch: null,   // {mode:'fixed',v:N} or {mode:'range',a:A,b:B}
      volume: null,  // N
      fade: false
    };
    if (!evData) return out;

    // MZ: meta is extracted automatically, but we also parse the raw note
    const note = String(evData.note || "");

    if (/<NPC>/i.test(note)) out.npc = true;

    const sm = note.match(/<EventSound:\s*(.+?)>/i);
    if (sm) out.sound = stripExt(sm[1].trim());

    const pm = note.match(/<EventPitch:\s*([\d]+)\s*-\s*([\d]+)\s*>/i);
    if (pm) {
      let a = clampPitch(Number(pm[1]));
      let b = clampPitch(Number(pm[2]));
      if (!isNaN(a) && !isNaN(b)) {
        if (b < a) { const t = a; a = b; b = t; }
        out.pitch = { mode: "range", a, b };
      }
    } else {
      const pf = note.match(/<EventPitch:\s*([\d]+)\s*>/i);
      if (pf) {
        const v = clampPitch(Number(pf[1]));
        if (!isNaN(v)) out.pitch = { mode: "fixed", v };
      }
    }

    const vm = note.match(/<EventVolume:\s*([\d]+)\s*>/i);
    if (vm) {
      const vv = clamp0to100(Number(vm[1]));
      if (!isNaN(vv)) out.volume = vv;
    }

    if (/<Fade>/i.test(note)) out.fade = true;

    return out;
  }

  function manhattanDistanceFromPlayer(ev) {
    if (!$gamePlayer) return 0;
    return Math.abs(ev.x - $gamePlayer.x) + Math.abs(ev.y - $gamePlayer.y);
  }

  // Adjustable attenuation with optional cutoff
  function applyFade(volume, ev) {
    if (!ev || !ev._tootFade) return volume;
    const d = manhattanDistanceFromPlayer(ev);

    // Hard cutoff (if enabled)
    if (fadeCutoffTiles > 0 && d >= fadeCutoffTiles) return 0;

    // Multiply remaining volume per tile by fadeMulPerTile^distance
    const att = Math.pow(fadeMulPerTile, d);
    return Math.floor(clamp0to100(volume * att));
  }

  const _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);

    this._tootNPC = false;
    this._tootEventSound = null;
    this._tootEventPitch = null;   // {mode, v|a,b}
    this._tootEventVolume = null;
    this._tootFade = false;

    const evData = this.event();
    if (evData) {
      const flags = parseEventNotesTootFlags(evData);
      this._tootNPC = !!flags.npc;
      this._tootEventSound = flags.sound || null;
      this._tootEventPitch = flags.pitch || null;
      this._tootEventVolume = (typeof flags.volume === "number") ? flags.volume : null;
      this._tootFade = !!flags.fade;
    }
  };

  const _Game_Event_increaseSteps = Game_Event.prototype.increaseSteps;
  Game_Event.prototype.increaseSteps = function() {
    _Game_Event_increaseSteps.call(this);
    if (!$gameMap) return;

    if (this._tootEventSound) {
      // Explicit event sound overrides map logic
      let vol = (this._tootEventVolume != null) ? this._tootEventVolume : volEvtDef;
      if (this._tootFade) vol = applyFade(vol, this);

      let pitch = 100;
      if (this._tootEventPitch) {
        if (this._tootEventPitch.mode === "fixed") pitch = this._tootEventPitch.v;
        else if (this._tootEventPitch.mode === "range") pitch = rngPitch(this._tootEventPitch.a, this._tootEventPitch.b);
      }
      playSeNamed(this._tootEventSound, vol, pitch);

    } else if (this._tootNPC) {
      // Use same logic as player
      const seName = seForTile(this.x, this.y);
      if (seName) {
        let v = volEvtDef;
        if (this._tootFade) v = applyFade(v, this);
        playSeNamed(seName, v, rngPitch(pitchLo, pitchHi));
      }
    }
  };

})();
