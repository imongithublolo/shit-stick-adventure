/*:
 * @target MZ
 * @plugindesc Adds customizable lighting effects to events with various patterns and controls, featuring enhanced bloom effects for a more heavenly glow.
 * @author Psychronic
 * @url https://psychronic.itch.io
 *
 * @param lightBuffer
 * @type number
 * @min 0
 * @default 350
 * @text Light Buffer Size
 * @desc Buffer area in pixels around the screen where lights remain active.
 *
 * @param darknessGamma
 * @type number
 * @decimals 2
 * @min 0
 * @default 0.1
 * @text Darkness Gamma
 * @desc Gamma correction value for darkness. Values >1 make darkness stronger.
 *
 * @param Custom Light Types
 * @type struct<CustomLight>[]
 * @default []
 * @text Custom Light Types
 * @desc Define custom (possibly multi) light types with their parameters.
 *
 * @command TurnOnLight
 * @text Turn On Light
 * @desc Turns on the light with the specified ID.
 *
 * @arg lightId
 * @type number
 * @default 1
 * @text Light ID
 * @desc The unique ID of the light you wish to turn on.
 *
 * @command TurnOffLight
 * @text Turn Off Light
 * @desc Turns off the light with the specified ID.
 *
 * @arg lightId
 * @type number
 * @default 1
 * @text Light ID
 * @desc The unique ID of the light you wish to turn off.
 *
 * @command SetBeamTargetPlayer
 * @text Set Beam Target Player
 * @desc Make a beam light track the player.
 * @arg lightId
 * @type number
 * @default 1
 * @text Light ID
 *
 * @command SetBeamTargetEvent
 * @text Set Beam Target Event
 * @desc Make a beam light track a specific event on the map.
 * @arg lightId
 * @type number
 * @default 1
 * @text Light ID
 *
 * @arg eventId
 * @type number
 * @default 1
 * @text Event ID
 * @desc The ID of the event to track.
 *
 * @command ClearBeamTarget
 * @text Clear Beam Target
 * @desc Removes any tracking from the specified beam light.
 * @arg lightId
 * @type number
 * @default 1
 * @text Light ID
 *
 *
 * @command SetFlashlightTargetPlayer
 * @text Set Flashlight Target Player
 * @desc Make a flashlight light track the player.
 * @arg lightId
 * @type number
 * @default 1
 * @text Light ID
 *
 * @command SetFlashlightTargetEvent
 * @text Set Flashlight Target Event
 * @desc Make a flashlight light track a specific event on the map.
 * @arg lightId
 * @type number
 * @default 1
 * @text Light ID
 *
 * @arg eventId
 * @type number
 * @default 1
 * @text Event ID
 *
 * @command ClearFlashlightTarget
 * @text Clear Flashlight Target
 * @desc Removes any tracking from the specified flashlight light.
 * @arg lightId
 * @type number
 * @default 1
 * @text Light ID
 *
 * @help
 * Adds tracking commands for beam and now flashlight lights:
 * - SetBeamTargetPlayer [lightId]
 * - SetBeamTargetEvent [lightId] [eventId]
 * - ClearBeamTarget [lightId]
 *
 * And for flashlights:
 * - SetFlashlightTargetPlayer [lightId]
 * - SetFlashlightTargetEvent [lightId] [eventId]
 * - ClearFlashlightTarget [lightId]
 *
 * If a flashlight is tracking a target, it will ignore its default facing direction
 * and continuously rotate to point directly at the target (player or event).
 *
 * @help PSYCHRONIC_RaveLighting.js
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * PSYCHRONIC_RaveLighting.js allows you to add dynamic and customizable
 * lighting effects to events within your RPG Maker MZ game. With support for
 * various light types and patterns, along with the ability to define custom
 * light behaviors, you can create immersive environments and atmospheres.
 *
 * ============================================================================
 * Event Note Syntax
 * ============================================================================
 *
 * To add a lighting effect to an event, use the following syntax in the event's
 * note box:
 *
 * [lightType] [required parameters] [optional parameters] [ID]
 *
 * - lightType: The type of light effect (`light`, `pulsate`, `flicker`, `flashlight`, `phase`, `fire`, `beam`, or any custom type).
 * - required parameters: Specific parameters required by the light type.
 * - optional parameters: Additional parameters that modify the light's behavior.
 * - ID: A unique identifier for the light.
 *
 * Example:
 *
 * phase 300 20 #0000FF #FF0000 1
 *
 * This creates a `phase` light with:
 * - Radius: 300
 * - Speed: 20 frames per color transition
 * - Colors: from blue (#0000FF) to red (#FF0000)
 * - ID: 1
 *
 * You can also optionally include `offsetX` and `offsetY` before the ID:
 *
 * phase 300 20 #0000FF #FF0000 100 50 1
 *
 * This would position the light 100 pixels horizontally and 50 pixels vertically
 * offset from the event's position.
 *
 * If `offsetX` and `offsetY` are not provided, they default to (0,0).
 *
 * ============================================================================
 * Custom Light Types
 * ============================================================================
 *
 * You can define custom light types in the plugin parameters. Each custom type
 * inherits from a base type and allows default parameters to be specified.
 *
 * Example:
 *
 * {
 *   "Name": "Siren",
 *   "Base Type": "phase",
 *   "Parameters": "300 20 #0000FF #FF0000"
 * }
 *
 * Usage in event:
 *
 * Siren 1
 *
 * This applies a custom `Siren` light (based on `phase`) with ID `1`.
 *
 * ============================================================================
 * Light Types and Their Parameters
 * ============================================================================
 *
 * - light:
 *   - Syntax: `light [radius] [colorCode] [offsetX] [offsetY] [ID]`
 *     If offsetX and offsetY are not provided, the syntax can be: 
 *     `light [radius] [colorCode] [ID]` 
 *   - Parameters:
 *     - radius: Radius in pixels
 *     - colorCode: Hex color (e.g., #FFFFFF)
 *     - offsetX (optional): Horizontal offset in pixels, defaults to 0 if not provided
 *     - offsetY (optional): Vertical offset in pixels, defaults to 0 if not provided
 *     - ID: Unique identifier
 *
 * - pulsate:
 *   - Syntax: `pulsate [colorCode] [pulsateSpeed] [minRadius] [maxRadius] [offsetX] [offsetY] [ID]`
 *   - Parameters:
 *     - colorCode: Hex color
 *     - pulsateSpeed: Speed of pulsation
 *     - minRadius: Minimum Radius
 *     - maxRadius: Maximum Radius
 *     - offsetX (optional): Horizontal offset in pixels, defaults to 0 if not provided
 *     - offsetY (optional): Vertical offset in pixels, defaults to 0 if not provided
 *     - ID: Unique identifier
 *
 * - flicker:
 *   - Syntax: `flicker [radius] [colorCode] [flickerInterval] [offsetX] [offsetY] [ID]`
 *   - Parameters:
 *     - radius: Radius of the light
 *     - colorCode: Hex color
 *     - flickerInterval: Frames between flickers
 *     - offsetX (optional): Horizontal offset, default 0 if not provided
 *     - offsetY (optional): Vertical offset, default 0 if not provided
 *     - ID: Unique identifier
 *
 * - flashlight:
 *   - Syntax: `flashlight [coneWidthSquares] [coneLengthSquares] [colorCode] [offsetX] [offsetY] [ID]`
 *   - Parameters:
 *     - coneWidthSquares: Width of cone in squares
 *     - coneLengthSquares: Length of cone in squares
 *     - colorCode: Hex color
 *     - offsetX: (optional) Horizontal offset, default 0 if not provided
 *     - offsetY: (optional) Vertical offset, default 24 if not provided
 *     - ID: Unique identifier
 *
 * - phase:
 *   - Syntax: `phase [radius] [speed] [colorCode1] [colorCode2] ... [colorCodeN] [offsetX] [offsetY] [ID]`
 *   - Parameters:
 *     - radius: Radius of the light
 *     - speed: Speed of color transition in frames
 *     - colorCode1...N: Hex colors for the transition
 *     - offsetX: (optional) Horizontal offset in pixels, defaults to 0
 *     - offsetY: (optional) Vertical offset in pixels, defaults to 0
 *     - ID: Unique identifier
 *
 *   If no offsets are provided, the syntax can omit them:
 *   `phase [radius] [speed] [colors...] [ID]`
 *
 * - fire:
 *   - Syntax: `fire [radius] [colorCode] [flickerSpeed] [minAlpha] [maxAlpha] [offsetX] [offsetY] [ID]`
 *   - Parameters:
 *     - radius: Radius of the fire light
 *     - colorCode: Hex color
 *     - flickerSpeed: Speed of flickering
 *     - minAlpha: Minimum opacity
 *     - maxAlpha: Maximum opacity
 *     - offsetX: (optional) Horizontal offset in pixels, defaults to 0
 *     - offsetY: (optional) Vertical offset in pixels, defaults to 0
 *     - ID: Unique identifier
 *
 * - beam:
 *   - Syntax: `beam [width] [length] [opacity] [speed] [numberOfBeams] [spinRate] [colors...] [offsetX] [offsetY] [ID]`
 *   - Parameters:
 *     - width: Width in pixels
 *     - length: Length in pixels
 *     - opacity: Opacity (0.0 to 1.0)
 *     - speed: Color transition speed; 0 for no transition
 *     - numberOfBeams: Number of beams
 *     - spinRate: Degrees per frame to rotate. 0 or omit for normal directional beam.
 *     - colorCode1...N: Hex colors
 *     - offsetX: (optional) Horizontal offset in pixels, defaults to 0
 *     - offsetY: (optional) Vertical offset in pixels, defaults to 0
 *     - ID: Unique identifier
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * - TurnOnLight [ID]: Turns on the light with specified ID.
 * - TurnOffLight [ID]: Turns off the light with specified ID.
 *
 * ============================================================================
 * Usage Examples
 * ============================================================================
 *
 * 1. Standard Light:
 *    `light 300 #FFFFFF 1`
 *
 * 2. Pulsating Light:
 *    `pulsate #FF0000 0.5 250 350 2`
 *
 * 3. Phase Light with Offsets:
 *    `phase 300 20 #0000FF #FF0000 100 50 1`
 *    This creates a phase light with a 300px radius, speed 20, colors blue to red,
 *    horizontally offset by 100 and vertically by 50, and ID 1.
 *
 * 4. Beam Light with rotation and Offsets:
 *    `beam 50 200 1.0 0 3 2 #FFFFFF #FF0000 #00FF00 0 0 1`
 *
 * ============================================================================
 * Notes
 * ============================================================================
 *
 * Ensure unique IDs for each light to avoid conflicts.
 * Adjust `lightBuffer` and `darknessGamma` in the plugin parameters to fine-tune.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.1.0:
 * - Added support for Custom Light Types.
 * - Enhanced documentation.
 *
 * Version 1.0.0:
 * - Initial release.
 *
 */

