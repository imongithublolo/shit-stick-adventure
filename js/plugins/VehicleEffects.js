/*~struct~VehicleBgmEntry:
 * @param name
 * @text BGM File
 * @desc Audio file in audio/bgm (no extension).
 * @type file
 * @dir audio/bgm
 * @default
 *
 * @param volume
 * @text Volume
 * @desc BGM volume (0-100).
 * @default 90
 *
 * @param pitch
 * @text Pitch
 * @desc BGM pitch (50-150).
 * @default 100
 *
 * @param pan
 * @text Pan
 * @desc BGM pan (-100 to 100).
 * @default 0
 */

/*~struct~VehicleGroup:
 * @param Amplitude
 * @text Float Amplitude
 * @desc Vertical/XY bob amplitude.
 * @default 4
 *
 * @param Frequency
 * @text Float Frequency
 * @desc Speed of the bobbing wave.
 * @default 0.05
 *
 * @param RandomFloatRange
 * @text Extra Random Range
 * @desc ± range for extra random offset.
 * @default 0
 *
 * @param RandomFloatInterval
 * @text Random Interval
 * @desc Every X frames, pick a new random offset.
 * @default 60
 *
 * @param RandomFloatApproach
 * @text Random Approach
 * @desc How quickly to move toward offset each frame.
 * @default 0.1
 *
 * @param OverlayImage
 * @text Overlay Image
 * @desc Picture in img/pictures to overlay while riding.
 * @default
 *
 * @param OverlayOpacity
 * @text Overlay Opacity
 * @desc Overlay opacity (0-255).
 * @default 200
 *
 * @param OverlayScrollX
 * @text Overlay Scroll X
 * @desc Horizontal scroll speed (pixels/frame).
 * @default 0
 *
 * @param OverlayScrollY
 * @text Overlay Scroll Y
 * @desc Vertical scroll speed (pixels/frame).
 * @default 0
 *
 * @param InteriorMapId
 * @text Interior Map ID
 * @desc Map for forced interior (0=off).
 * @default 0
 *
 * @param InteriorX
 * @text Interior X
 * @desc X coordinate on interior map.
 * @default 0
 *
 * @param InteriorY
 * @text Interior Y
 * @desc Y coordinate on interior map.
 * @default 0
 *
 * @param EnterSEName
 * @text Enter SE
 * @type file
 * @dir audio/se
 * @desc Sound effect on boarding. Blank=none.
 * @default
 *
 * @param EnterSEVolume
 * @text Enter SE Volume
 * @default 90
 *
 * @param EnterSEPitch
 * @text Enter SE Pitch
 * @default 100
 *
 * @param EnterSEPan
 * @text Enter SE Pan
 * @default 0
 *
 * @param ExitSEName
 * @text Exit SE
 * @type file
 * @dir audio/se
 * @desc Sound effect on disembark. Blank=none.
 * @default
 *
 * @param ExitSEVolume
 * @text Exit SE Volume
 * @default 90
 *
 * @param ExitSEPitch
 * @text Exit SE Pitch
 * @default 100
 *
 * @param ExitSEPan
 * @text Exit SE Pan
 * @default 0
 *
 * @param VehicleBgm
 * @text Vehicle BGM
 * @desc Random BGM list for this vehicle.
 * @type struct<VehicleBgmEntry>[]
 * @default []
 *
 * @param MotionEffect
 * @text Motion Effect
 * @type select
 * @option None
 * @value none
 * @option Motion Blur
 * @value motionBlur
 * @option Bloom
 * @value bloom
 * @option Distortion
 * @value distortion
 * @option Particles
 * @value particles
 * @desc Visual effect on the vehicle sprite.
 * @default none
 *
 * @param MotionBlurStrength
 * @text Blur Strength
 * @default 4
 *
 * @param BloomThreshold
 * @text Bloom Threshold
 * @default 0.5
 *
 * @param BloomScale
 * @text Bloom Scale
 * @default 1.5
 *
 * @param DistortionScale
 * @text Distortion Scale
 * @default 20
 *
 * @param ParticleImage
 * @text Particle Image
 * @desc Filename in img/system (no extension).
 * @default
 *
 * @param ParticleFade
 * @text Particle Fade Rate
 * @desc Alpha fade amount each frame (1-255).
 * @default 5
 */

