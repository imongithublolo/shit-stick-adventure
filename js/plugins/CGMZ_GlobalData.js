/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/globaldata/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Allows you to have data which is available across all savefiles
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: This plugin allows you to have global data that will be
 * available across all save files. It supports manual global data such as
 * text or numbers as well as automatic variable / switch data. Saving global
 * data can be done separately from saving regular game data.
 * ----------------------------------------------------------------------------
 * Documentation:
 * By default, global data is saved whenever a game is saved. You can use
 * plugin command to manually save global data without saving the game.
 * 
 * Keys are case sensitive.
 *
 * You can only store one piece of data per key. For example, you cannot store
 * both a number and a piece of text under the same key. The last piece of
 * data assigned to that key will overwrite whatever was stored previously.
 * -------------------------Plugin Commands------------------------------------
 * The following plugin commands are supported:
 * 
 * • Save Data
 * Saves global data without saving the rest of the game data
 *
 * • Add Text Data
 * Add text data to the global data save file
 * 
 * • Add Number Data
 * Add number data to the global data save file
 * 
 * • Add Variable Data
 * Add variable data to the global data save file
 * 
 * • Add Switch Data
 * Add switch data to the global data save file
 * 
 * • Get Data
 * Retrieve a piece of global data
 * 
 * • Get Switch Data
 * Retrieve global data and store it in a switch
 * 
 * • Clear Data
 * Remove a piece of global data
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_GlobalData.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this version fixes a bug that could cause global switches or
 * variables added later in development to not properly be reflected in a
 * saved game until the game was manually saved.
 * 
 * Version 1.0.2
 * - Fix bug with saved games and new switch or variable parameters
 *
 * @command Save Data
 * @desc Saves global data without saving the rest of the game.
 *
 * @command Add Text Data
 * @desc Stores a piece of data
 *
 * @arg Key
 * @desc The string required to access the data later
 *
 * @arg Text
 * @desc The text to store under this key
 *
 * @command Add Number Data
 * @desc Stores a piece of data
 *
 * @arg Key
 * @desc The string required to access the data later
 *
 * @arg number
 * @type number
 * @default 0
 * @desc The number to store under this key
 *
 * @command Add Variable Data
 * @desc Stores a piece of data
 *
 * @arg Key
 * @desc The string required to access the data later
 *
 * @arg Variable
 * @type variable
 * @default 0
 * @desc The variable to store under this key
 *
 * @command Add Switch Data
 * @desc Stores a piece of data
 *
 * @arg Key
 * @desc The string required to access the data later
 *
 * @arg Switch
 * @type switch
 * @default 0
 * @desc The switch to store under this key
 *
 * @command Get Data
 * @desc Retrieves a piece of data
 *
 * @arg Key
 * @desc The string set when stored to access the data
 *
 * @arg variable
 * @type variable
 * @desc The variable to store the data in
 *
 * @command Get Switch Data
 * @desc Retrieves a piece of data and stores it in a switch
 *
 * @arg Key
 * @desc The string set when stored to access the data
 *
 * @arg Switch
 * @type switch
 * @desc The switch to store the data in
 *
 * @command Clear Data
 * @desc Removes a piece of data
 *
 * @arg Key
 * @desc The string set when stored to access the data
 *
 * @param Global Switches
 * @type switch[]
 * @default []
 * @desc Switches listed here will permanently become global, and will be saved in Global Data
 *
 * @param Global Variables
 * @type variable[]
 * @default []
 * @desc Variables listed here will permanently become global, and will be saved in Global Data
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/globaldata/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Te permite tener datos que están disponibles en todos los archivos guardados
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
 * Versión: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Descripción: Este complemento te permite tener datos globales que estarán 
 * disponibles en todos los archivos guardados. Admite datos globales manuales, 
 * como texto o números, así como datos automáticos de variables/interruptores. 
 * El guardado de datos globales se puede hacer por separado del guardado de 
 * datos regulares del juego.
 * ----------------------------------------------------------------------------
 * Documentación:
 * De forma predeterminada, los datos globales se guardan cada vez que se 
 * guarda un juego. Puede usar el plugin de complemento para guardar 
 * manualmente los datos globales sin guardar el juego.
 * 
 * Las claves distinguen entre mayúsculas y minúsculas.
 *
 * Solo puede almacenar un dato por clave. Por ejemplo, no puede almacenar
 * un número y un fragmento de texto bajo la misma clave. El último dato
 * asignado a esa clave sobrescribirá lo que se almacenó anteriormente.
 * ------------------------Comandos de Plugin----------------------------------
 * The following plugin commands are supported:
 * 
 * • Save Data
 * Saves global data without saving the rest of the game data
 *
 * • Add Text Data
 * Add text data to the global data save file
 * 
 * • Add Number Data
 * Add number data to the global data save file
 * 
 * • Add Variable Data
 * Add variable data to the global data save file
 * 
 * • Add Switch Data
 * Add switch data to the global data save file
 * 
 * • Get Data
 * Retrieve a piece of global data
 * 
 * • Get Switch Data
 * Retrieve global data and store it in a switch
 * 
 * • Clear Data
 * Remove a piece of global data
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_GlobalData.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this version fixes a bug that could cause global switches or
 * variables added later in development to not properly be reflected in a
 * saved game until the game was manually saved.
 * 
 * Version 1.0.2
 * - Fix bug with saved games and new switch or variable parameters
 *
 * @command Save Data
 * @text Guardar datos
 * @desc Guarda datos globales sin guardar el resto del juego.
 *
 * @command Add Text Data
 * @text Agregar datos de texto
 * @desc Almacena un dato.
 *
 * @arg Key
 * @text Clave
 * @desc La cadena requerida para acceder a los datos más tarde.
 *
 * @arg Text
 * @text Texto
 * @desc El texto a almacenar bajo esta clave.
 *
 * @command Add Number Data
 * @text Agregar datos numéricos
 * @desc Almacena un dato.
 *
 * @arg Key
 * @text Clave
 * @desc La cadena requerida para acceder a los datos más tarde.
 *
 * @arg number
 * @text Número
 * @type number
 * @default 0
 * @desc El número a almacenar bajo esta clave.
 *
 * @command Add Variable Data
 * @text Agregar datos variables
 * @desc Almacena un dato.
 *
 * @arg Key
 * @text Clave
 * @desc La cadena requerida para acceder a los datos más tarde.
 *
 * @arg Variable
 * @text Variable
 * @type variable
 * @default 0
 * @desc La variable a almacenar bajo esta clave.
 *
 * @command Add Switch Data
 * @text Agregar datos de cambio
 * @desc Almacena un dato.
 *
 * @arg Key
 * @text Clave
 * @desc La cadena requerida para acceder a los datos más tarde.
 *
 * @arg Switch
 * @type Interruptor
 * @default 0
 * @desc El interruptor para almacenar bajo esta clave.
 *
 * @command Get Data
 * @text Obtener data
 * @desc Recupera un dato.
 *
 * @arg Key
 * @text Clave
 * @desc The string set when stored to access the data
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @desc La variable en la cual almacenar los datos.
 *
 * @command Get Switch Data
 * @text Obtener datos de cambio
 * @desc Recupera un dato y lo almacena en un interruptor.
 *
 * @arg Key
 * @text Clave
 * @desc La cadena establecida cuando se almacena para acceder a los datos.
 *
 * @arg Switch
 * @text Interruptor
 * @type switch
 * @desc El interruptor en el cual almacenar los datos.
 *
 * @command Clear Data
 * @text Limpiar datos
 * @desc Elimina un dato.
 *
 * @arg Key
 * @text Clave
 * @desc La cadena establecida cuando se almacena para acceder a los datos.
 *
 * @param Global Switches
 * @text Interruptores globales
 * @type switch[]
 * @default []
 * @desc Los interruptores enumerados aquí se volverán globales de forma permanente y se guardarán en Datos globales.
 *
 * @param Global Variables
 * @text Variables globales
 * @type variable[]
 * @default []
 * @desc Las variables enumeradas aquí se volverán globales de forma permanente y se guardarán en Datos globales.
