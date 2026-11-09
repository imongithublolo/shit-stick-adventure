/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/titlesystem/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Shows a queue of images/maps on the title screen
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.2.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: Allows you to show multiple images or maps in a cycle on the
 * title screen. It will cycle between each map/image in order, and can handle
 * screen effects and other event commands.
 * ----------------------------------------------------------------------------
 * Documentation:
 * Title images should be placed in img/titles1 and img/titles2. Maps are just
 * normal maps and support events/most event commands. You can set weather
 * effects, tints, move the camera, and more.
 * ------------------------Global Data Integration-----------------------------
 * This plugin can be used with CGMZ Global Data to only show certain maps or
 * images if the player has done something within a save file. For example,
 * you could show a specific image only if the player has beaten the game in
 * a save file.
 *
 * To set this up, use the Global Data Key and Global Data Info parameters.
 * The global data key is the key the global data was saved with, and the
 * global data info is what will be compared to the global data stored.
 *
 * If not using CGMZ Global Data, leave the global data params empty.
 * -----------------------------Latest Version---------------------------------
 * Hi all, this latest version makes it so the title system will no longer
 * fade out and back in if there is only one title card to display. This is
 * true even if you have multiple set up, if only one meets display criteria,
 * such as if the others have Global Data requirements that are not met. I
 * received a lot of feedback that people wanted to use this to show a map as
 * the title background without swapping scenes, so this should now allow you
 * to do that without fading and reloading the map every so often or setting
 * the display time really high.
 *
 * This update also made it so that if none of your title images or maps are
 * eligible (all have global data set up), it will use the first title image
 * or map even if it does not meet global data criteria.
 *
 * This update also changes the map parameter to be a map type, which gives
 * you the map select ui instead of needing to remember the map id and type it
 * in manually.
 *
 * Version 1.2.0
 * - If no items are eligible, will use first title map
 * - If only one item in cycle, title system no longer fades out and back in
 * - Map parameter converted to new map type for map select ui
 * 
 * @param Maps
 * @type struct<Map>[]
 * @default []
 * @desc Set of maps/images to cycle through
 *
 * @param Fade Speed
 * @type number
 * @min 1
 * @max 255
 * @default 16
 * @desc Speed to fade out. Amount of opacity change per frame. Default 16
