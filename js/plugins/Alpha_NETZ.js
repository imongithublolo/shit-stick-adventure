/*:
 * @plugindesc (v.0.7)[BASIC] Multiplayer for RPG Maker
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/alpha-net-z/
 *
 * @help
 *
 * Alpha NET Z plugin is still in development
 *
 * WebPage: https://kdworkshop.net/plugins/alpha-net-z/
 * Documentation: https://github.com/KageDesu/Alpha-NET-Z/wiki
 *
 * Required content:
 *  - plugin Alpha_Core.js
 *  - plugin SocketIO.js
 *  - file css\anet.css
 *  - folder img\Alpha\*all files*
 *
 *

 * @param ANETZ @text @desc
 * 
 * 
 * @param connection:s
 * @text Connection
 * @type struct<LConnectionSettings>
 * @default {"serverIp":"anetzglobal.ru","serverPort":"3034","isHttpsConnection:b":"false"}
 * @desc [PRO] If you don't have own server, don't change this settings
 * 
 * 
 * @param spacer|gamesettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param gameModeSettingsGroup
 * @text Multiplayer Settings
 * 
 * @param onlySameMap:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Wait Map Transfer?
 * @default false
 * @desc When player transferred to the new map he will wait until all players not transfered on same map.
 * 
 * @param singlePlayerAllowed:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text New Game Allowed?
 * @default true
 * @desc If false, the menu item "New Game" will not be displayed in title menu
 * 
 * @param roomFilter:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Rooms Filter?
 * @on ON
 * @off OFF
 * @default false
 * @desc [PRO] If filter is ON, you can see only this (same) game rooms in lobby
 * 
 * @param saveLoadGame:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Save and Load Allowed?
 * @on YES
 * @off NO
 * @default true
 * @desc Can player save and load network game?
 * 
 * @param networkStatusIcons:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text Is show network icons?
 * @on YES
 * @off NO
 * @default true
 * @desc Network current state icons above players (menu, event, battle, etc...)
 * 
 * @param inGameChat:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text In-Game Chat?
 * @on YES
 * @off NO
 * @default false
 * @desc [PRO] In-Game chat on Map Scene? (More chat settings will be in next update...)
 * 
 * @param chatStartMessage
 * @parent inGameChat:b
 * @text Start Message
 * @default \}Welcome to Alpha NET Z, \C[1]'T'\C[6] to chat
 * @desc Message when New Game started. Leave empty if not need any start message.
 * 
 * @param chatOpenCloseKey
 * @parent inGameChat:b
 * @text Chat Key
 * @default t
 * @desc Key to open (close) chat window in game.
 * 
 * @param chatSayKey
 * @parent inGameChat:b
 * @text Say Key
 * @default t
 * @desc Key to open input message scene. Only when chat visible. Can be same with Chat Key.
 * 
 * @param clickOnChatToSay:b
 * @parent inGameChat:b
 * @type boolean
 * @text Is click to Say?
 * @on YES
 * @off NO
 * @default true
 * @desc Click in chat window to open input message scene. Only when chat visible.
 * 
 * @param playerMenuSettingsGroup:b
 * @parent gameModeSettingsGroup
 * @type boolean
 * @text In-Game Player Menu?
 * @on YES
 * @off NO
 * @default true
 * @desc [PRO] In-Game player menu? (Right mouse click on another player to open menu)
 * 
 * @param defaultIPLMenuCommands
 * @parent playerMenuSettingsGroup:b
 * @text Default Commands
 * @desc Default menu commands
 * 
 * @param PlayerMenuItem_trade:s
 * @parent defaultIPLMenuCommands
 * @text Trade
 * @type struct<LPlayerMenuOption> 
 * @desc Send trade request for another player
 * @default {"text:str":"Trade","visible:b":"true","switchId:i":"0","minDist:i":"1","value:i":"0"}
 * 
 * @param PlayerMenuItem_status:s
 * @parent defaultIPLMenuCommands
 * @text Status
 * @type struct<LPlayerMenuOption> 
 * @desc Show another player character status screen
 * @default {"text:str":"Status","visible:b":"true","switchId:i":"0","minDist:i":"0","value:i":"0"}
 * 
 * @param PlayerMenuItem_follow:s
 * @parent defaultIPLMenuCommands
 * @text Follow
 * @type struct<LPlayerMenuOption> 
 * @desc Start following another player character on map
 * @default {"text:str":"Follow","visible:b":"true","switchId:i":"0","minDist:i":"0","value:i":"0"}
 * 
 * @param userIPLMenuCommands:structA
 * @parent playerMenuSettingsGroup:b
 * @text Custom Commands
 * @type struct<LPlayerMenuOption>[]
 * @desc Your commands for player menu
 * @default []
 * 
 * @param tradeSettingsGroup
 * @parent gameModeSettingsGroup
 * @text Trade Settings
 * @desc [PRO] Trade between players
 * 
 * @param isTradeModalWindowActive:b
 * @parent tradeSettingsGroup
 * @type boolean
 * @text Is need trade confirm window?
 * @on YES
 * @off NO
 * @default true
 * @desc If false - trade will start immedently for paleyr when someone sent trade request for him
 * 
 * @param tradeModalWindow_openSE
 * @parent isTradeModalWindowActive:b
 * @text Confirm window SE
 * @type file
 * @require 1
 * @dir audio/se/
 * @default Bell3
 * @desc SE when trade confirm window is pop up
 * 
 * @param tradeModalWindow_text
 * @parent isTradeModalWindowActive:b
 * @text Trade request text
 * @default Accept \C[1]Trade\C[0] from \C[2]%1\C[0]?
 * @desc Trade confirm window text. %1 - another player name (who requested trade with you).
 * 
 * @param tradeModalWindow_hkYes
 * @parent isTradeModalWindowActive:b
 * @text Hotkey for Yes
 * @default y
 * @desc Hotkey for answer "Yes" (case sensetive)
 * 
 * @param tradeModalWindow_hkNo
 * @parent isTradeModalWindowActive:b
 * @text Hotkey for No
 * @default n
 * @desc Hotkey for answer "No" (case sensetive)
 * 
 * 
 * @param playersSettingsGroup
 * @text Players Settings
 * 
 * @param actorsForNetwork:intA
 * @parent playersSettingsGroup
 * @type actor[]
 * @text Actors
 * @default ["1","2","3","4"]
 * @desc Available actors for network game players. More than 2 - PRO only.
 * 
 * @param isActorSelectionAllowed:b
 * @parent playersSettingsGroup
 * @text Actor selection?
 * @type boolean
 * @default true
 * @desc Can player select actor in lobby?
 * 
 * @param isSinglePlayerStartAllowed:b
 * @parent playersSettingsGroup
 * @text One player start?
 * @type boolean
 * @default true
 * @desc If in room only 1 player (host), he can start game alone?
 * 
 * @param playerActorNameType
 * @parent playersSettingsGroup
 * @text Player Name for Actor
 * @type select
 * @option Not Show
 * @option Instead Name
 * @option Instead Nickname
 * @default Instead Nickname
 * @desc Show network player name instead of his Actor name (or nickname)
 * 
 * @param playerLeaveGameCommonEvent:int
 * @parent playersSettingsGroup
 * @text On Player Disconnect CE
 * @type common_event
 * @default 0
 * @desc That common event will be called when somebody leave (disconnect) game. 0 - nothing
 * 
 * @param globalData:s
 * @text Global Data
 * @type struct<LGlobalData>
 * @default {"globalVariablesIds:intA":"[]","globalSwitchesIds:intA":"[]"}
 * @desc All this data will be automatically synchronized between all players
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 


 * @command EventStartOptions
 * @text Event Options
 * @desc Event network start options
 * 
 * @arg whoSelector
 * @text Who can start
 * @type select
 * @option All
 * @option Master
 * @option Master Except
 * @option Actor List
 * @option Actor List Except
 * @desc Select who can start this event
 * @default All
 * 
 * @arg actorList
 * @text Actors List
 * @type actor[]
 * @default []
 * @desc Actors list for 'Execute For' if you select 'Actor List' or 'Actor List Except'
 * 
 * @arg lockMode
 * @text Lock Event?
 * @type boolean
 * @default false
 * @desc If true - event will be locked while executed. Nobody can't start locked event
 * 
 * @arg sharedMode
 * @text Shared Mode
 * @type select
 * @option No
 * @option Strict
 * @option Optional
 * @desc Shared event - starts for all players simultaneously, synchronized commands execution
 * @default No
 * 
 * 
 * @command EventCommandSelector
 * @text Command Options
 * @desc Next Event Command network start options
 * 
 * @arg whoSelector
 * @text Execute for
 * @type select
 * @option All
 * @option Master
 * @option Master Except
 * @option Actor List
 * @option Actor List Except
 * @option Me Except
 * @desc Select for who this event command will be executed
 * @default All
 * 
 * @arg actorList
 * @text Actors List
 * @type actor[]
 * @default []
 * @desc Actors list for 'Execute For' if you select 'Actor List' or 'Actor List Except'
 * 
 * @arg scope
 * @text Scope
 * @type select
 * @option Same map
 * @option All world
 * @default Same map
 * @desc For which players will the virtual command be executed?
 * 
 * @arg executeMode
 * @text Execute Mode
 * @type select
 * @option Auto
 * @option Virtual
 * @option Common Event
 * @default Auto
 * @desc How this command will be exectuted for other players. Read Wiki for more info
 * 
 * @command SharedBattle
 * @text Set Shared Battle
 * @desc Make next Battle Processing command shared between all players
 * 
 * @arg battleId
 * @text ID
 * @default
 * @desc Unique battle ID. Empty - not shared battle (by default)
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 * 


 */
/*~struct~LConnectionSettings:

@param serverIp
@text IP
@type combo
@option localhost
@option anetzglobal.ru
@desc Server IP address (ip4) or domain name
@default anetzglobal.ru

@param serverPort
@text Port
@default 3034

@param isHttpsConnection:b
@text Is HTTPS (SSL) ?
@type boolean
@on Yes, https
@off No, http
@default false
@desc Is use secure connection via https protocol? anetzglobal.ru uses port 3035 for secure connection.

*/

/*~struct~LGlobalData:

@param globalVariablesIds:intA
@type variable[]
@text Variables
@default []
@desc Variables for auto synchronizaton

@param globalSwitchesIds:intA
@type switch[]
@text Switches
@default []
@desc Switches for auto synchronizaton

*/

/*~struct~LPlayerMenuOption:

 @param text:str
 @text Title
 @type text 
 @desc Option title. Supports control-characters, like \C[x] for color
 @default Option 

 @param visible:b
 @text Is Visible?
 @type boolean 
 @on Yes
 @off No
 @desc Is this option visible in Player Menu? If false - not appears in menu at all
 @default true 

 @param switchId:i
 @text Switch ID
 @type switch 
 @desc Switch ID for enable this option. 0 - always enabled, no any switch
 @default 0 

 @param minDist:i
 @text Active distance
 @type number 
 @min 0
 @max 100
 @desc Minimum distance between players for enable this option. 0 - any distance, no limit
 @default 0

 @param value:i
 @text Common Event
 @type common_event
 @desc Common event ID for this command
 @default 0
*/
// * INITIAL S FILE

var Imported = Imported || {};
Imported.Alpha_NETZ = true;

var ANET = {};
ANET.Version = 70; // 0.7.0

ANET.MinServerRev = 113; // * Необходимая ревизия сервера

// * Данный символ переопределяется в 1_DevSymbol_TEST как dev
ANET._define = 'build'; // * По умолчанию -> сборка

ANET.link = function (library) {
    this[library.name] = library;
};

ANET.isDEV = function () {
    return ANET._define == 'dev';
};

ANET.w = (e) => AA.w(e);

if(!Imported.Alpha_Core) {

    if(ANET.isDEV()) {
        console.warn("Alpha NETZ require Alpha_@Core plugin!");
    } else
        alert("Alpha NETZ require Alpha_@Core plugin!");
} else {
    try {
        
        if(AA.Core.version < 0.3) {
            if(ANET.isDEV()) {
                console.warn("Alpha NETZ require Alpha_@Core version 0.3 or above");
            } else
                alert("Alpha NETZ require Alpha_@Core version 0.3 or above!");
        }

    } catch (error) {
        console.warn("Something wrong with Alpha_@Core plugin");
        console.warn(error);
    }
}

ANET.isPro = function() {
    return false;
};
//Compressed by MV Plugin Builder
(function(){var a0_0x5862=['TYxEW','_isWaitServer','Network\x20inited','xAVSz','getGameVersion','room','closeRoom','isMZ','YfnZV','NysQi','serverPort','fullName','ANNetwork','isOnlySameMapMode','socket','You\x20try\x20get\x20data\x20from\x20Server,\x20but\x20NOT\x20connection!','Connect\x20to\x20','kRdKo','get','actorsForNetwork','isConnected','DAKHt','stop','Color','UnjXU','length','NET','setColors','Send,\x20callback:\x20','3034','isMasterClient','send','isSameMapMode','startConnection','_isHost','ZKpjs','reset','anetzglobal.ru','onLeaveRoom','2rYeiDo','You\x20are\x20Master\x20(host)\x20of\x20room:\x20','evwhk','hideLoader','showLoader','Response\x20(get)\x20for:\x20','vwVbS','setRoomMaster','You\x20try\x20send\x20message,\x20but\x20NOT\x20connection!','1VDozpg','1RDHuvD','7624cAzbji','GREEN','requestRoomRefresh','You\x20try\x20connect\x20via\x20HTTPS\x20connection\x20with\x20port\x203034\x20(http)','warn','Lobby','BDqbb','myId','gameTitle','You\x20try\x20send\x20callback\x20message,\x20but\x20NOT\x20connection!','Trace','PDKVe','1YpuCGq','Yxizt','client','log','112RHHivn','Send,\x20get!:\x20','http://','setRoomJoin','apply','setWait','onRoomClosed','https://','241131zuCJeC','820838JrMbyM','cPzbF','195.161.41.20','320590gjbyqp','isShouldWaitServer','150814Hrnxhv','ToIev','setFrom','Callback\x20for:\x20','Using\x20HTTPS\x20secure\x20connection','You\x20are\x20joined\x20to\x20room:\x20','OzPoL','Send:\x20','cbJmO','resetWait','setConnectionToMasterCallback','jzRVE','50199DVqCuH','NENQQ','disconnect','ADtNH','942013MXidoB','uxPca','initSystem','isWaitServer','leaveRoom','ygNaZ','XSFMG','name','callback','BLACK'];var a0_0x3f2137=a0_0xeddf;function a0_0xeddf(_0x323a43,_0x40f89e){_0x323a43=_0x323a43-0xc5;var _0x586255=a0_0x5862[_0x323a43];return _0x586255;}(function(_0x13de1e,_0x4a9ace){var _0x418513=a0_0xeddf;while(!![]){try{var _0x3628ba=parseInt(_0x418513(0xe3))*-parseInt(_0x418513(0x124))+parseInt(_0x418513(0xef))+-parseInt(_0x418513(0xc5))*-parseInt(_0x418513(0xd5))+parseInt(_0x418513(0xd1))*-parseInt(_0x418513(0xdd))+parseInt(_0x418513(0xde))+parseInt(_0x418513(0x12e))*parseInt(_0x418513(0xe1))+-parseInt(_0x418513(0x12d))*parseInt(_0x418513(0xf3));if(_0x3628ba===_0x4a9ace)break;else _0x13de1e['push'](_0x13de1e['shift']());}catch(_0xd793e){_0x13de1e['push'](_0x13de1e['shift']());}}}(a0_0x5862,0x88e67),window[a0_0x3f2137(0x109)]=function(){},window[a0_0x3f2137(0x117)]=window[a0_0x3f2137(0x109)],function(){var _0x599076=a0_0x3f2137,_0x402892,_0x3164e8;_0x402892=new KDCore['DevLog']('Network'),_0x402892[_0x599076(0x118)](KDCore[_0x599076(0x114)][_0x599076(0xc6)],KDCore[_0x599076(0x114)][_0x599076(0xfc)]['getLightestColor'](0x23)),_0x402892['on'](),_0x3164e8=window[_0x599076(0x109)],_0x3164e8[_0x599076(0x111)]=function(){var _0x33f929=_0x599076;return this[_0x33f929(0x10b)]!=null;},_0x3164e8[_0x599076(0xcc)]=function(){var _0x3c721f=_0x599076;if(_0x3c721f(0xee)!==_0x3c721f(0xee)){function _0x23e810(){return;}}else{var _0x5877cc;return(_0x5877cc=this['socket'])!=null?_0x5877cc['id']:void 0x0;}},_0x3164e8[_0x599076(0x11b)]=function(){var _0x200bb8=_0x599076;return this[_0x200bb8(0x11f)]===!![];},_0x3164e8[_0x599076(0x11d)]=function(){var _0xd5ee37=_0x599076;return ANET['PP'][_0xd5ee37(0x10a)]();},_0x3164e8['isBusy']=function(){var _0x57ae6f=_0x599076;if(_0x57ae6f(0xf8)===_0x57ae6f(0xdf)){function _0x3a5322(){var _0x24929a=_0x57ae6f;return{'id':_0x3df5d3['VD'][_0x24929a(0x101)](),'title':_0x5d4cd4[_0x24929a(0xcd)],'version':_0x20a8f2['isMZ']()?0x0:0x1,'maxPlayers':_0x4d1c94['PP'][_0x24929a(0x110)]()[_0x24929a(0x116)],'mode':0x0};}}else return this[_0x57ae6f(0x111)]()&&(this[_0x57ae6f(0xf6)]()||ANGameManager[_0x57ae6f(0xe2)]());},_0x3164e8['isWaitServer']=function(){var _0x19e45d=_0x599076;return this[_0x19e45d(0x111)]()&&this[_0x19e45d(0xfe)]===!![];},_0x3164e8[_0x599076(0xda)]=function(){var _0x458a03=_0x599076;return this[_0x458a03(0xfe)]=!![];},_0x3164e8['resetWait']=function(){var _0x58c11e=_0x599076;return this[_0x58c11e(0xfe)]=![];},function(){var _0x1d5e03=_0x599076;return _0x3164e8[_0x1d5e03(0xf5)]=function(){var _0x5b17db=_0x1d5e03;return this['socket']=null,this['client']=null,this[_0x5b17db(0xec)](),this[_0x5b17db(0x11f)]=![],_0x5b17db(0xff)['p']();},_0x3164e8[_0x1d5e03(0x113)]=function(){var _0x36543c=_0x1d5e03,_0x5294cc;NetClientMethodsManager[_0x36543c(0xed)](null);if((_0x5294cc=this[_0x36543c(0xd3)])!=null){if(_0x36543c(0x106)===_0x36543c(0xe4)){function _0x53ce6c(){var _0x5100c0=_0x36543c;return this[_0x5100c0(0x111)]()&&this['_isWaitServer']===!![];}}else _0x5294cc[_0x36543c(0xf1)]();}this[_0x36543c(0xec)](),this['socket']=null,ANGameManager[_0x36543c(0x121)]();},_0x3164e8['startConnection']=function(){var _0x3ee3ce=_0x1d5e03,_0x28510e,_0x1a3bb2,_0x42d4de,_0x5a2785,_0xa0730;_0x1a3bb2=ANET['PP']['serverIp'](),_0x5a2785=ANET['PP'][_0x3ee3ce(0x107)]();if(ANET['PP']['isHTTPSConnection']()===!![]){if(_0x3ee3ce(0x100)===_0x3ee3ce(0x100))console[_0x3ee3ce(0xd4)](_0x3ee3ce(0xe7)),_0xa0730=_0x3ee3ce(0xdc),_0x42d4de={'secure':!![],'reconnect':!![],'rejectUnauthorized':![]},_0x5a2785===_0x3ee3ce(0x11a)&&(_0x1a3bb2===_0x3ee3ce(0x122)||'195.161.41.20')&&(console[_0x3ee3ce(0xc9)](_0x3ee3ce(0xc8)),console[_0x3ee3ce(0xc9)]('Port\x20changed\x20to\x203035.\x20Check\x20Connection\x20plugin\x20parameter'),_0x5a2785=0xbdb);else{function _0x2a92e8(){var _0x9d2305=_0x3ee3ce;return this[_0x9d2305(0x10b)]=null,this['client']=null,this['resetWait'](),this['_isHost']=![],_0x9d2305(0xff)['p']();}}}else{if(_0x3ee3ce(0x112)!=='OefDG')_0xa0730=_0x3ee3ce(0xd7),_0x42d4de={};else{function _0x4cff4c(){_0x1c2e2a['p']('You\x20try\x20get\x20data\x20from\x20Server,\x20but\x20NOT\x20connection!');}}}_0x28510e=_0xa0730+_0x1a3bb2+':'+_0x5a2785,console[_0x3ee3ce(0xd4)](_0x3ee3ce(0x10d)+_0x28510e),this[_0x3ee3ce(0x10b)]=io(_0x28510e,_0x42d4de),this[_0x3ee3ce(0xd3)]=new NetworkClientHandler(this[_0x3ee3ce(0x10b)]);},_0x3164e8['setConnection']=function(_0x84e9c7){var _0x47b296=_0x1d5e03;NetClientMethodsManager[_0x47b296(0xed)](_0x84e9c7),this['startConnection']();},_0x3164e8[_0x1d5e03(0x11c)]=function(_0x25b999,_0x35504f=![]){var _0x9f235d=_0x1d5e03;if(!this[_0x9f235d(0x111)]()){if(_0x9f235d(0xd2)!==_0x9f235d(0xf9))_0x402892['p']('You\x20try\x20send\x20message,\x20but\x20NOT\x20connection!');else{function _0x4324e8(){var _0x1391d6=_0x9f235d;if(!this[_0x1391d6(0x111)]())return;this[_0x1391d6(0x11c)](_0x29f9b3[_0x1391d6(0xca)]('getRoomData'));}}}else{if(_0x9f235d(0x115)===_0x9f235d(0x115))!_0x35504f&&_0x402892['p'](_0x9f235d(0xea)+_0x25b999[_0x9f235d(0x108)]()),_0x25b999[_0x9f235d(0xe5)](this[_0x9f235d(0x10b)]['id'])[_0x9f235d(0x11c)]();else{function _0x315ffe(){return;}}}},_0x3164e8[_0x1d5e03(0x10f)]=function(_0x426bc6,_0x42e171,_0x3db399,_0xc9109f=0x7d0){var _0x492c26=_0x1d5e03,_0x1e9939,_0x5037bb,_0x512d84;if(!this[_0x492c26(0x111)]()){if(_0x492c26(0x126)===_0x492c26(0x126))_0x402892['p'](_0x492c26(0x10c));else{function _0x3b1e75(){var _0x19cbac=_0x492c26;if(!this[_0x19cbac(0x11b)]())return;if(this['room']==null)return;this['send'](_0x2420fc[_0x19cbac(0xca)]('closeRoom'));}}}else _0x512d84=_0x426bc6['fullName'](),this[_0x492c26(0xda)](),HUIManager[_0x492c26(0x128)](),_0x5037bb=function(..._0x38fbce){var _0x40e93c=_0x492c26;if(_0x40e93c(0x12a)===_0x40e93c(0x12a))return _0x402892['p']('Timeout\x20for:\x20'+_0x512d84),_0x3db399!=null&&_0x3db399[_0x40e93c(0xd9)](this,_0x38fbce),ANNetwork[_0x40e93c(0xec)](),HUIManager[_0x40e93c(0x127)]();else{function _0x2463d8(){return _0x48621d['p']('Callback\x20for:\x20'+_0x20b30b),_0x1e52f4['apply'](this,_0xe494dc);}}},_0x1e9939=function(..._0x4ebada){var _0x45ca61=_0x492c26;_0x402892['p'](_0x45ca61(0x129)+_0x512d84);if(_0x42e171!=null){if(_0x45ca61(0xf2)!=='tbbzQ')_0x42e171[_0x45ca61(0xd9)](this,_0x4ebada);else{function _0x48ae70(){var _0x53e520=_0x45ca61;_0x954a65[_0x53e520(0xf1)]();}}}return ANNetwork[_0x45ca61(0xec)](),HUIManager[_0x45ca61(0x127)]();},_0x402892['p'](_0x492c26(0xd6)+_0x512d84),_0x426bc6['setFrom'](this[_0x492c26(0x10b)]['id'])[_0x492c26(0x10f)](_0x1e9939,_0x5037bb,_0xc9109f);},_0x3164e8['callback']=function(_0x3a33ac,_0x56c25e){var _0x4238da=_0x1d5e03,_0x5c3971,_0x4f328b;if(!this['isConnected']())_0x402892['p'](_0x4238da(0xce));else{if(_0x4238da(0xd0)!==_0x4238da(0xd0)){function _0x1f027e(){var _0x4435de=_0x4238da;!this[_0x4435de(0x111)]()?_0x1ada00['p'](_0x4435de(0x12c)):(!_0x401e47&&_0x65743a['p'](_0x4435de(0xea)+_0x127198[_0x4435de(0x108)]()),_0x17a698[_0x4435de(0xe5)](this[_0x4435de(0x10b)]['id'])[_0x4435de(0x11c)]());}}else _0x4f328b=_0x3a33ac[_0x4238da(0x108)](),_0x5c3971=function(..._0xba07ee){var _0x491c9d=_0x4238da;if('kRdKo'===_0x491c9d(0x10e))return _0x402892['p'](_0x491c9d(0xe6)+_0x4f328b),_0x56c25e[_0x491c9d(0xd9)](this,_0xba07ee);else{function _0x5b8d43(){var _0x517d26=_0x491c9d;return this[_0x517d26(0xfe)]=!![];}}},_0x402892['p'](_0x4238da(0x119)+_0x4f328b),_0x3a33ac[_0x4238da(0xe5)](this['socket']['id'])[_0x4238da(0xfb)](_0x5c3971);}},_0x3164e8['trace']=function(_0x623a79){var _0xfdc65c=_0x1d5e03;return this[_0xfdc65c(0x11c)](NMS[_0xfdc65c(0xcf)](_0x623a79));};}(),function(){var _0x181adb=_0x599076;if(_0x181adb(0xeb)!=='EEiwg')return _0x3164e8[_0x181adb(0x12b)]=function(_0x2e2e4a){var _0x55d41f=_0x181adb;if(_0x55d41f(0xe9)!=='OzPoL'){function _0x4c7ef4(){var _0x5e0c1c=_0x55d41f;_0x4bd2ce[_0x5e0c1c(0xed)](_0x39ae1a),this[_0x5e0c1c(0x11e)]();}}else return this[_0x55d41f(0x102)]=_0x2e2e4a,this[_0x55d41f(0x11f)]=!![],_0x402892['p'](_0x55d41f(0x125)+this[_0x55d41f(0x102)][_0x55d41f(0xfa)]);},_0x3164e8[_0x181adb(0xd8)]=function(_0x2b21c2){var _0x591d54=_0x181adb;return this[_0x591d54(0x102)]=_0x2b21c2,this[_0x591d54(0x11f)]=![],_0x402892['p'](_0x591d54(0xe8)+this[_0x591d54(0x102)][_0x591d54(0xfa)]);},_0x3164e8['onRoomDataFromServer']=function(_0x3a43ec){var _0x48712e=_0x181adb;this[_0x48712e(0x102)]=_0x3a43ec;},_0x3164e8[_0x181adb(0xdb)]=function(){var _0x5c3fbf=_0x181adb;if(_0x5c3fbf(0xfd)==='yMaau'){function _0x16cf75(){var _0x20abbf=_0x5c3fbf;return this[_0x20abbf(0x102)]=_0x5317c6,this[_0x20abbf(0x11f)]=!![],_0x22190a['p'](_0x20abbf(0x125)+this[_0x20abbf(0x102)][_0x20abbf(0xfa)]);}}else{if(!this[_0x5c3fbf(0x111)]())return;if(this[_0x5c3fbf(0x102)]==null){if(_0x5c3fbf(0xf4)!==_0x5c3fbf(0xf4)){function _0x479305(){var _0x3850ab=_0x5c3fbf;_0xac62de=_0x3850ab(0xd7),_0xd0a407={};}}else return;}this['leaveRoom'](),this['_isHost']=![],this[_0x5c3fbf(0x102)]=null;}},_0x3164e8['closeRoom']=function(){var _0xa23fa3=_0x181adb;if(_0xa23fa3(0xcb)!=='cTBGA'){if(!this['isMasterClient']()){if('IYveo'!=='FSCaj')return;else{function _0x483dfc(){var _0x4779a2=_0xa23fa3;_0x43b957['log']('Using\x20HTTPS\x20secure\x20connection'),_0xa01ecf=_0x4779a2(0xdc),_0x871fbd={'secure':!![],'reconnect':!![],'rejectUnauthorized':![]},_0x20219b===_0x4779a2(0x11a)&&(_0x1d6ee6===_0x4779a2(0x122)||_0x4779a2(0xe0))&&(_0x1787d1[_0x4779a2(0xc9)](_0x4779a2(0xc8)),_0x56c2af[_0x4779a2(0xc9)]('Port\x20changed\x20to\x203035.\x20Check\x20Connection\x20plugin\x20parameter'),_0x4d3946=0xbdb);}}}if(this[_0xa23fa3(0x102)]==null)return;this[_0xa23fa3(0x11c)](NMS[_0xa23fa3(0xca)](_0xa23fa3(0x103)));}else{function _0x1fd41d(){var _0x40d662=_0xa23fa3;if(!this[_0x40d662(0x111)]())return;if(this['room']==null)return;this[_0x40d662(0xf7)](),this[_0x40d662(0x11f)]=![],this[_0x40d662(0x102)]=null;}}},_0x3164e8[_0x181adb(0xf7)]=function(){var _0x42eeb6=_0x181adb;if(_0x42eeb6(0x120)===_0x42eeb6(0x105)){function _0x2d0fbd(){var _0x3d3b30=_0x42eeb6;return _0xa3359c['p']('Timeout\x20for:\x20'+_0x3c3e5e),_0x1d68dc!=null&&_0x574526[_0x3d3b30(0xd9)](this,_0x350948),_0x170b59[_0x3d3b30(0xec)](),_0x23f113[_0x3d3b30(0x127)]();}}else{if(this[_0x42eeb6(0x102)]==null)return;ANGameManager[_0x42eeb6(0x123)](),this[_0x42eeb6(0x11c)](NMS[_0x42eeb6(0xca)](_0x42eeb6(0xf7),this[_0x42eeb6(0x102)][_0x42eeb6(0xfa)]));}},_0x3164e8[_0x181adb(0xc7)]=function(){var _0x1398f3=_0x181adb;if(!this['isConnected']())return;this['send'](NMS[_0x1398f3(0xca)]('getRoomData'));};else{function _0x1498dc(){var _0x37729e=_0x181adb;return this[_0x37729e(0x11f)]===!![];}}}(),_0x3164e8['getNetworkGameInfoData']=function(){var _0x45ec12=_0x599076;if(_0x45ec12(0xf0)==='NENQQ')return{'id':ANET['VD'][_0x45ec12(0x101)](),'title':$dataSystem[_0x45ec12(0xcd)],'version':KDCore[_0x45ec12(0x104)]()?0x0:0x1,'maxPlayers':ANET['PP']['actorsForNetwork']()[_0x45ec12(0x116)],'mode':0x0};else{function _0x27c1d7(){return;}}};}());
})();

// Generated by CoffeeScript 2.6.1
// * Глабольный менеджер с основными методами системы
ANET.System = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.System;
  (function() {    // * Начальная загрузка компонентов
    // -----------------------------------------------------------------------
    //TODO: * Лог свой для сообщений версий
    _.initSystem = function() {
      "INIT ANET SYSTEM".p();
      this.loadParameters();
      this.applyParameters();
      ANET.loadPluginCommands();
      HUIManager.init();
    };
    _.loadParameters = function() {
      return ANET.PP = new ANET.ParamsManager();
    };
    _.applyParameters = function() {};
  })();
  // -----------------------------------------------------------------------

  // * Все эти команды нельзя запускать через опции (виртуально), но
  // * их теоретически можно вызывать через общее событие у другого игрока
  //TODO: Например конфигурация классов (dinamyc методов)
  _.ForbiddenVirtualCommandsList = [
    // * Message
    101,
    102,
    103,
    104,
    105,
    // * Flow Control
    111,
    112,
    113,
    115,
    118,
    119,
    108,
    // * Party
    129,
    // * Movement
    201,
    202,
    204,
    206,
    // * Character
    216,
    217,
    // * Timing
    230,
    // * Scene Control
    302,
    303,
    351,
    352,
    // * System Settings
    137,
    // * Meta
    0,
    401,
    402,
    403,
    411,
    413,
    657
  ];
  // * Список комманд которые запускаются через общее событие, а не виртуально
  _.NonVirtualCommandsList = [
    // * Flow Control
    117,
    // * Scene Control
    301
  ];
  // * Дополнительные полня для синхронизации в битве
  _.BattlerObserverFields = [
    "_tpbChargeTime",
    //"_tpbCastTime"
    //"_tpbIdleTime"
    //"_tpbTurnCount"
    //"_tpbTurnEnd"
    //"_speed"
    //"_actionState"
    //"_damagePopup"
    //"_effectType"
    //"_motionType"
    //"_weaponImageId"
    //"_motionRefresh"
    //"_selected"
    "_tpbState"
  ];
  _.ActorObserverFields = ["_name", "_nickname", "_classId", "_level", "_characterName", "_characterIndex", "_faceName", "_faceIndex", "_battlerName", "_exp", "_equips"];
  return _.EnemyObserverFields = [
    "_enemyId",
    //"_letter"
    //"_plural"
    "_screenX",
    "_screenY"
  ];
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Данный менедреж отвечает за различие в версиях плагина для MZ и MV
ANET.VD = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.VD;
  _.getGameVersion = function() {
    if (KDCore.isMZ()) {
      return $dataSystem.advanced.gameId;
    } else {
      return $dataSystem.versionId;
    }
  };
  return _.getWindowBackgroundType = function() {
    if (KDCore.isMZ()) {
      return 2;
    } else {
      return 0;
    }
  };
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x35df=['mouseenter','notifyError','add','499qKTTCg','anetCanvasElements','_onKeyDown','hideWaitingInfo','ogsrn','9xcmcRJ','clear','removeInput','27xwVAiZ','classList','rhNUZ','_createNotify','DlbvV','showInput','beforeend','createElement','warn','drbdl','<link\x20rel=\x22stylesheet\x22\x20href=\x22css/anet.css\x22\x20/>','init','HBxHX','error','blockquote','3083hKBEGt','anetLoader','anetInputName','hWsrf','focusInput','showLoader','tvlmE','form__group','appendChild','5BGTazf','30LhAchB','keyCode','<cite>','3642qZmTiy','body','isWaitingInfoActive','getElementsByTagName','_createWaitPlayersAlert','bjeYD','_shouldPreventDefault','isUnderMouse','style','gjgMN','vRHRY','tRWuB','anetInput','qsfsB','goAvF','</p>','_disableContextMenu','_waitingInfoThread','327993WcbmmL','_loader','10223ChyPkK','value','</label>','getInputValue','_canvasRelativeElements','_notify','24919ckkShE','_isMouseHoverHtmlElement','_loaderThread','_createInputField','width','success','eFhdB','mouseleave','38703zeZzFn','addEventListener','_centerElement','_input','_createRelativeParent','JPOBZ','<p>','LrVhp','center','isLoaderActive','_waitPlayers','FzjVg','setInputValue','\x22\x20autocomplete=\x22off\x22\x20name=\x22anetInputName\x22\x20id=\x27anetInputName\x27\x20required\x20/>\x20<label\x20for=\x22anetInputName\x22\x20class=\x22form__label\x22>','72wUuFns','HUIManager','height','LoLgR','speech-bubble','nCzIM','isInputActive','log','call','head','removeChild','sJdJM','<input\x20type=\x22input\x22\x20class=\x22form__field\x22\x20placeholder=\x22','</cite>','prototype','notifySucess','insertAdjacentHTML','getElementById','_loadCSS','yvrfn','field','2mTwAOD','qXHhA','_createLoadSpinner','zIndex','bottom','fyfeY','_updateCanvas','focus','div','updateCanvasHtmlElements','vRVyP','anetWaitPlayersAlert'];function a0_0x57fc(_0x3b3f33,_0x3a1a2b){_0x3b3f33=_0x3b3f33-0x131;var _0x35dfd8=a0_0x35df[_0x3b3f33];return _0x35dfd8;}var a0_0xfe1f38=a0_0x57fc;(function(_0x1a1d93,_0x424463){var _0x224783=a0_0x57fc;while(!![]){try{var _0x3a593b=-parseInt(_0x224783(0x14c))*parseInt(_0x224783(0x16c))+parseInt(_0x224783(0x163))*parseInt(_0x224783(0x16d))+-parseInt(_0x224783(0x13d))*parseInt(_0x224783(0x18a))+parseInt(_0x224783(0x151))*-parseInt(_0x224783(0x192))+-parseInt(_0x224783(0x182))+-parseInt(_0x224783(0x154))*-parseInt(_0x224783(0x170))+-parseInt(_0x224783(0x184))*-parseInt(_0x224783(0x1a0));if(_0x3a593b===_0x424463)break;else _0x1a1d93['push'](_0x1a1d93['shift']());}catch(_0x4f1c95){_0x1a1d93['push'](_0x1a1d93['shift']());}}}(a0_0x35df,0x30653),window[a0_0xfe1f38(0x1a1)]=function(){},function(){var _0x2dbebe=a0_0xfe1f38,_0x3f58e8;_0x3f58e8=window['HUIManager'],_0x3f58e8[_0x2dbebe(0x15f)]=function(){var _0xbd0b6a=_0x2dbebe;this['_isMouseHoverHtmlElement']=![],this[_0xbd0b6a(0x13a)](),this[_0xbd0b6a(0x196)](),this[_0xbd0b6a(0x13f)](),this[_0xbd0b6a(0x157)](),Graphics[_0xbd0b6a(0x180)]();},_0x3f58e8[_0x2dbebe(0x177)]=function(){var _0x3cc804=_0x2dbebe;if('iTpfB'==='iTpfB')return this[_0x3cc804(0x18b)]===!![];else{function _0x3849b0(){var _0x599656=_0x3cc804,_0x4f8304,_0x51f242;_0x51f242=_0x47ad7c,_0x4f8304=_0x51f242[_0x599656(0x143)],_0x51f242['_updateCanvas']=function(){var _0x32d93d=_0x599656;return _0x4f8304[_0x32d93d(0x1a8)](this),_0xd4c8d6['updateCanvasHtmlElements']();};}}},_0x3f58e8['onGameSceneChanged']=function(){var _0x2efc5c=_0x2dbebe;if(_0x2efc5c(0x133)!=='TZDvt')return this[_0x2efc5c(0x14f)]();else{function _0x287d52(){var _0xddbb83=_0x2efc5c,_0x23d7f7;try{return this[_0xddbb83(0x189)]['success'](_0x18e59e);}catch(_0x70a585){return _0x23d7f7=_0x70a585,_0x45d879['warn'](_0x23d7f7);}}}},_0x3f58e8[_0x2dbebe(0x168)]=function(_0x278167=0xc8){var _0x17ebc0=_0x2dbebe,_0x53a28a;try{if(this[_0x17ebc0(0x19b)]())return;this['_loaderThread']=setTimeout(function(){var _0x57567a=_0x17ebc0;if('rNdyZ'==='rNdyZ'){if(!document[_0x57567a(0x139)](_0x57567a(0x164))){if(_0x57567a(0x1a5)!==_0x57567a(0x179))return document[_0x57567a(0x171)][_0x57567a(0x16b)](HUIManager['_loader']);else{function _0x129158(){return;}}}}else{function _0x4f262c(){return'';}}},_0x278167);}catch(_0x254663){if('vRHRY'!==_0x17ebc0(0x17a)){function _0x487471(){var _0xae943f=_0x17ebc0;this['_notify']=new _0x1664e6({'duration':0x578,'position':{'x':_0xae943f(0x19a),'y':_0xae943f(0x141)},'ripple':![]});}}else _0x53a28a=_0x254663,console[_0x17ebc0(0x15c)](_0x53a28a);}},_0x3f58e8['hideLoader']=function(){var _0x414990=_0x2dbebe,_0x5bc6cc;try{if(_0x414990(0x160)===_0x414990(0x160)){if(!this[_0x414990(0x19b)]())return;clearTimeout(this[_0x414990(0x18c)]),this[_0x414990(0x18c)]=null,document[_0x414990(0x139)]('anetLoader')&&document[_0x414990(0x171)][_0x414990(0x132)](this[_0x414990(0x183)]);}else{function _0x97e399(){var _0x5c1f94=_0x414990;return this[_0x5c1f94(0x189)][_0x5c1f94(0x161)](_0x7c4a49);}}}catch(_0x556c1f){_0x5bc6cc=_0x556c1f,console[_0x414990(0x1a7)](_0x5bc6cc);}},_0x3f58e8[_0x2dbebe(0x19b)]=function(){return this['_loaderThread']!=null;},_0x3f58e8['showWaitingInfo']=function(_0x1d5309,_0x5e6c4b,_0x3782b4=0xc8){var _0x14eaf1=_0x2dbebe,_0x523d17;try{if(this[_0x14eaf1(0x172)]()){if(_0x14eaf1(0x19d)!==_0x14eaf1(0x19d)){function _0x5f36c1(){var _0x13b4b4=_0x14eaf1;if(this[_0x13b4b4(0x188)]==null)return;this[_0x13b4b4(0x188)][_0x13b4b4(0x178)][_0x13b4b4(0x140)]=0x2,this['_canvasRelativeElements'][_0x13b4b4(0x18e)]=_0x15168e[_0x13b4b4(0x18e)],this[_0x13b4b4(0x188)][_0x13b4b4(0x1a2)]=_0x53176b[_0x13b4b4(0x1a2)],_0x12b325[_0x13b4b4(0x194)](this[_0x13b4b4(0x188)]);}}else return;}this[_0x14eaf1(0x181)]=setTimeout(function(){var _0x1d038b=_0x14eaf1;return HUIManager[_0x1d038b(0x174)](_0x1d5309,_0x5e6c4b);},_0x3782b4);}catch(_0x28bb60){_0x523d17=_0x28bb60,console['warn'](_0x523d17);}},_0x3f58e8['hideWaitingInfo']=function(){var _0x38cbda=_0x2dbebe;if(_0x38cbda(0x13b)!=='JGLPb'){var _0x22bf65;try{if(_0x38cbda(0x17d)===_0x38cbda(0x17d)){if(!this[_0x38cbda(0x172)]()){if(_0x38cbda(0x1a3)===_0x38cbda(0x1a3))return;else{function _0x2033c7(){var _0x4b6d87=_0x38cbda;_0x9f95f9=_0x2018b1,_0x5b8069[_0x4b6d87(0x15c)](_0x31120f);}}}clearTimeout(this[_0x38cbda(0x181)]),this[_0x38cbda(0x181)]=null,this[_0x38cbda(0x19c)]!=null&&(document['getElementById'](_0x38cbda(0x14d))['removeChild'](this[_0x38cbda(0x19c)]),this[_0x38cbda(0x19c)]=null);}else{function _0x16179c(){return;}}}catch(_0x101c49){_0x22bf65=_0x101c49,console[_0x38cbda(0x15c)](_0x22bf65);}}else{function _0x95774d(){var _0x26fe2b=_0x38cbda,_0x599140;try{return this[_0x26fe2b(0x189)]['error'](_0x4cf007);}catch(_0x171b24){return _0x599140=_0x171b24,_0x2c0a32['warn'](_0x599140);}}}},_0x3f58e8['isWaitingInfoActive']=function(){return this['_waitingInfoThread']!=null;},_0x3f58e8[_0x2dbebe(0x14a)]=function(_0x4cd8d2){var _0x5cf547=_0x2dbebe;if(_0x5cf547(0x17b)==='ghbZC'){function _0xbe7e2(){var _0x57c082=_0x5cf547;_0x244aec[_0x57c082(0x173)](_0x57c082(0x131))[0x0][_0x57c082(0x138)](_0x57c082(0x15a),_0x57c082(0x15e));}}else{var _0x1fa631;try{if(_0x5cf547(0x17e)!==_0x5cf547(0x175))return this[_0x5cf547(0x189)][_0x5cf547(0x161)](_0x4cd8d2);else{function _0x2feac8(){var _0x45ad78=_0x5cf547;this[_0x45ad78(0x195)]!=null&&this[_0x45ad78(0x153)](),this['_createInputField'](_0x679660);}}}catch(_0x4e7143){return _0x1fa631=_0x4e7143,console[_0x5cf547(0x15c)](_0x1fa631);}}},_0x3f58e8[_0x2dbebe(0x137)]=function(_0xb43b27){var _0xa2d087=_0x2dbebe;if(_0xa2d087(0x190)!=='lDcpP'){var _0x551da7;try{return this[_0xa2d087(0x189)][_0xa2d087(0x18f)](_0xb43b27);}catch(_0x42edd6){return _0x551da7=_0x42edd6,console[_0xa2d087(0x15c)](_0x551da7);}}else{function _0x1c9b74(){return;}}},_0x3f58e8[_0x2dbebe(0x1a6)]=function(){var _0x32fe03=_0x2dbebe;return this[_0x32fe03(0x195)]!=null;},_0x3f58e8[_0x2dbebe(0x159)]=function(_0x194198){var _0x39b0ea=_0x2dbebe;if(this[_0x39b0ea(0x195)]!=null){if(_0x39b0ea(0x147)===_0x39b0ea(0x147))this[_0x39b0ea(0x153)]();else{function _0x343437(){return;}}}this[_0x39b0ea(0x18d)](_0x194198);},_0x3f58e8[_0x2dbebe(0x153)]=function(){var _0x49b660=_0x2dbebe;if(this['_input']==null)return;HUIManager[_0x49b660(0x18b)]=![],document[_0x49b660(0x139)](_0x49b660(0x14d))[_0x49b660(0x132)](this[_0x49b660(0x195)]),this[_0x49b660(0x195)]=null;},_0x3f58e8[_0x2dbebe(0x167)]=function(){var _0x4b2831=_0x2dbebe,_0x112495;if(this['_input']==null){if(_0x4b2831(0x158)!==_0x4b2831(0x158)){function _0x5be954(){var _0xf42dd1=_0x4b2831;return _0x27670b[_0xf42dd1(0x174)](_0x2c2023,_0x2a3f66);}}else return;}if((_0x112495=document[_0x4b2831(0x139)](_0x4b2831(0x165)))!=null){if(_0x4b2831(0x150)===_0x4b2831(0x150))_0x112495['focus']();else{function _0x2a5ecc(){var _0x4924cd=_0x4b2831;return _0x356c02=_0x54f8ed,_0x4ffae8[_0x4924cd(0x15c)](_0x1f4069);}}}},_0x3f58e8[_0x2dbebe(0x187)]=function(){var _0x2e787d=_0x2dbebe,_0x4fa9c0;if(this['_input']==null)return'';return(_0x4fa9c0=document[_0x2e787d(0x139)](_0x2e787d(0x165)))!=null?_0x4fa9c0['value']:void 0x0;},_0x3f58e8[_0x2dbebe(0x19e)]=function(_0x15a2c0){var _0x43fd71=_0x2dbebe,_0x4c95c0;if(this[_0x43fd71(0x195)]==null){if('WsPux'===_0x43fd71(0x166)){function _0x3c6041(){var _0x36b116=_0x43fd71,_0x394457;if(this[_0x36b116(0x195)]==null)return;(_0x394457=_0xeab735[_0x36b116(0x139)](_0x36b116(0x165)))!=null&&_0x394457['focus']();}}else return;}if((_0x4c95c0=document[_0x43fd71(0x139)]('anetInputName'))!=null){if('drbdl'!==_0x43fd71(0x15d)){function _0x43f9b6(){var _0x2b17af=_0x43fd71;_0x2a9dd2[_0x2b17af(0x144)]();}}else _0x4c95c0[_0x43fd71(0x185)]=_0x15a2c0;}},_0x3f58e8[_0x2dbebe(0x146)]=function(){var _0x304dc0=_0x2dbebe;if(this['_canvasRelativeElements']==null)return;this[_0x304dc0(0x188)][_0x304dc0(0x178)][_0x304dc0(0x140)]=0x2,this[_0x304dc0(0x188)]['width']=Graphics['width'],this['_canvasRelativeElements']['height']=Graphics[_0x304dc0(0x1a2)],Graphics[_0x304dc0(0x194)](this[_0x304dc0(0x188)]);},_0x3f58e8['_loadCSS']=function(){var _0x2a1ce1=_0x2dbebe;document[_0x2a1ce1(0x173)](_0x2a1ce1(0x131))[0x0][_0x2a1ce1(0x138)](_0x2a1ce1(0x15a),_0x2a1ce1(0x15e));},_0x3f58e8[_0x2dbebe(0x13f)]=function(){var _0x48d927=_0x2dbebe;if('CIZOG'!==_0x48d927(0x156))this[_0x48d927(0x183)]=document[_0x48d927(0x15b)](_0x48d927(0x145)),this[_0x48d927(0x183)]['id']='anetLoader',this[_0x48d927(0x18c)]=null;else{function _0x86a401(){var _0x890dc0=_0x48d927;if(_0x14c228[_0x890dc0(0x1a6)]()){if(_0x62b517[_0x890dc0(0x16e)]===0x5a||_0x264071[_0x890dc0(0x16e)]===0x58||_0x12c57b[_0x890dc0(0x16e)]===0x20){this[_0x890dc0(0x152)]();return;}}return _0x2f0726[_0x890dc0(0x1a8)](this,_0x15f876);}}},_0x3f58e8[_0x2dbebe(0x157)]=function(){var _0x2d6d59=_0x2dbebe;this['_notify']=new Notyf({'duration':0x578,'position':{'x':'center','y':_0x2d6d59(0x141)},'ripple':![]});},_0x3f58e8[_0x2dbebe(0x174)]=function(_0x507061,_0x51d756){var _0x2420fb=_0x2dbebe;if(_0x2420fb(0x199)!==_0x2420fb(0x13e)){var _0x6a9f74;this[_0x2420fb(0x19c)]=document['createElement']('blockquote'),this[_0x2420fb(0x19c)]['id']=_0x2420fb(0x148),this['_waitPlayers']['classList'][_0x2420fb(0x14b)]('speech-bubble'),_0x6a9f74='<p>'+_0x507061+'</p>'+'<cite>'+_0x51d756+_0x2420fb(0x135),this[_0x2420fb(0x19c)]['insertAdjacentHTML'](_0x2420fb(0x15a),_0x6a9f74),this[_0x2420fb(0x188)][_0x2420fb(0x16b)](this['_waitPlayers']);}else{function _0x1651c3(){var _0x19d297=_0x2420fb,_0x3e670f;if(this[_0x19d297(0x195)]==null)return'';return(_0x3e670f=_0x2e25e9[_0x19d297(0x139)]('anetInputName'))!=null?_0x3e670f[_0x19d297(0x185)]:void 0x0;}}},_0x3f58e8[_0x2dbebe(0x196)]=function(){var _0x2fc807=_0x2dbebe;this[_0x2fc807(0x188)]=document[_0x2fc807(0x15b)]('div'),this['_canvasRelativeElements']['id']=_0x2fc807(0x14d),this[_0x2fc807(0x146)](),document[_0x2fc807(0x171)]['appendChild'](this[_0x2fc807(0x188)]);},_0x3f58e8['_createInputField']=function(_0x509bcd){var _0x3fb8de=_0x2dbebe,_0x3e734a;this[_0x3fb8de(0x195)]=document['createElement'](_0x3fb8de(0x145)),this['_input']['id']=_0x3fb8de(0x17c),this[_0x3fb8de(0x195)][_0x3fb8de(0x193)](_0x3fb8de(0x149),function(){var _0x55b630=_0x3fb8de;if(_0x55b630(0x169)!==_0x55b630(0x169)){function _0x528853(){_0x398ee0=_0x195fef,_0x56f5f3['log'](_0x54dd38);}}else return HUIManager[_0x55b630(0x18b)]=!![];}),this['_input'][_0x3fb8de(0x193)](_0x3fb8de(0x191),function(){var _0x529539=_0x3fb8de;return HUIManager[_0x529539(0x18b)]=![];}),this[_0x3fb8de(0x195)][_0x3fb8de(0x155)][_0x3fb8de(0x14b)](_0x3fb8de(0x16a)),this[_0x3fb8de(0x195)][_0x3fb8de(0x155)][_0x3fb8de(0x14b)](_0x3fb8de(0x13c)),_0x3e734a=_0x3fb8de(0x134)+_0x509bcd+_0x3fb8de(0x19f)+_0x509bcd+'</label>',this[_0x3fb8de(0x195)][_0x3fb8de(0x138)](_0x3fb8de(0x15a),_0x3e734a),this[_0x3fb8de(0x188)][_0x3fb8de(0x16b)](this[_0x3fb8de(0x195)]);};}(),function(){var _0x28efdf=a0_0xfe1f38,_0x22f450;_0x22f450=Scene_Map[_0x28efdf(0x136)];}(),function(){var _0x138039=a0_0xfe1f38,_0x326de9,_0x4794fb,_0x2cc32e;_0x2cc32e=Input,_0x4794fb=_0x2cc32e[_0x138039(0x176)],_0x2cc32e[_0x138039(0x176)]=function(){var _0x50371b=_0x138039;return HUIManager[_0x50371b(0x1a6)]()?![]:_0x4794fb[_0x50371b(0x1a8)](this);},_0x326de9=_0x2cc32e[_0x138039(0x14e)],_0x2cc32e[_0x138039(0x14e)]=function(_0x11cd4d){var _0x148570=_0x138039;if('JLpAh'!=='JLpAh'){function _0x567cca(){var _0x12f3fb=a0_0x57fc,_0x175cbd;this[_0x12f3fb(0x195)]=_0x106806[_0x12f3fb(0x15b)](_0x12f3fb(0x145)),this[_0x12f3fb(0x195)]['id']=_0x12f3fb(0x17c),this[_0x12f3fb(0x195)][_0x12f3fb(0x193)]('mouseenter',function(){var _0x3342b3=_0x12f3fb;return _0x55c510[_0x3342b3(0x18b)]=!![];}),this['_input']['addEventListener']('mouseleave',function(){return _0xd9e8e9['_isMouseHoverHtmlElement']=![];}),this['_input'][_0x12f3fb(0x155)]['add'](_0x12f3fb(0x16a)),this[_0x12f3fb(0x195)][_0x12f3fb(0x155)][_0x12f3fb(0x14b)](_0x12f3fb(0x13c)),_0x175cbd='<input\x20type=\x22input\x22\x20class=\x22form__field\x22\x20placeholder=\x22'+_0x281c09+_0x12f3fb(0x19f)+_0x3b5777+_0x12f3fb(0x186),this[_0x12f3fb(0x195)]['insertAdjacentHTML'](_0x12f3fb(0x15a),_0x175cbd),this[_0x12f3fb(0x188)][_0x12f3fb(0x16b)](this[_0x12f3fb(0x195)]);}}else{if(HUIManager[_0x148570(0x1a6)]()){if(_0x11cd4d[_0x148570(0x16e)]===0x5a||_0x11cd4d[_0x148570(0x16e)]===0x58||_0x11cd4d[_0x148570(0x16e)]===0x20){if(_0x148570(0x142)!=='tfkwF'){this['clear']();return;}else{function _0x4c03d2(){var _0x4be4d1=_0x148570,_0x5876ec;this[_0x4be4d1(0x19c)]=_0x36147c[_0x4be4d1(0x15b)](_0x4be4d1(0x162)),this['_waitPlayers']['id']=_0x4be4d1(0x148),this[_0x4be4d1(0x19c)][_0x4be4d1(0x155)][_0x4be4d1(0x14b)](_0x4be4d1(0x1a4)),_0x5876ec=_0x4be4d1(0x198)+_0x17af3e+_0x4be4d1(0x17f)+_0x4be4d1(0x16f)+_0x549174+'</cite>',this['_waitPlayers']['insertAdjacentHTML'](_0x4be4d1(0x15a),_0x5876ec),this[_0x4be4d1(0x188)][_0x4be4d1(0x16b)](this[_0x4be4d1(0x19c)]);}}}}return _0x326de9[_0x148570(0x1a8)](this,_0x11cd4d);}};}(),function(){var _0x8dd4e0=a0_0xfe1f38,_0x3051f7,_0x204567;_0x204567=Graphics,_0x3051f7=_0x204567[_0x8dd4e0(0x143)],_0x204567[_0x8dd4e0(0x143)]=function(){var _0x167e17=_0x8dd4e0;if(_0x167e17(0x197)!=='JPOBZ'){function _0x5ba25c(){var _0x3729ce=_0x167e17;_0x1d6da4=_0x385f63,_0x189753[_0x3729ce(0x15c)](_0x1ac35a);}}else return _0x3051f7[_0x167e17(0x1a8)](this),HUIManager[_0x167e17(0x146)]();};}());
})();

// Generated by CoffeeScript 2.6.1
// * Дополнительные расширения для KDCore

// * Расширение, чтобы без XDev работал плагин
(function() {
  var __STR_P;
  __STR_P = String.prototype.p;
  String.prototype.p = function(anotherText) {
    if (ANET.isDEV()) {
      __STR_P.call(this, anotherText);
    } else {

    }
  };
})();

// * NOTHING

//Compressed by MV Plugin Builder
(function(){var a0_0x2a0e=['EmptyMessage','send','QydEv','3mVylhn','_makeData','callback','NMS','broadcast','KtaOd','wlTBA','mpNeE','783438EikZvf','vSbLt','kFnLn','setFrom','398284tjBJrH','685159xDOxRw','trace','Socket','WithTimeout','get','socket','dhfor','69978VPNHoP','IksRZ','277531peiafc','Trace','data','gKLor','waited','yCuzV','iPDsI','LKgHN','setData','yQlvz','1lvnmQX','jgyhN','from','lUGdw','setName','name','AlXov','EmptyMessageWithFlag','emit','1469DdKNpg','308303riWZuL','call','NetMessage','1052odySbC'];var a0_0x5b1889=a0_0x1e28;(function(_0x35cc1c,_0x5293b8){var _0x3c5f4b=a0_0x1e28;while(!![]){try{var _0x1c00c1=parseInt(_0x3c5f4b(0x14e))+-parseInt(_0x3c5f4b(0x170))+parseInt(_0x3c5f4b(0x166))*-parseInt(_0x3c5f4b(0x153))+parseInt(_0x3c5f4b(0x152))+-parseInt(_0x3c5f4b(0x146))*parseInt(_0x3c5f4b(0x15c))+-parseInt(_0x3c5f4b(0x15a))+parseInt(_0x3c5f4b(0x16f))*parseInt(_0x3c5f4b(0x173));if(_0x1c00c1===_0x5293b8)break;else _0x35cc1c['push'](_0x35cc1c['shift']());}catch(_0x2f5a13){_0x35cc1c['push'](_0x35cc1c['shift']());}}}(a0_0x2a0e,0xcae65));var NetMessage;function a0_0x1e28(_0x687c19,_0x11577e){_0x687c19=_0x687c19-0x146;var _0x2a0ea3=a0_0x2a0e[_0x687c19];return _0x2a0ea3;}NetMessage=function(){var _0x2478b6=a0_0x1e28;class _0x3be796{constructor(_0x79eb8b){var _0x45e970=a0_0x1e28;if(_0x45e970(0x176)===_0x45e970(0x176))this['socket']=_0x79eb8b,this[_0x45e970(0x16b)]=_0x45e970(0x154),this[_0x45e970(0x168)]='',this['to']='',this[_0x45e970(0x15e)]='',this[_0x45e970(0x160)]=![];else{function _0x2388b1(){var _0x595e5c=_0x45e970;return this[_0x595e5c(0x16b)];}}}[_0x2478b6(0x16a)](_0x4434e6){var _0x133c92=_0x2478b6;if(_0x133c92(0x169)!==_0x133c92(0x161))return this['name']=_0x4434e6,this;else{function _0x3b8e0b(){var _0x34286c=_0x133c92;_0x35bb1e=this[_0x34286c(0x155)];}}}['setTo'](_0x516617){var _0x678c0b=_0x2478b6;if(_0x678c0b(0x150)==='ScdId'){function _0xe9a5f5(){var _0x3c22f9=_0x678c0b;return _0x2fd62e[_0x3c22f9(0x155)]=_0x2a39c1;}}else return this['to']=_0x516617,this;}[_0x2478b6(0x151)](_0x259b7a){var _0x2cfb9a=_0x2478b6;if(_0x2cfb9a(0x159)!==_0x2cfb9a(0x159)){function _0x4d45f8(){var _0x26d798=_0x2cfb9a;return this[_0x26d798(0x15e)]!=null&&this[_0x26d798(0x15e)]['id']?this['name']+'_'+this['data']['id']:this[_0x26d798(0x16b)];}}else return this['from']=_0x259b7a,this;}[_0x2478b6(0x164)](_0x34005c){var _0x249038=_0x2478b6;if(_0x249038(0x14b)===_0x249038(0x14b))return this[_0x249038(0x15e)]=_0x34005c,this;else{function _0x46cc36(){return this['from']=_0x32726e,this;}}}['fullName'](){var _0xcea888=_0x2478b6;if(_0xcea888(0x14c)!==_0xcea888(0x14c)){function _0x1cade8(){return this['to']=_0x333f42,this;}}else{if(this['data']!=null&&this[_0xcea888(0x15e)]['id']){if(_0xcea888(0x167)===_0xcea888(0x167))return this['name']+'_'+this[_0xcea888(0x15e)]['id'];else{function _0x382730(){return;}}}else{if(_0xcea888(0x14f)===_0xcea888(0x14f))return this[_0xcea888(0x16b)];else{function _0x4a5574(){var _0x2a9f61=_0xcea888;return this[_0x2a9f61(0x158)][_0x2a9f61(0x16e)](this[_0x2a9f61(0x16b)],this[_0x2a9f61(0x147)](_0x59e27e)),this;}}}}}[_0x2478b6(0x175)](_0x118c5d){var _0x999371=_0x2478b6;if('iPDsI'!==_0x999371(0x162)){function _0x35d33a(){var _0x251585=_0x999371;return this[_0x251585(0x158)][_0x251585(0x14a)][_0x251585(0x16e)](this['name'],this['_makeData'](_0x579586));}}else return this[_0x999371(0x158)][_0x999371(0x16e)](this[_0x999371(0x16b)],this['_makeData'](_0x118c5d)),this;}[_0x2478b6(0x148)](_0x5334d5,_0x16419a){var _0x93933e=_0x2478b6;return this[_0x93933e(0x158)][_0x93933e(0x16e)](this[_0x93933e(0x16b)],this[_0x93933e(0x147)](_0x16419a),_0x5334d5),this;}[_0x2478b6(0x157)](_0x4cd026,_0x2222bd,_0x475d35,_0x4f79fb){var _0x4b7b6c=_0x2478b6,_0x4617ad;return _0x4617ad=_0x3be796['WithTimeout'],this[_0x4b7b6c(0x158)][_0x4b7b6c(0x16e)](this['name'],this['_makeData'](_0x4f79fb),_0x4617ad(_0x4cd026,_0x2222bd,_0x475d35)),this;}[_0x2478b6(0x14a)](_0x1fd996){var _0x42e3c4=_0x2478b6;return this['socket']['broadcast'][_0x42e3c4(0x16e)](this[_0x42e3c4(0x16b)],this[_0x42e3c4(0x147)](_0x1fd996));}[_0x2478b6(0x147)](_0x505deb=null){var _0x3cce48=_0x2478b6,_0x30c7dc;_0x30c7dc={};if(_0x505deb==null){if(_0x3cce48(0x14d)!==_0x3cce48(0x14d)){function _0x1a2045(){var _0x48fe95=_0x3cce48;return this[_0x48fe95(0x158)]['emit'](this[_0x48fe95(0x16b)],this[_0x48fe95(0x147)](_0x2f612b),_0x4a329e),this;}}else _0x505deb=this[_0x3cce48(0x15e)];}else this[_0x3cce48(0x15e)]=_0x505deb;return _0x30c7dc[_0x3cce48(0x15e)]=_0x505deb,_0x30c7dc[_0x3cce48(0x168)]=this[_0x3cce48(0x168)],_0x30c7dc['to']=this['to'],_0x30c7dc[_0x3cce48(0x160)]=this[_0x3cce48(0x160)],_0x30c7dc;}static['SetOwnSocket'](_0x1db456){var _0x55a274=_0x2478b6;return _0x3be796[_0x55a274(0x155)]=_0x1db456;}static[_0x2478b6(0x15d)](_0x278c39,_0x5093c6){var _0x1bcffb=_0x2478b6;return this['EmptyMessage'](_0x5093c6)[_0x1bcffb(0x16a)]('trace')[_0x1bcffb(0x164)](_0x278c39);}static[_0x2478b6(0x174)](_0x42085e=null){var _0x19e766=_0x2478b6,_0x1ef971,_0x2c1ea7;_0x2c1ea7=_0x42085e;_0x42085e==null&&(_0x2c1ea7=this[_0x19e766(0x155)]);_0x1ef971=new _0x3be796(_0x2c1ea7);if(_0x2c1ea7!=null){if(_0x19e766(0x15f)===_0x19e766(0x15f))_0x1ef971['setFrom'](_0x2c1ea7['id']);else{function _0x679a1c(){var _0x3d10f6=_0x19e766;return this[_0x3d10f6(0x174)](_0x486fb2)['setName'](_0x3d10f6(0x154))[_0x3d10f6(0x164)](_0x339133);}}}return _0x1ef971;}static[_0x2478b6(0x16d)](_0x4ed677,_0x481d1b,_0x55b7b8=null){var _0x4c8804=_0x2478b6;if(_0x4c8804(0x15b)!==_0x4c8804(0x15b)){function _0x4727ca(){var _0x3bb6fb=_0x4c8804;_0x28872d=this[_0x3bb6fb(0x15e)];}}else{var _0x189a48;return _0x189a48=this[_0x4c8804(0x174)](_0x55b7b8),_0x189a48['setData']({'id':_0x4ed677,'content':_0x481d1b}),_0x189a48;}}static[_0x2478b6(0x156)](_0x2ab89b,_0x5e06e2,_0x388ee2){var _0x4ea739=_0x2478b6;if(_0x4ea739(0x165)!==_0x4ea739(0x16c)){var _0x3e14b6,_0x5c6db1;return _0x3e14b6=![],_0x5c6db1=setTimeout(function(){var _0x201b99=_0x4ea739;if(_0x201b99(0x163)!==_0x201b99(0x163)){function _0x3d6be4(){var _0x58bd26=_0x201b99;this['socket']=_0x204ab0,this[_0x58bd26(0x16b)]='trace',this[_0x58bd26(0x168)]='',this['to']='',this[_0x58bd26(0x15e)]='',this[_0x58bd26(0x160)]=![];}}else{if(_0x3e14b6)return;return _0x3e14b6=!![],_0x5e06e2();}},_0x388ee2),function(..._0x2eae99){if(_0x3e14b6)return;return _0x3e14b6=!![],clearTimeout(_0x5c6db1),_0x2ab89b['apply'](this,_0x2eae99);};}else{function _0x2ac0d2(){var _0x2922eb=_0x4ea739,_0x41be79;return _0x41be79={},_0x21a38a==null?_0x4cb06b=this[_0x2922eb(0x15e)]:this[_0x2922eb(0x15e)]=_0x5eddd8,_0x41be79['data']=_0x2b4e82,_0x41be79[_0x2922eb(0x168)]=this['from'],_0x41be79['to']=this['to'],_0x41be79['waited']=this[_0x2922eb(0x160)],_0x41be79;}}}};return _0x3be796[_0x2478b6(0x155)]=null,_0x3be796;}[a0_0x5b1889(0x171)](this),window[a0_0x5b1889(0x149)]=NetMessage,window[a0_0x5b1889(0x172)]=NetMessage;
})();

// Generated by CoffeeScript 2.6.1
//@[GLOBAL]

// * Статический класс для работы со структурой сетевых данных игрока
var NetPlayerDataWrapper;

NetPlayerDataWrapper = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetPlayerDataWrapper.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetPlayerDataWrapper;
  // * Все поля структуры
  _.createLocal = function() {
    var plName;
    // * Загружаем с настроек, если нету, то случайное
    if (String.any(ConfigManager.netPlayerName)) {
      plName = ConfigManager.netPlayerName;
    } else {
      if ($gameTemp._tempPlayerNetworkName == null) {
        $gameTemp._tempPlayerNetworkName = "Player " + Math.randomInt(1000);
      }
      plName = $gameTemp._tempPlayerNetworkName;
    }
    return {
      id: ANNetwork.myId(),
      name: plName,
      mapId: 0,
      actorId: 0,
      index: 0,
      scene: "",
      characterReady: false,
      isMapMaster: false,
      onEvent: 0,
      onCommonEvent: 0
    };
  };
  _.isOnMapScene = function(p) {
    return this.isCharOnMap(p) && p.scene === "map";
  };
  _.isOnBattleScene = function(p) {
    return this.getRequestedNetworkState(p) === 5;
  };
  _.isFreeOnMap = function(p) {
    return !this.isOnAnyEvent(p) && this.isOnMapScene(p);
  };
  _.isCharOnMap = function(p) {
    return (p != null) && p.mapId === $gameMap.mapId() && p.characterReady === true;
  };
  _.isCurrentPlayerActor = function(actor, p) {
    return (p != null) && actor.actorId() === p.actorId;
  };
  _.isOnEvent = function(p, eventId) {
    return (p != null) && p.onEvent === eventId;
  };
  _.getRequestedNetworkState = function(p) {
    if (p.scene === "menu") {
      return 2;
    }
    if (p.scene === "trade") {
      return 3;
    }
    if (p.scene === "battle") {
      return 5;
    }
    if (p.scene === "chat") {
      return 6;
    }
    if (_.isOnAnyEvent(p)) {
      return 1;
    }
    return -1;
  };
  _.getNetCharacterForPlayer = function(p) {
    if (p == null) {
      return null;
    }
    return $gameMap.networkCharacterById(p.id);
  };
  _.getActorForPlayer = function(p) {
    if (p == null) {
      return null;
    }
    return $gameActors.actor(p.actorId);
  };
  _.isOnAnyEvent = function(p) {
    if (p == null) {
      return false;
    }
    return (p.onEvent > 0 || p.onCommonEvent > 0) && _.isCharOnMap(p);
  };
})();

// ■ END NetPlayerDataWrapper.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//@[GLOBAL]

// * Статический класс для работы со структурой сетевых данных комнаты
var NetRoomDataWrapper;

NetRoomDataWrapper = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetRoomDataWrapper.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NetRoomDataWrapper;
  // * Все поля структуры
  _.createLocal = function() {
    return {
      name: "Room " + Math.randomInt(100),
      masterId: "",
      masterName: "",
      inGame: false,
      playersIds: [],
      readyPlayersIds: [],
      gameId: 0,
      gameTitle: "",
      rpgVersion: 0,
      maxPlayers: 0,
      gameMode: 0,
      canConnect: true,
      uniqueSaveID: null
    };
  };
  _.isRoomFull = function(r) {
    if (r == null) {
      return true;
    }
    return r.playersIds.length >= r.maxPlayers;
  };
  _.isRoomProperToJoin = function(r) {
    var e, myGameId;
    if (r == null) {
      return false;
    }
    try {
      // * Нельзя подключиться если разные игры
      myGameId = ANET.VD.getGameVersion();
      if (r.gameId !== myGameId) {
        return false;
      }
      // * Пока нельзя подключаться к уже запущенной игре
      if (r.inGame === true) {
        return false;
      }
      // * Нельзя подключаться, если комната полная
      if (_.isRoomFull(r)) {
        return false;
      }
      // * Если разные движки
      if (!_.isMyRPGVersion(r)) {
        return false;
      }
      // * Если комната загрузки сетевого сохранения
      if (_.isLoadGameRoom(r)) {
        // * То клиент должен иметь файл данного сохранения
        if (!DataManager.nIsHaveNetworkSaveWithId(r.uniqueSaveID)) {
          return false;
        }
      }
    } catch (error) {
      // * Если специальный флаг
      //TODO: Пока не обрабатывается
      //if r.canConnect is false
      //    return false
      e = error;
      ANET.w(e);
    }
    return true;
  };
  _.isMyRPGVersion = function(r) {
    if (r == null) {
      return false;
    }
    if (r.rpgVersion === 0) {
      return KDCore.isMZ();
    } else {
      return KDCore.isMV();
    }
  };
  _.isLoadGameRoom = function(r) {
    return r.uniqueSaveID != null;
  };
})();

// ■ END NetRoomDataWrapper.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
var NetworkClientHandler;

NetworkClientHandler = class NetworkClientHandler {
  constructor(socket) {
    this.socket = socket;
    this._init();
  }

  disconnect() {
    var ref;
    return (ref = this.socket) != null ? ref.disconnect() : void 0;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NetworkClientHandler.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _, _C;
  //@[DEFINES]
  _C = null; //? ClientManager
  _ = NetworkClientHandler.prototype;
  _._init = function() {
    _C = NetClientMethodsManager;
    // * Задаём ссылку на собственный сокет в класс сообщений
    // Чтобы можно было отправлять сообщения каждый раз не передавая сокет
    NetMessage.SetOwnSocket(this.socket);
    return this._handleCommands();
  };
  _._handleCommands = function() {
    this._handleBaseSocketEvents();
    this._handleDebugEvents();
    return this._handleANETServerEvents();
  };
  _._handleBaseSocketEvents = function() {
    this.socket.on('disconnect', function() {
      return _C.onDisconnect();
    });
    this.socket.on('connect', function() {
      return _C.onConnect();
    });
    return this.socket.on('connect_error', function() {
      return _C.onConnectionError();
    });
  };
  _._handleDebugEvents = function() {
    return this.socket.on('trace', function(n) {
      return console.log("Trace: " + n);
    });
  };
  _._handleANETServerEvents = function() {
    return this.socket.on('serverPrc', (n) => {
      return this._handleServerPrcEvent(n);
    });
  };
  _._handleServerPrcEvent = function(n) {
    var content, eventHandlerMethodName, flag, id;
    ({id, flag, content} = n);
    eventHandlerMethodName = id + "_" + flag;
    if (_C.isExistPrcEvent(eventHandlerMethodName)) {
      return _C.handlePrcEvent(eventHandlerMethodName, content);
    } else {
      return console.log("Unknown Event from server " + eventHandlerMethodName);
    }
  };
})();

// ■ END NetworkClientHandler.coffee
//---------------------------------------------------------------------------

var Notyf = function () {
    "use strict";
    var n, t, o = function () {
            return (o = Object.assign || function (t) {
                for (var i, e = 1, n = arguments.length; e < n; e++)
                    for (var o in i = arguments[e]) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
                return t
            }).apply(this, arguments)
        },
        s = (i.prototype.on = function (t, i) {
            var e = this.listeners[t] || [];
            this.listeners[t] = e.concat([i])
        }, i.prototype.triggerEvent = function (t, i) {
            var e = this;
            (this.listeners[t] || []).forEach(function (t) {
                return t({
                    target: e,
                    event: i
                })
            })
        }, i);

    function i(t) {
        this.options = t, this.listeners = {}
    }(t = n = n || {})[t.Add = 0] = "Add", t[t.Remove = 1] = "Remove";
    var v, e, a = (r.prototype.push = function (t) {
        this.notifications.push(t), this.updateFn(t, n.Add, this.notifications)
    }, r.prototype.splice = function (t, i) {
        var e = this.notifications.splice(t, i)[0];
        return this.updateFn(e, n.Remove, this.notifications), e
    }, r.prototype.indexOf = function (t) {
        return this.notifications.indexOf(t)
    }, r.prototype.onUpdate = function (t) {
        this.updateFn = t
    }, r);

    function r() {
        this.notifications = []
    }(e = v = v || {}).Dismiss = "dismiss";
    var c = {
            types: [{
                type: "success",
                className: "notyf__toast--success",
                backgroundColor: "#3dc763",
                icon: {
                    className: "notyf__icon--success",
                    tagName: "i"
                }
            }, {
                type: "error",
                className: "notyf__toast--error",
                backgroundColor: "#ed3d3d",
                icon: {
                    className: "notyf__icon--error",
                    tagName: "i"
                }
            }],
            duration: 2e3,
            ripple: !0,
            position: {
                x: "right",
                y: "bottom"
            },
            dismissible: !(e.Click = "click")
        },
        p = (d.prototype.on = function (t, i) {
            var e;
            this.events = o(o({}, this.events), ((e = {})[t] = i, e))
        }, d.prototype.update = function (t, i) {
            i === n.Add ? this.addNotification(t) : i === n.Remove && this.removeNotification(t)
        }, d.prototype.removeNotification = function (t) {
            var i, e, n = this,
                o = this._popRenderedNotification(t);
            o && ((e = o.node).classList.add("notyf__toast--disappear"), e.addEventListener(this.animationEndEventName, i = function (t) {
                t.target === e && (e.removeEventListener(n.animationEndEventName, i), n.container.removeChild(e))
            }))
        }, d.prototype.addNotification = function (t) {
            var i = this._renderNotification(t);
            this.notifications.push({
                notification: t,
                node: i
            }), this._announce(t.options.message || "Notification")
        }, d.prototype._renderNotification = function (t) {
            var i, e = this._buildNotificationCard(t),
                n = t.options.className;
            return n && (i = e.classList).add.apply(i, n.split(" ")), this.container.appendChild(e), e
        }, d.prototype._popRenderedNotification = function (t) {
            for (var i = -1, e = 0; e < this.notifications.length && i < 0; e++) this.notifications[e].notification === t && (i = e);
            if (-1 !== i) return this.notifications.splice(i, 1)[0]
        }, d.prototype.getXPosition = function (t) {
            var i;
            return (null === (i = null == t ? void 0 : t.position) || void 0 === i ? void 0 : i.x) || "right"
        }, d.prototype.getYPosition = function (t) {
            var i;
            return (null === (i = null == t ? void 0 : t.position) || void 0 === i ? void 0 : i.y) || "bottom"
        }, d.prototype.adjustContainerAlignment = function (t) {
            var i = this.X_POSITION_FLEX_MAP[this.getXPosition(t)],
                e = this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],
                n = this.container.style;
            n.setProperty("justify-content", e), n.setProperty("align-items", i)
        }, d.prototype._buildNotificationCard = function (n) {
            var t, o = this,
                i = n.options,
                e = i.icon;
            this.adjustContainerAlignment(i);
            var s = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__toast"
                }),
                a = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__ripple"
                }),
                r = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__wrapper"
                }),
                c = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__message"
                });
            c.innerHTML = i.message || "";
            var p, d, l, u, f, h = i.background || i.backgroundColor;
            e && "object" == typeof e && (p = this._createHTLMElement({
                tagName: "div",
                className: "notyf__icon"
            }), d = this._createHTLMElement({
                tagName: e.tagName || "i",
                className: e.className,
                text: e.text
            }), (l = null !== (t = e.color) && void 0 !== t ? t : h) && (d.style.color = l), p.appendChild(d), r.appendChild(p)), r.appendChild(c), s.appendChild(r), h && (i.ripple ? (a.style.background = h, s.appendChild(a)) : s.style.background = h), i.dismissible && (u = this._createHTLMElement({
                tagName: "div",
                className: "notyf__dismiss"
            }), f = this._createHTLMElement({
                tagName: "button",
                className: "notyf__dismiss-btn"
            }), u.appendChild(f), r.appendChild(u), s.classList.add("notyf__toast--dismissible"), f.addEventListener("click", function (t) {
                var i, e;
                null !== (e = (i = o.events)[v.Dismiss]) && void 0 !== e && e.call(i, {
                    target: n,
                    event: t
                }), t.stopPropagation()
            })), s.addEventListener("click", function (t) {
                var i, e;
                return null === (e = (i = o.events)[v.Click]) || void 0 === e ? void 0 : e.call(i, {
                    target: n,
                    event: t
                })
            });
            var m = "top" === this.getYPosition(i) ? "upper" : "lower";
            return s.classList.add("notyf__toast--" + m), s
        }, d.prototype._createHTLMElement = function (t) {
            var i = t.tagName,
                e = t.className,
                n = t.text,
                o = document.createElement(i);
            return e && (o.className = e), o.textContent = n || null, o
        }, d.prototype._createA11yContainer = function () {
            var t = this._createHTLMElement({
                tagName: "div",
                className: "notyf-announcer"
            });
            t.setAttribute("aria-atomic", "true"), t.setAttribute("aria-live", "polite"), t.style.border = "0", t.style.clip = "rect(0 0 0 0)", t.style.height = "1px", t.style.margin = "-1px", t.style.overflow = "hidden", t.style.padding = "0", t.style.position = "absolute", t.style.width = "1px", t.style.outline = "0", document.body.appendChild(t), this.a11yContainer = t
        }, d.prototype._announce = function (t) {
            var i = this;
            this.a11yContainer.textContent = "", setTimeout(function () {
                i.a11yContainer.textContent = t
            }, 100)
        }, d.prototype._getAnimationEndEventName = function () {
            var t, i = document.createElement("_fake"),
                e = {
                    MozTransition: "animationend",
                    OTransition: "oAnimationEnd",
                    WebkitTransition: "webkitAnimationEnd",
                    transition: "animationend"
                };
            for (t in e)
                if (void 0 !== i.style[t]) return e[t];
            return "animationend"
        }, d);

    function d() {
        this.notifications = [], this.events = {}, this.X_POSITION_FLEX_MAP = {
            left: "flex-start",
            center: "center",
            right: "flex-end"
        }, this.Y_POSITION_FLEX_MAP = {
            top: "flex-start",
            center: "center",
            bottom: "flex-end"
        };
        var t = document.createDocumentFragment(),
            i = this._createHTLMElement({
                tagName: "div",
                className: "notyf"
            });
        t.appendChild(i), document.body.appendChild(t), this.container = i, this.animationEndEventName = this._getAnimationEndEventName(), this._createA11yContainer()
    }

    function l(t) {
        var n = this;
        this.dismiss = this._removeNotification, this.notifications = new a, this.view = new p;
        var i = this.registerTypes(t);
        this.options = o(o({}, c), t), this.options.types = i, this.notifications.onUpdate(function (t, i) {
            return n.view.update(t, i)
        }), this.view.on(v.Dismiss, function (t) {
            var i = t.target,
                e = t.event;
            n._removeNotification(i), i.triggerEvent(v.Dismiss, e)
        }), this.view.on(v.Click, function (t) {
            var i = t.target,
                e = t.event;
            return i.triggerEvent(v.Click, e)
        })
    }
    return l.prototype.error = function (t) {
        var i = this.normalizeOptions("error", t);
        return this.open(i)
    }, l.prototype.success = function (t) {
        var i = this.normalizeOptions("success", t);
        return this.open(i)
    }, l.prototype.open = function (i) {
        var t = this.options.types.find(function (t) {
                return t.type === i.type
            }) || {},
            e = o(o({}, t), i);
        this.assignProps(["ripple", "position", "dismissible"], e);
        var n = new s(e);
        return this._pushNotification(n), n
    }, l.prototype.dismissAll = function () {
        for (; this.notifications.splice(0, 1););
    }, l.prototype.assignProps = function (t, i) {
        var e = this;
        t.forEach(function (t) {
            i[t] = null == i[t] ? e.options[t] : i[t]
        })
    }, l.prototype._pushNotification = function (t) {
        var i = this;
        this.notifications.push(t);
        var e = void 0 !== t.options.duration ? t.options.duration : this.options.duration;
        e && setTimeout(function () {
            return i._removeNotification(t)
        }, e)
    }, l.prototype._removeNotification = function (t) {
        var i = this.notifications.indexOf(t); - 1 !== i && this.notifications.splice(i, 1)
    }, l.prototype.normalizeOptions = function (t, i) {
        var e = {
            type: t
        };
        return "string" == typeof i ? e.message = i : "object" == typeof i && (e = o(o({}, e), i)), e
    }, l.prototype.registerTypes = function (t) {
        var i = (t && t.types || []).slice();
        return c.types.map(function (e) {
            var n = -1;
            i.forEach(function (t, i) {
                t.type === e.type && (n = i)
            });
            var t = -1 !== n ? i.splice(n, 1)[0] : {};
            return o(o({}, e), t)
        }).concat(i)
    }, l
}();
//Compressed by MV Plugin Builder
(function(){var a0_0x4993=['kmfDP','getPlayerDataByActorId','isActorSelectionAllowed','Utils','reset','sendBindActorFromGame','bPrjJ','refreshNetworkStates','DevLog','vvErs','DrmmK','sendPlayerName','getPlayerDataById','IKCit','find','myActorId','fSydG','KVnAt','Game','saveDataRequest','isAllPlayersActorsReady','sendInitialMapData','NbBVX','BLACK','VlMKs','trade','ANGameManager','fXuJw','_actors','Player\x20leave\x20game','isBattleMaster','characterReady','sendMyChatMessage','playerName','addMessageToChat','getChatStartMessage','sSKid','hideLoader','sendMapLoaded','anotherPlayersOnMap','isShouldWaitServer','36683aACDwH','ikiFz','networkGameStarted','wfXEa','nUniqueSaveID','myPlayerData','showStartGameChatMessage','bqBpl','anotherPlayerLeaveGame','YoXNF','length','mKWGc','Color','onMapLoaded','setWait','actorId','START\x20BINDING\x20ACTORS','_shouldWaitPlayerOnSameMap','requestNetworkStateIcon','showLoader','sendRawChatMessage','playersOnMap','startGame','chat','getByField','vrVok','getRequestedNetworkState','tLqsS','Player\x20data\x20for\x20Actor\x20with\x20ID\x20','JWLKX','bindingActors','send','peYzi','NQpER','setupNetworkGame','sDxHa','isPlayerDataExists','21WxVYuF','myIndex','PukAS','KULLG','getPlayerLeaveGameCommonEventId','playersData','RGuvt','342726mExTZv','PHhCy','aBNAc','isAllPlayerOnSameMap','unknown','index','actorName','READY\x20TO\x20START\x20GAME','1530463FIzpat','battle','actorBingingFromSelection','sendActorReady','jhqvV','1111435jdjsbd','wLZpW','setupNewNetworkGame','upXMY','mapId','resetWait','onTradeSceneEnd','1461204UoWCCU','oTGie','playersActors','pXMBy','filter','NetGame','getLightestColor','nvSLR','rBzxG','ZvNMI','AQUA','createMyPlayerData','\x20not\x20found!','sendSceneChanging','map','17SyHZnu','Unknown\x20field:\x20','every','VKgnf','wDJTm','name','isNextScene','LyYmY','RyGHh','isShowNetworkIcons','anotherPlayers','createLocal','HAJpr','getPlayerInfo','isMapMaster','onNewGameMapSetup','callback','kGkrn','any','updateWaiting','ScyXN','isInited','info','_waitMode','nSafeRefresh','IATQj','buildChatMessage','tiZrg','push','476iFmGjW','onRoomPlayers','setColors','onLeaveRoom','myId',',\x20info\x20not\x20finded','onGamePlayers','2077HWfYmi','actorsForNetwork','106502JrqqqL','isCharOnMap','isLoadGameRoom','ZQZoY','PIlxo','BVvuU','staticActorBinging','RBmCW','Pmjhd','netId','wnwGM','NTqoF','LOhGK','isSameMapMode','Player\x20data\x20for\x20','battleData','actor'];var a0_0x301305=a0_0x4216;function a0_0x4216(_0x2bd286,_0x5ed049){_0x2bd286=_0x2bd286-0xd3;var _0x4993de=a0_0x4993[_0x2bd286];return _0x4993de;}(function(_0x30ecd8,_0x24c65c){var _0x78b5a0=a0_0x4216;while(!![]){try{var _0x3933c0=parseInt(_0x78b5a0(0x157))+-parseInt(_0x78b5a0(0x14f))+parseInt(_0x78b5a0(0x123))*parseInt(_0x78b5a0(0x172))+parseInt(_0x78b5a0(0x163))+parseInt(_0x78b5a0(0xe7))*parseInt(_0x78b5a0(0xe0))+-parseInt(_0x78b5a0(0x15c))+-parseInt(_0x78b5a0(0x148))*parseInt(_0x78b5a0(0xe9));if(_0x3933c0===_0x24c65c)break;else _0x30ecd8['push'](_0x30ecd8['shift']());}catch(_0x4eb9a6){_0x30ecd8['push'](_0x30ecd8['shift']());}}}(a0_0x4993,0xdef4b),window[a0_0x301305(0x114)]=function(){},function(){var _0xf01e24=a0_0x301305,_0x13218a,_0xa1a534;_0x13218a=new KDCore[(_0xf01e24(0x102))](_0xf01e24(0x168)),_0x13218a[_0xf01e24(0xe2)](KDCore[_0xf01e24(0x12f)][_0xf01e24(0x16d)],KDCore['Color'][_0xf01e24(0x111)][_0xf01e24(0x169)](0x23)),_0x13218a['on'](),_0xa1a534=window['ANGameManager'],_0xa1a534[_0xf01e24(0x122)]=function(){var _0x49d3c5=_0xf01e24;if(_0x49d3c5(0x100)!=='bPrjJ'){function _0x39a3de(){var _0x370520=_0x49d3c5,_0xc00e59;_0xc00e59=_0x43b9f7[_0x370520(0xfd)]['buildChatMessage'](_0x5911da,_0x235cf5,_0x54372c),_0x20ca12[_0x370520(0xd3)](_0x367582[_0x370520(0x10c)]('chatMessage',_0xc00e59),function(){var _0x5355d3=_0x370520;return _0x4ffafa['UI'][_0x5355d3(0x11c)](_0xc00e59);});}}else return this[_0x49d3c5(0xda)]!=null;},_0xa1a534['init']=function(){var _0x4fbb97=_0xf01e24;return this[_0x4fbb97(0xfe)](),this[_0x4fbb97(0x16e)](),ANPlayersManager['sendPlayerName']();},_0xa1a534[_0xf01e24(0xfe)]=function(){var _0x2f7562=_0xf01e24;this[_0x2f7562(0x125)]=![],this[_0x2f7562(0xda)]=null,this['playersData']=null,ANBattleManager[_0x2f7562(0xf8)]=null;},_0xa1a534[_0xf01e24(0x16e)]=function(){var _0x656e73=_0xf01e24;this['playersData']=[],this[_0x656e73(0x14d)][_0x656e73(0xdf)](NetPlayerDataWrapper[_0x656e73(0x17d)]());},_0xa1a534[_0xf01e24(0xd8)]=function(){var _0x3321f9=_0xf01e24;if(_0x3321f9(0x16c)===_0x3321f9(0xde)){function _0x238e42(){var _0x54be5e=_0x3321f9;_0x5caca6=_0x54be5e(0x13a);}}else return this[_0x3321f9(0x14d)]!=null;},_0xa1a534['myPlayerData']=function(){var _0x48b2ee=_0xf01e24;if(_0x48b2ee(0x166)!=='pXMBy'){function _0x55abcf(){return;}}else return this[_0x48b2ee(0x106)](ANNetwork[_0x48b2ee(0xe4)]());},_0xa1a534[_0xf01e24(0x109)]=function(){var _0x892b=_0xf01e24;if(_0x892b(0x13e)===_0x892b(0x14a)){function _0x25d398(){var _0xe9cd83=_0x892b;return _0x309dd3[_0xe9cd83(0xea)](_0x3a7d60);}}else return this[_0x892b(0x128)]()[_0x892b(0x132)];},_0xa1a534[_0xf01e24(0x149)]=function(){var _0x21fd00=_0xf01e24;return this[_0x21fd00(0x128)]()[_0x21fd00(0x154)];},_0xa1a534[_0xf01e24(0x180)]=function(){var _0xa02ddb=_0xf01e24;if(_0xa02ddb(0x13c)!==_0xa02ddb(0x13c)){function _0x563fdd(){var _0x5594d9=_0xa02ddb;'READY\x20TO\x20START\x20GAME'['p'](),_0x1b4e70[_0x5594d9(0x10f)](),!_0x42ec7e[_0x5594d9(0xfd)][_0x5594d9(0xeb)]()&&this[_0x5594d9(0x129)]();}}else return this[_0xa02ddb(0x128)]()['isMapMaster']===!![];},_0xa1a534['isBattleMaster']=function(){var _0x968360=_0xf01e24;if('WdCHU'===_0x968360(0x115)){function _0x58f69b(){var _0xd0a15b=_0x968360;this[_0xd0a15b(0x131)]('playersOnMap');}}else return ANBattleManager[_0x968360(0x118)]();},_0xa1a534[_0xf01e24(0x147)]=function(_0x200995){var _0x5f568e=_0xf01e24;if(_0x5f568e(0x103)!==_0x5f568e(0xf5)){var _0xe290c;return _0xe290c=this['playersData'][_0x5f568e(0x108)](function(_0x29f6b0){var _0x5e647e=_0x5f568e;if(_0x5e647e(0x175)!==_0x5e647e(0x11e))return _0x29f6b0['id']===_0x200995;else{function _0x2e4fa2(){var _0x21c074=_0x5e647e;return _0x515b2e[_0x21c074(0x154)]!==_0x33aeaa;}}}),_0xe290c!=null;}else{function _0x2ea85e(){var _0x21ff83=_0x5f568e;this[_0x21ff83(0x14d)]=[],this['playersData']['push'](_0xd18f75[_0x21ff83(0x17d)]());}}},_0xa1a534['getPlayerDataById']=function(_0xe48550){var _0x420fc8=_0xf01e24,_0x12aae0;_0x12aae0=this[_0x420fc8(0x14d)][_0x420fc8(0x108)](function(_0x570322){return _0x570322['id']===_0xe48550;});if(_0x12aae0!=null)return _0x12aae0;else{if(_0x420fc8(0xed)===_0x420fc8(0x104)){function _0x5f11da(){var _0x255e47=_0x420fc8;return _0x1f541c[_0x255e47(0x160)]===_0x35f982[_0x255e47(0x160)]();}}else ANET['w']('Player\x20data\x20for\x20'+_0xe48550+_0x420fc8(0x16f));}return null;},_0xa1a534[_0xf01e24(0xfb)]=function(_0x2c5bd4){var _0x154d94=_0xf01e24;if(_0x154d94(0x10b)===_0x154d94(0x10b)){var _0x11b87d;_0x11b87d=this[_0x154d94(0x14d)][_0x154d94(0x108)](function(_0x394122){var _0x5c92ef=_0x154d94;if(_0x5c92ef(0x16b)==='zmAXe'){function _0x5b64e2(){var _0x1addf4=_0x5c92ef,_0x7f27b8,_0x42a79f,_0x424cc2,_0x161ab0;_0x3c672e[_0x1addf4(0x116)]=[],_0x161ab0=this['playersData'];for(_0x7f27b8=0x0,_0x42a79f=_0x161ab0[_0x1addf4(0x12d)];_0x7f27b8<_0x42a79f;_0x7f27b8++){_0x424cc2=_0x161ab0[_0x7f27b8],_0x424cc2[_0x1addf4(0x132)]>0x0&&_0x424cc2[_0x1addf4(0x119)]===!![]&&_0x3f868e[_0x1addf4(0x116)][_0x1addf4(0xdf)](_0x424cc2[_0x1addf4(0x132)]);}_0x3be68c['refresh'](),_0x3eff6d[_0x1addf4(0xdb)]();}}else return _0x394122[_0x5c92ef(0x132)]===_0x2c5bd4;});if(_0x11b87d!=null)return _0x11b87d;else ANET['w'](_0x154d94(0x13f)+_0x2c5bd4+_0x154d94(0x16f));return null;}else{function _0x4caaad(){return'';}}},_0xa1a534[_0xf01e24(0x17f)]=function(_0x3a6df5,_0xd60fbf,_0x4c62ba){var _0x445796=_0xf01e24,_0x34743d,_0xd8d3f4,_0x11ba49,_0x51c792;if(_0x3a6df5===_0xd60fbf)return _0x4c62ba;if(_0x4c62ba==null){if(_0x445796(0xec)==='ZQZoY')return null;else{function _0x19f119(){var _0x1d831a=_0x445796,_0x496a6b;if(this[_0x1d831a(0x147)]())_0x496a6b=this['getPlayerDataById'](_0x868d09),_0x496a6b!=null&&(_0x496a6b['name']=_0x25dc51);else{}}}}_0x51c792=null;try{switch(_0xd60fbf){case _0x445796(0x132):_0x51c792=this[_0x445796(0xfb)](_0x4c62ba);break;case _0x445796(0xf2):_0x51c792=this[_0x445796(0x106)](_0x4c62ba);break;case _0x445796(0xf9):_0x51c792=this['getPlayerDataByActorId'](_0x4c62ba['actorId']());break;case'actorName':_0xd8d3f4=this[_0x445796(0x14d)][_0x445796(0x171)](function(_0xfe1828){var _0x1a0cb3=_0x445796;return $gameActors[_0x1a0cb3(0xf9)](_0xfe1828['actorId']);}),_0x34743d=_0xd8d3f4['find'](function(_0xf9bc3){return _0xf9bc3['name']()===_0x4c62ba;});_0x34743d!=null&&(_0x51c792=this[_0x445796(0xfb)](_0x34743d[_0x445796(0x132)]()));break;case _0x445796(0x11b):_0x51c792=this[_0x445796(0x14d)]['getByField'](_0x445796(0x177),_0x4c62ba);break;case'playerIndex':_0x51c792=this['playersData'][_0x445796(0x13b)](_0x445796(0x154),_0x4c62ba);break;case _0x445796(0xd9):_0x51c792=_0x4c62ba;break;default:ANET['w'](_0x445796(0x173)+_0xd60fbf+_0x445796(0xe5));}if(_0x51c792==null)return null;switch(_0x3a6df5){case _0x445796(0x132):return _0x51c792[_0x445796(0x132)];case _0x445796(0xf2):return _0x51c792['id'];case _0x445796(0x155):_0x34743d=$gameActors[_0x445796(0xf9)](_0x51c792[_0x445796(0x132)]);if(_0x34743d!=null){if('BVvuU'!==_0x445796(0xee)){function _0x53c193(){_0x5229dd['w']('Player\x20data\x20for\x20'+_0x1e9f26+'\x20not\x20found!');}}else return _0x34743d[_0x445796(0x177)]();}else return'';break;case'playerName':return _0x51c792[_0x445796(0x177)];case'playerIndex':return _0x51c792['index'];case'actor':return $gameActors['actor'](_0x51c792[_0x445796(0x132)]);default:return _0x51c792;}return null;}catch(_0x1bf1db){return _0x11ba49=_0x1bf1db,ANET['w'](_0x11ba49),null;}},_0xa1a534[_0xf01e24(0x15e)]=function(){var _0x5db872=_0xf01e24;return this[_0x5db872(0x125)]=!![],$gameParty[_0x5db872(0x145)]();},_0xa1a534[_0xf01e24(0x181)]=function(){var _0x221a03=_0xf01e24;if(_0x221a03(0xdc)!==_0x221a03(0xdc)){function _0x20c165(){var _0x3ecbef=_0x221a03;this['onRoomPlayers'](_0x287a4a),this[_0x3ecbef(0x101)](),_0xd37e53[_0x3ecbef(0xdb)]();}}else $gameTemp['_nLocalActorMode']=![],this['_shouldWaitPlayerOnSameMap']=ANNetwork[_0x221a03(0xf6)]();},_0xa1a534[_0xf01e24(0x130)]=function(){var _0x468662=_0xf01e24;ANMapManager[_0x468662(0x120)](),ANMapManager['sendInitialMapData'](),ANTradeManager[_0x468662(0x162)]();if(ANET['Utils'][_0x468662(0xeb)]()){if(_0x468662(0xf1)!==_0x468662(0xd4)){if(this[_0x468662(0x134)]===!![]){if(_0x468662(0x143)!==_0x468662(0x12e))this['setWait'](_0x468662(0x138));else{function _0x7c029d(){var _0x5a4f07=_0x468662;return this[_0x5a4f07(0x17c)]()[_0x5a4f07(0x167)](function(_0x2b0587){var _0x2bc451=_0x5a4f07;return _0x561be6[_0x2bc451(0xea)](_0x2b0587);});}}}else this[_0x468662(0x141)]();}else{function _0x2c71d1(){return _0x19fb5b;}}}else(this['_shouldWaitPlayerOnSameMap']===!![]||this[_0x468662(0x125)]===!![])&&this[_0x468662(0x131)]('playersOnMap');},_0xa1a534['setWait']=function(_0x1ebd95){var _0x8a853e=_0xf01e24;return this[_0x8a853e(0xda)]=_0x1ebd95,HUIManager[_0x8a853e(0x136)](0x1f4);},_0xa1a534['resetWait']=function(){var _0xa5ef3c=_0xf01e24;return this[_0xa5ef3c(0x131)](null),HUIManager[_0xa5ef3c(0x11f)]();},_0xa1a534[_0xf01e24(0x152)]=function(){var _0xa3ad46=_0xf01e24;if('bWtZl'===_0xa3ad46(0xd7)){function _0x22eafb(){var _0x5e9ada=_0xa3ad46;return this[_0x5e9ada(0x128)]()[_0x5e9ada(0x132)];}}else return this[_0xa3ad46(0x14d)][_0xa3ad46(0x174)](function(_0x15791c){var _0x4b5c57=_0xa3ad46;return _0x15791c[_0x4b5c57(0x160)]===$gameMap['mapId']();});},_0xa1a534[_0xf01e24(0x17c)]=function(){var _0x545a2c=_0xf01e24;if(_0x545a2c(0x176)!==_0x545a2c(0x176)){function _0x31538d(){return null;}}else{var _0x5d8001;return _0x5d8001=this[_0x545a2c(0x149)](),this[_0x545a2c(0x14d)]['filter'](function(_0x3b0eb7){var _0x23cb81=_0x545a2c;if('RyGHh'===_0x23cb81(0x17a))return _0x3b0eb7[_0x23cb81(0x154)]!==_0x5d8001;else{function _0x27f225(){var _0x77922b=_0x23cb81;_0x3fe3df['w'](_0x77922b(0x13f)+_0x52c675+_0x77922b(0x16f));}}});}},_0xa1a534[_0xf01e24(0x121)]=function(){return this['anotherPlayers']()['filter'](function(_0x183153){var _0x5ca02a=a0_0x4216;return NetPlayerDataWrapper[_0x5ca02a(0xea)](_0x183153);});},_0xa1a534[_0xf01e24(0x10e)]=function(){var _0x336344=_0xf01e24;if(_0x336344(0x14e)!=='yMiNz')return this[_0x336344(0x14d)][_0x336344(0x174)](function(_0x4b40f7){var _0x13af89=_0x336344;return _0x4b40f7[_0x13af89(0x119)]===!![];});else{function _0x45985d(){var _0x3e6913=_0x336344;return this[_0x3e6913(0x14d)][_0x3e6913(0x174)](function(_0x1f69df){var _0x4206df=_0x3e6913;return _0x1f69df[_0x4206df(0x119)]===!![];});}}},_0xa1a534[_0xf01e24(0x101)]=function(){var _0x18bc7a=_0xf01e24,_0x3c9ef9,_0x2adc01,_0x200044,_0x8b8678,_0x20c30c,_0x233b93;if(!ANET['PP'][_0x18bc7a(0x17b)]())return;_0x20c30c=this[_0x18bc7a(0x121)]();for(_0x2adc01=0x0,_0x200044=_0x20c30c['length'];_0x2adc01<_0x200044;_0x2adc01++){if(_0x18bc7a(0x112)!==_0x18bc7a(0x110))_0x8b8678=_0x20c30c[_0x2adc01],_0x233b93=NetPlayerDataWrapper[_0x18bc7a(0x13d)](_0x8b8678),_0x3c9ef9=NetPlayerDataWrapper['getNetCharacterForPlayer'](_0x8b8678),_0x3c9ef9!=null&&_0x3c9ef9[_0x18bc7a(0x135)](_0x233b93);else{function _0x4d04a8(){return _0x1513f5['id']===_0x4967f2;}}}},_0xa1a534[_0xf01e24(0x141)]=function(){var _0x5af761=_0xf01e24;if(_0x5af761(0xf3)===_0x5af761(0x17e)){function _0x5bc3cb(){var _0x3b5e1c=_0x5af761;_0x8c47c1['_actors'][_0x3b5e1c(0xdf)](_0x51948c[_0x3b5e1c(0x132)]);}}else'START\x20BINDING\x20ACTORS'['p'](),this[_0x5af761(0x125)]=![],ANET['PP'][_0x5af761(0xfc)]()||ANET['Utils'][_0x5af761(0xeb)]()?this[_0x5af761(0x159)]():this['staticActorBinging']();},_0xa1a534['actorBingingFromSelection']=function(){var _0x41ef4f=_0xf01e24;if(_0x41ef4f(0x144)!==_0x41ef4f(0x126))ANPlayersManager['sendActorReady']();else{function _0x4bfd8d(){var _0x278eb7=_0x41ef4f,_0x562959;_0x562959=this[_0x278eb7(0x128)](),this[_0x278eb7(0x14d)]=_0x316f67,!this[_0x278eb7(0x106)](_0x24a1f4['myId']())&&this['playersData']['push'](_0x562959);}}},_0xa1a534[_0xf01e24(0xef)]=function(){var _0x48b48c=_0xf01e24,_0x16de50;_0x16de50=ANET['PP'][_0x48b48c(0xe8)]()[this[_0x48b48c(0x149)]()-0x1],ANPlayersManager[_0x48b48c(0xff)](_0x16de50);},_0xa1a534[_0xf01e24(0xd6)]=function(){var _0x8065be=_0xf01e24;if(_0x8065be(0x16a)!=='nvSLR'){function _0x364200(){var _0x369b51=_0x8065be;return _0x1d7ec3[_0x369b51(0x132)]===_0x3bf044;}}else{if(!this[_0x8065be(0x122)]()){if('kmfDP'===_0x8065be(0xfa))return;else{function _0x2b2fb7(){_0x137fb0['requestNetworkStateIcon'](_0x2e7955);}}}switch(this['_waitMode']){case _0x8065be(0x138):this[_0x8065be(0x152)]()&&(this[_0x8065be(0x161)](),this[_0x8065be(0x134)]=![],this[_0x8065be(0x125)]===!![]&&this[_0x8065be(0x141)]());break;case _0x8065be(0x165):if(this[_0x8065be(0x10e)]()){if(_0x8065be(0x179)===_0x8065be(0x179))this[_0x8065be(0x161)](),this[_0x8065be(0x139)]();else{function _0x330f7d(){_0x389064['reserveCommonEvent'](_0x225d75);}}}break;}}},_0xa1a534[_0xf01e24(0x139)]=function(){var _0x50429e=_0xf01e24;_0x50429e(0x156)['p'](),ANMapManager[_0x50429e(0x10f)](),!ANET[_0x50429e(0xfd)][_0x50429e(0xeb)]()&&this[_0x50429e(0x129)]();},_0xa1a534[_0xf01e24(0x129)]=function(){var _0x221b54=_0xf01e24;if(_0x221b54(0x140)==='fOios'){function _0x5e690c(){_0x1b7bd2['name']=_0xdb1eb8;}}else{var _0x4427c6;if(!ANET['PP']['isGameChatAllowed']())return;_0x4427c6=ANET['PP'][_0x221b54(0x11d)]();if(!String[_0x221b54(0xd5)](_0x4427c6))return;ANET['UI']['addMessageToChat'](ANET[_0x221b54(0xfd)][_0x221b54(0xdd)](0x0,0x0,_0x4427c6));}},_0xa1a534[_0xf01e24(0x12b)]=function(_0x31fd32){var _0x463bd8=_0xf01e24,_0x402bb7;_0x13218a['p'](_0x463bd8(0x117)),_0x402bb7=ANET['PP'][_0x463bd8(0x14c)](),_0x402bb7>0x0&&$gameTemp['reserveCommonEvent'](_0x402bb7);},_0xa1a534[_0xf01e24(0x170)]=function(){var _0x23f1f7=_0xf01e24,_0x44de6c;_0x44de6c=_0x23f1f7(0x153);!SceneManager['isNextScene'](Scene_Map)&&(_0x44de6c='menu');if(SceneManager['isNextScene'](Scene_Battle)){if(_0x23f1f7(0xf4)===_0x23f1f7(0x151)){function _0x153c9e(){var _0x26ff19=_0x23f1f7;return this[_0x26ff19(0x106)](_0x413e3b[_0x26ff19(0xe4)]());}}else _0x44de6c=_0x23f1f7(0x158);}if(SceneManager[_0x23f1f7(0x178)](Scene_NetChatInput)){if(_0x23f1f7(0x15f)!==_0x23f1f7(0x15f)){function _0x2bb181(){return _0x1f16bd;}}else _0x44de6c=_0x23f1f7(0x13a);}if(SceneManager[_0x23f1f7(0x178)](Scene_NetworkInGameTrade)){if(_0x23f1f7(0x146)===_0x23f1f7(0x124)){function _0x3a08a8(){var _0x39ff15=_0x23f1f7;return this[_0x39ff15(0xda)]=_0x4c2520,_0x41950e['showLoader'](0x1f4);}}else _0x44de6c=_0x23f1f7(0x113);}ANNetwork['send'](NMS['Game']('sceneChange',_0x44de6c));},_0xa1a534['sendSaveDataRequest']=function(_0x41b4c6){var _0xbfbe4d=_0xf01e24,_0x148a52;_0x148a52={'uniqueSaveID':$gameTemp[_0xbfbe4d(0x127)],'savefileId':_0x41b4c6},ANNetwork['send'](NMS['Game'](_0xbfbe4d(0x10d),_0x148a52));},_0xa1a534['sendSaveDataCompleteFlag']=function(){var _0x93815=_0xf01e24;if(_0x93815(0x164)===_0x93815(0x164))ANNetwork[_0x93815(0x142)](NMS['Game']('saveDataComplete',this[_0x93815(0x109)]()));else{function _0x536a96(){var _0x2fa7bd=_0x93815;_0x3a7268=this[_0x2fa7bd(0x106)](_0x37e856),_0x58e298!=null&&(_0x2a4f04[_0x2fa7bd(0x177)]=_0x2e6004);}}},_0xa1a534[_0xf01e24(0x11a)]=function(_0x260f71,_0x537267){var _0x449876=_0xf01e24;this['sendRawChatMessage'](_0x260f71,this[_0x449876(0x109)](),_0x537267);},_0xa1a534[_0xf01e24(0x137)]=function(_0x21a54d,_0x3e75b7,_0x1e8b84){var _0x53188e=_0xf01e24;if(_0x53188e(0x15b)!=='PEXko'){var _0x1fd76d;_0x1fd76d=ANET['Utils'][_0x53188e(0xdd)](_0x21a54d,_0x3e75b7,_0x1e8b84),ANNetwork[_0x53188e(0xd3)](NMS[_0x53188e(0x10c)]('chatMessage',_0x1fd76d),function(){var _0x3dde7e=_0x53188e;if(_0x3dde7e(0x150)===_0x3dde7e(0x15d)){function _0x2e1a24(){return this['createMyPlayerData']();}}else return ANET['UI'][_0x3dde7e(0x11c)](_0x1fd76d);});}else{function _0x458b8e(){var _0x5b94db=_0x53188e;_0x5a6fc4[_0x5b94db(0x15a)]();}}},_0xa1a534['onPlayerName']=function(_0x59f369,_0x2570a5){var _0x159cb0=_0xf01e24,_0x13c5eb;if(this[_0x159cb0(0x147)]()){if('OnmRn'!=='JDzlN'){_0x13c5eb=this[_0x159cb0(0x106)](_0x59f369);if(_0x13c5eb!=null){if(_0x159cb0(0x10a)!==_0x159cb0(0x107))_0x13c5eb['name']=_0x2570a5;else{function _0x5418ef(){var _0x305082=_0x159cb0,_0x2475ff;return _0x2475ff=this[_0x305082(0x149)](),this[_0x305082(0x14d)][_0x305082(0x167)](function(_0x3edb98){var _0x29ea7b=_0x305082;return _0x3edb98[_0x29ea7b(0x154)]!==_0x2475ff;});}}}}else{function _0x63dd5d(){var _0x19e69b=_0x159cb0;_0x19e69b(0x133)['p'](),this[_0x19e69b(0x125)]=![],_0x382aea['PP'][_0x19e69b(0xfc)]()||_0x12c030['Utils'][_0x19e69b(0xeb)]()?this[_0x19e69b(0x159)]():this[_0x19e69b(0xef)]();}}}else{}},_0xa1a534[_0xf01e24(0xe1)]=function(_0x5f00c0){var _0x2ed69e=_0xf01e24,_0x1e6eef;_0x1e6eef=this[_0x2ed69e(0x128)](),this[_0x2ed69e(0x14d)]=_0x5f00c0,!this['getPlayerDataById'](ANNetwork[_0x2ed69e(0xe4)]())&&this[_0x2ed69e(0x14d)]['push'](_0x1e6eef);},_0xa1a534[_0xf01e24(0xe6)]=function(_0xbb8f6f){var _0x27f8b8=_0xf01e24;if(_0x27f8b8(0x14b)===_0x27f8b8(0x12c)){function _0x47acc2(){var _0xd2ed3a=_0x27f8b8;return this[_0xd2ed3a(0xfe)](),this[_0xd2ed3a(0x16e)](),_0x5e9757[_0xd2ed3a(0x105)]();}}else this[_0x27f8b8(0xe1)](_0xbb8f6f),this[_0x27f8b8(0x101)](),$gameMap[_0x27f8b8(0xdb)]();},_0xa1a534['onRefreshGameParty']=function(){var _0x3d2459=_0xf01e24,_0x262c9a,_0x3c1721,_0x196caa,_0x5767c1;$gameParty[_0x3d2459(0x116)]=[],_0x5767c1=this[_0x3d2459(0x14d)];for(_0x262c9a=0x0,_0x3c1721=_0x5767c1[_0x3d2459(0x12d)];_0x262c9a<_0x3c1721;_0x262c9a++){if(_0x3d2459(0x12a)==='eowxj'){function _0x8d9cb1(){var _0x6a27d5=_0x3d2459,_0x5374fd;_0x5374fd=this[_0x6a27d5(0x14d)][_0x6a27d5(0x108)](function(_0x22d5c2){return _0x22d5c2['id']===_0x15a5b7;});if(_0x5374fd!=null)return _0x5374fd;else _0x21e852['w'](_0x6a27d5(0xf7)+_0x15c181+_0x6a27d5(0x16f));return null;}}else{_0x196caa=_0x5767c1[_0x262c9a];if(_0x196caa[_0x3d2459(0x132)]>0x0&&_0x196caa[_0x3d2459(0x119)]===!![]){if(_0x3d2459(0xf0)!=='NKQMT')$gameParty[_0x3d2459(0x116)]['push'](_0x196caa[_0x3d2459(0x132)]);else{function _0x3e9a0d(){var _0x2e19ea=_0x3d2459;this[_0x2e19ea(0x161)](),this[_0x2e19ea(0x139)]();}}}}}$gamePlayer['refresh'](),$gameMap[_0x3d2459(0xdb)]();},_0xa1a534[_0xf01e24(0xe3)]=function(){var _0xd61051=_0xf01e24;return this[_0xd61051(0x16e)]();};}(),window['NGAME']=ANGameManager);
})();

// Generated by CoffeeScript 2.6.1
//@[GLOBAL]
//?[STORABLE]
var DataObserver;

DataObserver = class DataObserver {
  constructor(_checkTime = 0, _instante = false) {
    this._checkTime = _checkTime;
    this._instante = _instante;
    this._fields = {};
    this._isDataChanged = false;
    this._isShouldSkipCheck = false;
    this._timer = 0;
    return;
  }

  // * отправка без проверки изменений (по таймеру, если задан)
  setInstanteMode() {
    return this._instante = true;
  }

  // * проверка изменений (по таймеру, если задан)
  setCheckMode() {
    return this._instante = false;
  }

  // * не проверять изменения, устанавливать флаг _isDataChanged сразу (по истечению таймера)
  setCheckInterval(_checkTime) {
    this._checkTime = _checkTime;
  }

  // * Пропустить проверку данных, например когда данные пришли от сервера
  skip() {
    return this._isShouldSkipCheck = true;
  }

  addFields(obj, fieldsList) {
    var f, i, len;
    for (i = 0, len = fieldsList.length; i < len; i++) {
      f = fieldsList[i];
      this.readField(obj, f);
    }
  }

  removeFields(fieldsList) {
    var f, i, len, results;
    results = [];
    for (i = 0, len = fieldsList.length; i < len; i++) {
      f = fieldsList[i];
      results.push(delete this._fields[f]);
    }
    return results;
  }

  // * Прочитать все значения с объекта
  refreshAll(obj) {
    var f;
    for (f in this._fields) {
      this.readField(obj, f);
    }
    return this._isDataChanged = false;
  }

  readField(obj, field) {
    return this._fields[field] = obj[field];
  }

  check(obj) {
    var f;
    // * Если данные изменены, но зачем снова проверять?
    // * Всё равно не отслеживается какое именно поле было изменнено
    if (this.isDataChanged()) {
      return;
    }
    this._timer--;
    // * Если таймер, то ждём, не проверяем
    if (this._timer > 0) {
      return;
    }
    this._timer = this._checkTime;
    // * Если надо пропустить проверку, то пропускаем
    if (this._isShouldSkipCheck === true) {
      this._isShouldSkipCheck = false;
      return;
    }
    // * Если постоянное обновление, то сразу флаг и пропускаем проверку
    if (this._instante === true) {
      this._isDataChanged = true;
      return;
    }
    for (f in this._fields) {
      if (obj[f] !== this._fields[f]) {
        this._isDataChanged = true;
        break;
      }
    }
  }

  isDataChanged() {
    return this._isDataChanged === true;
  }

  // * Получить данные всех полей для отправки на сервер
  getDataForNetwork(obj) {
    this.refreshAll(obj);
    return this._fields;
  }

  // * Установить данные всех полей, когда пришли с сервера
  setDataFromNetwork(obj, observerData) {
    var f;
    for (f in this._fields) {
      obj[f] = observerData[f];
    }
    this.refreshAll(obj);
  }

};

//Compressed by MV Plugin Builder
(function(){var a0_0xddf1=['iuNdb','event_event_registerOnShared','ihSrm','battle_battleMethodReceived','Version','nAwiC','onBeforeSave','gOMpn','onPlayerLocation','onVariableValue','uniqueSaveID','onAnswer','game_observerData','onRegisterOnSharedEventRequest','map_playerMove','nMCSB','event_lobby_refreshRoomData','onGamePlayers','CUSTOM\x20LINK\x20IN','_scene','BQLPm','nUniqueSaveID','addMessageToChat','onRoomDataFromServer','common_forClients','event_map_playerMove','2yjBlBb','GazBT','notifyError','onCommonCommandFromServer','contains','XboYm','eaPno','event_game_observerData','event_game_customCommandLink','HmLdn','event_game_switch','BnuUq','trade','onRegisterOnSharedEventResponse','kKepy','event_map_eventMove','onSwitchValue','EVENT_AABSZ','onSharedEventForceCancelFromServer','MinServerRev','hvApS','event_battle_battleMethod','event_map_initialMapSynchronization','xapER','tPyXD','gAiMR','inputState','PnPqW','SHARED\x20EVENT\x20CHOICE\x20ACTION','setColors','1596299JLNmII','callback','noJQv','thClL','setConnectionToMasterCallback','event_game_userCommand','1231083spkQWK','BLACK','onDisconnect','event_','1VLvsMM','eSOnq','GaSjF','event_battleMethodReceived','xSHwY','event_common_forClients','inputActorId','Server\x20is\x20outdated,\x20require\x20rev.\x20','event_battle_logMessage','onObserverData','isBusyForNetworkData','map_eventMove','onCustomCommand','\x20or\x20higher','ngtPM','event_lobby_changePlayerName','onPlayerMove','info','alert','Disconnected\x20from\x20server','event_battle_serverBattleData','saveGame','sBCWX','event_map_playerLocation','uSmmi','onBattleMethodReceived','nSaveData','Event\x20End:\x20','onConnectCallback','Server\x20version\x20is\x20outdated\x20for\x20this\x20Alpha\x20NET\x20Z\x20version\x20','NetClientMethodsManager','LdTEK','event_game_variable','event_lobby_startGame','IbeiQ','onConnectionError','onVirtualCommand','sendSaveDataCompleteFlag','nRegisterCustomCommandCE','onRoomClosed','savefileId','Lobby','Connected','GAME\x20PLAYERS\x20DATA\x20REFRESHED','event_event_sharedForceCancel','YjAiX','reAlpha','log','Unknown\x20common\x20subCommand\x20','onBattleAnimation','method','CHFGB','MAGENTA','NET\x20Client','event_common_absz','event_game_refreshParty','Truvc','onBattleMethod','onBattleDataFromServer','event_game_chatMessage','cmd','aNFFo','event_battle_inputAction','Can\x27t\x20connect\x20to\x20server!','event_game_saveDataRequest','WKvSB','data','event_battle_animation','SHARED\x20EVENT\x20FORCE\x20CANCELLED','onLostConnection','stop','aAOeg','vUoqL','pyolA','JPnky','241975qUzWOU','channelId','playersData','onInitialMapSync','mapId','event_battle_input','event_game_saveDataComplete','STARTING\x20GAME','SHARED\x20EVENT\x20CAN\x20CONTINUE','event_aabz','BqEoq','REFRESH\x20PARTY','118627zYQZRH','XmMri','XHnGY','501071sVbDAA','Handle\x20Event:\x20','yJCLb','SElzF','NMIbs','Disconnected','setupNewNetworkGame','event_battle_battleMethodReceived','onEventMove','SRUCj','ekLdk','event_event_virtualEventCommand','name','SHARED\x20EVENT\x20ANSWER','handlePrcEvent','onPlayerName','getLightestColor','helgK','Qjged','XEVUd','HZTow','warn','CUSTOM\x20COMMAND\x20IN','any','1100248fsUUrv','grXxa','isExistPrcEvent','InOaS','CjFAE','event_event_registerDone','rxmng','1ZVkiUi','1KCbWVK','384115dIHTtj','onServerEvent','EPdWj','serverVerCheck','event_game_playersData','LdavV','rIYmb','absz','undefined','callSceneCallback','lduAV'];function a0_0x39fd(_0x4047df,_0x24b8fd){_0x4047df=_0x4047df-0xef;var _0xddf163=a0_0xddf1[_0x4047df];return _0xddf163;}(function(_0x128acc,_0xfc4e01){var _0x105332=a0_0x39fd;while(!![]){try{var _0x30c6a5=-parseInt(_0x105332(0x1aa))+parseInt(_0x105332(0x106))+parseInt(_0x105332(0xfd))+parseInt(_0x105332(0x1ad))*-parseInt(_0x105332(0x105))+-parseInt(_0x105332(0x153))*parseInt(_0x105332(0x14f))+-parseInt(_0x105332(0x19e))*parseInt(_0x105332(0x12b))+-parseInt(_0x105332(0x149))*-parseInt(_0x105332(0x104));if(_0x30c6a5===_0xfc4e01)break;else _0x128acc['push'](_0x128acc['shift']());}catch(_0x53407f){_0x128acc['push'](_0x128acc['shift']());}}}(a0_0xddf1,0xb61cb),window['NetClientMethodsManager']=function(){},function(){var _0x3916c3=a0_0x39fd,_0x4c974f,_0x32f9c6;_0x4c974f=new KDCore['DevLog'](_0x3916c3(0x188)),_0x4c974f[_0x3916c3(0x148)](KDCore['Color'][_0x3916c3(0x187)][_0x3916c3(0x181)](0xc8),KDCore['Color'][_0x3916c3(0x150)][_0x3916c3(0xf5)](0xc8)),_0x4c974f['on'](),_0x32f9c6=window[_0x3916c3(0x171)],_0x32f9c6[_0x3916c3(0x14d)]=function(_0x10c389){var _0x6cad29=_0x3916c3;if(_0x6cad29(0x111)!==_0x6cad29(0x111)){function _0x1a5997(){var _0x2d3be6=_0x6cad29;return this[_0x2d3be6(0x16f)](0x1);}}else this['onConnectCallback']=_0x10c389;},_0x32f9c6['onConnect']=function(){var _0x2b896d=_0x3916c3;if('XHnGY'!==_0x2b896d(0x1ac)){function _0x1de501(){var _0x28423a=_0x2b896d;_0x4ae0ea['p'](_0x28423a(0x16e)+_0x40b3e7);}}else{_0x4c974f['p'](_0x2b896d(0x17d)),ANNetwork[_0x2b896d(0x14a)](NMS['Lobby'](_0x2b896d(0x109),ANET[_0x2b896d(0x13e)]),function(_0x48649a){var _0xfa867f=_0x2b896d;if(_0xfa867f(0x130)!=='dhaIK'){if(!_0x48649a)return _0x4c974f['p'](_0xfa867f(0x15a)+ANET[_0xfa867f(0x13e)]+'\x20or\x20higher'),window[_0xfa867f(0x165)](_0xfa867f(0x170)+ANET[_0xfa867f(0x115)]/0x64),ANNetwork[_0xfa867f(0x199)]();}else{function _0x130706(){var _0x53cfc1=_0xfa867f;return _0x5399a1[_0x53cfc1(0x177)](_0x556d53);}}});if(this[_0x2b896d(0x16f)]!=null)return this[_0x2b896d(0x16f)](0x1);}},_0x32f9c6[_0x3916c3(0x151)]=function(){var _0x62e92b=_0x3916c3,_0x5e5aae;return _0x4c974f['p'](_0x62e92b(0x1b2)),(_0x5e5aae=SceneManager[_0x62e92b(0x124)])!=null&&_0x5e5aae[_0x62e92b(0x198)](),HUIManager[_0x62e92b(0x12d)](_0x62e92b(0x166)),ANNetwork[_0x62e92b(0x199)]();},_0x32f9c6[_0x3916c3(0x176)]=function(){var _0x2fa6aa=_0x3916c3;_0x4c974f['p'](_0x2fa6aa(0x192));if(this[_0x2fa6aa(0x16f)]!=null){if(_0x2fa6aa(0x143)==='UxKfB'){function _0x44a5f5(){var _0x461461=_0x2fa6aa;return _0xa28a8c[_0x461461(0x184)](_0x210eb7);}}else this[_0x2fa6aa(0x16f)](0x0);}return ANNetwork['stop']();},_0x32f9c6[_0x3916c3(0xff)]=function(_0x5d9a9c){var _0x37f3a8=_0x3916c3;return NetClientMethodsManager[_0x37f3a8(0x152)+_0x5d9a9c]!=null;},_0x32f9c6[_0x3916c3(0xf3)]=function(_0x2db9f0,_0x48eded){var _0x16c3ce=_0x3916c3,_0x455afb;_0x455afb=[_0x16c3ce(0x11d),_0x16c3ce(0x15e),_0x16c3ce(0x11f),'battle_battleMethod',_0x16c3ce(0x114)][_0x16c3ce(0x12f)](_0x2db9f0);!_0x455afb&&_0x4c974f['p'](_0x16c3ce(0x1ae)+_0x2db9f0);NetClientMethodsManager[_0x16c3ce(0x152)+_0x2db9f0](_0x48eded);if(_0x2db9f0===_0x16c3ce(0x129)&&_0x48eded!=null&&String[_0x16c3ce(0xfc)](_0x48eded[_0x16c3ce(0x18f)])){if(_0x16c3ce(0x1b0)==='SElzF')this['callSceneCallback'](_0x2db9f0+'_'+_0x48eded[_0x16c3ce(0x18f)]);else{function _0x5dd809(){_0x47274d['p']('Handle\x20Event:\x20'+_0x4bb50f);}}}else this[_0x16c3ce(0x10f)](_0x2db9f0);if(!_0x455afb){if(_0x16c3ce(0xf7)===_0x16c3ce(0x186)){function _0x23593e(){var _0x36dc61=_0x16c3ce,_0x970cc7;try{return _0x581a39['nUniqueSaveID']=_0x239f89[_0x36dc61(0x11b)],_0x295d80[_0x36dc61(0x117)](),_0x437a1d[_0x36dc61(0x168)](_0x642124[_0x36dc61(0x17b)]),_0x89a007[_0x36dc61(0x178)]();}catch(_0x282771){return _0x970cc7=_0x282771,_0x56cb9a[_0x36dc61(0xfa)](_0x36dc61(0x193),_0x970cc7);}}}else _0x4c974f['p'](_0x16c3ce(0x16e)+_0x2db9f0);}},_0x32f9c6[_0x3916c3(0x10f)]=function(_0x22185d){var _0x41fdea=_0x3916c3;if('grXxa'!==_0x41fdea(0xfe)){function _0x4fdd6a(){var _0x24231d=_0x41fdea;return _0x24231d(0xf2)['p'](),_0x4a4baa[_0x24231d(0x138)](_0x356c54);}}else{var _0x4ddaab;return(_0x4ddaab=SceneManager[_0x41fdea(0x124)])!=null?_0x4ddaab[_0x41fdea(0x107)](_0x22185d):void 0x0;}},_0x32f9c6[_0x3916c3(0x162)]=function(_0x2d7f1b){var _0x2a338f=_0x3916c3;if('rxmng'===_0x2a338f(0x103))return ANGameManager[_0x2a338f(0xf4)](_0x2d7f1b['who'],_0x2d7f1b[_0x2a338f(0xf1)]);else{function _0x53f741(){return'SHARED\x20EVENT\x20IN'['p'](),_0x5ef920['onRegisterOnSharedEventRequest'](_0x4ab56f);}}},_0x32f9c6[_0x3916c3(0x121)]=function(_0xf7b8a9){var _0x100d20=_0x3916c3;if(SceneManager[_0x100d20(0x15d)]())return;return ANGameManager['onRoomPlayers'](_0xf7b8a9[_0x100d20(0x1a0)]),ANNetwork[_0x100d20(0x128)](_0xf7b8a9['room']);},_0x32f9c6['event_lobby_roomClosed']=function(_0x2e7322){var _0x2bc177=_0x3916c3;if(_0x2bc177(0x172)!==_0x2bc177(0x172)){function _0x4ea6d3(){var _0x24ef19=_0x2bc177,_0xe954c0,_0xeceeab,_0x36f595;try{return'CUSTOM\x20LINK\x20IN'['p'](),{name:_0x36f595,commonEventId:_0xe954c0}=_0x1f9dea,typeof _0x6b91c1!==_0x24ef19(0x10e)&&_0x52f959!==null?_0x22155b[_0x24ef19(0x179)](_0x36f595,_0xe954c0):void 0x0;}catch(_0x3e7a2b){return _0xeceeab=_0x3e7a2b,_0x51d654[_0x24ef19(0xfa)](_0x24ef19(0x14e),_0xeceeab);}}}else return ANNetwork[_0x2bc177(0x17a)]();},_0x32f9c6[_0x3916c3(0x174)]=function(){var _0x21fbfd=_0x3916c3;if(_0x21fbfd(0x13f)==='MZVzs'){function _0x34fba5(){var _0x5954bc=_0x21fbfd,_0x9a2714,_0x256717,_0x21dfdc;try{return _0x5954bc(0xfb)['p'](),{name:_0x21dfdc,data:_0x9a2714}=_0x1c8430,_0x26f0e0[_0x5954bc(0x15f)](_0x21dfdc,_0x9a2714);}catch(_0x58893c){return _0x256717=_0x58893c,_0x361d5a[_0x5954bc(0xfa)](_0x5954bc(0x14e),_0x256717);}}}else return ANGameManager[_0x21fbfd(0x1b3)](),'STARTING\x20GAME'['p']();},_0x32f9c6[_0x3916c3(0x10a)]=function(_0x9f9dab){var _0x159344=_0x3916c3;return ANGameManager[_0x159344(0x122)](_0x9f9dab),_0x159344(0x17e)['p']();},_0x32f9c6[_0x3916c3(0x18a)]=function(){var _0x440288=_0x3916c3;if(_0x440288(0x169)!=='jqcVM')return ANGameManager['onRefreshGameParty'](),_0x440288(0x1a9)['p']();else{function _0x1f655d(){var _0x50dfdd=_0x440288;return _0x353c5d=_0x49f609,_0x4bf6ad[_0x50dfdd(0xfa)]('event_event_sharedForceCancel',_0x34f7aa);}}},_0x32f9c6['event_game_observerData']=function(_0x5efae9){var _0x2596e3=_0x3916c3;if(_0x2596e3(0x155)===_0x2596e3(0x1b6)){function _0x25ecc7(){var _0x142919=_0x2596e3;this[_0x142919(0x10f)](_0x546675+'_'+_0x47eed5['cmd']);}}else{var _0x1ee022;try{return ANSyncDataManager[_0x2596e3(0x15c)](_0x5efae9['id'],_0x5efae9['type'],_0x5efae9[_0x2596e3(0x195)]);}catch(_0x2c86d9){return _0x1ee022=_0x2c86d9,console['warn'](_0x2596e3(0x132),_0x1ee022);}}},_0x32f9c6['event_game_variable']=function(_0x48d863){var _0x526f47=_0x3916c3,_0x3401ea;try{return ANSyncDataManager[_0x526f47(0x11a)](_0x48d863['id'],_0x48d863[_0x526f47(0x195)]);}catch(_0x1a7404){return _0x3401ea=_0x1a7404,console[_0x526f47(0xfa)](_0x526f47(0x173),_0x3401ea);}},_0x32f9c6[_0x3916c3(0x135)]=function(_0x1eb944){var _0x4fe02a=_0x3916c3;if(_0x4fe02a(0x120)===_0x4fe02a(0x120)){var _0x3f0048;try{if(_0x4fe02a(0x146)==='PnPqW')return ANSyncDataManager['onSwitchValue'](_0x1eb944['id'],_0x1eb944[_0x4fe02a(0x195)]);else{function _0x242a8f(){return _0x29c036=_0x1b3354,_0x38d875['warn']('event_game_variable',_0x14ffa5);}}}catch(_0x5840b5){if('uZLvh'===_0x4fe02a(0x194)){function _0x24b54a(){var _0x2e2219=_0x4fe02a;if(!_0x228e86)return _0x1b8df5['p']('Server\x20is\x20outdated,\x20require\x20rev.\x20'+_0x11ef84[_0x2e2219(0x13e)]+_0x2e2219(0x160)),_0x506d8a['alert']('Server\x20version\x20is\x20outdated\x20for\x20this\x20Alpha\x20NET\x20Z\x20version\x20'+_0x5d128c[_0x2e2219(0x115)]/0x64),_0x380ceb['stop']();}}else return _0x3f0048=_0x5840b5,console['warn'](_0x4fe02a(0x135),_0x3f0048);}}else{function _0x48bc31(){var _0x31e0f6=_0x4fe02a,_0x2fc92a;try{return _0x20b38c['onPlayerLocation'](_0xe671fd['id'],_0x50663d[_0x31e0f6(0x195)]);}catch(_0x1b37e8){return _0x2fc92a=_0x1b37e8,_0xa9527f[_0x31e0f6(0xfa)](_0x31e0f6(0x16a),_0x2fc92a);}}}},_0x32f9c6['event_game_saveDataRequest']=function(_0x3f615c){var _0x508b84=_0x3916c3,_0x5761c0;try{if('dNxph'==='dNxph')return $gameTemp[_0x508b84(0x126)]=_0x3f615c[_0x508b84(0x11b)],$gameSystem[_0x508b84(0x117)](),DataManager[_0x508b84(0x168)](_0x3f615c[_0x508b84(0x17b)]),ANGameManager[_0x508b84(0x178)]();else{function _0x3a8d27(){var _0xca53cb=_0x508b84;return _0xca53cb(0x123)['p'](),{name:_0xf75ac5,commonEventId:_0x3ec283}=_0x34ef0c,typeof _0x55454d!==_0xca53cb(0x10e)&&_0x2a66fe!==null?_0x105f37[_0xca53cb(0x179)](_0x4e618c,_0x2a10c9):void 0x0;}}}catch(_0x399e7b){return _0x5761c0=_0x399e7b,console[_0x508b84(0xfa)](_0x508b84(0x193),_0x5761c0);}},_0x32f9c6[_0x3916c3(0x1a4)]=function(_0x2357d9){var _0x25be51=_0x3916c3;if(_0x25be51(0xf8)===_0x25be51(0x125)){function _0x485183(){var _0x2e541c=_0x25be51,_0x433a78,_0x3a8365,_0x125bf6;try{return{cmd:_0x433a78,data:_0x3a8365}=_0x52dada,_0x2e1035['event_aabz'](_0x433a78,_0x3a8365);}catch(_0x152db8){return _0x125bf6=_0x152db8,_0x588eb3[_0x2e541c(0xfa)]('event_common_absz',_0x125bf6);}}}else{var _0x59a3cf,_0x13eab7;try{if($gameTemp['nSaveData']==null)return;return _0x13eab7=_0x2357d9,$gameTemp['nSaveData'][_0x25be51(0x11c)](_0x13eab7,!![]);}catch(_0x5b0351){return _0x59a3cf=_0x5b0351,console[_0x25be51(0xfa)](_0x25be51(0x1a4),_0x59a3cf);}}},_0x32f9c6[_0x3916c3(0x18e)]=function(_0x28c76c){var _0x3a0076=_0x3916c3,_0x3b8cd9,_0x461683,_0x5c6edf;try{if(_0x3a0076(0x108)!==_0x3a0076(0x108)){function _0x1c4d39(){var _0x3acda8=_0x3a0076;return _0x3acda8(0x1a6)['p'](),_0x62ee72['onContinueSharedEvent'](_0x3ab390);}}else{_0x5c6edf=_0x28c76c[_0x3a0076(0x1a2)],_0x3b8cd9=_0x28c76c[_0x3a0076(0x19f)];if(_0x3b8cd9>0x0){if(_0x3a0076(0x161)===_0x3a0076(0x161)){if(_0x5c6edf!=null&&_0x5c6edf===$gameMap[_0x3a0076(0x1a2)]())return ANET['UI']['addMessageToChat'](_0x28c76c);}else{function _0x5389e9(){var _0x37fa5e=_0x3a0076;return _0xe4eb87[_0x37fa5e(0x12e)](_0x1c45c0,_0x4cdb60);}}}else return ANET['UI'][_0x3a0076(0x127)](_0x28c76c);}}catch(_0x36a419){if(_0x3a0076(0x142)===_0x3a0076(0x19d)){function _0x527f6f(){var _0xa6da10=_0x3a0076;this[_0xa6da10(0x16f)](0x0);}}else return _0x461683=_0x36a419,console[_0x3a0076(0xfa)](_0x3a0076(0x18e),_0x461683);}},_0x32f9c6[_0x3916c3(0x12a)]=function(_0x358272){var _0x56e432=_0x3916c3,_0x4a8476;try{return ANPlayersManager['onPlayerMove'](_0x358272['id'],_0x358272[_0x56e432(0x195)]);}catch(_0x1ac3e6){return _0x4a8476=_0x1ac3e6,console[_0x56e432(0xfa)]('event_map_playerMove',_0x4a8476);}},_0x32f9c6[_0x3916c3(0x16a)]=function(_0x1075c8){var _0x5f1981=_0x3916c3;if('gOMpn'!==_0x5f1981(0x118)){function _0x3d71fb(){var _0x730661=_0x5f1981,_0x3c49db;try{if(_0x39be85[_0x730661(0x1a2)]()===_0x21e531)return _0xe0425[_0x730661(0x1a1)]();}catch(_0x18ae90){return _0x3c49db=_0x18ae90,_0x2c6ce6['warn'](_0x730661(0x13a),_0x3c49db);}}}else{var _0x3ee7ba;try{return ANPlayersManager[_0x5f1981(0x119)](_0x1075c8['id'],_0x1075c8[_0x5f1981(0x195)]);}catch(_0x46057d){if(_0x5f1981(0x12c)!=='GazBT'){function _0x4d69b4(){var _0x3dac5b=_0x5f1981,_0x14ffbc;try{return _0x55dbc2['onBattleInputState'](_0x1ebb48[_0x3dac5b(0x145)],_0x1482a9['inputActorId']);}catch(_0x9d7bb9){return _0x14ffbc=_0x9d7bb9,_0x5a63c3[_0x3dac5b(0xfa)](_0x3dac5b(0x1a3),_0x14ffbc);}}}else return _0x3ee7ba=_0x46057d,console['warn']('event_map_playerLocation',_0x3ee7ba);}}},_0x32f9c6[_0x3916c3(0x13a)]=function(_0x30cae2){var _0x357b43=_0x3916c3,_0x217edb;try{if(_0x357b43(0x14b)!=='noJQv'){function _0x275c45(){var _0x5a1811=_0x357b43;return _0x287f66=_0x413e48,_0x29fb1d[_0x5a1811(0xfa)]('event_battle_inputAction',_0x43f9a1);}}else return ANMapManager[_0x357b43(0x1b5)](_0x30cae2[_0x357b43(0x1a2)],_0x30cae2['id'],_0x30cae2[_0x357b43(0x195)]);}catch(_0x2cb2db){return _0x217edb=_0x2cb2db,console[_0x357b43(0xfa)](_0x357b43(0x13a),_0x217edb);}},_0x32f9c6[_0x3916c3(0x141)]=function(_0x561fe1){var _0x1f38d3=_0x3916c3;if(_0x1f38d3(0x113)!=='kqNmx'){var _0x315c11;try{if('ZLQxI'==='ZLQxI'){if($gameMap[_0x1f38d3(0x1a2)]()===_0x561fe1)return ANMapManager[_0x1f38d3(0x1a1)]();}else{function _0x3913bd(){var _0x58a737=_0x1f38d3;if(_0x42e0dc[_0x58a737(0x16d)]==null)return;return _0xd3d5c1=_0x261273,_0x3bd915['nSaveData']['onAnswer'](_0x3b9621,!![]);}}}catch(_0x5f2ad0){return _0x315c11=_0x5f2ad0,console[_0x1f38d3(0xfa)](_0x1f38d3(0x13a),_0x315c11);}}else{function _0x3af015(){var _0x698b0d=_0x1f38d3;return _0x5b9d3f['p'](_0x698b0d(0x15a)+_0x5c75e9[_0x698b0d(0x13e)]+'\x20or\x20higher'),_0x377a2d[_0x698b0d(0x165)](_0x698b0d(0x170)+_0x22d180[_0x698b0d(0x115)]/0x64),_0x354bc0[_0x698b0d(0x199)]();}}},_0x32f9c6[_0x3916c3(0xf0)]=function(_0xd1b693){var _0x373f4d=_0x3916c3,_0x262b9e;try{return ANInterpreterManager[_0x373f4d(0x177)](_0xd1b693);}catch(_0x14d4b0){if(_0x373f4d(0x154)!=='MCbwq')return _0x262b9e=_0x14d4b0,console[_0x373f4d(0xfa)]('event_event_virtualEventCommand',_0x262b9e);else{function _0xa34dec(){return;}}}},_0x32f9c6[_0x3916c3(0x140)]=function(_0xfa136d){var _0x2df31a=_0x3916c3;if('LMWnC'===_0x2df31a(0xf9)){function _0x1c1e8f(){var _0x407b36=_0x2df31a;return _0x34df0b=_0x3b29b0,_0x16d775[_0x407b36(0xfa)]('event_common_forClients',_0x5527c2);}}else{var _0x32f73a;try{if(_0x2df31a(0xf6)==='Hvpls'){function _0x5c07e9(){var _0x1229c9=_0x2df31a;return _0x3e1c6f[_0x1229c9(0x1b3)](),_0x1229c9(0x1a5)['p']();}}else return ANBattleManager[_0x2df31a(0x18c)](_0xfa136d['id'],_0xfa136d[_0x2df31a(0x185)],_0xfa136d[_0x2df31a(0x195)]);}catch(_0x3bfd7b){if(_0x2df31a(0x14c)!==_0x2df31a(0x14c)){function _0x1f8428(){var _0x1344d5=_0x2df31a;return _0x1dec35=_0x28c1ec,_0x56b7e7[_0x1344d5(0xfa)](_0x1344d5(0x1a4),_0x2b3789);}}else return _0x32f73a=_0x3bfd7b,console['warn'](_0x2df31a(0x140),_0x32f73a);}}},_0x32f9c6['event_battle_animation']=function(_0x54c629){var _0x39da05=_0x3916c3,_0x233598;try{return ANBattleManager[_0x39da05(0x184)](_0x54c629);}catch(_0x567477){return _0x233598=_0x567477,console['warn'](_0x39da05(0x196),_0x233598);}},_0x32f9c6[_0x3916c3(0x1b4)]=function(_0x2967f2){var _0xc495bf=_0x3916c3,_0x3b5c4e;try{if('xSHwY'===_0xc495bf(0x157))return ANBattleManager[_0xc495bf(0x16c)]();else{function _0x3364c6(){return{cmd:_0x39c166,data:_0x16b6e4}=_0xdda5d2,_0x5bb645['event_aabz'](_0x244a63,_0x1dbe69);}}}catch(_0x4f3e05){return _0x3b5c4e=_0x4f3e05,console['warn'](_0xc495bf(0x156),_0x3b5c4e);}},_0x32f9c6['event_battle_logMessage']=function(_0x3bf76b){var _0x363aab=_0x3916c3;if(_0x363aab(0x131)===_0x363aab(0x190)){function _0x40dbdf(){var _0x462ccb=_0x363aab;return _0x4ffc36=_0x587366,_0x18fb97[_0x462ccb(0xfa)](_0x462ccb(0xf0),_0xada039);}}else{var _0x1eb3ff;try{return ANBattleManager['onLogWindowMessage'](_0x3bf76b[_0x363aab(0x18f)],_0x3bf76b['text']);}catch(_0x550a53){return _0x1eb3ff=_0x550a53,console['warn'](_0x363aab(0x15b),_0x1eb3ff);}}},_0x32f9c6['event_battle_input']=function(_0x630048){var _0x46b3b9=_0x3916c3;if(_0x46b3b9(0x19c)==='XxmFu'){function _0x2bf890(){var _0x1ecf1b=_0x46b3b9;_0x4a01b4['p']('Connected'),_0x550fbc['callback'](_0x22caaa[_0x1ecf1b(0x17c)]('serverVerCheck',_0x44dcec[_0x1ecf1b(0x13e)]),function(_0x3ce2b4){var _0xa77380=_0x1ecf1b;if(!_0x3ce2b4)return _0x973893['p']('Server\x20is\x20outdated,\x20require\x20rev.\x20'+_0x16c11f[_0xa77380(0x13e)]+'\x20or\x20higher'),_0x5cef78[_0xa77380(0x165)]('Server\x20version\x20is\x20outdated\x20for\x20this\x20Alpha\x20NET\x20Z\x20version\x20'+_0x51d35e[_0xa77380(0x115)]/0x64),_0x1cc323['stop']();});if(this['onConnectCallback']!=null)return this['onConnectCallback'](0x1);}}else{var _0x20143a;try{return ANBattleManager['onBattleInputState'](_0x630048[_0x46b3b9(0x145)],_0x630048[_0x46b3b9(0x159)]);}catch(_0x4e7069){return _0x20143a=_0x4e7069,console[_0x46b3b9(0xfa)](_0x46b3b9(0x1a3),_0x20143a);}}},_0x32f9c6[_0x3916c3(0x191)]=function(_0x167b2a){var _0x59e35a=_0x3916c3,_0x17e55f;try{if(_0x59e35a(0x16b)!==_0x59e35a(0x10b))return ANBattleManager['onBattleInputAction'](_0x167b2a[_0x59e35a(0x159)],_0x167b2a['action']);else{function _0x412c7c(){var _0x2bd9aa=_0x59e35a;return _0x375fa3=_0x838dfd,_0x45f4be[_0x2bd9aa(0xfa)](_0x2bd9aa(0x1a3),_0x5cb671);}}}catch(_0x457b60){if(_0x59e35a(0x136)!==_0x59e35a(0x136)){function _0x25bfae(){var _0x5ed4c1=_0x59e35a,_0xf0ef70;try{return _0x5bbfad['onEventMove'](_0x500858[_0x5ed4c1(0x1a2)],_0x5b7eb2['id'],_0x5628c8[_0x5ed4c1(0x195)]);}catch(_0x18a92b){return _0xf0ef70=_0x18a92b,_0x3f5c26['warn']('event_map_eventMove',_0xf0ef70);}}}else return _0x17e55f=_0x457b60,console[_0x59e35a(0xfa)](_0x59e35a(0x191),_0x17e55f);}},_0x32f9c6[_0x3916c3(0x167)]=function(_0x3c0994){var _0x20d80d=_0x3916c3;if('NMIbs'!==_0x20d80d(0x1b1)){function _0xcf3af0(){var _0x58af59=_0x20d80d,_0x127732;try{return _0x2c0e31[_0x58af59(0x13b)](_0x561037['id'],_0x390c21[_0x58af59(0x195)]);}catch(_0x3ebde0){return _0x127732=_0x3ebde0,_0x2cb321[_0x58af59(0xfa)](_0x58af59(0x135),_0x127732);}}}else{var _0x47f70a;try{return ANBattleManager[_0x20d80d(0x18d)](_0x3c0994);}catch(_0x426c46){return _0x47f70a=_0x426c46,console[_0x20d80d(0xfa)]('event_battle_serverBattleData',_0x47f70a);}}},_0x32f9c6['event_event_registerOnShared']=function(_0x5cfb16){var _0x433076=_0x3916c3,_0xa520da;try{return'SHARED\x20EVENT\x20IN'['p'](),ANInterpreterManager['onRegisterOnSharedEventRequest'](_0x5cfb16);}catch(_0xa99dc0){if(_0x433076(0x100)!==_0x433076(0x1ab))return _0xa520da=_0xa99dc0,console['warn']('event_event_registerOnShared',_0xa520da);else{function _0x3e9dd2(){var _0x2a0de3=_0x433076,_0x3f5650;try{return'SHARED\x20EVENT\x20IN'['p'](),_0x528f8b[_0x2a0de3(0x11e)](_0x2b51d6);}catch(_0x46f59f){return _0x3f5650=_0x46f59f,_0x4e5053[_0x2a0de3(0xfa)](_0x2a0de3(0x112),_0x3f5650);}}}}},_0x32f9c6[_0x3916c3(0x102)]=function(_0x46bf8d){var _0x438142=_0x3916c3;if(_0x438142(0x1af)===_0x438142(0x19b)){function _0x1e69b2(){var _0x2b7ad8=_0x438142,_0x4ff46c,_0x59a04d;try{if(_0x2f64fc['nSaveData']==null)return;return _0x59a04d=_0x54884c,_0x17639e[_0x2b7ad8(0x16d)][_0x2b7ad8(0x11c)](_0x59a04d,!![]);}catch(_0x2f3017){return _0x4ff46c=_0x2f3017,_0x572d3f['warn']('event_game_saveDataComplete',_0x4ff46c);}}}else{var _0x3c10fa;try{if(_0x438142(0x116)!=='yzlEh')return _0x438142(0xf2)['p'](),ANInterpreterManager[_0x438142(0x138)](_0x46bf8d);else{function _0xc92d88(){var _0x5dcafb=_0x438142,_0x308840;try{return _0x5dcafb(0xf2)['p'](),_0x3b921c[_0x5dcafb(0x138)](_0x39a9c9);}catch(_0x39c138){return _0x308840=_0x39c138,_0x493e95[_0x5dcafb(0xfa)](_0x5dcafb(0x102),_0x308840);}}}}catch(_0x315556){return _0x3c10fa=_0x315556,console[_0x438142(0xfa)](_0x438142(0x102),_0x3c10fa);}}},_0x32f9c6['event_event_sharedCanContinue']=function(_0x46d593){var _0x4197b1=_0x3916c3,_0x5c34f7;try{if(_0x4197b1(0x19a)===_0x4197b1(0x1a8)){function _0x197d62(){var _0x4a540e=_0x4197b1;return _0x3139a5=_0x3b1695,_0x10d039['warn'](_0x4a540e(0x14e),_0x1b0771);}}else return _0x4197b1(0x1a6)['p'](),ANInterpreterManager['onContinueSharedEvent'](_0x46d593);}catch(_0x4a99ce){if(_0x4197b1(0x144)===_0x4197b1(0x144))return _0x5c34f7=_0x4a99ce,console[_0x4197b1(0xfa)]('event_event_sharedCanContinue',_0x5c34f7);else{function _0x7c6636(){var _0x35d4bb=_0x4197b1;return _0x35d4bb(0x13c)['p'](),_0x5c50e2[_0x35d4bb(0x182)](_0xdc4c94),_0x100011[_0x35d4bb(0x164)](_0xb06859);}}}},_0x32f9c6[_0x3916c3(0x17f)]=function(_0x525da5){var _0x5279a7=_0x3916c3,_0x4740f5;try{return _0x5279a7(0x197)['p'](),ANInterpreterManager[_0x5279a7(0x13d)](_0x525da5);}catch(_0x2da297){return _0x4740f5=_0x2da297,console['warn'](_0x5279a7(0x17f),_0x4740f5);}},_0x32f9c6['event_event_sharedChoice']=function(_0x18b596){var _0x1e54e1=_0x3916c3,_0xf2db6e;try{if(_0x1e54e1(0x175)!==_0x1e54e1(0x134))return _0x1e54e1(0x147)['p'](),ANInterpreterManager['onSharedEventChoiceActionFromServer'](_0x18b596);else{function _0x78afc7(){var _0x21e377=_0x1e54e1;_0x3a159c[_0x21e377(0x198)]();}}}catch(_0x167a27){if(_0x1e54e1(0x18b)==='Truvc')return _0xf2db6e=_0x167a27,console[_0x1e54e1(0xfa)](_0x1e54e1(0x17f),_0xf2db6e);else{function _0x3f1c78(){return _0xd362ff['UI']['addMessageToChat'](_0x2fa071);}}}},_0x32f9c6[_0x3916c3(0x14e)]=function(_0x2d3daa){var _0x497d45=_0x3916c3,_0x11f43e,_0x12e948,_0x1323c1;try{return _0x497d45(0xfb)['p'](),{name:_0x1323c1,data:_0x11f43e}=_0x2d3daa,nAPI['onCustomCommand'](_0x1323c1,_0x11f43e);}catch(_0x3060c1){if(_0x497d45(0x139)!=='kKepy'){function _0x1c1570(){var _0x149524=_0x497d45;return _0x1a58cc=_0x3b2aa9,_0x293c05['warn'](_0x149524(0x18e),_0x366022);}}else return _0x12e948=_0x3060c1,console[_0x497d45(0xfa)](_0x497d45(0x14e),_0x12e948);}},_0x32f9c6[_0x3916c3(0x133)]=function(_0x3e8ae0){var _0x2fe8c7=_0x3916c3,_0x4e8529,_0x4f7d57,_0x4a9d89;try{return _0x2fe8c7(0x123)['p'](),{name:_0x4a9d89,commonEventId:_0x4e8529}=_0x3e8ae0,typeof $gameSystem!=='undefined'&&$gameSystem!==null?$gameSystem[_0x2fe8c7(0x179)](_0x4a9d89,_0x4e8529):void 0x0;}catch(_0x36485c){if(_0x2fe8c7(0x110)===_0x2fe8c7(0x110))return _0x4f7d57=_0x36485c,console[_0x2fe8c7(0xfa)](_0x2fe8c7(0x14e),_0x4f7d57);else{function _0x53f46e(){var _0x3528b7=_0x2fe8c7;return _0xb22fe9[_0x3528b7(0x13b)](_0x5272d5['id'],_0x126fa4[_0x3528b7(0x195)]);}}}},_0x32f9c6[_0x3916c3(0x158)]=function(_0x299a60){var _0xebd7ce=_0x3916c3,_0x3fac9b,_0x141196,_0x8ebdef;try{({cmd:_0x3fac9b,data:_0x141196}=_0x299a60);if(_0x3fac9b['contains'](_0xebd7ce(0x137)))return ANTradeManager[_0xebd7ce(0x12e)](_0x3fac9b,_0x141196);else{console['warn']('Unknown\x20common\x20subCommand\x20'+_0x3fac9b);switch(_0x3fac9b){case _0xebd7ce(0x10d):return NetClientMethodsManager[_0xebd7ce(0x1a7)](_0x3fac9b,_0x141196);default:return console['warn'](_0xebd7ce(0x183)+_0x3fac9b);}}}catch(_0x2ea53a){return _0x8ebdef=_0x2ea53a,console[_0xebd7ce(0xfa)](_0xebd7ce(0x158),_0x8ebdef);}},_0x32f9c6[_0x3916c3(0x189)]=function(_0x3308d8){var _0x29589e=_0x3916c3;if(_0x29589e(0x101)!==_0x29589e(0x180)){var _0x14eef1,_0x2e590d,_0xf19100;try{if(_0x29589e(0xef)==='exyxH'){function _0x4b7238(){var _0x465ddf=_0x29589e;return _0x5d033b=_0x43fabb,_0x48e069[_0x465ddf(0xfa)](_0x465ddf(0x16a),_0x12ff22);}}else return{cmd:_0x14eef1,data:_0x2e590d}=_0x3308d8,NetClientMethodsManager[_0x29589e(0x1a7)](_0x14eef1,_0x2e590d);}catch(_0x437848){if('sBEyp'==='sBEyp')return _0xf19100=_0x437848,console[_0x29589e(0xfa)](_0x29589e(0x189),_0xf19100);else{function _0x4b34f8(){var _0x33bb4f=_0x29589e;_0x25cb75[_0x33bb4f(0xfa)](_0x33bb4f(0x183)+_0x4cc42c);switch(_0x340104){case _0x33bb4f(0x10d):return _0x435c58[_0x33bb4f(0x1a7)](_0x332ebb,_0x339e47);default:return _0x39058c[_0x33bb4f(0xfa)](_0x33bb4f(0x183)+_0x407ce4);}}}}}else{function _0x35eb00(){var _0x35a61f=_0x29589e;return _0x4143bc=_0x5b5f15,_0x4ce200[_0x35a61f(0xfa)](_0x35a61f(0x13a),_0x4688b1);}}},_0x32f9c6[_0x3916c3(0x1a7)]=function(_0x1ee523,_0x174f26){var _0x3ef25f=_0x3916c3;if(_0x3ef25f(0x10c)==='rIYmb')return'EVENT_AABSZ'['p'](),console[_0x3ef25f(0x182)](_0x1ee523),console[_0x3ef25f(0x164)](_0x174f26);else{function _0xa1bdbc(){var _0x229f05=_0x3ef25f;return _0x19a344[_0x229f05(0x163)](_0x370d70['id'],_0x4a16d8[_0x229f05(0x195)]);}}};}());
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x4bfd=['_isDataChanged','battleMembers','Ufbww','ANBattleManager','local','AZlUW','_requestInitialSharedBattleRefresh','callBattleMethod','zesLf','eWRVb','shift','527073wyXaFL','inputtingAction','mirror','GGZex','QULsW','FpRwt','WAIT','127738veBzOs','atKZm','_battleMethodsPool','battleMethodReceived','2VulDTi','CgrEL','onBattleRegisterResult','uTNFo','netDataObserver','hIgoC','inBattle','RJpId','onLogWindowMessage','setEventCallback','wBTYA','isForceBattleSyncMode','fkrCY','OYwRL','_logWindow','hideLoader','313SXgltT','IpZNH','sendRegisterOnBattle','TIME\x20OUT','eacDP','Join\x20Shared\x20battle','send','started','JizpK','sendBattleStarted','SETUP','nSetNetworkBattle','yvZPk','itjjV','packForNetwork','fZZHg','FCokz','uZhrN','onBattleInputAction','NCMmB','SMRNp','registerOnLocalBattle','VUCpz','onBattleMethod','isOneBattler','onBattleAnimation','710470OtGXar','oIcJC','cEGdn','621997SBbTiH','Try\x20register\x20battle:\x20','onBattleStarted','onBattleInputState','options','_waitPool','resetWait','ended','sendBattleMethodReceived','Color','isShouldWaitServer','BLACK','sendBattleInputAction','CALL\x20BATTLE\x20METHOD','BfIBS','logMessage','_waitTimeout','requestAnimation','QKyZK','animation','updateWaiting','aDXzs','updateInputChange','kIDKB','battleMethod','onBattleEnd','register','animationId','DevLog','sendBattleEnded','isBattleLocal','actors','QbPMN','_currentActor','sendBattlerObserver','SevTf','1GtJvtW','battleId','kopsH','uMFlx','Utils','_lastBattleManagerInputActor','battleInputActionDone','update','isLocal','_lastBattleManagerInputValue','sendWindowLogMessage','pfLYa','oGezo','iGTiC','_previousNetBattleActors','targets','selectNextCommand','map','555YgCQlK','giUtX','isBattleRegistred','Battle','ZzZAr','getLightestColor','xJWex','length','sendBattleMethod','showLoader','VvVJj','myActorId','qmxms','41sImIje','hkWpg','FHdYK','unpackBattlerFromNetwork','nClearClientInput','battleData','clear','_registerToExistsSharedBattle','REGISTER\x20SUCCESS','isMV','_inputting','mEPqq','_waitMode','addText','dfAbo','2878HbkBbf','NetBattle','add','_eventCallback','zGkHq','nSetCurrentClientInput','isBattleMaster','460116NlkPKy','leader','onBattleMethodReceived','setColors','_callBattleMethodOnServer','fVYAd','setWait','wLqaF','info','sendInputState','ElUoA','sendBattleAnimation','push'];var a0_0x1f8615=a0_0xbc04;function a0_0xbc04(_0x224201,_0x3111e6){_0x224201=_0x224201-0x19e;var _0x4bfd3d=a0_0x4bfd[_0x224201];return _0x4bfd3d;}(function(_0x192def,_0x5e7849){var _0x8a6ba5=a0_0xbc04;while(!![]){try{var _0x225b15=parseInt(_0x8a6ba5(0x1fc))+parseInt(_0x8a6ba5(0x1cb))*parseInt(_0x8a6ba5(0x220))+-parseInt(_0x8a6ba5(0x1df))*-parseInt(_0x8a6ba5(0x232))+-parseInt(_0x8a6ba5(0x23f))*parseInt(_0x8a6ba5(0x1a5))+parseInt(_0x8a6ba5(0x1c4))+parseInt(_0x8a6ba5(0x1ac))+parseInt(_0x8a6ba5(0x1cf))*-parseInt(_0x8a6ba5(0x1f9));if(_0x225b15===_0x5e7849)break;else _0x192def['push'](_0x192def['shift']());}catch(_0x3bd731){_0x192def['push'](_0x192def['shift']());}}}(a0_0x4bfd,0x5abf5),window[a0_0x1f8615(0x1bc)]=function(){},function(){var _0x27ebb2=a0_0x1f8615,_0x1a8c7d,_0x70b94b;_0x1a8c7d=new KDCore[(_0x27ebb2(0x218))](_0x27ebb2(0x1a6)),_0x1a8c7d[_0x27ebb2(0x1af)](KDCore[_0x27ebb2(0x205)]['RED'],KDCore[_0x27ebb2(0x205)][_0x27ebb2(0x207)][_0x27ebb2(0x237)](0x87)),_0x1a8c7d['on'](),_0x70b94b=window[_0x27ebb2(0x1bc)],_0x70b94b['isBattleMaster']=function(){var _0xd58f2=_0x27ebb2;if(_0xd58f2(0x236)!==_0xd58f2(0x236)){function _0x169a2d(){_0x25f982=_0x4e2125,_0x29c46a['w'](_0xf12461);}}else return this[_0xd58f2(0x244)]!=null?this[_0xd58f2(0x244)]['actors'][0x0]===ANGameManager[_0xd58f2(0x23d)]():$gameParty[_0xd58f2(0x1d5)]();},_0x70b94b[_0x27ebb2(0x234)]=function(){var _0x1705a1=_0x27ebb2;return this[_0x1705a1(0x244)]!=null;},_0x70b94b['isBattleLocal']=function(){var _0x1b510c=_0x27ebb2;if('ElUoA'===_0x1b510c(0x1b6)){if(this[_0x1b510c(0x244)]!=null){if(_0x1b510c(0x1b3)!==_0x1b510c(0x1c8))return this[_0x1b510c(0x244)][_0x1b510c(0x228)];else{function _0x477823(){_0x293491[_0x38d54f](_0x4b0764);}}}else{if(_0x1b510c(0x1d9)===_0x1b510c(0x1d9))return!![];else{function _0x5baf1c(){var _0x35c1c6=_0x1b510c;this['_callBattleMethodOnServer'](...this[_0x35c1c6(0x1cd)][_0x35c1c6(0x1c3)]());}}}}else{function _0x3182d2(){_0x3204ab=_0x209830,_0x5a5842['w'](_0x1d444e);}}},_0x70b94b[_0x27ebb2(0x206)]=function(){var _0x3232fc=_0x27ebb2;return this[_0x3232fc(0x1a2)]!=null;},_0x70b94b[_0x27ebb2(0x1ba)]=function(){var _0x3e5382=_0x27ebb2;if(_0x3e5382(0x1c7)===_0x3e5382(0x241)){function _0x4c376d(){var _0x2703c9=_0x3e5382,_0x5a43fc;_0x2703c9(0x19e)['p'](),this[_0x2703c9(0x244)]=_0x427b2a,_0x5a43fc=_0x5dce24[_0x2703c9(0x1a8)],_0x49f903['setup'](..._0x558bd6[_0x2703c9(0x200)]),_0x5a43fc!=null&&_0x234054[_0x2703c9(0x1d8)](_0x5a43fc),_0x2703c9(0x1e9)['p'](_0x1b332f[_0x2703c9(0x200)]),_0x333b43[_0x2703c9(0x1b4)](_0xb1fdc0),!this['isBattleMaster']()&&this[_0x2703c9(0x246)]();}}else return this[_0x3e5382(0x234)]()?this['battleData'][_0x3e5382(0x21b)][_0x3e5382(0x231)](function(_0x3c81e5){var _0x1fe503=_0x3e5382;if(_0x1fe503(0x1c1)!==_0x1fe503(0x1c1)){function _0x343d57(){var _0x1a8f2f=_0x1fe503;return _0x489a7d[_0x1a8f2f(0x1d1)](_0x2cdf2c);}}else return $gameActors['actor'](_0x3c81e5);}):[$gameParty[_0x3e5382(0x1ad)]()];},_0x70b94b[_0x27ebb2(0x1b2)]=function(_0x207c7e){var _0x394cb5=_0x27ebb2;if('DgrpC'!==_0x394cb5(0x1dc))return this[_0x394cb5(0x1a2)]=_0x207c7e,this[_0x394cb5(0x201)]=0x0,this[_0x394cb5(0x20c)]=0x168,HUIManager[_0x394cb5(0x23b)](0x3e8);else{function _0x751606(){var _0x157bb3=_0x394cb5;return this[_0x157bb3(0x1a2)]=_0x513e0c,this[_0x157bb3(0x201)]=0x0,this['_waitTimeout']=0x168,_0x1cf019[_0x157bb3(0x23b)](0x3e8);}}},_0x70b94b[_0x27ebb2(0x202)]=function(){var _0x33ae19=_0x27ebb2;return this['setWait'](null),HUIManager[_0x33ae19(0x1de)]();},_0x70b94b[_0x27ebb2(0x227)]=function(){var _0x5847da=_0x27ebb2;if(_0x5847da(0x21c)!==_0x5847da(0x21c)){function _0x45df25(){var _0x463286=_0x5847da;this[_0x463286(0x1cd)][_0x463286(0x239)]>0x0&&this[_0x463286(0x1b0)](...this[_0x463286(0x1cd)]['shift']()),_0x242343['isLoaderActive']()&&_0x380c6a['hideLoader']();}}else{if(this['isShouldWaitServer']()){if(_0x5847da(0x1c9)===_0x5847da(0x222)){function _0x27db83(){var _0x3c2d6e=_0x5847da;_0x3a9030[_0x3c2d6e(0x1a3)](_0x5d4ce9);}}else{if(this[_0x5847da(0x20c)]<=0x0)_0x1a8c7d['p'](_0x5847da(0x1e2)),this[_0x5847da(0x202)]();else{if(_0x5847da(0x1ef)===_0x5847da(0x1ef))this['_waitTimeout']--,this[_0x5847da(0x210)]();else{function _0x17b507(){var _0x5282da=_0x5847da;_0x49aef3['PP'][_0x5282da(0x1da)]()&&this[_0x5282da(0x204)](),_0x27ebbf=_0x268c46[_0x5282da(0x224)][_0x5282da(0x242)](_0x553a33),_0xd40df6[_0x387dd1]!=null&&_0x9b565e[_0xc7ec42](_0x2f600a);}}}}}else{this['_battleMethodsPool'][_0x5847da(0x239)]>0x0&&this[_0x5847da(0x1b0)](...this[_0x5847da(0x1cd)]['shift']());if(HUIManager['isLoaderActive']()){if(_0x5847da(0x1cc)===_0x5847da(0x1cc))HUIManager[_0x5847da(0x1de)]();else{function _0x1d12de(){var _0x4aad28=_0x5847da;return _0x2a7b1c[_0x4aad28(0x1aa)]();}}}}}},_0x70b94b[_0x27ebb2(0x210)]=function(){var _0x39bcb1=_0x27ebb2;if(!this['isShouldWaitServer']()){if(_0x39bcb1(0x1f3)==='SMRNp')return;else{function _0x4579af(){var _0x489fe6=_0x39bcb1,_0x26e59b,_0x3e4224;if(_0x179236[_0x489fe6(0x1f7)]())return;_0x26e59b=_0x57dac9['map'](function(_0x340d6f){return _0x340d6f['packForNetwork']();}),_0x3e4224={'animationId':_0xb613be,'mirror':_0x1f75b4,'targets':_0x26e59b},this[_0x489fe6(0x1b7)](_0x3e4224);}}}_0x39bcb1(0x1ca)['p'](this[_0x39bcb1(0x201)]);switch(this[_0x39bcb1(0x1a2)]){case _0x39bcb1(0x214):this['_waitPool']===$gameParty[_0x39bcb1(0x1ba)]()[_0x39bcb1(0x239)]&&this[_0x39bcb1(0x202)]();}},_0x70b94b[_0x27ebb2(0x212)]=function(){var _0x3c83ac=_0x27ebb2;if(_0x3c83ac(0x211)===_0x3c83ac(0x1b1)){function _0x3981a5(){_0x47edfd=_0xaf03c,_0x5ab98e['w'](_0x21ffa9);}}else{if($gameParty[_0x3c83ac(0x1f7)]())return;if(this[_0x3c83ac(0x225)]!==BattleManager[_0x3c83ac(0x21d)]){if('XTyST'!==_0x3c83ac(0x23e))this['_lastBattleManagerInputActor']=BattleManager['_currentActor'],this[_0x3c83ac(0x1b5)]();else{function _0x45743d(){var _0x4df606=_0x3c83ac;!this[_0x4df606(0x21a)]()&&this['sendBattleEnded'](),this[_0x4df606(0x244)]=null;}}}else{if(this[_0x3c83ac(0x229)]!==BattleManager[_0x3c83ac(0x1a0)]){if(_0x3c83ac(0x1d6)===_0x3c83ac(0x1d6))this['_lastBattleManagerInputValue']=BattleManager[_0x3c83ac(0x1a0)],this[_0x3c83ac(0x1b5)]();else{function _0x4d34f0(){return;}}}}}},_0x70b94b[_0x27ebb2(0x1f4)]=function(){var _0x319575=_0x27ebb2;this[_0x319575(0x244)]={'isLocal':!![],'battleId':_0x319575(0x1bd),'actors':[ANGameManager[_0x319575(0x23d)]()]},_0x1a8c7d['p']('STARTED\x20LOCAL\x20BATTLE');},_0x70b94b[_0x27ebb2(0x1fe)]=function(){var _0x3c5201=_0x27ebb2;if(_0x3c5201(0x223)!==_0x3c5201(0x1be))this['_battleMethodsPool']=[],this[_0x3c5201(0x229)]=![],this['_lastBattleManagerInputActor']=null,this[_0x3c5201(0x1e8)]();else{function _0x567391(){var _0x988ef0=_0x3c5201;return this[_0x988ef0(0x1b2)](null),_0x3ea4a0[_0x988ef0(0x1de)]();}}},_0x70b94b[_0x27ebb2(0x215)]=function(){var _0x192bbb=_0x27ebb2;!this[_0x192bbb(0x21a)]()&&this[_0x192bbb(0x219)](),this['battleData']=null;},_0x70b94b[_0x27ebb2(0x1c0)]=function(_0x1967f1,_0x2eb15a,_0x740171){var _0x576397=_0x27ebb2;if('hkWpg'!==_0x576397(0x240)){function _0x24a0ac(){var _0x15c978=_0x576397;_0x1d5788[_0x15c978(0x245)]();}}else{if($gameParty['isOneBattler']())return;if(ANET['PP'][_0x576397(0x1da)]()){if(this['_battleMethodsPool']==null){if(_0x576397(0x1fb)===_0x576397(0x1bb)){function _0x196565(){var _0x3fd0bc=_0x576397;this[_0x3fd0bc(0x204)]();}}else this[_0x576397(0x1cd)]=[];}this['_battleMethodsPool'][_0x576397(0x1b8)]([_0x1967f1,_0x2eb15a,_0x740171]);}else{if(_0x576397(0x1e3)===_0x576397(0x22c)){function _0x4717e7(){var _0x4b0da3=_0x576397;return _0x3c591f[_0x4b0da3(0x1ed)]();}}else this[_0x576397(0x1b0)](_0x1967f1,_0x2eb15a,_0x740171);}}},_0x70b94b['_callBattleMethodOnServer']=function(_0x156710,_0x12546a,_0xdf7617){var _0xae2c84=_0x27ebb2;if(_0xae2c84(0x1f5)===_0xae2c84(0x1f5))_0xae2c84(0x209)['p'](),ANSyncDataManager[_0xae2c84(0x21e)](_0x156710),_0x156710[_0xae2c84(0x1d3)][_0xae2c84(0x1b9)]=!![],this['sendBattleMethod'](_0x12546a,_0x156710[_0xae2c84(0x1ed)](),_0xdf7617),ANET['PP'][_0xae2c84(0x1da)]()&&(this[_0xae2c84(0x1b2)](_0xae2c84(0x214)),this[_0xae2c84(0x201)]+=0x1);else{function _0x34559c(){var _0x42c90a=_0xae2c84;return this[_0x42c90a(0x1a2)]!=null;}}},_0x70b94b[_0x27ebb2(0x20d)]=function(_0x6f0189,_0x107af8,_0xd293c5=![]){var _0x34ec41=_0x27ebb2;if(_0x34ec41(0x23c)===_0x34ec41(0x213)){function _0x197608(){var _0x217000=_0x34ec41;_0x3d97b6[_0x217000(0x1d8)](_0x2a0146);}}else{var _0x15a435,_0x3ddb82;if($gameParty[_0x34ec41(0x1f7)]())return;_0x15a435=_0x6f0189['map'](function(_0x14f837){var _0x27fa2c=_0x34ec41;return _0x14f837[_0x27fa2c(0x1ed)]();}),_0x3ddb82={'animationId':_0x107af8,'mirror':_0xd293c5,'targets':_0x15a435},this['sendBattleAnimation'](_0x3ddb82);}},_0x70b94b[_0x27ebb2(0x226)]=function(){var _0x54a531=_0x27ebb2,_0x5776e8;_0x5776e8=BattleManager[_0x54a531(0x1c5)]();if(KDCore['isMV']()){if(_0x5776e8==null)return;}this['sendBattleInputAction'](ANGameManager[_0x54a531(0x23d)](),_0x5776e8);},_0x70b94b['registerOnBattle']=function(_0x5558ac){var _0x1f3768=_0x27ebb2;return _0x1a8c7d['p'](_0x1f3768(0x1fd)+_0x5558ac[_0x1f3768(0x221)]),this[_0x1f3768(0x1e1)](_0x5558ac);},_0x70b94b[_0x27ebb2(0x246)]=function(){var _0x1bda5b=_0x27ebb2;_0x1a8c7d['p'](_0x1bda5b(0x1e4)),$gameTemp[_0x1bda5b(0x1bf)]=!![];},_0x70b94b[_0x27ebb2(0x208)]=function(_0x47c795,_0x53cd24){var _0x31bdfc=_0x27ebb2;if(_0x31bdfc(0x1d0)!==_0x31bdfc(0x1d0)){function _0x2df2dc(){var _0x63f7ca=_0x31bdfc;_0x2f3060[_0x63f7ca(0x22e)]=[...this[_0x63f7ca(0x244)]['actors']],this['battleData']=_0x487494;}}else ANNetwork['send'](NMS['Battle']('inputAction',{'action':_0x53cd24,'inputActorId':_0x47c795}));},_0x70b94b[_0x27ebb2(0x1b5)]=function(){var _0x49cf42=_0x27ebb2,_0x3c804a,_0x8056e2;_0x8056e2=BattleManager[_0x49cf42(0x1a0)];if(BattleManager['_currentActor']!=null){if('eguLr'!==_0x49cf42(0x1eb))_0x3c804a=BattleManager[_0x49cf42(0x21d)]['actorId']();else{function _0x45b50c(){return;}}}else _0x3c804a=null;ANNetwork[_0x49cf42(0x1e5)](NMS[_0x49cf42(0x235)]('input',{'inputState':_0x8056e2,'inputActorId':_0x3c804a}));},_0x70b94b[_0x27ebb2(0x22a)]=function(_0x316598,_0x29977e){var _0x9527a=_0x27ebb2;if('tuFkL'===_0x9527a(0x1db)){function _0x13ecdb(){var _0x4744ff=_0x9527a;_0xc581c1[_0x4744ff(0x1de)]();}}else ANNetwork['send'](NMS['Battle'](_0x9527a(0x20b),{'cmd':_0x316598,'text':_0x29977e}));},_0x70b94b[_0x27ebb2(0x1e8)]=function(){var _0x4beb33=_0x27ebb2;if(_0x4beb33(0x1a4)!==_0x4beb33(0x1ee))return ANNetwork['send'](NMS['Battle'](_0x4beb33(0x1e6)));else{function _0x4e4b40(){var _0x165ab5=_0x4beb33;return this[_0x165ab5(0x244)]['isLocal'];}}},_0x70b94b[_0x27ebb2(0x219)]=function(){var _0x2f99a8=_0x27ebb2;return ANNetwork[_0x2f99a8(0x1e5)](NMS[_0x2f99a8(0x235)](_0x2f99a8(0x203)));},_0x70b94b['sendBattleMethod']=function(_0x5483ad,_0x122a46,_0x39a713){var _0x26b790=_0x27ebb2;if(_0x26b790(0x20a)!=='SgyIb'){var _0x3c2c80;_0x3c2c80={'method':_0x5483ad,'id':_0x122a46,'data':_0x39a713},ANNetwork[_0x26b790(0x1e5)](NMS[_0x26b790(0x235)]('battleMethod',_0x3c2c80),!![]);}else{function _0x9bd93b(){var _0x113031=_0x26b790;_0x2c37f6[_0x113031(0x1e5)](_0x472e06[_0x113031(0x235)](_0x113031(0x20f),_0x41c326));}}},_0x70b94b['sendBattleAnimation']=function(_0x1933e0){var _0x1e68c2=_0x27ebb2;ANNetwork[_0x1e68c2(0x1e5)](NMS[_0x1e68c2(0x235)](_0x1e68c2(0x20f),_0x1933e0));},_0x70b94b[_0x27ebb2(0x204)]=function(){var _0x459133=_0x27ebb2;ANNetwork[_0x459133(0x1e5)](NMS[_0x459133(0x235)](_0x459133(0x1ce)));},_0x70b94b[_0x27ebb2(0x1e1)]=function(_0x2e5f38){var _0x9f68de=_0x27ebb2;ANNetwork['get'](NMS[_0x9f68de(0x235)](_0x9f68de(0x216),_0x2e5f38),function(_0x1209c1){return ANBattleManager['onBattleRegisterResult'](_0x1209c1);},function(){var _0x5970e0=_0x9f68de;if(_0x5970e0(0x1ec)==='LmAhX'){function _0x4f9530(){var _0x2237f8=_0x5970e0;this[_0x2237f8(0x20c)]--,this[_0x2237f8(0x210)]();}}else return BattleManager[_0x5970e0(0x1ea)](null),ANBattleManager['registerOnLocalBattle']();});},_0x70b94b['onBattleDataFromServer']=function(_0x39f071){var _0x2fd77a=_0x27ebb2;if(!this['isBattleRegistred']()){if(_0x2fd77a(0x1e0)!==_0x2fd77a(0x1e0)){function _0x384c27(){return;}}else return;}if(this[_0x2fd77a(0x21a)]()){if(_0x2fd77a(0x1e7)!==_0x2fd77a(0x1e7)){function _0x4adfa7(){var _0x55922e=_0x2fd77a;if(!this[_0x55922e(0x206)]())return;_0x55922e(0x1ca)['p'](this[_0x55922e(0x201)]);switch(this[_0x55922e(0x1a2)]){case _0x55922e(0x214):this[_0x55922e(0x201)]===_0x27f9ed[_0x55922e(0x1ba)]()[_0x55922e(0x239)]&&this[_0x55922e(0x202)]();}}}else return;}if(this[_0x2fd77a(0x244)][_0x2fd77a(0x221)]===_0x39f071['battleId']){if(_0x2fd77a(0x1a9)!=='qhdcV')$gameTemp['_previousNetBattleActors']=[...this['battleData']['actors']],this[_0x2fd77a(0x244)]=_0x39f071;else{function _0x372541(){var _0x5d7ed3=_0x2fd77a;return _0x1306e1[_0x5d7ed3(0x1ea)](null),_0x4d7e55['registerOnLocalBattle']();}}}},_0x70b94b[_0x27ebb2(0x1d1)]=function(_0x48a341){var _0x124114=_0x27ebb2,_0x5bc67e;_0x124114(0x19e)['p'](),this[_0x124114(0x244)]=_0x48a341,_0x5bc67e=BattleManager['_eventCallback'],BattleManager['setup'](..._0x48a341['options']),_0x5bc67e!=null&&BattleManager[_0x124114(0x1d8)](_0x5bc67e),_0x124114(0x1e9)['p'](_0x48a341[_0x124114(0x200)]),console[_0x124114(0x1b4)](_0x48a341),!this['isBattleMaster']()&&this[_0x124114(0x246)]();},_0x70b94b[_0x27ebb2(0x1f8)]=function(_0x210156){var _0x1ded5b=_0x27ebb2;if(_0x1ded5b(0x233)!==_0x1ded5b(0x233)){function _0x5e4cc8(){var _0x2482e2=_0x1ded5b;return _0x2f9ead[_0x2482e2(0x1e5)](_0x30eb2e[_0x2482e2(0x235)](_0x2482e2(0x1e6)));}}else{var _0x5442d5,_0x162640;try{_0x162640=_0x210156[_0x1ded5b(0x22f)][_0x1ded5b(0x231)](function(_0x50436b){var _0x1dde0f=_0x1ded5b;if(_0x1dde0f(0x1f0)!==_0x1dde0f(0x1f2))return ANET[_0x1dde0f(0x224)][_0x1dde0f(0x242)](_0x50436b);else{function _0x33864e(){_0x660db4=_0x51d17d,_0x2a6ae2['w'](_0x9b367b);}}}),$gameTemp[_0x1ded5b(0x20d)](_0x162640,_0x210156[_0x1ded5b(0x217)],_0x210156[_0x1ded5b(0x1c6)]);}catch(_0x3c0c10){_0x5442d5=_0x3c0c10,ANET['w'](_0x5442d5);}}},_0x70b94b[_0x27ebb2(0x1f6)]=function(_0x34a417,_0x3b46d3,_0x3d2f3b){var _0xbdba72=_0x27ebb2,_0x9ee01a,_0xa31bbc;try{ANET['PP'][_0xbdba72(0x1da)]()&&this[_0xbdba72(0x204)](),_0x9ee01a=ANET[_0xbdba72(0x224)][_0xbdba72(0x242)](_0x34a417),_0x9ee01a[_0x3b46d3]!=null&&_0x9ee01a[_0x3b46d3](_0x3d2f3b);}catch(_0x443faa){_0xa31bbc=_0x443faa,ANET['w'](_0xa31bbc);}},_0x70b94b[_0x27ebb2(0x1ae)]=function(){var _0x2adbfb=_0x27ebb2,_0x1cd35d;try{if(_0x2adbfb(0x22d)!=='iGTiC'){function _0xafd984(){var _0x5dc10e=_0x2adbfb;_0xcf5795['get'](_0x1199a5[_0x5dc10e(0x235)]('register',_0x120921),function(_0x9616cb){return _0x378817['onBattleRegisterResult'](_0x9616cb);},function(){var _0x231421=_0x5dc10e;return _0xa561b7[_0x231421(0x1ea)](null),_0x5a301d[_0x231421(0x1f4)]();});}}else this['_waitPool']+=0x1;}catch(_0x418ae4){_0x1cd35d=_0x418ae4,ANET['w'](_0x1cd35d);}},_0x70b94b[_0x27ebb2(0x1ff)]=function(_0x15d76a,_0xdbf144){var _0x2a322a=_0x27ebb2,_0x5bcc27;try{if(!$gameParty[_0x2a322a(0x1d5)]()){if(_0x2a322a(0x21f)===_0x2a322a(0x1d4)){function _0x19fa38(){var _0x20eef=_0x2a322a;_0x20eef(0x209)['p'](),_0x197cdc[_0x20eef(0x21e)](_0x5033aa),_0x1ed6cc['netDataObserver'][_0x20eef(0x1b9)]=!![],this[_0x20eef(0x23a)](_0xd9de94,_0x24f0c8[_0x20eef(0x1ed)](),_0x1170bf),_0x46ee68['PP']['isForceBattleSyncMode']()&&(this[_0x20eef(0x1b2)](_0x20eef(0x214)),this[_0x20eef(0x201)]+=0x1);}}else return;}BattleManager[_0x2a322a(0x1a0)]=_0x15d76a;if(_0xdbf144===ANGameManager[_0x2a322a(0x23d)]())return BattleManager['nSetCurrentClientInput']();else{if('sUORc'!=='ignpJ')return BattleManager[_0x2a322a(0x243)]();else{function _0x303825(){var _0xa65c25=_0x2a322a,_0x2a9a5;try{this[_0xa65c25(0x201)]+=0x1;}catch(_0xa55f74){_0x2a9a5=_0xa55f74,_0x6e65c5['w'](_0x2a9a5);}}}}}catch(_0x352e33){if(_0x2a322a(0x238)!==_0x2a322a(0x238)){function _0xe89921(){var _0x1adb18=_0x2a322a,_0x577524;_0x577524=_0x380602[_0x1adb18(0x1c5)]();if(_0x3e0fe0[_0x1adb18(0x19f)]()){if(_0x577524==null)return;}this[_0x1adb18(0x208)](_0x53332f[_0x1adb18(0x23d)](),_0x577524);}}else _0x5bcc27=_0x352e33,ANET['w'](_0x5bcc27);}},_0x70b94b[_0x27ebb2(0x1f1)]=function(_0x5749f5,_0x19da86){var _0x1106c5=_0x27ebb2;if(_0x1106c5(0x1fa)===_0x1106c5(0x1fa)){var _0xd18d70;try{if(_0x1106c5(0x22b)===_0x1106c5(0x1c2)){function _0x2ffc3b(){var _0x29435f=_0x1106c5;this[_0x29435f(0x229)]=_0x1aeb74[_0x29435f(0x1a0)],this['sendInputState']();}}else{if(!ANGameManager[_0x1106c5(0x1ab)]())return;return BattleManager[_0x1106c5(0x1c5)]()['setFromNetwork'](_0x19da86),BattleManager[_0x1106c5(0x230)]();}}catch(_0x2db1ef){_0xd18d70=_0x2db1ef,ANET['w'](_0xd18d70);}}else{function _0x1aa8d3(){if(_0x3ad54e==null)return;}}},_0x70b94b[_0x27ebb2(0x1d7)]=function(_0x3c6e8d,_0x2172de){var _0x19c476=_0x27ebb2;if(_0x19c476(0x1a1)===_0x19c476(0x1a1)){var _0x190e12,_0x4a7b8d,_0x3c8ef1;try{if(!$gameParty['inBattle']())return;switch(_0x3c6e8d){case _0x19c476(0x1a7):(_0x4a7b8d=BattleManager[_0x19c476(0x1dd)])!=null&&_0x4a7b8d[_0x19c476(0x1a3)](_0x2172de);break;default:if((_0x3c8ef1=BattleManager[_0x19c476(0x1dd)])!=null){if(_0x19c476(0x1d2)!=='EpnLW')_0x3c8ef1['clear']();else{function _0x449c70(){return;}}}}}catch(_0x455f9f){if(_0x19c476(0x20e)==='WXisa'){function _0x54888c(){var _0x31867a=_0x19c476;return this[_0x31867a(0x244)]!=null?this[_0x31867a(0x244)][_0x31867a(0x228)]:!![];}}else _0x190e12=_0x455f9f,ANET['w'](_0x190e12);}}else{function _0x28540b(){var _0x8c639d=_0x19c476;this[_0x8c639d(0x1b2)](_0x8c639d(0x214)),this[_0x8c639d(0x201)]+=0x1;}}};}());
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x2ae4=['VOXFw','Utils','cldxt','cxiBI','eyqLl','AnEMa','qMRCW','Virtual','Same\x20map','forceCancelSharedEvent','send','sendEventStarted','mapId','nOnSyncedEventCommandResponse','ZVYiN','scope','ivpeX','parameters','676992DofEFN','ANInterpreterManager','eventStarted','_reservedNetworkSharedEvent','sharedCanContinue','NGZDm','Common\x20Event','isSharedEventMaster','reserveNetworkSharedEvent','681654MeIYrQ','SEND\x20ALL\x20CANCEL\x20EVENT','YELLOW','tCVqi','resetSharedEvent','onRegisterOnSharedEventRequest','System','XeRQH','Color','setup','MyyKA','nSyncWaitCommandData','iSIQC','eventId','registerOnShared','onSharedEventChoiceActionFromServer','registerDone','BUanK','setValue','TSbva','eventProcessExit','YxfMK','index','35wtkZip','IQzMY','nIsSharedEventCanBeForceCancelled','HMURS','Shared\x20event\x20registred\x20','npKlu','mFkMh','upnyy','qPBbE','JshDA','executeCommand','zMwwo','undefined','reserveVirtualCommonEvent','sendChoiceSelection','onSharedEventForceCancelFromServer','GVEUu','_shouldForceExitSharedEvent','wkfli','sendEventVirtualCommand','event','sendForceCancelSharedEvent','DevLog','ChOpe','startVirtualCommand','vHmKI','setupSharedInterpreter','isEventRunning','fnYHU','options','isSharedEventIsRunning','sendSharedEventRequireRegister','jogCi','45mvCvBW','BpFpy','LeUTZ','789246TOtmzY','checkEventRunning','isBusy','ejSVN','Shared\x20event\x20force\x20cancelled','GCGlI','code','showWaitPlayersOnSharedEvent','_interpreter','getLightestColor','onRegisterOnSharedEventResponse','NetIntr','sendSharedEventRegisteredDone','eventEnded','jxBFo','XsLLT','_sharedInterpreter','rwqJY','Shared\x20Choice\x20accepted\x20from\x20server','isNetworkSharedEventReserved','sharedChoice','retrieveNetworkSharedEvent','152822MxqBlV','92429ZebALu','18523avRmKh','virtualEventCommand','sendEventEnded','OpbFJ','contains','mSRSW','sendSharedEventReadyToContinue','setColors','oeVLV','9BjYPOD','ieHam','Waiting\x20players','nSetEndCallback','16015GzcpIP','_sharedEventMaster','nSelectionActionFromNetwork','LPOMD','VfsaV','4dxYEfE','indent','ddMaZ','onVirtualCommand','hideWaitPlayersOnSharedEvent','mbrRB','isVirtualCommand','Event','Press\x20ESC\x20to\x20cancel','showWaitingInfo','myPlayerData','hideWaitingInfo','qCetZ'];function a0_0x3ffc(_0x9115a,_0xd75ce8){_0x9115a=_0x9115a-0x1c6;var _0x2ae427=a0_0x2ae4[_0x9115a];return _0x2ae427;}var a0_0x373319=a0_0x3ffc;(function(_0xe4727d,_0x4560b0){var _0x5048ab=a0_0x3ffc;while(!![]){try{var _0x3b629e=parseInt(_0x5048ab(0x1df))*parseInt(_0x5048ab(0x1cb))+parseInt(_0x5048ab(0x1da))*-parseInt(_0x5048ab(0x23f))+parseInt(_0x5048ab(0x1cc))*-parseInt(_0x5048ab(0x1d6))+parseInt(_0x5048ab(0x21e))*parseInt(_0x5048ab(0x1cd))+parseInt(_0x5048ab(0x207))+parseInt(_0x5048ab(0x242))+-parseInt(_0x5048ab(0x1fe));if(_0x3b629e===_0x4560b0)break;else _0xe4727d['push'](_0xe4727d['shift']());}catch(_0x5a5d2e){_0xe4727d['push'](_0xe4727d['shift']());}}}(a0_0x2ae4,0x7a4e5),window[a0_0x373319(0x1ff)]=function(){},function(){var _0x501464=a0_0x373319,_0x18a7ab,_0x421f7f;_0x18a7ab=new KDCore[(_0x501464(0x234))](_0x501464(0x24d)),_0x18a7ab[_0x501464(0x1d4)](KDCore[_0x501464(0x20f)][_0x501464(0x209)],KDCore['Color']['BLACK'][_0x501464(0x24b)](0xf)),_0x18a7ab['on'](),_0x421f7f=window[_0x501464(0x1ff)],_0x421f7f[_0x501464(0x21b)]=function(){var _0xf895fe=_0x501464;if(_0xf895fe(0x211)!==_0xf895fe(0x211)){function _0xbfdf6c(){return;}}else{if($gameMessage['isBusy']()){if(_0xf895fe(0x23e)===_0xf895fe(0x23e))$gameMessage[_0xf895fe(0x1d9)](_0x421f7f[_0xf895fe(0x21b)]);else{function _0x42295f(){({mapId:_0x3c240a,eventId:_0x470ecd,index:_0x466499,indent:_0x1e5270}=_0x2fa2c9);if(_0x5362a3['mapId']()!==_0x57fa7e)return;if(_0x5ae6c0['isSharedEventIsRunning']())return;if(_0x5087ad!==0x0)return;_0x53e4b6['reserveNetworkSharedEvent'](_0x130f36);return;}}}else!$gameMap['isEventRunning']()&&(_0x421f7f[_0xf895fe(0x1cf)](),_0x421f7f[_0xf895fe(0x20b)]());}},_0x421f7f[_0x501464(0x243)]=function(){var _0x2f2f5e=_0x501464,_0x118435;if(NetPlayerDataWrapper['isOnAnyEvent'](ANGameManager[_0x2f2f5e(0x1e9)]())){if(!$gameMap['isEventRunning']()){if(_0x2f2f5e(0x203)!=='ztIrq'){if(!$gameMessage[_0x2f2f5e(0x244)]()){if(_0x2f2f5e(0x1e4)==='wCpsk'){function _0xfd5a4f(){var _0x22b6f4=_0x2f2f5e;_0x21531d[_0x22b6f4(0x1d9)](_0x1d4ebf[_0x22b6f4(0x21b)]);}}else this[_0x2f2f5e(0x1cf)]();}}else{function _0x5d01d9(){return;}}}}else{if(_0x2f2f5e(0x230)!==_0x2f2f5e(0x22e)){if($gameMap[_0x2f2f5e(0x239)]()){if(_0x2f2f5e(0x224)===_0x2f2f5e(0x224))_0x118435=$gameMap[_0x2f2f5e(0x24a)][_0x2f2f5e(0x214)](),this['sendEventStarted'](_0x118435);else{function _0x498510(){var _0x48e9fe=_0x2f2f5e;_0xc44d1b=[_0x3cf3c5,_0x5434a5,_0x384bfc[0x0][_0x48e9fe(0x1fd)][0x0]],_0x3eee88[_0x48e9fe(0x219)](_0x5d264b,_0x2925d3[0x0][_0x48e9fe(0x1fd)][0x1]===0x0);}}}}else{function _0x1f4e43(){return;}}}},_0x421f7f[_0x501464(0x236)]=function(_0x5a1efc,_0x589615,_0x3a045c){var _0x54247c=_0x501464,_0x5ecbac,_0x5ae6ae,_0x31573b;try{if(_0x54247c(0x221)!==_0x54247c(0x221)){function _0x4bb2d3(){_0x52bd2b=_0x4f1e08,_0x20f735['w'](_0x17cbab);}}else{if(_0x5a1efc[0x0][_0x54247c(0x248)]===0x7b&&_0x589615>0x0){if(_0x54247c(0x247)!=='GCGlI'){function _0x3fa8fe(){var _0x53c024=_0x54247c;_0x65175e[_0x53c024(0x1cf)](),_0x2322b1['resetSharedEvent']();}}else _0x5ae6ae=[_0x3a045c,_0x589615,_0x5a1efc[0x0]['parameters'][0x0]],$gameSelfSwitches['setValue'](_0x5ae6ae,_0x5a1efc[0x0][_0x54247c(0x1fd)][0x1]===0x0);}else{if(_0x54247c(0x1fc)===_0x54247c(0x21f)){function _0x491943(){return;}}else _0x31573b=new Game_Interpreter(),_0x31573b[_0x54247c(0x210)](_0x5a1efc,_0x589615),_0x31573b[_0x54247c(0x228)]();}}}catch(_0x194ffa){_0x5ecbac=_0x194ffa,ANET['w'](_0x5ecbac);}},_0x421f7f[_0x501464(0x1e5)]=function(_0x4e71ac){var _0x30b746=_0x501464;if(_0x30b746(0x240)===_0x30b746(0x240))return!ANET[_0x30b746(0x20d)]['NonVirtualCommandsList'][_0x30b746(0x1d1)](_0x4e71ac);else{function _0x5e8d0f(){return;}}},_0x421f7f[_0x501464(0x20b)]=function(){var _0x6fa437=_0x501464;if(_0x6fa437(0x1e1)!==_0x6fa437(0x1ec))this[_0x6fa437(0x252)]=null,this[_0x6fa437(0x1db)]=![],this[_0x6fa437(0x1e3)]();else{function _0x28ead3(){var _0x16561b=_0x6fa437;_0x5ef840[_0x16561b(0x1ca)]();}}},_0x421f7f[_0x501464(0x238)]=function(_0x52906d,_0x2363ba){var _0x2766aa=_0x501464;if('TgRPL'==='bjwal'){function _0x3867f4(){return;}}else{this[_0x2766aa(0x252)]=_0x52906d,this[_0x2766aa(0x1db)]=_0x2363ba,$gameTemp[_0x2766aa(0x22f)]=![];if($gameTemp[_0x2766aa(0x1c8)]()){if(_0x2766aa(0x1dd)!==_0x2766aa(0x223))return;else{function _0x3ab383(){return;}}}if(this['_sharedInterpreter']==null){if(_0x2766aa(0x237)===_0x2766aa(0x237))return;else{function _0xc56c2c(){var _0x3fa0e3=_0x2766aa;this[_0x3fa0e3(0x252)]=_0x1ea8ce,this[_0x3fa0e3(0x1db)]=_0x495515,_0x4a6d6a[_0x3fa0e3(0x22f)]=![];if(_0x17ddff[_0x3fa0e3(0x1c8)]())return;if(this[_0x3fa0e3(0x252)]==null)return;_0x17e421['p'](_0x3fa0e3(0x222)+this[_0x3fa0e3(0x252)]['eventId']());}}}_0x18a7ab['p'](_0x2766aa(0x222)+this[_0x2766aa(0x252)][_0x2766aa(0x214)]());}},_0x421f7f[_0x501464(0x205)]=function(){var _0x2e80fc=_0x501464;if(_0x2e80fc(0x229)!=='ZIxgB')return this[_0x2e80fc(0x23c)]()&&this[_0x2e80fc(0x1db)]===!![];else{function _0x3a9c23(){var _0x489c03=_0x2e80fc;_0x5a8542[_0x489c03(0x244)]()?_0x53dfb8[_0x489c03(0x1d9)](_0x674825[_0x489c03(0x21b)]):!_0xd37923[_0x489c03(0x239)]()&&(_0x156254[_0x489c03(0x1cf)](),_0x524e9b[_0x489c03(0x20b)]());}}},_0x421f7f['isSharedEventIsRunning']=function(){var _0x2286c2=_0x501464;return this[_0x2286c2(0x252)]!=null&&$gameMap[_0x2286c2(0x239)]();},_0x421f7f[_0x501464(0x1f5)]=function(){var _0x3fb0cf=_0x501464;if('ZCQpm'===_0x3fb0cf(0x251)){function _0x35e57e(){var _0x5795be=_0x3fb0cf;if(_0x484969['_sharedInterpreter'][_0x5795be(0x214)]()!==_0x446e93)return;return _0x424200[_0x5795be(0x22f)]=!![];}}else{if(!this[_0x3fb0cf(0x205)]()){if('zApII'===_0x3fb0cf(0x235)){function _0x1687f7(){return;}}else return;}_0x18a7ab['p'](_0x3fb0cf(0x246)),_0x3fb0cf(0x208)['p'](),this['sendForceCancelSharedEvent'](),this[_0x3fb0cf(0x1e3)]();}},_0x421f7f[_0x501464(0x249)]=function(){var _0x58e271=_0x501464;if('MZbHs'===_0x58e271(0x250)){function _0x264942(){return _0x33d1b6=_0x35a5f0,_0x24bd7e['w'](_0xaf8f77);}}else{var _0x3563ef,_0x470991;this[_0x58e271(0x1e3)](),_0x3563ef=_0x58e271(0x1d8),_0x470991='';if(this['isSharedEventMaster']()&&this['_sharedInterpreter'][_0x58e271(0x220)]()){if(_0x58e271(0x1f2)!=='qMRCW'){function _0x2e03a6(){var _0x7cab73=_0x58e271,_0xce606f;if(!this[_0x7cab73(0x205)]())return;_0xce606f={'mapId':_0x4ebdcf['mapId'](),'eventId':this[_0x7cab73(0x252)][_0x7cab73(0x214)](),'index':this[_0x7cab73(0x252)]['nSyncWaitCommandData'][_0x7cab73(0x21d)],'indent':this[_0x7cab73(0x252)][_0x7cab73(0x212)]['indent']},_0x3cc263['send'](_0xe22de4[_0x7cab73(0x1e6)](_0x7cab73(0x215),_0xce606f));}}else _0x470991=_0x58e271(0x1e7);}typeof HUIManager!==_0x58e271(0x22a)&&HUIManager!==null&&HUIManager[_0x58e271(0x1e8)](_0x3563ef,_0x470991,0x3e8);}},_0x421f7f[_0x501464(0x1e3)]=function(){var _0x226f5a=_0x501464;if('aLCWd'!=='aLCWd'){function _0x4f20c9(){var _0x4a12d4=a0_0x3ffc;this[_0x4a12d4(0x252)]=null,this[_0x4a12d4(0x1db)]=![],this['hideWaitPlayersOnSharedEvent']();}}else return typeof HUIManager!==_0x226f5a(0x22a)&&HUIManager!==null?HUIManager[_0x226f5a(0x1ea)]():void 0x0;},_0x421f7f[_0x501464(0x1f7)]=function(_0x4555e8){var _0x4304b9=_0x501464;return ANNetwork[_0x4304b9(0x1f6)](NMS[_0x4304b9(0x1e6)](_0x4304b9(0x200),_0x4555e8));},_0x421f7f[_0x501464(0x1cf)]=function(){var _0x3535a2=_0x501464;return ANNetwork[_0x3535a2(0x1f6)](NMS[_0x3535a2(0x1e6)](_0x3535a2(0x24f)));},_0x421f7f[_0x501464(0x231)]=function(_0x1c946d,_0x27c0e6,_0x4ed603){var _0x50defb=_0x501464;if(_0x50defb(0x1d2)==='DuVfr'){function _0x12ee9f(){var _0x2286e3=_0x50defb;return this[_0x2286e3(0x23c)]()&&this['_sharedEventMaster']===!![];}}else{var _0x253029,_0x5dd72e,_0x8d6af0;_0x5dd72e={'code':0x0,'indent':0x0,'parameters':[]},_0x8d6af0={'list':[_0x1c946d,_0x5dd72e]},_0x253029={'mapId':$gameMap[_0x50defb(0x1f8)](),'eventId':_0x4ed603,'event':_0x8d6af0,'options':_0x27c0e6},ANNetwork['send'](NMS[_0x50defb(0x1e6)](_0x50defb(0x1ce),_0x253029));}},_0x421f7f[_0x501464(0x23d)]=function(){var _0x2d1f74=_0x501464,_0x5c1afc;if(!this[_0x2d1f74(0x205)]()){if(_0x2d1f74(0x1c6)!==_0x2d1f74(0x213))return;else{function _0x5d9c11(){!_0x5ca8ea['isBusy']()&&this['sendEventEnded']();}}}_0x5c1afc={'mapId':$gameMap[_0x2d1f74(0x1f8)](),'eventId':this[_0x2d1f74(0x252)][_0x2d1f74(0x214)](),'index':this[_0x2d1f74(0x252)][_0x2d1f74(0x212)][_0x2d1f74(0x21d)],'indent':this[_0x2d1f74(0x252)][_0x2d1f74(0x212)][_0x2d1f74(0x1e0)]},ANNetwork[_0x2d1f74(0x1f6)](NMS[_0x2d1f74(0x1e6)](_0x2d1f74(0x215),_0x5c1afc));},_0x421f7f[_0x501464(0x24e)]=function(){var _0x222767=_0x501464,_0x23cdf1;if(this[_0x222767(0x205)]())return;_0x23cdf1={'mapId':$gameMap[_0x222767(0x1f8)](),'eventId':this[_0x222767(0x252)]['eventId'](),'actorId':ANGameManager['myActorId'](),'index':this[_0x222767(0x252)][_0x222767(0x212)][_0x222767(0x21d)],'indent':this[_0x222767(0x252)][_0x222767(0x212)][_0x222767(0x1e0)]},ANNetwork['send'](NMS[_0x222767(0x1e6)](_0x222767(0x217),_0x23cdf1));},_0x421f7f[_0x501464(0x1d3)]=function(){var _0x406f4b=_0x501464,_0x1e0d50;if(!this['isSharedEventMaster']()){if(_0x406f4b(0x1de)===_0x406f4b(0x1de))return;else{function _0x1bb1a0(){var _0x80d19d=_0x406f4b,_0x5c30fb;if(!this[_0x80d19d(0x205)]())return;_0x5c30fb={'mapId':_0x2aece7[_0x80d19d(0x1f8)](),'eventId':this[_0x80d19d(0x252)]['eventId']()},_0xe5088f['send'](_0x6207a8[_0x80d19d(0x1e6)](_0x80d19d(0x202),_0x5c30fb));}}}_0x1e0d50={'mapId':$gameMap[_0x406f4b(0x1f8)](),'eventId':this['_sharedInterpreter'][_0x406f4b(0x214)]()},ANNetwork[_0x406f4b(0x1f6)](NMS[_0x406f4b(0x1e6)](_0x406f4b(0x202),_0x1e0d50));},_0x421f7f[_0x501464(0x233)]=function(){var _0x2f0352=_0x501464,_0x2535d6;if(!this[_0x2f0352(0x205)]())return;_0x2535d6={'mapId':$gameMap[_0x2f0352(0x1f8)](),'eventId':this[_0x2f0352(0x252)][_0x2f0352(0x214)]()},ANNetwork['send'](NMS[_0x2f0352(0x1e6)]('sharedForceCancel',_0x2535d6));},_0x421f7f[_0x501464(0x22c)]=function(_0x15ae91,_0x3aacf2){var _0x5080c4=_0x501464,_0x3039fb;if(!this[_0x5080c4(0x205)]())return;_0x3039fb={'mapId':$gameMap[_0x5080c4(0x1f8)](),'eventId':this[_0x5080c4(0x252)]['eventId'](),'index':_0x15ae91,'action':_0x3aacf2},ANNetwork[_0x5080c4(0x1f6)](NMS[_0x5080c4(0x1e6)](_0x5080c4(0x1c9),_0x3039fb));},_0x421f7f[_0x501464(0x1e2)]=function(_0x1ae88d){var _0x5211c2=_0x501464,_0x38e6f6,_0x48b237,_0x5ec167;try{if(_0x5211c2(0x225)!==_0x5211c2(0x1fa)){if(_0x1ae88d['options'][_0x5211c2(0x1fb)]===_0x5211c2(0x1f4)){if($gameMap['mapId']()!==_0x1ae88d[_0x5211c2(0x1f8)])return;}if(!ANET[_0x5211c2(0x1ed)]['isPassEventFilterOptions'](_0x1ae88d['options']))return;_0x48b237=_0x1ae88d[_0x5211c2(0x232)],_0x5ec167=_0x48b237['list'];switch(_0x1ae88d[_0x5211c2(0x23b)]['executeMode']){case _0x5211c2(0x1f3):_0x421f7f[_0x5211c2(0x236)](_0x5ec167,_0x1ae88d[_0x5211c2(0x214)],_0x1ae88d[_0x5211c2(0x1f8)]);break;case _0x5211c2(0x204):$gameTemp[_0x5211c2(0x22b)](_0x48b237);break;default:_0x421f7f[_0x5211c2(0x1e5)](_0x5ec167[0x0][_0x5211c2(0x248)])?_0x421f7f[_0x5211c2(0x236)](_0x5ec167,_0x1ae88d['eventId'],_0x1ae88d[_0x5211c2(0x1f8)]):$gameTemp[_0x5211c2(0x22b)](_0x48b237);}}else{function _0x502ed5(){var _0x4fa174=_0x5211c2;_0x217c4c=_0x4fa174(0x1e7);}}}catch(_0x481be5){_0x38e6f6=_0x481be5,ANET['w'](_0x38e6f6);}},_0x421f7f[_0x501464(0x20c)]=function(_0xe16d05){var _0x436d11=_0x501464,_0x268626,_0xff8506,_0x4c5e11,_0x2243af,_0x31879e;try{if(_0x436d11(0x1d7)===_0x436d11(0x1d7)){({mapId:_0x31879e,eventId:_0xff8506,index:_0x2243af,indent:_0x4c5e11}=_0xe16d05);if($gameMap[_0x436d11(0x1f8)]()!==_0x31879e)return;if(_0x421f7f[_0x436d11(0x23c)]())return;if(_0x2243af!==0x0)return;$gameTemp[_0x436d11(0x206)](_0xff8506);return;}else{function _0x1bef63(){var _0x523f2d=_0x436d11;({mapId:_0x5a757e,eventId:_0xc4b356,action:_0x5538f7,index:_0x44bb35}=_0xc59164);if(_0x5a6e5a[_0x523f2d(0x1f8)]()!==_0x5036a9)return;if(!_0x5e9917[_0x523f2d(0x23c)]())return;if(_0x58ef4b[_0x523f2d(0x252)][_0x523f2d(0x214)]()!==_0x3f1d45)return;return _0x58530e['nSelectionActionFromNetwork']={'action':_0xa3e0be,'index':_0x55f3fb},_0x42b363['p'](_0x523f2d(0x1c7));}}}catch(_0x5a1720){if('NSfCx'===_0x436d11(0x1d5)){function _0x567ce5(){var _0x324dff=_0x436d11;_0x116804[_0x324dff(0x239)]()&&(_0x5b7c60=_0x14a54f[_0x324dff(0x24a)][_0x324dff(0x214)](),this[_0x324dff(0x1f7)](_0x27fbe2));}}else _0x268626=_0x5a1720,ANET['w'](_0x268626);}},_0x421f7f[_0x501464(0x24c)]=function(_0x233825){var _0x2c8b4f=_0x501464;if(_0x2c8b4f(0x241)!==_0x2c8b4f(0x1ee)){var _0xf78fd9,_0xeebb2a,_0x57941a,_0x45e7fc,_0x5048e5,_0x2e02bc;try{if('oiSqA'!==_0x2c8b4f(0x20a)){({mapId:_0x2e02bc,eventId:_0x57941a,actorId:_0xf78fd9,index:_0x5048e5,indent:_0x45e7fc}=_0x233825);if($gameMap['mapId']()!==_0x2e02bc)return;if(!_0x421f7f[_0x2c8b4f(0x205)]())return;if(_0x421f7f[_0x2c8b4f(0x252)][_0x2c8b4f(0x214)]()!==_0x57941a)return;_0x421f7f[_0x2c8b4f(0x252)][_0x2c8b4f(0x1f9)](_0x5048e5,_0x45e7fc,_0xf78fd9);}else{function _0x19c34a(){_0x2f23e4=_0x2ab667,_0x13fd2b['w'](_0x30dacc);}}}catch(_0x403a45){_0xeebb2a=_0x403a45,ANET['w'](_0xeebb2a);}}else{function _0x59f2b5(){return;}}},_0x421f7f['onContinueSharedEvent']=function(_0x127a64){var _0x487542=_0x501464;if(_0x487542(0x21c)!==_0x487542(0x21c)){function _0x5ef9e2(){var _0x22eba6=_0x487542;this[_0x22eba6(0x1cf)]();}}else{var _0x2f13e8,_0x209a7e,_0x522cf6;try{if(_0x487542(0x226)!==_0x487542(0x226)){function _0x2373cc(){var _0x369940=_0x487542;!_0xdbb04[_0x369940(0x239)]()&&(_0x1dba5e['sendEventEnded'](),_0x401a72[_0x369940(0x20b)]());}}else{({mapId:_0x522cf6,eventId:_0x209a7e}=_0x127a64);if($gameMap[_0x487542(0x1f8)]()!==_0x522cf6){if(_0x487542(0x1d0)===_0x487542(0x1d0))return;else{function _0x3c41d2(){var _0xdc501e=_0x487542;if(!this['isSharedEventMaster']())return;_0x1c6221['p'](_0xdc501e(0x246)),_0xdc501e(0x208)['p'](),this[_0xdc501e(0x233)](),this['hideWaitPlayersOnSharedEvent']();}}}if(!_0x421f7f[_0x487542(0x23c)]())return;if(_0x421f7f[_0x487542(0x205)]())return;if(_0x421f7f[_0x487542(0x252)][_0x487542(0x214)]()!==_0x209a7e)return;return _0x421f7f[_0x487542(0x252)]['nAllowContinueSharedEvent']();}}catch(_0x2e75df){return _0x2f13e8=_0x2e75df,ANET['w'](_0x2f13e8);}}},_0x421f7f[_0x501464(0x22d)]=function(_0x5a0fe6){var _0x42c2e3=_0x501464,_0x1f7855,_0x45b63f,_0x6fcc33;try{if(_0x42c2e3(0x245)!==_0x42c2e3(0x227)){({mapId:_0x6fcc33,eventId:_0x45b63f}=_0x5a0fe6);if($gameMap['mapId']()!==_0x6fcc33){if(_0x42c2e3(0x1f0)!==_0x42c2e3(0x20e))return;else{function _0x2333f3(){return;}}}if(_0x421f7f[_0x42c2e3(0x205)]()){if(_0x42c2e3(0x218)!==_0x42c2e3(0x1f1))return;else{function _0x343963(){return _0x5833a7=_0x155303,_0xcaa993['w'](_0x3f6eda);}}}if(_0x421f7f[_0x42c2e3(0x23c)]()){if(_0x42c2e3(0x23a)!==_0x42c2e3(0x23a)){function _0xf5c20(){return;}}else{if(_0x421f7f['_sharedInterpreter'][_0x42c2e3(0x214)]()!==_0x45b63f)return;return $gameTemp[_0x42c2e3(0x22f)]=!![];}}else{if($gameTemp[_0x42c2e3(0x1c8)]()){if(_0x42c2e3(0x21a)!==_0x42c2e3(0x21a)){function _0x278c67(){return;}}else _0x45b63f===$gameTemp[_0x42c2e3(0x201)]&&$gameTemp[_0x42c2e3(0x1ca)]();}}}else{function _0x31433a(){var _0x211711=_0x42c2e3;_0x445ba8['startVirtualCommand'](_0xe6a0c2,_0x403b69[_0x211711(0x214)],_0x17d50c[_0x211711(0x1f8)]);}}}catch(_0x5efeac){return _0x1f7855=_0x5efeac,ANET['w'](_0x1f7855);}},_0x421f7f[_0x501464(0x216)]=function(_0x3887c8){var _0x414daa=_0x501464;if(_0x414daa(0x1eb)==='NGtPn'){function _0x48e304(){return;}}else{var _0x1a236d,_0xde45a6,_0x15ab76,_0x398f53,_0x2bd670;try{({mapId:_0x2bd670,eventId:_0x15ab76,action:_0x1a236d,index:_0x398f53}=_0x3887c8);if($gameMap[_0x414daa(0x1f8)]()!==_0x2bd670)return;if(!_0x421f7f[_0x414daa(0x23c)]()){if('cxiBI'===_0x414daa(0x1ef))return;else{function _0x26ebc5(){var _0x51b854=_0x414daa;_0x2694b9[_0x51b854(0x1e8)](_0x3ca9c8,_0x45a16c,0x3e8);}}}if(_0x421f7f['_sharedInterpreter']['eventId']()!==_0x15ab76)return;return $gameTemp[_0x414daa(0x1dc)]={'action':_0x1a236d,'index':_0x398f53},_0x18a7ab['p']('Shared\x20Choice\x20accepted\x20from\x20server');}catch(_0x54a6d5){return _0xde45a6=_0x54a6d5,ANET['w'](_0xde45a6);}}};}());
})();

// Generated by CoffeeScript 2.6.1
// * Данный класс отвечает за синхронизацию и обработку игровых карт

//@[GLOBAL]
window.ANMapManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetMap");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = window.ANMapManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendMapLoaded = function() {
    return ANNetwork.send(NMS.Map("loaded", $gameMap.mapId()));
  };
  _.sendInitialMapData = function() {
    // * Отправляем принудительно свои данные всем игрокам на карте
    ANSyncDataManager.sendPlayerObserver();
    ANPlayersManager.sendPlayerLocation();
    if (ANGameManager.isMapMaster()) {
      this.sendMapEventsInitialPositions();
    }
  };
  _.sendEventMove = function(eventId) {
    var data, e, event;
    try {
      event = $gameMap.event(eventId);
      if (event == null) {
        return;
      }
      data = {
        id: eventId,
        mapId: $gameMap.mapId(),
        data: event.getMoveDataForNetwork()
      };
      ANNetwork.send(NMS.Map("eventMove", data), true);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данную команду выполняет только мастер карты, когда кто-то подключается к карте
  _.sendMapEventsInitialPositions = function() {
    var ev, eventId, i, len, ref;
    ref = $gameMap.events();
    for (i = 0, len = ref.length; i < len; i++) {
      ev = ref[i];
      if (ev == null) {
        continue;
      }
      eventId = ev.eventId();
      setTimeout((function() {
        return ANMapManager.sendEventMove(eventId);
      }), 50); //TODO: Надо ли эту задержку?
    }
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.onEventMove = function(mapId, eventId, moveData) {
    var e, event;
    try {
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      event = $gameMap.event(eventId);
      if (event != null) {
        event.moveStraightFromServer(moveData);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onInitialMapSync = function() {
    var e;
    try {
      this.sendInitialMapData();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// Generated by CoffeeScript 2.6.1
// * Данный класс отвечает за синхронизацию и обработку данных игроков и их персонажей

//@[GLOBAL]
var ANPlayersManager;

ANPlayersManager = function() {};

(function() {
  var LOG, _;
  //@[LOG]
  LOG = new KDCore.DevLog("NetPlayer");
  LOG.setColors(KDCore.Color.AQUA, KDCore.Color.BLACK.getLightestColor(35));
  LOG.on();
  //@[DEFINES]
  _ = ANPlayersManager;
  //? КОМАНДЫ ЗАПРОСЫ (посылаются на сервер)
  // * ===============================================================
  _.sendBindActorFromGame = function(actorId) {
    return ANNetwork.callback(NMS.Game("bindActor", actorId), this.bindActorResult.bind(this));
  };
  _.sendBindActorFromLobby = function(actorId, callback) {
    return ANNetwork.callback(NMS.Game("bindActor", actorId), callback);
  };
  _.sendPlayerName = function() {
    return ANNetwork.send(NMS.Lobby("setPlayerName", ANGameManager.myPlayerData().name));
  };
  _.sendActorReady = function() {
    var actorData;
    actorData = $gameActors.actor(ANGameManager.myPlayerData().actorId);
    ANNetwork.send(NMS.Game("actorReady", actorData));
    return ANGameManager.setWait('playersActors');
  };
  _.sendPlayerMove = function() {
    var data;
    data = {
      id: ANNetwork.myId(),
      data: $gamePlayer.getMoveDataForNetwork()
    };
    return ANNetwork.send(NMS.Map("playerMove", data), true);
  };
  _.sendPlayerLocation = function() {
    var data;
    data = {
      id: ANNetwork.myId(),
      data: [$gamePlayer.x, $gamePlayer.y]
    };
    return ANNetwork.send(NMS.Map("playerLocation", data));
  };
  //? CALLBACKS ОТ ЗАПРОСОВ НА СЕРВЕР
  // * ===============================================================
  _.bindActorResult = function(result) {
    //TODO: Если true - зарезервировали,  дальше либо кастомизация, либо отправка
    // клиент готов начинать игру (и ожидание игроков включается)
    // false - значит данный персонаж занят, надо обрабатыватЬ!
    if (result === true) {
      "BINDING GOOD, send ActorReady".p();
      //TODO: Сейчас без кастомизации
      this.sendActorReady();
    }
  };
  _.onPlayerMove = function(id, moveData) {
    var char, e;
    try {
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.moveStraightFromServer(moveData);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.onPlayerLocation = function(id, positionData) {
    var char, e;
    try {
      char = $gameMap.networkCharacterById(id);
      if (char != null) {
        char.setPosition(positionData[0], positionData[1]);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

//Compressed by MV Plugin Builder
(function(){var a0_0x2584=['gixmD','onObserverData','_onBattlerObserverData','unpackBattlerFromNetwork','Color','AiHuG','44towxeH','getObserverDataForNetwork','battler','result','getPlayerDataById','nRefreshSharedBattleState','send','_onBattleUnitsObserverData','AQUA','_dataClass','ANSyncDataManager','leader','qcYnW','map','1TmWRCH','vmPuc','sendGlobalSwitchChange','mapId','getLightestColor','_sendObserverData','eventChar','1003763eqjgMy','73tkwfgD','setColors','inBattle','observer','switch','packForNetwork','battlerResult','DevLog','_onPlayerCharObserverData','variable','sendBattleUnitsObserver','onVariableValue','playerActor','event','TbgIp','_onEventCharObserverData','648388pbFgmj','_nNetworkActorPickRequest','SEND\x20BATTLER\x20RESULT','_onPlayerActorObserverData','_equips','UmHGg','_onBattlerResultObserverData','13RyQllM','sendPlayerObserver','HNgTF','133349OFhyMj','MZmwG','FJGTa','waNUc','ziEZt','142539NyjIsL','Game','SEND\x20BATTLER\x20OBSERVER','_itemId','getActorForPlayer','hJjtX','isOneBattler','networkCharacterById','_requestInitialSharedBattleRefresh','playerChar','sendSyncGlobalVariables','WTZhd','length','3714GXKqsH','532883Jrzhsr','2EgMGlv','KZNBW','1oCydRL','BLACK','onSwitchValue','fAJzD','lVDni','YfGly','applyObserverData','_convertActorEquipmens','sendBattlerResultObserver','myId','QLFVY','_nLocalActorMode','6553wwPxzk','onVariableFromServer','Utils'];function a0_0x1e03(_0x5e4156,_0x1c8ee8){_0x5e4156=_0x5e4156-0x104;var _0x25846d=a0_0x2584[_0x5e4156];return _0x25846d;}(function(_0x237f8d,_0xd14130){var _0x295ea7=a0_0x1e03;while(!![]){try{var _0x334057=-parseInt(_0x295ea7(0x12a))*-parseInt(_0x295ea7(0x13e))+-parseInt(_0x295ea7(0x13d))*parseInt(_0x295ea7(0x108))+-parseInt(_0x295ea7(0x10f))*parseInt(_0x295ea7(0x140))+-parseInt(_0x295ea7(0x110))*parseInt(_0x295ea7(0x14c))+parseInt(_0x295ea7(0x13c))*-parseInt(_0x295ea7(0x155))+parseInt(_0x295ea7(0x120))+-parseInt(_0x295ea7(0x127))*-parseInt(_0x295ea7(0x12f));if(_0x334057===_0xd14130)break;else _0x237f8d['push'](_0x237f8d['shift']());}catch(_0x5d671b){_0x237f8d['push'](_0x237f8d['shift']());}}}(a0_0x2584,0x8ff5e),window['ANSyncDataManager']=function(){},function(){var _0x1c6dbf=a0_0x1e03,_0x50c473,_0x540ed4;_0x50c473=new KDCore[(_0x1c6dbf(0x117))]('DataSync'),_0x50c473[_0x1c6dbf(0x111)](KDCore[_0x1c6dbf(0x153)][_0x1c6dbf(0x15d)],KDCore[_0x1c6dbf(0x153)][_0x1c6dbf(0x141)][_0x1c6dbf(0x10c)](0x23)),_0x50c473['on'](),_0x540ed4=window[_0x1c6dbf(0x104)],_0x540ed4[_0x1c6dbf(0x128)]=function(){var _0x41467b=_0x1c6dbf;return this[_0x41467b(0x10d)](_0x41467b(0x138),ANNetwork[_0x41467b(0x149)](),$gamePlayer[_0x41467b(0x156)]());},_0x540ed4['sendEventObserver']=function(_0x2ed75e){var _0x2fc189=_0x1c6dbf;this[_0x2fc189(0x10d)](_0x2fc189(0x10e),{'mapId':$gameMap[_0x2fc189(0x10b)](),'eventId':_0x2ed75e},$gameMap[_0x2fc189(0x11d)](_0x2ed75e)[_0x2fc189(0x156)]());},_0x540ed4['sendActorObserver']=function(){var _0x2d04cc=_0x1c6dbf;return this['_sendObserverData'](_0x2d04cc(0x11c),ANNetwork[_0x2d04cc(0x149)](),$gameParty[_0x2d04cc(0x105)]()[_0x2d04cc(0x156)]());},_0x540ed4[_0x1c6dbf(0x11a)]=function(_0x18cd8c){var _0x14e38a=_0x1c6dbf,_0x2c4818;if($gameParty[_0x14e38a(0x135)]())return;_0x2c4818=_0x18cd8c[_0x14e38a(0x107)](function(_0x3bea23){var _0x33153b=_0x14e38a;if('HBsUF'!==_0x33153b(0x145))return[_0x3bea23[_0x33153b(0x115)](),_0x3bea23[_0x33153b(0x156)]()];else{function _0x37cc32(){var _0x540ba1=_0x33153b;({mapId:_0x46b00d,eventId:_0x3b7d2d}=_0x4d4d0d);if(_0x52b9e8[_0x540ba1(0x10b)]()!==_0xaa9eed)return;_0x11da12=_0x556efd[_0x540ba1(0x11d)](_0x213fd4),_0x4b31fb!=null&&_0x17e3c9[_0x540ba1(0x146)](_0xf9dbbc);}}}),this[_0x14e38a(0x10d)]('battleUnits',null,_0x2c4818);},_0x540ed4['sendBattlerObserver']=function(_0x45641a){var _0xbc2956=_0x1c6dbf;if(_0xbc2956(0x12c)===_0xbc2956(0x12c))return _0xbc2956(0x131)['p'](),this['_sendObserverData']('battler',_0x45641a['packForNetwork'](),_0x45641a['getObserverDataForNetwork']());else{function _0x21161c(){return;}}},_0x540ed4[_0x1c6dbf(0x148)]=function(_0x4b9280){var _0x1e1e77=_0x1c6dbf;'SEND\x20BATTLER\x20RESULT'['p']();if($gameParty[_0x1e1e77(0x135)]())return;return this[_0x1e1e77(0x10d)](_0x1e1e77(0x116),_0x4b9280[_0x1e1e77(0x115)](),_0x4b9280[_0x1e1e77(0x158)]()[_0x1e1e77(0x156)]());},_0x540ed4[_0x1c6dbf(0x10d)]=function(_0x451fde,_0x28cc5a,_0x467da2){var _0xcb6d46=_0x1c6dbf,_0x4ebd27;_0x4ebd27={'type':_0x451fde,'id':_0x28cc5a,'data':_0x467da2},ANNetwork[_0xcb6d46(0x15b)](NMS['Game'](_0xcb6d46(0x113),_0x4ebd27),!![]);},_0x540ed4['sendGlobalVariableChange']=function(_0x7666a0,_0x6a15d3){var _0x3b94a9=_0x1c6dbf,_0x55b4f2;_0x55b4f2={'id':_0x7666a0,'data':_0x6a15d3},ANNetwork['send'](NMS[_0x3b94a9(0x130)](_0x3b94a9(0x119),_0x55b4f2));},_0x540ed4[_0x1c6dbf(0x10a)]=function(_0x384d84,_0x1db30d){var _0x509733=_0x1c6dbf,_0x3ad4b3;_0x3ad4b3={'id':_0x384d84,'data':_0x1db30d},ANNetwork[_0x509733(0x15b)](NMS[_0x509733(0x130)]('switch',_0x3ad4b3));},_0x540ed4[_0x1c6dbf(0x139)]=function(){},_0x540ed4[_0x1c6dbf(0x150)]=function(_0x2249ae,_0x3cd33c,_0x473f42){var _0x19cf56=_0x1c6dbf;if(_0x19cf56(0x12e)!==_0x19cf56(0x12e)){function _0x56e1a1(){var _0x5db81d=_0x19cf56;this[_0x5db81d(0x147)](_0x49e768[0x1]),_0x2b9a6d[_0x5db81d(0x146)](_0xc76c18[0x1]);}}else switch(_0x3cd33c){case _0x19cf56(0x138):return this[_0x19cf56(0x118)](_0x2249ae,_0x473f42);case _0x19cf56(0x10e):return this['_onEventCharObserverData'](_0x2249ae,_0x473f42);case _0x19cf56(0x11c):return this['_onPlayerActorObserverData'](_0x2249ae,_0x473f42);case _0x19cf56(0x157):return this[_0x19cf56(0x151)](_0x2249ae,_0x473f42);case'battlerResult':return this[_0x19cf56(0x126)](_0x2249ae,_0x473f42);case'battleUnits':return this[_0x19cf56(0x15c)](_0x473f42);default:_0x50c473['p']('From\x20server:\x20unknown\x20observer\x20data\x20type:\x20'+_0x3cd33c);}},_0x540ed4[_0x1c6dbf(0x118)]=function(_0xb9aec8,_0xccb244){var _0x3a4b6a=_0x1c6dbf,_0xd58a76,_0x4021b1;try{if('AiHuG'!==_0x3a4b6a(0x154)){function _0x596cc3(){_0x580c38=_0x16aeca,_0x51a612['w'](_0x326c76);}}else _0xd58a76=$gameMap[_0x3a4b6a(0x136)](_0xb9aec8),_0xd58a76!=null&&_0xd58a76[_0x3a4b6a(0x146)](_0xccb244);}catch(_0x4cc48e){if('IJfsu'===_0x3a4b6a(0x12b)){function _0x349469(){var _0x1195ba=_0x3a4b6a;_0x3700f8[_0x1195ba(0x14b)]===!![]&&(_0x1f09d1[_0x1195ba(0x121)]=!![]);_0x59e520=_0xc54fde['getPlayerDataById'](_0x120187),_0x30f895=_0x18b7d0[_0x1195ba(0x133)](_0x2d30e8),_0x14bd30[_0x1195ba(0x121)]=![];if(_0x1f78e3==null)return;this[_0x1195ba(0x147)](_0x5c5c12),_0x567ec3[_0x1195ba(0x146)](_0x343cc1);}}else _0x4021b1=_0x4cc48e,ANET['w'](_0x4021b1);}},_0x540ed4[_0x1c6dbf(0x11f)]=function(_0x510d0a,_0x52f34b){var _0x2e60d5=_0x1c6dbf,_0x198315,_0x272fa5,_0x50bb91,_0x3c51e3;try{({mapId:_0x3c51e3,eventId:_0x50bb91}=_0x510d0a);if($gameMap[_0x2e60d5(0x10b)]()!==_0x3c51e3){if('OmmED'==='VnFYt'){function _0x97218b(){var _0x4e666e=_0x2e60d5;_0x4e666e(0x122)['p']();if(_0x1a3b75[_0x4e666e(0x135)]())return;return this[_0x4e666e(0x10d)](_0x4e666e(0x116),_0x4d35ca[_0x4e666e(0x115)](),_0x403b88[_0x4e666e(0x158)]()['getObserverDataForNetwork']());}}else return;}_0x272fa5=$gameMap[_0x2e60d5(0x11d)](_0x50bb91),_0x272fa5!=null&&_0x272fa5['applyObserverData'](_0x52f34b);}catch(_0x6e8344){_0x198315=_0x6e8344,ANET['w'](_0x198315);}},_0x540ed4[_0x1c6dbf(0x123)]=function(_0x192062,_0x419ebd){var _0x4cecd7=_0x1c6dbf,_0x5525ed,_0x539553,_0x158b1c;try{$gameTemp[_0x4cecd7(0x14b)]===!![]&&($gameTemp['_nNetworkActorPickRequest']=!![]);_0x158b1c=ANGameManager[_0x4cecd7(0x159)](_0x192062),_0x5525ed=NetPlayerDataWrapper['getActorForPlayer'](_0x158b1c),$gameTemp[_0x4cecd7(0x121)]=![];if(_0x5525ed==null)return;this[_0x4cecd7(0x147)](_0x419ebd),_0x5525ed[_0x4cecd7(0x146)](_0x419ebd);}catch(_0x121fff){_0x539553=_0x121fff,ANET['w'](_0x539553);}},_0x540ed4['_onBattlerObserverData']=function(_0x454a4a,_0xfcbdb6){var _0x28272f=_0x1c6dbf;if(_0x28272f(0x143)===_0x28272f(0x143)){var _0x41644a,_0x4d3416;try{if(!$gameParty['inBattle']())return;_0x41644a=ANET[_0x28272f(0x14e)]['unpackBattlerFromNetwork'](_0x454a4a);if(_0x41644a==null)return;this[_0x28272f(0x147)](_0xfcbdb6),_0x41644a['applyObserverData'](_0xfcbdb6);}catch(_0x18328a){if(_0x28272f(0x129)!=='HNgTF'){function _0x139e3(){return;}}else _0x4d3416=_0x18328a,ANET['w'](_0x4d3416);}}else{function _0x4bc4d2(){_0x3fe41c=_0x12db88,_0x1bdcd0['w'](_0x2c8739);}}},_0x540ed4['_convertActorEquipmens']=function(_0x34ae03){var _0x1a0950=_0x1c6dbf;if(_0x1a0950(0x11e)===_0x1a0950(0x144)){function _0x9ec59b(){var _0x3d3f37=_0x1a0950,_0x85c561;_0x85c561={'id':_0x4c98d6,'data':_0x17b7db},_0x2b7bd7[_0x3d3f37(0x15b)](_0x3e5552[_0x3d3f37(0x130)](_0x3d3f37(0x114),_0x85c561));}}else{var _0x45d3d6,_0x4c9576,_0x5068a9,_0x475b68;if(_0x34ae03[_0x1a0950(0x124)]==null)return;for(_0x45d3d6=_0x5068a9=0x0,_0x475b68=_0x34ae03[_0x1a0950(0x124)]['length'];0x0<=_0x475b68?_0x5068a9<_0x475b68:_0x5068a9>_0x475b68;_0x45d3d6=0x0<=_0x475b68?++_0x5068a9:--_0x5068a9){if('vmPuc'===_0x1a0950(0x109))_0x4c9576=_0x34ae03[_0x1a0950(0x124)][_0x45d3d6],_0x34ae03[_0x1a0950(0x124)][_0x45d3d6]=new Game_Item(),_0x34ae03[_0x1a0950(0x124)][_0x45d3d6]['_dataClass']=_0x4c9576[_0x1a0950(0x15e)],_0x34ae03[_0x1a0950(0x124)][_0x45d3d6][_0x1a0950(0x132)]=_0x4c9576[_0x1a0950(0x132)];else{function _0x2396b3(){return;}}}}},_0x540ed4[_0x1c6dbf(0x126)]=function(_0x3b86ff,_0x175866){var _0x1ea735=_0x1c6dbf,_0xaba4d3,_0x5cd667,_0x487ab7;try{if(_0x1ea735(0x14a)!==_0x1ea735(0x14a)){function _0x406106(){var _0x3c0f03=_0x1ea735;if(!_0x4bf8ea[_0x3c0f03(0x112)]())return;_0x483f3d=_0x5e0fa7[_0x3c0f03(0x14e)][_0x3c0f03(0x152)](_0x5d5a97);if(_0x259499==null)return;this[_0x3c0f03(0x147)](_0x32b5d9),_0x32816b[_0x3c0f03(0x146)](_0x530b18);}}else{if(!$gameParty[_0x1ea735(0x112)]())return;_0xaba4d3=ANET[_0x1ea735(0x14e)][_0x1ea735(0x152)](_0x3b86ff);if(_0xaba4d3==null)return;(_0x487ab7=_0xaba4d3[_0x1ea735(0x158)]())!=null&&_0x487ab7[_0x1ea735(0x146)](_0x175866);}}catch(_0x3f2e01){if(_0x1ea735(0x106)!==_0x1ea735(0x106)){function _0x1ebdb7(){_0x57dc16=_0x20fcf1,_0x489550['w'](_0x1245d6);}}else _0x5cd667=_0x3f2e01,ANET['w'](_0x5cd667);}},_0x540ed4[_0x1c6dbf(0x15c)]=function(_0x48ce46){var _0x2488b0=_0x1c6dbf;if('HIFwU'===_0x2488b0(0x13f)){function _0x5e2392(){var _0x32570e=_0x2488b0;return this['_sendObserverData'](_0x32570e(0x138),_0x49dec8[_0x32570e(0x149)](),_0x6e8612[_0x32570e(0x156)]());}}else{var _0x30ad05,_0x32a738,_0x2aca20,_0x3241fa,_0x148f4d;try{if(!$gameParty[_0x2488b0(0x112)]())return;for(_0x2aca20=0x0,_0x3241fa=_0x48ce46[_0x2488b0(0x13b)];_0x2aca20<_0x3241fa;_0x2aca20++){_0x148f4d=_0x48ce46[_0x2aca20],_0x30ad05=ANET[_0x2488b0(0x14e)][_0x2488b0(0x152)](_0x148f4d[0x0]);if(_0x30ad05!=null){if(_0x2488b0(0x134)===_0x2488b0(0x134))this[_0x2488b0(0x147)](_0x148f4d[0x1]),_0x30ad05[_0x2488b0(0x146)](_0x148f4d[0x1]);else{function _0x21a907(){_0x5a1e53['applyObserverData'](_0x3657f8);}}}}$gameTemp['_requestInitialSharedBattleRefresh']===!![]&&(BattleManager[_0x2488b0(0x15a)](),$gameTemp[_0x2488b0(0x137)]=![]);}catch(_0x4f579c){if('mAgOK'==='KXoAl'){function _0x21b363(){_0x352bc0=_0x58b4cd,_0x24043c['w'](_0x452231);}}else _0x32a738=_0x4f579c,ANET['w'](_0x32a738);}}},_0x540ed4[_0x1c6dbf(0x11b)]=function(_0x52e99c,_0x2b150d){var _0x28366a=_0x1c6dbf,_0x4f57fe;try{if('XxozX'==='CKVJQ'){function _0xd1becd(){_0xc65429=_0xf834cb,_0x49d61d['w'](_0x26d421);}}else $gameVariables[_0x28366a(0x14d)](_0x52e99c,_0x2b150d);}catch(_0x331550){_0x4f57fe=_0x331550,ANET['w'](_0x4f57fe);}},_0x540ed4[_0x1c6dbf(0x142)]=function(_0x2d5fe5,_0x1e85c2){var _0x556f75=_0x1c6dbf;if(_0x556f75(0x13a)===_0x556f75(0x125)){function _0x48343a(){_0x2c4bf5=_0x462d1c,_0xf5bff6['w'](_0x5b6396);}}else{var _0x29d860;try{if(_0x556f75(0x14f)!==_0x556f75(0x12d))$gameSwitches['onSwitchFromServer'](_0x2d5fe5,_0x1e85c2);else{function _0x51cd2e(){_0x5174eb['onVariableFromServer'](_0x36218a,_0x42a85);}}}catch(_0x5543b8){_0x29d860=_0x5543b8,ANET['w'](_0x29d860);}}};}());
})();

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ANBattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onLogWindowMessage, _;
  
  // * Эти методы (переопределения) только для RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = ANBattleManager;
  // * В MV нету _currentActor и _inputting
  //$[OVER]
  _.updateInputChange = function() {
    if ($gameParty.isOneBattler()) {
      return;
    }
    if (this._lastBattleManagerInputActor !== BattleManager._actorIndex) {
      this._lastBattleManagerInputActor = BattleManager._actorIndex;
      this.sendInputState();
    } else if (this._lastBattleManagerInputValue !== BattleManager.isInputting()) {
      this._lastBattleManagerInputValue = BattleManager.isInputting();
      this.sendInputState();
    }
  };
  
  //$[OVER]
  // * Отправить изменение состояния ввода
  _.sendInputState = function() {
    var actor, inputActorId, inputState;
    inputState = BattleManager.isInputting();
    actor = BattleManager.actor();
    if (actor != null) {
      inputActorId = actor.actorId();
    } else {
      inputActorId = null;
    }
    ANNetwork.send(NMS.Battle("input", {inputState, inputActorId}));
  };
  //$[OVER]
  // * Пришло изменение состояние ввода
  _.onBattleInputState = function(inputState, inputActorId) {
    var e;
    try {
      if (!$gameParty.inBattle()) {
        return;
      }
      if (inputState === true) {
        BattleManager._phase = 'input';
      } else {
        // * Чтобы скрыть выбор действий
        BattleManager.startTurn();
      }
      if (inputActorId === ANGameManager.myActorId()) {
        BattleManager.nSetCurrentClientInput();
      } else {
        // * Если не мой персонаж, то никакого ввода
        BattleManager.nClearClientInput();
      }
      return $gameTemp._isBattleSceneShouldBeRefreshed = true;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * В MV анимация отдельно реализована
  // * Отправить боевую анимацию (из WindowLog) на сервер
  _.sendWindowLogAnimation = function(targets, animationId, mirror) {
    var converted, data;
    converted = targets.map(function(t) {
      return t.packForNetwork();
    });
    data = {
      animationId: animationId,
      mirror: mirror,
      targets: converted
    };
    // * Используем метод из MZ версии
    this.sendBattleAnimation(data);
  };
  //@[ALIAS]
  ALIAS__onLogWindowMessage = _.onLogWindowMessage;
  _.onLogWindowMessage = function() {
    ALIAS__onLogWindowMessage.call(this, ...arguments);
    $gameTemp.requestBattleRefresh();
  };
  // * С сервера пришла команда проиграть анимацию (замена метода из MZ)
  //$[OVER]
  _.onBattleAnimation = function(data) {
    var e, ref, targets;
    try {
      targets = data.targets.map(function(t) {
        return ANET.Utils.unpackBattlerFromNetwork(t);
      });
      if ((ref = BattleManager._logWindow) != null) {
        ref.showNormalAnimation(targets, data.animationId, data.mirror);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END ANBattleManager.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x22f7=['loseGold','_netHisNetTradeItems','_startRequestTimeout','scene','sendAcceptTradeRequest','qoCdd','nhJot','onTradeReady','UkBTy','Common','showModalWindowForTrade','wsRZU','pDiHs','unpackItemFromNetwork','setColors','TRADE\x20STATUS\x20IN','acceptTradeInRequest','isHaveTradeParticipant','FnyNB','gqkxp','resetWait','refuseTradeRequest','xBBLs','adTaz','getLightestColor','TRADE\x20ACCEPT\x20IN','476098KAglOn','DevLog','isInTrade','TRADE\x20REFUSE\x20IN','mPQoX','XkvHy','onTradeChange','_on_trade_items','_on_','IMFcy','getPlayerInfo','setWait','Trade\x20refused','getPlayerDataById','TRADE\x20SHOULD\x20BE\x20COMPLETED','onCommonCommandFromServer','wJiCw','BzQbt','trade_complete','SSsIz','SjKCs','tradeSceneCompleteSE','yMNQJ','onTradeSceneEnd','NiIbA','_isInTrade','orMni','pyfMQ','packItemForNetwork','gainItem','\x20refused','isPlayerAvailableForTrade','ksWmj','uLAPM','RDTvu','isSceneMap','onAnotherPlayerAcceptTrade','trade_items','426998ZZYGqW','onTradeCompleted','shift','onTradeShouldComplete','TradeRequestTime','myId','trade_accept','trade_status','GJDGl','100218nFisrM','KfnIz','sendRefuseTradeRequest','map','zmyem','name','_on_trade_accept','isConnected','isClientAvailableForTrade','ANTradeManager','ImDuJ','sendStartTradeRequest','TUKtZ','_onRequestAnswer','sendCompleteTrade','cCDsG','DiybB','416213fOibcD','TRADE\x20COMPLETED','fZKqI','gainGold','TRADE\x20ITEMS\x20IN','_on_trade_complete','BARcK','qRVKY','onAnotherPlayerNotAcceptTradeOrTimeout','any','_netHisTradeReadyStatus','length','_netMyTradeItems','isShowModalForTradeRequest','callback','_on_trade_status','CYvqz','playSE','yCfcC','showRedAlert','kjNkV','Trade\x20items\x20[my]\x20changed','258443uJZvsL','_tradeRequestTimeout','sendMyTradeReadyStatus','__netTradeItemIndex','getTradeParticipantData','Utils','_startTradeSession','YELLOW','send','BLACK','LBdfS','netId','3pSFDnj','_hisId','hlZpP','lrzSk','isPro','AIpXe','ZpbKD','180381Xdzfaz','Waiting\x20','1eVaLca','tCIIy','_on_trade_refuse','trade_request','hsaEU','TVlDC','zMWRc','HAGPE','showTradeInDialog','isTradeParticipantIsValid','TRADE\x20REQUEST\x20IN','204353FITQhY','Player\x20not\x20available!','LHTjr','lInpk'];function a0_0x5013(_0x236a8d,_0x3dcbf8){_0x236a8d=_0x236a8d-0x11d;var _0x22f72b=a0_0x22f7[_0x236a8d];return _0x22f72b;}var a0_0x2cb7af=a0_0x5013;(function(_0x23f393,_0x5339d0){var _0x4b5f81=a0_0x5013;while(!![]){try{var _0x3fa7e6=parseInt(_0x4b5f81(0x189))*-parseInt(_0x4b5f81(0x19d))+parseInt(_0x4b5f81(0x14d))+parseInt(_0x4b5f81(0x127))+-parseInt(_0x4b5f81(0x17d))+-parseInt(_0x4b5f81(0x192))*-parseInt(_0x4b5f81(0x156))+parseInt(_0x4b5f81(0x167))+-parseInt(_0x4b5f81(0x190));if(_0x3fa7e6===_0x5339d0)break;else _0x23f393['push'](_0x23f393['shift']());}catch(_0x4eab4a){_0x23f393['push'](_0x23f393['shift']());}}}(a0_0x22f7,0x59c1c),window[a0_0x2cb7af(0x15f)]=function(){},function(){var _0x195381=a0_0x2cb7af,_0x1234f1,_0x2d54d9;_0x1234f1=new KDCore[(_0x195381(0x128))]('Trade'),_0x1234f1[_0x195381(0x1af)](KDCore['Color'][_0x195381(0x184)],KDCore['Color'][_0x195381(0x186)][_0x195381(0x125)](0x23)),_0x1234f1['on'](),_0x2d54d9=window[_0x195381(0x15f)],_0x2d54d9[_0x195381(0x151)]=0x1770,_0x2d54d9['TradeGoldItemId']=-0x64,_0x2d54d9[_0x195381(0x129)]=function(){var _0x268cf9=_0x195381;return ANNetwork[_0x268cf9(0x15d)]()&&this['_isInTrade']===!![];},_0x2d54d9[_0x195381(0x11e)]=function(){var _0x2cf185=_0x195381;return String[_0x2cf185(0x170)](this[_0x2cf185(0x18a)]);},_0x2d54d9['getTradeParticipantData']=function(){var _0x6c6c38=_0x195381;return nAPI[_0x6c6c38(0x131)]('info',_0x6c6c38(0x188),this[_0x6c6c38(0x18a)]);},_0x2d54d9['requestTradeWith']=function(_0x31517c){var _0x25217f=_0x195381;if(_0x25217f(0x1a0)===_0x25217f(0x1a0)){if(this['isInTrade']())return;if(this['isPlayerAvailableForTrade'](_0x31517c)){if(_0x25217f(0x193)!==_0x25217f(0x123))this['sendStartTradeRequest'](_0x31517c);else{function _0x18b4d9(){var _0x10f8eb=_0x25217f;this[_0x10f8eb(0x161)](_0x3f0af0);}}}else{if(_0x25217f(0x12b)==='mPQoX')nAPI['showRedAlert'](_0x25217f(0x19e));else{function _0x245651(){return![];}}}}else{function _0x14163e(){var _0x388861=_0x25217f;return _0x4ff47d!=null?[_0x491fa0[_0x388861(0x182)][_0x388861(0x143)](_0x2c4566[0x0]),_0x1515b8[0x1]]:null;}}},_0x2d54d9['isPlayerAvailableForTrade']=function(_0x6aa7bd){return _0x6aa7bd!=null&&NetPlayerDataWrapper['isOnMapScene'](_0x6aa7bd);},_0x2d54d9[_0x195381(0x19b)]=function(){var _0x426082=_0x195381,_0x5ce245;if(!this[_0x426082(0x129)]()){if(_0x426082(0x17b)!=='qECri')return![];else{function _0x2f8317(){return;}}}if(!this[_0x426082(0x11e)]()){if(_0x426082(0x16d)===_0x426082(0x16d))return![];else{function _0x1121f4(){return null;}}}_0x5ce245=this[_0x426082(0x181)]();if(_0x5ce245!=null){if(_0x426082(0x18b)==='VJOhQ'){function _0x3177fa(){return;}}else return _0x5ce245['scene']!==_0x426082(0x159);}return![];},_0x2d54d9[_0x195381(0x15e)]=function(){var _0x501f59=_0x195381;if(_0x501f59(0x199)!==_0x501f59(0x199)){function _0x6785d0(){var _0x32cfe5=_0x501f59;_0x14e29c[_0x32cfe5(0x175)](_0x5dee44[_0x32cfe5(0x1aa)](_0x32cfe5(0x139),_0x3a16fd[_0x32cfe5(0x152)]()),function(){return _0x54c019['onTradeCompleted']();});}}else return ANET[_0x501f59(0x18d)]()&&!this['isInTrade']()&&KDCore[_0x501f59(0x182)][_0x501f59(0x14a)]();},_0x2d54d9[_0x195381(0x183)]=function(){var _0x2cb9c5=_0x195381;if(_0x2cb9c5(0x15a)!==_0x2cb9c5(0x198)){if(!this[_0x2cb9c5(0x11e)]())return;_0x1234f1['p']('TRADE\x20WITH\x20'+this[_0x2cb9c5(0x18a)]),this[_0x2cb9c5(0x140)]=!![],$gameTemp[_0x2cb9c5(0x173)]=[],$gameTemp['_netHisNetTradeItems']=[],$gameTemp[_0x2cb9c5(0x171)]=![],SceneManager['push'](Scene_NetworkInGameTrade);}else{function _0x286114(){var _0x14837a=_0x2cb9c5;if(this[_0x14837a(0x129)]())return;this[_0x14837a(0x146)](_0x26751e)?this[_0x14837a(0x161)](_0x5b7168):_0x5daa00[_0x14837a(0x17a)](_0x14837a(0x19e));}}},_0x2d54d9[_0x195381(0x19a)]=function(){var _0x371e2d=_0x195381;if(!this[_0x371e2d(0x11e)]())return;if(ANET['PP'][_0x371e2d(0x174)]())ANET['UI'][_0x371e2d(0x1ab)](this[_0x371e2d(0x18a)]);else{if(_0x371e2d(0x138)!==_0x371e2d(0x1a7))ANTradeManager[_0x371e2d(0x11d)]();else{function _0x56e194(){var _0x172f45=_0x371e2d;_0x21dbc3[_0x172f45(0x173)][_0x503dd1]=[_0x4d8a72,_0x1c19fe];}}}},_0x2d54d9['refuseTradeRequest']=function(){var _0x15fecc=_0x195381;if(this[_0x15fecc(0x11e)]()){if(_0x15fecc(0x18c)===_0x15fecc(0x157)){function _0x2905a4(){var _0x5a753c=_0x15fecc;if(!this[_0x5a753c(0x11e)]())return;_0x2b6b9e['PP'][_0x5a753c(0x174)]()?_0x1aee08['UI']['showModalWindowForTrade'](this[_0x5a753c(0x18a)]):_0x13082d[_0x5a753c(0x11d)]();}}else return this[_0x15fecc(0x158)](this[_0x15fecc(0x18a)]);}},_0x2d54d9['acceptTradeInRequest']=function(){var _0x491039=_0x195381;if(_0x491039(0x124)===_0x491039(0x124)){if(!this[_0x491039(0x11e)]())return;this[_0x491039(0x1a5)](this[_0x491039(0x18a)]),this['_startTradeSession']();}else{function _0x524003(){return _0x3022ae=_0x171a22,_0x1a11ae['w'](_0x58dd50);}}},_0x2d54d9[_0x195381(0x1a8)]=function(_0x2c7475){var _0x1b95d1=_0x195381;return this[_0x1b95d1(0x17f)](_0x2c7475);},_0x2d54d9[_0x195381(0x12d)]=function(_0xfaa420,_0xa48d0b){var _0x4dff0e=_0x195381,_0x2ac136;_0x2ac136=$gameTemp[_0x4dff0e(0x180)];if(_0x2ac136==null)return;if(_0x2ac136<0x0){if('msAGY'!=='LGzIj')return;else{function _0x369b03(){_0x59b421=_0x7fd7ae,_0x2816a0['w'](_0x3da671);}}}if(_0xfaa420!=null&&_0xa48d0b>=0x1){if('wsRZU'===_0x4dff0e(0x1ac))$gameTemp[_0x4dff0e(0x173)][_0x2ac136]=[_0xfaa420,_0xa48d0b];else{function _0x2370d2(){return;}}}else{if(_0x4dff0e(0x165)===_0x4dff0e(0x19f)){function _0x46445e(){return;}}else $gameTemp[_0x4dff0e(0x173)][_0x2ac136]=null;}_0x1234f1['p'](_0x4dff0e(0x17c)),console['info']($gameTemp[_0x4dff0e(0x173)]),this['sendMyTradeItems']();},_0x2d54d9[_0x195381(0x150)]=function(){var _0x1003f1=_0x195381;return _0x1234f1['p'](_0x1003f1(0x135)),this['sendCompleteTrade']();},_0x2d54d9[_0x195381(0x13e)]=function(){var _0x3db5b4=_0x195381;this[_0x3db5b4(0x18a)]=null,this[_0x3db5b4(0x140)]=![],this[_0x3db5b4(0x171)]=![];},_0x2d54d9[_0x195381(0x161)]=function(_0x33e7a0){var _0x38eba4=_0x195381,_0x3a4c56;this[_0x38eba4(0x18a)]=_0x33e7a0['id'],_0x3a4c56={'initiator':ANNetwork[_0x38eba4(0x152)](),'parcipiant':_0x33e7a0['id']},ANNetwork['send'](NMS[_0x38eba4(0x1aa)](_0x38eba4(0x195),_0x3a4c56)),ANNetwork[_0x38eba4(0x132)](),nAPI['showInfoMessage'](_0x38eba4(0x191)+_0x33e7a0['name']),this[_0x38eba4(0x1a3)]();},_0x2d54d9[_0x195381(0x1a3)]=function(){ANTradeManager['_tradeRequestTimeout']=setTimeout(function(){var _0x3fa4d2=a0_0x5013;if(_0x3fa4d2(0x16e)===_0x3fa4d2(0x169)){function _0x16be12(){return![];}}else return ANTradeManager[_0x3fa4d2(0x16f)]();},ANTradeManager['TradeRequestTime']);},_0x2d54d9['sendRefuseTradeRequest']=function(_0x1acea3){ANNetwork['send'](NMS['Common']('trade_refuse',_0x1acea3));},_0x2d54d9[_0x195381(0x1a5)]=function(_0x2a5131){var _0x34e9cc=_0x195381;ANNetwork[_0x34e9cc(0x185)](NMS[_0x34e9cc(0x1aa)]('trade_accept',_0x2a5131));},_0x2d54d9['sendMyTradeItems']=function(){var _0x5684ed=_0x195381,_0x1edf99,_0x3e5353;_0x3e5353=$gameTemp[_0x5684ed(0x173)]['map'](function(_0xe565cb){var _0x8804ea=_0x5684ed;return _0xe565cb!=null?[ANET[_0x8804ea(0x182)]['packItemForNetwork'](_0xe565cb[0x0]),_0xe565cb[0x1]]:null;}),_0x1edf99={'fromWho':ANNetwork[_0x5684ed(0x152)](),'items':_0x3e5353},ANNetwork[_0x5684ed(0x185)](NMS['Common'](_0x5684ed(0x14c),_0x1edf99));},_0x2d54d9[_0x195381(0x17f)]=function(_0x5bbddc){var _0x2e2dc5=_0x195381,_0x17e7f0;_0x17e7f0={'fromWho':ANNetwork[_0x2e2dc5(0x152)](),'status':_0x5bbddc},ANNetwork['send'](NMS[_0x2e2dc5(0x1aa)](_0x2e2dc5(0x154),_0x17e7f0));},_0x2d54d9[_0x195381(0x164)]=function(){var _0x414628=_0x195381;if(_0x414628(0x196)!==_0x414628(0x141))ANNetwork[_0x414628(0x175)](NMS[_0x414628(0x1aa)](_0x414628(0x139),ANNetwork[_0x414628(0x152)]()),function(){var _0x19b867=_0x414628;if('AnlgE'==='AIAVh'){function _0x10fdb1(){var _0xa1056d=a0_0x5013;if(this[_0xa1056d(0x11e)]())return this[_0xa1056d(0x158)](this[_0xa1056d(0x18a)]);}}else return ANTradeManager[_0x19b867(0x14e)]();});else{function _0x41c5f7(){var _0x2c950b=_0x414628;_0x53a38e[_0x2c950b(0x16a)](_0x3f903a[0x1]);}}},_0x2d54d9['onAnotherPlayerAcceptTrade']=function(){var _0x3908ad=_0x195381;this['_onRequestAnswer'](),this[_0x3908ad(0x183)]();},_0x2d54d9[_0x195381(0x163)]=function(){var _0x5a7c39=_0x195381;ANNetwork['resetWait'](),nAPI['hideInfoMessage'](),clearTimeout(ANTradeManager[_0x5a7c39(0x17e)]);},_0x2d54d9[_0x195381(0x16f)]=function(){var _0x46f74b=_0x195381,_0x35632d,_0x3c4da1,_0x73ff49;this[_0x46f74b(0x163)]();try{if(_0x46f74b(0x130)===_0x46f74b(0x130)){_0x35632d=ANGameManager[_0x46f74b(0x134)](this[_0x46f74b(0x18a)]);if(_0x35632d!=null){if('RDTvu'!==_0x46f74b(0x149)){function _0x16611a(){var _0x15a666=_0x46f74b;_0x4f2b1d[_0x15a666(0x121)](),_0x58e64b['hideInfoMessage'](),_0x36169c(_0x2c5153[_0x15a666(0x17e)]);}}else _0x73ff49=_0x35632d[_0x46f74b(0x15b)],nAPI[_0x46f74b(0x17a)](_0x73ff49+_0x46f74b(0x145));}else{if('GJDGl'!==_0x46f74b(0x155)){function _0x1024ca(){var _0x3bb4ed=_0x46f74b;return[_0x197a5d[_0x3bb4ed(0x182)]['packItemForNetwork'](_0x114bf7[0x0]),_0x396605[0x1]];}}else nAPI[_0x46f74b(0x17a)](_0x46f74b(0x133));}}else{function _0x29df0f(){var _0xa1f774=_0x46f74b;_0x1d9687=_0xd2ae70[_0xa1f774(0x134)](this['_hisId']),_0x50ab1b!=null?(_0x377909=_0x578bd2[_0xa1f774(0x15b)],_0x251c2b['showRedAlert'](_0x383f28+_0xa1f774(0x145))):_0x24df9e[_0xa1f774(0x17a)]('Trade\x20refused');}}}catch(_0x516303){_0x3c4da1=_0x516303,ANET['w'](_0x3c4da1);}this[_0x46f74b(0x18a)]=null;},_0x2d54d9[_0x195381(0x14e)]=function(){var _0x58b697=_0x195381,_0x20c17e,_0x2e1652,_0xca9b13,_0x60ffd1,_0x10cb61,_0x4abd8b,_0x392b2d,_0x29710a,_0x3a8646;_0x1234f1['p'](_0x58b697(0x168));try{if('pDiHs'===_0x58b697(0x1ad)){KDCore[_0x58b697(0x182)][_0x58b697(0x178)](ANET['PP'][_0x58b697(0x13c)]()),_0x2e1652=$gameTemp[_0x58b697(0x173)][_0x58b697(0x14f)]();if(_0x2e1652!=null){if(_0x58b697(0x148)===_0x58b697(0x148)){if(_0x2e1652[0x1]!=null&&_0x2e1652[0x1]>0x0){if(_0x58b697(0x13b)===_0x58b697(0x13a)){function _0x167bb6(){return null;}}else $gameParty[_0x58b697(0x1a1)](_0x2e1652[0x1]);}}else{function _0x26478e(){var _0x3e7087=_0x58b697;_0x2c953c['_tradeRequestTimeout']=_0x3a24ce(function(){return _0x4483f0['onAnotherPlayerNotAcceptTradeOrTimeout']();},_0xf7089b[_0x3e7087(0x151)]);}}}_0x29710a=$gameTemp[_0x58b697(0x173)];for(_0xca9b13=0x0,_0x4abd8b=_0x29710a['length'];_0xca9b13<_0x4abd8b;_0xca9b13++){if('CMoqj'!==_0x58b697(0x1a9)){_0x60ffd1=_0x29710a[_0xca9b13];if(_0x60ffd1==null){if(_0x58b697(0x142)==='pyfMQ')continue;else{function _0x5f3939(){var _0x1b5132=_0x58b697;return this[_0x1b5132(0x17f)](_0x265e24);}}}if(_0x60ffd1[0x0]==null)continue;if(_0x60ffd1[0x1]<=0x0){if('WeZRb'!==_0x58b697(0x18f))continue;else{function _0x3ab48e(){var _0x34c70e=_0x58b697;return _0x433fa2[_0x34c70e(0x18d)]()&&!this[_0x34c70e(0x129)]()&&_0x3a005d[_0x34c70e(0x182)][_0x34c70e(0x14a)]();}}}$gameParty[_0x58b697(0x144)](_0x60ffd1[0x0],_0x60ffd1[0x1]*-0x1);}else{function _0x1f5111(){var _0x41592d=_0x58b697;return _0x517edf[_0x41592d(0x1a4)]!=='map';}}}_0x2e1652=$gameTemp['_netHisNetTradeItems']['shift']();if(_0x2e1652!=null){if(_0x58b697(0x177)!=='MhnoS'){if(_0x2e1652[0x1]!=null&&_0x2e1652[0x1]>0x0){if('EVumE'==='qbGUK'){function _0x5492e3(){var _0x5ea521=_0x58b697;return _0x549dce[_0x5ea521(0x170)](this[_0x5ea521(0x18a)]);}}else $gameParty[_0x58b697(0x16a)](_0x2e1652[0x1]);}}else{function _0x3f25a6(){return _0x214e37=_0x20eb5e,_0x58b306['w'](_0x40bf6d);}}}_0x3a8646=$gameTemp[_0x58b697(0x1a2)];for(_0x10cb61=0x0,_0x392b2d=_0x3a8646[_0x58b697(0x172)];_0x10cb61<_0x392b2d;_0x10cb61++){if(_0x58b697(0x197)!==_0x58b697(0x197)){function _0x71933f(){_0x5230e2=_0x53254f,_0x25772e['w'](_0x553446);}}else{_0x60ffd1=_0x3a8646[_0x10cb61];if(_0x60ffd1==null)continue;if(_0x60ffd1[0x0]==null){if(_0x58b697(0x160)!==_0x58b697(0x147))continue;else{function _0x4f8c7b(){return;}}}if(_0x60ffd1[0x1]<=0x0)continue;$gameParty[_0x58b697(0x144)](_0x60ffd1[0x0],_0x60ffd1[0x1]);}}}else{function _0x2f1b69(){var _0x25d308=_0x58b697,_0x5bda82;try{'TRADE\x20REFUSE\x20IN'['p']();if(_0x35c3ae!==_0x3add55[_0x25d308(0x152)]())return;return _0x182d2b[_0x25d308(0x16f)]();}catch(_0x43df33){return _0x5bda82=_0x43df33,_0x1a50cb['w'](_0x5bda82);}}}}catch(_0x461bc7){if('XkcTH'===_0x58b697(0x120)){function _0xfab4e7(){var _0x1c99a4=_0x58b697;return _0x5955ee['p']('TRADE\x20SHOULD\x20BE\x20COMPLETED'),this[_0x1c99a4(0x164)]();}}else _0x20c17e=_0x461bc7,ANET['w'](_0x20c17e);}},_0x2d54d9[_0x195381(0x136)]=function(_0x5c9ce1,_0x3c6410){var _0x5ee6ff=_0x195381,_0x950b20,_0x18733c;try{if(_0x5ee6ff(0x11f)===_0x5ee6ff(0x11f)){_0x18733c=ANTradeManager[_0x5ee6ff(0x12f)+_0x5c9ce1];if(_0x18733c!=null)return _0x18733c(_0x3c6410);else{if(_0x5ee6ff(0x18e)!=='AIpXe'){function _0x55d9bf(){var _0x32b5b5=_0x5ee6ff;_0x2b2073[_0x32b5b5(0x17a)](_0x32b5b5(0x19e));}}else return _0x1234f1['p']('Unknown\x20common\x20subCommand\x20'+_0x5c9ce1);}}else{function _0x3e44bf(){return;}}}catch(_0x128a7c){return _0x950b20=_0x128a7c,ANET['w'](_0x950b20);}},_0x2d54d9['_on_trade_request']=function(_0x1f4a26){var _0x5cd20a=_0x195381,_0xb13aa7,_0x219751,_0x67621d,_0x2948a8;try{_0x5cd20a(0x19c)['p'](),{initiator:_0x219751,parcipiant:_0x67621d}=_0x1f4a26;if(_0x67621d!==ANNetwork['myId']()){if(_0x5cd20a(0x187)!==_0x5cd20a(0x187)){function _0x5d5a30(){var _0x13e267=_0x5cd20a;_0x1f1a3a[_0x13e267(0x185)](_0x1cb007[_0x13e267(0x1aa)](_0x13e267(0x153),_0x5aaa54));}}else return;}return ANTradeManager['_hisId']=_0x219751,_0x2948a8=ANTradeManager['isClientAvailableForTrade'](),_0x2948a8===!![]?ANTradeManager[_0x5cd20a(0x19a)]():ANTradeManager[_0x5cd20a(0x122)]();}catch(_0x37c252){return _0xb13aa7=_0x37c252,ANET['w'](_0xb13aa7);}},_0x2d54d9[_0x195381(0x194)]=function(_0x525244){var _0x458191=_0x195381,_0x4cea3e;try{_0x458191(0x12a)['p']();if(_0x525244!==ANNetwork[_0x458191(0x152)]())return;return ANTradeManager[_0x458191(0x16f)]();}catch(_0x3e1753){if(_0x458191(0x162)===_0x458191(0x166)){function _0x58555e(){var _0x2a6549=_0x458191;return[_0xcf2907[_0x2a6549(0x182)]['unpackItemFromNetwork'](_0x5abf69[0x0]),_0x2b9fc3[0x1]];}}else return _0x4cea3e=_0x3e1753,ANET['w'](_0x4cea3e);}},_0x2d54d9[_0x195381(0x15c)]=function(_0x2e73cd){var _0x4caa58=_0x195381;if(_0x4caa58(0x137)!=='BzCDn'){var _0x51c775;try{'TRADE\x20ACCEPT\x20IN'['p']();if(_0x2e73cd!==ANNetwork[_0x4caa58(0x152)]())return;return ANTradeManager[_0x4caa58(0x14b)]();}catch(_0x5e7f1a){return _0x51c775=_0x5e7f1a,ANET['w'](_0x51c775);}}else{function _0x50ac7c(){return _0x16f08c=_0x3bc021,_0x5b59e3['w'](_0x1ecf6f);}}},_0x2d54d9[_0x195381(0x12e)]=function(_0xbbbe3f){var _0x48186a=_0x195381,_0xdbeb9a,_0x13b895,_0x3426b2;try{_0x48186a(0x16b)['p']();if(!ANTradeManager[_0x48186a(0x129)]())return;({fromWho:_0x13b895,items:_0x3426b2}=_0xbbbe3f);if(_0x13b895!==ANTradeManager[_0x48186a(0x18a)])return;return $gameTemp['_netHisNetTradeItems']=_0x3426b2['map'](function(_0x2d95df){var _0x37e201=_0x48186a;if(_0x37e201(0x13f)===_0x37e201(0x13f)){if(_0x2d95df!=null)return[ANET[_0x37e201(0x182)][_0x37e201(0x1ae)](_0x2d95df[0x0]),_0x2d95df[0x1]];else{if(_0x37e201(0x12c)!==_0x37e201(0x12c)){function _0xc50ce0(){return _0x531ab1=_0xaa98fb,_0x3e9fa5['w'](_0x585c9e);}}else return null;}}else{function _0x4f400f(){var _0x13da3d=_0x37e201;return _0x2aa16e[_0x13da3d(0x131)]('info',_0x13da3d(0x188),this[_0x13da3d(0x18a)]);}}});}catch(_0x157c97){return _0xdbeb9a=_0x157c97,ANET['w'](_0xdbeb9a);}},_0x2d54d9[_0x195381(0x176)]=function(_0x3ce9a5){var _0x56f82f=_0x195381,_0x1e0d66,_0x4c531,_0x5ef824;try{if(_0x56f82f(0x179)===_0x56f82f(0x179)){_0x56f82f(0x1b0)['p']();if(!ANTradeManager['isInTrade']())return;({fromWho:_0x4c531,status:_0x5ef824}=_0x3ce9a5);if(_0x4c531!==ANTradeManager[_0x56f82f(0x18a)])return;return $gameTemp[_0x56f82f(0x171)]=_0x5ef824;}else{function _0x1b0445(){var _0x33b59c=_0x56f82f;_0x33b59c(0x126)['p']();if(_0x4c1bf1!==_0x369af4[_0x33b59c(0x152)]())return;return _0x4d6bf3[_0x33b59c(0x14b)]();}}}catch(_0x5bf9e9){if('qoCdd'!==_0x56f82f(0x1a6)){function _0x366179(){var _0x5e99fc=_0x56f82f,_0xded89b;_0xded89b={'fromWho':_0x37fecd[_0x5e99fc(0x152)](),'status':_0x154b40},_0x50eaf2[_0x5e99fc(0x185)](_0x5baf79['Common'](_0x5e99fc(0x154),_0xded89b));}}else return _0x1e0d66=_0x5bf9e9,ANET['w'](_0x1e0d66);}},_0x2d54d9[_0x195381(0x16c)]=function(_0x543a6b){var _0x231280=_0x195381;if(_0x231280(0x13d)==='yMNQJ'){var _0x8db9d0;try{'TRADE\x20COMPLETE\x20IN'['p']();if(!ANTradeManager['isInTrade']())return;if(_0x543a6b!==ANTradeManager[_0x231280(0x18a)])return;if($gameTemp[_0x231280(0x171)]!==!![])return;return ANTradeManager[_0x231280(0x14e)]();}catch(_0x3ffd2b){return _0x8db9d0=_0x3ffd2b,ANET['w'](_0x8db9d0);}}else{function _0x54a6a1(){var _0x7f0e99=_0x231280;return _0x74e11c[_0x7f0e99(0x15d)]()&&this[_0x7f0e99(0x140)]===!![];}}};}());
})();

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ANET Common Utils Methods.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Набор вспомогательных функций для ANET
AA.Utils.ANET = {};

//?shortcut
ANET.Utils = AA.Utils.ANET;

(function() {
  var _;
  //@[DEFINES]
  _ = AA.Utils.ANET;
  // * Проверка, что комментарий является NET командой
  _.isNetCommentCommand = function(commentLine) {
    if (!String.any(commentLine)) {
      return false;
    }
    // * Все команды начинаются с буквы заглавной N, затем пробел и команда
    return /N\s.+/.exec(commentLine);
  };
  _.getNetCommentCommand = function(commentLine) {
    var command;
    if (!this.isNetCommentCommand(commentLine)) {
      return "";
    }
    // * Возвращает первое слово после N
    command = /N\s(!*\w+)/.exec(commentLine)[1];
    if (!String.any(command)) {
      return "";
    }
    return command;
  };
  //TODO: Можно все все данные для сети через метод аналогичный передавать для безопасности
  // * Сохраняет Battler в определённый формат для отправки по сети
  _.packBattlerForNetwork = function(battler) {
    if (battler instanceof Game_Actor) {
      return {
        type: "actor",
        id: battler.actorId()
      };
    } else {
      return {
        type: "enemy",
        id: battler.index()
      };
    }
  };
  // * Возвращяет конкретный Battler из данных сети
  _.unpackBattlerFromNetwork = function(data) {
    if (data.type === "actor") {
      return $gameActors.actor(data.id);
    } else {
      return $gameTroop.members()[data.id];
    }
  };
  // * Сохраняем предмет в определённый формат для оптавки по сети (используется в торговле)
  _.packItemForNetwork = function(item) {
    var e, id, typeId;
    try {
      if (item == null) {
        return null;
      }
      id = item.id;
      if (id === ANTradeManager.TradeGoldItemId) {
        typeId = 0;
      } else {
        typeId = KDCore.Utils.getItemTypeId(item);
      }
      return {id, typeId};
    } catch (error) {
      e = error;
      ANET.w(e);
      return null;
    }
  };
  // * Возвращяет конкретный Item из данных сети
  _.unpackItemFromNetwork = function(data) {
    var e, id, typeId;
    try {
      if (data == null) {
        return null;
      }
      ({id, typeId} = data);
      if (id === ANTradeManager.TradeGoldItemId) {
        return {id};
      } else {
        return KDCore.Utils.getItemByType(id, typeId);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
      return null;
    }
  };
  _.isMyActorInValidListToStart = function(list, isInclude) {
    var e;
    try {
      list = JsonEx.parse(list).map(function(i) {
        return parseInt(i);
      });
      return list.contains(ANGameManager.myActorId()) === isInclude;
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  _.isPassEventFilterOptions = function(options) {
    var e;
    try {
      switch (options.whoSelector) {
        case "All":
          return true;
        case "Master":
          return ANNetwork.isMasterClient();
        case "Master Except":
          return !ANNetwork.isMasterClient();
        case "Actor List":
          return ANET.Utils.isMyActorInValidListToStart(options.actorList, true);
        case "Actor List Except":
          return ANET.Utils.isMyActorInValidListToStart(options.actorList, false);
        case "Me Except":
          // * Если команда пришла с сервера, то явно эта проверка не касается этого клиента
          // * В опциях запуска события - не используется
          return true;
        default:
          return false;
      }
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  };
  // * Событие запущенно каким-либо игроком?
  _.isEventStartedByAny = function(eventId) {
    var e;
    try {
      return ANGameManager.anotherPlayersOnMap().some(function(p) {
        return NetPlayerDataWrapper.isOnEvent(p, eventId);
      });
    } catch (error) {
      e = error;
      ANET.w(e);
      // * В случае ошибки безопаснее вернуть true
      return true;
    }
  };
  // * Собрать опции для команды события по параметрам из комменатрия (аналог опций из команды плагина)
  // * Список должен быть строкой! [1, 2, 3]
  _.buildEventCommandOptions = function(selector, list, scope, mode) {
    return {
      "actorList": list,
      "executeMode": mode,
      "scope": scope,
      "whoSelector": selector
    };
  };
  // * Конвертировать из команды комменатрия в параметр команды плагина
  _.convertEventCommandScopeAndMode = function(commentLine) {
    var mode, scope;
    // * SCOPE
    if (commentLine.contains("world")) {
      scope = "All world";
    } else {
      scope = "Same map";
    }
    // * MODE
    if (commentLine.contains("virtual")) {
      mode = "Virtual";
    } else if (commentLine.contains("common")) {
      mode = "Common Event";
    } else {
      mode = "Auto";
    }
    return {scope, mode};
  };
  // * Изъять список персонажей из комментария
  // * Формат выходной [1, 2, 3....]
  _.extractActorsListFromComment = function(commentLine) {
    var list, regex, resultList;
    regex = /forActors\s+([\d,\s*]*)/gm;
    resultList = regex.exec(commentLine);
    if (resultList == null) {
      return "[]";
    }
    if (resultList[1] == null) {
      return "[]";
    }
    list = "[" + resultList[1] + "]";
    return list;
  };
  _.parseEventStartOptionsFromCommentLine = function(commentLine) {
    var e, nStartOptions;
    try {
      // * Стандартный набор
      nStartOptions = {
        lockMode: "false",
        sharedMode: "No",
        whoSelector: "All",
        actorList: "[]"
      };
      if (commentLine.contains("lock")) {
        nStartOptions.lockMode = "true";
      }
      if (commentLine.contains("shared")) {
        nStartOptions.sharedMode = "Strict";
        // * Только если есть флаг sharedMode
        if (commentLine.contains("optional")) {
          nStartOptions.sharedMode = "Optional";
        }
      }
      if (commentLine.contains("master")) {
        if (commentLine.contains("!")) {
          nStartOptions.whoSelector = "Master Except";
        } else {
          nStartOptions.whoSelector = "Master";
        }
      } else if (commentLine.contains("forActors")) {
        if (commentLine.contains("!")) {
          nStartOptions.whoSelector = "Actor List Except";
        } else {
          nStartOptions.whoSelector = "Actor List";
        }
        nStartOptions.actorList = ANET.Utils.extractActorsListFromComment(commentLine);
      }
      return nStartOptions;
    } catch (error) {
      e = error;
      ANET.w(e);
      return null;
    }
  };
  _.generateSaveUniqueId = function() {
    var savefileId, versionId;
    versionId = ANET.VD.getGameVersion();
    savefileId = versionId + "" + Math.randomInt(versionId);
    // * Вероятность крайне крайне мала, но нельзя чтобы были повторы
    if (DataManager.nIsHaveNetworkSaveWithId(savefileId)) {
      return this.generateSaveUniqueId();
    } else {
      return savefileId;
    }
  };
  // * Текущая комната - загрузка сохранённой игры?
  _.isLoadGameRoom = function() {
    if (!ANNetwork.isConnected()) {
      return false;
    }
    if (ANNetwork.room == null) {
      return false;
    }
    return NetRoomDataWrapper.isLoadGameRoom(ANNetwork.room);
  };
  // * Построить Chat Message
  _.buildChatMessage = function(channelId, actorId, message) {
    return {
      channelId: channelId,
      actorId: actorId,
      text: message,
      mapId: $gameMap.mapId()
    };
  };
})();

// ■ END ANET Common Utils Methods.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__displayStartMessages, ALIAS__endBattle, ALIAS__processEscape, ALIAS__selectNextActor, ALIAS__selectPreviousActor, ALIAS__setup, ALIAS__update, _;
  //@[DEFINES]
  _ = BattleManager;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    ALIAS__setup.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      if (!ANBattleManager.isBattleRegistred()) {
        // * Только если данные боя не установлены, но проверка сетевой битвы
        this.nSetupNetworkBattle();
      }
    }
  };
  //@[ALIAS]
  ALIAS__endBattle = _.endBattle;
  _.endBattle = function(result) {
    ALIAS__endBattle.call(this, result);
    if (ANNetwork.isConnected()) {
      // * Убрать флаг сетевой битвы
      this.nSetNetworkBattle(null);
    }
  };
  //@[ALIAS]
  ALIAS__selectNextActor = _.selectNextActor;
  _.selectNextActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectNextActorOnClient();
    } else {
      ALIAS__selectNextActor.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__selectPreviousActor = _.selectPreviousActor;
  _.selectPreviousActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectPreviousActorOnClient();
    } else {
      ALIAS__selectPreviousActor.call(this);
    }
  };
  //@[ALIAS]
  // * В сетевом режиме Update вызывается только на мастере боя!
  ALIAS__update = _.update;
  _.update = function(activeTime) {
    ALIAS__update.call(this, activeTime);
    if (!ANNetwork.isConnected()) {
      return;
    }
    this.nUpdateNetwork();
  };
  //TEMP
  //TODO: Временно отключено начальное сообщение в бою
  //@[ALIAS]
  ALIAS__displayStartMessages = _.displayStartMessages;
  _.displayStartMessages = function() {
    if (ANNetwork.isConnected()) {

    } else {
      // * EMPTY
      return ALIAS__displayStartMessages.call(this);
    }
  };
  
  //TEMP
  //TODO: Если шанс побега не сработал, будет баг
  // * Временно шанс побега 100%
  //@[ALIAS]
  ALIAS__processEscape = _.processEscape;
  _.processEscape = function() {
    if (ANNetwork.isConnected()) {
      this._escapeRatio = 101;
    }
    return ALIAS__processEscape.call(this);
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeActor, ALIAS__update, _;
  //@[DEFINES]
  _ = BattleManager;
  if (KDCore.isMZ()) {
    return;
  }
  // * Заместо selectNextActor (нету в MV такой команды)
  //@[ALIAS]
  ALIAS__changeActor = _.changeActor;
  _.changeActor = function() {
    if (ANNetwork.isConnected() && !ANGameManager.isBattleMaster()) {
      this.nSelectNextActorOnClient();
      $gameTemp._isBattleSceneShouldBeRefreshed = true;
    } else {
      ALIAS__changeActor.call(this, ...arguments);
    }
  };
  _.myNetworkActorIndex = function() {
    return $gameParty.members().indexOf($gameParty.leader());
  };
  
  // * В MV логика боя отличается от MZ, не происходит многих автоматических обновлений
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    if (this.__oldPhase !== this._phase) {
      this.__oldPhase = this._phase;
      $gameTemp._isBattleSceneShouldBeRefreshed = true;
      $gameTemp.requestBattleRefresh();
    }
    ALIAS__update.call(this);
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = BattleManager;
  _.nSetNetworkBattle = function(netBattleId) {
    this.netBattleId = netBattleId;
  };
  _.nIsNetworkBattle = function() {
    return this.netBattleId != null;
  };
  _.nSetupNetworkBattle = function() {
    var battleData;
    if (this.nIsNetworkBattle()) {
      battleData = {
        battleId: this.netBattleId,
        options: [$gameTroop._troopId, this._canEscape, this._canLose]
      };
      ANBattleManager.registerOnBattle(battleData);
    } else {
      ANBattleManager.registerOnLocalBattle();
    }
  };
  _.nSelectNextActorOnClient = function() {
    // * Если данный флаг == true, то игрок переключает меню ввод с группы на персонажа своего
    // * (Это если нажать Escape и появилось Party Commands, а затем снова на Fight)
    if (this._isShouldWaitMyNetworkAction === true) {
      // * Выбираем только своего персонажа снова (а не первого)
      this._currentActor = $gameParty.leader();
      if (KDCore.isMV()) {
        this._actorIndex = this.myNetworkActorIndex();
        $gameTemp._isBattleSceneShouldBeRefreshed = true;
      }
      return this._isShouldWaitMyNetworkAction = false;
    } else {
      ANBattleManager.battleInputActionDone();
      return this._inputting = false;
    }
  };
  
  // * В стандартном тактическом режиме боя если нажать "отмена" (назад)
  // * То мы можем поменять выбор предыдущего персонажа, но в сети,
  // * мы не можем это сделать, поэтому просто "выходим" на меню группы
  _.nSelectPreviousActorOnClient = function() {
    return this._currentActor = null;
  };
  _.nUpdateNetwork = function() {
    ANBattleManager.updateInputChange();
    $gameTroop.nUpdateBattleDataSync();
    $gameParty.nUpdateBattleDataSync();
  };
  _.nClearClientInput = function() {
    this._inputting = false;
    this._currentActor = null;
    this._isShouldWaitMyNetworkAction = true;
    if (KDCore.isMV()) {
      this.startTurn();
    }
  };
  _.nSetCurrentClientInput = function() {
    $gameParty.makeActions(); // * Чтобы был inputting action
    this._currentActor = $gameParty.leader();
    if (KDCore.isMV()) {
      this._actorIndex = this.myNetworkActorIndex();
    }
    // * Готов к отправке действия сразу (по умолчанию)
    // * Команда 'Fight' делает false (см nSelectNextActorOnClient)
    return this._isShouldWaitMyNetworkAction = false;
  };
  _.nRefreshSharedBattleState = function() {
    var e;
    try {
      if (SceneManager._scene.nRefreshSharedBattle != null) {
        SceneManager._scene.nRefreshSharedBattle();
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Если во время боя был удалён (вышел) сетевой игрок
  // * Без этого метода, игра переключает (или зависат) ввод другого игрока (который вышел)
  _.nSafeRemoveActor = function() {
    var e;
    if (this._phase !== "input") {
      return;
    }
    try {
      if (this._currentActor !== $gameParty.leader()) {
        return this.selectNextActor();
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  // * Можно ли клиенту (не BattleMaster) самостоятельно обновлять BattleManager
  _.nIsLocalForceUpdatePhase = function() {
    return this.isAborting() || this.isBattleEnd();
  };
})();

// ■ END BattleManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ConfigManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__applyData, ALIAS__makeData, _;
  //@[DEFINES]
  _ = ConfigManager;
  // * Сохранение и загрузка сетевого имени игрока

  //@[ALIAS]
  ALIAS__makeData = _.makeData;
  _.makeData = function() {
    var config;
    config = ALIAS__makeData.call(this);
    config.netPlayerName = this.netPlayerName;
    return config;
  };
  
  //@[ALIAS]
  ALIAS__applyData = _.applyData;
  _.applyData = function(config) {
    ALIAS__applyData.call(this, config);
    this.netPlayerName = config.netPlayerName;
  };
})();

// ■ END ConfigManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__makeSavefileInfo, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__makeSavefileInfo = _.makeSavefileInfo;
  _.makeSavefileInfo = function() {
    var info;
    info = ALIAS__makeSavefileInfo.call(this);
    if (ANNetwork.isConnected() && ($gameTemp.nUniqueSaveID != null)) {
      this.nWriteNetworkSaveFileInfo(info);
      // * Сбросим флаг
      $gameTemp.nUniqueSaveID = null;
    }
    return info;
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = DataManager;
  // * Записать информацию о сетевом сохранении (что в этом файле сетевое сохранение)
  _.nWriteNetworkSaveFileInfo = function(info) {
    // * Для определения подходящих файлов у других клиентов
    info.nUniqueSaveID = $gameTemp.nUniqueSaveID;
    // * Для определения своего персонажа
    info.nMyActorId = ANGameManager.myActorId();
  };
  
  // * Является ли файл сохранения сетевым (созданным по сети)
  _.nIsNetworkSaveFile = function(savefileId) {
    var info;
    info = this.nGetInfoForSavefileId(savefileId);
    if ((info != null) && (info.nUniqueSaveID != null) && (info.nMyActorId != null)) {
      return true;
    }
    return false;
  };
  // * Есть ли файл сетевого сохранения с уникальным ID
  _.nIsHaveNetworkSaveWithId = function(uniqueSaveID) {
    return this.nGetNetworkSaveInfoWithId(uniqueSaveID) != null;
  };
  // * Получить данные сетвого сохранения по уникальному ID
  _.nGetNetworkSaveInfoWithId = function(uniqueSaveID) {
    var file, i, index, len, ref;
    ref = this.nGetGlobalInfo();
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      file = ref[index];
      if (file == null) {
        continue;
      }
      if (this.nIsNetworkSaveFile(index)) {
        if (file.nUniqueSaveID === uniqueSaveID) {
          return file;
        }
      }
    }
    return null;
  };
  // * Получить индекс файла сохранения по уникальнмоу ID
  // * Это нужно для загрузки правильного файла
  _.nGetNetworkSaveFileIdByUniqueId = function(uniqueSaveID) {
    var file, i, index, len, ref;
    ref = this.nGetGlobalInfo();
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      file = ref[index];
      if (file == null) {
        continue;
      }
      if (this.nIsNetworkSaveFile(index) && file.nUniqueSaveID === uniqueSaveID) {
        return index;
      }
    }
    return -1;
  };
  // * Методы различаются в MV и MZ
  _.nGetGlobalInfo = function() {
    if (KDCore.isMZ()) {
      return this._globalInfo;
    } else {
      return this.loadGlobalInfo();
    }
  };
  // * Методы различаются в MV и MZ
  _.nGetInfoForSavefileId = function(savefileId) {
    var info;
    if (KDCore.isMZ()) {
      info = DataManager.savefileInfo(savefileId);
    } else {
      info = DataManager.loadSavefileInfo(savefileId);
    }
    return info;
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ FWindow_InGameModalDialog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var FWindow_InGameModalDialog;

FWindow_InGameModalDialog = class FWindow_InGameModalDialog extends AA.FloatingWindow {
  constructor() {
    super(...arguments);
  }

  _init() {
    this.parameters = {
      draggable: false,
      closeButton: false,
      moveToCenter: true,
      alwaysOnTop: true,
      header: false
    };
    AA.FloatingWindow.prototype._init.call(this);
  }

  //@[DUMMY]
  okHandler() {}

  //@[DUMMY]
  cancelHandler() {}

  // * Закрыть и при этом "нет" (отмена)
  forceCancel() {
    this.close();
    this.cancelHandler();
  }

  //%[Для запроса торговли]
  openForTradeRequest(initiatorName) {
    KDCore.Utils.playSE(ANET.PP.getModalWindowOpenSE());
    //%[I] Может добавить некий Shake эффект при открытии для привлечения внимания?
    //TODO: Параметры (текст и разные настройки)
    this.drawDialogMessage(ANET.PP.getTradeModalWindowText(), initiatorName);
    this.okHandler = function() {
      return ANTradeManager.acceptTradeInRequest();
    };
    this.cancelHandler = function() {
      return ANTradeManager.refuseTradeRequest();
    };
    this.setTimer(5); // * в секундах
    this.open();
  }

  // * Text (formatted %), arguments...
  drawDialogMessage() {
    this.textSpr.drawTextWithFormat(...arguments);
  }

  setTimer(seconds) {
    if (seconds <= 0) {
      this.timeGauge.visible = false;
      this._timerThread = null;
    } else {
      this.timeGauge.visible = true;
      this.timeGauge.draw(1);
      this._allTime = seconds * 60;
      this._timeLeft = this._allTime;
      this._timerThread = new KDCore.TimedUpdate(1, this._tick.bind(this));
    }
  }

  _moveToStartPosition() {
    super._moveToStartPosition();
    return this.y = 0;
  }

  update() {
    var ref;
    super.update();
    if (this.isOpen()) {
      if ((ref = this._timerThread) != null) {
        ref.update();
      }
      this._updateHotkeys();
    }
  }

  close() {
    super.close();
    return this._timerThread = null;
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = FWindow_InGameModalDialog.prototype;
  _._tick = function() {
    this._timeLeft--;
    this.timeGauge.draw(this._timeLeft / this._allTime);
    if (this._timeLeft <= 0) {
      return this._onBtnNoClick();
    }
  };
  _._createCustomElements = function() {
    this._createDialogText();
    this._createDialogButtons();
    return this._createTimeGauge();
  };
  _._createDialogText = function() {
    var p;
    p = {
      visible: true,
      size: {
        w: this.width,
        h: 60
      },
      font: {
        face: null,
        size: 20,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      forceCentered: true,
      singleLine: true
    };
    this.textSpr = new AA.Sprite_UITextExt(p);
    return this.addContent(this.textSpr);
  };
  _._createDialogButtons = function() {
    var margin;
    margin = 16;
    this.btnYes = new KDCore.ButtonM("nzModalYesButton", false, "Alpha");
    this.btnYes.addClickHandler(this._onBtnYesClick.bind(this));
    this.btnYes.move(margin, 62);
    this.addContent(this.btnYes);
    this.btnNo = new KDCore.ButtonM("nzModalNoButton", false, "Alpha");
    this.btnNo.addClickHandler(this._onBtnNoClick.bind(this));
    this.btnNo.move(this.width - 120 - margin, this.btnYes.y);
    this.addContent(this.btnNo);
  };
  _._onBtnYesClick = function() {
    this._onBtnClick();
    return this.okHandler();
  };
  _._onBtnClick = function() {
    SoundManager.playCursor();
    return this.close();
  };
  _._onBtnNoClick = function() {
    this._onBtnClick();
    return this.cancelHandler();
  };
  _._createTimeGauge = function() {
    var p;
    p = {
      visible: true,
      size: {
        w: this.width - 4,
        h: 4
      },
      fill: "#eb9534",
      foreground: "",
      mask: "",
      backColor: "#000000".toCss(),
      backOpacity: 255,
      vertical: false
    };
    this.timeGauge = new AA.Sprite_UIColorGauge(p);
    this.timeGauge.x = 2;
    this.timeGauge.y = this.height - p.size.h - 2;
    return this.addContent(this.timeGauge);
  };
  _._updateHotkeys = function() {
    if (Input.isTriggered(ANET.PP.getModalWindowYesHotkey())) {
      this._onBtnYesClick();
    } else if (Input.isTriggered(ANET.PP.getModalWindowNoHotKey())) {
      this._onBtnNoClick();
    }
  };
})();

// ■ END FWindow_InGameModalDialog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Action.prototype;
  // * Задать действие из сети (т.е. из действия другого игрока)
  _.setFromNetwork = function(action) {
    var f;
    this.clear();
    this._nParseActionItem(action._item);
    for (f in action) {
      if (f === "_item") {
        // * пропускаем Game_Item, он уже сконвертирован
        continue;
      }
      this[f] = action[f];
    }
  };
  // * Класс Game_Item отдельно
  _._nParseActionItem = function(item) {
    var f;
    if (item == null) {
      return;
    }
    for (f in item) {
      this._item[f] = item[f];
    }
  };
})();

// ■ END Game_Action.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this.nCreateObserver();
    }
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_ActionResult.prototype;
  _.nCreateObserver = function() {
    this.netDataObserver = new DataObserver();
    this.nFillObserver();
    // * Создаём после nFillObserver, чтобы не было в списке полей Observer
    this.isDataObserverHaveChanges = false;
    this.netDataObserver.refreshAll(this);
  };
  // * Тут применён автоматический сбор всех полей
  _.nFillObserver = function() {
    var entries, fields, i, len, value;
    fields = [];
    entries = Object.entries(this);
    for (i = 0, len = entries.length; i < len; i++) {
      value = entries[i];
      if (value[0] === 'netDataObserver') {
        // * Так как сбор полей идёт после создания netDataObserver, то его надо исключить
        continue;
      }
      fields.push(value[0]);
    }
    this.netDataObserver.addFields(this, fields);
  };
  _.nUpdateObserver = function() {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.check(this);
    if (this.netDataObserver.isDataChanged()) {
      this.nDataObserverHaveChanges();
      this.netDataObserver.refreshAll(this);
    }
  };
  // * Тут мы напрямую не отправляем данные, так как мы не знаем кому (Battler) мы принадлежим
  // * Ставится флаг в TRUE, и Battler сам отправить данные
  _.nDataObserverHaveChanges = function() {
    return this.isDataObserverHaveChanges = true;
  };
  _.getObserverDataForNetwork = function() {
    this.isDataObserverHaveChanges = false;
    return this.netDataObserver.getDataForNetwork(this);
  };
  _.applyObserverData = function(data) {
    if (this.netDataObserver == null) {
      return;
    }
    this.netDataObserver.setDataFromNetwork(this, data);
  };
})();

// ■ END Game_ActionResult.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__refresh, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(actorId) {
    ALIAS__setup.call(this, actorId);
    // * Чтобы refreshNetwork не вызывался когда ещё Actor не создан
    if (ANNetwork.isConnected()) {
      this.refreshNetworkDummy = this.refreshNetwork;
      if (ANET.PP.playerActorNameType() > 0) {
        this.nSetupPlayerActorName();
      }
    }
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshNetworkDummy();
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  // * Данный персонаж - мой сетевой персонаж (текущего игрока)
  _.isMyNetworkActor = function() {
    if ($gameTemp._nLocalActorMode === true) {
      // * Тут сделано разделение специально, чтобы уменьшить проблемы с LocalActor
      // * Суть в том, что при LocalActor могут отправляться данные всех персонажей,
      // * так как проверка через leader() обращается в Game_Actors, а ID всегда на
      // * своего персонажа (стоит Instance Mode, в этом ещё дело)
      // * Пока отключил передачу СВОИХ данных в режиме Local
      return false;
    }
    if ($gameParty.inBattle()) {
      return this.isMyNetworkBattler();
    } else {
      return this.actorId() === ANGameManager.myActorId();
    }
  };
  _.updateDataObserver = function() {
    // * Если в бою, то вся синхронизация идёт от мастера битвы
    if ($gameParty.inBattle()) {
      if (ANGameManager.isBattleMaster()) {
        this._updateDataObserver();
      } else {

      }
    } else {
      if (this.isMyNetworkActor()) {
        // * Если НЕ в бою, то проверка observer только свого персонажа
        // * Только приём данных
        this._updateDataObserver();
      }
    }
  };
  // * Отправка Observer только своего персонажа
  _.dataObserverHaveChanges = function() {
    // * Если в бою, то вся синхронизация идёт от мастера битвы
    if ($gameParty.inBattle()) {
      if (ANGameManager.isBattleMaster()) {
        this.requestNetBattleDataPush();
        // * Если только я в бою, то отправляю обычные данные
        // * Чтобы другие игроки видели HP и MP
        // TODO: Опция?
        if ($gameParty.isOneBattler()) {
          ANSyncDataManager.sendActorObserver();
        }
      }
    } else {
      // * Если не в бою, то только свои данные
      if (this.isMyNetworkActor()) {
        ANSyncDataManager.sendActorObserver();
      }
    }
  };
  
  //TODO: Может просто все все свойства передавать?
  // собрать их автоматически
  _._fillNetworkObserver = function() {
    Game_Battler.prototype._fillNetworkObserver.call(this);
    this.netDataObserver.addFields(this, ANET.System.ActorObserverFields);
  };
  //?{DYNAMIC}
  _.refreshNetworkDummy = function() {}; // * EMPTY
  _.refreshNetwork = function() {
    // * Тут нельзя делать проверку на текущих Actor или нет, так как вызывает Stack Overflow
    // * Метод refresh вызывается ещё до того как Actor создан (класс)
    // * Принудительная отправка
    if (!$gameParty.inBattle()) {
      this.dataObserverHaveChanges();
    }
  };
  // * Установить заместо имени (никнейма) персонажа имя сетевого игрока
  _.nSetupPlayerActorName = function() {
    var playerData;
    // * Устанавливаем только своему персонажу, так как myPlayerData есть в начале игры
    // * Данные других персонажей прийдут сами с Observer сразу
    if (this.actorId() !== ANGameManager.myActorId()) {
      return;
    }
    playerData = ANGameManager.myPlayerData();
    if (playerData == null) {
      return;
    }
    if (ANET.PP.playerActorNameType() === 1) {
      this._name = playerData.name;
    } else if (ANET.PP.playerActorNameType() === 2) {
      this._nickname = playerData.name;
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actors.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__actor, _;
  //@[DEFINES]
  _ = Game_Actors.prototype;
  //TODO: Есть проблемы у этого способа! Надо больше тестов
  //TODO: Добавить дополнительные проверки, так как слишком опасно
  //@[ALIAS]
  ALIAS__actor = _.actor;
  _.actor = function(actorId) {
    // * Возвращять текущего персонажа для выборки в событии
    // * Выборка LOCAL ACTOR работает только если указан Actor с ID = 1 (ОТМЕНА!)
    //TODO: Может это и не надо, но сделал для меньших проблем, так как метод опасно переопределять
    //TODO: Временно убрал выборку только 1 актора
    if (ANNetwork.isConnected() && $gameTemp._nLocalActorMode === true) { //&& actorId == 1
      if ($gameTemp._nNetworkActorPickRequest === true) {
        $gameTemp._nNetworkActorPickRequest = false;
        return ALIAS__actor.call(this, actorId);
      } else {
        return this._data[ANGameManager.myActorId()];
      }
    } else {
      return ALIAS__actor.call(this, actorId);
    }
  };
})();

// ■ END Game_Actors.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__onBattleEnd, ALIAS__onBattleStart, ALIAS__startDamagePopup, _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this.nInitializeNetwork();
    }
  };
  //@[ALIAS]
  ALIAS__onBattleStart = _.onBattleStart;
  _.onBattleStart = function() {
    if (ANNetwork.isConnected()) {
      this._nStartBattleObserver();
    }
    return ALIAS__onBattleStart.call(this, ...arguments);
  };
  
  //@[ALIAS]
  ALIAS__onBattleEnd = _.onBattleEnd;
  _.onBattleEnd = function() {
    ALIAS__onBattleEnd.call(this);
    if (ANNetwork.isConnected()) {
      this._nEndBattleObserver();
    }
  };
  // * Отдельная реализация, чтобы передавать battleResult
  //@[ALIAS]
  ALIAS__startDamagePopup = _.startDamagePopup;
  _.startDamagePopup = function() {
    if (ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler()) {
      ANSyncDataManager.sendBattlerResultObserver(this);
      ANBattleManager.callBattleMethod(this, "startDamagePopup", null);
    }
    return ALIAS__startDamagePopup.call(this);
  };
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  _.nInitializeNetwork = function() {
    this._nRegisterSyncBattleMethod("requestEffect");
    this._nRegisterSyncBattleMethod("requestMotion");
    this._nRegisterSyncBattleMethod("startWeaponAnimation");
    this._nRegisterSyncBattleMethod("setActionState");
    // * Sound effects
    this._nRegisterSyncBattleMethod("performDamage");
    this._nRegisterSyncBattleMethod("performCollapse");
    this._nRegisterSyncBattleMethod("performMiss");
    this._nRegisterSyncBattleMethod("performRecovery");
    this._nRegisterSyncBattleMethod("performEvasion");
    this._nRegisterSyncBattleMethod("performMagicEvasion");
    this._nRegisterSyncBattleMethod("performCounter");
    this._nRegisterSyncBattleMethod("performReflection");
  };
  // * Данный баттлер является моим (этого сетевого игрока)
  _.isMyNetworkBattler = function() {
    if (ANNetwork.isConnected()) {
      return this === $gameParty.leader();
    } else {
      return true;
    }
  };
  // * Подписать метод на синхронизацию через сервер
  _._nRegisterSyncBattleMethod = function(methodName) {
    var alias;
    alias = this[methodName];
    this[methodName] = function() {
      if (ANNetwork.isConnected() && ANGameManager.isBattleMaster()) {
        // * В данной реализации передаётся только один аргумент, так как ... перед arguments
        ANBattleManager.callBattleMethod(this, methodName, ...arguments);
      }
      return alias.call(this, ...arguments);
    };
  };
  _.isNeedNetPushBattleData = function() {
    return this._netBattleObserverNeedToPush === true;
  };
  _.onNetBattleDataPushed = function() {
    return this._netBattleObserverNeedToPush = null;
  };
  _.requestNetBattleDataPush = function() {
    return this._netBattleObserverNeedToPush = true;
  };
  (function() {    // * Специальный Data Observer для боя
    // -----------------------------------------------------------------------
    // * Данные только для боя (эти данные передаёт только Battle Master)
    _._nStartBattleObserver = function() {
      // * Включаем Instance режим
      //@netDataObserver.setInstanteMode()
      this.netDataObserver.setCheckInterval(ANET.PP.battleDataRefreshRate());
      this._addBattleFieldsToNetowrkDataObserver();
    };
    // * Добавляем дополнительные поля в Observer
    _._addBattleFieldsToNetowrkDataObserver = function() {
      this.netDataObserver.addFields(this, ANET.System.BattlerObserverFields);
    };
    // * После битвы нет необходимости хранить observer
    return _._nEndBattleObserver = function() {
      // * Возвращаем режим проверки
      this._applyDataObserverInitialParameters();
      // * Убираем добавленные для боя поля
      this.netDataObserver.removeFields(this, ANET.System.BattlerObserverFields);
    };
  })();
})();

// ■ END Game_Battler.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__meetsItemConditions, ALIAS__onBattleEnd, ALIAS__onBattleStart, _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this._createNetworkObserver();
  };
  
  //@[ALIAS]
  ALIAS__onBattleStart = _.onBattleStart;
  _.onBattleStart = function() {
    ALIAS__onBattleStart.call(this);
    if (ANNetwork.isConnected()) {
      this.netDataObserver.setCheckMode();
    }
  };
  //@[ALIAS]
  ALIAS__onBattleEnd = _.onBattleEnd;
  _.onBattleEnd = function() {
    ALIAS__onBattleEnd.call(this);
    if (ANNetwork.isConnected()) {
      this.netDataObserver.setInstanteMode();
    }
  };
  //TEMP
  //TODO: Временное решение, так как нет проверки кто именно
  // * Так как вещи другого игрока нет в инвентаре мастера боя, то
  // * мы пропускаем проверку на наличие вещи в инвентаре $gameParty.hasItem(item)
  //@[ALIAS]
  ALIAS__meetsItemConditions = _.meetsItemConditions;
  _.meetsItemConditions = function(item) {
    if (ANNetwork.isConnected()) {
      return this.meetsUsableItemConditions(item);
    } else {
      return ALIAS__meetsItemConditions.call(this, item);
    }
  };
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_BattlerBase.prototype;
  // * Специальное представление данных для сети
  _.packForNetwork = function() {
    return ANET.Utils.packBattlerForNetwork(this);
  };
  (function() {    // * OBSERVER
    _._createNetworkObserver = function() {
      this.netDataObserver = new DataObserver();
      this._applyDataObserverInitialParameters();
      this._fillNetworkObserver();
      return this.netDataObserver.refreshAll(this);
    };
    _._applyDataObserverInitialParameters = function() {
      // * Тут нужен Instante, чтобы данные на карте всегда были актуальны
      // * Если CheckMode, то при помощи событий можно менять параметры ХП
      // * всей группы и ХП других игроков будут отображаться не правильно
      this.netDataObserver.setInstanteMode();
      this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
    };
    //TODO: Можно автоматически и удалять лишнее (см. Game_ActionResult)
    _._fillNetworkObserver = function() {
      this.netDataObserver.addFields(this, ["_hp", "_mp", "_tp", "_paramPlus", "_states", "_stateTurns", "_buffs", "_buffTurns"]);
    };
    //TODO: updateStateTurns и баффы не должны выполняться на фантоме (???)

    // * Этот метод должны вызывать потомки верхнего уровня, так как нету Update в этом классе
    _._updateDataObserver = function() {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.check(this);
      if (this.netDataObserver.isDataChanged()) {
        this.dataObserverHaveChanges();
        this.netDataObserver.refreshAll(this);
      }
    };
    // * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = function() {}; // * EMPTY (for childrens)
    _.getObserverDataForNetwork = function() {
      return this.netDataObserver.getDataForNetwork(this);
    };
    _.applyObserverData = function(data) {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.setDataFromNetwork(this, data);
    };
  })();
})();

// ■ END Game_BattlerBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    return this._createNetworkObserver();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (ANNetwork.isConnected()) {
      return this._updateDataObserver();
    }
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  //TODO: Вынести в KDCore или ACore
  // * Нахожусь ли Я в точке по диагонале (рядом), относительно char
  _.aaInDiagonalPointRelativeTo = function(char) {
    var e, x, y;
    try {
      if (char == null) {
        return false;
      }
      ({x, y} = char);
      if (x === this.x - 1 && ((y === this.y - 1) || (y === this.y + 1))) {
        return true; // * left up or down
      }
      if (x === this.x + 1 && (y === this.y - 1 || y === this.y + 1)) {
        return true; // * right up or down
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  (function() {    // * OBSERVER
    _._createNetworkObserver = function() {
      this.netDataObserver = new DataObserver();
      this.netDataObserver.setCheckInterval(ANET.PP.playerDataRefreshRate());
      this._fillNetworkObserver();
      return this.netDataObserver.refreshAll(this);
    };
    //TODO: Добавить API для разработчиков плагинов вносить свои поля (и так со всем Observers)
    // * Движение передаётся отдельным методом для достижения плавности
    _._fillNetworkObserver = function() {
      return this.netDataObserver.addFields(this, ["_opacity", "_blendMode", "_walkAnime", "_stepAnime", "_directionFix", "_transparent", "_direction"]);
    };
    _._updateDataObserver = function() {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.check(this);
      if (this.netDataObserver.isDataChanged()) {
        this.dataObserverHaveChanges();
        this.netDataObserver.refreshAll(this);
      }
    };
    // * Этот метод вызывается, когда изменились сихнронизируеммые данные
    _.dataObserverHaveChanges = function() {}; // * EMPTY (for childrens)
    _.getObserverDataForNetwork = function() {
      return this.netDataObserver.getDataForNetwork(this);
    };
    _.applyObserverData = function(data) {
      if (this.netDataObserver == null) {
        return;
      }
      this.netDataObserver.setDataFromNetwork(this, data);
    };
  })();
  _.moveStraightFromServer = function(moveData) {
    // * Всегда успех, так как если нет, то данные и не прийдут от другого игрока
    this.setMovementSuccess(true);
    this.setDirection(moveData.direction);
    this._x = moveData.x;
    this._y = moveData.y;
    this._realX = moveData.realX;
    this._realY = moveData.realY;
    // * Чтобы синхронизировать правильно бег
    this._moveSpeed = moveData.moveSpeed;
    this.increaseSteps();
  };
  _.getMoveDataForNetwork = function() {
    return {
      direction: this._direction,
      moveSpeed: this.realMoveSpeed(),
      x: this.x,
      y: this.y,
      realX: this._realX,
      realY: this._realY
    };
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Enemy.prototype;
  //TODO: Есть проблема, dead enemies не исчезают у второго игрока

  // * Дополнительные найстройки Observer для врагов
  _._addBattleFieldsToNetowrkDataObserver = function() {
    Game_Battler.prototype._addBattleFieldsToNetowrkDataObserver.call(this);
    // * Данные поля не нужны (наверное) врагам, так как не видно их полосу
    this.netDataObserver.removeFields(this, ["_tpbChargeTime"]);
  };
  // * Только мастер битвы может отправлять данные (вызывается из Scene_Battle)
  _.updateDataObserver = function() {
    if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
      this._updateDataObserver();
    }
  };
  _.dataObserverHaveChanges = function() {
    if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
      this.requestNetBattleDataPush();
    }
  };
  // * Добавляем свои поля
  _._fillNetworkObserver = function() {
    Game_Battler.prototype._fillNetworkObserver.call(this);
    this.netDataObserver.addFields(this, ANET.System.EnemyObserverFields);
  };
})();

// ■ END Game_Enemy.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  (function() {    // * Синхронизация движения
    // -----------------------------------------------------------------------
    var ALIAS__moveDiagonally, ALIAS__moveStraight, ALIAS__updateSelfMovement;
    //@[ALIAS]
    ALIAS__moveStraight = _.moveStraight;
    _.moveStraight = function(d) {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          // * Запоминаем предыдующие координаты (перед движением)
          this.___x = this.x;
          this.___y = this.y;
          // * Движение
          ALIAS__moveStraight.call(this, d);
          // * Если координаты сменились, значит персонаж
          // совершил движение, можно отправить на сервер
          if (this.___x !== this.x || this.___y !== this.y) {
            return ANMapManager.sendEventMove(this.eventId());
          }
        } else {

        }
      } else {
        // * SKIP MOVEMENT
        // * Движение событий выполняется только на мастере карты
        return ALIAS__moveStraight.call(this, d);
      }
    };
    
    //@[ALIAS]
    ALIAS__moveDiagonally = _.moveDiagonally;
    _.moveDiagonally = function(horz, vert) {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          // * Запоминаем предыдующие координаты (перед движением)
          this.___x = this.x;
          this.___y = this.y;
          // * Движение
          ALIAS__moveDiagonally.call(this, horz, vert);
          // * Если координаты сменились, значит персонаж
          // совершил движение, можно отправить на сервер
          if (this.___x !== this.x || this.___y !== this.y) {
            ANMapManager.sendEventMove(this.eventId());
          }
        } else {

        }
      } else {
        // * SKIP MOVEMENT
        // * Движение событий выполняется только на мастере карты
        ALIAS__moveDiagonally.call(this, horz, vert);
      }
    };
    //@[ALIAS]
    ALIAS__updateSelfMovement = _.updateSelfMovement;
    return _.updateSelfMovement = function() {
      if (ANNetwork.isConnected()) {
        if (ANGameManager.isMapMaster()) {
          return ALIAS__updateSelfMovement.call(this);
        } else {

        }
      } else {
        // * NOTHING
        // * Обновление движения события только на мастере карты
        return ALIAS__updateSelfMovement.call(this);
      }
    };
  })();
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.dataObserverHaveChanges = function() {
    if (ANGameManager.isMapMaster()) {
      ANSyncDataManager.sendEventObserver(this.eventId());
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------
// * Если мы не отправляем данные Observer,
// * то check не будет работать, пока не сбросить флаг

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Followers.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isSomeoneCollided, ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Followers.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function() {
    if (ANNetwork.isConnected()) {
      return this._data = [];
    } else {
      // * Нет последователей! Используется другой класс
      return ALIAS__setup.call(this);
    }
  };
  
  // * Учёт коллизий с сетевыми игроками при движении событий
  // * В этом методе, а не в NETCharactersGroup, чтобы было больше совместимости
  //@[ALIAS]
  ALIAS__isSomeoneCollided = _.isSomeoneCollided;
  _.isSomeoneCollided = function(x, y) {
    if (ANNetwork.isConnected()) {
      return $gameMap.netCharsIsSomeoneCollided(x, y);
    } else {
      return ALIAS__isSomeoneCollided.call(this, x, y);
    }
  };
})();

// ■ END Game_Followers.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  (function() {    // * Статус запуска события
    // -----------------------------------------------------------------------
    var ALIAS__clear, ALIAS__initialize, ALIAS__setup, ALIAS__update, ALIAS__updateWaitMode;
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(depth) {
      ALIAS__initialize.call(this, depth);
      this._nRunningCheckTimer = 0;
      // * Отключаем некоторые команды
      if (ANNetwork.isConnected()) {
        this.nDisableNotNetCommands();
      }
    };
    //@[ALIAS]
    ALIAS__setup = _.setup;
    _.setup = function(list, eventId) {
      ALIAS__setup.call(this, list, eventId);
      if (ANNetwork.isConnected()) {
        // * Сброс сетевой битвы, если началось другое событие
        BattleManager.nSetNetworkBattle(null);
        this.nCheckEventStartOptions();
        if (!this.isPassStartOptions()) { // * Проверка опций запуска события
          this._list = []; // * Не будет выполняться
        } else {
          ANInterpreterManager.sendEventStarted(eventId);
          if (this.nIsEventIsShared()) {
            this.nPrepareSharedEvent();
          }
          this.nClearFlags();
        }
      }
    };
    
    //@[ALIAS]
    ALIAS__clear = _.clear;
    _.clear = function() {
      ALIAS__clear.call(this);
      if (ANNetwork.isConnected()) {
        ANInterpreterManager.eventProcessExit();
        this.nClearFlags();
      }
    };
    //@[ALIAS]
    ALIAS__update = _.update;
    _.update = function() {
      ALIAS__update.call(this);
      if (ANNetwork.isConnected()) {
        this._nRunningCheckTimer++;
        if (this._nRunningCheckTimer >= 60) {
          ANInterpreterManager.checkEventRunning();
          this._nRunningCheckTimer = 0;
        }
      }
    };
    //@[ALIAS]
    ALIAS__updateWaitMode = _.updateWaitMode;
    return _.updateWaitMode = function() {
      if (this._waitMode === 'netPlayersPool') {
        return this.nUpdateWaitPlayersPool();
      } else if (this._waitMode === 'netNextCommand') {
        return this.nUpdateWaitServerNextCommandPermission();
      } else {
        return ALIAS__updateWaitMode.call(this);
      }
    };
  })();
  (function() {    // * Выполнение команд в сети
    // -----------------------------------------------------------------------
    var ALIAS__command108;
    //@[ALIAS, STORED]
    _.ALIAS__executeCommand = _.executeCommand;
    _.executeCommand = function() {
      if (ANNetwork.isConnected()) {
        if (this.nIsOptionsForCurrentCommand()) {
          return this.nProcessCommandWithOptions();
        }
      }
      return _.ALIAS__executeCommand.call(this);
    };
    //TODO: MV
    //@[ALIAS]
    ALIAS__command108 = _.command108;
    return _.command108 = function(params) {
      if (ANNetwork.isConnected()) {
        if (KDCore.isMV()) {
          params = this._params;
        }
        // * Проверить комментарий на наличие NET команд
        this._nCheckNetComment(params[0]);
      }
      return ALIAS__command108.call(this, params);
    };
  })();
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x1069=['start','yWkCJ','System','173483ngyDbm','_nSendCommandToServer','true','nCheckEventStartOptionsFromCommentCommand','find','fjFFQ','nIsLockedEvent','1905894ggpiVb','isMyActorInValidListToStart','isEventStartedByAny','biUha','Utils','nIsEventIsShared','_nCheckNetComment','whoSelector','nIsHaveCommandOptions','nSetCommandOptions','pRXwr','1kbsgjQ','warn','BETiP','localActor','choicesForMaster','actorList','vdkrN','isMasterClient','Actor\x20List\x20Except','_nProcessCommandNotMe','5hKIryc','BRBrG','Actor\x20List','!me','nDisableNotNetCommands','any','_nProcessCommandForMaster','forActors','Me\x20Except','_nProcessCommandForActorsList','TSxnj','command','pgjJo','chfwj','376365MPxtzR','_nSkipCommand','eventId','!master','ALIAS__executeCommand','_list','isSharedEventIsRunning','IgmlA','1565ThukCW','yPVjS','code','Master','isHaveNetworkStartOptions','nSetNetworkBattle','UfSQv','!forActors','_index','_nOnNetCommand_SingleSelectorEventCommand','ajkBD','contains','nStartOptions','DCvNm','brCkl','_nLocalActorMode','eUkiD','nRequestMasterOnlyChoicesModeForNextChoice','_nProcessCommandForAll','EventStartOptions','75407fzEDpX','MiRnU','Vesxo','ForbiddenVirtualCommandsList','_nOnNetCommand_ActorListSelectorEventCommand','_nRunningCheckTimer','LYXJX','hPhpo','isPassStartOptions','length','call','prototype','All','eikXA','getNetCommentCommand','ibgbp','QbBMC','parameters','XSNkY','isPassEventFilterOptions','ersrO','N\x20choicesForMaster\x20can\x20be\x20used\x20only\x20in\x20Shared\x20Events','nMalU','583660XLmqkZ','_nOnNetCommand_LocalActor','nSetSharedBattle','nIsOptionsForCurrentCommand','nCommandStartOptions','lockMode','nClearCommandOptions','53776UQwUrL','currentCommand','EiLOn','Master\x20Except','229euoVXR','_nCommandOptionsRequested','sendEventVirtualCommand'];function a0_0x18d3(_0x409603,_0x486beb){_0x409603=_0x409603-0xdf;var _0x106991=a0_0x1069[_0x409603];return _0x106991;}(function(_0x45934e,_0x1734b8){var _0x1af4ae=a0_0x18d3;while(!![]){try{var _0x3bf8f6=-parseInt(_0x1af4ae(0xef))*parseInt(_0x1af4ae(0x125))+-parseInt(_0x1af4ae(0x103))+-parseInt(_0x1af4ae(0x11a))+parseInt(_0x1af4ae(0x13d))*parseInt(_0x1af4ae(0xe7))+parseInt(_0x1af4ae(0x121))+-parseInt(_0x1af4ae(0x12b))*parseInt(_0x1af4ae(0x147))+parseInt(_0x1af4ae(0x132));if(_0x3bf8f6===_0x1734b8)break;else _0x45934e['push'](_0x45934e['shift']());}catch(_0x4ebc05){_0x45934e['push'](_0x45934e['shift']());}}}(a0_0x1069,0x6e260),function(){var _0x9ce0cd=a0_0x18d3,_0x5983f1;_0x5983f1=Game_Interpreter[_0x9ce0cd(0x10e)],_0x5983f1[_0x9ce0cd(0x14b)]=function(){var _0x61daca=_0x9ce0cd;if(_0x61daca(0xf5)===_0x61daca(0xe5)){function _0x64810f(){return![];}}else{var _0x308236,_0x207972,_0x267a01,_0x12a8b5,_0x4bffe1;_0x207972=function(){var _0x49993b=_0x61daca;return _0x5983f1[_0x49993b(0xe4)+_0x308236]=function(){return!![];};},_0x4bffe1=[0x81,0xca,0xce,0xd8,0xd9,0x89];for(_0x267a01=0x0,_0x12a8b5=_0x4bffe1[_0x61daca(0x10c)];_0x267a01<_0x12a8b5;_0x267a01++){_0x308236=_0x4bffe1[_0x267a01],_0x207972(_0x308236);}}},_0x5983f1[_0x9ce0cd(0x13a)]=function(){var _0x62d2ce=_0x9ce0cd;if(_0x62d2ce(0x105)!==_0x62d2ce(0x105)){function _0x235f26(){return![];}}else return this[_0x62d2ce(0x126)]===!![]&&this['nCommandStartOptions']!=null;},_0x5983f1[_0x9ce0cd(0x120)]=function(){var _0x26d891=_0x9ce0cd;if(_0x26d891(0x110)===_0x26d891(0x112)){function _0x263cd2(){var _0x174278=_0x26d891;return _0x25bf57[_0x174278(0xeb)][_0x174278(0x10d)](this);}}else return this[_0x26d891(0x126)]=![],this[_0x26d891(0x11e)]=null;},_0x5983f1[_0x9ce0cd(0x13b)]=function(_0x15573e){var _0x4e19d3=_0x9ce0cd;if(_0x4e19d3(0xfc)!==_0x4e19d3(0x148))return this[_0x4e19d3(0x11e)]=_0x15573e,this['_nCommandOptionsRequested']=!![];else{function _0x55f9c6(){var _0x4215bd=_0x4e19d3;!_0x4ef952[_0x4215bd(0x14c)](_0x40071e)&&(_0x21d1b3=null),_0x5a9f81[_0x4215bd(0xf4)](_0x22fd76);}}},_0x5983f1[_0x9ce0cd(0x11d)]=function(){var _0x4fcd6f=_0x9ce0cd;if(!this['nIsHaveCommandOptions']()){if(_0x4fcd6f(0x143)!==_0x4fcd6f(0x143)){function _0x39b9e8(){var _0x20f66c=_0x4fcd6f,_0x55cd14;try{this[_0x20f66c(0x126)]=![];switch(this['nCommandStartOptions'][_0x20f66c(0x139)]){case'All':return this[_0x20f66c(0x101)]();case _0x20f66c(0xf2):return this['_nProcessCommandForMaster'](!![]);case _0x20f66c(0x124):return this[_0x20f66c(0xdf)](![]);case _0x20f66c(0x149):return this[_0x20f66c(0xe2)](!![]);case _0x20f66c(0x145):return this[_0x20f66c(0xe2)](![]);case'Me\x20Except':return this[_0x20f66c(0x146)]();}}catch(_0x149a7b){_0x55cd14=_0x149a7b,_0x250d25['w'](_0x55cd14);}return _0x511b63[_0x20f66c(0xeb)][_0x20f66c(0x10d)](this);}}else return![];}if(ANET[_0x4fcd6f(0x12a)][_0x4fcd6f(0x106)][_0x4fcd6f(0xfa)](this[_0x4fcd6f(0x122)]()[_0x4fcd6f(0xf1)])){if(_0x4fcd6f(0x135)==='biUha')return![];else{function _0x4103cb(){var _0x26fc4f=_0x4fcd6f;return _0xe4720e[_0x26fc4f(0xeb)][_0x26fc4f(0x10d)](this);}}}return!![];},_0x5983f1['nProcessCommandWithOptions']=function(){var _0x58302a=_0x9ce0cd,_0x2fabc1;try{this[_0x58302a(0x126)]=![];switch(this['nCommandStartOptions'][_0x58302a(0x139)]){case _0x58302a(0x10f):return this['_nProcessCommandForAll']();case _0x58302a(0xf2):return this[_0x58302a(0xdf)](!![]);case _0x58302a(0x124):return this['_nProcessCommandForMaster'](![]);case _0x58302a(0x149):return this[_0x58302a(0xe2)](!![]);case _0x58302a(0x145):return this['_nProcessCommandForActorsList'](![]);case _0x58302a(0xe1):return this['_nProcessCommandNotMe']();}}catch(_0xb8d14b){_0x2fabc1=_0xb8d14b,ANET['w'](_0x2fabc1);}return _0x5983f1['ALIAS__executeCommand'][_0x58302a(0x10d)](this);},_0x5983f1[_0x9ce0cd(0x101)]=function(){var _0x169a92=_0x9ce0cd;if('HesIH'!=='HesIH'){function _0x3a46ff(){var _0x3988b4=a0_0x18d3;return this[_0x3988b4(0xf7)]++,this[_0x3988b4(0x120)](),!![];}}else return this[_0x169a92(0x12c)](),_0x5983f1['ALIAS__executeCommand'][_0x169a92(0x10d)](this);},_0x5983f1['_nProcessCommandForMaster']=function(_0x440a9a){var _0x3d3b72=_0x9ce0cd;if(_0x3d3b72(0x130)===_0x3d3b72(0x123)){function _0x2d11e7(){return;}}else{if(ANNetwork[_0x3d3b72(0x144)]()===_0x440a9a){if(_0x3d3b72(0x129)!==_0x3d3b72(0x129)){function _0x3791b2(){this['nStartOptions']=_0xc68b29['parameters'][0x3];}}else return _0x5983f1['ALIAS__executeCommand'][_0x3d3b72(0x10d)](this);}else{if('UKQEo'==='UKQEo')return this[_0x3d3b72(0x12c)](),this[_0x3d3b72(0xe8)]();else{function _0x5b3d4b(){var _0x26c1df=_0x3d3b72;return _0x2e450d[_0x26c1df(0x144)]()===_0x1c0942?_0x417096[_0x26c1df(0xeb)][_0x26c1df(0x10d)](this):(this[_0x26c1df(0x12c)](),this[_0x26c1df(0xe8)]());}}}}},_0x5983f1['_nProcessCommandForActorsList']=function(_0x42b141){var _0x290690=_0x9ce0cd;return this[_0x290690(0x12c)](),ANET[_0x290690(0x136)][_0x290690(0x133)](this[_0x290690(0x11e)][_0x290690(0x142)],_0x42b141)?_0x5983f1[_0x290690(0xeb)][_0x290690(0x10d)](this):this[_0x290690(0xe8)]();},_0x5983f1[_0x9ce0cd(0x146)]=function(){var _0x5ecc7c=_0x9ce0cd;return this[_0x5ecc7c(0x12c)](),this[_0x5ecc7c(0xe8)]();},_0x5983f1[_0x9ce0cd(0xe8)]=function(){var _0x1fb044=_0x9ce0cd;return this[_0x1fb044(0xf7)]++,this[_0x1fb044(0x120)](),!![];},_0x5983f1['_nSendCommandToServer']=function(){var _0x5f5adf=_0x9ce0cd;ANInterpreterManager[_0x5f5adf(0x127)](this[_0x5f5adf(0x122)](),this[_0x5f5adf(0x11e)],this['eventId']());},_0x5983f1[_0x9ce0cd(0x138)]=function(_0x1f4f7a){var _0x43f189=_0x9ce0cd,_0x23279e;_0x23279e=ANET[_0x43f189(0x136)][_0x43f189(0x111)](_0x1f4f7a);if(!String[_0x43f189(0x14c)](_0x23279e)){if(_0x43f189(0xff)==='eUkiD')return;else{function _0x5e2e51(){return![];}}}switch(_0x23279e){case _0x43f189(0x140):this[_0x43f189(0x11b)](_0x1f4f7a);break;case'all':this['_nOnNetCommand_SingleSelectorEventCommand'](_0x43f189(0x10f),_0x1f4f7a);break;case _0x43f189(0x14a):this[_0x43f189(0xf8)](_0x43f189(0xe1),_0x1f4f7a);break;case'master':this[_0x43f189(0xf8)]('Master',_0x1f4f7a);break;case _0x43f189(0xea):this[_0x43f189(0xf8)](_0x43f189(0x124),_0x1f4f7a);break;case _0x43f189(0xe0):this[_0x43f189(0x107)](_0x1f4f7a,!![]);break;case _0x43f189(0xf6):this[_0x43f189(0x107)](_0x1f4f7a,![]);break;case'wait':if(ANInterpreterManager[_0x43f189(0xed)]()){if(_0x43f189(0xe3)===_0x43f189(0x115)){function _0x39c2ca(){var _0x15e744=_0x43f189;return this[_0x15e744(0xe8)]();}}else this['nRequestSyncedNextEventCommand']();}else{if(_0x43f189(0x13f)===_0x43f189(0x13f))console[_0x43f189(0x13e)]('N\x20wait\x20can\x20be\x20used\x20only\x20in\x20Shared\x20Events');else{function _0x490a64(){var _0x39b5f1=_0x43f189;if(!this[_0x39b5f1(0xf3)]())return!![];if(this['nIsLockedEvent']()){if(_0x1c1afc[_0x39b5f1(0x136)][_0x39b5f1(0x134)](this[_0x39b5f1(0xe9)]()))return![];}return _0x551bc8['Utils'][_0x39b5f1(0x116)](this[_0x39b5f1(0xfb)]);}}}break;case _0x43f189(0x141):ANInterpreterManager[_0x43f189(0xed)]()?this[_0x43f189(0x100)]():console['warn'](_0x43f189(0x118));break;case _0x43f189(0x128):break;default:console[_0x43f189(0x13e)]('Unknown\x20NET\x20Comment\x20command\x20'+_0x23279e);}},_0x5983f1[_0x9ce0cd(0x11c)]=function(_0x4f0c59){var _0x22046e=_0x9ce0cd;if(!String[_0x22046e(0x14c)](_0x4f0c59)){if(_0x22046e(0xfd)!==_0x22046e(0x10a))_0x4f0c59=null;else{function _0x403fa3(){var _0x110051=_0x22046e;return this[_0x110051(0x126)]=![],this[_0x110051(0x11e)]=null;}}}BattleManager['nSetNetworkBattle'](_0x4f0c59);},_0x5983f1['nClearFlags']=function(){var _0x28305b=_0x9ce0cd;$gameTemp[_0x28305b(0xfe)]=![],this['_nRunningCheckTimer']=0x0,this['nClearCommandOptions']();},function(){var _0x50f2dd=_0x9ce0cd;if('nMalU'!==_0x50f2dd(0x119)){function _0x24a8bb(){_0x17ecff=_0x13d1e8[_0x3dceab],_0x5cfbbf(_0x5cff27);}}else return _0x5983f1[_0x50f2dd(0xf3)]=function(){var _0x5835bc=_0x50f2dd;if('SuwEF'==='SuwEF')return this[_0x5835bc(0xfb)]!=null;else{function _0x1acd70(){var _0x186c86=_0x5835bc;return _0x178e21[_0x186c86(0xe4)+_0x1aaaed]=function(){return!![];};}}},_0x5983f1[_0x50f2dd(0x10b)]=function(){var _0x358e1f=_0x50f2dd;if(this[_0x358e1f(0x137)]()&&$gameTemp['_nSharedEventOuterStartFlag']===!![]){if(_0x358e1f(0x113)!==_0x358e1f(0x13c))return!![];else{function _0x570226(){var _0x5939d2=_0x358e1f;return this[_0x5939d2(0x11e)]=_0x1553a3,this['_nCommandOptionsRequested']=!![];}}}else{if(!this['isHaveNetworkStartOptions']())return!![];if(this[_0x358e1f(0x131)]()){if(ANET['Utils'][_0x358e1f(0x134)](this['eventId']())){if(_0x358e1f(0xee)===_0x358e1f(0xf9)){function _0x23cc78(){_0x123597=_0x5085d6,_0x3884ec['w'](_0x6efa80),this['nStartOptions']=null;}}else return![];}}return ANET[_0x358e1f(0x136)][_0x358e1f(0x116)](this['nStartOptions']);}},_0x5983f1[_0x50f2dd(0x131)]=function(){var _0x42b990=_0x50f2dd,_0x3f91c2;return this[_0x42b990(0xe9)]()>0x0&&((_0x3f91c2=this[_0x42b990(0xfb)])!=null?_0x3f91c2[_0x42b990(0x11f)]:void 0x0)===_0x42b990(0x12d);},_0x5983f1['nCheckEventStartOptions']=function(){var _0x438ced=_0x50f2dd,_0x184755,_0xa2fd4c,_0xf79ab1;this['nStartOptions']=null;try{if('ersrO'!==_0x438ced(0x117)){function _0x466a46(){var _0x389c7d=_0x438ced;return this[_0x389c7d(0x12c)](),this[_0x389c7d(0xe8)]();}}else{_0xa2fd4c=(_0xf79ab1=this[_0x438ced(0xec)])!=null?_0xf79ab1[_0x438ced(0x12f)](function(_0x273e18){var _0x41af3f=_0x438ced;if(_0x41af3f(0x109)===_0x41af3f(0x109)){var _0x26cd5b;return _0x273e18[_0x41af3f(0xf1)]===0x165&&((_0x26cd5b=_0x273e18['parameters'])!=null?_0x26cd5b[0x1]:void 0x0)===_0x41af3f(0x102);}else{function _0x59287d(){var _0x52fa8f=_0x41af3f;return this['_nCommandOptionsRequested']===!![]&&this[_0x52fa8f(0x11e)]!=null;}}}):void 0x0;if(_0xa2fd4c!=null)this[_0x438ced(0xfb)]=_0xa2fd4c[_0x438ced(0x114)][0x3];else{if(_0x438ced(0xe6)!==_0x438ced(0xe6)){function _0x7fd797(){var _0x41ca23=_0x438ced;this[_0x41ca23(0x100)]();}}else this[_0x438ced(0x12e)]();}}}catch(_0x1c0bf5){if(_0x438ced(0xf0)===_0x438ced(0x104)){function _0x25aef9(){var _0x539934=_0x438ced;_0x4ea45d['_nLocalActorMode']=![],this[_0x539934(0x108)]=0x0,this[_0x539934(0x120)]();}}else _0x184755=_0x1c0bf5,ANET['w'](_0x184755),this[_0x438ced(0xfb)]=null;}};}();}());
})();

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  // * Обработка комманд из комментариев (алтернатива командам плагинов)

  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //input: "N localActor" | "N localActor end"
  _._nOnNetCommand_LocalActor = function(commentLine) {
    if (commentLine.contains("end")) {
      $gameTemp._nLocalActorMode = false;
    } else {
      $gameTemp._nLocalActorMode = true;
    }
  };
  
  //input: "N (selector)" | "N (selector) [scope]" | "N (selector) [scope] [mode]"
  //selcetor: all, !me, master, !master
  //scope: world, mode: virtual
  _._nOnNetCommand_SingleSelectorEventCommand = function(selector, commentLine) {
    var mode, scope;
    ({scope, mode} = ANET.Utils.convertEventCommandScopeAndMode(commentLine));
    this._nSetAnyEventCommandOptions(selector, "[]", scope, mode);
  };
  // * Установить опции команды события для следующей комманды
  _._nSetAnyEventCommandOptions = function(selector, list, scope, mode) {
    var options;
    if (!String.any(scope)) {
      // * Стандартные значения из команды плагина
      scope = "Same map";
    }
    if (!String.any(mode)) {
      mode = "Auto";
    }
    options = ANET.Utils.buildEventCommandOptions(selector, list, scope, mode);
    this.nSetCommandOptions(options);
  };
  _._nOnNetCommand_ActorListSelectorEventCommand = function(commentLine, isInclude) {
    var list, mode, scope, selector;
    ({scope, mode} = ANET.Utils.convertEventCommandScopeAndMode(commentLine));
    list = ANET.Utils.extractActorsListFromComment(commentLine);
    selector = "Actor List";
    if (!isInclude) {
      selector += " Except";
    }
    this._nSetAnyEventCommandOptions(selector, list, scope, mode);
  };
  // * Есть ли опции (условия) запуска события для сети (проверка команды - комментария)
  _.nCheckEventStartOptionsFromCommentCommand = function() {
    var commentLine;
    if (this._list == null) {
      return;
    }
    commentLine = KDCore.Utils.getEventCommentValue("N start", this._list);
    if (commentLine == null) {
      return;
    }
    this.nStartOptions = ANET.Utils.parseEventStartOptionsFromCommentLine(commentLine);
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x128f=['clear','pGSav','27POzzxl','nStartOptions','sendSharedEventRegisteredDone','reset','netNextCommand','nRequireChoiceOnlyForMaster','lqlkE','2060448Gcgnxo','nIsEventIsShared','netPlayersPool','isReady','_waitMode','CAN\x20PROCESS\x20TO\x20NEXT\x20COMMAND','nIsSharedEventCanBeForceCancelled','prototype','STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20CANCELED!','nAllowContinueSharedEvent','_index','resetSharedEvent','nRequestSyncedNextEventCommand','isSinglePool','nOnSyncedEventCommandResponse','isCancel','nPrepareSharedEvent','qqIyj','32099xQYOVF','nPlayerPool','nClearSharedSyncEventCommandWait','nSetWaitStartNextCommandFromServer','_nSharedEventOuterStartFlag','IqslO','forceCancelSharedEvent','1236Eiocyy','Strict','nnoOt','IeagH','terminate','sendSharedEventReadyToContinue','eIukD','_nRepeatAnswerToServerTimer','STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20READY','nSyncWaitCommandData','_canContinueSharedEvent','OUUTER\x20START','nIsEventIsSharedAndStrict','lIdbI','535gpSWfy','setupSharedInterpreter','qXbMk','uxsmT','onAnswer','sharedMode','348676RGQEVR','contains','indent','1104549OVvYVg','EKOBq','index','register','_eventId','kkwOg','nSetWaitPlayerPool','showWaitPlayersOnSharedEvent','1oMEnGO','1OXfzXg','WpYNo','_shouldForceExitSharedEvent','854482UgrJjM','nRequestMasterOnlyChoicesModeForNextChoice','UqCuK','PREPARE\x20SHARED\x20MOD','_indent','nUpdateWaitServerNextCommandPermission','WAIT\x20SERVER\x20FOR\x20NEXT\x20COMMAND','hideWaitPlayersOnSharedEvent','isSharedEventMaster','IONBr','START\x20POOL','nIsSharedEventWaitPoolCancelled','LFEai','PLAYER\x20ANSWER\x20','65915gwOBjq'];function a0_0x27d1(_0x14ea63,_0x3f691d){_0x14ea63=_0x14ea63-0x19e;var _0x128f37=a0_0x128f[_0x14ea63];return _0x128f37;}(function(_0x400f7e,_0x4aa5e9){var _0x146c21=a0_0x27d1;while(!![]){try{var _0x464c93=parseInt(_0x146c21(0x1cb))*parseInt(_0x146c21(0x1c7))+-parseInt(_0x146c21(0x1bf))+parseInt(_0x146c21(0x1a1))*-parseInt(_0x146c21(0x1dc))+-parseInt(_0x146c21(0x1d9))+-parseInt(_0x146c21(0x1bc))*-parseInt(_0x146c21(0x1c8))+-parseInt(_0x146c21(0x1b6))*parseInt(_0x146c21(0x1a8))+parseInt(_0x146c21(0x1e3));if(_0x464c93===_0x4aa5e9)break;else _0x400f7e['push'](_0x400f7e['shift']());}catch(_0x27899a){_0x400f7e['push'](_0x400f7e['shift']());}}}(a0_0x128f,0x89fd9),function(){var _0x26dc85=a0_0x27d1,_0x2786c9;_0x2786c9=Game_Interpreter[_0x26dc85(0x1ea)],_0x2786c9[_0x26dc85(0x1e4)]=function(){var _0x4c7dff=_0x26dc85,_0x2ed082;try{return this['isHaveNetworkStartOptions']()&&this[_0x4c7dff(0x1dd)][_0x4c7dff(0x1bb)]!=='No';}catch(_0x4ab5e5){return _0x2ed082=_0x4ab5e5,ANET['w'](_0x2ed082),![];}},_0x2786c9[_0x26dc85(0x1b4)]=function(){var _0x2d45bc=_0x26dc85,_0x40ba5f,_0x230a65;try{if(_0x2d45bc(0x1c0)!=='EKOBq'){function _0x55c9dc(){var _0x585782=_0x2d45bc;this[_0x585782(0x1a2)]=null,_0x5e96c6[_0x585782(0x1b7)](this,!![]),this[_0x585782(0x1ef)]();}}else return this[_0x2d45bc(0x1e4)]()&&((_0x230a65=this[_0x2d45bc(0x1dd)][_0x2d45bc(0x1bb)])!=null?_0x230a65[_0x2d45bc(0x1bd)](_0x2d45bc(0x1a9)):void 0x0);}catch(_0x17e547){if('Dndxg'==='Dndxg')return _0x40ba5f=_0x17e547,ANET['w'](_0x40ba5f),![];else{function _0x5b96b3(){var _0x347228=_0x2d45bc;_0x58e25f[_0x347228(0x1ee)](),_0x347228(0x1ce)['p'](this[_0x347228(0x1c3)]),_0x11a97b[_0x347228(0x1a5)]==null?(this[_0x347228(0x1a2)]=null,_0x5025aa['setupSharedInterpreter'](this,!![]),this[_0x347228(0x1ef)]()):(_0x347228(0x1b3)['p'](),_0x2f4a6d[_0x347228(0x1a5)]=null,_0x1cb5bf[_0x347228(0x1b7)](this,![]),this[_0x347228(0x1ef)]());}}}},_0x2786c9[_0x26dc85(0x1e9)]=function(){var _0x445260=_0x26dc85;return!this[_0x445260(0x1b4)]()&&this['nSyncWaitCommandData']['index']===0x0;},_0x2786c9[_0x26dc85(0x19f)]=function(){var _0x2f9089=_0x26dc85;if('cpBZh'!=='cpBZh'){function _0x166333(){return;}}else ANInterpreterManager[_0x2f9089(0x1ee)](),_0x2f9089(0x1ce)['p'](this[_0x2f9089(0x1c3)]),$gameTemp[_0x2f9089(0x1a5)]==null?(this[_0x2f9089(0x1a2)]=null,ANInterpreterManager[_0x2f9089(0x1b7)](this,!![]),this[_0x2f9089(0x1ef)]()):(_0x2f9089(0x1b3)['p'](),$gameTemp[_0x2f9089(0x1a5)]=null,ANInterpreterManager[_0x2f9089(0x1b7)](this,![]),this[_0x2f9089(0x1ef)]());},_0x2786c9['nIsSharedEventWaitPoolCancelled']=function(){var _0x2215ff=_0x26dc85;if(_0x2215ff(0x1b8)!==_0x2215ff(0x1b8)){function _0x421440(){var _0x3736d1=_0x2215ff;_0x3736d1(0x1d5)['p'](),this[_0x3736d1(0x1a2)]==null?this['nPlayerPool']=new _0x209608():this[_0x3736d1(0x1a2)][_0x3736d1(0x1df)](),this['nPlayerPool'][_0x3736d1(0x1c2)](),this['_waitMode']=_0x3736d1(0x1e5);}}else{var _0x500509;try{if(!this['nIsSharedEventCanBeForceCancelled']()){if(_0x2215ff(0x1aa)!==_0x2215ff(0x1aa)){function _0x1837d8(){var _0x45cca3=_0x2215ff;return this[_0x45cca3(0x1ac)](),!![];}}else return;}if(Input[_0x2215ff(0x19e)]())return Input[_0x2215ff(0x1da)](),ANInterpreterManager[_0x2215ff(0x1a7)](),this[_0x2215ff(0x1ac)](),!![];}catch(_0x54cbb4){_0x500509=_0x54cbb4,ANET['w'](_0x500509);}return![];}},_0x2786c9['nRequestSyncedNextEventCommand']=function(){var _0x53572e=_0x26dc85;this['nSyncWaitCommandData']={'index':this[_0x53572e(0x1ed)],'indent':this[_0x53572e(0x1cf)]};if(ANInterpreterManager[_0x53572e(0x1d3)]()){if(_0x53572e(0x1cd)===_0x53572e(0x1cd))this['nSetWaitPlayerPool']();else{function _0x46ef45(){return;}}}else this['nSetWaitStartNextCommandFromServer']();ANInterpreterManager[_0x53572e(0x1c6)]();},_0x2786c9[_0x26dc85(0x1f1)]=function(_0x2de0d5,_0x1ad6ec,_0x3e2b9f){var _0x54d4bf=_0x26dc85;if('IqslO'===_0x54d4bf(0x1a6)){var _0xfbef70;try{if(_0x54d4bf(0x1b5)!==_0x54d4bf(0x1ab)){if(this['nSyncWaitCommandData']==null)return;if(this[_0x54d4bf(0x1a2)]==null){if(_0x54d4bf(0x1d7)!=='laRKR')return;else{function _0x54f35e(){var _0x4909e6=_0x54d4bf;if(this[_0x4909e6(0x1a2)]!=null&&this[_0x4909e6(0x1a2)]['isSinglePool']())return;'Shared\x20Event\x20Choices\x20in\x20Master\x20only\x20mode'['p'](),_0x4a407c[_0x4909e6(0x1e1)]=!![];}}}if(this[_0x54d4bf(0x1b1)][_0x54d4bf(0x1c1)]===_0x2de0d5&&this[_0x54d4bf(0x1b1)][_0x54d4bf(0x1be)]===_0x1ad6ec)return _0x54d4bf(0x1d8)['p'](_0x3e2b9f),this[_0x54d4bf(0x1a2)]['onAnswer'](_0x3e2b9f);}else{function _0x2e5fb4(){var _0x123140=_0x54d4bf;this[_0x123140(0x1b2)]=![],_0x4934ef['sendSharedEventRegisteredDone'](),_0x123140(0x1d1)['p'](),this[_0x123140(0x1af)]=0x3c,this[_0x123140(0x1e7)]=_0x123140(0x1e0);}}}catch(_0x353b48){_0xfbef70=_0x353b48,ANET['w'](_0xfbef70);}}else{function _0x2fabf2(){var _0x446375=_0x54d4bf;if(this['_waitMode']!=='netNextCommand')return;this[_0x446375(0x1b2)]=!![],this[_0x446375(0x1af)]=-0x1,_0x612e36[_0x446375(0x1d2)]();}}},_0x2786c9[_0x26dc85(0x1c5)]=function(){var _0xb9ac8e=_0x26dc85;if('gyeZa'!=='gyeZa'){function _0xba14fa(){var _0x306a7a=a0_0x27d1;if(!this[_0x306a7a(0x1e9)]())return;if(_0x2753b8[_0x306a7a(0x19e)]())return _0x26c383[_0x306a7a(0x1da)](),_0x3e1781[_0x306a7a(0x1a7)](),this[_0x306a7a(0x1ac)](),!![];}}else _0xb9ac8e(0x1d5)['p'](),this[_0xb9ac8e(0x1a2)]==null?this[_0xb9ac8e(0x1a2)]=new PlayersWaitPool():this[_0xb9ac8e(0x1a2)][_0xb9ac8e(0x1df)](),this['nPlayerPool']['register'](),this[_0xb9ac8e(0x1e7)]=_0xb9ac8e(0x1e5);},_0x2786c9['nUpdateWaitPlayersPool']=function(){var _0x54921=_0x26dc85;if(_0x54921(0x1c4)==='EZbha'){function _0x2e6f97(){this['nSetWaitStartNextCommandFromServer']();}}else{var _0x4a4e04;this[_0x54921(0x1a2)]['update']();if(this[_0x54921(0x1d6)]())return'STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20CANCELED!'['p'](),!![];return _0x4a4e04=!this[_0x54921(0x1a2)][_0x54921(0x1e6)](),!_0x4a4e04&&(_0x54921(0x1b0)['p'](),ANInterpreterManager['sendSharedEventReadyToContinue'](),ANInterpreterManager[_0x54921(0x1d2)](),this[_0x54921(0x1a3)](),this['_waitMode']=''),_0x4a4e04;}},_0x2786c9[_0x26dc85(0x1a3)]=function(){var _0x51a2fc=_0x26dc85;this[_0x51a2fc(0x1b1)]=null;},_0x2786c9[_0x26dc85(0x1a4)]=function(){var _0x24e1b3=_0x26dc85;this['_canContinueSharedEvent']=![],ANInterpreterManager[_0x24e1b3(0x1de)](),'WAIT\x20SERVER\x20FOR\x20NEXT\x20COMMAND'['p'](),this[_0x24e1b3(0x1af)]=0x3c,this[_0x24e1b3(0x1e7)]=_0x24e1b3(0x1e0);},_0x2786c9[_0x26dc85(0x1d0)]=function(){var _0x3d67ec=_0x26dc85;if(_0x3d67ec(0x1c9)===_0x3d67ec(0x1c9)){var _0x4f65c2;if($gameTemp[_0x3d67ec(0x1ca)]===!![]){if(_0x3d67ec(0x1d4)===_0x3d67ec(0x1e2)){function _0x5b378c(){var _0x1d3201=_0x3d67ec;return _0x1d3201(0x1d8)['p'](_0x5677dd),this[_0x1d3201(0x1a2)][_0x1d3201(0x1ba)](_0x44cf6a);}}else return this[_0x3d67ec(0x1ac)](),!![];}return _0x4f65c2=!this[_0x3d67ec(0x1b2)],!_0x4f65c2?(_0x3d67ec(0x1e8)['p'](),this['_waitMode']=''):this[_0x3d67ec(0x1af)]>=0x0&&(this[_0x3d67ec(0x1af)]--,this[_0x3d67ec(0x1af)]===0x0&&this[_0x3d67ec(0x1a4)]()),!![];}else{function _0x3d45a3(){var _0x47c1bf=_0x3d67ec;'STOP\x20WAITING\x20PLAYERS\x20:\x20IS\x20READY'['p'](),_0x25cdc1[_0x47c1bf(0x1ad)](),_0x2607f2[_0x47c1bf(0x1d2)](),this[_0x47c1bf(0x1a3)](),this[_0x47c1bf(0x1e7)]='';}}},_0x2786c9[_0x26dc85(0x1ec)]=function(){var _0x3a1e46=_0x26dc85;if(_0x3a1e46(0x1b9)===_0x3a1e46(0x1a0)){function _0x3877bb(){var _0x518253=_0x3a1e46;return _0x518253(0x1eb)['p'](),!![];}}else{if(this['_waitMode']!=='netNextCommand')return;this[_0x3a1e46(0x1b2)]=!![],this[_0x3a1e46(0x1af)]=-0x1,ANInterpreterManager[_0x3a1e46(0x1d2)]();}},_0x2786c9[_0x26dc85(0x1cc)]=function(){var _0x3b342e=_0x26dc85;if(this['nPlayerPool']!=null&&this[_0x3b342e(0x1a2)][_0x3b342e(0x1f0)]()){if(_0x3b342e(0x1db)===_0x3b342e(0x1ae)){function _0x50340f(){var _0x361dc3=_0x3b342e;return _0x138105[_0x361dc3(0x1da)](),_0x14c138[_0x361dc3(0x1a7)](),this[_0x361dc3(0x1ac)](),!![];}}else return;}'Shared\x20Event\x20Choices\x20in\x20Master\x20only\x20mode'['p'](),$gameTemp[_0x3b342e(0x1e1)]=!![];};}());
})();

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__refresh, ALIAS__setup, ALIAS__setupStartingEvent, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this._networkCharacters = new NETCharactersGroup();
  };
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    ALIAS__setup.call(this, mapId);
    if (ANNetwork.isConnected()) {
      // * Клиент переходит на новую карту
      ANGameManager.onNewGameMapSetup();
      this.setupNetworkCharacters();
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (ANNetwork.isConnected()) {
      return this.updateNetwork();
    }
  };
  
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    if (ANNetwork.isConnected()) {
      return this.refreshNetworkCharacters();
    }
  };
  //@[ALIAS]
  ALIAS__setupStartingEvent = _.setupStartingEvent;
  _.setupStartingEvent = function() {
    if (ANNetwork.isConnected()) {
      if ($gameTemp.isNetworkSharedEventReserved()) {
        return this.nSetupNetworkSharedEvent();
      }
    }
    return ALIAS__setupStartingEvent.call(this);
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  // * Безопасное обновление карты, так как может вызываться когда пришли данные игроков (на любой сцене в любой момент)
  _.nSafeRefresh = function() {
    var e;
    try {
      if (SceneManager.isBusyForNetworkData()) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (typeof $dataMap === "undefined" || $dataMap === null) {
        return;
      }
      this.refresh();
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  _.netCharsIsSomeoneCollided = function(x, y) {
    return this._networkCharacters.isSomeoneCollided(x, y);
  };
  _.nGetNetCharXY = function(x, y) {
    if (this.netCharsIsSomeoneCollided(x, y)) {
      return this._networkCharacters.getInPos(x, y);
    } else {
      return null;
    }
  };
  _.netChars = function() {
    return this._networkCharacters.characters();
  };
  _.networkCharacterByActorId = function(actorId) {
    return this._networkCharacters.characterByActorId(actorId);
  };
  _.networkCharacterById = function(id) {
    return this._networkCharacters.characterById(id);
  };
  // * Инициализация персонажей отображаемых на карте
  _.setupNetworkCharacters = function() {
    return this._networkCharacters.setup();
  };
  _.updateNetwork = function() {
    return this._networkCharacters.update();
  };
  _.refreshNetworkCharacters = function() {
    return this._networkCharacters.refresh();
  };
  // * Запуск общего события (которое пришло от сервера)
  _.nSetupNetworkSharedEvent = function() {
    var e, event;
    try {
      event = this.event($gameTemp.retrieveNetworkSharedEvent());
      if (event == null) {
        return false;
      }
      $gameTemp._nSharedEventOuterStartFlag = true;
      event.start();
      return true;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
    return false;
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__clear, _;
  //@[DEFINES]
  _ = Game_Message.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    if (ANNetwork.isConnected()) {
      return this.nEndCallback();
    }
  };
})();

// ■ END Game_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Message.prototype;
  _.nSetEndCallback = function(_nEndCallbackMethod) {
    this._nEndCallbackMethod = _nEndCallbackMethod;
  };
  _.nEndCallback = function() {
    if (this._nEndCallbackMethod != null) {
      this._nEndCallbackMethod();
      this._nEndCallbackMethod = null;
    }
  };
})();

// ■ END Game_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__battleMembers, ALIAS__charactersForSavefile, ALIAS__facesForSavefile, ALIAS__leader, ALIAS__setupStartingMembers, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__battleMembers = _.battleMembers;
  _.battleMembers = function() {
    if (ANNetwork.isConnected()) {
      return ANBattleManager.battleMembers();
    } else {
      return ALIAS__battleMembers.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__setupStartingMembers = _.setupStartingMembers;
  _.setupStartingMembers = function() {
    if (ANNetwork.isConnected()) {
      // * Нет начальной группы
      this._actors = [];
    } else {
      ALIAS__setupStartingMembers.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__leader = _.leader;
  _.leader = function() {
    if (ANNetwork.isConnected()) {
      return this.networkLeader();
    } else {
      return ALIAS__leader.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__charactersForSavefile = _.charactersForSavefile;
  _.charactersForSavefile = function() {
    if (ANNetwork.isConnected()) {
      return this.members().map(function(actor) {
        return [actor.characterName(), actor.characterIndex()];
      });
    } else {
      return ALIAS__charactersForSavefile.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__facesForSavefile = _.facesForSavefile;
  _.facesForSavefile = function() {
    if (ANNetwork.isConnected()) {
      return this.members().map(function(actor) {
        return [actor.faceName(), actor.faceIndex()];
      });
    } else {
      return ALIAS__facesForSavefile.call(this);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  _.setupNetworkGame = function() {};
  // * В бою участвует только один персонаж?
  _.isOneBattler = function() {
    return this.battleMembers().length <= 1;
  };
  //TODO: как задать после выбора персонажа, чтобы каждый раз не вычислять
  _.networkLeader = function() {
    var actorId;
    actorId = ANGameManager.myPlayerData().actorId;
    return $gameActors.actor(actorId);
  };
  //TODO: Есть метод onRefreshGameParty (в ANGameManager) -> путаница может быть
  // * Этот метод вызывается когда группа была изменена (кто-то отключился)
  _.nRefreshNetworkActors = function() {
    var actor, e, i, id, len, playerForActor, ref;
    try {
      ref = this.members();
      for (i = 0, len = ref.length; i < len; i++) {
        actor = ref[i];
        id = actor.actorId();
        // * Ищем игрока для каждого Actor
        playerForActor = ANGameManager.playersData.find(function(pl) {
          return pl.actorId === id;
        });
        // * Если нету больше игрока с таким Actor, удаляем из партии
        if (playerForActor == null) {
          this.removeActor(id);
          ANGameManager.anotherPlayerLeaveGame(id);
        }
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------
//TODO: Возможно это и на сцену битвы надо? (или там по другому работает)

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canMove, ALIAS__getInputDirection, ALIAS__moveDiagonally, ALIAS__moveStraight, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__getInputDirection = _.getInputDirection;
  _.getInputDirection = function() {
    var dir;
    if (ANNetwork.isConnected() && $gameTemp._netAutoFollowActorId > 0) {
      dir = ALIAS__getInputDirection.call(this);
      if (dir !== 0) {
        $gameTemp._netAutoFollowActorId = null;
      }
      return dir;
    } else {
      return ALIAS__getInputDirection.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    if (ANNetwork.isConnected()) {
      if (ANNetwork.isBusy()) {
        // * Игрок не может ходить если игра ждёт ответ от сервера
        return false;
      }
      if (ANET.UI.isPlayerMenuIsOpen()) {
        // * Игрок не может ходить, когда открыто меню другого игрока
        return false;
      }
    }
    return ALIAS__canMove.call(this, ...arguments);
  };
  //@[ALIAS]
  ALIAS__moveStraight = _.moveStraight;
  _.moveStraight = function(d) {
    if (ANNetwork.isConnected()) {
      // * Запоминаем предыдующие координаты (перед движением)
      this.___x = this.x;
      this.___y = this.y;
      // * Движение
      ALIAS__moveStraight.call(this, d);
      // * Если координаты сменились, значит персонаж
      // совершил движение, можно отправить на сервер
      if (this.___x !== this.x || this.___y !== this.y) {
        return ANPlayersManager.sendPlayerMove();
      }
    } else {
      return ALIAS__moveStraight.call(this, d);
    }
  };
  
  //@[ALIAS]
  ALIAS__moveDiagonally = _.moveDiagonally;
  _.moveDiagonally = function(horz, vert) {
    if (ANNetwork.isConnected()) {
      // * Запоминаем предыдующие координаты (перед движением)
      this.___x = this.x;
      this.___y = this.y;
      // * Движение
      ALIAS__moveDiagonally.call(this, horz, vert);
      // * Если координаты сменились, значит персонаж
      // совершил движение, можно отправить на сервер
      if (this.___x !== this.x || this.___y !== this.y) {
        ANPlayersManager.sendPlayerMove();
      }
    } else {
      ALIAS__moveDiagonally.call(this, horz, vert);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (ANNetwork.isConnected()) {
      this.updateNetwork();
      if (sceneActive === true) {
        this.nUpdatePlayerInputForNetwork();
      }
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  _.dataObserverHaveChanges = function() {
    return ANSyncDataManager.sendPlayerObserver();
  };
  _.updateNetwork = function() {
    var ref;
    if ($gameParty.isEmpty()) {
      return;
    }
    // * Проверяем и обновляем DataObserver своего персонажа
    // * Тут этот ? (првоерка Null) нужна!
    return (ref = $gameParty.leader()) != null ? ref.updateDataObserver() : void 0;
  };
  _.nUpdatePlayerInputForNetwork = function() {
    this.nUpdateAutoFollowMode();
    if (ANET.PP.isGameChatAllowed()) { //TODO: DYNAMIC?
      return this.nUpdateChatInput();
    }
  };
  
  //%[I] Показывать какую-то иконку над игроком (или целью) что в режиме преследования находится
  _.nUpdateAutoFollowMode = function() {
    var actorForFollow;
    if (!($gameTemp._netAutoFollowActorId > 0)) {
      return;
    }
    if (this.isMoving() || !this.canMove()) {
      return;
    }
    actorForFollow = $gameMap.networkCharacterByActorId($gameTemp._netAutoFollowActorId);
    if (actorForFollow != null) {
      //{ x, y } = actorForFollow
      // * Тут не используется метод $gameTemp.setDestination,
      // * так как он сбрасывает follow движение
      //$gameTemp._destinationX = x
      //$gameTemp._destinationY = y
      Game_Follower.prototype.chaseCharacter.call(this, actorForFollow);
    } else {
      $gameTemp._netAutoFollowActorId = null;
    }
  };
  _.nUpdateChatInput = function() {
    var openChatButton, sayInChatButton;
    //TODO: Можно оптимизировать, в initMembers
    openChatButton = ANET.PP.getChatOpenCloseKey();
    sayInChatButton = ANET.PP.getChatSayKey();
    if (Input.isTriggered(openChatButton)) {
      if (ANET.UI.isChatOpen()) {
        // * Если кнопка открыть чат и кнопка сказать в чат одинаковые
        if (openChatButton === sayInChatButton) {
          ANET.UI.showChatInputSafe(); // * то не закрываем, а сцена ввода текста
          Input.clear(); // * иначе закрываем
        } else {
          ANET.UI.closeChat();
        }
      } else {
        ANET.UI.showChat();
      }
    } else if (Input.isTriggered(sayInChatButton)) {
      if (ANET.UI.isChatOpen()) {
        ANET.UI.showChatInputSafe();
      }
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onChange, ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(switchId, value) {
    if (ANNetwork.isConnected()) {
      // * Вызываем страндартный метод
      ALIAS__setValue.call(this, switchId, value);
      // * Если были изменения
      if (this.__variableChangedOk === true) {
        if (this.isGlobalSwitch(switchId)) {
          ANSyncDataManager.sendGlobalSwitchChange(switchId, this.value(switchId));
        }
      }
      this.__variableChangedOk = false;
    } else {
      ALIAS__setValue.call(this, switchId, value);
    }
  };
  
  //@[ALIAS]
  ALIAS__onChange = _.onChange;
  _.onChange = function() {
    ALIAS__onChange.call(this);
    if (ANNetwork.isConnected()) {
      this.__variableChangedOk = true;
    }
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  _.isGlobalSwitch = function(switchId) {
    return ANET.PP.globalSwitchesIds().contains(switchId);
  };
  _.onSwitchFromServer = function(switchId, value) {
    this._data[switchId] = value;
    return this.onChange();
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  // * Инициализация набора общих событий для команд пользователя
  _.nInitCustomCommandsCE = function() {
    if (this.nCustomCommandsCE == null) {
      return this.nCustomCommandsCE = {};
    }
  };
  // * Проверка, есть ли для кастомной команды общее событие (и запуск если есть)
  _.nCheckCustomCommandForCEStart = function(name) {
    var ceId, e;
    try {
      this.nInitCustomCommandsCE();
      ceId = this.nCustomCommandsCE[name];
      if ((ceId != null) && ceId > 0) {
        $gameTemp.reserveCommonEvent(ceId);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
  // * Зарегестрировать вызов общего события для кастомной команды
  _.nRegisterCustomCommandCE = function(name, ceId) {
    var e;
    try {
      this.nInitCustomCommandsCE();
      this.nCustomCommandsCE[name] = ceId;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCommonEventReserved, ALIAS__requestAnimation, ALIAS__retrieveCommonEvent, ALIAS__setDestination, _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  //@[ALIAS]
  ALIAS__setDestination = _.setDestination;
  _.setDestination = function() {
    ALIAS__setDestination.call(this, ...arguments);
    $gameTemp._netAutoFollowActorId = null;
  };
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    // * Виртуальные общие события от сервера
    this._virtualEventQueue = [];
  };
  
  //@[ALIAS]
  ALIAS__isCommonEventReserved = _.isCommonEventReserved;
  _.isCommonEventReserved = function() {
    return this.isVirtualCommonEventReserved() || ALIAS__isCommonEventReserved.call(this);
  };
  
  // * Виртуальные события в приоритете
  //@[ALIAS]
  ALIAS__retrieveCommonEvent = _.retrieveCommonEvent;
  _.retrieveCommonEvent = function() {
    if (this.isVirtualCommonEventReserved()) {
      return this._virtualEventQueue.shift();
    } else {
      return ALIAS__retrieveCommonEvent.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__requestAnimation = _.requestAnimation;
  _.requestAnimation = function() {
    if (ANNetwork.isConnected()) {
      // * В бою анимацию синхронизируется (только мастер)(отправляется другим игрокам)
      if ($gameParty.inBattle() && ANGameManager.isBattleMaster()) {
        ANBattleManager.requestAnimation(...arguments);
      }
    }
    return ALIAS__requestAnimation.call(this, ...arguments);
  };
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__reservedCommonEvent, _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  if (KDCore.isMZ()) {
    return;
  }
  // * В MV нету метода retrieveCommonEvent
  //@[ALIAS]
  ALIAS__reservedCommonEvent = _.reservedCommonEvent;
  _.reservedCommonEvent = function() {
    if (this.isVirtualCommonEventReserved()) {
      return this._virtualEventQueue.shift();
    } else {
      return ALIAS__reservedCommonEvent.call(this);
    }
  };
  // * В MV нету метода requestBattleRefresh
  _.requestBattleRefresh = function() {
    if ($gameParty.inBattle()) {
      return this._needsBattleRefresh = true;
    }
  };
  _.isBattleRefreshRequested = function() {
    return this._needsBattleRefresh === true;
  };
  _.clearBattleRefreshRequest = function() {
    return this._needsBattleRefresh = false;
  };
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Temp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Temp.prototype;
  (function() {    // * Virtual Common Events
    // -----------------------------------------------------------------------
    _.reserveNetworkSharedEvent = function(_reservedNetworkSharedEvent) {
      this._reservedNetworkSharedEvent = _reservedNetworkSharedEvent;
    };
    _.isNetworkSharedEventReserved = function() {
      return this._reservedNetworkSharedEvent >= 1;
    };
    // * Забираем (и сразу очищаем)
    _.retrieveNetworkSharedEvent = function() {
      var eventId;
      eventId = this._reservedNetworkSharedEvent;
      this._reservedNetworkSharedEvent = 0;
      return eventId;
    };
    _.reserveVirtualCommonEvent = function(list) {
      return this._virtualEventQueue.push(list);
    };
    _.isVirtualCommonEventReserved = function() {
      return this._virtualEventQueue.length > 0;
    };
  })();
})();

// ■ END Game_Temp.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Troop.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Troop.prototype;
})();

// ■ END Game_Troop.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Unit.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Unit.prototype;
  _.nUpdateBattleDataSync = function() {
    var members;
    members = this.members();
    if (members.some(function(m) {
      return m.isNeedNetPushBattleData();
    })) {
      ANSyncDataManager.sendBattleUnitsObserver(members);
      members.forEach(function(m) {
        return m.onNetBattleDataPushed();
      });
    }
  };
})();

// ■ END Game_Unit.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onChange, ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(variableId, value) {
    if (ANNetwork.isConnected()) {
      // * Вызываем страндартный метод
      ALIAS__setValue.call(this, variableId, value);
      // * Если были изменения
      if (this.__variableChangedOk === true) {
        if (this.isGlobalVariable(variableId)) {
          ANSyncDataManager.sendGlobalVariableChange(variableId, this.value(variableId));
        }
      }
      this.__variableChangedOk = false;
    } else {
      ALIAS__setValue.call(this, variableId, value);
    }
  };
  //@[ALIAS]
  ALIAS__onChange = _.onChange;
  _.onChange = function() {
    ALIAS__onChange.call(this);
    if (ANNetwork.isConnected()) {
      return this.__variableChangedOk = true;
    }
  };
})();

// ■ END Game_Variables.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  _.isGlobalVariable = function(varId) {
    return ANET.PP.globalVariablesIds().contains(varId);
  };
  _.getAllGlobalVariablesData = function() {
    var i, j, variables;
    variables = [];
    for (i = j = 1; j <= 8; i = ++j) {
      variables.push([i, this.value[i]]);
    }
    return variables;
  };
  _.onVariableFromServer = function(varId, value) {
    this._data[varId] = value;
    return this.onChange();
  };
})();

// ■ END Game_Variables.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1


// Generated by CoffeeScript 2.6.1
// * Глабольный набор вспомогательных функций для пользователя
var nAPI;

nAPI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ IMPLEMENTATION.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = nAPI;
  // * Для вызова сцены сетевой игры
  // * (только если в Scene_Title нет пункта или используется кастомная сцена)
  //$[Внимание: могут быть проблемы в вызове из сцены карты (одиночная игра) и выходе из сцены]
  _.startNetworkGameScene = function() {
    SceneManager.push(Scene_NetworkGameMenu);
  };
  (function() {    // * NETWORK STATE
    // -----------------------------------------------------------------------
    _.isNetworkGame = function() {
      var e;
      try {
        return ANNetwork.isConnected();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    _.myPlayerIndex = function() {
      var e;
      try {
        return ANGameManager.myIndex();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.myActorId = function() {
      var e;
      try {
        return ANGameManager.myActorId();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.playersCount = function() {
      var e;
      try {
        return ANGameManager.playersData.length;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return 0;
    };
    _.isMasterClient = function() {
      var e;
      try {
        return _.isNetworkGame() && ANNetwork.isMasterClient();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    // * Возвращает набор данных исходя из what (см. ANGameManager.getPlayerInfo)
    _.getPlayerInfo = function(what, byWhat, value) {
      var e;
      try {
        return ANGameManager.getPlayerInfo(what, byWhat, value);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    // * Возвращает NETCharacter или Null
    return _.getPlayerCharacter = function(byWhat, value) {
      var e, playerData;
      try {
        if (!KDCore.Utils.isSceneMap()) {
          return null;
        }
        playerData = this.getPlayerInfo("info", byWhat, value);
        // * Персонаж должен быть на текущей карте + сцена карты должна быть текущая
        if ((playerData != null) && NetPlayerDataWrapper.isCharOnMap(playerData)) {
          return $gameMap.networkCharacterById(playerData.id);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return null;
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * HUI
    // -----------------------------------------------------------------------
    _.showGreenAlert = function(text) {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.notifySucess(text) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showRedAlert = function(text) {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.notifyError(text) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.showInfoMessage = function(text1, text2 = "") {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.showWaitingInfo(text1, text2, 1) : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    return _.hideInfoMessage = function() {
      var e;
      try {
        return typeof HUIManager !== "undefined" && HUIManager !== null ? HUIManager.hideWaitingInfo() : void 0;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * USER SERVER COMMANDS
    // -----------------------------------------------------------------------
    //@[ALIAS SUPPORT]
    // * FOR ALIASING (for plugin developers and custom commands implementation)
    _.onCustomCommand = function(name, data) {
      var e;
      try {
        if (typeof $gameSystem !== "undefined" && $gameSystem !== null) {
          $gameSystem.nCheckCustomCommandForCEStart(name);
        }
      } catch (error) {
        e = error;
        ANET.w(e);
      }
      console.log("Custom network command received: " + name);
    };
    // * USER CUSTOM CODE HERE
    _.sendCustomCommand = function(name, data) {
      var e;
      try {
        if (!_.isNetworkGame()) {
          return;
        }
        return ANNetwork.callback(NMS.Game("userCommand", {name, data}), function() {
          //TODO: Может не надо выполнять и на данном клиенте?
          // * Сразу выполняем и на данном клиенте
          // * Так как сервер эту команду выполнит в режиме ретрансляции
          return nAPI.onCustomCommand(name, data);
        });
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Подписать на определённую (кастомную) команду выполенине общего события
    return _.registerCommonEventForCommand = function(name, commonEventId) {
      var e;
      try {
        return ANNetwork.callback(NMS.Game("customCommandLink", {name, commonEventId}), function() {
          if (typeof $gameSystem !== "undefined" && $gameSystem !== null) {
            $gameSystem.nRegisterCustomCommandCE(name, commonEventId);
          }
          return console.log("Custom network command register to Common Event is done");
        });
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * CHAT
    // -----------------------------------------------------------------------
    _.writeInChat = function(message, isGlobal = false) {
      var e;
      try {
        if (isGlobal === true && ANNetwork.isConnected()) {
          ANGameManager.sendRawChatMessage(0, 0, message);
        } else {
          ANET.UI.addMessageToChat(ANET.Utils.buildChatMessage(0, 0, message));
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.closeChatWindow = function() {
      var e;
      try {
        ANET.UI.closeChat();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.openChatWindow = function() {
      var e;
      try {
        ANET.UI.showChat();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    _.moveChatWindow = function(x = 0, y = 0) {
      var e;
      try {
        $gamePlayer._nLastChatWindowPosition = {
          x: x,
          y: y
        };
        if (this.isChatWindowOpened()) {
          ANET.UI.chat()._moveToStartPosition();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        $gamePlayer._nLastChatWindowPosition = {
          x: 0,
          y: 0
        };
      }
    };
    return _.isChatWindowOpened = function() {
      var e;
      try {
        return ANET.UI.isChatOpen();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * PLAYER MENU
    // -----------------------------------------------------------------------
    return _.callPlayerMenuAction = function(actionName, relativeActorId) {
      var anotherPlayer, e;
      try {
        switch (actionName) {
          case "trade":
            anotherPlayer = $gameMap.networkCharacterByActorId(relativeActorId);
            if ((anotherPlayer != null) && ANTradeManager.isClientAvailableForTrade()) {
              return ANTradeManager.requestTradeWith(anotherPlayer.playerData());
            }
            break;
          case "status":
            // * Запрашиваем статус определённого персонажа
            $gameTemp._netRequestStatusForCertainActorId = relativeActorId;
            return SceneManager.push(Scene_Status);
          case "follow":
            // * Автоматически следуем за определённым игроком
            return $gameTemp._netAutoFollowActorId = relativeActorId;
          default:
            return ANET.w("Unknown Player Menu Action: " + actionName);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
  })();
})();

// ■ END IMPLEMENTATION.coffee
//---------------------------------------------------------------------------

// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Класс для персонажей на карте других игроков
var NETCharacter;

NETCharacter = class NETCharacter extends Game_Character {
  constructor(id) {
    super();
    this.id = id;
    //* Иконка сетевого состояния игрока (меню, карта, торговля, чат и т.д.)
    this.networkStateIcon = null;
    this.refresh();
  }

  // * Синхронизация движения
  playerData() {
    return ANGameManager.getPlayerDataById(this.id);
  }

  actor() {
    return $gameActors.actor(this.playerData().actorId);
  }

  actorId() {
    if (this.playerData() != null) {
      return this.playerData().actorId;
    } else {
      return 0;
    }
  }

  refresh() {
    var charIndex, charName;
    if (this.actor() == null) {
      return;
    }
    charName = this.actor().characterName();
    charIndex = this.actor().characterIndex();
    return this.setImage(charName, charIndex);
  }

  // * Сетевое состояние игрока
  // * =====================================================================
  requestNetworkStateIcon(networkStateIcon) {
    this.networkStateIcon = networkStateIcon;
  }

};

(function() {  
  // * =====================================================================

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NETCharacter.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NETCharacter.prototype;
})();

// ■ END NETCharacter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Данный класс содержит NETCharacter всех игроков на карте (аналог Game_Followers)
//?[STORABLE]
//@[GLOBAL]
var NETCharactersGroup;

NETCharactersGroup = class NETCharactersGroup {
  constructor() {
    this._data = [];
  }

  setup() {
    "SETUP NETWORK CHARS".p();
    this._data = [];
    this._refreshCharacters();
  }

  // * Вызывается из Game_Map.refresh
  refresh() {
    var char, i, len, ref;
    this._refreshCharacters();
    ref = this._data;
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      char.refresh();
    }
  }

  characters() {
    return this._data;
  }

  characterById(id) {
    return this.characters().find(function(c) {
      return c.id === id;
    });
  }

  characterByActorId(actorId) {
    return this.characters().find(function(c) {
      return c.actorId() === actorId;
    });
  }

  update() {
    var c, i, len, ref, results;
    ref = this.characters();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      results.push(c.update());
    }
    return results;
  }

  isSomeoneCollided(x, y) {
    return this.characters().some(function(c) {
      return c.pos(x, y);
    });
  }

  getInPos(x, y) {
    return this.characters().find(function(c) {
      return c.pos(x, y);
    });
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ NETCharactersGroup.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = NETCharactersGroup.prototype;
  
  // * Данный метод удаляет (отключённых) и создаёт (подклюённых) персонажей
  _._refreshCharacters = function() {
    var char, i, len, pl, x;
    this._removeNotExistsCharacters();
    this._addNewCharacters();
    this._refreshNetworkCharactersSprites();
    x = ANGameManager.anotherPlayers();
    for (i = 0, len = x.length; i < len; i++) {
      pl = x[i];
      char = this.characterById(pl.id);
      if (char == null) {
        this._data.push(new NETCharacter(pl.id));
      }
    }
  };
  // * Удаляем (отключился или ушёл на другую карту)
  _._removeNotExistsCharacters = function() {
    var char, i, len, ref, x;
    x = ANGameManager.anotherPlayersOnMap();
    ref = this.characters();
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      if (char == null) {
        continue;
      }
      if (!x.find(function(c) {
        return c.id === char.id;
      })) {
        this._data.delete(char);
      }
    }
  };
  // * Добавляем новых персонажей
  //TODO: Надо проверять!
  _._addNewCharacters = function() {
    var char, i, len, pl, x;
    x = ANGameManager.anotherPlayersOnMap();
    for (i = 0, len = x.length; i < len; i++) {
      pl = x[i];
      char = this.characterById(pl.id);
      if (char == null) {
        this._data.push(new NETCharacter(pl.id));
      }
    }
  };
  // * Пересоздать спрайты персонажей
  _._refreshNetworkCharactersSprites = function() {
    var ref;
    if (!KDCore.Utils.isSceneMap()) {
      return;
    }
    if ((ref = SceneManager._scene._spriteset) != null) {
      ref.refreshNetworkCharacters();
    }
  };
})();

// ■ END NETCharactersGroup.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessages.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _CM, _M;
  //@[DEFINES]
  _M = NetMessage;
  _CM = function(name, flag, data, socket) {
    return _M.EmptyMessageWithFlag(flag, data, socket).setName(name);
  };
  // * Обозначения
  // f - имя комманды (флага)
  // d - данные
  // s - сокет (либо ничего)

  //?LOBBY COMMANDS
  _M.Lobby = function(f, d, s) {
    return _CM('lobby', f, d, s);
  };
  //?MAP COMMANDS
  _M.Map = function(f, d, s) {
    return _CM('map', f, d, s);
  };
  //?GAME COMMANDS
  _M.Game = function(f, d, s) {
    return _CM('game', f, d, s);
  };
  //?INTERPRETER COMMANDS
  _M.Event = function(f, d, s) {
    return _CM('event', f, d, s);
  };
  //?BATTLE COMMANDS
  _M.Battle = function(f, d, s) {
    return _CM('battle', f, d, s);
  };
  //?OTHER COMMANDS
  _M.Other = function(f, d, s) {
    return _CM('other', f, d, s);
  };
  //?COMMON COMMANDS
  _M.Common = function(innerFlag, d, s) {
    return _M._commonCMD('forClients', innerFlag, d, s);
  };
  //? COMMON COMMAND DATA
  _M._commonCMD = function(cmdName, innerFlag, d, s) {
    var commonData;
    commonData = {
      cmd: innerFlag,
      data: d
    };
    return _CM('common', cmdName, commonData, s);
  };
  //?ABSZ COMMANDS
  // * Через broadcast, т.е. самому себе не прийдёт
  _M.ABSZ = function(innerFlag, d, s) {
    return _M._commonCMD('absz', innerFlag, d, s);
  };
})();

// ■ END NetMessages.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Основной класс менеджер интерфейса (API)
// * Аналогичен классу AA.UI из ABSZ
ANET.UI = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ ANET.UI.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.UI;
  _.setUI = function(uiSet) {
    this.uiSet = uiSet;
  };
  _.isValid = function() {
    return (this.uiSet != null) && ANNetwork.isConnected();
  };
  // * Когда появляется окно с сообщением
  _.onGameMessageStart = function() {
    if (!this.isValid()) {
      return;
    }
    this.uiSet.onGameMessageStart();
    this.closePlayerMenu();
  };
  // * Когда заканчивается окно с сообщением
  _.onGameMessageEnd = function() {
    if (!this.isValid()) {
      return;
    }
    return this.uiSet.onGameMessageEnd();
  };
  // * Когда было нажатие мышки на какой-либо UI элемент
  _.isUITouched = function() {
    return false;
  };
  // * Вызывается когда сцена карты заканчивается
  _.terminate = function() {
    var ref;
    if ((ref = this.uiSet) != null) {
      ref.terminate();
    }
    this.terminateModalWindow();
  };
  (function() {    
    // * Основной интерфейс Spriteset_UI
    // -----------------------------------------------------------------------
    _.refresh = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.refresh() : void 0;
    };
    _.hide = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.hide() : void 0;
    };
    _.show = function() {
      var ref;
      return (ref = this.uiSet) != null ? ref.show() : void 0;
    };
    // * Если какой-либо UI элемент обрабатывает нажатие курсора, то true
    _.isAnyUIElementTouchProcess = function() {
      return false;
    };
    // * Эффект нажатия курсора
    return _.playClickEffect = function(noSound = false) {
      var effect, x, y;
      if (!this.isValid()) {
        return;
      }
      if (!noSound) {
        SoundManager.playCursor();
      }
      ({x, y} = TouchInput);
      effect = new ANET.Sprite_MapClickEffect(x, y);
      this.uiSet.addChild(effect);
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Меню игрока
    // -----------------------------------------------------------------------
    _.playerMenu = function() {
      return this.uiSet.playerMenuWindow;
    };
    // * Есть ли меню игрока (создан ли), так как опциональный и нету в Basic
    _.isPlayerMenuValid = function() {
      return this.isValid() && (this.playerMenu() != null);
    };
    _.isPlayerMenuIsOpen = function() {
      return this.isPlayerMenuValid() && this.playerMenu().isOpen();
    };
    // * netChar - класс NETCharacter
    _.openNetPlayerMenuFor = function(netChar) {
      if (!this.isPlayerMenuValid()) {
        return;
      }
      if (netChar == null) {
        this.closePlayerMenu();
      }
      this.playerMenu().openForCharacter(netChar);
    };
    return _.closePlayerMenu = function() {
      var ref;
      if ((ref = this.playerMenu()) != null) {
        ref.close();
      }
    };
  })();
  (function() {    // * Чат
    // -----------------------------------------------------------------------
    _.chat = function() {
      return this.uiSet.chatWindow;
    };
    // * Есть ли чат (создан ли), так как опциональный и нету в Basic
    _.isChatValid = function() {
      return this.isValid() && (this.chat() != null);
    };
    // * Открыто ли окно чата
    _.isChatOpen = function() {
      return this.isChatValid() && this.chat().isActive();
    };
    // * Показать сцену ввода сообщения в чат
    _.showChatInput = function() {
      if (!this.isValid()) {
        return;
      }
      SceneManager.push(Scene_NetChatInput);
    };
    // * Показать сцену ввода сообщения в чат (с учётом событий и сообщений)
    _.showChatInputSafe = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (this.isCanChatInput()) {
        return this.showChatInput();
      }
    };
    _.showChat = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (!this.isChatOpen()) {
        this.chat().open();
      }
    };
    _.closeChat = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (this.isChatOpen()) {
        this.chat().close();
      }
    };
    
    // * Добавить сообщение в чат (можно вызывать на любой сцене)
    _.addMessageToChat = function(message) {
      //%[I] Опция открывать чат при новом сообщении, или значёк чата с индикатором сообщения в углу (нажимаемый - кнопка)
      if (!this.isChatValid()) {
        return;
      }
      if (message == null) {
        return;
      }
      // * Если на карте, то добавляем прямо в чат
      if (KDCore.Utils.isSceneMap()) {
        this.chat().addMessageToChat(message);
      } else {
        // * Иначе в историю
        $gameTemp._nChatHistory.push(message);
      }
    };
    // * Может ли игрок начать вводить текст в чат (другая сцена будет открыта)
    _.isCanChatInput = function() {
      return !($gameMessage.isBusy() || $gameMap.isEventRunning());
    };
    
    // * Открыть (или не надо) чат при переходе на сцену карты
    return _.openChatAfterMapLoaded = function() {
      if (!this.isChatValid()) {
        return;
      }
      if (!$gamePlayer._nChatIsClosed) {
        return this.showChat();
      }
    };
  })();
  (function() {    // -----------------------------------------------------------------------

    // * Модальное диалоговое окно
    // -----------------------------------------------------------------------
    _.modalWindow = function() {
      return this.uiSet.netModalDialog;
    };
    _.isModalWindowIsOpen = function() {
      var ref;
      return this.isValid() && ((ref = this.modalWindow()) != null ? ref.isOpen() : void 0);
    };
    // * Если сцена закрывается, а окно октрыто -> автоматический ответ "НЕТ"
    _.terminateModalWindow = function() {
      var e;
      try {
        if (this.isModalWindowIsOpen()) {
          this.modalWindow().forceCancel();
        }
      } catch (error) {
        e = error;
        ANET.w(e);
      }
    };
    // * Показать модальное окно для начала торговли, где initiator игрок который отправил нам запрос
    return _.showModalWindowForTrade = function(initiatorId) {
      var e, name;
      if (!this.isValid()) {
        return;
      }
      if (!String.any(initiatorId)) {
        return;
      }
      try {
        name = nAPI.getPlayerInfo("actorName", "netId", initiatorId);
        return this.modalWindow().openForTradeRequest(name);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    };
  })();
})();

// ■ END ANET.UI.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Класс которые работает с параметрами и командами плагина
(function() {
  var ParamsManager;
  ParamsManager = class ParamsManager extends KDCore.ParamLoader {
    constructor() {
      super("ANETZ");
      this._prepareParameters();
    }

    
      //? CONNECTION -----------------------------------------------------------
    // * Настройки соединения
    serverIp() {
      return this._ip;
    }

    serverPort() {
      return this._port;
    }

    isHTTPSConnection() {
      return this._isHttps === true;
    }

    //? MULTIPLAYER GROUP -----------------------------------------------------------

      //Wait Map Transfer?
    isOnlySameMapMode() {
      return this.getParam("onlySameMap", true);
    }

    // New Game Allowed?
    // * Доступна ли обычная локальная Новая игра
    isSinglePlayerAllowed() {
      return this.getParam("singlePlayerAllowed", true);
    }

    //Rooms Filter?
    isRoomFilterON() {
      return ANET.isPro() && this.getParam("roomFilter", false);
    }

    //Save and Load Allowed?
    // * Сохранение и загрузка сетевой игры
    isSaveLoadAllowed() {
      return this.getParam("saveLoadGame", true);
    }

    // Is show network icons?
    // * Показывать иконки статуса игрока
    isShowNetworkIcons() {
      return this.getParam("networkStatusIcons", true);
    }

    //In-Game Chat?
    isGameChatAllowed() {
      if (ANET.isPro()) {
        return this.getParam("inGameChat", false);
      } else {
        return false;
      }
    }

    //? CHAT SUBGROUP -----------------------------------------------------------
    //TODO: Параметр
    //TODO: param Open chat if closed and new message is arrived
    //TODO: format strings
    //TODO: visual settings

      //Start Message
    getChatStartMessage() {
      return this.getParam("chatStartMessage", "");
    }

    getChatOpenCloseKey() {
      return this.getParam("chatOpenCloseKey", "t");
    }

    getChatSayKey() {
      return this.getParam("chatSayKey", "t");
    }

    // Is click to Say?
    isSayIfClickOnChatWindow() {
      return this.getParam("clickOnChatToSay", true);
    }

    //? PLAYER MENU -----------------------------------------------------------

      //In-Game Player Menu?
    // * Меню игрока - включено? (вообще в игре)
    isInGamePlayerMenuAllowed() {
      if (ANET.isPro()) {
        return this.getParam("playerMenuSettingsGroup", true);
      } else {
        return false;
      }
    }

    // * Стандартные команды для меню игрока
    getPlayerMenuDefaultCommands() {
      return this._menuCommands;
    }

    //Custom Commands
    getPlayerMenuUserCommands() {
      return this.getParam("userIPLMenuCommands", []);
    }

    //Is need trade confirm window?
    // * Спрашивать игрока о начале торговли? (запрос торговли от другого)
    isShowModalForTradeRequest() {
      return this.getParam("isTradeModalWindowActive", true);
    }

    getTradeModalWindowText() {
      return this.getParam("tradeModalWindow_text", "Accept \\C[1]Trade\\C[0] from \\C[2]%1\\C[0]?");
    }

    getModalWindowOpenSE() {
      return this.getParam("tradeModalWindow_openSE", "Bell3");
    }

    getModalWindowYesHotkey() {
      return this.getParam("tradeModalWindow_hkYes", "y");
    }

    getModalWindowNoHotKey() {
      return this.getParam("tradeModalWindow_hkNo", "n");
    }

    //? PLAYER SETTINGS GROUP -----------------------------------------------------------

      // * Набор персонажей Actors для сетевой игры
    //?VERSION
    //Actors
    actorsForNetwork() {
      return this.getParam("actorsForNetwork", [1, 2, 3, 4]);
    }

    // * Можно ли выбирать персонажа себе
    //Actor selection?
    isActorSelectionAllowed() {
      return this.getParam("isActorSelectionAllowed", true);
    }

    // * Можно ли начать сетевую игру одному
    //One player start?
    isSingleActorNetworkGameAllowed() {
      return this.getParam("isSinglePlayerStartAllowed", true);
    }

    // * Отображение имени игрока заместо имени персонажа
    // * 0 - Не показывать, 1 - Name, 2 - Nickname
    //?DINAMIC
    //Player Name for Actor
    playerActorNameType() {
      return 0;
    }

    //On Player Disconnect CE
    getPlayerLeaveGameCommonEventId() {
      return this.getParam("playerLeaveGameCommonEvent", 0);
    }

    //? OTHER -----------------------------------------------------------
    globalVariablesIds() {
      return this._globalVars;
    }

    globalSwitchesIds() {
      return this._globalSwitches;
    }

    //? NOT IN HEADER YET -------------------------------------

      // * Можно ли просматривать статус других игроков
    isOtherPlayersMenuStatusAllowed() {
      return true;
    }

    // * Видно ли других игроков в меню
    isOtherPlayersVisibleInMenu() {
      return true;
    }

    // * Ожидание получения действия от каждого игрока в битве
    isForceBattleSyncMode() {
      return true;
    }

    // * Время обновления данных игрока (на карте)
    playerDataRefreshRate() {
      return 60;
    }

    // * Время обновления данных в битве (влияет на производительность)
    battleDataRefreshRate() {
      return 60;
    }

    // * Настройки Trade сцены (визуальные)
    tradeSceneSettings() {} //TODO:

    
      //TODO: Параметр
    isSaveOnlyInMenu() {
      return false;
    }

    tradeSceneCompleteSE() {
      return "";
    }

  };
  ANET.link(ParamsManager);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.ParamsManager.prototype;
  _._prepareParameters = function() {
    this._prepareConnectionSettings();
    this._preparePlayerActorName();
    this._prepareGlobalData();
    return this._prepareDefaultPlayerMenuCommands();
  };
  //?VERSION
  //! У базовой версии свой метод!
  _._prepareConnectionSettings = function() {
    var p;
    p = this.getParam("connection", {
      serverIp: "195.161.41.20",
      serverPort: "3034",
      isHttpsConnection: false
    });
    this._ip = p.serverIp;
    this._port = p.serverPort;
    this._isHttps = p.isHttpsConnection;
    // * Это тут по сути не нужно (так как у базовой версии свой метод)
    if (this.isHTTPSConnection() && !ANET.isPro()) {
      window.alert("Only Alpha NET Z [PRO] supports HTTPS connection!");
      this._isHttps = false;
    }
  };
  _._preparePlayerActorName = function() {
    var p;
    p = this.getParam("playerActorNameType", "");
    switch (p) {
      case "Instead Name":
        this.playerActorNameType = function() {
          return 1;
        };
        break;
      case "Instead Nickname":
        this.playerActorNameType = function() {
          return 2;
        };
        break;
    }
  };
  // * Ничего, так как 0 по умолчанию
  _._prepareGlobalData = function() {
    var p;
    p = this.getParam("globalData", {
      globalSwitchesIds: [],
      globalVariablesIds: []
    });
    this._globalVars = p.globalVariablesIds;
    this._globalSwitches = p.globalSwitchesIds;
  };
  _._prepareDefaultPlayerMenuCommands = function() {
    var cmd, commandNames, i, len, name;
    this._menuCommands = [];
    commandNames = ["trade", "status", "follow"];
    for (i = 0, len = commandNames.length; i < len; i++) {
      name = commandNames[i];
      cmd = this.getParam("PlayerMenuItem_" + name, null);
      if (cmd == null) {
        continue;
      }
      cmd.action = name; // * флаг
      if (cmd.visible === true) {
        this._menuCommands.push(cmd);
      }
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
//@[GLOBAL]
//?[STORABLE]

// * Класс для пула ожидания флагов (или данных) от других игроков
var PlayersCheckPool;

PlayersCheckPool = class PlayersCheckPool {
  constructor(anotherPlayersGetter) {
    this.anotherPlayersGetter = anotherPlayersGetter;
    this.reset();
    return;
  }

  // * Главный метод -> отправка на сервер запроса
  requestToServer(requestMethod) {
    this.requestMethod = requestMethod;
    return this.requestMethod();
  }

  update() {
    if (this._repeatTimer >= 0) {
      this._repeatTimer--;
    } else {
      this.checkPool();
      if (!this.isReady()) {
        this.requestToServer(this.requestMethod);
        this.resetTimer();
      } else {
        if (this.callback != null) {
          this.callback();
        }
      }
    }
  }

  // * Проверка пула данных
  checkPool() {
    var anotherPlayersIds, i, id, len, poolSize;
    poolSize = 0;
    // * Подразумевается что в этом массиве только ID других игроков (кроме себя)
    anotherPlayersIds = this.anotherPlayersGetter().map(function(pl) {
      return pl.actorId;
    });
    for (i = 0, len = anotherPlayersIds.length; i < len; i++) {
      id = anotherPlayersIds[i];
      if (this.isDataExistsFor(id)) {
        poolSize += 1;
      }
    }
    if (poolSize === anotherPlayersIds.length) {
      // * Поэтому, когда пул полный, проверяем что данные от себя тоже есть
      this._isReady = this.isMyDataExists();
    } else {
      this._isReady = false;
    }
  }

  onReady(callback) {
    this.callback = callback;
  }

  isReady() {
    return this._isReady === true;
  }

  setMyData(data) {
    return this.onAnswer(ANGameManager.myActorId(), data);
  }

  isMyDataExists() {
    return this.isDataExistsFor(ANGameManager.myActorId());
  }

  isDataExistsFor(actorId) {
    return this._anotherPlayersData[actorId] != null;
  }

  // * Этот метод вызывается внешне, когда пришли данные от сервера
  onAnswer(actorId, data) {
    return this._anotherPlayersData[actorId] = data;
  }

  reset() {
    this.resetTimer();
    this._isReady = false;
    this._anotherPlayersData = {};
  }

  resetTimer() {
    return this._repeatTimer = 60;
  }

};

// Generated by CoffeeScript 2.6.1
//@[GLOBAL]
//?[STORABLE]

// * Класс для пула ожидания флагов (или данных) от других игроков
var PlayersDataPool;

PlayersDataPool = class PlayersDataPool {
  constructor(anotherPlayersGetter) {
    this.anotherPlayersGetter = anotherPlayersGetter;
    this.reset();
    return;
  }

  // * Режим ожидания не данных, а чтобы у всех был TRUE
  setFlagMode() {
    return this._isFlagMode = true;
  }

  // * Главный метод -> отправка на сервер запроса
  register(requestMethod) {
    this.requestMethod = requestMethod;
    return this.requestMethod();
  }

  update() {
    if (this.isReady()) { // * Чтобы цикла не было по вызову callback
      return;
    }
    this._timeout--;
    if (this._repeatTimer >= 0) {
      this._repeatTimer--;
    } else {
      this.checkPool();
      if (!this.isReady()) {
        this.resetTimer();
        if (this._timeout > 0) {
          this.register(this.requestMethod);
        } else {
          this._isTimedOut = true;
          if (this.failCallback != null) {
            this.failCallback();
          }
          // * Сброс (например если Timeout не предусмотрен, не задан метод failCallback)
          this.resetTimeout();
        }
      } else {
        if (this.callback != null) {
          this.callback();
        }
      }
    }
  }

  // * Проверка пула данных
  checkPool() {
    var anotherPlayersIds, i, id, len, poolSize;
    poolSize = 0;
    // * Подразумевается что в этом массиве только ID других игроков (кроме себя)
    anotherPlayersIds = this.anotherPlayersGetter().map(function(pl) {
      return pl.actorId;
    });
    for (i = 0, len = anotherPlayersIds.length; i < len; i++) {
      id = anotherPlayersIds[i];
      if (this.isDataExistsFor(id)) {
        poolSize += 1;
      }
    }
    if (poolSize === anotherPlayersIds.length) {
      // * Поэтому, когда пул полный, проверяем что данные от себя тоже есть
      this._isReady = this.isMyDataExists();
    } else {
      this._isReady = false;
    }
  }

  onReady(callback) {
    this.callback = callback;
  }

  onFail(failCallback) {
    this.failCallback = failCallback;
  }

  isReady() {
    return this._isReady === true;
  }

  isTimedOut() {
    return this._isTimedOut === true;
  }

  setMyData(data) {
    return this.onAnswer(ANGameManager.myActorId(), data);
  }

  isMyDataExists() {
    return this.isDataExistsFor(ANGameManager.myActorId());
  }

  isDataExistsFor(actorId) {
    return this.getDataFor(actorId) != null;
  }

  getDataFor(actorId) {
    return this._anotherPlayersData[actorId];
  }

  getData() {
    return this._anotherPlayersData;
  }

  // * Этот метод вызывается внешне, когда пришли данные от сервера
  onAnswer(actorId, data) {
    if (!this._isFlagMode) {
      this._anotherPlayersData[actorId] = data;
    } else {
      // * Если в режиме флагов, то только при TRUE присваиваем данные
      if (data === true) {
        this._anotherPlayersData[actorId] = data;
      } else {
        // * null, а не false, потому что проверка через ? идёт
        this._anotherPlayersData[actorId] = null;
        delete this._anotherPlayersData[actorId];
      }
    }
  }

  reset() {
    this.resetTimer();
    this.resetTimeout();
    this._isReady = false;
    this._isFlagMode = false;
    this._isTimedOut = false;
    this._anotherPlayersData = {};
  }

  resetTimer() {
    return this._repeatTimer = 60;
  }

  resetTimeout() {
    return this._timeout = 600;
  }

};

// Generated by CoffeeScript 2.6.1
//@[GLOBAL]
//?[STORABLE]

// * Класс для пула ожидания других игроков
var PlayersWaitPool;

PlayersWaitPool = class PlayersWaitPool {
  constructor() {
    // * Запоминается при создании, чтобы можно было сбросить
    // * Это нужно, чтобы если игрок новый переместился на карту, его
    // * не добавили в ожидание, если на этой карте уже запущено общее событие
    this._anotherPlayersIds = ANGameManager.anotherPlayersOnMap().map(function(pl) {
      return pl.actorId;
    });
    this.reset();
    return;
  }

  // * Зарегестрировать (отправить на сервер)
  register() {
    this.resetTimer();
    ANInterpreterManager.sendSharedEventRequireRegister();
  }

  // * Только один игрок (мастер события) запустил событие (один на карте или в игре)
  isSinglePool() {
    return this._anotherPlayersIds.length === 0;
  }

  // * Проверить, что игроки, которые в пуле, онлайн (не отключились)
  checkPool() {
    var i, id, len, player, playersOnMap, ref;
    playersOnMap = ANGameManager.anotherPlayersOnMap();
    ref = this._anotherPlayersIds;
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      // * Если игрока больше нет на карте, мы его удаляем из пула
      player = playersOnMap.find(function(pl) {
        return pl.actorId === id;
      });
      if (player == null) {
        this._anotherPlayersIds.delete(id);
        // * Игрок отключился, делаем ему true, чтобы можно было продолжить событие
        // * (в следующей команде он уже участвовать не будет, так как будет Reset)
        this._playersReady[id] = true;
      }
    }
  }

  // * Ответ от сервера
  onAnswer(actorId) {
    return this._playersReady[actorId] = true;
  }

  update() {
    if (this._repeatTimer >= 0) {
      this._repeatTimer--;
    } else {
      if (!this.isReady()) {
        this.checkPool();
        this.register();
      }
    }
  }

  isReady() {
    var pl, ref, value;
    ref = this._playersReady;
    for (pl in ref) {
      value = ref[pl];
      if (value === false) {
        // * Если хоть одно значение false, значит не готов
        return false;
      }
    }
    return true;
  }

  resetTimer() {
    return this._repeatTimer = 60;
  }

  // * Сбросить до нового ожидания
  reset() {
    var i, id, len, ref;
    // * Добавляем себя как готового всегда (тут не важент именно ID)
    // * В принципе можно и не добавлять, так как важнее другие игроки
    this._playersReady = {
      myActorId: true
    };
    ref = this._anotherPlayersIds;
    // * Добавляем всех игроков как изначально не готовых
    for (i = 0, len = ref.length; i < len; i++) {
      id = ref[i];
      this._playersReady[id] = false;
    }
    this.resetTimer();
  }

};

// Generated by CoffeeScript 2.6.1
// * Команды плагина
// * Нет класса или менеджера, так как только методы регистрации команд
(function() {
  var registerPluginCommandsMV, registerPluginCommandsMZ;
  // * Основной метод загрузки (регистрации команд плагина)
  ANET.loadPluginCommands = function() {
    if (KDCore.isMZ()) {
      registerPluginCommandsMZ('Alpha_NETZ');
      return registerPluginCommandsMZ('Alpha_NETZ_MZ');
    } else {
      return registerPluginCommandsMV();
    }
  };
  registerPluginCommandsMZ = function(pluginName) {
    PluginManager.registerCommand(pluginName, 'EventCommandSelector', function(args) {
      var e;
      try {
        return this.nSetCommandOptions(args);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    });
    PluginManager.registerCommand(pluginName, 'SharedBattle', function(args) {
      var e;
      try {
        return this.nSetSharedBattle(args.battleId);
      } catch (error) {
        e = error;
        return ANET.w(e);
      }
    });
  };
  registerPluginCommandsMV = function() {
    var e;
    try {
      // * Этот метод только для MV существует
      return ANET.registerMVPluginCommands();
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

(function(){
    
    ANET.registerMVPluginCommands = function() {
        //@[ALIAS]
        var _Game_Interpreter_pluginCommand_ANET = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            _Game_Interpreter_pluginCommand_ANET.call(this, command, args);
            if (command === 'SetSharedBattle') {
                try {
                    this.nSetSharedBattle(args[0]);
                } catch (e) {
                    console.warn(e);
                }
            }
        };
    };

})();
// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isActive, ALIAS__terminate, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //@[ALIAS]
  ALIAS__isActive = _.isActive;
  _.isActive = function() {
    if (ANNetwork.isBusy()) {
      return false;
    } else {
      return ALIAS__isActive.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    if (ANNetwork.isBusy()) {
      return ANGameManager.updateWaiting();
    } else {
      return ALIAS__update.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__terminate = _.terminate;
  _.terminate = function() {
    // * Смена сцены
    if (ANNetwork.isConnected()) {
      ANGameManager.sendSceneChanging();
    }
    return ALIAS__terminate.call(this);
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Base.prototype;
  //?EVENT
  // * Когда соединение прервано, вызывается это событие
  _.onLostConnection = function() {
    HUIManager.hideLoader();
    return SceneManager.goto(Scene_Title);
  };
  
  //?EVENT
  // * Когда закрывается комната, вызывается это событие
  _.netOn_lobby_roomClosed = function() {
    // * По умолчанию из любой сцены выходит в главное меню
    return SceneManager.goto(Scene_Title);
  };
  // * Когда пришло какое-либо сообщение от сервера
  //?EVENT
  _.onServerEvent = function(name) {
    var eventMethod;
    if (SceneManager.isBusyForNetworkData()) {
      return;
    }
    eventMethod = "netOn_" + name;
    if (this[eventMethod] != null) {
      console.log("Call scene callback for event " + name);
      this[eventMethod]();
    }
  };
})();

// ■ END Scene_Base.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeInputWindow, ALIAS__commandFight, ALIAS__shouldAutosave, ALIAS__stop, ALIAS__updateBattleProcess, ALIAS__updateBattleProcessMV, ALIAS__updateTpbAutoBattle, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  // * В сетевом режиме автосхранения отключены
  //@[ALIAS]
  ALIAS__shouldAutosave = _.shouldAutosave;
  _.shouldAutosave = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__shouldAutosave.call(this);
    }
  };
  //@[ALIAS, STORED]
  _.ALIAS__NET_start = _.start;
  _.start = function() {
    // * Если бой в сетевом режиме и ещё не зарегестрирован, то сцена боя не отрисовывается
    if (ANNetwork.isConnected() && BattleManager.nIsNetworkBattle() && !ANBattleManager.isBattleRegistred()) {
      return;
    }
    // * Метод Start вызывается автоматически у SceneManager, поэтому когда
    // * данные прийдут, сцена старт
    _.ALIAS__NET_start.call(this);
    if (ANNetwork.isConnected()) {
      this.nOnBattleStarted();
    }
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    if (ANNetwork.isConnected()) {
      this.nOnBattleEnd();
    }
  };
  //TODO: Есть проблема, ввод доступен, пока ждём сервер battleMethod
  //TODO: Может просто деактивировать все окна? Чтобы нельзя было выбирать действие

  // * Игрок не может видеть команды "ввода" персонажей других игроков
  //@[ALIAS]
  ALIAS__changeInputWindow = _.changeInputWindow;
  _.changeInputWindow = function() {
    ALIAS__changeInputWindow.call(this);
    if (ANNetwork.isConnected() && BattleManager.isInputting() && !$gameParty.isOneBattler()) {
      if (BattleManager.actor() != null) {
        if (BattleManager.actor() !== $gameParty.leader()) {
          this.endCommandSelection();
        }
      }
    }
  };
  
  //@[ALIAS]
  ALIAS__commandFight = _.commandFight;
  _.commandFight = function() {
    if (ANNetwork.isConnected()) {
      // * Игрок снова должен сделать выбор
      BattleManager._isShouldWaitMyNetworkAction = true;
    }
    ALIAS__commandFight.call(this);
  };
  // * Должен идти перед переопределением общим, поэтому в этом файле
  if (KDCore.isMV()) {
    //@[ALIAS]
    ALIAS__updateBattleProcessMV = _.updateBattleProcess;
    _.updateBattleProcess = function() {
      if (ANNetwork.isConnected()) {
        if (!this.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
          this.changeInputWindow();
        }
        return BattleManager.update(); // * Надо обновлять не зависимо от условия вверху
      } else {
        return ALIAS__updateBattleProcessMV.call(this);
      }
    };
  }
  //@[ALIAS]
  ALIAS__updateBattleProcess = _.updateBattleProcess;
  _.updateBattleProcess = function() {
    // * На данный момент, если игрок один в битве, то он ничего не отравляет на сервер
    if (ANNetwork.isConnected()) {
      if ($gameParty.isOneBattler()) {
        // * Только обновлять данные HP и MP другим игрокам
        $gameParty.leader().updateDataObserver();
      } else {
        // * Логика сетевого боя (общая для мастера и клиентов)
        this.nUpdateBattleProcess();
        if (ANGameManager.isBattleMaster()) {
          ANBattleManager.update();
          // * Если ждём сервер, то не обновляем BattleManager
          if (ANBattleManager.isShouldWaitServer()) {
            return;
          }
        } else {
          // * BattleManager update (ALIAS__updateBattleProcess) выполняет только мастер битвы
          if (!BattleManager.nIsLocalForceUpdatePhase()) {
            return;
          }
        }
      }
    }
    ALIAS__updateBattleProcess.call(this);
  };
  
  // * На всякий случай отключу автобитву
  //@[ALIAS]
  ALIAS__updateTpbAutoBattle = _.updateTpbAutoBattle;
  _.updateTpbAutoBattle = function() {
    if (ANNetwork.isConnected()) {

    } else {
      return ALIAS__updateTpbAutoBattle.call(this);
    }
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  // * Когда пришли данные о битве от сервера (регистрация, новый участник)
  // * Этот метод выполняется на клиентах, которые УЖЕ в битве (а не на тех, кто присоединился)
  _.netOn_battle_serverBattleData = function() {
    var battler, battlerId, i, j, len, len1, ref, ref1;
    ref = $gameParty.battleMembers();
    // * Для всех новых, надо выполнять некоторые методы
    for (i = 0, len = ref.length; i < len; i++) {
      battler = ref[i];
      if (!$gameTemp._previousNetBattleActors.contains(battler.actorId())) {
        battler.onBattleStart();
        battler.makeActions();
      }
    }
    ref1 = $gameTemp._previousNetBattleActors;
    // * Всех старых, надо удалить из битвы
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      battlerId = ref1[j];
      if (!ANBattleManager.battleData.actors.contains(battlerId)) {
        $gameParty.removeActor(battlerId);
        BattleManager.nSafeRemoveActor();
      }
    }
    $gameTemp._previousNetBattleActors = [];
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    $gameTemp.requestBattleRefresh();
  };
  _.nOnBattleStarted = function() {
    // * Отправляем на сервер, что мы начали бой
    ANBattleManager.onBattleStarted();
  };
  _.nOnBattleEnd = function() {
    // * Отправляем на сервер, что мы покинули (закончили) бой
    ANBattleManager.onBattleEnd();
  };
  _.nUpdateBattleProcess = function() {
    var actor, enemy, i, j, len, len1, ref, ref1;
    // * За отправку данных отвечает только мастер боя
    if (ANGameManager.isBattleMaster()) {
      ref = $gameParty.battleMembers();
      for (i = 0, len = ref.length; i < len; i++) {
        actor = ref[i];
        actor.updateDataObserver();
      }
      ref1 = $gameTroop.members();
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        enemy = ref1[j];
        enemy.updateDataObserver();
      }
    }
  };
  _.nRefreshSharedBattle = function() {
    // * Обновить спрайты врагов
    return this._spriteset.nRefreshNetBattle();
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  // * Загружаем и инициализируем сетевой код
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    ANET.System.initSystem();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме нельзя переключать персонажей
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Item.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Item.prototype;
})();

// ■ END Scene_Item.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_ItemBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canUse, _;
  //@[DEFINES]
  _ = Scene_ItemBase.prototype;
  //@[ALIAS]
  ALIAS__canUse = _.canUse;
  _.canUse = function() {
    // * Пока нельзя применять навык на другого сетевого игрока
    // * т.к. Observer работает только от другого игрока (эффекта не будет)
    if (ANNetwork.isConnected()) {
      if (this.user() === $gameParty.networkLeader()) {
        return ALIAS__canUse.call(this);
      } else {
        return false;
      }
    } else {
      return ALIAS__canUse.call(this);
    }
  };
})();

// ■ END Scene_ItemBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Load.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__onLoadFailure, ALIAS__terminate, _;
  //@[DEFINES]
  _ = Scene_Load.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected() && $gameTemp._nRequestLoadNetworkGame === true) {
      if (KDCore.isMZ()) {
        this.nLoadNetworkGameFromSavefile(); // * В MV в одном потоке, не переключает сцену сразу после инициализации
      } else {
        setTimeout((() => {
          return this.nLoadNetworkGameFromSavefile();
        }), 1);
      }
    }
  };
  //@[ALIAS]
  ALIAS__onLoadFailure = _.onLoadFailure;
  _.onLoadFailure = function() {
    // * Своя обработка ошибки загрузки в сетевом режиме
    if (ANNetwork.isConnected() && $gameTemp._nRequestLoadNetworkGame === true) {
      this.nOnLoadFailure();
    } else {
      ALIAS__onLoadFailure.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__terminate = _.terminate;
  _.terminate = function() {
    ALIAS__terminate.call(this);
    // * Сбросим флаг
    $gameTemp._nRequestLoadNetworkGame = false;
  };
})();

// ■ END Scene_Load.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Load.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onSavefileOk, _;
  //@[DEFINES]
  _ = Scene_Load.prototype;
  if (KDCore.isMZ()) {
    return;
  }
  // * В MV версии нету проверки на Enabled, так что доп. проверка
  //@[ALIAS]
  ALIAS__onSavefileOk = _.onSavefileOk;
  _.onSavefileOk = function() {
    // * Если сетевое сохранение, то НЕЛЬЗЯ загружать в обычной сцене загрузки
    if (DataManager.nIsNetworkSaveFile(this.savefileId())) {
      this.onLoadFailure();
    } else {
      ALIAS__onSavefileOk.call(this);
    }
  };
  
  // * В MV нету этого метода, добавим и будем использовать для загрузки сетевых сохранений
  //?[NEW]
  _.executeLoad = function(savefileId) {
    if (DataManager.loadGame(savefileId)) {
      this.onLoadSuccess();
    } else {
      this.onLoadFailure();
    }
  };
})();

// ■ END Scene_Load.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Load.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Load.prototype;
  _.nLoadNetworkGameFromSavefile = function() {
    var savefileId;
    savefileId = DataManager.nGetNetworkSaveFileIdByUniqueId(ANNetwork.room.uniqueSaveID);
    if (savefileId < 0) {
      this.nOnLoadFailure();
    } else {
      this.executeLoad(savefileId);
    }
  };
  _.nOnLoadFailure = function() {
    HUIManager.notifyError("Can't load Save file!");
    // * Через timeout а то не успевает, если сразу ошибка
    setTimeout((function() {
      return SceneManager.goto(Scene_Title);
    }), 1);
  };
})();

// ■ END Scene_Load.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, ALIAS__onMapLoaded, ALIAS__onMapTouch, ALIAS__shouldAutosave, ALIAS__stop, ALIAS__updateCallMenu, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    if (ANNetwork.isConnected()) {
      ANGameManager.onMapLoaded();
      $gameParty.nRefreshNetworkActors();
      // * Сбрасываем режим "следовать"
      $gameTemp._netAutoFollowActorId = null;
    }
    // * Открыть (или нет) чат
    ANET.UI.openChatAfterMapLoaded();
    // * На всякий случай (для чата и торговли)
    $gameTemp.kdButtonUnderMouse = null;
    $gameTemp.floatingWindowUnderMouse = null;
    setTimeout((function() {
      $gameTemp.kdButtonUnderMouse = null;
      return $gameTemp.floatingWindowUnderMouse = null;
    }), 10);
  };
  
  // * В сетевом режиме автосхранения отключены
  //@[ALIAS]
  ALIAS__shouldAutosave = _.shouldAutosave;
  _.shouldAutosave = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__shouldAutosave.call(this);
    }
  };
  //@[ALIAS]
  // * Создаём интерфейс
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    if (!ANNetwork.isConnected()) {
      return;
    }
    this._netUI = new ANET.Spriteset_UI();
    this.addChild(this._netUI);
    this.nCreateModalWindow();
  };
  // * Запрет движения при нажатии на UI элементы
  //@[ALIAS]
  ALIAS__onMapTouch = _.onMapTouch;
  _.onMapTouch = function() {
    if (ANNetwork.isConnected()) {
      if (ANET.UI.isUITouched()) {
        return;
      }
    }
    ALIAS__onMapTouch.call(this);
  };
  // * Закрываем интерфейс
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    ANET.UI.terminate();
  };
  //@[ALIAS]
  ALIAS__updateCallMenu = _.updateCallMenu;
  _.updateCallMenu = function() {
    if (TouchInput.isCancelled() && ANNetwork.isConnected()) {
      // * Если действие ANET, то НЕ вызываем меню
      if (this.nOnMapCancelTouchComplete()) {
        return;
      }
    }
    return ALIAS__updateCallMenu.call(this);
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //?EVENT
  // * Когда игрок выходит или входит в комнату (покидает игру)
  _.netOn_lobby_refreshRoomData = function() {
    //TODO: Если игрок отключился, надо общее событие!
    $gameParty.nRefreshNetworkActors();
    $gameMap.refreshNetworkCharacters();
  };
  // * Модальное окно вопроса
  _.nCreateModalWindow = function() {
    //TODO: from parameters
    // * Добавляем на сцену карты (чтобы окно было всегда выше всех)
    this._netUI.netModalDialog = new FWindow_InGameModalDialog(this, 280, 120);
  };
  // * Проверка нажатия правой кнопки мыши
  // * Используется для выполнения своих действий (например открытия меню игрока)
  // * Сейчас этот метод отрабатывает только меню игрока
  // * Устанавливаем на Spriteset_UI, чтобы был доступ проще
  _.nOnMapCancelTouchComplete = function() {
    var e, netCharUnderCursor, x, y;
    if (!ANET.PP.isInGamePlayerMenuAllowed()) {
      return false;
    }
    try {
      if (ANET.UI.isPlayerMenuIsOpen()) {
        ANET.UI.closePlayerMenu();
        return true;
      } else {
        ({x, y} = TouchInput.toMapPoint());
        netCharUnderCursor = $gameMap.nGetNetCharXY(x, y);
        if (netCharUnderCursor == null) {
          return false;
        }
        ANET.UI.playClickEffect();
        ANET.UI.openNetPlayerMenuFor(netCharUnderCursor);
        return true; // * не открывать меню в этом случае
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
    return false;
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Menu.prototype;
})();

// ■ END Scene_Menu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_MenuBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_MenuBase.prototype;
  //?EVENT
  // * Когда пришли какие-либо данные DataObserver
  _.netOn_game_observerData = function() {
    return this.refreshNetwork();
  };
  //?EVENT
  // * Когда игрок выходит или входит в комнату (покидает игру)
  _.netOn_lobby_refreshRoomData = function() {
    var e, ref;
    try {
      $gameParty.nRefreshNetworkActors();
      // * Если есть окно с персонажами, обновить его
      // * Можно было вынести в класс Scene_Menu, но не хочу плодить одинаковые методы
      // * Так как тут в Scene_MenuBase тоже нужен метод
      if ((ref = this._statusWindow) != null) {
        ref.refresh();
      }
    } catch (error) {
      //TODO: Сделать как и в ALphaNET общий Refresh всех окон сцены
      e = error;
      ANET.w(e);
    }
  };
  // * Обновить все окна при изменениях данных из сети
  _.refreshNetwork = function() {
    var child, e, i, len, ref;
    if (!ANNetwork.isConnected()) {
      return;
    }
    try {
      this.updateActor();
      if (this._windowLayer == null) {
        return;
      }
      ref = this._windowLayer.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        if ((child != null) && (child.refresh != null)) {
          child.refresh();
        }
      }
      return;
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Scene_MenuBase.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Сцена ввода сообщения для чата
var Scene_NetChatInput;

Scene_NetChatInput = class Scene_NetChatInput extends Scene_MenuBase {
  constructor() {
    super();
  }

  //%[I] В MV Версии нету кнопки - отправить (ОК), т.е. на телефоне нельзя использовать!
  create() {
    super.create();
    if ($gameTemp._nChatLastChannelId == null) {
      $gameTemp._nChatLastChannelId = 0;
    }
    this._showNameInput();
    this._createGroupButtons();
    this._createOkButton();
    // * Делаем фокус ввода
    setTimeout((function() {
      return HUIManager.focusInput();
    }), 100);
  }

  stop() {
    $gameTemp._nChatLastChannelId = this.buttonsGroup.getSelectedIndex();
    this._hideNameInput();
    return super.stop();
  }

  update() {
    super.update();
    if (Input.isCancel()) {
      this.popScene();
    } else if (Input.isTriggered("ok")) {
      this.onOkClick();
    }
  }

  onOkClick() {
    var msg;
    //%[I] Добавить эмоции (как было в ### Alpha NET ###)
    msg = HUIManager.getInputValue();
    if (String.any(msg)) {
      //TODO: Добавить обрезку по максимальной длине сообщения!
      //%[I] Ограничение длины сообщения
      //TODO: Ограничеть escape символы (чтобы нельзя было переменные выводить)
      //TODO: Заменять \I на мой ICS с параметрами из настроек (размером только)
      this._sendMessageToServer(msg);
    }
    return this.popScene();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetChatInput.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetChatInput.prototype;
  _._sendMessageToServer = function(msg) {
    var channelId, e;
    try {
      channelId = this.buttonsGroup.getSelectedIndex();
      console.log("Send message from chat: " + msg);
      if (ANNetwork.isConnected()) {
        ANGameManager.sendMyChatMessage(channelId, msg);
      }
    } catch (error) {
      e = error;
      AA.w(e);
    }
  };
  _._showNameInput = function() {
    HUIManager.showInput("Enter your message...");
    HUIManager.setInputValue("");
  };
  _._hideNameInput = function() {
    return HUIManager.removeInput();
  };
  //TODO: Customizable
  _._createGroupButtons = function() {
    var y;
    this.buttonsGroup = new AA.Sprite_ButtonsGroup([
      {
        image: "nzButton_ChatGroup_All",
        position: [0,
      0]
      },
      {
        image: "nzButton_ChatGroup_Map",
        position: [100,
      0]
      }
    ], $gameTemp._nChatLastChannelId, null);
    if (KDCore.isMZ()) {
      y = this.buttonY();
    } else {
      y = 6;
    }
    this.buttonsGroup.move(4, y);
    this.addChild(this.buttonsGroup);
  };
  _._createOkButton = function() {
    if (KDCore.isMZ()) {
      this._okButton = new Sprite_Button("ok");
    } else {
      this._okButton = new KDCore.ButtonM("nzButton_ChatSendMV", false, "Alpha");
      this._okButton.addClickHandler(this.onOkClick.bind(this));
      this._okButton.anchor.x = 0.5;
    }
    this._okButton.x = Graphics.boxWidth / 2 - this._okButton.width / 2;
    this._okButton.y = Graphics.boxHeight / 2 - this._okButton.height / 2;
    this.addWindow(this._okButton);
  };
})();

// ■ END Scene_NetChatInput.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Используется базовая сцена Scene_Item (выбора предмета)
var Scene_NetItemsForTrade;

Scene_NetItemsForTrade = class Scene_NetItemsForTrade extends Scene_Item {
  constructor() {
    super();
  }

  //$[OVER]
  onItemOk() {
    this._nItem = this.item();
    this._nCount = 1;
    if ($gameParty.numItems(this._nItem) > 1) {
      this.nShowNumberInputWindow();
    } else {
      this._onItemOkFinal();
    }
  }

  _onItemOkFinal() {
    // * Remove Item handling
    if (this._nItem.id === 0) {
      this._makeChangeInTradeItems(null, 0);
      this.popScene();
    } else if (this._nCount >= 1) {
      this._makeChangeInTradeItems(this._nItem, this._nCount);
      this.popScene();
    } else {
      this._itemWindow.activate();
    }
  }

  _makeChangeInTradeItems(item, count) {
    return ANTradeManager.onTradeChange(item, count);
  }

  
    //?[NEW]
  nShowNumberInputWindow() {
    this._nNumberInputWindow = new Window_NTradeItemNumberInput();
    this.addWindow(this._nNumberInputWindow);
    this._nNumberInputWindow.setItem(this._nItem);
    this._nNumberInputWindow.setOkHandler(() => {
      this._nCount = this._nNumberInputWindow._number;
      return this._onItemOkFinal();
    });
    this._nNumberInputWindow.start();
  }

};

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Scene_NetworkGameMenu;

Scene_NetworkGameMenu = class Scene_NetworkGameMenu extends Scene_MenuBase {
  constructor() {
    super();
    return;
  }

  create() {
    super.create();
    // * Например если вернулись "назад" на эту сцену, то не надо снова соединяться
    if (!ANNetwork.isConnected()) {
      this._initNetwork();
    } else {
      this._initSceneComponents();
      this.refreshWelcomeText();
    }
  }

  update() {
    var ref;
    super.update();
    this._updateBackButton();
    this._updateRandomJoin(); //2
    if ((ref = this._playerCountRefreshThread) != null) {
      ref.update();
    }
  }

  stop() {
    HUIManager.removeInput();
    HUIManager.hideLoader();
    return super.stop();
  }

  refreshWelcomeText() {
    var e, ref;
    try {
      return (ref = this._welcomeLine) != null ? ref.drawTextFull("Welcome, " + ANGameManager.myPlayerData().name) : void 0;
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  }

  refreshPlayersCountText(count = 0) {
    var e;
    try {
      if (this._playerCountText == null) {
        return;
      }
      this._playerCountText.clear();
      return this._playerCountText.drawTextFull("Players on server: " + count);
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  }

  //?EVENT
  netOn_lobby_changePlayerName() {
    var ref;
    this.refreshWelcomeText();
    if ((ref = this._playerCountRefreshThread) != null) {
      ref.call();
    }
  }

  //?EVENT
  // * Когда игрок выходит или входит в комнату
  // * Этот метод тут, чтобы перекрыть Scene_MenuBase реализацию
  // * Так как пока нет необходимости $gameParty менять
  netOn_lobby_refreshRoomData() {} // * NOTHING

};

(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  _._initNetwork = function() {
    HUIManager.showLoader();
    ANNetwork.initSystem();
    ANNetwork.setConnection(this._onConnectionStatus.bind(this));
  };
  //?EVENT
  // * 0 - error, 1 - connect
  _._onConnectionStatus = function(statusCode) {
    switch (statusCode) {
      case 0:
        this._onConnectionRefused();
        break;
      case 1:
        this._onConnectionGood();
    }
  };
  _._onConnectionRefused = function() {
    HUIManager.hideLoader();
    HUIManager.notifyError("Server not response in time");
    return this.popScene();
  };
  _._onConnectionGood = function() {
    //TODO: Server version check
    HUIManager.hideLoader();
    if (!ANGameManager.isInited()) {
      ANGameManager.init();
    }
    HUIManager.notifySucess("Connected to server");
    return this._initSceneComponents();
  };
  // * Отрисовка меню, если соединение  было установлено
  _._initSceneComponents = function() {
    this._createNetworkMenu(); //1
    this._createWelcomeText(); //1
    HUIManager.showInput("Room Name...");
    this._createServerPlayerCountText();
    this._createPlayerCountRefreshThread();
  };
  _._updateBackButton = function() {
    var ref;
    if (KDCore.isMV()) {
      return;
    }
    // * Тут может быть вылет, если нет проверки null (?)
    return (ref = this._cancelButton) != null ? ref.visible = !HUIManager.isLoaderActive() : void 0;
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  _._createWelcomeText = function() {
    //TODO: From UI Text Component with user settings
    this._welcomeLine = KDCore.Sprite.FromBitmap(400, 60);
    this._welcomeLine.bitmap.fontSize = 38;
    this._welcomeLine.x = Graphics.width / 2 - this._welcomeLine.bitmap.width / 2;
    this._welcomeLine.y = 80;
    return this.addChild(this._welcomeLine);
  };
  _._createNetworkMenu = function() {
    var rect, wh, ww, wx, wy;
    ww = 400;
    wh = this.calcWindowHeight(4, true);
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._commandsWindow = new Window_NetworkGameMenu(rect);
    this._commandsWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandsWindow.setHandler('createRoom', this.commandCreateRoomMenu.bind(this));
    this._commandsWindow.setHandler('joinRoom', this.commandJoinRoomMenu.bind(this));
    this._commandsWindow.setHandler('joinRandRoom', this.commandJoinRandRoomMenu.bind(this)); //2
    this._commandsWindow.setHandler('settings', this.commandSettings.bind(this));
    return this.addWindow(this._commandsWindow);
  };
  _._createServerPlayerCountText = function() {
    this._playerCountText = KDCore.Sprite.FromBitmap(280, 40);
    this._playerCountText.bitmap.fontSize = 18;
    this._playerCountText.x = Graphics.width / 2 - this._playerCountText.bitmap.width / 2;
    this._playerCountText.y = this._commandsWindow.y + this._commandsWindow.height + 20;
    return this.addChild(this._playerCountText);
  };
  _._createPlayerCountRefreshThread = function() {
    var refreshMethod;
    refreshMethod = function() {
      //return if SceneManager.isSceneChanging()
      return ANNetwork.callback(NMS.Lobby("playersCountOnServ"), (count) => {
        var e;
        try {
          if (SceneManager.isSceneChanging()) {
            return;
          }
          return this.refreshPlayersCountText(count);
        } catch (error) {
          e = error;
          return ANET.w(e);
        }
      });
    };
    this._playerCountRefreshThread = new KDCore.TimedUpdate(300, refreshMethod.bind(this));
    this._playerCountRefreshThread.call();
  };
  _.commandCreateRoomMenu = function() {
    // * Сохраняем название команты
    $gameTemp._nLastRoomName = HUIManager.getInputValue();
    $gameTemp._nIsForwardTransitionToRoomTypeMenu = true;
    SceneManager.push(Scene_NetworkRoomTypeSelect);
  };
  _.commandJoinRoomMenu = function() {
    return SceneManager.push(Scene_NetworkRoomsList);
  };
  _.commandSettings = function() {
    return SceneManager.push(Scene_NetworkSettings);
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkGameMenu.prototype;
  // * Методы обработки подключения к случайной комнате
  _.commandJoinRandRoomMenu = function() {
    this.roomsList = null; // * Обнуляем список комнат
    this.requestRoomsListFromServer();
    this._waitRoomsForRandomJoin = true;
  };
  _.requestRoomsListFromServer = function() {
    ANNetwork.get(NMS.Lobby("getRoomsList"), (result) => {
      return this.roomsList = result;
    }, () => {
      // * Timeout
      console.log("Server not returns rooms list in time");
      return this._onCantJointRandomRoom();
    });
  };
  _._onCantJointRandomRoom = function() {
    this._waitRoomsForRandomJoin = false;
    this._commandsWindow.activate();
    HUIManager.notifyError("No available open rooms to join");
  };
  // * Ждём список комнат и пытаемся подключиться к случайной
  _._updateRandomJoin = function() {
    var randomRoomName;
    if (!this._waitRoomsForRandomJoin) {
      return;
    }
    if (this.roomsList == null) {
      return;
    }
    this._waitRoomsForRandomJoin = false;
    this.applyFiltersToRoomList();
    if (this.roomsList.length === 0) {
      this._onCantJointRandomRoom();
    } else {
      randomRoomName = this.roomsList.sample().name;
      this.joinToRoomRequest(randomRoomName);
    }
  };
  _.applyFiltersToRoomList = function() {
    if (this.roomsList == null) {
      this.roomsList = [];
    }
    if (this.roomsList.length === 0) {
      return;
    }
    this.roomsList = this.roomsList.filter((r) => {
      return this.isProperRoomToJoin(r);
    });
  };
  _.isProperRoomToJoin = function(roomData) {
    return NetRoomDataWrapper.isRoomProperToJoin(roomData);
  };
  _.joinToRoomRequest = function(roomName) {
    ANNetwork.get(NMS.Lobby("joinToRoom", roomName), (result) => {
      return this._onJoinedToRoom(result);
    }, () => {
      console.log("Can't join to Room, server not response in time");
      return this._commandsWindow.activate();
    });
  };
  //?EVENT
  _._onJoinedToRoom = function(roomData) {
    if (roomData == null) {
      console.log("Can't join to Room, Room not exists anymore");
      this._commandsWindow.activate();
    } else {
      ANNetwork.setRoomJoin(roomData);
      SceneManager.push(Scene_NetworkRoom);
    }
  };
})();

// ■ END Scene_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkInGameTrade.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

//%[I] Сейчас сцена торговли использует доп. сцену выбора предметов (стандартную)
// * Это не очень правильно, стоит сделать всё на одной сцене!
var Scene_NetworkInGameTrade;

Scene_NetworkInGameTrade = class Scene_NetworkInGameTrade extends Scene_MenuBase {
  constructor() {
    super();
  }

  //?EVENT
  netOn_game_playersData() {}

  //?EVENT COMMON
  // * Изменились данные другого игрока, возможно он вышел из сцены торговли
  // * либо disconnect
  // * Тут можно делать доп. проверку
  netOn_common_forClients_trade_items() {
    this.onAnotherPlayerChangeItems();
  }

  //?EVENT COMMON
  netOn_common_forClients_trade_status() {
    this.onAnotherPlayerChangeStatus();
  }

  //?EVENT COMMON
  netOn_common_trade_complete() {
    setTimeout((() => {
      return this.onTradeCancel();
    }), 10);
  }

  create() {
    super.create();
    this._inReadyState = false;
    this._preloadResources();
    this._createBackgroundParts();
    this._createActorInfoA();
    this._createActorInfoB();
    this._createTradeWindowA();
    this._createTradeWindowB();
    this._createForegroundParts();
    this.checkAnotherPlayerSceneStateThread = new KDCore.TimedUpdate(30, this._checkAnotherPlayerSceneStateTick.bind(this));
  }

  //TODO: parameters
  getSettings() {
    return {
      tradeWindowSize: {
        w: 240,
        h: 300
      }
    };
  }

  //%[I] Показывать текущее количество золота игрока, чтобы было удобней
  onTradeCancel() {
    "CANCEL".p();
    return this.popScene();
  }

  //@[OUTER] Вызывается когда приходят данные с сервера в ANTradeManager
  onAnotherPlayerChangeItems() {
    // * Если я уже был готов, то сброс и снова активация окна
    if (this._inReadyState === true) {
      this._resetTradeReadyStatus();
    }
    // * Обновить список торговли (предметов) другого игрока
    this.tradeWindowB.sub().refresh();
  }

  //@[OUTER] Вызывается когда другой игро меняет свой статус (готов или нет)
  onAnotherPlayerChangeStatus() {
    // * Если я уже был готов и статус положительный, то торговля удалась
    if (this._inReadyState === true) {
      if ($gameTemp._netHisTradeReadyStatus === true) {
        ANTradeManager.onTradeShouldComplete();
        // * Так как Common - это broadcast, то у себя сам вызываю метод завершения торговли
        this.netOn_common_trade_complete();
      } else {
        this._resetTradeReadyStatus();
      }
    }
    this.tradeWindowB.sub().refresh();
  }

  update() {
    var ref;
    super.update();
    return (ref = this.checkAnotherPlayerSceneStateThread) != null ? ref.update() : void 0;
  }

  //! Этот метод вызывается и когда появляется сцена выбора предмета!
  stop() {
    var ref, ref1;
    super.stop();
    // * Косяк KDCore
    $gameTemp.kdButtonUnderMouse = null;
    // * Это надо обязательно, чтобы не остался в Game_Temp
    if ((ref = this.tradeWindowA) != null) {
      ref.close();
    }
    if ((ref1 = this.tradeWindowB) != null) {
      ref1.close();
    }
    // * На всякий случай
    HUIManager.hideWaitingInfo();
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Scene_NetworkInGameTrade.prototype;
  _._checkAnotherPlayerSceneStateTick = function() {
    var e;
    try {
      if (!ANTradeManager.isTradeParticipantIsValid()) {
        return this.onTradeCancel();
      }
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  _._preloadResources = function() {
    //TODO: from parameters
    ImageManager.loadAA("nzTradeButton_00");
    ImageManager.loadAA("nzTradeButton_01");
    ImageManager.loadAA("nzTradeStatus_NotReady");
    ImageManager.loadAA("nzTradeStatus_Ready");
  };
  _._createBackgroundParts = function() {
    var i, item, len, parts;
    parts = [
      {
        image: "nzTradeWindowPortraitBack",
        position: {
          x: 216,
          y: 72
        }
      },
      {
        image: "nzTradeWindowPortraitBack",
        position: {
          x: 456,
          y: 72
        }
      }
    ];
    for (i = 0, len = parts.length; i < len; i++) {
      item = parts[i];
      this._createAndAddImage(item);
    }
  };
  // * {image, position {x, y}}
  _._createAndAddImage = function(item) {
    var img, x, y;
    img = new AA.Sprite_UIImage({
      visible: true,
      image: item.image
    });
    x = eval(item.position.x);
    y = eval(item.position.y);
    img.x = x;
    img.y = y;
    this.addChild(img);
  };
  _._createActorInfoA = function() {
    var actor, actorAFace;
    actor = $gameParty.networkLeader();
    actorAFace = new AA.Sprite_UIFace({
      visible: true,
      faceName: actor.faceName(),
      faceIndex: actor.faceIndex(),
      mirror: true,
      size: 130
    });
    actorAFace.move(220, 76);
    return this.addChild(actorAFace);
  };
  _._createActorInfoB = function() {
    var actor, actorBFace;
    actor = nAPI.getPlayerInfo("actor", "info", ANTradeManager.getTradeParticipantData());
    actorBFace = new AA.Sprite_UIFace({
      visible: true,
      faceName: actor.faceName(),
      faceIndex: actor.faceIndex(),
      mirror: false,
      size: 130
    });
    actorBFace.move(462, 76);
    return this.addChild(actorBFace);
  };
  _._createTradeWindowA = function() {
    var size, tradeListWindow;
    size = new Rectangle(0, 0, 240, 300);
    tradeListWindow = new Window_NTradeItemsList(size, 0);
    tradeListWindow.setHandler('ok', this._onTradeWindowA_ok.bind(this));
    tradeListWindow.setHandler('cancel', this.onTradeCancel.bind(this));
    tradeListWindow.refresh();
    tradeListWindow.select(1); // * first slot for item
    tradeListWindow.activate();
    this.tradeWindowA = AA.FloatingWindow.StaticWindow(this, tradeListWindow);
    this.tradeWindowA.x = (Graphics.width / 2 - 240) - 30;
    this.tradeWindowA.y = (Graphics.height / 2) - 100;
    this.tradeWindowA.open();
  };
  //%[Обработка нажатия на пункт]
  _._onTradeWindowA_ok = function() {
    var index;
    index = this.tradeWindowA.sub().index();
    // * Запоминаем индекс выбранного пункта
    $gameTemp.__netTradeItemIndex = index;
    if (this.tradeWindowA.sub().isCurrentIndexTradeCommand()) {
      this._onTradeConfirmClick();
    } else if (this.tradeWindowA.sub().isCurrentIndexGoldCommand()) {
      this._nNumberInputWindow = new Window_NTradeItemNumberInput();
      this.addWindow(this._nNumberInputWindow);
      // * For Gold
      this._nNumberInputWindow.setItem({
        id: ANTradeManager.TradeGoldItemId
      });
      this._nNumberInputWindow.setOkHandler(() => {
        var count;
        count = this._nNumberInputWindow._number;
        return this._onGoldNumberChanged(count);
      });
      this.tradeWindowA.close();
      this.tradeWindowB.close();
      this._nNumberInputWindow.start();
    } else {
      SceneManager.push(Scene_NetItemsForTrade);
    }
  };
  _._onTradeConfirmClick = function() {
    var e, name;
    try {
      //%[I] Скрывать кнопку "Назад" при ожидании
      //%[I] Анимированный текст ... (три точки) в надписи ожидания
      name = ANTradeManager.getTradeParticipantData().name; // * get other trade parctipian name
      HUIManager.showWaitingInfo('Waiting ' + name, '');
      this._inReadyState = true;
      ANTradeManager.onTradeReady(true);
    } catch (error) {
      e = error;
      ANET.w(e);
      this.onTradeCancel();
    }
  };
  _._onGoldNumberChanged = function(count) {
    ANTradeManager.onTradeChange({
      id: ANTradeManager.TradeGoldItemId
    }, count);
    this.tradeWindowA.open();
    this.tradeWindowB.open();
    this.tradeWindowA.sub().refresh();
    this.tradeWindowA.sub().activate();
  };
  _._createTradeWindowB = function() {
    var size, tradeListWindow;
    size = new Rectangle(0, 0, 240, 300);
    tradeListWindow = new Window_NTradeItemsList(size, 1);
    tradeListWindow.refresh();
    this.tradeWindowB = AA.FloatingWindow.StaticWindow(this, tradeListWindow);
    this.tradeWindowB.x = (Graphics.width / 2) + 30;
    this.tradeWindowB.y = this.tradeWindowA.y;
    this.tradeWindowB.open();
  };
  _._createForegroundParts = function() {
    var i, item, len, parts;
    parts = [
      {
        image: "nzTradeHeader",
        position: {
          x: "Graphics.width / 2 - 334",
          y: -26
        }
      }
    ];
    for (i = 0, len = parts.length; i < len; i++) {
      item = parts[i];
      this._createAndAddImage(item);
    }
  };
  _._resetTradeReadyStatus = function() {
    this._inReadyState = false;
    HUIManager.hideWaitingInfo();
    this.tradeWindowA.sub().activate();
    return ANTradeManager.onTradeReady(false);
  };
})();

// ■ END Scene_NetworkInGameTrade.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
var Scene_NetworkRoom;

Scene_NetworkRoom = class Scene_NetworkRoom extends Scene_MenuBase {
  constructor() {
    super();
    this._startingGameTransition = false;
  }

  create() {
    super.create();
    this.room = ANNetwork.room;
    this.createRoomTitle();
    this.createCommands();
    this.createPlayersList();
    if (ANET.PP.isActorSelectionAllowed() && !this.isLoadGame()) {
      this.createActorSelectWindow();
    }
    if (this.isLoadGame()) {
      this.prepareSaveFile();
    }
    this.refreshRoom();
  }

  start() {
    super.start();
    ANNetwork.requestRoomRefresh();
    // * Так как есть искуственная задержка загрузки сцены на MV
    if (KDCore.isMV()) {
      setTimeout((function() {
        try {
          return ANNetwork.requestRoomRefresh();
        } catch (error) {

        }
      }), 300);
    }
  }

  isBottomHelpMode() {
    return false;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  refreshRoom() {
    this.room = ANNetwork.room;
    this._refreshRoomTitle();
    this._refreshPlayerList();
    this._refreshActorsList();
    return this._windowCommands.refresh();
  }

  //?EVENT
  // * Когда игрок выходит или входит в комнату
  netOn_lobby_refreshRoomData() {
    // * Пришли данные о комнате (и игроках), надо обновить
    return this.refreshRoom();
  }

  //?EVENT
  // * Когда игрок выбирает персонажа
  netOn_game_playersData() {
    // * Пришли данные о комнате (и игроках), надо обновить
    return this.refreshRoom();
  }

  //?EVENT
  netOn_lobby_startGame() {
    this._startingGameTransition = true;
    if (this.isLoadGame()) {
      this.loadAndStartGame();
    } else {
      this.startNewGame();
    }
  }

  //?EVENT
  // * Когда закрывается комната, вызывается это событие
  netOn_lobby_roomClosed() {
    if (!this._shouldNotPopScene) {
      // * Из этой сцены мы возвращаемся в сетевое меню (если мы не мастер)
      // * Для мастера не надо, так как сцена и так закрывается сама и получается
      // * что возврат происходит на Scene_Title
      return this.popScene();
    }
  }

  update() {
    return super.update();
  }

  //TODO: Готов клиент или нет
  //if ANNetwork.isMasterClient() and Input.isTriggered('ok')
  //    ANNetwork.send(NMS.Lobby("startGame"))
  stop() {
    super.stop();
    // * Если TRUE - значит мы переходим на сцену с игрой и не надо закрывать коммнату
    if (this._startingGameTransition === true) {
      return;
    }
    if (ANNetwork.isMasterClient()) {
      this._shouldNotPopScene = true;
      return ANNetwork.closeRoom();
    } else {
      return ANNetwork.leaveRoom();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetworkRoom.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoom.prototype;
  _.startNewGame = function() {
    // * Сейчас нету _commandWindow, так что временно создадим его чтобы не было ошибки
    this._commandWindow = {
      close: function() {}
    };
    Scene_Title.prototype.commandNewGame.call(this);
  };
  _.loadAndStartGame = function() {
    // * Задаём флаг, что будем загружать сетевую игру
    $gameTemp._nRequestLoadNetworkGame = true;
    SceneManager.push(Scene_Load);
  };
  _.createRoomTitle = function() {
    this.createHelpWindow();
    return this._refreshRoomTitle();
  };
  _._refreshRoomTitle = function() {
    var ref, roomHostName;
    if (ANNetwork.isMasterClient()) {
      roomHostName = "\\C[1]" + ANGameManager.myPlayerData().name + " (you)";
    } else {
      if (this.room == null) {
        roomHostName = "Fetching...";
      } else {
        roomHostName = (ref = ANGameManager.getPlayerDataById(this.room.masterId)) != null ? ref.name : void 0;
      }
    }
    return this._helpWindow.setText("Room: %1, Host: %2".format(ANNetwork.room.name, roomHostName));
  };
  _._refreshPlayerList = function() {
    this._playersListWindow.refresh();
  };
  _.createCommands = function() {
    this._windowCommands = new Window_NetworkRoomCommands(new Rectangle(0, this._helpWindow.y + this._helpWindow.height, 600, 100));
    this._windowCommands.setHandler('cancel', this.popScene.bind(this));
    this._windowCommands.setHandler('leave', this.popScene.bind(this));
    this._windowCommands.setHandler('start', this._onStartRoomCommand.bind(this));
    this._windowCommands.setHandler('ready', this._onReadyInRoomCommand.bind(this));
    this._windowCommands.setHandler('character', this._onCharacterSelectCommand.bind(this));
    this.addWindow(this._windowCommands);
    this._windowCommands.activate();
  };
  _._onStartRoomCommand = function() {
    if (this._isAllInRoomReady()) { // TODO: В Wrapper, так как окно тоже проверяет
      if (ANNetwork.isMasterClient()) {
        ANNetwork.send(NMS.Lobby("startGame"));
      }
    } else {
      this._windowCommands.activate();
    }
  };
  _._onReadyInRoomCommand = function() {};
  //TODO: Ничего пока нет
  _._onCharacterSelectCommand = function() {
    this._windowActorsList.show();
    this._windowActorsList.open();
    this._windowActorsList.activate();
    return this._playersListWindow.close();
  };
  //TODO: Флаги готовности, сбрасывать при нажатии Character
  // * См. readyPlayersIds у данных комнаты
  _._isAllInRoomReady = function() {
    return true;
  };
  _.createActorSelectWindow = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 260;
    wx = 50;
    wy = 240;
    this._windowActorsList = new Window_NetworkActorsList(new Rectangle(wx, wy, ww, wh));
    this._windowActorsList.setHandler('cancel', this._onActorSelectCancel.bind(this));
    this._windowActorsList.setHandler('ok', this._onActorSelectOk.bind(this));
    this._windowActorsList.hide();
    return this.addWindow(this._windowActorsList);
  };
  _._onActorSelectCancel = function() {
    return this._cancelActorSelection();
  };
  _._cancelActorSelection = function() {
    this._windowActorsList.close();
    this._windowCommands.activate();
    return this._playersListWindow.open();
  };
  _._onActorSelectOk = function() {
    var selectedActorId;
    selectedActorId = this._windowActorsList.selectedActorId();
    if (selectedActorId <= 0) {
      SoundManager.playBuzzer();
      this._windowActorsList.activate();
    } else {
      ANPlayersManager.sendBindActorFromLobby(selectedActorId, this._onBindActorResult.bind(this));
    }
  };
  _._onBindActorResult = function(resultFlag) {
    if (resultFlag === true) {
      this._cancelActorSelection();
    } else {
      SoundManager.playBuzzer();
      this._windowActorsList.activate();
    }
    this.refreshRoom();
  };
  _._refreshActorsList = function() {
    var ref;
    return (ref = this._windowActorsList) != null ? ref.refresh() : void 0;
  };
  _.createPlayersList = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 260;
    wx = 50;
    wy = 240;
    this._playersListWindow = new Window_NetworkRoomPlayersList(new Rectangle(wx, wy, ww, wh));
    this.addWindow(this._playersListWindow);
    this._refreshPlayerList();
  };
  _.prepareSaveFile = function() {
    var info;
    info = DataManager.nGetNetworkSaveInfoWithId(this.room.uniqueSaveID);
    if (info == null) {
      HUIManager.notifyError("Save file data not found!");
      console.warn("Save file with ID " + this.room.uniqueSaveID + " not found!");
      this.popScene.bind(this);
    } else {
      //TODO: На сервере нет проверки на занятость персонажа??? НЕТУ в 112
      ANPlayersManager.sendBindActorFromLobby(info.nMyActorId, this.onBindLoadedActorResult.bind(this));
    }
  };
  _.onBindLoadedActorResult = function(resultFlag) {
    if (resultFlag === false) {
      SoundManager.playBuzzer();
      HUIManager.notifyError("Can't load Actor data or Actor already used by another player");
      this.popScene.bind(this);
    } else {
      this.refreshRoom();
    }
  };
})();

// ■ END Scene_NetworkRoom.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Сцена со списком комнат на сервере
var Scene_NetworkRoomsList;

Scene_NetworkRoomsList = class Scene_NetworkRoomsList extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    //TODO: Потом сделать чтобы сервер сам отправлял когда меняется список комнат
    // * Сейчас опасно, так как может быть уже 4 из 4, а информация не обновилась
    this._refreshRoomsListThread = new KDCore.TimedUpdate(60, this._requestRoomsListFromServer.bind(this));
    this._createRoomsList();
    this._requestRoomsListFromServer();
  }

  refreshRooms() {
    if (ANET.PP.isRoomFilterON()) {
      this.applyFilterToRooms();
    }
    return this._roomsListWindow.refreshRooms(this.roomsList);
  }

  //?VERSION
  applyFilterToRooms() {}

  update() {
    super.update();
    return this._refreshRoomsListThread.update();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoomsList.prototype;
  _._requestRoomsListFromServer = function() {
    // * В первый раз показываем Loader
    if (this.roomsList == null) {
      HUIManager.showLoader();
    }
    ANNetwork.callback(NMS.Lobby("getRoomsList"), (result) => {
      // * Если сцена была закрыта, а комнаты пришли
      if (!(SceneManager._scene instanceof Scene_NetworkRoomsList)) {
        return;
      }
      this.roomsList = result;
      if (this.roomsList == null) {
        return;
      }
      this.refreshRooms();
      return HUIManager.hideLoader();
    });
    this.refreshRooms();
  };
  _._createRoomsList = function() {
    var wh, ww, wx, wy;
    ww = Graphics.width - 100;
    wh = Graphics.height - 140;
    wx = 50;
    wy = 70;
    this._roomsListWindow = new Window_NetworkRoomsList(new Rectangle(wx, wy, ww, wh));
    this._roomsListWindow.setHandler('cancel', this.popScene.bind(this));
    this._roomsListWindow.setHandler('ok', this._onJoinRoomCommand.bind(this));
    this._roomsListWindow.activate();
    return this.addWindow(this._roomsListWindow);
  };
  _._onJoinRoomCommand = function() {
    var roomData;
    roomData = this._roomsListWindow.getSelectedRoom();
    if (NetRoomDataWrapper.isRoomProperToJoin(roomData)) {
      ANNetwork.get(NMS.Lobby("joinToRoom", roomData.name), (result) => {
        return this._onJoinedToRoom(result);
      }, () => {
        console.log("Can't join to Room, server not response in time");
        return this._roomsListWindow.activate();
      });
    } else {
      SoundManager.playBuzzer();
      this._roomsListWindow.activate();
    }
  };
  
  //?EVENT
  _._onJoinedToRoom = function(roomData) {
    if (roomData == null) {
      console.log("Can't join to Room, Room not exists anymore");
      this._roomsListWindow.activate();
    } else {
      ANNetwork.setRoomJoin(roomData);
      SceneManager.push(Scene_NetworkRoom);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

//TODO: События на обработку: список комнат обновлися, успешное подключение, плохое подключение

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_NetworkRoomTypeSelect.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Сцена выбора "Новая игра" или "Загрузить" после выбора "Создать комнату"

//TODO: Если опция по возможности сохранения отключена, надо сразу перепрыгивать эту сцену
var Scene_NetworkRoomTypeSelect;

Scene_NetworkRoomTypeSelect = class Scene_NetworkRoomTypeSelect extends Scene_MenuBase {
  constructor() {
    super();
  }

  //TODO: Заголовок какой-нибудь ???
  create() {
    super.create();
    // * Если параметр выключен (сохранять и загружать нельзя), то пропуск данной сцены
    if (!ANET.PP.isSaveLoadAllowed()) {
      // * Если мы входим в сцену, то пропуск сразу в комнату
      if ($gameTemp._nIsForwardTransitionToRoomTypeMenu === true) {
        $gameTemp._nIsForwardTransitionToRoomTypeMenu = null;
        this.commandNewGame();
      } else {
        this.popScene(); // * Выход, не нужны компоненты сцены
      }
      return;
    }
    this._initSceneComponents();
  }

};

(function() {  // ■ END Scene_NetworkRoomTypeSelect.coffee
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkRoomTypeSelect.prototype;
  _._initSceneComponents = function() {
    this._createRoomTypeSelectMenu();
    return this._createGamesToLoadList();
  };
  _._createRoomTypeSelectMenu = function() {
    var rect, wh, ww, wx, wy;
    ww = 400;
    if (KDCore.isMV()) {
      wh = this.calcWindowHeight(2, true);
    } else {
      // * Хоть команды 2, используется 4, чтобы сразу под курсором была команда
      wh = this.calcWindowHeight(4, true);
    }
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._commandsWindow = new Window_NetworkRoomTypeMenu(rect);
    this._commandsWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandsWindow.setHandler('newGame', this.commandNewGame.bind(this));
    this._commandsWindow.setHandler('continue', this.commandContinue.bind(this));
    return this.addWindow(this._commandsWindow);
  };
  _.commandNewGame = function() {
    this._createNewRoom(null); // * новая игра
  };
  _.commandContinue = function() {
    this._commandsWindow.hide();
    this._listWindow.show();
    this._listWindow.activate();
  };
  _._createNewRoom = function(uniqueSaveId) {
    var newRoomData, roomName;
    // * Используем название команаты с предыдущей сцены
    roomName = $gameTemp._nLastRoomName;
    if (!String.any(roomName)) {
      roomName = "Room_" + Math.randomInt(1000);
    }
    $gameTemp._nLastRoomName = null; // * очищаем
    
    // * Собираем данные об новой комнате
    newRoomData = {
      name: roomName,
      gameInfo: ANNetwork.getNetworkGameInfoData(),
      uniqueSaveID: uniqueSaveId
    };
    // * Отправляем данные об текущей игре (клиенте)
    ANNetwork.get(NMS.Lobby("createRoom", newRoomData), (result) => {
      return this._onRoomCreated(result);
    }, () => {
      console.log("Can't create Room, server not response in time");
      return this._commandsWindow.activate();
    });
  };
  //?EVENT
  _._onRoomCreated = function(roomData) {
    if (roomData != null) {
      ANNetwork.setRoomMaster(roomData);
      SceneManager.push(Scene_NetworkRoom);
    } else {
      HUIManager.notifyError("Can't create room with name: " + this._lastRoomName);
      this._commandsWindow.activate();
    }
  };
  _._createGamesToLoadList = function() {
    var rect, wh, ww, wx, wy;
    ww = Graphics.boxWidth - 100;
    if (KDCore.isMZ()) {
      wh = this.mainAreaHeight();
    } else {
      wh = Graphics.height - 20;
    }
    wx = (Graphics.boxWidth - ww) / 2;
    wy = (Graphics.boxHeight - wh) / 2;
    rect = new Rectangle(wx, wy, ww, wh);
    this._listWindow = new Window_SavefileList(rect);
    this._listWindow.setHandler("ok", this.onLoadFileSelected.bind(this));
    this._listWindow.setHandler("cancel", this.onLoadFileSelectCancel.bind(this));
    this._listWindow.setMode("loadNet", false);
    if (KDCore.isMZ()) {
      this._listWindow.selectSavefile(0);
    } else {
      this._listWindow.select(0);
    }
    this._listWindow.refresh();
    this._listWindow.hide();
    this.addWindow(this._listWindow);
  };
  _.onLoadFileSelected = function() {
    var info, savefileId;
    if (KDCore.isMZ()) {
      savefileId = this._listWindow.savefileId();
    } else {
      savefileId = this._listWindow.index() + 1;
    }
    if (DataManager.nIsNetworkSaveFile(savefileId)) {
      info = DataManager.nGetInfoForSavefileId(savefileId);
      this._createNewRoom(info.nUniqueSaveID);
    } else {
      SoundManager.playBuzzer();
      this._listWindow.activate();
    }
  };
  _.onLoadFileSelectCancel = function() {
    this._listWindow.hide();
    this._commandsWindow.show();
    this._commandsWindow.activate();
  };
})();

// Generated by CoffeeScript 2.6.1
// * Сцена настроек для сетевой игры

//TODO: Пока что просто ввод имени игрока
var Scene_NetworkSettings;

Scene_NetworkSettings = class Scene_NetworkSettings extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    return this._showNameInput();
  }

  stop() {
    this._savePlayerName();
    this._hideNameInput();
    return super.stop();
  }

  update() {
    super.update();
    if (Input.isCancel() || Input.isTriggered('ok')) {
      return this.popScene();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Scene_NetworkSettings.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Scene_NetworkSettings.prototype;
  _._showNameInput = function() {
    HUIManager.showInput("Enter your name for network...");
    HUIManager.setInputValue(ANGameManager.myPlayerData().name);
  };
  _._savePlayerName = function() {
    var newName;
    newName = HUIManager.getInputValue();
    if (String.any(newName)) {
      ANGameManager.myPlayerData().name = newName;
      // * Отправим на сервер
      ANPlayersManager.sendPlayerName();
      ConfigManager.netPlayerName = newName;
      ConfigManager.save();
    }
  };
  _._hideNameInput = function() {
    return HUIManager.removeInput();
  };
})();

// ■ END Scene_NetworkSettings.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Save.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onSavefileOk, ALIAS__stop, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Save.prototype;
  //TODO: В MV по другому скорее всего, не помню этот метод

  // * В MV нету метода executeSave, создадим его для совместимости
  if (KDCore.isMV()) {
    //?[NEW, from MZ]
    _.executeSave = function(savefileId) {
      $gameSystem.onBeforeSave();
      if (DataManager.saveGame(savefileId)) {
        this.onSaveSuccess();
      } else {
        this.onSaveFailure();
      }
    };
    // * Переопределим стандартный метод (только в МВ)
    // * Теперь в сетевом режиме он будет использовать новый метод executeSave
    //@[ALIAS]
    ALIAS__onSavefileOk = _.onSavefileOk;
    _.onSavefileOk = function() {
      if (ANNetwork.isConnected()) {
        Scene_File.prototype.onSavefileOk.call(this);
        this.executeSave(this.savefileId());
      } else {
        ALIAS__onSavefileOk.call(this);
      }
    };
  }
  //@[ALIAS, STORED]
  _.nALIAS__executeSave_43243 = _.executeSave;
  _.executeSave = function(savefileId) {
    if (ANNetwork.isConnected()) {
      if (ANET.PP.isSaveOnlyInMenu()) {
        //TODO:
        //@nRequestClientsStatesForSave(savefileId)
        this.nExecuteNetworkSave(savefileId);
      } else {
        this.nExecuteNetworkSave(savefileId);
      }
    } else {
      _.nALIAS__executeSave_43243.call(this, savefileId);
    }
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (!ANNetwork.isConnected()) {
      return;
    }
    if (this.nSaveDataPool == null) {
      return;
    }
    this.nUpdateSavePool();
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    this.nClearTempSaveData();
  };
})();

// ■ END Scene_Save.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Save.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Save.prototype;
  _.nUpdateSavePool = function() {
    var ref;
    return (ref = this.nSaveDataPool) != null ? ref.update() : void 0;
  };
  _.nCreateTempSaveData = function() {
    // * Делаем глобальную переменную чтобы DataManager мог перехватить данные
    $gameTemp.nSaveData = this.nSaveDataPool;
    // * Чтобы у всех был одинаковый, нужно при опредлении какой файл загружать
    $gameTemp.nUniqueSaveID = ANET.Utils.generateSaveUniqueId();
  };
  _.nClearTempSaveData = function() {
    $gameTemp.nSaveData = null;
    return $gameTemp.nUniqueSaveID = null;
  };
  // * Запросить проверку статуса других игроков
  // * чтобы они не были "заняты" (например битва или событие)
  // * сейчас используется проверка, что все должны быть в меню
  _.nRequestClientsStatesForSave = function(savefileId) {};
  //TODO: пропустим пока что

  // * Отправить всем команду что нужны данные для сохранения
  _.nExecuteNetworkSave = function(savefileId) {
    // * Создаём пул данных сохранений для каждого игрока
    this.nSaveDataPool = new PlayersDataPool(function() {
      return ANGameManager.anotherPlayers();
    });
    // * Задаём сразу свои данные
    this.nSaveDataPool.setMyData(DataManager.makeSaveContents());
    // * Задаём методы callbacks
    this.nSaveDataPool.onFail(() => {
      return this.nOnWaitSaveDataDone(-1); // * fail
    });
    this.nSaveDataPool.onReady(() => {
      return this.nOnWaitSaveDataDone(savefileId);
    });
    this.nCreateTempSaveData();
    // * Посылаем запрос на сервер ($gameTemp.nUniqueSaveID должен быть уже создан)
    this.nSaveDataPool.register(function() {
      return ANGameManager.sendSaveDataRequest(savefileId);
    });
    this.nOnWaitSaveDataStart();
  };
  _.nOnWaitSaveDataStart = function() {
    return HUIManager.showLoader(600);
  };
  _.nOnWaitSaveDataDone = function(savefileId) {
    HUIManager.hideLoader();
    "SAVE DATA RECEIVED".p(savefileId);
    if (savefileId >= 0) {
      // * Вызываем стандартный метод
      _.nALIAS__executeSave_43243.call(this, savefileId);
    } else {
      this.onSaveFailure();
    }
  };
})();

// ■ END Scene_Save.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Skill.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, _;
  //@[DEFINES]
  _ = Scene_Skill.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме нельзя переключать персонажей
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
})();

// ■ END Scene_Skill.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Status.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__needsPageButtons, ALIAS__start, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Status.prototype;
  //@[ALIAS]
  ALIAS__needsPageButtons = _.needsPageButtons;
  _.needsPageButtons = function() {
    // * В сетевом режиме зависит от параметра
    if (ANNetwork.isConnected()) {
      // * Если в режиме просмотра статуса определённого игрока - нет
      if ($gameTemp._netRequestStatusForCertainActorId != null) {
        return false;
      } else {
        return ANET.PP.isOtherPlayersMenuStatusAllowed();
      }
    } else {
      return ALIAS__needsPageButtons.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    var actor;
    ALIAS__start.call(this);
    // * Показываем статус определённого игрока по сети (для Player Menu опции)
    if (ANNetwork.isConnected() && $gameTemp._netRequestStatusForCertainActorId > 0) {
      actor = $gameActors.actor($gameTemp._netRequestStatusForCertainActorId);
      if (actor != null) {
        this._actor = actor;
        this.refreshActor();
      }
    }
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this);
    $gameTemp._netRequestStatusForCertainActorId = null;
  };
})();

// ■ END Scene_Status.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this);
    if (ANNetwork.isConnected()) {
      ANNetwork.stop();
    }
    if (ANET.isDEV()) {
      "Precc C for fast connect".p();
    }
  };
  //@[ALIAS]
  //setTimeout (=>
  //        @nFastConnectToDevRoom()
  //    ), Math.random() * 1000
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (ANET.isDEV()) {
      //TODO: Добавить потом параметр плагина, чтобы люди могли тестить быстро
      return this.nUpdateDebugStart();
    }
  };
  (function() {    // * Добавляем команду сетевой игры в главное меню
    var ALIAS__calcWindowHeight, ALIAS__commandWindowRect, ALIAS__createCommandWindow;
    
    //@[ALIAS]
    ALIAS__createCommandWindow = _.createCommandWindow;
    _.createCommandWindow = function() {
      ALIAS__createCommandWindow.call(this);
      return this._commandWindow.setHandler("network", this.commandNetwork.bind(this));
    };
    //@[ALIAS]
    ALIAS__commandWindowRect = _.commandWindowRect;
    _.commandWindowRect = function() {
      // * little trick to not overwrite method
      this.___isOneMoreCommand = !Imported.VisuMZ_0_CoreEngine;
      return ALIAS__commandWindowRect.call(this);
    };
    //@[ALIAS]
    ALIAS__calcWindowHeight = _.calcWindowHeight;
    _.calcWindowHeight = function(numLines, selectable) {
      if (this.___isOneMoreCommand === true) {
        numLines += 1;
        if (!ANET.PP.isSinglePlayerAllowed()) {
          // * Если одиночная игра не доступна, то нет одной позиции в меню (Новая ира)
          numLines -= 1;
        }
      }
      return ALIAS__calcWindowHeight.call(this, numLines, selectable);
    };
  })();
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  (function() {    // DEV FAST GAME START
    // --------------------------------------------------------
    // * Метод только для отладки (быстрый старт на кнопку C)
    _.nUpdateDebugStart = function() {
      if (Input.isTriggered('c')) {
        this.nFastConnectToDevRoom();
      }
      if ($gameTemp._isDevNetGameWaitPlayers === true) {
        if (ANGameManager.playersData.length > 1) {
          return this.nFastGameStart();
        }
      }
    };
    //?EVENT
    _.netOn_lobby_startGame = function() {
      if ($gameTemp._isDevNetGameStart !== true) {
        return;
      }
      Scene_Title.prototype.commandNewGame.call(this);
    };
    _.nFastConnectToDevRoom = function() {
      if (ANET.PP.isActorSelectionAllowed()) {
        console.warn("Can't connect in Dev room in Actor Select mode");
        return;
      }
      ANNetwork.initSystem();
      return ANNetwork.setConnection(function(status) {
        if (status === 1) {
          HUIManager.notifySucess("Connected to server");
          ANGameManager.init();
          return ANNetwork.get(NMS.Lobby("createRoom", {
            name: "dev",
            gameInfo: ANNetwork.getNetworkGameInfoData()
          }), function(roomData) {
            if (roomData != null) {
              ANNetwork.setRoomMaster(roomData);
              return $gameTemp._isDevNetGameWaitPlayers = true;
            } else {
              return ANNetwork.get(NMS.Lobby("joinToRoom", "dev"), function(roomData) {
                $gameTemp._isDevNetGameStart = true;
                return ANNetwork.setRoomJoin(roomData);
              }, function() {
                return console.log("Can't join to Room, server not response in time");
              });
            }
          }, function() {
            return console.log("Can't create Room, server not response in time");
          });
        } else {
          return HUIManager.notifyError("Server not response in time");
        }
      });
    };
    _.nFastGameStart = function() {
      if (ANNetwork.isMasterClient()) {
        $gameTemp._isDevNetGameStart = true;
        return ANNetwork.send(NMS.Lobby("startGame"));
      }
    };
  })();
  //?EVENT
  // * Когда соединение прервано, вызывается это событие
  _.onLostConnection = function() {}; // * NOTHING
  _.commandNetwork = function() {
    this._commandWindow.close();
    return SceneManager.push(Scene_NetworkGameMenu);
  };
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeScene, ALIAS__isGameActive, _;
  //@[DEFINES]
  _ = SceneManager;
  //? Всегда требует активного статуса чтобы всегда принимать данные от сервера
  //@[ALIAS]
  ALIAS__isGameActive = _.isGameActive;
  _.isGameActive = function() {
    if (ANNetwork.isConnected()) {
      return true;
    } else {
      return ALIAS__isGameActive.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__changeScene = _.changeScene;
  _.changeScene = function() {
    if (ANNetwork.isConnected() && this.isSceneChanging()) {
      if (typeof HUIManager !== "undefined" && HUIManager !== null) {
        HUIManager.onGameSceneChanged();
      }
    }
    ALIAS__changeScene.call(this);
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = SceneManager;
  //? ONLY FOR MV
  _.isSceneReadyForNetwork = function() {
    return true;
  };
  // * Сцена занята для событий из сети (scene events) (общий метод для MV и MZ)
  _.isBusyForNetworkData = function() {
    return SceneManager.isSceneChanging() || !SceneManager.isSceneReadyForNetwork();
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Элементы интерфейса ANET Z на карте

// * Интерфейс AABS на карте
(function() {
  var Spriteset_UI;
  Spriteset_UI = class Spriteset_UI extends Sprite {
    constructor() {
      super();
      this._init();
      return;
    }

    isActive() {
      return this.visible === true;
    }

    show() {
      return this.visible = true;
    }

    hide() {
      return this.visible = false;
    }

    terminate() {
      this.visible = false;
    }

    // * Обновить все контроллеры и элементы
    refresh() {}

    onGameMessageStart() {}

    onGameMessageEnd() {}

  };
  ANET.link(Spriteset_UI);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.Spriteset_UI.prototype;
  _._init = function() {
    // * Регестрирует себя в менеджере
    ANET.UI.setUI(this);
    // * Набор всех элементов
    this.elements = [];
    // * Набор всех контроллеров
    this.controllers = [];
    return this._create();
  };
  _._create = function() {
    this._createNormalUILayer();
    return this._createElements();
  };
  _._createNormalUILayer = function() {
    this.layer = new Sprite();
    return this.addChild(this.layer);
  };
  _._createElements = function() {
    if (ANET.PP.isInGamePlayerMenuAllowed()) {
      this._createInGamePlayerMenu();
    }
    if (ANET.PP.isGameChatAllowed()) {
      this._createInGameChat();
    }
  };
  // * Создаём меню игрока
  _._createInGamePlayerMenu = function() {
    var size;
    //TODO: from parameters
    size = new Rectangle(0, 0, 160, 160);
    this.playerMenuWindow = new FWindow_InGamePlayerMenu(this, size.width, size.height);
  };
  // * Создаём окно чата
  _._createInGameChat = function() {
    //TODO: from parameters
    this.chatWindow = new FWindow_InGameChat(this, 312, 192);
    this._addElementToUI(this.chatWindow);
  };
  // * Добавить элемент на обычный слой
  _._addElementToUI = function(sprite) {
    return this.layer.addChild(sprite);
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__retreat, _;
  //@[DEFINES]
  _ = Sprite_Actor.prototype;
  //TEMP
  //TODO: Временное врешение, работает только на мастере
  //@[ALIAS]
  ALIAS__retreat = _.retreat;
  _.retreat = function() {
    if (ANNetwork.isConnected()) {
      if ($gameParty.leader() === this._battler) {
        return this.startMove(300, 0, 30);
      } else {

      }
    } else {
      // * Другой персонаж не убегает
      return ALIAS__retreat.call(this);
    }
  };
})();

// ■ END Sprite_Actor.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setCharacter, ALIAS__updateOther, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__updateOther = _.updateOther;
  _.updateOther = function() {
    ALIAS__updateOther.call(this);
    return this._updateNetworkCharacter();
  };
  
  //@[ALIAS]
  ALIAS__setCharacter = _.setCharacter;
  _.setCharacter = function(character) {
    ALIAS__setCharacter.call(this, character);
    this._isNetworkCharacter = ANNetwork.isConnected() && character instanceof NETCharacter;
    // * Смена методов
    if (this._isNetworkCharacter === true) {
      this._updateNetworkCharacter = this._updateNetworkCharacterMain;
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //?DYNAMIC
  _._updateNetworkCharacter = function() {}; // * DUMMY
  _._updateNetworkCharacterMain = function() {
    return this._updateNetworkStateIcon();
  };
  _._updateNetworkStateIcon = function() {
    if (this.netStateIcon == null) {
      this._createNetworkStateIcon();
    } else {
      this.netStateIcon.x = this.x;
      this.netStateIcon.y = this.y - this.height;
    }
  };
  _._createNetworkStateIcon = function() {
    var e, ref;
    this.netStateIcon = new ANET.Sprite_PlayerNetworkStatus(this);
    this.netStateIcon.setupNETCharacter(this._character);
    try {
      // * Не лучший способ
      if ((ref = SceneManager._scene._spriteset) != null) {
        ref.addNetworkStatusIconForCharacter(this.netStateIcon);
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Gauge.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__smoothness, _;
  if (KDCore.isMV()) {
    return;
  }
  //@[DEFINES]
  _ = Sprite_Gauge.prototype;
  //@[ALIAS]
  ALIAS__smoothness = _.smoothness;
  _.smoothness = function() {
    // * Делаем более плавное заполнение для сетевой битвы, чтобы не было видно "рывков"
    // * Рывки есть так как с сервера данные обновляются примерно раз в секунду в бою
    if (ANNetwork.isConnected()) {
      if (this._statusType === "time" && $gameParty.inBattle()) {
        return 60;
      }
    }
    return ALIAS__smoothness.call(this);
  };
})();

// ■ END Sprite_Gauge.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapClickEffect.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Эффект нажатия мышкой (на карте)
(function() {
  var Sprite_MapClickEffect;
  Sprite_MapClickEffect = class Sprite_MapClickEffect extends KDCore.Sprite {
    constructor(x, y) {
      super();
      this.bitmap = ImageManager.loadAA("nzClickEffect");
      this.anchor.set(0.5);
      this._create();
      this.move(x, y);
      return;
    }

    //TODO: From parameters
    getSettings() {
      return {
        initialSize: 0.08,
        endSize: 0.4,
        sizeChangeStep: 0.03,
        frameDelay: 1
      };
    }

    update() {
      var ref, ref1;
      super.update();
      if ((ref = this._changer) != null) {
        ref.update();
      }
      if ((ref1 = this._changer2) != null) {
        ref1.update();
      }
      this._refreshScale();
    }

    // * destroy
    onAnimationEnd() {
      var ref;
      this.visible = false;
      this._changer = null;
      this._changer2 = null;
      if ((ref = this.parent) != null) {
        ref.removeChild(this);
      }
    }

  };
  ANET.link(Sprite_MapClickEffect);
})();

(function() {
  var _;
  
  //@[DEFINES]
  _ = ANET.Sprite_MapClickEffect.prototype;
  _._create = function() {
    var p;
    p = this.getSettings();
    this._tScale = p.initialSize;
    this._refreshScale();
    this._changer = new AA.Changer(this);
    this._changer.change('_tScale').from(p.initialSize).to(p.endSize).step(p.sizeChangeStep).speed(p.frameDelay).start();
    this._changer2 = new AA.Changer(this);
    this._changer2.change('opacity').from(255).to(0).step(22).speed(1).delay(1).start().done(this.onAnimationEnd.bind(this));
  };
  _._refreshScale = function() {
    this.scale.x = this._tScale;
    this.scale.y = this.scale.x;
  };
})();

// ■ END Sprite_MapClickEffect.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Сообщение в чате
(function() {
  var Sprite_NetChatTextLine;
  Sprite_NetChatTextLine = class Sprite_NetChatTextLine extends KDCore.Sprite {
    constructor() {
      super();
      this.params = this.getSettings();
      this._needAnimation = false;
      this._create();
      return;
    }

    //TODO: From plugin parameters!!!
    getSettings() {
      return this.defaultSettings();
    }

    defaultSettings() {
      return {
        size: {
          w: 306,
          h: 18
        },
        backgroundA: {
          color: "#59a3d9".toCss(),
          opacity: 40
        },
        backgroundB: {
          color: "#59a3d9".toCss(),
          opacity: 70
        },
        textLine: {
          visible: true,
          size: {
            w: 520,
            h: 20
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 4,
            y: -3
          }
        },
        // 1 - Channel
        // 2 - Actor Name
        // 4 - Player Name
        // 3 - Message
        textFormat: "\\}\\}\\C[3][%1] \\{\\{\\C[2]%2 \\C[0]%3",
        textFormatForPlayer: "\\}\\}\\C[3][%1]\\C[1][ME]\\{\\{ \\C[0]%3",
        textFormatForSystem: "\\}\\}\\C[3][%1]\\{\\{ \\C[6]%3",
        animationSpeedInPx: 18
      };
    }

    // * Применить стиль задника А (по умолчанию)
    applyBackgroundStyleA() {
      return this._applyBackgroundStyle(this.params.backgroundA);
    }

    // * Применить стиль задника Б (чтобы легче было видно, каждый чётный)
    applyBackgroundStyleB() {
      return this._applyBackgroundStyle(this.params.backgroundB);
    }

    // * Написать сообщение
    drawChatMessage(channelId, actorId, text) {
      var actorName, channelIdText, playerName, textFormat;
      if (this._textSpr == null) {
        return;
      }
      if (this.isMyActorMessage(actorId)) {
        textFormat = this.params.textFormatForPlayer;
      } else {
        if (actorId <= 0) {
          textFormat = this.params.textFormatForSystem;
        } else {
          textFormat = this.params.textFormat;
        }
      }
      channelIdText = this._convertChannelIdToText(channelId); //1
      actorName = this._getActorName(actorId); //2
      playerName = this._getPlayerName(actorId); //4
      this._textSpr.drawTextWithFormat(textFormat, channelIdText, actorName, text, playerName);
    }

    // * Сообщение от меня (текущего клиента), имеет отдельный формат
    isMyActorMessage(actorId) {
      if (ANNetwork.isConnected()) {
        return ANGameManager.myActorId() === actorId;
      } else {
        return false;
      }
    }

    // * Сдвинуть эту строчку выше
    moveUp() {
      this.y -= this.params.size.h;
    }

    // * Анимированное появление сообщения (справа "едет")
    animate() {
      this._textSpr.x = -this.params.textLine.size.w;
      this._needAnimation = true;
    }

    update() {
      super.update();
      this._updateAnimation();
    }

  };
  ANET.link(Sprite_NetChatTextLine);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = ANET.Sprite_NetChatTextLine.prototype;
  _._applyBackgroundStyle = function(params) {
    if (this._background == null) {
      return;
    }
    this._background.fillAll(params.color);
    this._background.opacity = params.opacity;
  };
  _._create = function() {
    this._createBackground();
    this._createTextLine();
  };
  _._createBackground = function() {
    this._background = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
    this.applyBackgroundStyleA();
    return this.add(this._background);
  };
  _._createTextLine = function() {
    this._textSpr = new AA.Sprite_UITextExt(this.params.textLine);
    return this.add(this._textSpr);
  };
  _._updateAnimation = function() {
    if (this._needAnimation === false) {
      return;
    }
    if (this.params.animationSpeedInPx === 0) {
      this._textSpr.x = 0; // * Сразу, без анимации
    } else {
      this._textSpr.x += this.params.animationSpeedInPx;
    }
    if (this._textSpr.x > 0) { // * Граница
      this._textSpr.x = 0;
    }
    this._needAnimation = this._textSpr.x !== 0;
  };
  _._convertChannelIdToText = function(channelId) {
    if (channelId <= 0) {
      return "ALL";
    }
    return "MAP";
  };
  _._getActorName = function(actorId) {
    var ref;
    if (actorId <= 0) {
      return "";
    }
    return (ref = $dataActors[actorId]) != null ? ref.name : void 0;
  };
  _._getPlayerName = function(actorId) {
    var ref;
    if (actorId <= 0) {
      return "";
    }
    if (ANNetwork.isConnected()) {
      return (ref = ANGameManager.getPlayerDataByActorId(actorId)) != null ? ref.name : void 0;
    } else {
      return this._getActorName(actorId);
    }
  };
})();

// ■ END PRIVATE
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_PlayerNetworkStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_PlayerNetworkStatus;
  Sprite_PlayerNetworkStatus = class Sprite_PlayerNetworkStatus extends Sprite_Balloon {
    constructor() {
      super();
      this.visible = false;
      return;
    }

    setupNETCharacter(_character) {
      this._character = _character;
      return this._checkStateThread = new KDCore.TimedUpdate(10, this._updateStateCheck.bind(this));
    }

    loadBitmap() {
      this.bitmap = ImageManager.loadAA("PlayerStateIcons");
      return this.setFrame(0, 0, 0, 0);
    }

    setup(iconId) {
      if (iconId == null) {
        if (this.visible === true) {
          this.reset();
        }
      } else {
        if (this._balloonId === iconId) {
          return;
        }
        this._balloonId = iconId;
        this.visible = true;
        this.restart();
      }
    }

    restart() {
      return this._duration = 5 * this.speed() + this.waitTime();
    }

    reset() {
      this._duration = 0;
      this._balloonId = -1;
      return this.visible = false;
    }

    // * Не используется, так как прикрепляется к персонажу
    updatePosition() {} // * EMPTY

    update() {
      super.update();
      this._checkStateThread.update();
      // * Начинается снова
      if (this._balloonId >= 0 && this._duration <= 0) {
        this._firstStep = true;
        return this.restart();
      }
    }

    frameIndex() {
      var frameIndex, index;
      index = (this._duration - this.waitTime()) / this.speed();
      frameIndex = 4 - Math.max(Math.floor(index), 0);
      if (this._firstStep == null) {
        return frameIndex;
      } else {
        if (frameIndex === 0) {
          return 1;
        } else {
          return frameIndex;
        }
      }
    }

    // * PRIVATE =====================================================
    _updateStateCheck() {
      if (this._character == null) {
        return;
      }
      this.setup(this._character.networkStateIcon);
    }

  };
  ANET.link(Sprite_PlayerNetworkStatus);
})();

// ■ END Sprite_PlayerNetworkStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Battle.prototype;
  // * Началась битва
  // * Проверим и спрячем "dead" врагов (если мы присоединились)
  _.nRefreshNetBattle = function() {
    var e, i, len, ref, ref1, s;
    try {
      // * Если мы мастер, то не надо, значит мы НЕ присоединились
      if (ANBattleManager.isBattleMaster()) {
        return;
      }
      ref = this._enemySprites;
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s == null) {
          continue;
        }
        if (!((ref1 = s._enemy) != null ? ref1.isAlive() : void 0)) {
          s.hide();
        }
      }
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  };
})();

// ■ END Spriteset_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCharacters, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createCharacters = _.createCharacters;
  _.createCharacters = function() {
    ALIAS__createCharacters.call(this);
    if (ANNetwork.isConnected()) {
      this._createNetworkCharacters();
      this._createNetworkCharactersInfo();
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _._createNetworkCharacters = function() {
    // * Отдельный массив для удобства
    this._networkCharacterSprites = [];
    this.refreshNetworkCharacters();
  };
  _.refreshNetworkCharacters = function() {
    var char, i, j, len, len1, ref, ref1, spr;
    ref = this._networkCharacterSprites;
    for (i = 0, len = ref.length; i < len; i++) {
      char = ref[i];
      this._removeNetCharInfo(char);
      this._characterSprites.delete(char);
      this._tilemap.removeChild(char);
    }
    this._networkCharacterSprites = [];
    ref1 = $gameMap.netChars();
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      char = ref1[j];
      spr = new Sprite_Character(char);
      this._characterSprites.push(spr);
      this._networkCharacterSprites.push(spr);
      this._tilemap.addChild(spr);
    }
  };
  
  // * Специальный слой для иконок статусов и имён сетевых персонажей
  _._createNetworkCharactersInfo = function() {
    this._networkCharactersInfoSprites = [];
    this._networkCharactersInfoLayer = new Sprite();
    this._networkCharactersInfoLayer.z = 9;
    this._tilemap.addChild(this._networkCharactersInfoLayer);
  };
  // * Добавить иконку статуса для персонажа
  _.addNetworkStatusIconForCharacter = function(iconSpr) {
    this._destroyNetStatusIconDuplicate(iconSpr);
    this._networkCharactersInfoSprites.push(iconSpr);
    this._networkCharactersInfoLayer.addChild(iconSpr);
  };
  
  // * Надо найти и удалить, если икона уже существует для персонажа
  // * при refreshNetworkCharacters, их иконки не удаляются с ними
  // * так как находятся на другом слое
  _._destroyNetStatusIconDuplicate = function(iconSpr) {
    var i, len, ref, spr;
    if (iconSpr == null) {
      return;
    }
    ref = this._networkCharactersInfoSprites;
    //TODO: Возможно после создания таблиц имён надо разлелить метод
    // так как сейчас удаляется любой спрайт из массива с соответсвием персонажа
    for (i = 0, len = ref.length; i < len; i++) {
      spr = ref[i];
      if (spr == null) {
        continue;
      }
      if (spr._character === iconSpr._character) {
        this._networkCharactersInfoLayer.removeChild(spr);
        this._networkCharactersInfoSprites.delete(spr);
      }
    }
  };
  // * Удаляет все связанные с персонажем спрайты информации (статус, имя)
  _._removeNetCharInfo = function(char) {
    if (char == null) {
      return;
    }
    return this._destroyNetStatusIconDuplicate(char.netStateIcon);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addText, ALIAS__clear, _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    if (this.isNeedSendLogToServer()) {
      return ANBattleManager.sendWindowLogMessage("clear", null);
    }
  };
  //@[ALIAS]
  ALIAS__addText = _.addText;
  _.addText = function(text) {
    ALIAS__addText.call(this, text);
    if (this.isNeedSendLogToServer()) {
      ANBattleManager.sendWindowLogMessage("add", text);
    }
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__showNormalAnimation, _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  if (KDCore.isMZ()) {
    return;
  }
  //@[ALIAS]
  ALIAS__showNormalAnimation = _.showNormalAnimation;
  _.showNormalAnimation = function(targets, animationId, mirror) {
    ALIAS__showNormalAnimation.call(this, targets, animationId, mirror);
    if (this.isNeedSendLogToServer() && KDCore.isMV()) {
      ANBattleManager.sendWindowLogAnimation(targets, animationId, mirror);
    }
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleLog.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_BattleLog.prototype;
  _.isNeedSendLogToServer = function() {
    return ANNetwork.isConnected() && ANGameManager.isBattleMaster() && !$gameParty.isOneBattler();
  };
})();

// ■ END Window_BattleLog.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_BattleStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__update, _;
  //@[DEFINES]
  _ = Window_BattleStatus.prototype;
  if (KDCore.isMZ()) {
    return;
  }
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if ($gameTemp.isBattleRefreshRequested()) {
      this.refresh();
      $gameTemp.clearBattleRefreshRequest();
    }
  };
})();

// ■ END Window_BattleStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCancelEnabled, ALIAS__isCursorMovable, ALIAS__isOkEnabled, ALIAS__processCancel, ALIAS__processOk, ALIAS__select, ALIAS__start, ALIAS__update, _;
  //TODO: ПРОВЕРИТЬ НА MV

  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  //@[ALIAS]
  ALIAS__isCursorMovable = _.isCursorMovable;
  _.isCursorMovable = function() {
    if (this.nIsNetworkSelection()) {
      return ANInterpreterManager.isSharedEventMaster();
    } else {
      return ALIAS__isCursorMovable.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__isOkEnabled = _.isOkEnabled;
  _.isOkEnabled = function() {
    if (this.nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()) {
      return false;
    }
    return ALIAS__isOkEnabled.call(this);
  };
  //@[ALIAS]
  ALIAS__isCancelEnabled = _.isCancelEnabled;
  _.isCancelEnabled = function() {
    if (this.nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()) {
      return false;
    }
    return ALIAS__isCancelEnabled.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.nIsNetworkSelection()) {
      this.nUpdateNetworkSelection();
    }
  };
  // * Можно это тоже, но не обязательно, и так выбор не может сделать второй игрок
  //@[ALIAS]
  //ALIAS__processHandling = _.processHandling
  //_.processHandling = ->
  //    return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
  //    return ALIAS__processHandling.call(@)

  //@[ALIAS]
  //ALIAS__processTouch = _.processTouch
  //_.processTouch = ->
  //    return if @nIsNetworkSelection() && !ANInterpreterManager.isSharedEventMaster()
  //    return ALIAS__processTouch.call(@)

  //@[ALIAS]
  ALIAS__select = _.select;
  _.select = function(index) {
    if (this.nIsNetworkSelection()) {
      // * Если мастер, то выбор проходит и отправляем всем выбор
      if (ANInterpreterManager.isSharedEventMaster()) {
        ALIAS__select.call(this, index);
        return this.nSendNetworkSelection(index);
      } else {
        // * Если не мастер, но выбор пришёл с сервера (т.е. есть флаг), то ставим выбор
        if (this.nIsSelectFromNetworkMaster === true) {
          this.nIsSelectFromNetworkMaster = false;
          return ALIAS__select.call(this, index);
        } else {

        }
      }
    } else {
      // * NOTHING
      // * Клиент сам не может менять выбор
      return ALIAS__select.call(this, index);
    }
  };
  
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    if (ANNetwork.isConnected()) {
      this.nSetNetworkSelectMode(false);
    }
  };
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    if (ANNetwork.isConnected()) {
      this.nPrepareNetworkSelection();
    }
    ALIAS__start.call(this);
  };
  
  //@[ALIAS]
  ALIAS__processOk = _.processOk;
  _.processOk = function() {
    ALIAS__processOk.call(this);
    if (this.nIsNetworkSelection() && this.isCurrentItemEnabled()) {
      this.nSendNetworkSelectionAciton('ok');
    }
  };
  //@[ALIAS]
  ALIAS__processCancel = _.processCancel;
  _.processCancel = function() {
    ALIAS__processCancel.call(this);
    if (this.nIsNetworkSelection() && this.isCurrentItemEnabled()) {
      this.nSendNetworkSelectionAciton('cancel');
    }
  };
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  (function() {    // * Выбор (только одного игрока) в общем событии
    // -----------------------------------------------------------------------
    // * Подготовка окна к выбору по сети
    _.nPrepareNetworkSelection = function() {
      // * Обнуляем действие из сети
      $gameTemp.nSelectionActionFromNetwork = null;
      this.nSetNetworkSelectMode($gameTemp.nRequireChoiceOnlyForMaster);
      // * Сбрасываем флаг (чтобы не повторился на следующем выборе)
      $gameTemp.nRequireChoiceOnlyForMaster = false;
      // * При открытии окна, первый выбор Default всегда проходит (не запрещён) на клиенте
      // * Поэтому ставим разрешающий флаг (якобы от сервера первый выбор)
      this.nIsSelectFromNetworkMaster = true;
      // * Очищаем последний отправленный индекс
      this.__nLastSentIndex = null;
    };
    _.nSetNetworkSelectMode = function(_networkSelectMode) {
      this._networkSelectMode = _networkSelectMode;
    };
    _.nIsNetworkSelection = function() {
      return this._networkSelectMode === true && ANNetwork.isConnected();
    };
    // * Отправить на сервер индекс выбора
    _.nSendNetworkSelection = function(index) {
      // * Чтобы не спамить
      if (this.__nLastSentIndex === index) {
        return;
      }
      this.__nLastSentIndex = index;
      ANInterpreterManager.sendChoiceSelection(index, null);
    };
    // * Отправить на сервер действие (ОК, отмена)
    _.nSendNetworkSelectionAciton = function(action) {
      ANInterpreterManager.sendChoiceSelection(this.index(), action);
    };
    // * Ожидание действие от сервера (не мастер)
    return _.nUpdateNetworkSelection = function() {
      var action, index;
      if ($gameTemp.nSelectionActionFromNetwork == null) {
        return;
      }
      if (ANInterpreterManager.isSharedEventMaster()) {
        return;
      }
      ({action, index} = $gameTemp.nSelectionActionFromNetwork);
      this.nIsSelectFromNetworkMaster = true;
      if (index != null) {
        // * Всегда ставим выбор аналогичный масетеру (пришёл от сервера который), затем уже действия
        this.select(index);
      }
      switch (action) {
        case 'ok':
          this.processOk();
          break;
        case 'cancel':
          this.processCancel(); // select
          break;
      }
      // * Ничего, выбор всегда идёт
      // * Флаг обработан, очищаем
      $gameTemp.nSelectionActionFromNetwork = null;
    };
  })();
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ItemList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawItem, ALIAS__isEnabled, ALIAS__makeItemList, _;
  //@[DEFINES]
  _ = Window_ItemList.prototype;
  //@[ALIAS]
  ALIAS__isEnabled = _.isEnabled;
  _.isEnabled = function() {
    if (ANTradeManager.isInTrade()) {
      return true; // * В режиме NetTrade можно продавать все вещи
    } else {
      return ALIAS__isEnabled.call(this, ...arguments);
    }
  };
  
  //@[ALIAS]
  ALIAS__makeItemList = _.makeItemList;
  _.makeItemList = function() {
    ALIAS__makeItemList.call(this);
    if (ANTradeManager.isInTrade()) {
      this.nMakeItemListForTrading();
    }
  };
  //@[ALIAS]
  ALIAS__drawItem = _.drawItem;
  _.drawItem = function(index) {
    if (ANTradeManager.isInTrade() && index === 0) {
      this.nDrawEmptyTradeItem(index);
      return;
    }
    return ALIAS__drawItem.call(this, index);
  };
})();

// ■ END Window_ItemList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ItemList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_ItemList.prototype;
  // * Фильтруем список предметов для торговли
  // * 1. Добавляем "пустой" предмет (чтобы убрать позицию)
  // * 2. Удаляем из списка уже выбранные ранее предметы
  _.nMakeItemListForTrading = function() {
    var i, item, len, ref;
    //%[I] Добавлять кнопку Remove только если в слоте что-то есть
    // смотри $gameTemp.__netTradeItemIndex
    this._data.unshift(this.nEmptyTradeItem());
    ref = $gameTemp._netMyTradeItems;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (item == null) {
        continue;
      }
      if (this._data.contains(item[0])) {
        this._data.delete(item[0]);
      }
    }
  };
  _.nEmptyTradeItem = function() {
    return {
      id: 0,
      description: "\\Chex[#f5c842]Remove Item from current Trade slot"
    };
  };
  _.nDrawEmptyTradeItem = function(index) {
    var e, item, rect;
    try {
      item = this.itemAt(index);
      if (item == null) {
        return;
      }
      rect = this.itemLineRect(index);
      this.changeTextColor("#f5c842");
      this.drawText("[Remove]", rect.x, rect.y, rect.width, 'center');
      //@drawItemName(item, rect.x, rect.y, rect.width)
      return this.resetTextColor();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Window_ItemList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isFormationEnabled, ALIAS__isSaveEnabled, _;
  //@[DEFINES]
  _ = Window_MenuCommand.prototype;
  // * Команда Formation запрещена в сетевой игре всегда
  //@[ALIAS]
  ALIAS__isFormationEnabled = _.isFormationEnabled;
  _.isFormationEnabled = function() {
    if (ANNetwork.isConnected()) {
      return false;
    } else {
      return ALIAS__isFormationEnabled.call(this, ...arguments);
    }
  };
  
  //@[ALIAS]
  ALIAS__isSaveEnabled = _.isSaveEnabled;
  _.isSaveEnabled = function() {
    if (ANNetwork.isConnected()) {
      // * Если параметр включён
      return ANET.PP.isSaveLoadAllowed();
    } else {
      return ALIAS__isSaveEnabled.call(this, ...arguments);
    }
  };
})();

// ■ END Window_MenuCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__isCurrentItemEnabled, _;
  //@[DEFINES]
  _ = Window_MenuStatus.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function(rect) {
    ALIAS__initialize.call(this, rect);
    if (ANNetwork.isConnected()) {
      if (ANET.PP.isOtherPlayersVisibleInMenu() === false) {
        this.setOnlyMyPlayerInMenuMode();
      }
    }
  };
  //@[ALIAS]
  ALIAS__isCurrentItemEnabled = _.isCurrentItemEnabled;
  _.isCurrentItemEnabled = function() {
    if (ANNetwork.isConnected()) {
      return this.isCurrentItemEnabledInNetworkGame();
    } else {
      return ALIAS__isCurrentItemEnabled.call(this, ...arguments);
    }
  };
})();

// ■ END Window_MenuStatus.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_MenuStatus.prototype;
  (function() {    // * Команды Skill, Statis, Equip
    // -----------------------------------------------------------------------
    _.isCurrentItemEnabledInNetworkGame = function() {
      if (this.isSymbolOnlyForMyNetActor()) {
        return this.isCurrentActorIsMyNetActor();
      } else {
        return true;
      }
    };
    // * Набор команд, которые доступны только для текущего игрока (персонажа)
    _.isSymbolOnlyForMyNetActor = function() {
      var e, isOnlyForMyActor, symbol;
      try {
        // * Плохой вариант получения команды, но работает
        symbol = SceneManager._scene._commandWindow.currentSymbol();
        // * Навыки и экипировка - только для моего персонажа
        isOnlyForMyActor = symbol === 'skill' || symbol === 'equip';
        if (ANET.PP.isOtherPlayersMenuStatusAllowed() === false) {
          isOnlyForMyActor = isOnlyForMyActor || (symbol === 'status');
        }
        return isOnlyForMyActor;
      } catch (error) {
        e = error;
        AA.w(e);
        return false;
      }
    };
    
    // * Выбранный (Index) персонаж принадлежит мне? (мой персонаж)
    return _.isCurrentActorIsMyNetActor = function() {
      var actor, e;
      try {
        actor = $gameParty.members()[this.index()];
        return actor.isMyNetworkActor();
      } catch (error) {
        e = error;
        AA.w(e);
        return false;
      }
    };
  })();
  (function() {    // * Cписок игроков
    // -----------------------------------------------------------------------
    
    // * Будет видно только моего персонажа
    return _.setOnlyMyPlayerInMenuMode = function() {
      this.maxItems = function() {
        return 1;
      };
      this.actor = function(index) {
        return $gameParty.leader();
      };
      return this.selectLast = function() {
        return this.smoothSelect(0);
      };
    };
  })();
})();

// ■ END Window_MenuStatus.coffee
//---------------------------------------------------------------------------

// -----------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startMessage, ALIAS__terminateMessage, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    ALIAS__startMessage.call(this);
    return ANET.UI.onGameMessageStart();
  };
  
  //TODO: Тут мерцание происходит. Как быть? Timeout?
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    return ANET.UI.onGameMessageEnd();
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
var Window_NetworkActorsList;

Window_NetworkActorsList = class Window_NetworkActorsList extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
    this.select(0);
  }

  maxItems() {
    return this.actorsForNetwork().length;
  }

  maxCols() {
    return 2;
  }

  actorsForNetwork() {
    return ANET.PP.actorsForNetwork();
  }

  isCurrentItemEnabled() {
    var e;
    try {
      return this.isEnable(this.index());
    } catch (error) {
      e = error;
      ANET.w(e);
      return false;
    }
  }

  selectedActorId() {
    if (!this.isCurrentItemEnabled()) {
      return 0;
    }
    return this.getActorData(this.index()).id;
  }

  isEnable(index) {
    var actorId;
    actorId = this.getActorData(index).id;
    return !ANGameManager.playersData.some(function(pl) {
      return pl.actorId === actorId;
    });
  }

  drawItem(index) {
    var actorData, faceBitmap, rect;
    actorData = this.getActorData(index);
    if (actorData == null) {
      return;
    }
    rect = this.itemRect(index);
    faceBitmap = ImageManager.loadFace(actorData.faceName);
    faceBitmap.addLoadListener(() => {
      return this._drawActor(rect, actorData, index);
    });
  }

  itemHeight() {
    return 110;
  }

  getActorData(index) {
    return $dataActors[this.actorsForNetwork()[index]];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkActorsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkActorsList.prototype;
  _._drawActor = function(rect, a, index) {
    this.changePaintOpacity(this.isEnable(index));
    this._drawActorInfo(rect, a);
    this._drawActorClass(rect, a);
    if (!this.isEnable(index)) {
      this._drawNetworkStatus(rect);
    }
    this.changePaintOpacity(1);
  };
  _._drawActorInfo = function(rect, a) {
    this.drawFaceWithCustomSize(a.faceName, a.faceIndex, rect.x + 4, rect.y + 2, this.itemHeight() - 8);
    return this.drawText(a.name, rect.x + 120, rect.y + 4, 168);
  };
  _._drawActorClass = function(rect, a) {
    var aClass, className, e;
    try {
      aClass = $dataClasses[a.classId];
      if (aClass != null) {
        className = aClass.name;
      } else {
        className = "";
      }
      if (KDCore.isMV()) {
        this.changeTextColor(this.crisisColor());
      } else {
        this.changeTextColor(ColorManager.crisisColor());
      }
      this.contents.fontSize -= 8;
      this.drawText(className, rect.x + 132, rect.y + 44, 168);
      this.contents.fontSize += 8;
      this.resetTextColor();
    } catch (error) {
      e = error;
      AA.warning(e);
    }
  };
  _._drawNetworkStatus = function(rect) {
    if (KDCore.isMV()) {
      this.changeTextColor(this.deathColor());
    } else {
      this.changeTextColor(ColorManager.deathColor());
    }
    this.contents.fontSize -= 8;
    this.drawText('Picked', rect.x + 270, rect.y + 4);
    this.contents.fontSize += 8;
    this.resetTextColor();
  };
})();

// ■ END Window_NetworkActorsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NetworkGameMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_NetworkGameMenu;

Window_NetworkGameMenu = class Window_NetworkGameMenu extends Window_Command {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  makeCommandList() {
    this.addCommand("Create Room", "createRoom");
    this.addCommand("Join Room", "joinRoom");
    this.addCommand("Join Random Room", "joinRandRoom");
    this.addCommand("Settings", "settings");
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NetworkGameMenu.prototype;
})();

// ■ END Window_NetworkGameMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
var Window_NetworkRoomCommands;

Window_NetworkRoomCommands = class Window_NetworkRoomCommands extends Window_HorzCommand {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  maxCols() {
    return 3;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  isCanSelectActors() {
    return ANET.PP.isActorSelectionAllowed() && !this.isLoadGame();
  }

  makeCommandList() {
    var leaveCommandName;
    if (ANNetwork.isMasterClient()) {
      this.addCommand('Start', 'start', this._isStartEnabled()); //TODO: Третий аргумент : enabled
    } else {
      //TODO: Надо проверять все ли готовы, только тогда кнопка активна
      //TODO: Ещё можно проверять больше 1 игрока или нет
      this.addCommand('Ready', 'ready', false);
    }
    //TODO: Пока отключим, нет функционала
    if (this.isCanSelectActors()) {
      this.addCommand("Character", 'character', this._isCharSelectEnabled());
    }
    leaveCommandName = ANNetwork.isMasterClient() ? "Close" : "Leave";
    this.addCommand(leaveCommandName, 'leave');
  }

};

(function() {  
  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomCommands.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomCommands.prototype;
  _._myActorId = function() {
    return ANGameManager.myPlayerData().actorId;
  };
  _._isAllPlayersSelectActors = function() {
    return ANGameManager.playersData.every(function(pl) {
      return pl.actorId !== 0;
    });
  };
  _._isStartEnabled = function() {
    if (!ANET.PP.isSingleActorNetworkGameAllowed()) {
      if (ANGameManager.playersData.length === 1) {
        return false;
      }
    }
    // * Надо выбрать персонажа, потом можно начинать игру
    if (this.isCanSelectActors() || this.isLoadGame()) {
      //TODO: Разрешить загружаться меньшему количеству игроков??? Опция или НЕТ?
      // * Сейчас может загрузить игру два игрока, если играло 3 или более например
      return this._isAllPlayersSelectActors();
    } else {
      return true;
    }
  };
  _._isCharSelectEnabled = function() {
    return this._myActorId() <= 0;
  };
})();

// ■ END Window_NetworkRoomCommands.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
// * Список игроков в комнате
//TODO: Пока нельзя выделять игрока и что-то с ним делать
//TODO: Возможно добавить возможность кикнуть игрока
var Window_NetworkRoomPlayersList;

Window_NetworkRoomPlayersList = class Window_NetworkRoomPlayersList extends Window_Selectable {
  constructor(rect) {
    super(rect);
  }

  //@setBackgroundType ANET.VD.getWindowBackgroundType()
  maxItems() {
    return ANGameManager.playersData.length;
  }

  drawItem(index) {
    var playerData, rect;
    playerData = this.playerData(index);
    if (playerData == null) {
      return;
    }
    rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this._drawPlayerInfo(rect, playerData);
    this.changePaintOpacity(1);
  }

  isEnabled(index) {
    return true;
  }

  isLoadGame() {
    return ANET.Utils.isLoadGameRoom();
  }

  playerData(index) {
    return ANGameManager.playersData[index];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomPlayersList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomPlayersList.prototype;
  _._drawPlayerInfo = function(rect, playerData) {
    var text;
    text = playerData.name;
    if (playerData.id === ANNetwork.room.masterId) {
      text = "\\C[1]" + text;
    } else if (playerData.id === ANNetwork.myId()) {
      text = "\\C[3]" + text;
    }
    if (ANET.PP.isActorSelectionAllowed() || this.isLoadGame()) {
      text += this._getActorName(playerData);
    }
    this.drawTextEx(text, rect.x, rect.y, rect.width, 'left');
  };
  _._getActorName = function(playerData) {
    var actorName;
    actorName = "...";
    if (playerData.actorId > 0) {
      actorName = $dataActors[playerData.actorId].name;
    }
    return "\\C[0] [%1]".format(actorName);
  };
})();

// ■ END Window_NetworkRoomPlayersList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//TODO: Отключить комнаты других игр (параметр или от сервера зависит)
var Window_NetworkRoomsList;

Window_NetworkRoomsList = class Window_NetworkRoomsList extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
    this._createNoRoomsMessage();
    this.refreshRooms([]);
    return;
  }

  maxItems() {
    if (this.isHaveAnyRoom()) {
      return this.roomsList.length;
    } else {
      return 0;
    }
  }

  drawItem(index) {
    var rect, roomData;
    roomData = this.roomData(index);
    if (roomData == null) {
      return;
    }
    rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(index));
    this._drawRoomInfo(rect, roomData);
    this.changePaintOpacity(1);
  }

  isEnabled(index) {
    return NetRoomDataWrapper.isRoomProperToJoin(this.roomData(index));
  }

  isCurrentRoomEnabled() {
    return this.isEnabled(this.index());
  }

  getSelectedRoom() {
    return this.roomData(this.index());
  }

  refreshRooms(roomsList) {
    this.roomsList = roomsList;
    //TODO: @_noRoomsTextSpr мелькает
    this._noRoomsTextSpr.visible = !this.isHaveAnyRoom();
    if (this._noRoomsTextSpr.visible === true) {
      this.select(-1);
    }
    this.refresh();
  }

  isHaveAnyRoom() {
    if (this.roomsList != null) {
      return this.roomsList.length > 0;
    } else {
      return false;
    }
  }

  roomData(index) {
    return this.roomsList[index];
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_NetworkRoomsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomsList.prototype;
  _._createNoRoomsMessage = function() {
    var params;
    params = AA.Sprite_UIText.prototype.defaultParams();
    params.size.w = this.width;
    params.size.h = this.height;
    params.font.size = 32;
    params.outline.width = 3;
    this._noRoomsTextSpr = new AA.Sprite_UIText(params);
    this._noRoomsTextSpr.visible = false;
    this._noRoomsTextSpr.drawText("There are no rooms on server");
    return this.addChild(this._noRoomsTextSpr);
  };
  _._drawRoomInfo = function(rect, roomData) {
    var loadGame, roomText, rpgVersion, state;
    rpgVersion = roomData.rpgVersion === 0 ? 'MZ' : 'MV';
    state = roomData.inGame === true ? 'In Game' : 'In Lobby';
    loadGame = NetRoomDataWrapper.isLoadGameRoom(roomData) ? '[from Savefile]' : '';
    // * [VER](GAME NAME) RoomName 0\X (inGame|inLobby)
    roomText = "\\}\\C[1][%1]\\C[3](%2)\\{\\C[0]   %3   \\C[4]%4/%5 \\}\\C[5](%6) \\C[6]%7".format(rpgVersion, roomData.gameTitle, roomData.name, roomData.playersIds.length, roomData.maxPlayers, state, loadGame);
    this.drawTextEx(roomText, rect.x, rect.y, rect.width, 'left');
  };
})();

// ■ END Window_NetworkRoomsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NetworkRoomTypeMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_NetworkRoomTypeMenu;

Window_NetworkRoomTypeMenu = class Window_NetworkRoomTypeMenu extends Window_Command {
  constructor(rect) {
    super(rect);
    this.setBackgroundType(ANET.VD.getWindowBackgroundType());
  }

  makeCommandList() {
    this.addCommand("New Game", "newGame");
    this.addCommand("Load Game", "continue", this.isHaveSavedGames());
  }

  isHaveSavedGames() {
    return true; //TODO: првоерка наличия сетевых сохранений
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NetworkRoomTypeMenu.prototype;
})();

// ■ END Window_NetworkRoomTypeMenu.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NPlayerCommandsList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_NPlayerCommandsList;

Window_NPlayerCommandsList = class Window_NPlayerCommandsList extends Window_Selectable {
  constructor(rect) {
    super(...arguments);
    this.setBackgroundType(this);
  }

  //%[Главный метод по обновлению списка команд]
  setCommandsFor(char) {
    this.char = char;
    return this.refresh();
  }

  maxCols() {
    return 1;
  }

  maxItems() {
    if (this._items != null) {
      return this._items.length;
    } else {
      return 0;
    }
  }

  itemAt(index) {
    return this._items[index];
  }

  isCurrentItemEnabled() {
    return this.isEnabled(this.index());
  }

  selectedItem() {
    return this.itemAt(this.index());
  }

  isEnabled(index) {
    var item;
    item = this.itemAt(index);
    // * Проверка дистанции (общая)
    if (item.minDist > 0) {
      if (this._distance > item.minDist) {
        return false;
      }
    }
    // * Проверка переключателя (общая)
    if (item.switchId > 0) {
      if ($gameSwitches.value(item.switchId) === false) {
        return false;
      }
    }
    switch (item.action) {
      case "trade":
        if (this.char != null) {
          return ANTradeManager.isPlayerAvailableForTrade(this.char.playerData());
        } else {
          return false;
        }
        break;
      case "status":
        return true;
      case "follow":
        return true;
      default:
        return true; // * user - можно, если проверки выше пройдены
    }
  }

  drawItem(index) {
    var e, item, rect;
    item = this.itemAt(index);
    if (item == null) {
      return;
    }
    rect = this.itemLineRect(index);
    try {
      this.changePaintOpacity(this.isEnabled(index));
      this.drawTextExInCenter(item.text, rect.x, rect.y, rect.width, rect.height);
      this.changePaintOpacity(1);
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  }

  refresh() {
    this._prepareCommandsForCurrentChar();
    Window_Selectable.prototype.refresh.call(this);
  }

  resetFontSettings() {
    super.resetFontSettings();
    this.contents.fontSize = 16;
  }

  //TODO: Настройки из параметров
  lineHeight() {
    if (KDCore.isMZ()) {
      return 16;
    } else {
      return 22;
    }
  }

  itemPadding() {
    return 6;
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NPlayerCommandsList.prototype;
  _._prepareCommandsForCurrentChar = function() {
    var c, defCommands, i, j, len, len1, userCommands;
    this._distance = this._getDistanceFromPlayerToBindedCharacter();
    this._items = [];
    defCommands = ANET.PP.getPlayerMenuDefaultCommands();
    for (i = 0, len = defCommands.length; i < len; i++) {
      c = defCommands[i];
      this._items.push(c);
    }
    userCommands = ANET.PP.getPlayerMenuUserCommands();
    for (j = 0, len1 = userCommands.length; j < len1; j++) {
      c = userCommands[j];
      this._items.push(c);
    }
  };
  _._getDistanceFromPlayerToBindedCharacter = function() {
    var dist, x, y;
    if (this.char == null) {
      return 0;
    }
    ({x, y} = $gamePlayer);
    dist = $gameMap.distance(x, y, this.char.x, this.char.y);
    if (dist <= 0) {
      dist = 1;
    }
    if (dist === 2) { // * Возможно диагональ
      if ($gamePlayer.aaInDiagonalPointRelativeTo(this.char)) {
        return 1;
      }
    } else {
      return dist;
    }
  };
})();

// ■ END Window_NPlayerCommandsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
var Window_NTradeItemNumberInput;

Window_NTradeItemNumberInput = class Window_NTradeItemNumberInput extends Window_NumberInput {
  constructor() {
    super();
  }

  // * Предмет для которого будет считать количество
  setItem(_item) {
    this._item = _item;
  }

  isGoldItem() {
    return this._item.id === ANTradeManager.TradeGoldItemId;
  }

  // * Внешний метод обработки конечного результата
  setOkHandler(_okHandler) {
    this._okHandler = _okHandler;
  }

  changeDigit(up) {
    var maxNumber;
    super.changeDigit(up);
    maxNumber = this.isGoldItem() ? $gameParty.gold() : $gameParty.numItems(this._item);
    if (this._number > maxNumber) {
      this._number = maxNumber;
      SoundManager.playBuzzer();
    } else {
      if (this._number < 0) {
        this._number = 0;
        SoundManager.playBuzzer();
      }
    }
    this.refresh();
  }

  //$[OVER]
  start() {
    var itemMax;
    itemMax = this.isGoldItem() ? $gameParty.maxGold() : $gameParty.maxItems();
    this._maxDigits = itemMax.toString().length;
    if (this.isGoldItem() && $gameParty.gold() <= 0) {
      this._number = 0; // * Если нет золота, то 0
    } else {
      // * Иначе (предмет) или есть золото, то 1
      this._number = 1;
    }
    this.updatePlacement();
    this.placeButtons();
    this.createContents();
    this.refresh();
    this.open();
    this.activate();
    this.select(this._maxDigits - 1);
  }

  //$[OVER]
  updatePlacement() {
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
  }

  //$[OVER]
  processOk() {
    this.playOkSound();
    this.updateInputData();
    this.deactivate();
    this.close();
    if (this._okHandler != null) {
      this._okHandler();
    }
  }

};

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NTradeItemsList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var Window_NTradeItemsList;

Window_NTradeItemsList = class Window_NTradeItemsList extends Window_Selectable {
  constructor(rect, side) {
    super(...arguments);
    this.side = side;
    this.setBackgroundType(2);
    return;
  }

  //TODO: from parameters
  getSettings() {
    return {
      maxTradeItems: 4,
      selectItemText: "\\I[16]\\FS[20]\\CHEX[#2ab8d1] <Select item>",
      emptyItemText: "\\I[16]\\FS[18]\\CHEX[#646869] -nothing-",
      goldItemText: "\\I[163]\\CHEX[#ffea08] Gold: %0",
      goldEmptyText: "\\I[16]\\FS[20]\\CHEX[#f7ed81] <Add gold>"
    };
  }

  // * Является ли окно окном данного игрока (можно управлять)
  isOwnerWindow() {
    return this.side === 0;
  }

  maxCols() {
    return 1;
  }

  // * +2 - для кнопки Trade и золота
  maxItems() {
    return this.getSettings().maxTradeItems + 2;
  }

  // * Последний индекс
  tradeCommandIndex() {
    return this.maxItems() - 1;
  }

  // * Первый индекс
  goldCommandIndex() {
    return 0;
  }

  tradeItems() {
    return this._items;
  }

  isCurrentIndexTradeCommand() {
    return this.tradeCommandIndex() === this.index();
  }

  isCurrentIndexGoldCommand() {
    return this.goldCommandIndex() === this.index();
  }

  isEnabled(index) {
    if (this.isOwnerWindow()) {
      return true; // * Всегда можно
    } else {
      if (index === this.tradeCommandIndex()) {
        return $gameTemp._netHisTradeReadyStatus === true;
      } else {
        return true; // * Для прозрачности 255
      }
    }
  }

  refresh() {
    this._refreshTradeItems();
    Window_Selectable.prototype.refresh.call(this);
  }

  drawItem(index) {
    var e, item;
    try {
      this.changePaintOpacity(this.isEnabled(index));
      if (index === this.tradeCommandIndex()) {
        return this._drawTradeCommand();
      } else if (index === this.goldCommandIndex()) {
        return this._drawGoldCommand();
      } else {
        item = this.tradeItems()[index];
        if (item == null) {
          return this._drawEmptyItem(index);
        } else {
          return this._drawTradeItem(index);
        }
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  drawItemBackground(index) {} // * NOTHING

  itemRect(index) {
    var rect;
    rect = Window_Selectable.prototype.itemRect.call(this, index);
    if (index === this.tradeCommandIndex()) {
      rect.x += 40;
      rect.y += 8;
      rect.height = 44;
      rect.width = 114;
    }
    return rect;
  }

  refreshCursor() {
    if (this.index() === this.tradeCommandIndex()) {
      this.setCursorRect(0, 0, 0, 0);
      this.redrawItem(this.index());
      return this._shouldRedrawButton = true;
    } else {
      if (this._shouldRedrawButton === true) {
        this.redrawItem(this.tradeCommandIndex());
        this._shouldRedrawButton = false;
      }
      return Window_Selectable.prototype.refreshCursor.call(this);
    }
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Window_NTradeItemsList.prototype;
  _._refreshTradeItems = function() {
    var e;
    try {
      if (this.isOwnerWindow()) {
        this._items = $gameTemp._netMyTradeItems;
      } else {
        this._items = $gameTemp._netHisNetTradeItems;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._items = [];
    }
  };
  _._drawTradeCommand = function() {
    var b, e, index, rect;
    index = this.tradeCommandIndex();
    rect = this.itemRect(index);
    try {
      if (this.isOwnerWindow()) {
        if (this.index() === index) {
          b = ImageManager.loadAA("nzTradeButton_01");
        } else {
          b = ImageManager.loadAA("nzTradeButton_00");
        }
      } else {
        if (this.isEnabled(index)) { // * Player B is ready
          b = ImageManager.loadAA("nzTradeStatus_Ready");
        } else {
          b = ImageManager.loadAA("nzTradeStatus_NotReady");
        }
      }
      b.addLoadListener(() => {
        return this.contents.drawOnMe(b, rect.x, rect.y, 114, 44);
      });
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _._drawGoldCommand = function() {
    var e, index, item;
    index = this.goldCommandIndex();
    try {
      item = this.tradeItems()[index];
      if (item != null) {
        this._drawGoldCount(index, item[1]);
      } else {
        if (this.isOwnerWindow()) {
          this._drawGoldCount(index, 0);
        } else {
          this._drawEmptyItem(index);
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _._drawGoldCount = function(index, count) {
    var rect, text;
    rect = this.itemLineRect(index);
    if (count <= 0) {
      text = this.getSettings().goldEmptyText;
    } else {
      text = this.getSettings().goldItemText.replace("%0", count);
    }
    this.drawTextEx(text, rect.x, rect.y, rect.width);
  };
  _._drawEmptyItem = function(index) {
    var e, rect, text;
    rect = this.itemLineRect(index);
    try {
      if (this.isOwnerWindow()) {
        text = this.getSettings().selectItemText;
      } else {
        text = this.getSettings().emptyItemText;
      }
      this.drawTextEx(text, rect.x, rect.y, rect.width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _._drawTradeItem = function(index) {
    var count, item, itemObj, numberWidth, rect;
    item = this.tradeItems()[index];
    if (item == null) {
      return;
    }
    itemObj = item[0];
    if (itemObj == null) {
      return;
    }
    count = item[1] || 1;
    numberWidth = Window_ItemList.prototype.numberWidth.call(this);
    rect = this.itemLineRect(index);
    this.drawItemName(itemObj, rect.x, rect.y, rect.width - numberWidth);
    this.drawItemNumber(count, rect.x, rect.y, rect.width);
  };
  _.drawItemNumber = function(count, x, y, width) {
    this.drawText(":", x, y, width - this.textWidth("00"), "right");
    this.drawText(count, x, y, width, "right");
  };
})();

// ■ END Window_NTradeItemsList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_SavefileList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawTitle, ALIAS__isEnabled, _;
  //@[DEFINES]
  _ = Window_SavefileList.prototype;
  //@[ALIAS]
  ALIAS__isEnabled = _.isEnabled;
  _.isEnabled = function(savefileId) {
    // * Нельзя загружать сетевые сохранения из обычного меню загрузки
    if (this._mode === 'load' && DataManager.nIsNetworkSaveFile(savefileId)) {
      return false;
    } else if (this._mode === 'loadNet') {
      return DataManager.nIsNetworkSaveFile(savefileId);
    } else {
      return ALIAS__isEnabled.call(this, savefileId);
    }
  };
  
  //TODO: Добавить кастомизацию или опцию на отключение
  //@[ALIAS]
  ALIAS__drawTitle = _.drawTitle;
  _.drawTitle = function(savefileId, x, y) {
    if (DataManager.nIsNetworkSaveFile(savefileId)) {
      return this.drawText(TextManager.file + " " + savefileId + " [Network game]", x, y, 240);
    } else {
      return ALIAS__drawTitle.call(this, savefileId, x, y);
    }
  };
})();

// ■ END Window_SavefileList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_SavefileList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawGameTitle, _;
  //@[DEFINES]
  _ = Window_SavefileList.prototype;
  if (KDCore.isMZ()) {
    return;
  }
  //@[ALIAS]
  ALIAS__drawGameTitle = _.drawGameTitle;
  _.drawGameTitle = function(info, x, y, width) {
    var text;
    if ((info.nUniqueSaveID != null) && (info.nMyActorId != null)) {
      text = "";
      if (info.title != null) {
        text = info.title;
      }
      text += " [Network game]";
      return this.drawText(text, x, y, width + 100);
    } else {
      return ALIAS__drawGameTitle.call(this, info, x, y, width);
    }
  };
})();

// ■ END Window_SavefileList.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TitleCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__makeCommandList, _;
  //@[DEFINES]
  _ = Window_TitleCommand.prototype;
  //@[ALIAS]
  ALIAS__makeCommandList = _.makeCommandList;
  _.makeCommandList = function() {
    ALIAS__makeCommandList.call(this);
    this.addCommand('Network', "network");
    this._nRearangeNetworkCommand();
    if (!ANET.PP.isSinglePlayerAllowed()) {
      this._nRemoveNewGameCommand();
    }
  };
})();

// ■ END Window_TitleCommand.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_TitleCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_TitleCommand.prototype;
  // * Чтобы не была последнией, меняю местами с командой options
  _._nRearangeNetworkCommand = function() {
    var e, netCmd, netCommandIndex, optionsCmd, optionsCommandIndex;
    try {
      optionsCommandIndex = this._list.indexOf(this._list.find(function(item) {
        return item.symbol === "options";
      }));
      if (optionsCommandIndex < 0) {
        return;
      }
      netCommandIndex = this._list.length - 1;
      optionsCmd = this._list[optionsCommandIndex];
      netCmd = this._list[netCommandIndex];
      this._list[optionsCommandIndex] = netCmd;
      return this._list[netCommandIndex] = optionsCmd;
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
  _._nRemoveNewGameCommand = function() {
    var e, newGameIndex;
    try {
      newGameIndex = this._list.indexOf(this._list.find(function(item) {
        return item.symbol === "newGame";
      }));
      return this._list.splice(newGameIndex, 1);
    } catch (error) {
      e = error;
      return ANET.w(e);
    }
  };
})();

// ■ END Window_TitleCommand.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x3abe=['1BOzlfj','151kmOKGq','1291yoRhcE','ParamsManager','245cYBmNN','1qyeiDB','673396AcrYOm','_ip','14UgqemO','195.161.41.20','actorsForNetwork','getParam','630705gWaJVA','610945VxMAhU','length','18481wjOqhH','271407owuAvt','slice','3034','_prepareConnectionSettings','446iDWoxM','_port'];function a0_0x3e4a(_0x142925,_0x3b64ec){_0x142925=_0x142925-0x198;var _0x3abec8=a0_0x3abe[_0x142925];return _0x3abec8;}(function(_0x1c28a1,_0x16d298){var _0x46b4a9=a0_0x3e4a;while(!![]){try{var _0x49826f=-parseInt(_0x46b4a9(0x1a0))+-parseInt(_0x46b4a9(0x1a8))*parseInt(_0x46b4a9(0x198))+parseInt(_0x46b4a9(0x1a1))+-parseInt(_0x46b4a9(0x1a3))*-parseInt(_0x46b4a9(0x19c))+parseInt(_0x46b4a9(0x1ab))*-parseInt(_0x46b4a9(0x1ac))+parseInt(_0x46b4a9(0x1aa))*parseInt(_0x46b4a9(0x19a))+parseInt(_0x46b4a9(0x1a4))*-parseInt(_0x46b4a9(0x199));if(_0x49826f===_0x16d298)break;else _0x1c28a1['push'](_0x1c28a1['shift']());}catch(_0x423565){_0x1c28a1['push'](_0x1c28a1['shift']());}}}(a0_0x3abe,0x52370),function(){var _0x15add3=a0_0x3e4a,_0x224d2f;_0x224d2f=ANET[_0x15add3(0x1ad)]['prototype'],_0x224d2f[_0x15add3(0x19e)]=function(){var _0x27c857=_0x15add3,_0x24ca37;return _0x24ca37=this[_0x27c857(0x19f)](_0x27c857(0x19e),[0x1,0x2]),_0x24ca37[_0x27c857(0x1a2)]>0x2?_0x24ca37[_0x27c857(0x1a5)](0x0,0x2):_0x24ca37;},_0x224d2f[_0x15add3(0x1a7)]=function(){var _0x2184b2=_0x15add3;this[_0x2184b2(0x19b)]=_0x2184b2(0x19d),this[_0x2184b2(0x1a9)]=_0x2184b2(0x1a6);};}());
})();

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addActor, ALIAS__initialize, ALIAS__removeActor, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Game_Party.prototype;
  // * В MZ этот метод разделён на setup
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    if (ANNetwork.isConnected()) {
      return this._data = []; // * Нет follower'ов
    }
  };
  
  //@[ALIAS]
  ALIAS__addActor = _.addActor;
  _.addActor = function(actorId) {
    var actor;
    ALIAS__addActor.call(this, actorId);
    // * Обновить окно статуса битвы
    $gameTemp.requestBattleRefresh();
    // * Код из MZ, инициализация битвы для новенького
    if (this.inBattle()) {
      actor = $gameActors.actor(actorId);
      if (this.battleMembers().includes(actor)) {
        actor.onBattleStart();
      }
    }
  };
  // * Если игрок выйдет, чтобы обновился экран битвы тоже
  //@[ALIAS]
  ALIAS__removeActor = _.removeActor;
  _.removeActor = function() {
    ALIAS__removeActor.call(this, ...arguments);
    $gameTemp.requestBattleRefresh();
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__updateBattleProcess, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  if (KDCore.isMZ()) {
    return;
  }
  // * Чтобы окно открывалось при передаче управления игроку
  //@[ALIAS]
  ALIAS__updateBattleProcess = _.updateBattleProcess;
  _.updateBattleProcess = function() {
    if (ANNetwork.isConnected()) {
      if ($gameTemp._isBattleSceneShouldBeRefreshed === true) {
        this.changeInputWindow();
        $gameTemp._isBattleSceneShouldBeRefreshed = false;
      }
      if (!this.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
        this.changeInputWindow();
      }
    }
    return ALIAS__updateBattleProcess.call(this);
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__goto, _;
  //@[DEFINES]
  _ = SceneManager;
  if (KDCore.isMZ()) {
    return;
  }
  //@[ALIAS]
  ALIAS__goto = _.goto;
  _.goto = function(sceneClass) {
    if ((typeof $gameTemp !== "undefined" && $gameTemp !== null) && (sceneClass != null)) {
      $gameTemp.__sceneChanging = true;
      setTimeout((function() {
        return typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__sceneChanging = false : void 0;
      }), 100);
    }
    return ALIAS__goto.call(this, sceneClass);
  };
  
  // * В MV плохо работает проверка isSceneChanging, поэтому сделал дополнительную проверку
  _.isSceneReadyForNetwork = function() {
    if (!ANNetwork.isConnected()) {
      return true;
    }
    if ($gameTemp.__sceneChanging == null) {
      return true;
    }
    return !$gameTemp.__sceneChanging;
  };
})();

// ■ END SceneManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_NTradeItemNumberInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Window_NTradeItemNumberInput.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this);
    return setTimeout((() => {
      return this.updateButtonsVisiblity();
    }), 50);
  };
  //$[OVER]
  _.updateButtonsVisiblity = function() {
    this.placeButtons();
    this.showButtons();
  };
  //$[OVER]
  // * Код из MZ для MV
  _.buttonY = function() {
    return this.itemHeight() + 32;
  };
})();

// ■ END Window_NTradeItemNumberInput.coffee
//---------------------------------------------------------------------------

//Plugin Alpha_NETZ automatic build by PKD PluginBuilder 1.9.2 15.01.2022