*/
Imported.CGMZ_GlobalData = true;
CGMZ.Versions["Global Data"] = "1.0.2";
CGMZ.GlobalData = {};
CGMZ.GlobalData.parameters = PluginManager.parameters('CGMZ_GlobalData');
CGMZ.GlobalData.GlobalSwitches = CGMZ_Utils.parseJSON(CGMZ.GlobalData.parameters["Global Switches"], [], "CGMZ Global Data", "Your Global Switches parameter was set up incorrectly and could not be read").map(x=>Number(x));
CGMZ.GlobalData.GlobalVariables = CGMZ_Utils.parseJSON(CGMZ.GlobalData.parameters["Global Variables"], [], "CGMZ Global Data", "Your Global Variables parameter was set up incorrectly and could not be read").map(x=>Number(x));
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add plugin commands for global data
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_GlobalData_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_GlobalData", "Add Text Data", this.pluginCommandGlobalDataAddDataString);
	PluginManager.registerCommand("CGMZ_GlobalData", "Add Number Data", this.pluginCommandGlobalDataAddDataNumber);
	PluginManager.registerCommand("CGMZ_GlobalData", "Add Variable Data", this.pluginCommandGlobalDataAddDataVariable);
	PluginManager.registerCommand("CGMZ_GlobalData", "Add Switch Data", this.pluginCommandGlobalDataAddDataSwitch);
	PluginManager.registerCommand("CGMZ_GlobalData", "Get Data", this.pluginCommandGlobalDataGetData);
	PluginManager.registerCommand("CGMZ_GlobalData", "Get Switch Data", this.pluginCommandGlobalDataGetSwitchData);
	PluginManager.registerCommand("CGMZ_GlobalData", "Clear Data", this.pluginCommandGlobalDataClearData);
	PluginManager.registerCommand("CGMZ_GlobalData", "Save Data", this.pluginCommandGlobalDataSaveData);
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataString = function(args) {
	$cgmzGlobal.addData(args.Key, args.Text);
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataNumber = function(args) {
	$cgmzGlobal.addData(args.Key, Number(args.number));
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataVariable = function(args) {
	$cgmzGlobal.addData(args.Key, $gameVariables.value(Number(args.Variable)));
};
//-----------------------------------------------------------------------------
// Plugin command for adding data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataAddDataSwitch = function(args) {
	$cgmzGlobal.addData(args.Key, $gameSwitches.value(Number(args.Switch)));
};
//-----------------------------------------------------------------------------
// Plugin command for retrieving data into a variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataGetData = function(args) {
	$gameVariables.setValue(Number(args.variable), $cgmzGlobal.getData(args.Key));
};
//-----------------------------------------------------------------------------
// Plugin command for retrieving data into a switch
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataGetSwitchData = function(args) {
	$gameSwitches.setValue(Number(args.Switch), $cgmzGlobal.getData(args.Key));
};
//-----------------------------------------------------------------------------
// Plugin command for clearing a single piece of data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataClearData = function(args) {
	$cgmzGlobal.clearData(args.Key);
};
//-----------------------------------------------------------------------------
// Plugin command for saving global data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandGlobalDataSaveData = function() {
	DataManager.CGMZ_saveGlobalCGMZInfo();
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Apply global data after game is loaded
//=============================================================================
//-----------------------------------------------------------------------------
// Apply global data after game load
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_GlobalData_CGMZCore_onAfterLoad.call(this);
	$cgmzGlobal.apply();
};
//=============================================================================
// CGMZ_GlobalData
//-----------------------------------------------------------------------------
// This class stores data that is available to all save files
//=============================================================================
function CGMZ_GlobalData() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.initialize = function() {
	this._data = {};
	this._globalSwitches = {};
	for(const id of CGMZ.GlobalData.GlobalSwitches) {
		this._globalSwitches[id] = false;
	}
	this._globalVariables = {};
	for(const id of CGMZ.GlobalData.GlobalVariables) {
		this._globalVariables[id] = 0;
	}
};
//-----------------------------------------------------------------------------
// Update global data for new parameters
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.updateForNewGlobalDataSwitches = function() {
	for(const id of CGMZ.GlobalData.GlobalSwitches) {
		if(!this._globalSwitches[id]) {
			this._globalSwitches[id] = false;
		}
	}
	for(const id of CGMZ.GlobalData.GlobalVariables) {
		if(!this._globalVariables[id]) {
			this._globalVariables[id] = 0;
		}
	}
};
//-----------------------------------------------------------------------------
// Apply automatic global data
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.apply = function() {
	if(!$gameSwitches || !$gameVariables) return;
	for(const id of Object.keys(this._globalSwitches)) {
		$gameSwitches.setValue(id, this._globalSwitches[id]);
	}
	for(const id of Object.keys(this._globalVariables)) {
		$gameVariables.setValue(id, this._globalVariables[id]);
	}
};
//-----------------------------------------------------------------------------
// Add Data, does not check if data exists
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.addData = function(key, contents) {
	this._data[key] = contents;
};
//-----------------------------------------------------------------------------
// Get Data, returns 0 if data does not exist
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.getData = function(key) {
	if(this._data) {
		return this._data[key];
	}
};
//-----------------------------------------------------------------------------
// Get Data, returns undefined if data does not exist
//-----------------------------------------------------------------------------
CGMZ_GlobalData.prototype.clearData = function(key) {
	if(this._data) {
		delete this._data[key];
	}
};
//=============================================================================
// DataManager
//-----------------------------------------------------------------------------
// Saving and loading CGMZ global data.
//=============================================================================
$cgmzGlobal = null;
//-----------------------------------------------------------------------------
// Initialize the $cgmzGlobal variable
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    alias_CGMZ_GlobalData_createGameObjects.call(this);
	if(!$cgmzGlobal) {
		$cgmzGlobal = new CGMZ_GlobalData();
	}
};
//-----------------------------------------------------------------------------
// Set the global switch / variables to global values
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    alias_CGMZ_GlobalData_DataManager_setupNewGame.call(this);
	$cgmzGlobal.apply();
};
//-----------------------------------------------------------------------------
// Automatic saving of cgmz global info when saving other global info
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_saveGlobalInfo = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function() {
	alias_CGMZ_GlobalData_saveGlobalInfo.call(this);
	this.CGMZ_saveGlobalCGMZInfo();
};
//-----------------------------------------------------------------------------
// Save CGMZ Global data
//-----------------------------------------------------------------------------
DataManager.CGMZ_saveGlobalCGMZInfo = function() {
	const contents = this.CGMZ_GlobalData_createGlobalSaveContents();
    StorageManager.saveObject("cgmz", contents);
};
//-----------------------------------------------------------------------------
// Make global save file info
//-----------------------------------------------------------------------------
DataManager.CGMZ_GlobalData_createGlobalSaveContents = function() {
	contents = {};
	contents.cgmz = $cgmzGlobal;
    return contents;
};
//-----------------------------------------------------------------------------
// Load global CGMZ data
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_loadGlobalInfo = DataManager.loadGlobalInfo;
DataManager.loadGlobalInfo = function() {
	alias_CGMZ_GlobalData_loadGlobalInfo.call(this);
    StorageManager.loadObject("cgmz").then(cgmzInfo => {
			this.CGMZ_GlobalData_loadCGMZGlobalData(cgmzInfo);
            return 0;
        })
        .catch(() => {
            console.warn("Could not load CGMZ global data!");
        });
};
//-----------------------------------------------------------------------------
// Load global CGMZ data
//-----------------------------------------------------------------------------
DataManager.CGMZ_GlobalData_loadCGMZGlobalData = function(contents) {
	$cgmzGlobal = contents.cgmz;
	$cgmzGlobal.updateForNewGlobalDataSwitches();
};
//=============================================================================
// Game_Switches
//-----------------------------------------------------------------------------
// Check if switch is global, make appropriate changes and save if so
//=============================================================================
//-----------------------------------------------------------------------------
// Also change global switch
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_GameSwitch_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
	alias_CGMZ_GlobalData_GameSwitch_setValue.call(this, switchId, value);
    if($cgmzGlobal._globalSwitches.hasOwnProperty(switchId)) {
		$cgmzGlobal._globalSwitches[switchId] = value;
	}
};
//=============================================================================
// Game_Variables
//-----------------------------------------------------------------------------
// Check if variable is global, make appropriate changes and save if so
//=============================================================================
//-----------------------------------------------------------------------------
// Also change global variable
//-----------------------------------------------------------------------------
const alias_CGMZ_GlobalData_GameVariables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(variableId, value) {
	alias_CGMZ_GlobalData_GameVariables_setValue.call(this, variableId, value);
	if($cgmzGlobal._globalVariables.hasOwnProperty(variableId)) {
		$cgmzGlobal._globalVariables[variableId] = value;
	}
};