/*~struct~CustomLight:
 * @param Name
 * @type text
 * @desc The name of the custom light type.
 *
 * @param Lights
 * @type struct<SubLight>[]
 * @default []
 * @desc If you want multiple sub-lights combined, define them here. If empty, Base Type/Parameters are used.
 */

/*~struct~SubLight:
 * @param Base Type
 * @type select
 * @option light
 * @option pulsate
 * @option flicker
 * @option flashlight
 * @option phase
 * @option fire
 * @option beam
 * @desc The base light type of this sub-light.
 *
 * @param Parameters
 * @type text
 * @desc The parameters string for this sub-light. Same format as normal light definitions.
 */



var PsychronicRaveLighting = PsychronicRaveLighting || {};
PsychronicRaveLighting.parameters = PluginManager.parameters('PSYCHRONIC_RaveLighting');

const lightBuffer = Number(PsychronicRaveLighting.parameters['lightBuffer'] || 350);
const darknessGamma = Number(PsychronicRaveLighting.parameters['darknessGamma'] || 0.1);

PsychronicRaveLighting._beamSpriteStorage = new WeakMap();

PsychronicRaveLighting.customLightTypes = {};
(function() {
    const customLightTypesRaw = JSON.parse(PsychronicRaveLighting.parameters['Custom Light Types'] || '[]');
    const validBaseTypes = ['light', 'pulsate', 'flicker', 'flashlight', 'phase', 'fire', 'beam'];

    customLightTypesRaw.forEach(raw => {
        try {
            const customLight = JSON.parse(raw);
            const name = (customLight['Name'] || '').trim().toLowerCase();
            let subLights = [];
            if (customLight['Lights']) {
                const subLightsRaw = JSON.parse(customLight['Lights']);
                subLightsRaw.forEach(subRaw => {
                    const sl = JSON.parse(subRaw);
                    const stype = (sl['Base Type'] || '').toLowerCase().trim();
                    const sparams = (sl['Parameters'] || '').trim();
                    if (stype && validBaseTypes.includes(stype)) {
                        subLights.push({ baseType: stype, parameters: sparams });
                    }
                });
            }

            if (name && subLights.length > 0) {
                PsychronicRaveLighting.customLightTypes[name] = subLights;
            }

        } catch (e) {
            console.warn(`PSYCHRONIC_RaveLighting: Error parsing custom light type: ${e}`);
        }
    });
})();

PsychronicRaveLighting._flickerPatterns = [
    0.25, 0.35, 0.20, 0.40, 0.30, 0.45, 0.15, 0.38, 0.28, 0.33,
    0.22, 0.37, 0.18, 0.42, 0.32, 0.24, 0.17, 0.40, 0.27, 0.35,
    0.19, 0.34, 0.23, 0.39, 0.29, 0.31, 0.16, 0.36, 0.26, 0.31
];

PluginManager.registerCommand('PSYCHRONIC_RaveLighting', 'TurnOnLight', args => {
    const lightId = Number(args.lightId);
    $gameSystem.turnOnLight(lightId);
});

PluginManager.registerCommand('PSYCHRONIC_RaveLighting', 'TurnOffLight', args => {
    const lightId = Number(args.lightId);
    $gameSystem.turnOffLight(lightId);
});

// Beam tracking commands (already implemented)
PluginManager.registerCommand('PSYCHRONIC_RaveLighting', 'SetBeamTargetPlayer', args => {
    const lightId = Number(args.lightId);
    $gameSystem.setBeamTracking(lightId, 'player', null);
});

PluginManager.registerCommand('PSYCHRONIC_RaveLighting', 'SetBeamTargetEvent', args => {
    const lightId = Number(args.lightId);
    const eventId = Number(args.eventId);
    $gameSystem.setBeamTracking(lightId, 'event', eventId);
});

PluginManager.registerCommand('PSYCHRONIC_RaveLighting', 'ClearBeamTarget', args => {
    const lightId = Number(args.lightId);
    $gameSystem.setBeamTracking(lightId, 'none', null);
});

// New Commands for flashlight tracking
PluginManager.registerCommand('PSYCHRONIC_RaveLighting', 'SetFlashlightTargetPlayer', args => {
    const lightId = Number(args.lightId);
    $gameSystem.setFlashlightTracking(lightId, 'player', null);
});

PluginManager.registerCommand('PSYCHRONIC_RaveLighting', 'SetFlashlightTargetEvent', args => {
    const lightId = Number(args.lightId);
    const eventId = Number(args.eventId);
    $gameSystem.setFlashlightTracking(lightId, 'event', eventId);
});

PluginManager.registerCommand('PSYCHRONIC_RaveLighting', 'ClearFlashlightTarget', args => {
    const lightId = Number(args.lightId);
    $gameSystem.setFlashlightTracking(lightId, 'none', null);
});

(function(){
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._activeLights = {};
        this._beamTracking = {};
        this._flashlightTracking = {};
    };

    Game_System.prototype.turnOnLight = function(lightId) {
        this._activeLights[lightId] = true;
    };

Game_System.prototype.turnOffLight = function(lightId) {
    // Mark it off
    this._activeLights[lightId] = false;

    // If you want to remove the beam from rendering ASAP:
    const spriteset = SceneManager._scene && SceneManager._scene._spriteset;
    if (!spriteset) return;

    // Loop through all events
    for (const ev of $gameMap.events()) {
        if (!ev._lights) continue;
        for (const cfg of ev._lights) {
            if (cfg._lightId === lightId && cfg._lightType === 'beam') {
                // Retrieve from WeakMap
                const beamSprites = PsychronicRaveLighting._beamSpriteStorage.get(cfg);
                if (!beamSprites) continue;
                // Hide / remove
                for (const spr of beamSprites) {
                    spr.visible = false;
                    if (spr.parent === spriteset._lightContainer) {
                        spriteset._lightContainer.removeChild(spr);
                    }
                }
            }
        }
    }
};


    Game_System.prototype.isLightOn = function(lightId) {
        return this._activeLights[lightId] !== false;
    };

    Game_System.prototype.setBeamTracking = function(lightId, trackType, trackId) {
        if (!this._beamTracking) this._beamTracking = {};
        this._beamTracking[lightId] = {type: trackType, id: trackId};
    };

    Game_System.prototype.getBeamTracking = function(lightId) {
        if (!this._beamTracking) this._beamTracking = {};
        return this._beamTracking[lightId] || {type:'none', id:null};
    };

    // Flashlight tracking similar to beam
    Game_System.prototype.setFlashlightTracking = function(lightId, trackType, trackId) {
        if (!this._flashlightTracking) this._flashlightTracking = {};
        this._flashlightTracking[lightId] = {type: trackType, id: trackId};
    };

    Game_System.prototype.getFlashlightTracking = function(lightId) {
        if (!this._flashlightTracking) this._flashlightTracking = {};
        return this._flashlightTracking[lightId] || {type:'none', id:null};
    };
})();