/*:
 * @target MZ
 * @plugindesc v1.0 - Vehicle Effects Enhanced: random float, overlays, interior transfer, custom SE/BGM, PixiJS filters, particle trails.
 * @author Paradajz
 *
 * @param BoatSettings
 * @type struct<VehicleGroup>
 * @default {"Amplitude":"4","Frequency":"0.05","RandomFloatRange":"0","RandomFloatInterval":"60","RandomFloatApproach":"0.1","OverlayImage":"","OverlayOpacity":"200","OverlayScrollX":"0","OverlayScrollY":"0","InteriorMapId":"0","InteriorX":"0","InteriorY":"0","EnterSEName":"","EnterSEVolume":"90","EnterSEPitch":"100","EnterSEPan":"0","ExitSEName":"","ExitSEVolume":"90","ExitSEPitch":"100","ExitSEPan":"0","VehicleBgm":[],"MotionEffect":"bloom","MotionBlurStrength":"4","BloomThreshold":"0.5","BloomScale":"1.5","DistortionScale":"20","ParticleImage":"","ParticleFade":"5"}
 *
 * @param ShipSettings
 * @type struct<VehicleGroup>
 * @default {"Amplitude":"3","Frequency":"0.04","RandomFloatRange":"0","RandomFloatInterval":"60","RandomFloatApproach":"0.1","OverlayImage":"","OverlayOpacity":"200","OverlayScrollX":"0","OverlayScrollY":"0","InteriorMapId":"0","InteriorX":"0","InteriorY":"0","EnterSEName":"","EnterSEVolume":"90","EnterSEPitch":"100","EnterSEPan":"0","ExitSEName":"","ExitSEVolume":"90","ExitSEPitch":"100","ExitSEPan":"0","VehicleBgm":[],"MotionEffect":"motionBlur","MotionBlurStrength":"4","BloomThreshold":"0.5","BloomScale":"1.5","DistortionScale":"20","ParticleImage":"","ParticleFade":"5"}
 *
 * @param AirshipSettings
 * @type struct<VehicleGroup>
 * @default {"Amplitude":"2","Frequency":"0.03","RandomFloatRange":"0","RandomFloatInterval":"60","RandomFloatApproach":"0.1","OverlayImage":"","OverlayOpacity":"200","OverlayScrollX":"0","OverlayScrollY":"0","InteriorMapId":"0","InteriorX":"0","InteriorY":"0","EnterSEName":"","EnterSEVolume":"90","EnterSEPitch":"100","EnterSEPan":"0","ExitSEName":"","ExitSEVolume":"90","ExitSEPitch":"100","ExitSEPan":"0","VehicleBgm":[],"MotionEffect":"distortion","MotionBlurStrength":"4","BloomThreshold":"0.5","BloomScale":"1.5","DistortionScale":"20","ParticleImage":"","ParticleFade":"5"}
 *
 * @param InteriorTransferKey
 * @text Interior Transfer Key
 * @desc Key to press for forced interior transfer.
 * @default U
 *
 * @param InteriorTransitionEnabled
 * @text Use Interior Transition?
 * @type boolean
 * @default true
 *
 * @param InteriorTransitionColor
 * @text Transition Color
 * @desc "black" or "white" for fade color.
 * @default black
 *
 * @param InteriorTransitionDuration
 * @text Transition Duration
 * @desc Frames for fade out/in.
 * @default 60
 *
 * @command ReturnFromVehicleInterior
 * @text ReturnFromVehicleInterior
 * @desc Return from forced interior to the vehicle.
 *
 * @help
 * ============================================================================
 * Vehicle Effects v1.0
 * ============================================================================
 * Features:
 *  - Random floating/bobbing for vehicles.
 *  - Overlays on the map.
 *  - Interior transfer via a dedicated key (e.g., "U") and plugin command.
 *  - Custom sound effects on boarding/disembarking.
 *  - Random BGM for vehicles.
 *  - Motion effects using PixiJS filters (motion blur, bloom, distortion, particles).
 *  - Directional particle trails.
 *
 *
 * To Use:
 *  1. Configure parameters in the Plugin Manager (Interior Maps etc.).
 *  2. Use the plugin command "ReturnFromVehicleInterior" to return to your vehicle from interior map.
 *
 * Terms of Use:
 *  Free for commercial or non-commercial projects. Credit Paradajz.
 * ============================================================================
 */

