//==================================================================================
//=== TSR_Mirror === A Plugin by The Northern Frog =================================
//==================================================================================

var TSR = TSR || {};
TSR.mirror = TSR.mirror || {};
TSR.mirror.version = 1.4;

var Imported = Imported || {};
Imported.TSR_Mirror = true;

//==================================================================================

/*:
 * @target MZ
 * @plugindesc v1.4.0 Use map region Id or terrain tag to create floor or wall mirrors 
 *             that will reflect player, followers and events.
 * @author TSR, The Northern Frog, 2021      
 * @help 
 * =================================================================================
 * == About this Plugin ============================================================
 * =================================================================================
 * Use either map region Id or terrain tag to defines tiles as mirrors. These 
 * tiles will display the reflection of player, followers and events.
 * 
 * The reflection sprites are created bellow the tileset level, but above 
 * parallax level. That means the tiles you define as mirror should have 
 * a slightly decreased opacity so the reflection sprites can be seen
 * beneath. You can then add a parallax as a background for the mirrors.
 * 
 * The plugin provide 2 types of mirror tiles:
 * 
 *      Wall Mirrors:
 *         The reflection sprites are exact copy of the characters they 
 *         represent, and mirror their movements. When approaching the
 *         mirror, reflection first appear at top of the mirror, and as
 *         the character get nearer, it will move down to be just in front
 *         of the character when it is standing in front of the mirror.
 *
 *              Parameters
 *        ==========================================================
 *       X Offset = the horizontal offset of the reflection sprite.
 * 
 *       Y Offset = the vertical offset of the reflection sprite.
 * 
 * 
 * 
 *      Floor Mirrors:
 *         The reflection sprite can have a little blur filter and a 
 *         small angulation. They always stick slightly to a fixed 
 *         position relatives to the character they represent. The
 *         floor mirrors settings are managed by plugin parameters.
 * 
 *              Parameters
 *        ==========================================================
 *       X Offset = the horizontal offset of the reflection sprite,
 *                  relative to the character. 
 * 
 *       Y Offset = the vertical offset of the reflection sprite,
 *                  relative to the character.
 * 
 *          Angle = the angle of the reflection sprite rotation. Set it
 *                  to 0 for no rotation or 2 to flip the sprite upside
 *                  down. Float values can be used.
 * 
 *           Blur = the strenght of the blur effect on the reflection
 *                  sprite. Set it to 0 for no blur.
 * 
 *       Opactity = the opacity of the reflection sprite ranging from
 *                  0 (invisible) to 255 (full opacity).
 * 
 *          Pulse = enable a slight pulsating effect on the reflection
 *                  sprite to mimic water movement.
 * 
 * 
 * 
 *  HOW TO USE:
 * 
 *         1) Select the tiles on your tileset that you want to act
 *            as mirror. Make the part of the tile where reflection 
 *            should appear semi-transparent (50-75% opacity).
 *  
 *         2) Set the Plugin parameters and choose map region Id or
 *            terrain tag to mark the mirror tiles.
 * 
 *         3) Place the mirror tiles on you map and mark them with the
 *            id you selected in the parameters. Make sure there's no
 *            other layers bellow the mirror tiles, because the reflection
 *            sprites appears beneath all tiles layer.
 * 
 * 
 * 
 *  EVENT COMMENT TAG:
 *          Use the following Event Comment Tag to prevent reflection of
 *          an event page.
 * 
 *                               <NO MIRROR>
 * 
 * 
 *          Those comment tags can be used to assign specific offset to
 *          an event reflection on wall or floor.
 * 
 *                         <WALL MIRROR OFFSET: X, Y>
 * 
 *                        <FLOOR MIRROR OFFSET: X, Y>
 * 
 * 
 *          This Event Comment Tag will prevent the flipping of the vertical
 *          direction of the reflections. This is useful when using a non
 *          character sheet such as 'Flame', 'Switch' or 'Doors'.
 * 
 *                             <FIX MIRROR IMAGE>
 * 
 * 
 * 
 *  MAP NOTE TAG:
 *          Use this notetag in a map notebox to turn map region Id into
 *          floor mirror. These floor mirrors will use the setting defined
 *          by the notetag instead of those set in the parameters. You
 *          can put more than one notetag in a map notebox to add more 
 *          floor mirror region Id with different settings.
 * 
 *       <FLOOR MIRROR INFO: regionId, x, y, angle, blur, opacity, pulse>
 * 
 *       regionId = the map region Id that is turned into a floor mirror
 *                  with the settings defined by the following arguments. 
 *              x = the horizontal offset of the reflection sprite,
 *                  relative to the character. 
 *              y = the vertical offset of the reflection sprite,
 *                  relative to the character. 
 *          angle = the angle of the reflection sprite rotation. Set it
 *                  to 0 for no rotation or 2 to flip the sprite upside
 *                  down. Float values can be used.
 *           blur = the strenght of the blur effect on the reflection
 *                  sprite. Set it to 0 for no blur.
 *       opactity = the opacity of the reflection sprite ranging from
 *                  0 (invisible) to 255 (full opacity).
 *          pulse = enable a slight pulsating effect on the reflection
 *                  sprite to mimic water movement.
 *
 * 
 *          MIRROR BACKGROUND
 *          =================
 *          Use the following map notetag to draw an image from the /img/
 *          parallaxes folder of your game, and use it as background for
 *          your mirroring areas. You can use images of any size and set
 *          as many mirror background as you need.
 * 
 *              <**LABEL** MIRROR BACKGROUND: filename, x, y, z> 
 * 
 *      **LABEL** = the label or name of the notatag. You can name it as
 *                  you want, but be sure that it is followed by the key
 *                  words 'mirror background'. If you use more than one
 *                  notetag, each must have a different name, of course.
 *              x = the map tile X of the left border of your background
 *                  image. You can use float number.
 *              y = the map tile Y of the top border of your background
 *                  image. You can use float numbers.
 *              z = the z index of your background image. You can use
 *                  float numbers.
 * 
 *                **Wall reflection sprites have a z index of -0.5 and 
 *                  floor reflection sprites have a z index between -0.6
 *                  and -0.8. Use z values bellow the reflection sprites
 *                  for your background images.
 *     
 * 
 *  CHANGING REFLECTION SPRITE:
 *          If for whatever reason you want to change a character 
 *          reflection sprite to another character sprite, you can 
 *          use the following scriptcall:
 * 
 *          character.setReflectionChar([character sheet, character index]);
 * 
 *              *replace character by either:
 *                  $gamePlayer  //for the player
 *                  $gamePlayer.followers().follower(index) //for a follower
 *                  $gameMap.event(evenId)  //for a map event
 *  
 *          Example:
 *              $gamePlayer.setReflectionChar(['Actors1', 3]);
 * 
 *              This call will change the player reflection sprite to
 *              the character at index 3 on character sheet 'Actors1'
 *              
 *                  *note that the arguments are inside an array so
 *                   don't forget the square brackets. The name of
 *                   the character sheet must be inside quotes.
*          
 *          To revert back to the original sprite, set the method to false:
 * 
 *               $gamePlayer.setReflectionChar(false);
 *          
 *          This will set the player reflection sprite back to the original
 *          setting in the database.     
 *  
 * 
 * 
 * =======================================================================================
 * == Term of Usage ======================================================================
 * =======================================================================================
 * 
 * Use in any independant RPG Maker MZ or MV projects, including commercials.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itch.io account: 
 * https://the-northern-frog.itch.io/
 * 
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 2021/02/15 completed plugin, v1.0.0
 * 2021/02/18 small fix on wall mirror functions, v1.0.1
 * 2021/02/20 fix wall and floor mirror reflection position delay, v1.0.2
 * 2021/02/21 fix bug due to previous update, v1.0.3
 * 2021/02/21 add parameters for floor mirrors settings, v1.0.4
 * 2021/03/14 add the regionId argument to the map notetag, v1.0.5
 * 2021/03/17 fix reflection for event with image from tile sheet, v1.0.6
 * 2021/03/18 fix compatibility with TSR_MoveEvent, v1.0.7
 * 2021/03/19 add wall and floor mirrors offset event comment tag, v1.0.8
 * 2021/03/22 add mirror background image map notetag, v1.0.9
 * 2021/06/19 fix a bug with followers reflection, v1.1.0
 * 2021/08/15 add fix image comment tag and compatibility for big characters, v1.1.2
 * 2021/08/21 fix bug reported by user, v1.1.3
 * 2021/10/12 fix bug reported by user, v1.1.4
 * 2022/08/11 add the option to change the reflection sprites, v1.2.5
 * 2023/07/01 changed the angle ration and fix reflection asymmetry, v1.3.6
 * 2023/07/28 Chaucer added compatibility with his collision plugin, v1.4.0 
 * 
 * This plugin should be installed bellow TSR_MoveEvent for optimal compatibility
 * 
 * =======================================================================================
 * == END ================================================================================                                             
 * =======================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =======================================================================================
 *
 * 
 * @param ---Wall Mirror---
 *
 * @param Wall Mirror Id Type
 * @parent ---Wall Mirror---
 * @type combo
 * @option region id
 * @option tag
 * @desc Use map region Id or terrain tag to mark wall mirrors?
 * @default region id
 * 
 * @param Wall Mirror Region Id
 * @parent ---Wall Mirror---
 * @type Number
 * @min 1
 * @max 255
 * @desc Set the map region Id for wall mirror.
 * @default 253
 * 
 * @param Wall Mirror Terrain Tag
 * @parent ---Wall Mirror---
 * @type Number
 * @min 1
 * @max 7
 * @desc Set the terrain tag for wall mirror.
 * @default 5
 * 
 * @param Wall Mirror X Offset
 * @parent ---Wall Mirror---
 * @desc Set the horizontal offset of the reflection sprites.
 * @default 0
 * 
 * @param Wall Mirror Y Offset
 * @parent ---Wall Mirror---
 * @desc Set the vertical offset of the reflection sprites.
 * @default 0
 * 
 * 
 * @param ---Floor Mirror---
 *
 * @param Floor Mirror Id Type
 * @parent ---Floor Mirror---
 * @type combo
 * @option region id
 * @option tag
 * @desc Use map region Id or terrain tag to mark floor mirrors?
 * @default Region Id
 * 
 * @param Floor Mirror Region Id
 * @parent ---Floor Mirror---
 * @type Number
 * @min 1
 * @max 255
 * @desc Set the map region Id for floor mirror.
 * @default 254
 * 
 * @param Floor Mirror Terrain Tag
 * @parent ---Floor Mirror---
 * @type Number
 * @min 1
 * @max 7
 * @desc Set the terrain tag for floor mirror.
 * @default 6
 * 
 * @param Floor Mirror X Offset
 * @parent ---Floor Mirror---
 * @desc Set the horizontal offset of the reflection sprites.
 * @default 20
 * 
 * @param Floor Mirror Y Offset
 * @parent ---Floor Mirror---
 * @desc Set the vertical offset of the reflection sprites.
 * @default -56
 * 
 * @param Floor Mirror Angle
 * @parent ---Floor Mirror---
 * @desc Set the angle for the reflection sprite rotation.
 * @default 35
 *
 * @param Floor Mirror Blur
 * @parent ---Floor Mirror---
 * @desc Set the blur effect strenght of the reflection sprite.
 * @default 1
 * 
 * @param Floor Mirror Opacity
 * @parent ---Floor Mirror---
 * @type Number
 * @min 0
 * @max 255
 * @desc Set the opacity of the reflection sprite.
 * @default 200 
 *  
 * @param Floor Mirror Pulse
 * @parent ---Floor Mirror---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Enable the pulse effect for the reflection sprite?
 * OFF - false  ON - true
 * @default true
 * 
 *
 */