(function() {
    const _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        _Game_Event_setupPage.call(this);
        this.extractLightData();
    };

    Game_Event.prototype.extractLightData = function() {
        this._lights = [];
        const note = this.event().note.trim();
        if (!note) return;
        const tokens = note.split(/\s+/);
        if (tokens.length < 2) return;

        let typeName = tokens[0].toLowerCase();
        const remainder = tokens.slice(1);

        let subLightsDef = PsychronicRaveLighting.customLightTypes[typeName];
        if (!subLightsDef) {
            subLightsDef = [{ baseType: typeName, parameters: remainder.join(' ') }];
        }

        for (let i = 0; i < subLightsDef.length; i++) {
            const def = subLightsDef[i];
            const baseType = def.baseType;
            const params = def.parameters.trim();
            const combinedTokens = [baseType, ...params.split(/\s+/), ...remainder];
            const config = this.parseLightTokens(combinedTokens);
            if (config) this._lights.push(config);
        }
    };

Game_Event.prototype.parseLightTokens = function(tokens) {
    const t = tokens[0];
    const config = {
        _lightType: t,
        _lightRadius: 0,
        _lightColor: '',
        _lightId: 1, // default ID to 1 if not found
        _coneWidthSquares: 0,
        _coneLengthSquares: 0,
        _coneWidthPx: 0,
        _coneLengthPx: 0,
        _phaseColors: [],
        _phaseSpeed: 60,
        _phaseCurrentIndex: 0,
        _phaseTransitionProgress: 0,
        _flickerInterval: 120,
        _pulsateSpeed: 0.5,
        _pulsateMinRadius: 250,
        _pulsateMaxRadius: 350,
        _pulsateOffsetX: 0,
        _pulsateOffsetY: 0,
        _offsetX: 0,
        _offsetY: 0,
        _fireFlickerSpeed: 2,
        _fireMinAlpha: 0.3,
        _fireMaxAlpha: 0.6,
        _fireOffsetX: 0,
        _fireOffsetY: 0,
        _beamWidth: 0,
        _beamLength: 0,
        _beamOpacity: 1.0,
        _beamSpeed: 0,
        _beamNumberOfBeams: 1,
        _beamColors: [],
        _beamOffsetX: 0,
        _beamOffsetY: 0,
        _beamSpinRate: 0,
        _beamSpinRadians: 0,
        _lightOffsetX: 0,
        _lightOffsetY: 0
    };

    // A helper function to safely parse offsets and ID from the end of the tokens.
    function parseOffsetsAndId(tokens, startIndex, config, offsetXKey, offsetYKey, idKey) {
        // We assume the ID is always at the end if present.
        // We'll try to parse from the end backwards to find ID, offsetY, offsetX in that order.
        let endIndex = tokens.length - 1;
        let parsedCount = 0;
        let potentialId, potentialOffsetY, potentialOffsetX;

        // Potential ID
        if (endIndex >= startIndex) {
            let val = Number(tokens[endIndex]);
            if (!isNaN(val)) {
                potentialId = val;
                endIndex--;
                parsedCount++;
            }
        }

        // Potential offsetY
        if (endIndex >= startIndex) {
            let val = Number(tokens[endIndex]);
            if (!isNaN(val)) {
                potentialOffsetY = val;
                endIndex--;
                parsedCount++;
            }
        }

        // Potential offsetX
        if (endIndex >= startIndex) {
            let val = Number(tokens[endIndex]);
            if (!isNaN(val)) {
                potentialOffsetX = val;
                endIndex--;
                parsedCount++;
            }
        }

        // Assign defaults if not found
        if (idKey && potentialId != null) {
            config[idKey] = potentialId;
        }
        if (offsetXKey && potentialOffsetX != null) {
            config[offsetXKey] = potentialOffsetX;
        }
        if (offsetYKey && potentialOffsetY != null) {
            config[offsetYKey] = potentialOffsetY;
        }

        return {endIndex, parsedCount};
    }

    // We'll use a switch here for clarity, after this parsing logic is done:
    switch (t) {
        case 'beam':
            if (tokens.length >= 7) {
                config._beamWidth = Number(tokens[1]) || 50;
                config._beamLength = Number(tokens[2]) || 200;
                config._beamOpacity = Number(tokens[3]) || 1.0;
                config._beamSpeed = Number(tokens[4]) || 0;
                config._beamNumberOfBeams = Number(tokens[5]) || 1;
                let indexAfterBasics = 6;

                let potentialSpin = Number(tokens[indexAfterBasics]);
                if (!isNaN(potentialSpin) && !/^#[0-9A-Fa-f]{6}$/.test(tokens[indexAfterBasics])) {
                    config._beamSpinRate = potentialSpin;
                    indexAfterBasics++;
                }

                let colorStartIndex = indexAfterBasics;
                // We'll parse offsets and ID from the end:
                let {endIndex} = parseOffsetsAndId(tokens, colorStartIndex, config, '_beamOffsetX', '_beamOffsetY', '_lightId');

                // Now parse colors between indexAfterBasics and endIndex
                for (let i = colorStartIndex; i <= endIndex; i++) {
                    if (/^#[0-9A-Fa-f]{6}$/.test(tokens[i])) {
                        config._beamColors.push(tokens[i]);
                    }
                }

                if (config._beamColors.length === 0) {
                    config._beamColors.push('#FFFFFF');
                }
            } else {
                // defaults if insufficient tokens
                config._beamWidth = 50;
                config._beamLength = 200;
                config._beamOpacity = 1.0;
                config._beamSpeed = 0;
                config._beamNumberOfBeams = 1;
                config._beamColors = ['#FFFFFF'];
                config._beamOffsetX = 0;
                config._beamOffsetY = 0;
                config._lightId = 1;
                config._beamSpinRate = 0;
            }
            break;

        case 'flashlight':
            if (tokens.length >= 4) {
                config._coneWidthSquares = Number(tokens[1]) || 8;
                config._coneLengthSquares = Number(tokens[2]) || 12;
                config._lightColor = /^#[0-9A-Fa-f]{6}$/.test(tokens[3]) ? tokens[3] : '#FFFFFF';

                // Attempt to parse offsets and ID
                if (tokens.length > 4) {
                    // If more tokens given:
                    let startIndex = 4;
                    let {endIndex, parsedCount} = parseOffsetsAndId(tokens, startIndex, config, '_offsetX', '_offsetY', '_lightId');
                    // If no offsets found, they remain 0
                    // If no ID found, remains 1
                } else {
                    // no additional tokens, defaults remain
                }

                if (isNaN(config._offsetX)) config._offsetX = 0;
                if (isNaN(config._offsetY)) config._offsetY = 24;
                config._coneWidthPx = config._coneWidthSquares * 48;
                config._coneLengthPx = config._coneLengthSquares * 48;
            } else {
                config._coneWidthSquares = 8;
                config._coneLengthSquares = 12;
                config._lightColor = '#FFFFFF';
                config._lightId = 1;
                config._offsetX = 0;
                config._offsetY = 24;
                config._coneWidthPx = 8*48;
                config._coneLengthPx = 12*48;
            }
            break;

        case 'phase':
            if (tokens.length >= 5) {
                config._lightRadius = Number(tokens[1]) || 300;
                config._phaseSpeed = Number(tokens[2]) || 60;

                // Try to parse offsets and ID
                // The ID is last, potentially offsets before it:
                let potentialIdIndex = tokens.length - 1;
                let potentialOffsetYIndex = tokens.length - 2;
                let potentialOffsetXIndex = tokens.length - 3;

                let potentialId = Number(tokens[potentialIdIndex]);
                let potentialOffsetY = Number(tokens[potentialOffsetYIndex]);
                let potentialOffsetX = Number(tokens[potentialOffsetXIndex]);

                let hasOffsets = (!isNaN(potentialOffsetX) && !isNaN(potentialOffsetY) && !isNaN(potentialId));

                let colorEndIndex;
                if (hasOffsets) {
                    config._offsetX = potentialOffsetX;
                    config._offsetY = potentialOffsetY;
                    config._lightId = potentialId;
                    colorEndIndex = tokens.length - 3;
                } else {
                    config._offsetX = 0;
                    config._offsetY = 0;
                    config._lightId = isNaN(potentialId) ? 1 : potentialId;
                    colorEndIndex = tokens.length - 1;
                }

                for (let i = 3; i < colorEndIndex; i++) {
                    if (/^#[0-9A-Fa-f]{6}$/.test(tokens[i])) {
                        config._phaseColors.push(tokens[i]);
                    }
                }

                if (config._phaseColors.length < 2) {
                    config._phaseColors = ['#FFFFFF','#FFFFFF'];
                }
            } else {
                config._lightRadius = 300;
                config._phaseSpeed = 60;
                config._phaseColors = ['#FFFFFF','#FFFFFF'];
                config._lightId = 1;
                config._offsetX = 0;
                config._offsetY = 0;
            }
            break;

        case 'pulsate':
            if (tokens.length >= 6) {
                config._lightColor = /^#[0-9A-Fa-f]{6}$/.test(tokens[1]) ? tokens[1] : '#FFFFFF';
                config._pulsateSpeed = Number(tokens[2]) || 0.5;
                config._pulsateMinRadius = Number(tokens[3]) || 250;
                config._pulsateMaxRadius = Number(tokens[4]) || 350;

                let remaining = tokens.slice(5);
                // Try parsing offsets and ID from remaining
                let potentialId = Number(remaining[remaining.length-1]);
                let potentialOffsetY = Number(remaining[remaining.length-2]);
                let potentialOffsetX = Number(remaining[remaining.length-3]);

                if (!isNaN(potentialOffsetX) && !isNaN(potentialOffsetY) && !isNaN(potentialId) && remaining.length >= 3) {
                    config._pulsateOffsetX = potentialOffsetX;
                    config._pulsateOffsetY = potentialOffsetY;
                    config._lightId = potentialId;
                } else {
                    // no proper offsets found, default to 0 and ID from last token if numeric
                    config._pulsateOffsetX = 0;
                    config._pulsateOffsetY = 0;

                    if (!isNaN(potentialId)) {
                        config._lightId = potentialId;
                    } else {
                        config._lightId = 1;
                    }
                }
            } else {
                config._lightColor = '#FFFFFF';
                config._pulsateSpeed = 0.5;
                config._pulsateMinRadius = 250;
                config._pulsateMaxRadius = 350;
                config._pulsateOffsetX = 0;
                config._pulsateOffsetY = 0;
                config._lightId = 1;
            }
            break;

        case 'light':
            if (tokens.length >= 4) {
                config._lightRadius = Number(tokens[1]) || 300;
                config._lightColor = /^#[0-9A-Fa-f]{6}$/.test(tokens[2]) ? tokens[2] : '#FFFFFF';

                let potentialId = Number(tokens[tokens.length - 1]);
                let potentialOffsetY = Number(tokens[tokens.length - 2]);
                let potentialOffsetX = Number(tokens[tokens.length - 3]);

                if (!isNaN(potentialOffsetX) && !isNaN(potentialOffsetY) && !isNaN(potentialId) && tokens.length >= 5) {
                    config._lightOffsetX = potentialOffsetX;
                    config._lightOffsetY = potentialOffsetY;
                    config._lightId = potentialId;
                } else {
                    config._lightOffsetX = 0;
                    config._lightOffsetY = 0;
                    if (!isNaN(potentialId)) {
                        config._lightId = potentialId;
                    } else {
                        config._lightId = 1;
                    }
                }
            } else {
                config._lightRadius = 300;
                config._lightColor = '#FFFFFF';
                config._lightOffsetX = 0;
                config._lightOffsetY = 0;
                config._lightId = 1;
            }
            break;

        case 'flicker':
            if (tokens.length >= 5) {
                config._lightRadius = Number(tokens[1]) || 300;
                config._lightColor = /^#[0-9A-Fa-f]{6}$/.test(tokens[2]) ? tokens[2] : '#FFFFFF';
                config._flickerInterval = Number(tokens[3]) || 120;

                let remaining = tokens.slice(4);
                let potentialId = Number(remaining[remaining.length - 1]);
                let potentialOffsetY = Number(remaining[remaining.length - 2]);
                let potentialOffsetX = Number(remaining[remaining.length - 3]);

                if (!isNaN(potentialOffsetX) && !isNaN(potentialOffsetY) && !isNaN(potentialId) && remaining.length >= 3) {
                    config._flickerOffsetX = potentialOffsetX;
                    config._flickerOffsetY = potentialOffsetY;
                    config._lightId = potentialId;
                } else {
                    config._flickerOffsetX = 0;
                    config._flickerOffsetY = 0;
                    if (!isNaN(potentialId)) {
                        config._lightId = potentialId;
                    } else {
                        config._lightId = 1;
                    }
                }
            } else {
                config._lightRadius = 300;
                config._lightColor = '#FFFFFF';
                config._flickerInterval = 120;
                config._flickerOffsetX = 0;
                config._flickerOffsetY = 0;
                config._lightId = 1;
            }
            break;

        case 'fire':
            if (tokens.length >= 3) {
                config._lightRadius = parseFloat(tokens[1]);
                if (isNaN(config._lightRadius) || config._lightRadius <= 0) config._lightRadius = 300;
                config._lightColor = /^#[0-9A-Fa-f]{6}$/.test(tokens[2]) ? tokens[2] : '#FF6600';
                if (tokens.length >= 4) {
                    config._fireFlickerSpeed = parseFloat(tokens[3]);
                    if (isNaN(config._fireFlickerSpeed) || config._fireFlickerSpeed <= 0) config._fireFlickerSpeed = 2;
                } else {
                    config._fireFlickerSpeed = 2;
                }
                if (tokens.length >= 5) {
                    config._fireMinAlpha = parseFloat(tokens[4]);
                    if (isNaN(config._fireMinAlpha) || config._fireMinAlpha < 0 || config._fireMinAlpha > 1) config._fireMinAlpha = 0.5;
                } else {
                    config._fireMinAlpha = 0.5;
                }
                if (tokens.length >= 6) {
                    config._fireMaxAlpha = parseFloat(tokens[5]);
                    if (isNaN(config._fireMaxAlpha) || config._fireMaxAlpha < config._fireMinAlpha || config._fireMaxAlpha > 1) config._fireMaxAlpha = 0.9;
                } else {
                    config._fireMaxAlpha = 0.9;
                }

                let offsetIndex = 6;
                let neededTokens = tokens.length - offsetIndex;
                if (neededTokens >= 3) {
                    let offsetX = parseFloat(tokens[offsetIndex]);
                    let offsetY = parseFloat(tokens[offsetIndex+1]);
                    let idVal = parseInt(tokens[offsetIndex+2],10);
                    if (isNaN(idVal) || idVal <= 0) idVal = 1;
                    config._fireOffsetX = isNaN(offsetX)?0:offsetX;
                    config._fireOffsetY = isNaN(offsetY)?0:offsetY;
                    config._lightId = idVal;
                } else if (neededTokens === 2) {
                    let offsetX = parseFloat(tokens[offsetIndex]);
                    let offsetY = parseFloat(tokens[offsetIndex+1]);
                    config._fireOffsetX = isNaN(offsetX)?0:offsetX;
                    config._fireOffsetY = isNaN(offsetY)?0:offsetY;
                    config._lightId = 1;
                } else if (neededTokens === 1) {
                    let idVal = parseInt(tokens[offsetIndex],10);
                    if (isNaN(idVal) || idVal <= 0) idVal = 1;
                    config._fireOffsetX = 0;
                    config._fireOffsetY = 0;
                    config._lightId = idVal;
                } else {
                    config._fireOffsetX = 0;
                    config._fireOffsetY = 0;
                    config._lightId = 1;
                }
            } else {
                config._lightRadius = 300;
                config._lightColor = '#FF6600';
                config._fireFlickerSpeed = 2;
                config._fireMinAlpha = 0.5;
                config._fireMaxAlpha = 0.9;
                config._fireOffsetX = 0;
                config._fireOffsetY = 0;
                config._lightId = 1;
            }
            break;

        default:
            // Unknown type
            return null;
    }

    // Final sanity check: ensure offsets are numbers and not NaN
    // We'll just force any NaN offset to 0 here
    const offsetFields = ['_offsetX','_offsetY','_pulsateOffsetX','_pulsateOffsetY','_flickerOffsetX','_flickerOffsetY','_fireOffsetX','_fireOffsetY','_beamOffsetX','_beamOffsetY','_lightOffsetX','_lightOffsetY'];
    for (let field of offsetFields) {
        if (isNaN(config[field])) {
            config[field] = 0;
        }
    }

    if (isNaN(config._lightId) || config._lightId <= 0) {
        config._lightId = 1;
    }

    return config;
};
})();