(() => {
  "use strict";
  const pluginName = "VehicleEffects";

  const p = PluginManager.parameters(pluginName);
  const interiorKey = String(p["InteriorTransferKey"] || "U").toUpperCase();
  Input.keyMapper[interiorKey.charCodeAt(0)] = "vehicleInteriorTransfer";

  const toNum = (v, d) => { const n = Number(v); return isNaN(n) ? d : n; };
  const toBool = v => String(v).toLowerCase() === "true";

  
  function parseBgmEntry(o) {
    let x;
    if (typeof o === "string") {
      try { x = JSON.parse(o); } catch { x = {}; }
    } else {
      x = o || {};
    }
    return {
      name:   String(x.name || ""),
      volume: toNum(x.volume, 90),
      pitch:  toNum(x.pitch, 100),
      pan:    toNum(x.pan, 0)
    };
  }

  function parseBgmList(raw) {
    if (!raw) return [];
    let arr;
    if (typeof raw === "string") {
      try { arr = JSON.parse(raw); } catch { arr = []; }
    } else if (Array.isArray(raw)) {
      arr = raw;
    } else {
      arr = [];
    }
    return arr.map(parseBgmEntry).filter(a => a.name);
  }

  function parseVehicleGroup(json) {
    let obj;
    try { obj = JSON.parse(json); } catch { obj = {}; }
    return {
      amplitude:           toNum(obj.Amplitude, 4),
      frequency:           toNum(obj.Frequency, 0.05),
      randomFloatRange:    toNum(obj.RandomFloatRange, 0),
      randomFloatInterval: toNum(obj.RandomFloatInterval, 60),
      randomFloatApproach: toNum(obj.RandomFloatApproach, 0.1),
      overlayImage:        String(obj.OverlayImage || ""),
      overlayOpacity:      toNum(obj.OverlayOpacity, 200),
      overlayScrollX:      toNum(obj.OverlayScrollX, 0),
      overlayScrollY:      toNum(obj.OverlayScrollY, 0),
      interiorMapId:       toNum(obj.InteriorMapId, 0),
      interiorX:           toNum(obj.InteriorX, 0),
      interiorY:           toNum(obj.InteriorY, 0),
      enterSEName:         String(obj.EnterSEName || ""),
      enterSEVolume:       toNum(obj.EnterSEVolume, 90),
      enterSEPitch:        toNum(obj.EnterSEPitch, 100),
      enterSEPan:          toNum(obj.EnterSEPan, 0),
      exitSEName:          String(obj.ExitSEName || ""),
      exitSEVolume:        toNum(obj.ExitSEVolume, 90),
      exitSEPitch:         toNum(obj.ExitSEPitch, 100),
      exitSEPan:           toNum(obj.ExitSEPan, 0),
      vehicleBgm:          parseBgmList(obj.VehicleBgm),
      motionEffect:        String(obj.MotionEffect || "none"),
      motionBlurStrength:  toNum(obj.MotionBlurStrength, 4),
      bloomThreshold:      Number(obj.BloomThreshold || 0.5),
      bloomScale:          Number(obj.BloomScale || 1.5),
      distortionScale:     Number(obj.DistortionScale || 20),
      particleImage:       String(obj.ParticleImage || ""),
      particleFade:        toNum(obj.ParticleFade, 5)
    };
  }

 
  const boatConf = parseVehicleGroup(p.BoatSettings);
  const shipConf = parseVehicleGroup(p.ShipSettings);
  const airConf  = parseVehicleGroup(p.AirshipSettings);

  function getVehConf(veh) {
    if (!veh) return null;
    if (veh.isBoat && veh.isBoat())     return boatConf;
    if (veh.isShip && veh.isShip())     return shipConf;
    if (veh.isAirship && veh.isAirship()) return airConf;
    return null;
  }


  if (!Game_Screen.prototype.isFading) {
    Game_Screen.prototype.isFading = function () { return this._fadeDuration > 0; };
  }
  Game_Screen.prototype.customFadeOutColor = null;
  const baseScrFadeOut = Game_Screen.prototype.fadeOutColor;
  Game_Screen.prototype.fadeOutColor = function () {
    return this.customFadeOutColor ? this.customFadeOutColor : baseScrFadeOut.call(this);
  };


  const _vehPlayBgm = Game_Vehicle.prototype.playBgm;
  Game_Vehicle.prototype.playBgm = function () {
    const c = getVehConf(this);
    if (!c) { _vehPlayBgm.call(this); return; }
    if (c.vehicleBgm && c.vehicleBgm.length > 0) {
      const bgm = c.vehicleBgm[Math.floor(Math.random() * c.vehicleBgm.length)];
      AudioManager.playBgm(bgm);
    } else {
      _vehPlayBgm.call(this);
    }
  };


  const _plGetOn = Game_Player.prototype.getOnVehicle;
  Game_Player.prototype.getOnVehicle = function (type) {
    const ok = _plGetOn.call(this, type);
    if (ok) {
      const v = this.vehicle();
      if (v.clearEphemeral) v.clearEphemeral();
      
      v._spriteRef = null;
      const c = getVehConf(v);
      if (c && c.enterSEName) {
        AudioManager.playSe({
          name:   c.enterSEName,
          volume: c.enterSEVolume,
          pitch:  c.enterSEPitch,
          pan:    c.enterSEPan
        });
      }
      if (v && c) {
        v.clearMotionFilters();
        v.applyMotionEffect(c);
      }
    }
    return ok;
  };

  const _plGetOff = Game_Player.prototype.getOffVehicle;
  Game_Player.prototype.getOffVehicle = function () {
    const wasIn = this.isInVehicle();
    const res = _plGetOff.call(this);
    if (wasIn && res) {
      const v = this.vehicle();
      const c = getVehConf(v);
      if (c && c.exitSEName) {
        AudioManager.playSe({
          name:   c.exitSEName,
          volume: c.exitSEVolume,
          pitch:  c.exitSEPitch,
          pan:    c.exitSEPan
        });
      }
      if (v) {
        v.clearMotionFilters();
        if (v.clearEphemeral) v.clearEphemeral();
      }
    }
    return res;
  };

 
  PluginManager.registerCommand(pluginName, "ReturnFromVehicleInterior", () => {
    const pl = $gamePlayer;
    if (!pl._vehicleInteriorReturn) return;
    const d = pl._vehicleInteriorReturn;
    pl.reserveTransfer(d.fromMapId, d.fromX, d.fromY, d.fromDirection, 0);
    $gameTemp._shouldReboardVehicle = true;
  });

  
  function forceDisembark(p) {
    const v = p.vehicle();
    if (!v) return;
    v._driving = false;
    if (p.isInAirship()) {
      p._vehicleType = "walk";
      p.setThrough(false);
      p.setMoveSpeed(4);
      p.setPosition(v.x, v.y);
      p.setDirection(v.direction());
      v.setLocation($gameMap.mapId(), v.x, v.y);
      $gameSystem.replayWalkingBgm();
    } else {
      p.setPosition(v.x, v.y);
      p.setDirection(v.direction());
      p._vehicleType = "walk";
      p.setThrough(false);
      p.setMoveSpeed(4);
      p.makeEncounterCount();
      v.setLocation($gameMap.mapId(), v.x, v.y);
      $gameSystem.replayWalkingBgm();
    }
    p.refresh();
  }

  
  Game_Player.prototype.storeInteriorReturnData = function () {
    if (!this.isInVehicle()) return;
    this._vehicleInteriorReturn = {
      fromMapId:     $gameMap.mapId(),
      fromX:         this.x,
      fromY:         this.y,
      fromDirection: this.direction(),
      vehicleType:   this._vehicleType
    };
  };

  function isInteriorMap(m) {
    return [boatConf.interiorMapId, shipConf.interiorMapId, airConf.interiorMapId].some(x => x > 0 && x === m);
  }

 
  const _plUpdate = Game_Player.prototype.update;
  Game_Player.prototype.update = function (sceneActive) {
    _plUpdate.call(this, sceneActive);
    if (this.isInVehicle() && Input.isTriggered("vehicleInteriorTransfer")) {
      const v = this.vehicle(), c = getVehConf(v);
      if (c && c.interiorMapId > 0) {
        this.storeInteriorReturnData();
        forceDisembark(this);
        if (toBool(p.InteriorTransitionEnabled)) {
          const col = String(p.InteriorTransitionColor || "black").toLowerCase().trim();
          $gameScreen.customFadeOutColor = (col === "white" ? [255, 255, 255, 255] : [0, 0, 0, 255]);
          $gameScreen.startFadeOut(toNum(p.InteriorTransitionDuration, 60));
          $gameTemp._interiorTransferRequest = {
            mapId:     c.interiorMapId,
            x:         c.interiorX,
            y:         c.interiorY,
            direction: 2,
            fadeType:  (col === "white" ? 1 : 0)
          };
          $gameTemp._pendingInteriorFadeIn = true;
        } else {
          this.reserveTransfer(c.interiorMapId, c.interiorX, c.interiorY, 2, 0);
        }
      }
    }
  };

  
  const _sceneMapUpdate = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _sceneMapUpdate.call(this);
    this.updateVehicleOverlay();
    if ($gameTemp._interiorTransferRequest && !$gameScreen.isFading()) {
      const r = $gameTemp._interiorTransferRequest;
      $gameTemp._interiorTransferRequest = null;
      $gamePlayer.reserveTransfer(r.mapId, r.x, r.y, r.direction, r.fadeType);
    }
  };

  const _sceneMapStart = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    _sceneMapStart.call(this);
    $gameScreen.customFadeOutColor = null;
    if ($gameTemp._shouldReboardVehicle) {
      $gameTemp._shouldReboardVehicle = false;
      const d = $gamePlayer._vehicleInteriorReturn;
      if (d) {
        $gamePlayer._vehicleType     = d.vehicleType;
        $gamePlayer._vehicleGettingOn = true;
        $gamePlayer._vehicleInteriorReturn = null;
      }
    }
    if (!$gamePlayer.isInVehicle() && isInteriorMap($gameMap.mapId())) {
      $gamePlayer.setTransparent(false);
    }
    if ($gameTemp._pendingInteriorFadeIn) {
      $gameScreen.startFadeIn(toNum(p.InteriorTransitionDuration, 60));
      $gameTemp._pendingInteriorFadeIn = false;
    }
  };


  function doFloat(veh, c) {
    const spr = veh.sprite();
    // If sprite is invalid, set skip counter to 180 frames and exit.
    if (!spr || !spr.parent || !spr.transform || spr._destroyed) {
      veh._skipFloatCounter = 180;
      return;
    }
    const f = Graphics.frameCount;
    if (veh.isBoat() || veh.isShip()) {
      spr.y += c.amplitude * Math.sin(f * c.frequency);
    } else if (veh.isAirship()) {
      spr.x += c.amplitude * Math.sin(f * c.frequency);
      spr.y += c.amplitude * Math.cos(f * c.frequency);
    }
    if (!veh._floatData) {
      veh._floatData = { val: 0, target: 0, timer: 0 };
    }
    veh._floatData.timer++;
    if (veh._floatData.timer >= c.randomFloatInterval) {
      veh._floatData.timer = 0;
      veh._floatData.target = (Math.random() * 2 - 1) * c.randomFloatRange;
    }
    veh._floatData.val += (veh._floatData.target - veh._floatData.val) * c.randomFloatApproach;
    spr.y += veh._floatData.val;
  }

  
  Game_Vehicle.prototype.applyMotionEffect = function (c) {
    const spr = this.sprite();
    if (!spr || !spr.parent || !spr.transform || spr._destroyed) {
      this._pendingMotionEffect = c;
      return;
    }
    if (!spr.filters) spr.filters = [];
    this.clearMotionFilters();
    // Motion Blur
    if (c.motionEffect === "motionBlur" && PIXI.filters && PIXI.filters.BlurFilter) {
      const blur = new PIXI.filters.BlurFilter();
      blur.blur = c.motionBlurStrength;
      spr.filters.push(blur);
    }
    // Bloom
    if (c.motionEffect === "bloom" && PIXI.filters && PIXI.filters.AdvancedBloomFilter) {
      const bloom = new PIXI.filters.AdvancedBloomFilter({
        threshold:  c.bloomThreshold,
        bloomScale: c.bloomScale,
        brightness: 1
      });
      spr.filters.push(bloom);
    }
    // Distortion
    if (c.motionEffect === "distortion" && PIXI.filters && PIXI.filters.DisplacementFilter) {
      this._distTex = PIXI.Sprite.from(PIXI.Texture.WHITE);
      this._distTex.width  = 256;
      this._distTex.height = 256;
      SceneManager._scene.addChild(this._distTex);
      this._distFilter = new PIXI.filters.DisplacementFilter(this._distTex, 0);
      this._distFilter.scale.set(c.distortionScale);
      spr.filters.push(this._distFilter);
    }
    // Particles
    if (c.motionEffect === "particles" && c.particleImage) {
      this._particleImg = ImageManager.loadSystem(c.particleImage);
      this._particleFade = c.particleFade;
      this._spawnParticles = true;
    }
    
    this._pendingMotionEffect = null;
  };

  Game_Vehicle.prototype.clearMotionFilters = function () {
    const spr = this.sprite();
    if (spr && spr.filters) {
      spr.filters = [];
    }
    if (this._distTex) {
      SceneManager._scene.removeChild(this._distTex);
      this._distTex = null;
      this._distFilter = null;
    }
    this._spawnParticles = false;
  };


  const _DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    const contents = _DataManager_makeSaveContents.call(this);
    if ($gameMap && $gameMap._vehicles) {
      $gameMap._vehicles.forEach(vehicle => {
        if (vehicle && typeof vehicle.clearEphemeral === "function") {
          vehicle.clearEphemeral();
        }
      });
    }
    return contents;
  };

  Game_Vehicle.prototype.clearEphemeral = function () {
    this._distTex           = null;
    this._distFilter        = null;
    this._particleContainer = null;
    this._particleImg       = null;
    this._pixiEffectConfig  = null;
    this._spriteRef         = null;
  };

 
  Game_Vehicle.prototype.sprite = function () {
    const spriteset = SceneManager._scene ? SceneManager._scene._spriteset : null;
    if (!spriteset) return null;
    const arr = spriteset._characterSprites || [];
    for (const s of arr) {
      if (s._character === this) {
        this._spriteRef = s;
        return s;
      }
    }
    this._spriteRef = null;
    return null;
  };


  const _vehUpdate = Game_Vehicle.prototype.update;
  Game_Vehicle.prototype.update = function () {
    _vehUpdate.call(this);
    const c = getVehConf(this);
    // Floating retry mechanism
    if (this._skipFloatCounter === undefined) {
      this._skipFloatCounter = 0;
    }
    if (this._skipFloatCounter > 0) {
      this._skipFloatCounter--;
    } else if (this.sprite() && c && (this._driving || (this.isAirship() && $gamePlayer.vehicle() === this))) {
      doFloat(this, c);
    }
    // Motion effect retry mechanism
    if (this._pendingMotionEffect) {
      if (this._skipMotionEffectCounter === undefined) {
        this._skipMotionEffectCounter = 180;
      }
      if (this._skipMotionEffectCounter > 0) {
        this._skipMotionEffectCounter--;
      }
      if (this._skipMotionEffectCounter <= 0) {
        const spr = this.sprite();
        if (spr && spr.parent && spr.transform && !spr._destroyed) {
          this.clearMotionFilters();
          this.applyMotionEffect(this._pendingMotionEffect);
          if (!this._pendingMotionEffect) {
            this._skipMotionEffectCounter = 0;
          } else {
            this._skipMotionEffectCounter = 180;
          }
        } else {
          this._skipMotionEffectCounter = 180;
        }
      }
    }
  };

 
  const _vehUpdateMove = Game_Vehicle.prototype.updateMove;
  Game_Vehicle.prototype.updateMove = function () {
    _vehUpdateMove.call(this);
    if (!this._spawnParticles || !this.sprite()) return;
    if (!(this._driving || (this.isAirship() && $gamePlayer.vehicle() === this))) return;
    if (!this._particleImg || !this._particleImg.isReady()) return;
    if (Graphics.frameCount % 6 !== 0) return;
    const parent = this.sprite().parent;
    if (!parent) return;
    const spr = new Sprite(this._particleImg);
    spr.x = this.sprite().x;
    spr.y = this.sprite().y;
    spr.anchor.set(0.5, 1);
    spr.alpha = 1;
    spr._fade = this._particleFade;
    const idx = parent.children.indexOf(this.sprite());
    parent.addChildAt(spr, idx);
    spr.update = () => {
      Sprite.prototype.update.call(spr);
      spr.alpha -= spr._fade / 255;
      if (spr.alpha <= 0 && spr.parent) spr.parent.removeChild(spr);
    };
  };

 
  const _sceneMapCreate = Scene_Map.prototype.createSpriteset;
  Scene_Map.prototype.createSpriteset = function () {
    _sceneMapCreate.call(this);
    this._vehicleOverlaySprite = null;
    this._overlayOffsetX = 0;
    this._overlayOffsetY = 0;
  };

  Scene_Map.prototype.updateVehicleOverlay = function () {
    if ($gamePlayer.isInVehicle()) {
      const veh = $gamePlayer.vehicle();
      const c = getVehConf(veh);
      if (c && c.overlayImage) {
        if (!this._vehicleOverlaySprite) {
          this._vehicleOverlaySprite = new Sprite(ImageManager.loadPicture(c.overlayImage));
          this._vehicleOverlaySprite.anchor.set(0.5);
          this.addChild(this._vehicleOverlaySprite);
        }
        if (this._vehicleOverlaySprite.bitmap && this._vehicleOverlaySprite.bitmap.isReady()) {
          const sx = Graphics.width / this._vehicleOverlaySprite.bitmap.width;
          const sy = Graphics.height / this._vehicleOverlaySprite.bitmap.height;
          this._vehicleOverlaySprite.scale.set(sx, sy);
        }
        this._overlayOffsetX += c.overlayScrollX;
        this._overlayOffsetY += c.overlayScrollY;
        this._vehicleOverlaySprite.x = (Graphics.width / 2) + this._overlayOffsetX;
        this._vehicleOverlaySprite.y = (Graphics.height / 2) + this._overlayOffsetY;
        this._vehicleOverlaySprite.opacity = c.overlayOpacity;
      } else if (this._vehicleOverlaySprite) {
        this.removeChild(this._vehicleOverlaySprite);
        this._vehicleOverlaySprite = null;
      }
    } else if (this._vehicleOverlaySprite) {
      this.removeChild(this._vehicleOverlaySprite);
      this._vehicleOverlaySprite = null;
    }
  };
})();