*/
/*~struct~Map:
 * @param Image1
 * @type file
 * @dir img/titles1
 * @desc Image1 to display. If this option is used, the map option will not be used for this entry.
 *
 * @param Image2
 * @type file
 * @dir img/titles2
 * @desc Image2 to display. If this option is used, the map option will not be used for this entry.
 * 
 * @param Map
 * @type map
 * @default 0
 * @desc Map to display. If this option is used, the image option will not be used for this entry.
 * 
 * @param DisplayTime
 * @type number
 * @min 1
 * @default 600
 * @desc Amount of frames to display the map/image.
 * 
 * @param Global Data Key
 * @desc Global Data Key that determines if this map/image displays in the cycle.
 * 
 * @param Global Data Info
 * @desc What to check the global data key for equivalency with (string)
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/titlesystem/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Muestra una cola de imágenes/mapas en la pantalla de título.
 * @help
 * ============================================================================
 * Para términos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.2.0
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Descripción: Permite mostrar múltiples imágenes o mapas en un ciclo en la
 * pantalla de título. Alternará entre cada mapa/imagen en orden y puede manejar
 * efectos de pantalla y otros comandos de eventos.
 * ----------------------------------------------------------------------------
 * Documentación:
 * Las imágenes de título deben colocarse en img/titles1 e img/titles2. Los
 * mapas son solo mapas normales y soporta eventos/la mayoría de los comandos
 * de eventos. Puedes configurar los efectos del clima, tintes, mover la cámara
 * y más.
 * ---------------------Integración de datos globales--------------------------
 * Este plugin se puede usar con Datos Globales de CGMZ para mostrar solo
 * ciertos mapas o imágenes si el jugador ha hecho algo dentro de un archivo
 * guardado. Por ejemplo, podrías mostrar una imagen específica solo si el
 * jugador ha ganado el juego en un archivo guardado
 *
 * Para configurar esto, use los parámetros Clave e Información de los datos
 * globales. La clave de datos globales es la clave con la que se guardaron
 * estos datos y la información de datos globales es lo que se comparará con
 * estos datos almacenados.
 *
 * Si no usa los datos globales de CGMZ, deje los parámetros de datos globales
 * vacíos.
 * -----------------------------Latest Version---------------------------------
 * Hi all, this latest version makes it so the title system will no longer
 * fade out and back in if there is only one title card to display. This is
 * true even if you have multiple set up, if only one meets display criteria,
 * such as if the others have Global Data requirements that are not met. I
 * received a lot of feedback that people wanted to use this to show a map as
 * the title background without swapping scenes, so this should now allow you
 * to do that without fading and reloading the map every so often or setting
 * the display time really high.
 *
 * This update also made it so that if none of your title images or maps are
 * eligible (all have global data set up), it will use the first title image
 * or map even if it does not meet global data criteria.
 *
 * This update also changes the map parameter to be a map type, which gives
 * you the map select ui instead of needing to remember the map id and type it
 * in manually.
 *
 * Version 1.2.0
 * - If no items are eligible, will use first title map
 * - If only one item in cycle, title system no longer fades out and back in
 * - Map parameter converted to new map type for map select ui
 * 
 * @param Maps
 * @text Mapas
 * @type struct<Map>[]
 * @default []
 * @desc Conjunto de mapas/imágenes para recorrer.
 *
 * @param Fade Speed
 * @text Velocidad de desvanecimiento
 * @type number
 * @min 1
 * @max 255
 * @default 16
 * @desc Velocidad de desvanecimiento. Cantidad de cambio de opacidad por fotograma. Predeterminado 16.
*/
/*~struct~Map:es
 * @param Image1
 * @text Imagen 1
 * @type file
 * @dir img/titles1
 * @desc Imagen1 para mostrar. Si se usa esta opción, la opción de mapa no se usará para esta entrada
 *
 * @param Image2
 * @text Imagen 2
 * @type file
 * @dir img/titles2
 * @desc Imagen2 para mostrar. Si se usa esta opción, la opción de mapa no se usará para esta entrada.
 * 
 * @param Map
 * @text Mapa
 * @type map
 * @default 0
 * @desc Mapa para mostrar. Si se usa esta opción, la opción de imagen no se usará para esta entrada.
 * 
 * @param DisplayTime
 * @text Tiempo de Visualización
 * @type number
 * @min 1
 * @default 600
 * @desc Cantidad de fotogramas para mostrar el mapa/imagen.
 * 
 * @param Global Data Key
 * @text Clave de datos globales
 * @desc Clave de datos globales que determina si este mapa/imagen se muestra en el ciclo.
 * 
 * @param Global Data Info
 * @text Inormación de datos globales
 * @desc Qué verificar en la clave de datos globales para la equivalencia con (cadena).
*/
Imported.CGMZ_TitleSystem = true;
CGMZ.Versions["Title System"] = "1.2.0";
CGMZ.TitleSystem = {};
CGMZ.TitleSystem.parameters = PluginManager.parameters('CGMZ_TitleSystem');
CGMZ.TitleSystem.cycle = CGMZ_Utils.parseJSON(CGMZ.TitleSystem.parameters["Maps"], [], "[CGMZ] Title System", "Your Maps parameter was set up incorrectly and could not be read.").map(json => {
	const parsed = CGMZ_Utils.parseJSON(json, null, "[CGMZ] Title System", "One of your title displays was set up incorrectly and could not be read");
	if(!parsed) return null;
	return {
		img1: parsed["Image1"],
		img2: parsed["Image2"],
		map: Number(parsed.Map),
		displayTime: Number(parsed["DisplayTime"]),
		globalDataKey: parsed["Global Data Key"],
		globalDataInfo: parsed["Global Data Info"]
	}
}).filter(x => !!x);
CGMZ.TitleSystem.fadeSpeed = Number(CGMZ.TitleSystem.parameters["Fade Speed"]);
//=============================================================================
// Scene_Title
//-----------------------------------------------------------------------------
// Modify the title scene to cycle between different maps in the background
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize map variables
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleSystem_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function() {
	alias_CGMZ_TitleSystem_initialize.call(this);
	this._CGMZ_titleSystem_mapLoaded = false;
	this._CGMZ_ts_cycle = ($cgmzTemp) ? $cgmzTemp._titleCycle : 0;
	this._CGMZ_ts_maxCycle = CGMZ.TitleSystem.cycle.length;
	this._CGMZ_ts_maxEligibleCycle = this.CGMZ_calculateMaxTitleSystemCycles();
	this._CGMZ_titleSystem_newGameSelected = false;
	$gamePlayer._followers = new Game_Followers();
	$gamePlayer.setImage("", 0);
};
//-----------------------------------------------------------------------------
// Calculate how many eligible title screens can be cycled through
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_calculateMaxTitleSystemCycles = function() {
	let total = 0;
	for(const cycle of CGMZ.TitleSystem.cycle) {
		if(Imported.CGMZ_GlobalData && $cgmzGlobal && cycle.globalDataKey) {
			const key = cycle.globalDataKey;
			const info = cycle.globalDataInfo;
			if($cgmzGlobal.getData(key) !== info) {
				continue;
			}
		}
		total++;
	}
	return total;
};
//-----------------------------------------------------------------------------
// If not set up, use default title. Else use new title system.
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleSystem_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	alias_CGMZ_TitleSystem_createBackground.call(this);
	this._CGMZ_titleSystem_backSpriteSet = new Sprite();
	this._CGMZ_titleSystem_fadeSprite = new ScreenSprite();
	this.addChild(this._CGMZ_titleSystem_backSpriteSet);
	this.addChild(this._CGMZ_titleSystem_fadeSprite);
	this._CGMZ_titleSystem_fadeSprite.setBlack();
	this.CGMZ_titleSystem_setupCycle();
};
//-----------------------------------------------------------------------------
// Advance to the next map/image in the cycle
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_titleSystem_advanceCycle = function() {
	this._CGMZ_ts_cycle++;
	if(this._CGMZ_ts_cycle >= this._CGMZ_ts_maxCycle) {
		this._CGMZ_ts_cycle = 0;
	}
	this.CGMZ_titleSystem_setupCycle();
};
//-----------------------------------------------------------------------------
// Setup new map/image in the cycle.
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_titleSystem_setupCycle = function() {
	this._CGMZ_ts_currentDisplay = CGMZ.TitleSystem.cycle[this._CGMZ_ts_cycle];
	if(Imported.CGMZ_GlobalData && $cgmzGlobal && this._CGMZ_ts_currentDisplay.globalDataKey && this._CGMZ_ts_maxEligibleCycle > 0) {
		const key = this._CGMZ_ts_currentDisplay.globalDataKey;
		const info = this._CGMZ_ts_currentDisplay.globalDataInfo;
		if($cgmzGlobal.getData(key) !== info) {
			this.CGMZ_titleSystem_advanceCycle();
			return;
		}
	}
	this._CGMZ_titleSystem_displayTime = this._CGMZ_ts_currentDisplay.displayTime;
	this._CGMZ_titleSystem_isImage = this._CGMZ_ts_currentDisplay.img1 !== "";
	this.CGMZ_titleSystem_clearMap();
	this.playTitleMusic();
	this._CGMZ_titleSystem_mapLoaded = false;
	if(this._CGMZ_titleSystem_isImage) {
		this.CGMZ_titleSystem_handleImage();
	} else {
		this.CGMZ_titleSystem_handleMap();
	}
	this._CGMZ_titleSystem_timer = 0;
	this._needsFadeIn = true;
	this._needsFadeOut = false;
};
//-----------------------------------------------------------------------------
// Handling for images
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_titleSystem_handleImage = function() {
	this._backSprite1.bitmap = ImageManager.loadTitle1(this._CGMZ_ts_currentDisplay.img1);
	this._backSprite2.bitmap = ImageManager.loadTitle2(this._CGMZ_ts_currentDisplay.img2);
	this.adjustBackground();
};
//-----------------------------------------------------------------------------
// Handle the map loading
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_titleSystem_handleMap = function() {
	if($cgmzTemp && $cgmzTemp._titleSystemMapDataLoaded === this._CGMZ_ts_currentDisplay.map) {
		return;
	}
	$cgmzTemp._titleSystemMapDataLoaded = this._CGMZ_ts_currentDisplay.map;
	DataManager.loadMapData(this._CGMZ_ts_currentDisplay.map);
};
//-----------------------------------------------------------------------------
// Remove the map spriteset
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_titleSystem_clearMap = function() {
	if(this._CGMZ_ts_currentDisplay.map !== 0 && $cgmzTemp && $cgmzTemp._titleSystemMapDataLoaded === this._CGMZ_ts_currentDisplay.map) {
		return;
	}
	$gameScreen.clearWeather();
	$gameScreen.clearPictures();
	$gameScreen.clearShake();
	$gameScreen.clearFlash();
	$gameScreen.clearZoom();
	$gameScreen.clearTone();
	$gameScreen.clearFade();
	this._CGMZ_titleSystem_backSpriteSet.removeChild(this._CGMZ_titleSystem_spriteset);
};
//-----------------------------------------------------------------------------
// Alias. Update the title scene with fade in/out for maps/images.
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleSystem_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	alias_CGMZ_TitleSystem_update.call(this);
	if(SceneManager.isSceneChanging()) return;
	if($cgmzTemp) $cgmzTemp.resetIdleTimer();
	if(!this._CGMZ_titleSystem_isImage && this._CGMZ_titleSystem_mapLoaded) {
		$gameMap.update(true);
		$gamePlayer.update(false);
		$gameTimer.update(false);
		$gameScreen.update();
	}
	if(this._needsFadeIn && this.isReady()) {
		this.adjustBackground();
		this.CGMZ_titleSystem_updateFadeIn();
	} else if(this._needsFadeOut) {
		this.CGMZ_titleSystem_updateFadeOut();
	} else if(!this._needsFadeIn && !this._needsFadeOut) {
		this._CGMZ_titleSystem_timer++;
		if(this._CGMZ_titleSystem_timer >= this._CGMZ_titleSystem_displayTime) {
			if(this._CGMZ_ts_maxEligibleCycle > 1 || this._CGMZ_titleSystem_newGameSelected) this._needsFadeOut = true;
		}
	}
};
//-----------------------------------------------------------------------------
// Update Fade In
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_titleSystem_updateFadeIn = function() {
	this._CGMZ_titleSystem_fadeSprite.opacity -= CGMZ.TitleSystem.fadeSpeed;
	if(this._CGMZ_titleSystem_fadeSprite.opacity <= 0) {
		this._needsFadeIn = false;
	}
};
//-----------------------------------------------------------------------------
// Update Fade Out. Advance the cycle when done fading out
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_titleSystem_updateFadeOut = function() {
	this._CGMZ_titleSystem_fadeSprite.opacity += CGMZ.TitleSystem.fadeSpeed;
	if(this._CGMZ_titleSystem_fadeSprite.opacity >= 255) {
		this._needsFadeOut = false;
		if(this._CGMZ_titleSystem_newGameSelected) {
			alias_CGMZTitleSystem_SceneTitle_commandNewGame.call(this);
		} else {
			this.CGMZ_titleSystem_advanceCycle();
		}
	}
};
//-----------------------------------------------------------------------------
// Check if scene is ready to display new item in cycle
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleSystem_isReady = Scene_Title.prototype.isReady;
Scene_Title.prototype.isReady = function() {
	if(!this._CGMZ_titleSystem_isImage) {
		if (!this._CGMZ_titleSystem_mapLoaded && DataManager.isMapLoaded()) {
			this.CGMZ_titleSystem_onMapLoaded();
			this._CGMZ_titleSystem_mapLoaded = true;
		}
		return this._CGMZ_titleSystem_mapLoaded && alias_CGMZ_TitleSystem_isReady.call(this);
	}
	
	return alias_CGMZ_TitleSystem_isReady.call(this);
};
//-----------------------------------------------------------------------------
// After loading map, setup $gameMap and spriteset
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_titleSystem_onMapLoaded = function() {
	$gameMap.setup(this._CGMZ_ts_currentDisplay.map);
	this._CGMZ_titleSystem_spriteset = new Spriteset_Map();
	this._CGMZ_titleSystem_backSpriteSet.addChild(this._CGMZ_titleSystem_spriteset);
};
//-----------------------------------------------------------------------------
// Save cycle position when scene is stopped
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleSystem_stop = Scene_Title.prototype.stop;
Scene_Title.prototype.stop = function() {
	$cgmzTemp._titleCycle = this._CGMZ_ts_cycle;
	alias_CGMZ_TitleSystem_stop.call(this);
};
//-----------------------------------------------------------------------------
// Pause updating when new game is chosen
//-----------------------------------------------------------------------------
const alias_CGMZTitleSystem_SceneTitle_commandNewGame = Scene_Title.prototype.commandNewGame;
Scene_Title.prototype.commandNewGame = function() {
    this._CGMZ_titleSystem_timer = this._CGMZ_titleSystem_displayTime;
	this._CGMZ_titleSystem_newGameSelected = true;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Save position of title screen cycle (not included in save data)
//=============================================================================
//-----------------------------------------------------------------------------
// Save title system cycle position
//-----------------------------------------------------------------------------
const alias_CGMZTitleSystem_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZTitleSystem_createPluginData.call(this);
	this._titleCycle = 0;
};
//=============================================================================
// Scene_GameEnd
//-----------------------------------------------------------------------------
// Reset the cycle position if going back to title
//=============================================================================
//-----------------------------------------------------------------------------
// Reset the title position
//-----------------------------------------------------------------------------
const alias_CGMZTitleSystem_SceneGameEnd_commandToTitle = Scene_GameEnd.prototype.commandToTitle;
Scene_GameEnd.prototype.commandToTitle = function() {
	if($cgmzTemp) $cgmzTemp._titleCycle = 0;
    alias_CGMZTitleSystem_SceneGameEnd_commandToTitle.call(this);
};