const _0x1f50d2=_0xbad7;function _0xbad7(_0x570614,_0x4a3239){const _0xa78baf=_0xa78b();return _0xbad7=function(_0xbad72c,_0x4fdbe9){_0xbad72c=_0xbad72c-0x14c;let _0x11f585=_0xa78baf[_0xbad72c];return _0x11f585;},_0xbad7(_0x570614,_0x4a3239);}(function(_0x29c2c9,_0x250bbd){const _0x494a66=_0xbad7,_0x8516b9=_0x29c2c9();while(!![]){try{const _0x202b4c=parseInt(_0x494a66(0x16c))/0x1+-parseInt(_0x494a66(0x188))/0x2+-parseInt(_0x494a66(0x197))/0x3*(parseInt(_0x494a66(0x1ce))/0x4)+-parseInt(_0x494a66(0x1d5))/0x5*(parseInt(_0x494a66(0x1f2))/0x6)+parseInt(_0x494a66(0x1cc))/0x7*(-parseInt(_0x494a66(0x21d))/0x8)+-parseInt(_0x494a66(0x1b6))/0x9*(-parseInt(_0x494a66(0x1f8))/0xa)+parseInt(_0x494a66(0x14d))/0xb;if(_0x202b4c===_0x250bbd)break;else _0x8516b9['push'](_0x8516b9['shift']());}catch(_0x2efe49){_0x8516b9['push'](_0x8516b9['shift']());}}}(_0xa78b,0x2f43c),TSR[_0x1f50d2(0x1b2)]=PluginManager[_0x1f50d2(0x1e8)](_0x1f50d2(0x196)),TSR[_0x1f50d2(0x17c)]['_mirrorId']=String(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x154)]),TSR['mirror'][_0x1f50d2(0x204)]=Number(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x20e)]),TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x1dc)]=Number(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x227)]),TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x171)]=String(TSR['Parameters'][_0x1f50d2(0x15b)]),TSR[_0x1f50d2(0x17c)]['_reflectMapId']=Number(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x1bc)]),TSR['mirror']['_reflectTag']=Number(TSR['Parameters'][_0x1f50d2(0x183)]),TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x1cf)]=function(_0x7c0559){const _0xbe4bd1=_0x1f50d2;let _0x10f0f4=_0x7c0559===_0xbe4bd1(0x17c)?TSR['mirror'][_0xbe4bd1(0x18e)]:TSR[_0xbe4bd1(0x17c)]['_reflectId'];if(_0x10f0f4===_0xbe4bd1(0x1d6)){const _0x401d44=_0x7c0559===_0xbe4bd1(0x17c)?TSR['mirror'][_0xbe4bd1(0x1dc)]:TSR[_0xbe4bd1(0x17c)][_0xbe4bd1(0x213)];return[_0xbe4bd1(0x21c),_0x401d44];}else{const _0x1e5f6b=_0x7c0559===_0xbe4bd1(0x17c)?TSR[_0xbe4bd1(0x17c)][_0xbe4bd1(0x204)]:TSR[_0xbe4bd1(0x17c)][_0xbe4bd1(0x19a)];return['regionId',_0x1e5f6b];}},TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x209)]=TSR['mirror'][_0x1f50d2(0x1cf)]('mirror'),TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x189)]=TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x1cf)](_0x1f50d2(0x17b)),TSR['mirror'][_0x1f50d2(0x1fb)]=parseInt(String(TSR[_0x1f50d2(0x1b2)]['Wall\x20Mirror\x20X\x20Offset'])),TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x14c)]=parseInt(String(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x211)])),TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x1f5)]=parseInt(String(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x18b)])),TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x175)]=parseInt(String(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x1ed)])),TSR['mirror'][_0x1f50d2(0x15f)]=parseFloat(String(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x17a)])),TSR['mirror'][_0x1f50d2(0x21a)]=parseFloat(String(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x1b4)])),TSR[_0x1f50d2(0x17c)]['_opacity']=Number(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x1bb)]),TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x1f3)]=eval(String(TSR[_0x1f50d2(0x1b2)][_0x1f50d2(0x168)])),DataManager['getMapBackGround']=function(){const _0x49e03b=_0x1f50d2;if(!$dataMap)return 0x0;const _0x8262b0=/<(.*)(?:MIRROR BACKGROUND|MIRROR BACKGROUND):[ ]*(.*(?:\s*,\s*\d+)*)>/i,_0x5c8cf8=$dataMap[_0x49e03b(0x221)][_0x49e03b(0x1cd)]()[_0x49e03b(0x20c)](/[\r\n]+/);let _0x19b616=[];for(let _0x3caaba=0x0;_0x3caaba<_0x5c8cf8['length'];_0x3caaba++){const _0x48f48c=_0x5c8cf8[_0x3caaba]['toLowerCase']();if(_0x48f48c[_0x49e03b(0x199)](_0x8262b0)){const _0x585c48=_0x48f48c[_0x49e03b(0x17d)](_0x5c8cf8[_0x3caaba][_0x49e03b(0x21b)]('<')+0x1,_0x48f48c[_0x49e03b(0x21b)](_0x49e03b(0x158))),_0x2de002=_0x48f48c[_0x49e03b(0x17d)](_0x5c8cf8[_0x3caaba][_0x49e03b(0x21b)](':')+0x1,_0x48f48c[_0x49e03b(0x21b)]('>'))[_0x49e03b(0x20c)](',');_0x2de002['unshift'](_0x585c48),_0x19b616[_0x49e03b(0x222)](_0x2de002);}}return _0x19b616;},DataManager['getMapMirrorInfos']=function(_0x4b006d){const _0x1b3a49=_0x1f50d2;if(!$dataMap)return 0x0;const _0x1e02c8=/<(?:FLOOR MIRROR INFO|FLOOR MIRROR):[ ]*(.*(?:\s*,\s*\d+)*)>/i,_0x275d57=$dataMap['note'][_0x1b3a49(0x1cd)]()[_0x1b3a49(0x20c)](/[\r\n]+/);for(let _0x503d52=0x0;_0x503d52<_0x275d57['length'];_0x503d52++){const _0x4b5ec7=_0x275d57[_0x503d52];if(_0x4b5ec7[_0x1b3a49(0x199)](_0x1e02c8)&&parseInt(RegExp['$1'])===_0x4b006d){const _0x4764eb=_0x275d57[_0x503d52]['slice'](_0x275d57[_0x503d52][_0x1b3a49(0x21b)](':')+0x1,_0x275d57[_0x503d52]['indexOf']('>'))[_0x1b3a49(0x20c)](',');if(parseInt(_0x4764eb[0x0])===_0x4b006d)return _0x4764eb;}}return 0x0;},DataManager[_0x1f50d2(0x1ba)]=function(_0x19aa8b){const _0x2b054c=_0x1f50d2;if(!_0x19aa8b[_0x2b054c(0x172)])return![];if(!_0x19aa8b[_0x2b054c(0x219)]())return![];const _0x184bd4=/<(?:PICKABLE EVENT|PICKUP EVENT)>/i,_0x35c266=/<(?:PICKABLE CHARACTER|PICKUP CHARACTER)>/i,_0x542c59=/<(?:PICKABLE EVENT|PICKUP EVENT):[ ](.)>/i,_0x2925e6=_0x19aa8b['list'](),_0x2fa528=_0x2925e6[_0x2b054c(0x16f)];for(let _0x3cdea7=0x0;_0x3cdea7<_0x2fa528;++_0x3cdea7){let _0x307026=_0x2925e6[_0x3cdea7];if([0x6c,0x198][_0x2b054c(0x14f)](_0x307026[_0x2b054c(0x180)])){const _0x1a2fe6=_0x307026[_0x2b054c(0x1e8)][0x0];if(_0x1a2fe6[_0x2b054c(0x199)](_0x184bd4)||_0x1a2fe6[_0x2b054c(0x199)](_0x35c266)||_0x1a2fe6[_0x2b054c(0x199)](_0x542c59))return!![];}}return![];},ImageManager[_0x1f50d2(0x19f)]=function(_0x4ef124){const _0x59f547=_0x1f50d2,_0xdefd29=_0x4ef124['includes'](_0x59f547(0x15c));return _0xdefd29;},TSR[_0x1f50d2(0x17c)]['Scene_Map_terminate']=Scene_Map['prototype'][_0x1f50d2(0x190)],Scene_Map['prototype']['terminate']=function(){const _0x5b6aaf=_0x1f50d2;$gamePlayer[_0x5b6aaf(0x1ae)](![]),$gamePlayer[_0x5b6aaf(0x1ee)](![]);for(const _0x5cbf11 of $gamePlayer[_0x5b6aaf(0x1f9)]()[_0x5b6aaf(0x176)]){_0x5cbf11[_0x5b6aaf(0x1ae)](![]),_0x5cbf11[_0x5b6aaf(0x1ee)](![]);}for(const _0x1322e7 of $gameMap[_0x5b6aaf(0x16a)]()){_0x1322e7['setPreventMirror'](![]),_0x1322e7[_0x5b6aaf(0x1ee)](![]);}TSR['mirror']['Scene_Map_terminate'][_0x5b6aaf(0x178)](this);},Game_Map['prototype'][_0x1f50d2(0x1ec)]=function(_0x2fd282,_0x7718fe){const _0x42f8eb=_0x1f50d2,_0x5e52be=TSR[_0x42f8eb(0x17c)][_0x42f8eb(0x209)][0x0],_0x51f769=TSR['mirror']['_mirrorInfo'][0x1];return this[_0x5e52be](_0x2fd282-0x1,_0x7718fe)===_0x51f769||this[_0x5e52be](_0x2fd282+0x1,_0x7718fe)===_0x51f769||this[_0x5e52be](_0x2fd282,_0x7718fe)===_0x51f769;},Game_Map['prototype']['isJustFrontMirrorTile']=function(_0x4a0814,_0xa1ee07){const _0x2e86ac=_0x1f50d2,_0x439400=TSR[_0x2e86ac(0x17c)][_0x2e86ac(0x209)][0x0],_0x3c3939=TSR[_0x2e86ac(0x17c)][_0x2e86ac(0x209)][0x1];return this[_0x439400](_0x4a0814,_0xa1ee07)===_0x3c3939;},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x1a3)]=function(_0x1daf84,_0x5b06fa){const _0x54498f=_0x1f50d2;if(this['isFrontOfMirror'](_0x1daf84,_0x5b06fa)){const _0x4001d2=this[_0x54498f(0x223)](_0x1daf84,_0x5b06fa);return this[_0x54498f(0x162)](_0x1daf84,_0x5b06fa,_0x4001d2);}return![];},Game_Character['prototype'][_0x1f50d2(0x1a3)]=function(_0x87bcf4,_0x785874){const _0x1655ab=_0x1f50d2;Imported[_0x1655ab(0x179)]&&$gameMap[_0x1655ab(0x193)]()&&(_0x87bcf4=Math[_0x1655ab(0x20f)](_0x87bcf4),_0x785874=Math['round'](_0x785874));if(this['isFrontOfMirror'](_0x87bcf4,_0x785874)){const _0x384aaa=this['calcMirrorHeight'](_0x87bcf4,_0x785874);return this['isNearMirrorTile'](_0x87bcf4,_0x785874,_0x384aaa);}return![];},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x169)]=function(_0x55656d,_0x52e7f6){const _0x1f1fb0=_0x1f50d2;return this[_0x1f1fb0(0x164)](_0x55656d,_0x52e7f6);},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x164)]=function(_0x49c7b1,_0x41ae20){const _0x1d7d41=_0x1f50d2;for(let _0x523cfb=_0x41ae20;_0x523cfb>0x0;_0x523cfb--){if($gameMap[_0x1d7d41(0x1ec)](_0x49c7b1,_0x523cfb))return!![];}return![];},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x162)]=function(_0x410a28,_0xc5758e,_0x211a45){const _0x4a1f60=_0x1f50d2;return this[_0x4a1f60(0x1b5)](_0x410a28,_0xc5758e,_0x211a45)?this[_0x4a1f60(0x14e)]=!![]:this[_0x4a1f60(0x14e)]=![],this['_inFrontOfMirror'];},Game_Character['prototype'][_0x1f50d2(0x1b5)]=function(_0x204ccd,_0x359b35,_0x1aa3e5){for(let _0xddc8d4=_0x359b35;_0xddc8d4>_0x359b35-_0x1aa3e5-0x1;_0xddc8d4--){if($gameMap['isFrontMirrorTile'](_0x204ccd,_0xddc8d4))return!![];}return![];},Game_Character['prototype'][_0x1f50d2(0x223)]=function(_0x23d858,_0x857f0){const _0x3eda7b=_0x1f50d2;this['resetMirrorBottomTop']();for(let _0x55fc58=_0x857f0;_0x55fc58>0x0;_0x55fc58--){if($gameMap[_0x3eda7b(0x1ec)](_0x23d858,_0x55fc58)){if(!this[_0x3eda7b(0x1d0)]())this[_0x3eda7b(0x1b0)]=_0x55fc58;}else{if(!this['topMirrorY']()&&this[_0x3eda7b(0x1d0)]()){this[_0x3eda7b(0x224)]=_0x55fc58+0x1;break;}}}return this['_bottomMirrorY']-this[_0x3eda7b(0x224)]+0x2;},Game_Character['prototype']['bottomMirrorY']=function(){const _0x21b768=_0x1f50d2;return this[_0x21b768(0x1b0)];},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x159)]=function(){const _0x1a95b0=_0x1f50d2;return this[_0x1a95b0(0x224)];},Game_Character['prototype'][_0x1f50d2(0x1e6)]=function(_0x4b2626,_0x499065){const _0x590d5f=_0x1f50d2;return this[_0x590d5f(0x174)](_0x4b2626,_0x499065);},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x174)]=function(_0x5c94d8,_0x4abc2b){const _0x1141bd=_0x1f50d2,_0x2b0811=$gameMap[_0x1141bd(0x1af)](_0x5c94d8,0x4),_0x2efb2e=$gameMap[_0x1141bd(0x1af)](_0x5c94d8,0x6),_0x279183=$gameMap[_0x1141bd(0x1af)](_0x2b0811,0x4),_0x1370ee=$gameMap[_0x1141bd(0x1af)](_0x2efb2e,0x6);return this['checkReflectY'](_0x5c94d8,_0x4abc2b)||this['checkReflectY'](_0x2b0811,_0x4abc2b)||this[_0x1141bd(0x16b)](_0x2efb2e,_0x4abc2b)||this['checkReflectY'](_0x279183,_0x4abc2b)||this['checkReflectY'](_0x1370ee,_0x4abc2b);},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x16b)]=function(_0x7fe7de,_0xdc87){const _0x45aea2=_0x1f50d2,_0xb59aee=this[_0x45aea2(0x1b8)](_0x7fe7de,_0xdc87),_0x56c6c8=_0xb59aee?'regionId':TSR[_0x45aea2(0x17c)][_0x45aea2(0x189)][0x0],_0x130b00=_0xb59aee?parseInt(_0xb59aee[0x0]):TSR[_0x45aea2(0x17c)][_0x45aea2(0x189)][0x1];return $gameMap[_0x56c6c8](_0x7fe7de,_0xdc87)===_0x130b00||$gameMap[_0x56c6c8](_0x7fe7de,_0xdc87-0x1)===_0x130b00||$gameMap[_0x56c6c8](_0x7fe7de,_0xdc87-0x2)===_0x130b00||$gameMap[_0x56c6c8](_0x7fe7de,_0xdc87+0x1)===_0x130b00||$gameMap[_0x56c6c8](_0x7fe7de,_0xdc87+0x2)===_0x130b00;},Game_Character['prototype']['checkMapMirrorInfos']=function(_0x417f56,_0x1f3a45){const _0x2f68e6=_0x1f50d2;for(let _0x46eb76=-0x2;_0x46eb76<0x2;_0x46eb76++){ar=DataManager['getMapMirrorInfos']($gameMap[_0x2f68e6(0x1fe)](_0x417f56,_0x1f3a45+_0x46eb76));if(ar)return this[_0x2f68e6(0x20a)](ar),ar;}return this['setCurrentMirrorInfo'](![]),![];},TSR['mirror'][_0x1f50d2(0x19d)]=Game_Character['prototype'][_0x1f50d2(0x1a7)],Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x1a7)]=function(){const _0x26684b=_0x1f50d2;TSR[_0x26684b(0x17c)][_0x26684b(0x19d)]['call'](this);if(!this['checkCannotMirrorTag']()){if(this['checkMirrorTiles'](this['x'],this['y'])&&this[_0x26684b(0x1b3)]()){this[_0x26684b(0x1d1)](!![]);if(Imported['TSR_MoveEvent']){if(this['isPlayer']()&&this[_0x26684b(0x15d)]){const _0x9deecc=this[_0x26684b(0x195)]();if(!_0x9deecc['preventMirror']())_0x9deecc[_0x26684b(0x1d1)](!![]);}}}if(this[_0x26684b(0x1e6)](this['x'],this['y'])&&this['canReflect']()){this['setReflect'](!![]);if(Imported[_0x26684b(0x1a1)]){if(this[_0x26684b(0x218)]()&&this['_hasPickup']){const _0x5888c1=this[_0x26684b(0x195)]();if(!_0x5888c1[_0x26684b(0x1c4)]())_0x5888c1['setReflect'](!![]);}}}}},Game_Character['prototype'][_0x1f50d2(0x1b3)]=function(){const _0x436a22=_0x1f50d2;if(this[_0x436a22(0x1fd)]&&!this[_0x436a22(0x17e)]())return![];return!this['preventMirror']();},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x1c9)]=function(){const _0x2cb8af=_0x1f50d2;if(this[_0x2cb8af(0x1fd)]&&!this[_0x2cb8af(0x17e)]())return![];return!this[_0x2cb8af(0x1c4)]();},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x18f)]=function(){const _0x13a2a8=_0x1f50d2;return this[_0x13a2a8(0x17f)]-this[_0x13a2a8(0x1b0)];},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x207)]=function(){return this['_needsMirror'];},Game_Character['prototype']['setMirror']=function(_0x578499){this['_needsMirror']=_0x578499;},Game_Character[_0x1f50d2(0x1a9)]['needsReflect']=function(){const _0x269e16=_0x1f50d2;return this[_0x269e16(0x1ab)];},Game_Character['prototype']['setReflect']=function(_0x548000){const _0x1ef96e=_0x1f50d2;this[_0x1ef96e(0x1ab)]=_0x548000;},Game_Character[_0x1f50d2(0x1a9)]['setCurrentMirrorInfo']=function(_0x49f7f4){const _0x5e4c07=_0x1f50d2;this[_0x5e4c07(0x185)]=_0x49f7f4;},Game_Character[_0x1f50d2(0x1a9)]['currentMirrorInfo']=function(){const _0x4b3b5f=_0x1f50d2;return this[_0x4b3b5f(0x185)];},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x1ad)]=function(){const _0x18ff55=_0x1f50d2;return this[_0x18ff55(0x1e9)];},Game_Character[_0x1f50d2(0x1a9)]['setReflectionChar']=function(_0x18f9a9){const _0x4c0b0a=_0x1f50d2;this[_0x4c0b0a(0x1e9)]=_0x18f9a9;},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x1fa)]=function(){return this['_preventMirror'];},Game_Character[_0x1f50d2(0x1a9)]['setPreventMirror']=function(_0x531596){const _0x4ceaa7=_0x1f50d2;this[_0x4ceaa7(0x18a)]=_0x531596;},Game_Character[_0x1f50d2(0x1a9)]['preventReflect']=function(){return this['_preventReflect'];},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x1ee)]=function(_0x10c912){const _0x2216b0=_0x1f50d2;this[_0x2216b0(0x170)]=_0x10c912;},Game_Character[_0x1f50d2(0x1a9)]['checkCannotMirrorTag']=function(){const _0x52572d=_0x1f50d2;return this[_0x52572d(0x210)];},Game_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x1a4)]=function(){return this['_fixMirrorImage'];},Game_Character[_0x1f50d2(0x1a9)]['inFrontOfMirror']=function(){const _0x4cfa90=_0x1f50d2;return this[_0x4cfa90(0x14e)];},Game_Character[_0x1f50d2(0x1a9)]['resetMirrorBottomTop']=function(){const _0x3943ea=_0x1f50d2;this[_0x3943ea(0x1b0)]=![],this[_0x3943ea(0x224)]=![];},TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x1c8)]=Game_Event['prototype'][_0x1f50d2(0x1df)],Game_Event[_0x1f50d2(0x1a9)][_0x1f50d2(0x1df)]=function(){const _0x21d44f=_0x1f50d2;TSR[_0x21d44f(0x17c)][_0x21d44f(0x1c8)][_0x21d44f(0x178)](this),this['checkMirrorEventTags']();},Game_Event['prototype']['checkMirrorEventTags']=function(){const _0x570d61=_0x1f50d2;if(!this[_0x570d61(0x219)]())return;const _0x28745e=/<(?:CANNOT MIRROR EVENT|NO MIRROR)>/i,_0x578f96=/<(?:WALL MIRROR OFFSET|WALL OFFSET):[ ]-*(\d+),[ ]-*(\d+)>/i,_0x40aaec=/<(?:FLOOR MIRROR OFFSET|WATER REFLECT OFFSET):[ ]-*(\d+),[ ]-*(\d+)>/i,_0x1ca953=/<(?:FIX MIRROR IMAGE|FIX IMAGE|FIX MIRROR)>/i,_0x1ee939=this[_0x570d61(0x1dd)](),_0x49b0b6=_0x1ee939[_0x570d61(0x16f)];this[_0x570d61(0x210)]=![],this[_0x570d61(0x167)]=![],this[_0x570d61(0x1e1)]=![],this[_0x570d61(0x1de)]=![];for(let _0x240dc6=0x0;_0x240dc6<_0x49b0b6;++_0x240dc6){let _0x2a71bb=_0x1ee939[_0x240dc6];if([0x6c,0x198][_0x570d61(0x14f)](_0x2a71bb[_0x570d61(0x180)])){const _0x232902=_0x2a71bb['parameters'][0x0];if(_0x232902[_0x570d61(0x199)](_0x28745e))this[_0x570d61(0x210)]=!![];else{if(_0x232902[_0x570d61(0x199)](_0x578f96)){const _0x944b27=parseInt(_0x232902['slice'](_0x232902[_0x570d61(0x21b)](':')+0x1,_0x232902['indexOf'](','))),_0x1f2fe1=parseInt(_0x232902[_0x570d61(0x17d)](_0x232902[_0x570d61(0x21b)](',')+0x1,_0x232902[_0x570d61(0x21b)]('>')));this[_0x570d61(0x167)]=[_0x944b27,_0x1f2fe1];}else{if(_0x232902[_0x570d61(0x199)](_0x40aaec)){const _0x28905d=parseInt(_0x232902[_0x570d61(0x17d)](_0x232902['indexOf'](':')+0x1,_0x232902['indexOf'](','))),_0x343a8a=parseInt(_0x232902[_0x570d61(0x17d)](_0x232902['indexOf'](',')+0x1,_0x232902['indexOf']('>')));this[_0x570d61(0x1e1)]=[_0x28905d,_0x343a8a];}else _0x232902['match'](_0x1ca953)&&(this[_0x570d61(0x1de)]=!![]);}}}}},TSR[_0x1f50d2(0x17c)]['_Spriteset_Map_createLowerLayer']=Spriteset_Map['prototype'][_0x1f50d2(0x163)],Spriteset_Map[_0x1f50d2(0x1a9)][_0x1f50d2(0x163)]=function(){const _0x75105b=_0x1f50d2;TSR[_0x75105b(0x17c)][_0x75105b(0x186)][_0x75105b(0x178)](this),this[_0x75105b(0x155)]();},Spriteset_Map['prototype'][_0x1f50d2(0x155)]=function(){const _0x4c873d=_0x1f50d2,_0x4a86c7=DataManager['getMapBackGround']();this['_mirrorBGArray']=[];if(_0x4a86c7[_0x4c873d(0x16f)]>0x0)for(const _0x19fb98 of _0x4a86c7){const _0x38d0e1=_0x19fb98[0x0][_0x4c873d(0x1e7)](),_0x49ae1c=_0x19fb98[0x1][_0x4c873d(0x1e7)](),_0x4c19e2=parseFloat(_0x19fb98[0x2]),_0x11d762=parseFloat(_0x19fb98[0x3]),_0x7913ca=parseFloat(_0x19fb98[0x4]);this[_0x4c873d(0x1b7)](_0x38d0e1,_0x49ae1c,_0x4c19e2,_0x11d762,_0x7913ca);}},Spriteset_Map[_0x1f50d2(0x1a9)][_0x1f50d2(0x1b7)]=function(_0x277393,_0x4a38f5,_0x3f0a7f,_0x5cf047,_0x4b91f8){const _0x175741=_0x1f50d2,_0x573218='-'+_0x277393+_0x175741(0x1d8);this[_0x573218]=new Sprite(),this[_0x573218][_0x175741(0x1fc)]=ImageManager[_0x175741(0x1f1)](_0x4a38f5),this[_0x573218]['setFrame'](0x0,0x0,this[_0x175741(0x16d)],this['height']),this[_0x573218][_0x175741(0x20d)]=_0x3f0a7f,this[_0x573218][_0x175741(0x1b9)]=_0x5cf047,this[_0x573218]['z']=_0x4b91f8,this[_0x175741(0x208)]['addChild'](this[_0x573218]),this[_0x175741(0x1c2)][_0x175741(0x222)](this[_0x573218]);},TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x18d)]=Spriteset_Map[_0x1f50d2(0x1a9)][_0x1f50d2(0x1a7)],Spriteset_Map[_0x1f50d2(0x1a9)][_0x1f50d2(0x1a7)]=function(){const _0x2db316=_0x1f50d2;TSR[_0x2db316(0x17c)][_0x2db316(0x18d)]['call'](this),this[_0x2db316(0x21f)]();},Spriteset_Map[_0x1f50d2(0x1a9)]['updateMirrorBackground']=function(){const _0x53e635=_0x1f50d2;for(const _0x51443d in this[_0x53e635(0x1c2)]){const _0x55d404=this['_mirrorBGArray'][_0x51443d],_0x31c69a=$gameMap['tileWidth'](),_0x4f9ac1=$gameMap['tileHeight']();_0x55d404['x']=_0x55d404[_0x53e635(0x20d)]*_0x31c69a-$gameMap[_0x53e635(0x20d)]*_0x31c69a,_0x55d404['y']=_0x55d404[_0x53e635(0x1b9)]*_0x4f9ac1-$gameMap['_displayY']*_0x4f9ac1;}},TSR['mirror'][_0x1f50d2(0x1e5)]=Sprite_Character[_0x1f50d2(0x1a9)]['initMembers'],Sprite_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x150)]=function(){const _0x50de23=_0x1f50d2;TSR[_0x50de23(0x17c)][_0x50de23(0x1e5)][_0x50de23(0x178)](this),this[_0x50de23(0x187)]=[],this[_0x50de23(0x1a0)]=[];},TSR[_0x1f50d2(0x17c)][_0x1f50d2(0x16e)]=Sprite_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x1a7)],Sprite_Character['prototype']['update']=function(){const _0x51b7fe=_0x1f50d2;TSR[_0x51b7fe(0x17c)][_0x51b7fe(0x16e)]['call'](this),this['updateMirrorSprites']();},Sprite_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x21e)]=function(){const _0x56e7ce=_0x1f50d2;this[_0x56e7ce(0x15e)](),this['_mirrorSpriteSet']['length']>0x0&&(!this[_0x56e7ce(0x187)][0x0][_0x56e7ce(0x225)]()&&(this['parent'][_0x56e7ce(0x152)](this[_0x56e7ce(0x187)][0x0]),this[_0x56e7ce(0x187)][_0x56e7ce(0x1a2)](),this[_0x56e7ce(0x153)][_0x56e7ce(0x1ae)](![]),this['_character'][_0x56e7ce(0x1ac)](),this[_0x56e7ce(0x153)][_0x56e7ce(0x14e)]=![])),this[_0x56e7ce(0x161)](),this[_0x56e7ce(0x1a0)][_0x56e7ce(0x16f)]>0x0&&(!this[_0x56e7ce(0x1a0)][0x0][_0x56e7ce(0x225)]()&&(this['parent']['removeChild'](this[_0x56e7ce(0x1a0)][0x0]),this[_0x56e7ce(0x1a0)][_0x56e7ce(0x1a2)](),this['_character'][_0x56e7ce(0x1ee)](![])));},Sprite_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x15e)]=function(){const _0x1564c5=_0x1f50d2;this[_0x1564c5(0x153)]['needsMirror']()&&(this[_0x1564c5(0x153)]['setMirror'](![]),this[_0x1564c5(0x153)][_0x1564c5(0x1ae)](!![]),this[_0x1564c5(0x200)]());},Sprite_Character['prototype'][_0x1f50d2(0x200)]=function(){const _0x2627f1=_0x1f50d2,_0x1fc233=this[_0x2627f1(0x1f6)]();this[_0x2627f1(0x187)][_0x2627f1(0x222)](_0x1fc233);},Sprite_Character[_0x1f50d2(0x1a9)]['createMirrorSprite']=function(){const _0x51c030=_0x1f50d2,_0x261c4b=new Sprite_Mirror();return _0x261c4b['x']=this[_0x51c030(0x153)]['screenX'](),_0x261c4b['y']=this['_character'][_0x51c030(0x1a8)](),_0x261c4b[_0x51c030(0x1e4)](this,this['_character']),this['parent']['addChild'](_0x261c4b),_0x261c4b;},Sprite_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x161)]=function(){const _0x59a6da=_0x1f50d2;this[_0x59a6da(0x153)][_0x59a6da(0x194)]()&&(this[_0x59a6da(0x153)][_0x59a6da(0x1ea)](![]),this[_0x59a6da(0x153)][_0x59a6da(0x1ee)](!![]),this['startReflect']());},Sprite_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x229)]=function(){const _0x11a72e=_0x1f50d2,_0x2ca2eb=this[_0x11a72e(0x181)]();this[_0x11a72e(0x1a0)]['push'](_0x2ca2eb);},Sprite_Character[_0x1f50d2(0x1a9)][_0x1f50d2(0x181)]=function(){const _0xdaebdd=_0x1f50d2,_0x47bee3=$gameMap[_0xdaebdd(0x22a)](),_0x241498=new Sprite_Reflect();return _0x241498['x']=-_0x47bee3,_0x241498['y']=-_0x47bee3,_0x241498[_0xdaebdd(0x1e4)](this,this[_0xdaebdd(0x153)]),this[_0xdaebdd(0x165)][_0xdaebdd(0x202)](_0x241498),_0x241498;});function Sprite_Reflection(){const _0x5414ca=_0x1f50d2;this[_0x5414ca(0x1be)][_0x5414ca(0x1c0)](this,arguments);}function _0xa78b(){const _0x807fb1=['createMirrorBackGroundSprites','screenX','scale','mirror\x20background','topMirrorY','hasBitmap','Floor\x20Mirror\x20Id\x20Type','_8dir','_hasPickup','setupMirror','_angle','isTransparent','setupReflect','isNearMirrorTile','createLowerLayer','isMirrorColumn','parent','tileId','_wallMirrorOffset','Floor\x20Mirror\x20Pulse','isFrontOfMirror','events','checkReflectY','204164HjLMGq','width','_Sprite_Character_update','length','_preventReflect','_reflectId','_eventId','updateContainerZ','isNearReflectTile','_floorOffsetY','_data','loadCharacter','call','COLLISION\x20ALTERING\x20PLUGIN','Floor\x20Mirror\x20Angle','reflect','mirror','slice','isVisible','_realY','code','createReflectSprite','_spriteChar','Floor\x20Mirror\x20Terrain\x20Tag','_offsetY','_currentMirrorInfo','_Spriteset_Map_createLowerLayer','_mirrorSpriteSet','93412aHmSkz','_reflectInfo','_preventMirror','Floor\x20Mirror\x20X\x20Offset','_grow','_Spriteset_Map_update','_mirrorId','distToBottomMirror','terminate','backDist','updateTileFrame','isPixelMovement','needsReflect','pickupEvent','TSR_Mirror','5574zwczWT','filters','match','_reflectMapId','updateCharacterFrame','characterIndex','_Game_Character_update','distBottom','is8dirCharacter','_reflectSpriteSet','TSR_MoveEvent','shift','checkMirrorTiles','checkFixMirrorTag','anchor','tilesetNames','update','screenY','prototype','pattern','_needsReflect','resetMirrorBottomTop','reflectionChar','setPreventMirror','roundXWithDirection','_bottomMirrorY','isBigCharacter','Parameters','canMirror','Floor\x20Mirror\x20Blur','checkMirrorY','188217kLgCkN','addMirrorBackground','checkMapMirrorInfos','_displayY','isPickupEvent','Floor\x20Mirror\x20Opacity','Floor\x20Mirror\x20Region\x20Id','height','initialize','is8DirSprite','apply','_filter','_mirrorBGArray','tilesetId','preventReflect','create','isPickup','loadTileset','_Game_Event_setupPage','canReflect','_tileId','constructor','33999XXKvHA','toString','164xDzVFE','setInfo','bottomMirrorY','setMirror','blur','BlurFilter','currentMirrorInfo','10eVhwan','tag','_patternW','MirrorBg','updateCharacterMove','_characterIndex','setData','_mirrorTag','list','_fixMirrorImage','setupPage','pushDist','_floorMirrorOffset','pixelUpdateCharacterFrame','rotation','setup','_Sprite_Character_initMembers','checkReflectTiles','trim','parameters','_reflectionChar','setReflect','_isPickable','isFrontMirrorTile','Floor\x20Mirror\x20Y\x20Offset','setPreventReflect','_offsetX','_big','loadParallax','198810uYIQNi','_pulse','pullDist','_floorOffsetX','createMirrorSprite','diagonalDir','30IVKGAC','followers','preventMirror','_wallOffsetX','bitmap','_memberIndex','regionId','floor','startMirror','_patternH','addChild','direction','_mirrorMapId','_characterName','_scale','needsMirror','_tilemap','_mirrorInfo','setCurrentMirrorInfo','_tilesetId','split','_displayX','Wall\x20Mirror\x20Region\x20Id','round','_cannotMirror','Wall\x20Mirror\x20Y\x20Offset','tileset','_reflectTag','setFrame','_originalScaleX','tilesetBitmap','_originalScaleY','isPlayer','page','_blur','indexOf','terrainTag','72vSTelg','updateMirrorSprites','updateMirrorBackground','opacity','note','push','calcMirrorHeight','_topMirrorY','isPlaying','updateScale','Wall\x20Mirror\x20Terrain\x20Tag','_needFlip','startReflect','tileWidth','visible','_wallOffsetY','1755160JnRYew','_inFrontOfMirror','contains','initMembers','_rChar','removeChild','_character','Wall\x20Mirror\x20Id\x20Type'];_0xa78b=function(){return _0x807fb1;};return _0xa78b();}Sprite_Reflection[_0x1f50d2(0x1a9)]=Object[_0x1f50d2(0x1c5)](Sprite[_0x1f50d2(0x1a9)]),Sprite_Reflection[_0x1f50d2(0x1a9)][_0x1f50d2(0x1cb)]=Sprite_Reflection,Sprite_Reflection['prototype'][_0x1f50d2(0x1a7)]=function(){const _0x252dfb=_0x1f50d2;Sprite[_0x252dfb(0x1a9)]['update'][_0x252dfb(0x178)](this),this[_0x252dfb(0x153)][_0x252dfb(0x166)]()>0x0?this[_0x252dfb(0x192)]():this[_0x252dfb(0x19b)](),this[_0x252dfb(0x1d9)](),this[_0x252dfb(0x22b)]=!this[_0x252dfb(0x153)][_0x252dfb(0x160)]()&&this[_0x252dfb(0x15a)]();},Sprite_Reflection['prototype'][_0x1f50d2(0x216)]=function(_0x236d78){const _0x1c1458=_0x1f50d2,_0x42ca5c=$gameMap[_0x1c1458(0x212)](),_0x4b3c7e=0x5+Math[_0x1c1458(0x1ff)](_0x236d78/0x100);return ImageManager[_0x1c1458(0x1c7)](_0x42ca5c[_0x1c1458(0x1a6)][_0x4b3c7e]);},Sprite_Reflection[_0x1f50d2(0x1a9)][_0x1f50d2(0x192)]=function(){const _0x5bb512=_0x1f50d2,_0xe1aba4=this[_0x5bb512(0x1ca)],_0x471ae3=$gameMap['tileWidth'](),_0x21c8f2=$gameMap['tileHeight'](),_0x1a9562=(Math[_0x5bb512(0x1ff)](_0xe1aba4/0x80)%0x2*0x8+_0xe1aba4%0x8)*_0x471ae3,_0x2b8aba=Math[_0x5bb512(0x1ff)](_0xe1aba4%0x100/0x8)%0x10*_0x21c8f2;this['setFrame'](_0x1a9562,_0x2b8aba,_0x471ae3,_0x21c8f2);},Sprite_Reflection[_0x1f50d2(0x1a9)][_0x1f50d2(0x19b)]=function(){const _0x17f01b=_0x1f50d2;if(Imported[_0x17f01b(0x179)]){if(this[_0x17f01b(0x153)][_0x17f01b(0x1bf)]())return this['pixelUpdateCharacterFrame']();}},Sprite_Reflection[_0x1f50d2(0x1a9)][_0x1f50d2(0x15a)]=function(){const _0x5999e7=_0x1f50d2;if(!this[_0x5999e7(0x153)])return;const _0x1e2e6d=this['_character'][_0x5999e7(0x1ad)]()?this[_0x5999e7(0x205)]===this[_0x5999e7(0x153)][_0x5999e7(0x1ad)]()[0x0]:this[_0x5999e7(0x205)]===this['_character']['characterName'](),_0x2d3b2a=this['_character'][_0x5999e7(0x1ad)]()?this[_0x5999e7(0x1da)]===this[_0x5999e7(0x153)][_0x5999e7(0x1ad)]()[0x1]:this['_characterIndex']===this[_0x5999e7(0x153)][_0x5999e7(0x19c)]();return _0x1e2e6d&&_0x2d3b2a||(this[_0x5999e7(0x20b)]===$gameMap[_0x5999e7(0x1c3)]()||this[_0x5999e7(0x1ca)]===this[_0x5999e7(0x153)][_0x5999e7(0x166)]());},Sprite_Reflection[_0x1f50d2(0x1a9)]['isPlaying']=function(){const _0x561357=_0x1f50d2;return this[_0x561357(0x15a)]();};function Sprite_Mirror(){const _0x3509fc=_0x1f50d2;this[_0x3509fc(0x1be)]['apply'](this,arguments);}Sprite_Mirror[_0x1f50d2(0x1a9)]=Object['create'](Sprite_Reflection[_0x1f50d2(0x1a9)]),Sprite_Mirror[_0x1f50d2(0x1a9)][_0x1f50d2(0x1be)]=function(){const _0xb3a29c=_0x1f50d2;Sprite_Reflection[_0xb3a29c(0x1a9)][_0xb3a29c(0x1be)][_0xb3a29c(0x178)](this),this[_0xb3a29c(0x150)]();},Sprite_Mirror[_0x1f50d2(0x1a9)][_0x1f50d2(0x150)]=function(){const _0x136e58=_0x1f50d2;this[_0x136e58(0x1a5)]['x']=0.5,this[_0x136e58(0x1a5)]['y']=0x0,this['z']=-0.5,this[_0x136e58(0x1ef)]=TSR['mirror']['_wallOffsetX'],this['_offsetY']=TSR[_0x136e58(0x17c)]['_wallOffsetY'];},Sprite_Mirror[_0x1f50d2(0x1a9)][_0x1f50d2(0x1e4)]=function(_0x33913b,_0x5e108a){const _0x2bc622=_0x1f50d2,_0x2634b2=_0x5e108a[_0x2bc622(0x167)];_0x2634b2&&(this[_0x2bc622(0x1ef)]=_0x2634b2[0x0],this[_0x2bc622(0x184)]=_0x2634b2[0x1]);const _0x4f94d0=_0x5e108a[_0x2bc622(0x1ad)](),_0x5e6d12=_0x4f94d0?_0x4f94d0[0x0]:null,_0x5095c5=_0x4f94d0?_0x4f94d0[0x1]:null;this[_0x2bc622(0x151)]=_0x4f94d0,this[_0x2bc622(0x182)]=_0x33913b,this[_0x2bc622(0x153)]=_0x5e108a,this[_0x2bc622(0x205)]=_0x5e6d12||_0x5e108a['_characterName'],this[_0x2bc622(0x1da)]=_0x5095c5||_0x5e108a['_characterIndex'];_0x5e108a[_0x2bc622(0x206)]&&(this[_0x2bc622(0x157)]['x']=_0x5e108a[_0x2bc622(0x206)],this[_0x2bc622(0x157)]['y']=_0x5e108a[_0x2bc622(0x206)],this[_0x2bc622(0x1ef)]*=_0x5e108a[_0x2bc622(0x206)],this[_0x2bc622(0x184)]*=_0x5e108a[_0x2bc622(0x206)]);this[_0x2bc622(0x1f0)]=ImageManager['isBigCharacter'](this[_0x2bc622(0x205)]),this[_0x2bc622(0x15c)]=ImageManager['is8dirCharacter'](this[_0x2bc622(0x205)]),this[_0x2bc622(0x1d7)]=this[_0x2bc622(0x1f0)]?0x3:0xc,this[_0x2bc622(0x201)]=this[_0x2bc622(0x1f0)]?0x4:0x8;if(this[_0x2bc622(0x15c)])this['_patternH']*=0x2;_0x5e108a[_0x2bc622(0x1ca)]>0x0?(this['_tileId']=_0x5e108a[_0x2bc622(0x1ca)],this[_0x2bc622(0x1fc)]=this[_0x2bc622(0x216)](this[_0x2bc622(0x1ca)]),this['updateTileFrame']()):(this[_0x2bc622(0x1fc)]=ImageManager[_0x2bc622(0x177)](this[_0x2bc622(0x205)]),this[_0x2bc622(0x19b)]()),this[_0x2bc622(0x1d9)]();},Sprite_Mirror['prototype']['distBottom']=function(){const _0x34d8ea=_0x1f50d2,_0x4c8a32=this[_0x34d8ea(0x153)][_0x34d8ea(0x18f)]()*$gameMap[_0x34d8ea(0x22a)]();return _0x4c8a32;},Sprite_Mirror[_0x1f50d2(0x1a9)]['updateCharacterFrame']=function(){const _0x1adc8b=_0x1f50d2;Sprite_Reflection[_0x1adc8b(0x1a9)][_0x1adc8b(0x19b)][_0x1adc8b(0x178)](this);const _0x56fee2=this['_characterIndex'];let _0x29fc23=this['_character']['direction']();if(this['_8dir'])_0x29fc23=this['_character'][_0x1adc8b(0x1f7)]()||_0x29fc23;!this['_character'][_0x1adc8b(0x1eb)]&&!this[_0x1adc8b(0x153)][_0x1adc8b(0x1a4)]()&&(_0x29fc23=0xa-_0x29fc23,!this['_needFlip']&&(this[_0x1adc8b(0x228)]=!![],this[_0x1adc8b(0x157)]['x']*=-0x1));const _0xa3ef41=this[_0x1adc8b(0x1fc)][_0x1adc8b(0x16d)]/this[_0x1adc8b(0x1d7)],_0x463425=this[_0x1adc8b(0x1fc)][_0x1adc8b(0x1bd)]/this[_0x1adc8b(0x201)],_0x1ff0a2=this['_big']?0x0:_0x56fee2%0x4*0x3,_0x51c1ae=this[_0x1adc8b(0x1f0)]?0x0:Math[_0x1adc8b(0x1ff)](_0x56fee2/0x4)*0x4,_0x2a12bc=!this[_0x1adc8b(0x15c)]?(_0x29fc23-0x2)/0x2:_0x29fc23>0x4?_0x29fc23-0x2:_0x29fc23-0x1,_0x3f9910=(_0x1ff0a2+this['_character']['pattern']())*_0xa3ef41,_0x2260af=(_0x51c1ae+_0x2a12bc)*_0x463425;this[_0x1adc8b(0x214)](_0x3f9910,_0x2260af,_0xa3ef41,_0x463425);},Sprite_Mirror[_0x1f50d2(0x1a9)][_0x1f50d2(0x1e2)]=function(){const _0x108e8e=_0x1f50d2,_0x245e9d=this[_0x108e8e(0x1da)];let _0x20f9a3=this[_0x108e8e(0x153)][_0x108e8e(0x203)]();!this[_0x108e8e(0x153)][_0x108e8e(0x1eb)]&&!this['_character'][_0x108e8e(0x1a4)]()&&(_0x20f9a3=0xa-_0x20f9a3,!this[_0x108e8e(0x228)]&&(this[_0x108e8e(0x228)]=!![],this[_0x108e8e(0x157)]['x']*=-0x1));const _0x3ce3e4=this[_0x108e8e(0x1fc)][_0x108e8e(0x16d)]/this[_0x108e8e(0x1d7)],_0x2b17e1=this[_0x108e8e(0x1fc)][_0x108e8e(0x1bd)]/(this[_0x108e8e(0x1f0)]?0x8:0x10),_0x5e48e3=this[_0x108e8e(0x1f0)]?0x0:_0x245e9d%0x4*0x3,_0x5094bf=this['_big']?0x0:Math[_0x108e8e(0x1ff)](_0x245e9d/0x4)*0x8,_0x1fb5de=_0x20f9a3-(_0x20f9a3>=0x5?0x2:0x1),_0x170c9c=(_0x5e48e3+this[_0x108e8e(0x153)][_0x108e8e(0x1aa)]())*_0x3ce3e4,_0x5dfb99=(_0x5094bf+_0x1fb5de)*_0x2b17e1;this[_0x108e8e(0x214)](_0x170c9c,_0x5dfb99,_0x3ce3e4,_0x2b17e1);},Sprite_Mirror[_0x1f50d2(0x1a9)][_0x1f50d2(0x1d9)]=function(){const _0x1b63e6=_0x1f50d2,_0x2302f8=this[_0x1b63e6(0x184)]-this[_0x1b63e6(0x19e)]()*0x2;if(Imported[_0x1b63e6(0x1a1)]){let _0x56e90f=0x2*(this[_0x1b63e6(0x182)]['y']-this[_0x1b63e6(0x153)][_0x1b63e6(0x1a8)]());if(this[_0x1b63e6(0x153)]['pushDist']()||this[_0x1b63e6(0x153)][_0x1b63e6(0x1f4)]()||this[_0x1b63e6(0x153)][_0x1b63e6(0x191)]())this['x']=this['_spriteChar']['x']+this[_0x1b63e6(0x1ef)],this['y']=this[_0x1b63e6(0x182)]['y']-_0x56e90f+_0x2302f8;else{const _0x2ede30=$gamePlayer[_0x1b63e6(0x203)](),_0x13d70e=this[_0x1b63e6(0x153)][_0x1b63e6(0x1c6)](),_0x16cf45=_0x13d70e?_0x2ede30===0x4||_0x2ede30===0x6?0xc:0x7:0x0;this['x']=this[_0x1b63e6(0x153)][_0x1b63e6(0x156)]()+this[_0x1b63e6(0x1ef)],this['y']=this[_0x1b63e6(0x153)]['screenY']()+_0x2302f8-_0x16cf45*0x2;}}else this['x']=this[_0x1b63e6(0x153)][_0x1b63e6(0x156)]()+this['_offsetX'],this['y']=this[_0x1b63e6(0x153)][_0x1b63e6(0x1a8)]()+_0x2302f8;},Sprite_Mirror['prototype'][_0x1f50d2(0x225)]=function(){const _0x1d5cb5=_0x1f50d2;return this[_0x1d5cb5(0x153)][_0x1d5cb5(0x1a3)](this[_0x1d5cb5(0x153)]['x'],this[_0x1d5cb5(0x153)]['y'])&&Sprite_Reflection['prototype']['isPlaying'][_0x1d5cb5(0x178)](this);};function Sprite_Reflect(){const _0x19217c=_0x1f50d2;this[_0x19217c(0x1be)]['apply'](this,arguments);}Sprite_Reflect[_0x1f50d2(0x1a9)]=Object[_0x1f50d2(0x1c5)](Sprite_Reflection['prototype']),Sprite_Reflect[_0x1f50d2(0x1a9)][_0x1f50d2(0x1be)]=function(){const _0x2ec8b8=_0x1f50d2;Sprite_Reflection['prototype'][_0x2ec8b8(0x1be)][_0x2ec8b8(0x178)](this),this[_0x2ec8b8(0x150)]();},Sprite_Reflect[_0x1f50d2(0x1a9)]['initMembers']=function(){const _0x2c0cb6=_0x1f50d2;this[_0x2c0cb6(0x1a5)]['x']=0.5,this[_0x2c0cb6(0x1a5)]['y']=0.5,this['z']=-0.6;},Sprite_Reflect['prototype'][_0x1f50d2(0x1db)]=function(_0x2fe284){const _0x48892d=_0x1f50d2;_0x2fe284?(this['_offsetX']=parseInt(_0x2fe284[0x1]),this[_0x48892d(0x184)]=parseInt(_0x2fe284[0x2]),this[_0x48892d(0x15f)]=parseFloat(_0x2fe284[0x3]),this['_blur']=parseFloat(_0x2fe284[0x4]),this[_0x48892d(0x220)]=parseInt(_0x2fe284[0x5]),this['_pulse']=_0x2fe284[0x6]):(this[_0x48892d(0x1ef)]=TSR[_0x48892d(0x17c)]['_floorOffsetX'],this[_0x48892d(0x184)]=TSR['mirror'][_0x48892d(0x175)],this[_0x48892d(0x15f)]=TSR[_0x48892d(0x17c)][_0x48892d(0x15f)],this[_0x48892d(0x21a)]=TSR[_0x48892d(0x17c)][_0x48892d(0x21a)],this['opacity']=TSR[_0x48892d(0x17c)]['_opacity'],this[_0x48892d(0x1f3)]=TSR[_0x48892d(0x17c)][_0x48892d(0x1f3)]);},Sprite_Reflect['prototype'][_0x1f50d2(0x1e4)]=function(_0x462a6f,_0x197412){const _0x2e1432=_0x1f50d2,_0x5deda0=_0x197412['reflectionChar'](),_0x1033ae=_0x5deda0?_0x5deda0[0x0]:null,_0x14f53f=_0x5deda0?_0x5deda0[0x1]:null;this[_0x2e1432(0x151)]=_0x5deda0,this[_0x2e1432(0x182)]=_0x462a6f;const _0x5d45fb=_0x197412['_floorMirrorOffset'];this[_0x2e1432(0x209)]=_0x197412[_0x2e1432(0x1d4)](),this[_0x2e1432(0x1db)](this['_mirrorInfo']),this[_0x2e1432(0x1e3)]=Math['PI']*0x2/0x168*this[_0x2e1432(0x15f)],this['_filter']=new PIXI[(_0x2e1432(0x198))][(_0x2e1432(0x1d3))](),this[_0x2e1432(0x1c1)][_0x2e1432(0x1d2)]=this[_0x2e1432(0x21a)],this['filters']=[this[_0x2e1432(0x1c1)]];_0x5d45fb&&(this['_offsetX']=_0x5d45fb[0x0],this[_0x2e1432(0x184)]=_0x5d45fb[0x1]);_0x197412[_0x2e1432(0x206)]&&(this['scale']['x']=_0x197412[_0x2e1432(0x206)],this[_0x2e1432(0x157)]['y']=_0x197412[_0x2e1432(0x206)],this['_offsetX']*=_0x197412['_scale'],this[_0x2e1432(0x184)]*=_0x197412[_0x2e1432(0x206)]);this[_0x2e1432(0x215)]=this[_0x2e1432(0x157)]['x'],this[_0x2e1432(0x217)]=this[_0x2e1432(0x157)]['y'],this['_character']=_0x197412,this[_0x2e1432(0x205)]=_0x1033ae||_0x197412[_0x2e1432(0x205)],this['_characterIndex']=_0x14f53f||_0x197412[_0x2e1432(0x1da)],this[_0x2e1432(0x1f0)]=ImageManager[_0x2e1432(0x1b1)](this[_0x2e1432(0x205)]),this[_0x2e1432(0x15c)]=ImageManager[_0x2e1432(0x19f)](this[_0x2e1432(0x205)]),this[_0x2e1432(0x1d7)]=this[_0x2e1432(0x1f0)]?0x3:0xc,this[_0x2e1432(0x201)]=this['_big']?0x4:0x8;if(this[_0x2e1432(0x15c)])this[_0x2e1432(0x201)]*=0x2;_0x197412[_0x2e1432(0x1ca)]>0x0?(this['_tileId']=_0x197412[_0x2e1432(0x1ca)],this[_0x2e1432(0x1fc)]=this[_0x2e1432(0x216)](this['_tileId']),this[_0x2e1432(0x192)]()):(this['bitmap']=ImageManager[_0x2e1432(0x177)](this[_0x2e1432(0x205)]),this[_0x2e1432(0x19b)]()),this[_0x2e1432(0x1d9)]();},Sprite_Reflect[_0x1f50d2(0x1a9)][_0x1f50d2(0x1a7)]=function(){const _0x4debfd=_0x1f50d2;Sprite_Reflection[_0x4debfd(0x1a9)][_0x4debfd(0x1a7)][_0x4debfd(0x178)](this);if(this['_pulse'])this[_0x4debfd(0x226)]();},Sprite_Reflect['prototype']['updateCharacterFrame']=function(){const _0x34ef52=_0x1f50d2;Sprite_Reflection[_0x34ef52(0x1a9)][_0x34ef52(0x19b)][_0x34ef52(0x178)](this);const _0x2e0cfe=this[_0x34ef52(0x1da)];let _0x4fc683=this[_0x34ef52(0x153)]['direction']();if(this[_0x34ef52(0x15c)])_0x4fc683=this['_character']['diagonalDir']()||_0x4fc683;!this[_0x34ef52(0x153)][_0x34ef52(0x1eb)]&&(this[_0x34ef52(0x15f)]<=0x5a||this[_0x34ef52(0x15f)]>=0x10e?(_0x4fc683=_0x4fc683!==0x4&&_0x4fc683!==0x6?0xa-_0x4fc683:_0x4fc683,this['_needFlip']=![]):!this[_0x34ef52(0x228)]&&(this[_0x34ef52(0x228)]=!![],this[_0x34ef52(0x157)]['x']*=-0x1,this['_originalScaleX']*=-0x1));const _0x409dc3=this[_0x34ef52(0x1fc)][_0x34ef52(0x16d)]/this['_patternW'],_0x3f29d9=this['bitmap']['height']/this[_0x34ef52(0x201)],_0x2bc50b=this[_0x34ef52(0x1f0)]?0x0:_0x2e0cfe%0x4*0x3,_0x4073da=this['_big']?0x0:Math[_0x34ef52(0x1ff)](_0x2e0cfe/0x4)*0x4,_0xc7f7c7=!this[_0x34ef52(0x15c)]?(_0x4fc683-0x2)/0x2:_0x4fc683>0x4?_0x4fc683-0x2:_0x4fc683-0x1,_0x2eba69=(_0x2bc50b+this[_0x34ef52(0x153)][_0x34ef52(0x1aa)]())*_0x409dc3,_0x1c04fe=(_0x4073da+_0xc7f7c7)*_0x3f29d9;this['setFrame'](_0x2eba69,_0x1c04fe,_0x409dc3,_0x3f29d9);},Sprite_Reflect[_0x1f50d2(0x1a9)][_0x1f50d2(0x1e2)]=function(){const _0x2d3e51=_0x1f50d2,_0x3044b8=this[_0x2d3e51(0x1da)];let _0xa6568b=this['_character']['direction']();if(this[_0x2d3e51(0x15c)])_0xa6568b=this[_0x2d3e51(0x153)]['diagonalDir']()||_0xa6568b;!this[_0x2d3e51(0x153)]['_isPickable']&&(this['_angle']<=0x5a||this[_0x2d3e51(0x15f)]>=0x10e?(_0xa6568b=_0xa6568b!==0x4&&_0xa6568b!==0x6?0xa-_0xa6568b:_0xa6568b,this['_needFlip']=![]):!this[_0x2d3e51(0x228)]&&(this[_0x2d3e51(0x228)]=!![],this['scale']['x']*=-0x1,this[_0x2d3e51(0x215)]*=-0x1));_0xa6568b=_0xa6568b==0x7?0x9:_0xa6568b==0x9?0x7:_0xa6568b,_0xa6568b=_0xa6568b==0x3?0x1:_0xa6568b==0x1?0x3:_0xa6568b;const _0x1141c1=this[_0x2d3e51(0x1fc)][_0x2d3e51(0x16d)]/this['_patternW'],_0x2046c9=this[_0x2d3e51(0x1fc)][_0x2d3e51(0x1bd)]/(this[_0x2d3e51(0x1f0)]?0x8:0x10),_0x1cb6bb=this[_0x2d3e51(0x1f0)]?0x0:_0x3044b8%0x4*0x3,_0x3857cb=this[_0x2d3e51(0x1f0)]?0x0:Math[_0x2d3e51(0x1ff)](_0x3044b8/0x4)*0x8,_0x105564=_0xa6568b-(_0xa6568b>=0x5?0x2:0x1),_0x741c9=(_0x1cb6bb+this[_0x2d3e51(0x153)][_0x2d3e51(0x1aa)]())*_0x1141c1,_0xc21df2=(_0x3857cb+_0x105564)*_0x2046c9;this[_0x2d3e51(0x214)](_0x741c9,_0xc21df2,_0x1141c1,_0x2046c9);},Sprite_Reflect[_0x1f50d2(0x1a9)][_0x1f50d2(0x1d9)]=function(){const _0x97fb55=_0x1f50d2;if(Imported[_0x97fb55(0x1a1)]){this['updateContainerZ'](this[_0x97fb55(0x153)][_0x97fb55(0x172)]);if(this[_0x97fb55(0x153)][_0x97fb55(0x1e0)]()||this[_0x97fb55(0x153)]['pullDist']()||this[_0x97fb55(0x153)][_0x97fb55(0x191)]()){this['x']=this['_spriteChar']['x']+this[_0x97fb55(0x1ef)],this['y']=this['_spriteChar']['y']+this['_offsetY'];;}else this['x']=this[_0x97fb55(0x153)][_0x97fb55(0x156)]()+this[_0x97fb55(0x1ef)],this['y']=this['_character'][_0x97fb55(0x1a8)]()+this[_0x97fb55(0x184)];}else this['x']=this['_character']['screenX']()+this[_0x97fb55(0x1ef)],this['y']=this[_0x97fb55(0x153)][_0x97fb55(0x1a8)]()+this[_0x97fb55(0x184)];},Sprite_Reflect[_0x1f50d2(0x1a9)][_0x1f50d2(0x173)]=function(_0x9b2927){const _0x39058b=_0x1f50d2,_0x2be326=$gamePlayer;if(_0x2be326['isHolding'](_0x9b2927)){let _0x5490e0;this[_0x39058b(0x15f)]<=0x5a&&this[_0x39058b(0x15f)]>=0x10e?_0x5490e0=0x8:_0x5490e0=0x2,_0x2be326[_0x39058b(0x203)]()===_0x5490e0?this['z']=-0.5:this['z']=-0.7;}},Sprite_Reflect['prototype']['updateScale']=function(){const _0x3f12b9=_0x1f50d2,_0x3f567d=this[_0x3f12b9(0x228)]?-0.002:0.002,_0x9a81c8=this[_0x3f12b9(0x228)]?-0.0005:0.0005,_0x3fa0d7=this[_0x3f12b9(0x228)]?this[_0x3f12b9(0x157)]['x']>this['_originalScaleX']*1.03:this['scale']['x']<this[_0x3f12b9(0x215)]*1.03,_0x201092=this['_needFlip']?this[_0x3f12b9(0x157)]['x']<this[_0x3f12b9(0x215)]*0.97:this[_0x3f12b9(0x157)]['x']>this[_0x3f12b9(0x215)]*0.97;!this[_0x3f12b9(0x18c)]?_0x3fa0d7?(this[_0x3f12b9(0x157)]['x']+=_0x3f567d,this['scale']['y']-=_0x9a81c8):this[_0x3f12b9(0x18c)]=!![]:_0x201092?(this['scale']['x']-=_0x3f567d,this[_0x3f12b9(0x157)]['y']+=_0x9a81c8):this['_grow']=![];},Sprite_Reflect[_0x1f50d2(0x1a9)][_0x1f50d2(0x225)]=function(){const _0x32095c=_0x1f50d2;return this[_0x32095c(0x153)][_0x32095c(0x1e6)](this[_0x32095c(0x153)]['x'],this[_0x32095c(0x153)]['y'])&&this[_0x32095c(0x209)][0x0]===this[_0x32095c(0x153)][_0x32095c(0x1d4)]()[0x0]&&Sprite_Reflection[_0x32095c(0x1a9)][_0x32095c(0x225)][_0x32095c(0x178)](this);};

//==== END ======================================================================
//===============================================================================