(function() {
    const _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        _Sprite_Character_update.call(this);
        if (SceneManager._scene instanceof Scene_Map) {
            this.updateLights();
        }
    };

    Sprite_Character.prototype.updateLights = function() {
        const event = this._character;
        if (!(event instanceof Game_Event)) return;

        const lights = event._lights || [];
        if (lights.length === 0) {
            this.hideAllLights();
            return;
        }

        const anyOn = lights.some(cfg => $gameSystem.isLightOn(cfg._lightId));
        if (!anyOn) {
            this.hideAllLights();
            return;
        }

        if (!this._multiLightSprites) {
            this._multiLightSprites = [];
        }

        const beamLights = lights.filter(l => l._lightType === 'beam' && $gameSystem.isLightOn(l._lightId));
        const normalLights = lights.filter(l => l._lightType !== 'beam' && $gameSystem.isLightOn(l._lightId));

        const normalCount = normalLights.length;
        while (this._multiLightSprites.length < normalCount) {
            const spr = new Sprite();
            spr.anchor.set(0.5,0.5);
            spr.blendMode = PIXI.BLEND_MODES.ADD;
            spr.visible = false;
            if (SceneManager._scene && SceneManager._scene._spriteset && SceneManager._scene._spriteset._lightContainer) {
                SceneManager._scene._spriteset._lightContainer.addChild(spr);
            }
            this._multiLightSprites.push(spr);
        }
        for (let i = normalCount; i < this._multiLightSprites.length; i++) {
            this._multiLightSprites[i].visible = false;
        }

        for (let i = 0; i < normalCount; i++) {
            const cfg = normalLights[i];
            const spr = this._multiLightSprites[i];
            this.updateSingleLightSprite(spr, cfg);
        }

        for (const cfg of lights) {
            if (cfg._lightType === 'beam' && (!$gameSystem.isLightOn(cfg._lightId) || beamLights.indexOf(cfg)===-1)) {
                if (cfg._beamSprites) {
                    for (const bs of cfg._beamSprites) {
                        bs.visible = false;
                    }
                }
            }
        }

        for (const cfg of beamLights) {
            this.updateBeamLight(cfg);
        }
    };

    Sprite_Character.prototype.hideAllLights = function() {
        if (this._multiLightSprites) {
            for (const spr of this._multiLightSprites) {
                spr.visible = false;
            }
        }
        const event = this._character;
        if (event && event._lights) {
            for (const cfg of event._lights) {
                if (cfg._beamSprites) {
                    for (const bs of cfg._beamSprites) {
                        bs.visible = false;
                    }
                }
            }
        }
    };

    Sprite_Character.prototype.updateSingleLightSprite = function(sprite, cfg) {
        const event = this._character;
        const sx = this.x;
        const sy = this.y;

        let radius = cfg._lightRadius || 300;
        if (cfg._lightType === 'flashlight') {
            radius = Math.max(cfg._coneWidthPx, cfg._coneLengthPx);
        } else if (cfg._lightType === 'beam') {
            return;
        } else if (cfg._lightType === 'pulsate') {
            radius = Math.max(cfg._pulsateMaxRadius, radius);
        }

        const screenLeft = -lightBuffer;
        const screenRight = Graphics.width + lightBuffer;
        const screenTop = -lightBuffer;
        const screenBottom = Graphics.height + lightBuffer;

        const isVisible = (sx + radius) >= screenLeft && (sx - radius) <= screenRight &&
                          (sy + radius) >= screenTop && (sy - radius) <= screenBottom;

        if (!isVisible) {
            sprite.visible = false;
            return;
        }

        const fallbackTexture = PIXI.Texture.WHITE;

        function normalizeAngle(angle) {
            angle = angle % (2 * Math.PI);
            if (angle > Math.PI) angle -= 2 * Math.PI;
            if (angle < -Math.PI) angle += 2 * Math.PI;
            return angle;
        }

        function smoothRotate(sprite, targetAngle, rotationSpeed) {
            if (sprite._currentRotation == null) {
                sprite._currentRotation = targetAngle;
            }
            const current = normalizeAngle(sprite._currentRotation);
            const target = normalizeAngle(targetAngle);
            let diff = target - current;
            if (diff > Math.PI) diff -= 2 * Math.PI;
            if (diff < -Math.PI) diff += 2 * Math.PI;

            sprite._currentRotation += diff * rotationSpeed;
            sprite.rotation = normalizeAngle(sprite._currentRotation);
        }

        let baseTexture = PsychronicRaveLighting.getRadialTexture(cfg._lightRadius || 300);
        if (!baseTexture || !baseTexture.valid) {
            baseTexture = fallbackTexture;
        }

        sprite.texture = baseTexture;

        let color = cfg._lightColor || '#FFFFFF';
        let alpha = 1.0;
        let scaleX = 1.0;
        let scaleY = 1.0;

        const t = cfg._lightType;

        // Check flashlight tracking
        if (t === 'flashlight') {
            const flashTrack = $gameSystem.getFlashlightTracking(cfg._lightId);
            let targetAngle = 0;
            let directionBased = true;

            if (flashTrack.type !== 'none') {
                // Tracking a target for flashlight
                let targetX, targetY;
                if (flashTrack.type === 'player') {
                    targetX = $gamePlayer.screenX();
                    targetY = $gamePlayer.screenY() - 24;
                } else if (flashTrack.type === 'event') {
                    const ev = $gameMap.event(flashTrack.id);
                    if (ev) {
                        targetX = ev.screenX();
                        targetY = ev.screenY() - 24;
                    } else {
                        // Event not found, fallback to direction-based
                        directionBased = true;
                    }
                }

                if (targetX != null && targetY != null) {
                    // Compute angle to target
                    const dx = targetX - (sx + cfg._offsetX);
                    const dy = targetY - (sy + cfg._offsetY - 24);
                    targetAngle = Math.atan2(dy, dx) - Math.PI/2;
                    directionBased = false;
                }
            }

            if (directionBased) {
                // No tracking or invalid target, use direction
                const direction = event.direction();
                switch (direction) {
                    case 2: targetAngle = 0; break;
                    case 8: targetAngle = Math.PI; break;
                    case 4: targetAngle = Math.PI/2; break;
                    case 6: targetAngle = -Math.PI/2; break;
                }
            }

            let tex = PsychronicRaveLighting.getFlashlightTexture(cfg._coneWidthPx, cfg._coneLengthPx);
            if (!tex || !tex.valid) {
                tex = fallbackTexture;
            }
            sprite.texture = tex;
            sprite.anchor.set(0.5,0);
            sprite.x = sx + cfg._offsetX;
            sprite.y = sy + cfg._offsetY - 24;
            sprite.tint = this.colorToTint(color);

            const rotationSpeed = 0.2;
            smoothRotate(sprite, targetAngle, rotationSpeed);

        } else if (t === 'pulsate') {
            // unchanged
            sprite.anchor.set(0.5,0.5);
            if (cfg._pulsateValue == null) cfg._pulsateValue = 0;
            if (cfg._pulsateDirection == null) cfg._pulsateDirection = 1;
            cfg._pulsateValue += cfg._pulsateSpeed * cfg._pulsateDirection;
            if (cfg._pulsateValue > (cfg._pulsateMaxRadius - cfg._pulsateMinRadius)) {
                cfg._pulsateValue = cfg._pulsateMaxRadius - cfg._pulsateMinRadius;
                cfg._pulsateDirection = -1;
            } else if (cfg._pulsateValue < 0) {
                cfg._pulsateValue = 0;
                cfg._pulsateDirection = 1;
            }
            const currentR = cfg._pulsateMinRadius + cfg._pulsateValue;
            const scale = currentR / cfg._pulsateMaxRadius;
            scaleX = scaleY = scale;
            sprite.x = sx + (cfg._pulsateOffsetX || 0);
            sprite.y = sy + (cfg._pulsateOffsetY || 0);
            sprite.rotation = 0;
            sprite.tint = this.colorToTint(color);

        } else if (t === 'flicker') {
            // unchanged
            sprite.anchor.set(0.5,0.5);
            if (cfg._flickerFrameCounter == null) cfg._flickerFrameCounter = 0;
            if (cfg._flickerPatternIndex == null) cfg._flickerPatternIndex = 0;
            cfg._flickerFrameCounter++;
            if (cfg._flickerFrameCounter >= cfg._flickerInterval) {
                cfg._flickerFrameCounter = 0;
                cfg._flickerPatternIndex = (cfg._flickerPatternIndex+1) % PsychronicRaveLighting._flickerPatterns.length;
            }
            alpha = PsychronicRaveLighting._flickerPatterns[cfg._flickerPatternIndex];
            sprite.x = sx + (cfg._flickerOffsetX || 0);
            sprite.y = sy + (cfg._flickerOffsetY || 0);
            sprite.rotation = 0;
            sprite.tint = this.colorToTint(color);
        } else if (t === 'phase') {
            // unchanged
            sprite.anchor.set(0.5,0.5);
            cfg._phaseTransitionProgress++;
            if (cfg._phaseTransitionProgress >= cfg._phaseSpeed) {
                cfg._phaseTransitionProgress = 0;
                cfg._phaseCurrentIndex = (cfg._phaseCurrentIndex+1) % cfg._phaseColors.length;
            }
            const tt = cfg._phaseTransitionProgress / cfg._phaseSpeed;
            const c1 = cfg._phaseColors[cfg._phaseCurrentIndex];
            const c2 = cfg._phaseColors[(cfg._phaseCurrentIndex+1)%cfg._phaseColors.length];
            color = this.interpolateColor(c1,c2,tt);
            sprite.x = sx + cfg._offsetX || 0;
            sprite.y = sy + cfg._offsetY || 0;
            sprite.rotation = 0;
            sprite.tint = this.colorToTint(color);

        } else if (t === 'fire') {
            // unchanged
            sprite.anchor.set(0.5,0.5);
            if (cfg._fireFlickerFrameCounter == null) {
                cfg._fireFlickerFrameCounter = Math.random()*360;
            }
            cfg._fireFlickerFrameCounter += cfg._fireFlickerSpeed;
            if (cfg._fireFlickerFrameCounter >= 360) cfg._fireFlickerFrameCounter -= 360;
            const angle = cfg._fireFlickerFrameCounter * (Math.PI/180);
            let flickerAlpha = cfg._fireMinAlpha + (cfg._fireMaxAlpha - cfg._fireMinAlpha)*(0.6*Math.sin(angle) + 0.4*Math.sin(2*angle));
            flickerAlpha = Math.max(cfg._fireMinAlpha, Math.min(cfg._fireMaxAlpha, flickerAlpha));
            alpha = flickerAlpha;
            sprite.x = sx + (cfg._fireOffsetX || 0);
            sprite.y = sy + (cfg._fireOffsetY || 0);
            sprite.rotation = 0;
            sprite.tint = this.colorToTint(cfg._lightColor);

        } else {
            // light
            sprite.anchor.set(0.5,0.5);
            sprite.x = sx + (cfg._lightOffsetX || 0);
            sprite.y = sy + (cfg._lightOffsetY || 0);
            sprite.rotation = 0;
            sprite.tint = this.colorToTint(color);
        }

        sprite.alpha = alpha;
        sprite.scale.set(scaleX, scaleY);
        sprite.visible = true;

        if (!sprite.texture || !sprite.texture.valid) {
            sprite.texture = fallbackTexture;
        }
    };

    const UpdateBeamLight = Sprite_Character.prototype.updateBeamLight;
Sprite_Character.prototype.updateBeamLight = function(cfg) {
    const event = this._character;
    const sx = this.x;
    const sy = this.y;
    const fallbackTexture = PIXI.Texture.WHITE;

    let radius = Math.max(cfg._beamWidth, cfg._beamLength);
    const screenLeft = -lightBuffer;
    const screenRight = Graphics.width + lightBuffer;
    const screenTop = -lightBuffer;
    const screenBottom = Graphics.height + lightBuffer;

    const isVisible = (sx + radius) >= screenLeft && (sx - radius) <= screenRight &&
                      (sy + radius) >= screenTop && (sy - radius) <= screenBottom;

    // Retrieve or create beam sprites from the WeakMap
    let beamSprites = PsychronicRaveLighting._beamSpriteStorage.get(cfg);

    if (!isVisible) {
        // If not visible, just hide any associated sprites
        if (beamSprites) {
            for (const bs of beamSprites) {
                bs.visible = false;
            }
        }
        return;
    }

    // If beamSprites exist but lost their parent (e.g. after menu), reattach them
    if (beamSprites) {
        const container = SceneManager._scene._spriteset._lightContainer;
        for (const bs of beamSprites) {
            if (!bs.parent) {
                // Re-append all beam sprites to the container
                for (const bs2 of beamSprites) {
                    container.addChild(bs2);
                }
                break;
            }
        }
    } else {
        beamSprites = [];
        if (SceneManager._scene && SceneManager._scene._spriteset && SceneManager._scene._spriteset._lightContainer) {
            const c = SceneManager._scene._spriteset._lightContainer;
            for (let i = 0; i < cfg._beamNumberOfBeams; i++) {
                const spr = new Sprite();
                spr.anchor.set(0.5,0);
                spr.blendMode = PIXI.BLEND_MODES.ADD;
                spr.visible = true;
                c.addChild(spr);
                beamSprites.push(spr);
            }
        }
        // Store the array of sprites in the WeakMap instead of cfg
        PsychronicRaveLighting._beamSpriteStorage.set(cfg, beamSprites);
    }

    const color = this.getBeamColor(cfg);
    let texture = PsychronicRaveLighting.getBeamTexture(cfg._beamWidth, cfg._beamLength);
    if (!texture || !texture.valid) {
        texture = fallbackTexture;
    }

    // Check tracking
    const track = $gameSystem.getBeamTracking(cfg._lightId);
    let baseAngle = 0;
    let targetDist = null; // Distance to target if tracking

    if (track.type === 'player') {
        const px = $gamePlayer.screenX();
        const py = $gamePlayer.screenY() - 24;
        const dx = px - (sx + cfg._beamOffsetX);
        const dy = py - (sy + cfg._beamOffsetY);
        baseAngle = Math.atan2(dy, dx) - Math.PI/2;
        targetDist = Math.sqrt(dx*dx + dy*dy);
    } else if (track.type === 'event') {
        const ev = $gameMap.event(track.id);
        if (ev) {
            const evx = ev.screenX();
            const evy = ev.screenY() - 24;
            const dx = evx - (sx + cfg._beamOffsetX);
            const dy = evy - (sy + cfg._beamOffsetY);
            baseAngle = Math.atan2(dy, dx) - Math.PI/2;
            targetDist = Math.sqrt(dx*dx + dy*dy);
        } else {
            // If event not found, fallback
            baseAngle = this.getBeamBaseAngle(cfg, event);
        }
    } else {
        // no tracking
        baseAngle = this.getBeamBaseAngle(cfg, event);
    }

    const angleBetween = (2 * Math.PI) / cfg._beamNumberOfBeams;
    const rotationSpeed = 0.2;

    for (let i = 0; i < beamSprites.length; i++) {
        const spr = beamSprites[i];
        spr.texture = texture;
        spr.tint = this.colorToTint(color);
        spr.x = sx + cfg._beamOffsetX;
        spr.y = sy + cfg._beamOffsetY;
        spr.alpha = cfg._beamOpacity;
        spr.scale.set(1,1);
        spr.visible = true;

        const targetRotation = baseAngle + i * angleBetween;

        // Rotation logic
        if (track.type !== 'none' && (track.type === 'player' || (track.type === 'event' && targetDist !== null))) {
            spr._currentRotation = targetRotation;
            spr.rotation = targetRotation;

            if (targetDist !== null) {
                const actualLength = Math.min(targetDist, cfg._beamLength);
                const scaleFactor = actualLength / cfg._beamLength;
                spr.scale.y = scaleFactor;
            }
        } else if (cfg._beamSpinRate > 0 && track.type === 'none') {
            spr.rotation = targetRotation;
            spr._currentRotation = targetRotation;
        } else {
            if (spr._currentRotation == null) {
                spr._currentRotation = targetRotation;
            }
            const current = this.normalizeAngle(spr._currentRotation);
            const target = this.normalizeAngle(targetRotation);
            let diff = target - current;
            if (diff > Math.PI) diff -= 2 * Math.PI;
            if (diff < -Math.PI) diff += 2 * Math.PI;

            spr._currentRotation += diff * rotationSpeed;
            spr.rotation = this.normalizeAngle(spr._currentRotation);
        }

        if (!spr.texture || !spr.texture.valid) {
            spr.texture = fallbackTexture;
        }
    }
};

Sprite_Character.prototype.getBeamBaseAngle = function(cfg, event) {
    const track = $gameSystem.getBeamTracking(cfg._lightId);
    // If we have a spin rate and no tracking, spin
    if (cfg._beamSpinRate !== 0 && track.type === 'none') {
        // spin logic
        if (!cfg._beamSpinRadiansPerFrame) {
            cfg._beamSpinRadiansPerFrame = cfg._beamSpinRate * Math.PI / 180;
        }
        if (cfg._beamCurrentSpinAngle == null) {
            cfg._beamCurrentSpinAngle = 0;
        }
        cfg._beamCurrentSpinAngle += cfg._beamSpinRadiansPerFrame;
        return cfg._beamCurrentSpinAngle;
    } else {
        // direction-based logic if tracking not none or no spin
        const direction = event.direction();
        switch (direction) {
            case 2: return 0;
            case 8: return Math.PI;
            case 4: return Math.PI / 2;
            case 6: return -Math.PI / 2;
        }
        return 0;
    }
};
	
 Sprite_Character.prototype.normalizeAngle = function(angle) {
        angle = angle % (2 * Math.PI);
        if (angle > Math.PI) angle -= 2 * Math.PI;
        if (angle < -Math.PI) angle += 2 * Math.PI;
        return angle;
    };

    Sprite_Character.prototype.getBeamColor = function(cfg) {
        if (cfg._beamSpeed > 0 && cfg._beamColors.length > 1) {
            const t = (Graphics.frameCount % cfg._beamSpeed)/cfg._beamSpeed;
            const c1 = cfg._beamColors[0];
            const c2 = cfg._beamColors[1];
            return this.interpolateColor(c1,c2,t);
        } else {
            return cfg._beamColors[0] || '#FFFFFF';
        }
    };

    Sprite_Character.prototype.interpolateColor = function(color1, color2, factor) {
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);
        const r = Math.round(c1.r + (c2.r-c1.r)*factor);
        const g = Math.round(c1.g + (c2.g-c1.g)*factor);
        const b = Math.round(c1.b + (c2.b-c1.b)*factor);
        return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`;
    };

    Sprite_Character.prototype.hexToRgb = function(hex) {
        const bigint = parseInt(hex.slice(1),16);
        const r = (bigint>>16)&255;
        const g = (bigint>>8)&255;
        const b = bigint&255;
        return {r,g,b};
    };

    Sprite_Character.prototype.componentToHex = function(c) {
        const hex = c.toString(16);
        return hex.length===1? '0'+hex : hex;
    };

    Sprite_Character.prototype.colorToTint = function(color) {
        const rgb = this.hexToRgb(color);
        return (rgb.r<<16)+(rgb.g<<8)+(rgb.b);
    };
})();

(function() {
    PsychronicRaveLighting.textureCache = {};

    PsychronicRaveLighting.getRadialTexture = function(radius) {
        const r = Math.max(radius,1);
        const key = `radial_${r}`;
        if (this.textureCache[key]) return this.textureCache[key];

        const size = r*2;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(r, r, 0, r, r, r);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,size,size);

        const baseTexture = PIXI.BaseTexture.from(canvas);
        baseTexture.update();
        const texture = new PIXI.Texture(baseTexture);
        this.textureCache[key] = texture;
        return texture;
    };

    PsychronicRaveLighting.getBeamTexture = function(width, length) {
        const w = Math.max(width,1);
        const l = Math.max(length,1);
        const key = `beam_${w}_${l}`;
        if (this.textureCache[key]) return this.textureCache[key];

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = l;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0,0,0,l);
        grad.addColorStop(0,'rgba(255,255,255,1)');
        grad.addColorStop(1,'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,w,l);

        const baseTexture = PIXI.BaseTexture.from(canvas);
        baseTexture.update();
        const texture = new PIXI.Texture(baseTexture);
        this.textureCache[key] = texture;
        return texture;
    };

    PsychronicRaveLighting.getFlashlightTexture = function(width, length) {
        const w = Math.max(width, 1);
        const l = Math.max(length, 1);
        const key = `flashlight_blurred_${w}_${l}`;
        if (this.textureCache[key]) return this.textureCache[key];

        const offCanvas = document.createElement('canvas');
        offCanvas.width = w;
        offCanvas.height = l;
        const offCtx = offCanvas.getContext('2d');

        const grad = offCtx.createLinearGradient(w/2, 0, w/2, l);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.moveTo(w/2, 0);
        offCtx.lineTo(w, l);
        offCtx.lineTo(0, l);
        offCtx.closePath();
        offCtx.fill();

        const blurAmount = 8;
        const blurCanvas = document.createElement('canvas');
        blurCanvas.width = w;
        blurCanvas.height = l;
        const blurCtx = blurCanvas.getContext('2d');
        blurCtx.filter = `blur(${blurAmount}px)`;
        blurCtx.drawImage(offCanvas, 0, 0);

        const baseTexture = PIXI.BaseTexture.from(blurCanvas);
        baseTexture.update();
        const texture = new PIXI.Texture(baseTexture);
        this.textureCache[key] = texture;
        return texture;
    };
})();

(function() {
   const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_createLowerLayer.call(this);

        this._toneBitmap = new Bitmap(Graphics.width, Graphics.height);
        this._toneSprite = new Sprite(this._toneBitmap);
        this._toneSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        this.addChild(this._toneSprite);

        this.createLightContainer();
    };

    Spriteset_Map.prototype.createLightContainer = function() {
        this._lightContainer = new PIXI.Container();
        this.addChild(this._lightContainer);
    };

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this.preGenerateLightTextures();
    };

    Scene_Map.prototype.preGenerateLightTextures = function() {
        const beamParamsSet = new Set();
        const flashlightParamsSet = new Set();
        const radialParamsSet = new Set();

        $gameMap.events().forEach(event => {
            const lights = event._lights || [];
            lights.forEach(cfg => {
                if (!cfg._lightType) return;
                switch(cfg._lightType) {
                    case 'beam':
                        const beamKey = `${cfg._beamWidth}_${cfg._beamLength}`;
                        if (!beamParamsSet.has(beamKey)) {
                            beamParamsSet.add(beamKey);
                        }
                        break;
                    case 'flashlight':
                        const flashKey = `${cfg._coneWidthPx}_${cfg._coneLengthPx}`;
                        if (!flashlightParamsSet.has(flashKey)) {
                            flashlightParamsSet.add(flashKey);
                        }
                        break;
                    case 'light':
                    case 'flicker':
                    case 'pulsate':
                    case 'phase':
                    case 'fire':
                    default:
                        const radius = this.getBaseRadiusForLight(cfg);
                        if (!radialParamsSet.has(radius)) {
                            radialParamsSet.add(radius);
                        }
                        break;
                }
            });
        });

        radialParamsSet.forEach(radius => {
            PsychronicRaveLighting.getRadialTexture(radius);
        });

        beamParamsSet.forEach(key => {
            const [width, length] = key.split('_').map(Number);
            PsychronicRaveLighting.getBeamTexture(width, length);
        });

        flashlightParamsSet.forEach(key => {
            const [w, l] = key.split('_').map(Number);
            PsychronicRaveLighting.getFlashlightTexture(w, l);
        });
    };

    Scene_Map.prototype.getBaseRadiusForLight = function(cfg) {
        let radius = 300;
        switch(cfg._lightType) {
            case 'light':
            case 'flicker':
                radius = cfg._lightRadius || 300;
                break;
            case 'pulsate':
                radius = cfg._pulsateMaxRadius || 350;
                break;
            case 'phase':
            case 'fire':
                radius = cfg._lightRadius || 300;
                break;
            default:
                break;
        }
        return Math.max(radius, 1);
    };

    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        this.updateToneOverlay();
    };

 Spriteset_Map.prototype.updateToneOverlay = function() {
    const tone = $gameScreen.tone();
    const ctx = this._toneBitmap.context;
    const width = this._toneBitmap.width;
    const height = this._toneBitmap.height;
    ctx.clearRect(0,0,width,height);

    function channelFactor(value) {
        if (value < 0) {
            return 1 + (value / 255);
        } else {
            return 1.0;
        }
    }

    let rFactor = channelFactor(tone[0]);
    let gFactor = channelFactor(tone[1]);
    let bFactor = channelFactor(tone[2]);

    let rVal = Math.round(rFactor * 255);
    let gVal = Math.round(gFactor * 255);
    let bVal = Math.round(bFactor * 255);

    if (tone[3] !== 0) {
        const avg = (rVal + gVal + bVal) / 3;
        const grayFactor = tone[3] / 255.0;
        rVal = rVal + (avg - rVal)*grayFactor;
        gVal = gVal + (avg - gVal)*grayFactor;
        bVal = bVal + (avg - bVal)*grayFactor;

        rVal = Math.max(0, Math.min(255, rVal));
        gVal = Math.max(0, Math.min(255, gVal));
        bVal = Math.max(0, Math.min(255, bVal));
    }

    const negativeTone = Math.min(
        Math.abs(tone[0] < 0 ? tone[0] : 0),
        Math.abs(tone[1] < 0 ? tone[1] : 0),
        Math.abs(tone[2] < 0 ? tone[2] : 0)
    );

    let dFactor = negativeTone / 255.0;
    let adjustedFactor = Math.pow(dFactor, darknessGamma);
    rVal = Math.round(rVal * (1 - adjustedFactor));
    gVal = Math.round(gVal * (1 - adjustedFactor));
    bVal = Math.round(bVal * (1 - adjustedFactor));

    ctx.fillStyle = `rgb(${rVal},${gVal},${bVal})`;
    ctx.fillRect(0,0,width,height);

    ctx.globalCompositeOperation = 'destination-out';

    const sprites = this._characterSprites;
    if (sprites) {
        for (const spr of sprites) {
            const ch = spr._character;
            if (ch && ch._lights && ch._lights.length > 0) {
                for (const cfg of ch._lights) {
                    if (!$gameSystem.isLightOn(cfg._lightId)) continue;

                    let sx = spr.x;
                    let sy = spr.y;
                    let radius = cfg._lightRadius || 300;

                    if (cfg._lightType === 'phase') {
                        sx += cfg._offsetX; 
                        sy += cfg._offsetY; 
                    } else if (cfg._lightType === 'flashlight') {
                        sx += cfg._offsetX; 
                        sy += (cfg._offsetY - 24); 
                    } else if (cfg._lightType === 'fire') {
                        sx += cfg._fireOffsetX; 
                        sy += cfg._fireOffsetY;
                    } else if (cfg._lightType === 'beam') {
                        sx += cfg._beamOffsetX; 
                        sy += cfg._beamOffsetY;
                    } else if (cfg._lightType === 'pulsate') {
                        radius = Math.max(radius, cfg._pulsateMaxRadius);
						sx += cfg._pulsateOffsetX;
						sy += cfg._pulsateOffsetY;
                    } else if (cfg._lightType === 'light') {
                        sx += cfg._lightOffsetX || 0; 
                        sy += cfg._lightOffsetY || 0;
                    } else if (cfg._lightType === 'flicker') {
                        sx += cfg._flickerOffsetX || 0; 
                        sy += cfg._flickerOffsetY || 0;
                    }

                 if (cfg._lightType === 'flashlight') {
    const flashTrack = $gameSystem.getFlashlightTracking(cfg._lightId);
    let targetAngle = 0;
    let directionBased = true;

    if (flashTrack.type !== 'none') {
        let targetX, targetY;
        if (flashTrack.type === 'player') {
            targetX = $gamePlayer.screenX();
            targetY = $gamePlayer.screenY() - 24;
        } else if (flashTrack.type === 'event') {
            const ev = $gameMap.event(flashTrack.id);
            if (ev) {
                targetX = ev.screenX();
                targetY = ev.screenY() - 24;
            } else {
                directionBased = true;
            }
        }

        if (targetX != null && targetY != null) {
            const dx = targetX - (sx + cfg._offsetX);
            const dy = targetY - (sy + cfg._offsetY - 24);
            targetAngle = Math.atan2(dy, dx) - Math.PI/2;
            directionBased = false;
        }
    }

    if (directionBased) {
        const direction = ch.direction();
        switch (direction) {
            case 2: targetAngle = 0; break;
            case 4: targetAngle = Math.PI / 2; break;
            case 6: targetAngle = -Math.PI / 2; break;
            case 8: targetAngle = Math.PI; break;
        }
    }

    if (cfg._smoothFlashlightAngle == null) {
        cfg._smoothFlashlightAngle = targetAngle;
    }

    function normalizeAngle(angle) {
        angle = angle % (2 * Math.PI);
        if (angle > Math.PI) angle -= 2 * Math.PI;
        if (angle < -Math.PI) angle += 2 * Math.PI;
        return angle;
    }

    let current = normalizeAngle(cfg._smoothFlashlightAngle);
    let diff = targetAngle - current;
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;

    const rotationSpeed = 0.2;
    cfg._smoothFlashlightAngle += diff * rotationSpeed;

    const coneWidth = cfg._coneWidthPx;
    const coneLength = cfg._coneLengthPx;
    const texture = PsychronicRaveLighting.getFlashlightTexture(coneWidth, coneLength);
    const img = texture.baseTexture.resource.source;

    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(cfg._smoothFlashlightAngle);

    ctx.translate(-coneWidth/2, 0);
    ctx.drawImage(img, 0, 0);

    ctx.restore();
} else if (cfg._lightType === 'beam') {
                        // Beam drawing
                        const beamWidth = cfg._beamWidth;
                        const beamLength = cfg._beamLength;
                        const beamCount = cfg._beamNumberOfBeams;
                        const beamTexture = PsychronicRaveLighting.getBeamTexture(beamWidth, beamLength);
                        const beamImg = beamTexture.baseTexture.resource.source;

                        let track = $gameSystem.getBeamTracking(cfg._lightId);
                        let baseAngle = 0;
                        let targetDist = null;

                        function normalizeAngle(angle) {
                            angle = angle % (2 * Math.PI);
                            if (angle > Math.PI) angle -= 2 * Math.PI;
                            if (angle < -Math.PI) angle += 2 * Math.PI;
                            return angle;
                        }

                        // Simplified getBeamBaseAngle function
                        function getBeamBaseAngle(cfg, ch, track) {
                            // if no tracking
                            if (track.type === 'none') {
                                // If we have spin
                                if (cfg._beamSpinRate > 0) {
                                    if (!cfg._beamSpinRadiansPerFrame) {
                                        cfg._beamSpinRadiansPerFrame = cfg._beamSpinRate * Math.PI/180;
                                    }
                                    if (cfg._beamCurrentSpinAngle == null) {
                                        cfg._beamCurrentSpinAngle = 0;
                                    }
                                    cfg._beamCurrentSpinAngle += cfg._beamSpinRadiansPerFrame;
                                    return cfg._beamCurrentSpinAngle;
                                } else {
                                    // direction-based
                                    const d = ch.direction();
                                    switch (d) {
                                        case 2: return 0;
                                        case 8: return Math.PI;
                                        case 4: return Math.PI/2;
                                        case 6: return -Math.PI/2;
                                    }
                                }
                            }
                            return 0;
                        }

                        const originX = sx; 
                        const originY = sy;

                        if (track.type === 'player') {
                            const px = $gamePlayer.screenX();
                            const py = $gamePlayer.screenY() - 24;
                            const dx = px - originX;
                            const dy = py - originY;
                            baseAngle = Math.atan2(dy, dx) - Math.PI/2;
                            targetDist = Math.sqrt(dx*dx + dy*dy);

                        } else if (track.type === 'event') {
                            const ev = $gameMap.event(track.id);
                            if (ev) {
                                const evx = ev.screenX();
                                const evy = ev.screenY() - 24;
                                const dx = evx - originX;
                                const dy = evy - originY;
                                baseAngle = Math.atan2(dy, dx) - Math.PI/2;
                                targetDist = Math.sqrt(dx*dx + dy*dy);
                            } else {
                                // No event found, fallback to spin/direction
                                baseAngle = getBeamBaseAngle(cfg, ch, track);
                            }
                        } else {
                            // no tracking
                            baseAngle = getBeamBaseAngle(cfg, ch, track);
                        }

                        const angleBetween = (2 * Math.PI) / beamCount;

                        for (let i = 0; i < beamCount; i++) {
                            const beamAngle = baseAngle + i * angleBetween;
                            ctx.save();
                            ctx.translate(originX, originY);
                            ctx.rotate(beamAngle);

                            let drawLength = beamLength;
                            if (targetDist !== null) {
                                drawLength = Math.min(targetDist, beamLength);
                            }

                            const scaleFactor = drawLength / beamLength;
                            ctx.translate(-beamWidth/2, 0);
                            ctx.scale(1, scaleFactor);

                            ctx.drawImage(beamImg, 0, 0);

                            ctx.restore();
                        }

                    } else {
                        // Default radial gradient logic for other lights
                        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
                        grad.addColorStop(0, 'rgba(255,255,255,1)');
                        grad.addColorStop(1, 'rgba(255,255,255,0)');
                        ctx.fillStyle = grad;
                        ctx.beginPath();
                        ctx.arc(sx, sy, radius, 0, Math.PI*2);
                        ctx.fill();
                    }
                }
            }
        }
    }

    ctx.globalCompositeOperation = 'source-over';
    this._toneBitmap._baseTexture.update();
};

    const _Spriteset_Base_updateBaseFilters = Spriteset_Base.prototype.updateBaseFilters;
    Spriteset_Base.prototype.updateBaseFilters = function() {
        const tone = $gameScreen.tone();
        const positiveTone = [
            Math.max(0, tone[0]),
            Math.max(0, tone[1]),
            Math.max(0, tone[2]),
            tone[3]
        ];
        this._baseColorFilter.setColorTone(positiveTone);
    };

    const _Screen_setTone = Screen.prototype.setTone;
    Screen.prototype.setTone = function() {
        _Screen_setTone.apply(this,arguments);
    };

    const _Spriteset_Map_destroy = Spriteset_Map.prototype.destroy;
    Spriteset_Map.prototype.destroy = function(options) {
        if (this._lightContainer) {
            this._lightContainer.removeChildren();
            this._lightContainer.destroy({children: true});
            this._lightContainer = null;
        }
        _Spriteset_Map_destroy.call(this, options);
    };
})();