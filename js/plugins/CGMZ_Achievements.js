/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/achievements/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_CurrencySystem
 * @plugindesc Creates a powerful achievement system
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.8.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Description: Adds an achievements system including achievement points,
 * secret achievements, difficulty, and more. Achievements offer automatic
 * tracking as well as manual unlocking. Achievements can also have rewards
 * such as items or gold, or even switches/variables. This plugin works well
 * with CGMZ Toast Manager for pop ups when an achievement is earned. This
 * plugin also allows for achievements based off of CGMZ Encyclopedia and
 * Bestiary completion percentage.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -------------------------Plugin Commands------------------------------------
 * This plugin supports the following plugin commands:
 * 
 * • Earn Achievement by Name
 * This earns the achievement with the name provided, case sensitive
 *
 * • Earn Achievement by ID
 * This earns the achievement with the provided ID. IDs are the order the
 * achievements are listed in the plugin manager and start at 1.
 *
 * • Call Scene
 * This calls the achievement scene.
 *
 * • Change Description
 * This will let you change the pre and post description of an achievement
 *
 * • Change Secret
 * This will let you change the secret property of an achievement
 *
 * • Fail Achievement
 * Marks an achievement as failed
 *
 * • Reinitialize
 * This will reset all achievement progress as if you had started a new game.
 * ---------------------------JavaScript---------------------------------------
 * To call the achievement scene via JavaScript command, use:
 * SceneManager.push(CGMZ_Scene_Achievements);
 * ----------------------Failed Achievements-----------------------------------
 * If an achievement is failed, it will no longer check for automatic
 * completion. However, you can still manually complete failed achievements
 * via plugin command. Failed achievements do not show criteria, but can show
 * rewards based on plugin parameter Show Rewards After Fail.
 * ---------------------------Integrations-------------------------------------
 * CGMZ Toast Manager
 * This plugin has additional functionality when using CGMZ Toast Manager.
 * CGMZ Toast allows for the display of a pop-up window on the map screen when
 * an achievement is earned. Settings for this can be found under the popup
 * settings for an achievement.
 *
 * CGMZ Encyclopedia
 * This plugin has additional functionality when using CGMZ Encyclopedia.
 * CGMZ Encyclopedia can be used for achievements, such as "Discover the
 * entire encyclopedia"
 *
 * CGMZ Professions
 * This plugin has additional functionality when using CGMZ Professions.
 * CGMZ Professions can be used to create achievements such as "Attain level 5
 * in the Mining profession"
 * ---------------------------Date Formats-------------------------------------
 * The following numbers correspond to the following date formats:
 * 0-2: Day / Month / Year are numeric
 * 3-4: Day and Year numeric, Month long string
 * 5-6: Day and Year numeric, Month short string
 * 7-8: Day and Month numeric, no Year
 *
 * These will be according to the user's locale (or the forced locale as set
 * in CGMZ Core). For example, USA may see March 22, 2024 while Mexico may see
 * 22 de marzo de 2024. This helps your users see dates for achievements that
 * make sense to them.
 * -----------------------------Colors-----------------------------------------
 * If using CGMZ Infinite Colors, you will not be able to select the custom
 * colors via the plugin parameters. In this case, please switch to the text
 * input at the top of the parameter and manually type the color index number.
 * ---------------------------Saved Games--------------------------------------
 * This plugin partially supports saved games.
 * ✓ You can add new achievements and a saved game should recognize them.
 * ✘ Modifying existing achievements is not supported in saved games.
 * - Note that you can modify non-saved data, which includes:
 *   rewards, requirements, difficulty, automatic parameters
 * ✘ Deleting achievements is not supported in saved games.
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JavaScript file MUST be CGMZ_Achievements.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds actors to achievement criteria. You can now
 * make an achievement criteria the actor category from the [CGMZ]
 * Encyclopedia. If updating from an old version of this plugin, remember to
 * add this to the criteria display order parameter so it displays as well.
 *
 * This update now allows you to hide all display info for unearned secret
 * achievements. Previously, only certain information was obscured like the
 * achievement name.
 *
 * Some integrations were added. This plugin now supports custom currencies
 * from [CGMZ] Currency System for both achievement rewards as well as
 * criteria. You can now have a [CGMZ] Scene Backgrounds scene background
 * image, including scrolling parallax or video. You can also show a [CGMZ]
 * Controls Window to let the player know keyboard or gamepad controls in the
 * achievement scene, depending on their last input type.
 *
 * This version also makes it so the display window responds to font size
 * changes. You also cannot select an achievement in the list window to start
 * manually scrolling the display window anymore. Manually scrolling the
 * display window is now always available even if not active, so this behavior
 * was no longer necessary.
 *
 * Version 1.8.0
 * - Added actor criteria to achievements
 * - Secret achievements can now hide all display info
 * - Added [CGMZ] Currency System integration
 * - Added [CGMZ] Scene Backgrounds integration
 * - Added [CGMZ] Controls Window integration
 * - Display window will now respond to font size changes
 * - Removed the need to select achievements to manually scroll display window
 *
 * @command Earn Achievement By Name
 * @desc Earns an achievement by its name
 *
 * @arg name
 * @text Achievement Name
 * @desc The name of the achievement to earn
 *
 * @command Earn Achievement By ID
 * @desc Earns an achievement by its id
 *
 * @arg id
 * @type number
 * @text Achievement ID
 * @desc The id of the achievement to earn.
 * @default 0
 *
 * @command Call Scene
 * @desc Calls the Achievement Scene
 *
 * @command Change Description
 * @desc Changes the pre or post description of an achievement
 *
 * @arg name
 * @text Achievement Name
 * @desc The name of the achievement to change description. Leave blank if using ID.
 *
 * @arg id
 * @type number
 * @text Achievement ID
 * @desc The id of the achievement to change description. Not used if using name instead.
 * @default 0
 *
 * @arg Pre Description
 * @type note
 * @default ""
 * @desc Achievement description before it is earned. Leave blank for no change
 *
 * @arg Post Description
 * @type note
 * @default ""
 * @desc Achievement description after it is earned. Leave blank for no change
 *
 * @command Change Secret
 * @desc Change an achievement secret property
 *
 * @arg name
 * @text Achievement Name
 * @desc The name of the achievement to change description. Leave blank if using ID.
 *
 * @arg id
 * @type number
 * @text Achievement ID
 * @desc The id of the achievement to change. Not used if using name instead
 * @default 0
 *
 * @arg secret
 * @type boolean
 * @desc Whether the achievement will now be secret or not
 * @default false
 *
 * @command Fail Achievement
 * @desc Marks the provided achievement as failed
 *
 * @arg name
 * @desc The name of the achievement to mark as failed. Leave blank if using ID.
 *
 * @arg id
 * @type number
 * @desc The id of the achievement to mark as failed. Not used if using name instead.
 * @default 0
 *
 * @command Check Achievement
 * @desc Check the status of an achievement
 *
 * @arg Achievement Name
 * @desc The name of the achievement to check
 *
 * @arg Variable
 * @type variable
 * @desc The game variable to store status in (0 = in progress, 1 = earned, 2 = failed)
 *
 * @command Reinitialize
 * @desc Resets all of the achievement data. Use for saved games to recognize changed data
 *
 * @param CGMZ Achievements
 *
 * @param Achievements
 * @parent CGMZ Achievements
 * @type struct<Achievement>[]
 * @default []
 * @desc Achievements
 *
 * @param Categories
 * @parent CGMZ Achievements
 * @type struct<Category>[]
 * @default []
 * @desc Achievement Categories
 *
 * @param Achievement Scene Options
 *
 * @param Achievement Display Info
 * @parent Achievement Scene Options
 * @type select[]
 * @option Name
 * @option Earn Date
 * @option Difficulty
 * @option Points
 * @option Description
 * @option Requirements
 * @option Rewards
 * @option Basic Info Header
 * @option Description Header
 * @option Requirement Header
 * @option Reward Header
 * @option Blank Line
 * @desc Achievement info and order to display in display window
 * @default ["Name","Earn Date","Difficulty","Points","Description","Requirements","Rewards"]
 *
 * @param Reward Display Order
 * @parent Achievement Scene Options
 * @type select[]
 * @option Currency
 * @option Items
 * @option Switches
 * @option Variables
 * @option Custom
 * @option Blank Line
 * @desc Achievement info and order to display in display window
 * @default ["Currency","Items","Switches","Variables","Custom"]
 *
 * @param Criteria Display Order
 * @parent Achievement Scene Options
 * @type select[]
 * @option Currency
 * @option Steps
 * @option Saves
 * @option Wins
 * @option Escapes
 * @option Achievements
 * @option Achievement Points
 * @option Playtime
 * @option Items
 * @option Switches
 * @option Variables
 * @option Encyclopedia Total
 * @option Encyclopedia Bestiary
 * @option Encyclopedia Items
 * @option Encyclopedia Weapons
 * @option Encyclopedia Armors
 * @option Encyclopedia Skills
 * @option Encyclopedia States
 * @option Encyclopedia Actors
 * @option Professions
 * @option Blank Line
 * @desc Achievement info and order to display in display window
 * @default ["Currency","Items","Switches","Variables","Steps","Saves","Wins","Escapes","Achievements","Achievement Points","Playtime","Encyclopedia Total","Encyclopedia Bestiary","Encyclopedia Items","Encyclopedia Weapons","Encyclopedia Armors","Encyclopedia Skills","Encyclopedia States","Encyclopedia Actors","Professions"]
 *
 * @param Disable Touch UI Space
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param List Window Right
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, the list window will be on the right of the scene
 * @default false
 *
 * @param List Window Width
 * @parent Achievement Scene Options
 * @type number
 * @desc Width of the list window as a percentage of the screen ui size
 * @default 33
 *
 * @param Total Window Style
 * @parent Achievement Scene Options
 * @type select
 * @option Vertical
 * @option Horizontal
 * @option None
 * @desc See plugin documentation for this parameter.
 * @default Vertical
 *
 * @param Category Earned Count
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the amount of achievements earned / total after the category
 * @default false
 *
 * @param Points In List Window
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show achievement points in the list window
 * @default false
 *
 * @param ShowSecretAchievements
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determine whether secret achievements are displayed in the achievement scene
 * @default false
 *
 * @param SecretText
 * @parent Achievement Scene Options
 * @desc Text to show as achievement name if secret achievement is displayed in scene
 * @default ??????
 *
 * @param Secret Hides Everything
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, no info about secret achievements will be shown.
 * @default false
 *
 * @param Secret Hidden Text
 * @parent Achievement Scene Options
 * @type boolean
 * @default This is a secret achievement. Keep playing the game to earn it.
 * @desc The text to show for secret achievements when Secret Hides Everything is true.
 *
 * @param ShowCriteriaAfterCompletion
 * @parent Achievement Scene Options
 * @type boolean
 * @desc true = still show criteria, false = stop showing criteria after completion.
 * @default true
 *
 * @param Show Rewards After Fail
 * @parent Achievement Scene Options
 * @type boolean
 * @desc true = still show rewards, false = stop showing rewards after fail.
 * @default true
 *
 * @param DateFormat
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @max 8
 * @desc Number specifying date format. See documentation for help. Valid Range: 0-8
 * @default 0
 *
 * @param ScrollSpeed
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc speed at which the achievement window display scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Achievement Scene Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Show Total Points
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the total amount of points possible in total window
 * @default false
 *
 * @param Show Total Achievements
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the total amount of achievements possible in total window
 * @default false
 *
 * @param Transparent Windows
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, windows will have a transparent background
 * @default false
 *
 * @param Category Columns
 * @parent Achievement Scene Options
 * @type number
 * @min 1
 * @desc Amount of columns to have in category window
 * @default 4
 *
 * @param Window Options
 *
 * @param Category Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param Category Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param Category Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param Category Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param List Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param List Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param List Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param List Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Total Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param Total Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param Total Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param Total Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Display Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param Display Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param Display Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param Display Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Text Options
 *
 * @param Reward Text
 * @parent Text Options
 * @desc Text to describe Rewards
 * @default Rewards:
 *
 * @param Requirement Text
 * @parent Text Options
 * @desc Text to describe Requirements
 * @default Requirements:
 *
 * @param Difficulty Text
 * @parent Text Options
 * @desc Text to describe Difficulty
 * @default Difficulty:
 *
 * @param Description Text
 * @parent Text Options
 * @desc Text to describe Description
 * @default Description:
 *
 * @param Points Text
 * @parent Text Options
 * @desc Text to describe Points
 * @default Points:
 *
 * @param Points Window Text
 * @parent Text Options
 * @desc Text to describe Points in the Points window
 * @default Points:
 *
 * @param Unearned Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement window when unearned
 * @default Keep playing to earn this achievement
 *
 * @param Earned Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement window when earned
 * @default Achievement earned on:
 *
 * @param Failed Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement window when failed
 * @default \c[2]Achievement Failed\c[0]
 *
 * @param Earned Count Text
 * @parent Text Options
 * @desc Text to appear when counting earned achievements
 * @default Earned:
 *
 * @param Basic Info Header Text
 * @parent Text Options
 * @desc Text to display in the Basic Info Header
 * @default Info
 *
 * @param Description Header Text
 * @parent Text Options
 * @desc Text to display in the Description Header
 * @default Description
 *
 * @param Requirement Header Text
 * @parent Text Options
 * @desc Text to display in the Requirement Header
 * @default Requirements
 *
 * @param Reward Header Text
 * @parent Text Options
 * @desc Text to display in the Reward Header
 * @default Rewards
 *
 * @param Steps Text
 * @parent Text Options
 * @desc Text to appear on step requirement progress bar
 * @default Steps
 *
 * @param Saves Text
 * @parent Text Options
 * @desc Text to appear on save requirement progress bar
 * @default Saves
 *
 * @param Battles Text
 * @parent Text Options
 * @desc Text to appear on battle requirement progress bar
 * @default Battles
 *
 * @param Wins Text
 * @parent Text Options
 * @desc Text to appear on win requirement progress bar
 * @default Wins
 *
 * @param Escapes Text
 * @parent Text Options
 * @desc Text to appear on escape requirement progress bar
 * @default Escapes
 *
 * @param Achievements Progress Text
 * @parent Text Options
 * @desc Text to appear on achievement requirement progress bar
 * @default Achievements
 *
 * @param Points Progress Text
 * @parent Text Options
 * @desc Text to appear on points requirement progress bar
 * @default Points
 *
 * @param Prof Level Text
 * @parent Text Options
 * @desc Text to appear on prof level requirement progress bar
 * @default Level
 *
 * @param Played Text
 * @parent Text Options
 * @desc Text to appear on played requirement progress bar
 * @default Played
 *
 * @param Enc Total Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Total requirement progress bar
 * @default % Enc. Total
 *
 * @param Enc Bestiary Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Bestiary requirement progress bar
 * @default % Enc. Bestiary
 *
 * @param Enc Items Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Item requirement progress bar
 * @default % Enc. Items
 *
 * @param Enc Weapons Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Weapon requirement progress bar
 * @default % Enc. Weapons
 *
 * @param Enc Armors Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Armor requirement progress bar
 * @default % Enc. Armors
 *
 * @param Enc Skills Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Skill requirement progress bar
 * @default % Enc. Skills
 *
 * @param Enc States Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia State requirement progress bar
 * @default % Enc. States
 *
 * @param Enc Actors Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Actor requirement progress bar
 * @default % Enc. Actors
 *
 * @param List Point Text
 * @parent Text Options
 * @desc Text to describe Points text in the list window (if enabled)
 * @default Points:
 * 
 * @param Total Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the totals window
 * @default left
 *
 * @param List Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the achievement list window
 * @default left
 *
 * @param Category Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the achievement category window
 * @default center
 *
 * @param Currency Unit Space
 * @parent Text Options
 * @type boolean
 * @desc Add a space between the Currency Value and Currency Unit?
 * @default false
 *
 * @param Totals Separator
 * @parent Text Options
 * @desc Text to appear between total amounts
 * @default /
 *
 * @param Label Color
 * @parent Text Options
 * @type color
 * @desc Color to draw label text in.
 * @default 16
 *
 * @param Header Color 1
 * @parent Text Options
 * @type color
 * @desc The first color in the header line gradient
 * @default 1
 *
 * @param Header Color 2
 * @parent Text Options
 * @type color
 * @desc The second color in the header line gradient
 * @default 0
 * 
 * @param Gauge Colors
 * 
 * @param CurrencyGaugeColor1
 * @type color
 * @parent Gauge Colors
 * @desc Color 1 for currency gauge
 * @default 6
 *
 * @param CurrencyGaugeColor2
 * @type color
 * @parent Gauge Colors
 * @desc Color 2 for currency gauge
 * @default 17
 *
 * @param GenericGaugeColor1
 * @type color
 * @parent Gauge Colors
 * @desc Color 1 for miscellaneous gauges
 * @default 28
 *
 * @param GenericGaugeColor2
 * @type color
 * @parent Gauge Colors
 * @desc Color 2 for miscellaneous gauges
 * @default 29
 *
 * @param ItemGaugeColor1
 * @type color
 * @parent Gauge Colors
 * @desc Color 1 for item gauges
 * @default 22
 *
 * @param ItemGaugeColor2
 * @type color
 * @parent Gauge Colors
 * @desc Color 2 for item gauges
 * @default 23
 *
 * @param SwitchVarGaugeColor1
 * @type color
 * @parent Gauge Colors
 * @desc Color 1 for switch and variable gauges
 * @default 20
 *
 * @param SwitchVarGaugeColor2
 * @type color
 * @parent Gauge Colors
 * @desc Color 2 for switch and variable gauges
 * @default 21
 *
 * @param Integrations
 * 
 * @param ShowAchievementPop
 * @parent Integrations
 * @type boolean
 * @desc Determines whether a pop window is shown when achievement is earned.
 * @default false
 *
 * @param AchievementEarnedText
 * @parent Integrations
 * @desc Text to show on first line of achievement pop window
 * @default Achievement Earned
 *
 * @param AchievementEarnedColor
 * @parent Integrations
 * @type color
 * @desc Color for text on the first line of achievement pop window. Uses windowskin colors. Range: 0-31
 * @default 3
 *
 * @param AchievementEarnedAlignment
 * @parent Integrations
 * @desc Alignment for pop text. Valid values: left, right, center
 * @default center
 *
 * @param AchievementEarnedSound
 * @parent Integrations
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Default sound to play when achievement pop-up window pops
 *
 * @param Scene Background
 * @parent Integrations
 * @desc [CGMZ] Scene Backgrounds preset id to use for the achievement scene
 *
 * @param Controls Window
 * @parent Integrations
 * @desc [CGMZ] Controls Window preset id to use for the achievement scene
 * 
 * @param Debug Options
 *
 * @param Report List Rect
 * @parent Debug Options
 * @type boolean
 * @desc If true, will report the width/height of a list item's rectangle
 * @default false
*/
/*~struct~Item:
 * @param Item
 * @type item
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Weapon:
 * @param Weapon
 * @type weapon
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Armor:
 * @param Armor
 * @type armor
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Currency:
 * @param Id
 * @desc The currency id
 * 
 * @param Amount
 * @type number
 * @default 0
 * @desc The amount of the currency.
*/
/*~struct~Switch:
 * @param Switch
 * @type switch
 * 
 * @param On/Off
 * @type boolean
 * @on ON
 * @off OFF
 * @default true
 *
 * @param Description
 * @desc description for this switch
*/
/*~struct~Variable:
 * @param Variable
 * @type variable
 * 
 * @param Operator
 * @type select
 * @option <
 * @option <=
 * @option =
 * @option >
 * @option >=
 * @desc Comparison Operator
 * @default >
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc The value to check the variable against
 *
 * @param Description
 * @desc Description for this variable
*/
/*~struct~VariableReward:
 * @param Variable
 * @type variable
 * 
 * @param Operator
 * @type select
 * @option +
 * @option -
 * @option /
 * @option *
 * @option %
 * @option =
 * @desc Operation to perform on the variable
 * @default +
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc The value to award to the variable
 *
 * @param Description
 * @desc Description for this variable
*/
/*~struct~Requirement:
 * @param Currency
 * @type number
 * @min 0
 * @default 0
 * @desc Amount of currency needed to earn the achievement
 * 
 * @param Items
 * @type struct<Item>[]
 * @desc Items needed to earn the achievement
 * @default []
 *
 * @param Weapons
 * @type struct<Weapon>[]
 * @desc Weapons needed to earn the achievement
 * @default []
 *
 * @param Armors
 * @type struct<Armor>[]
 * @desc Armors needed to earn the achievement
 * @default []
 *
 * @param Switches
 * @type struct<Switch>[]
 * @desc Switches needed to earn the achievement
 * @default []
 *
 * @param Variables
 * @type struct<Variable>[]
 * @desc Variables needed to earn the achievement
 * @default []
 *
 * @param Saves
 * @type number
 * @min 0
 * @default 0
 * @desc Save count needed to earn the achievement
 *
 * @param Playtime
 * @type number
 * @min 0
 * @default 0
 * @desc Playtime needed to earn the achievement. In frames (60f/1sec)
 *
 * @param Steps
 * @type number
 * @min 0
 * @default 0
 * @desc Step count needed to earn the achievement
 *
 * @param Battles
 * @type number
 * @min 0
 * @default 0
 * @desc Battle count needed to earn the achievement
 *
 * @param Wins
 * @type number
 * @min 0
 * @default 0
 * @desc Win count needed to earn the achievement
 *
 * @param Escapes
 * @type number
 * @min 0
 * @default 0
 * @desc Escape count needed to earn the achievement
 *
 * @param Achievements Earned
 * @type number
 * @min 0
 * @default 0
 * @desc Earned achievements needed to earn the achievement
 *
 * @param Achievement Points
 * @type number
 * @min 0
 * @default 0
 * @desc Achievement points needed to earn the achievement
 *
 * @param Encyclopedia Total
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia discovered % needed to earn the achievement
 *
 * @param Encyclopedia Bestiary
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia bestiary discovered % needed to earn the achievement
 *
 * @param Encyclopedia Items
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia items discovered % needed to earn the achievement
 *
 * @param Encyclopedia Armors
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia armors discovered % needed to earn the achievement
 *
 * @param Encyclopedia Weapons
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia weapons discovered % needed to earn the achievement
 *
 * @param Encyclopedia Skills
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia skills discovered % needed to earn the achievement
 *
 * @param Encyclopedia States
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia states discovered % needed to earn the achievement
 *
 * @param Encyclopedia Actors
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia actors discovered % needed to earn the achievement
 *
 * @param Professions
 * @type struct<Profession>[]
 * @default []
 * @desc profession requirements
 *
 * @param Custom Currency
 * @type struct<Currency>[]
 * @desc A list of required [CGMZ] Currency System custom currencies
 * @default []
*/
/*~struct~Reward:
 * @param Currency
 * @type number
 * @default 0
 * @desc Amount of currency to award upon achievement earn
 * 
 * @param Items
 * @type struct<Item>[]
 * @desc Items to award upon achievement earn
 * @default []
 *
 * @param Weapons
 * @type struct<Weapon>[]
 * @desc Weapons to award upon achievement earn
 * @default []
 *
 * @param Armors
 * @type struct<Armor>[]
 * @desc Armors to award upon achievement earn
 * @default []
 *
 * @param Switches
 * @type struct<Switch>[]
 * @desc Switches to manipulate upon achievement earn
 * @default []
 *
 * @param Variables
 * @type struct<VariableReward>[]
 * @desc Variables to manipulate upon achievement earn
 * @default []
 *
 * @param Custom Currency
 * @type struct<Currency>[]
 * @desc A list of [CGMZ] Currency System custom currencies to earn
 * @default []
 *
 * @param Common Event
 * @type common_event
 * @default 0
 * @desc Common event to queue upon achievement earn
 *
 * @param Custom
 * @type text[]
 * @desc Custom strings of text. You must manually award these.
 * @default []
*/
/*~struct~Popup:
 * @param Display
 * @type boolean
 * @default true
 * @desc Display a toast (popup window) on the map on achievement earn? No toast will display if not using CGMZ Toast Manager
 * 
 * @param Image
 * @type file
 * @dir img/pictures
 * @desc Image to show on achievement earn. Leave blank to show a text window instead
 * 
 * @param Color
 * @type number
 * @min 0
 * @default 0
 * @desc Color to show achievement name with in text window upon earn. No effect if showing image instead.
 *
 * @param Sound Effect
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Set up Toast Sound Effect options here. Leave Name blank to not use.
 *
 * @param Width
 * @type number
 * @default 0
 * @desc Custom width (in pixels) of the toast. 0 = default width.
 *
 * @param Windowskin
 * @type file
 * @dir img/
 * @desc Windowskin to use for the toast, leave blank to use default windowskin
 *
 * @param Tone
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone (color). Set Red to -256 to use default tone
 *
 * @param Background Style
 * @type select
 * @option Window
 * @option Dim
 * @option Transparent
 * @text Background Style
 * @desc Window background style. Same as Show Text event command.
 * @default Window
*/
/*~struct~Achievement:
 * @param Name
 * @desc Name of the achievement
 * 
 * @param Points
 * @type number
 * @min 0
 * @default 10
 * @desc Amount of points the achievement is worth
 *
 * @param Pre Description
 * @type note
 * @default ""
 * @desc Achievement description before it is earned
 *
 * @param Post Description
 * @type note
 * @default ""
 * @desc Achievement description after it is earned. Leave blank to always use Pre Description
 *
 * @param Category
 * @desc Category the achievement belongs to
 *
 * @param Difficulty
 * @default Easy
 * @desc Achievement difficulty
 *
 * @param Secret
 * @type boolean
 * @default false
 * @desc Is the achievement a secret achievement?
 *
 * @param Automatic
 * @type boolean
 * @default false
 * @desc Automatically track the achievement progress?
 *
 * @param Rewards
 * @type struct<Reward>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Custom":"[]"}
 * @desc Achievement Rewards
 *
 * @param Requirements
 * @type struct<Requirement>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Saves":"0","Playtime":"0","Steps":"0","Battles":"0","Wins":"0","Escapes":"0","Achievements Earned":"0","Achievement Points":"0","Encyclopedia Total":"0","Encyclopedia Bestiary":"0","Encyclopedia Items":"0","Encyclopedia Armors":"0","Encyclopedia Weapons":"0","Encyclopedia Skills":"0","Encyclopedia States":"0","Encyclopedia Actors":"0","Professions":"[]"}
 * @desc Achievement Requirements
 *
 * @param Popup
 * @type struct<Popup>
 * @default {"Display":"true","Image":"","Color":"0","Sound Effect":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Width":"0","Windowskin":"","Tone":"{\"Red\":\"-256\",\"Green\":\"0\",\"Blue\":\"0\"}","Background Style":"Window"}
 * @desc Settings for the toast (pop up window) if using CGMZ Toast Manager
 *
 * @param List Image
 * @type file
 * @dir img/
 * @desc Background image to use instead of black rectangle in list window (leave blank for no image)
 *
 * @param List Image X
 * @type number
 * @default 0
 * @desc X coordinate to use from the List Image
 *
 * @param List Image Y
 * @type number
 * @default 0
 * @desc Y coordinate to use from the List Image
*/
/*~struct~Profession:
 * @param Name
 * @desc The name of the profession to track
 * 
 * @param Level Requirement
 * @type number
 * @min 1
 * @default 1
 * @desc The level requirement for the profession.
*/
/*~struct~Category:
 * @param id
 * @desc The unique id of the category
 * 
 * @param Name
 * @desc The display name for the category
*/
/*~struct~SoundEffect:
 * @param Name
 * @type file
 * @dir audio/se
 * @desc The sound effect file to play
 * 
 * @param Volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound effect
 * 
 * @param Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound effect
 * 
 * @param Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound effect
*/
/*~struct~Tone:
 * @param Red
 * @type number
 * @min -256
 * @max 255
 * @desc Amount of red in the tone. Set to -256 to use default tone.
 * @default 0
 *
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of green in the tone
 * @default 0
 *
 * @param Blue
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of blue in the tone
 * @default 0
*/
/*:zh-CN
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/achievements/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc 成就系统（设置各种条件，达成成就并获得奖励）
 * @help
 * ============================================================================
 * 【使用条款】
 * 1、本插件可作商用或非商用。
 * 2、须注明插件作者"Casper Gaming"。
 * 3、须提供该插件的作者网站链接。
 * 4、最终使用条款以作者官网公告为准。https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * 【赞助支持】
 * 您可以登陆以下网站并对作者进行支持和赞助。
 * 然后获得作者和其插件的最新资讯，以及测试版插件的试用。
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * 【插件版本】V 1.8.0
 * ----------------------------------------------------------------------------
 * 【兼容性】仅测试作者所制作的插件
 * 【RM版本】RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * 【插件描述】
 * 支持成就点数的获得、显示未达成的成就、成就拥有不同难度的达成方式。
 * 可以自动追踪数据来达成成就，或手动命令来达成。
 * 可以设置成就奖励，如金钱、物品和装备，以及变量和开关。 
 * 
 * 【搭配插件】
 * CGMZ Core:核心插件，运行作者插件的必须插件。
 * CGMZ Toast Manager:提示插件，获得成就达成时的弹窗提示。
 * CGMZ Encyclopedia:百科全书插件，获取百科全书的完成度百分比来制作成就。
 * 注：本插件在插件列表中必须置于"核心插件Core"之下。 
 * ----------------------------------------------------------------------------
 * 【使用说明】
 * 一、插件命令：
 * 1、输入成就名称来获得对应成就。
 * 2、输入成就ID来获得队友成就。（插件中设置成就时所对应的内部ID，从1开始）
 * 3、打开成就界面。
 * 4、修改成就描述。
 * 5、重置成就数据。
 * 6、使用脚本命令打开成就界面：SceneManager.push(CGMZ_Scene_Achievements);
 * 
 * 二、时间显示格式的选项说明: MM-月，DD-日，YYYY-年
 * The following numbers correspond to the following date formats:
 * 0-2: Day / Month / Year are numeric
 * 3-4: Day and Year numeric, Month long string
 * 5-6: Day and Year numeric, Month short string
 * 7-8: Day and Month numeric, no Year
 * These will be according to the user's locale (or the forced locale as set
 * in CGMZ Core). For example, USA may see March 22, 2024 while Mexico may see
 * 22 de marzo de 2024. This helps your users see dates for achievements that
 * make sense to them.
 * 
 * 三、关于所有设置中的成就名称或其他插件引用的名称：
 *     字符必须一致，并区分大小写。如Kill the dragon和Kill the DRAGON会定义为不同的配方或专业。
 * -----------------------------Colors-----------------------------------------
 * If using CGMZ Infinite Colors, you will not be able to select the custom
 * colors via the plugin parameters. In this case, please switch to the text
 * input at the top of the parameter and manually type the color index number.
 * ----------------------Failed Achievements-----------------------------------
 * If an achievement is failed, it will no longer check for automatic
 * completion. However, you can still manually complete failed achievements
 * via plugin command. Failed achievements do not show criteria, but can show
 * rewards based on plugin parameter Show Rewards After Fail.
 * ---------------------------------------------------------------------------
 *【版本更新历史】
 * Hi all, this latest version adds actors to achievement criteria. You can now
 * make an achievement criteria the actor category from the [CGMZ]
 * Encyclopedia. If updating from an old version of this plugin, remember to
 * add this to the criteria display order parameter so it displays as well.
 *
 * This update now allows you to hide all display info for unearned secret
 * achievements. Previously, only certain information was obscured like the
 * achievement name.
 *
 * Some integrations were added. This plugin now supports custom currencies
 * from [CGMZ] Currency System for both achievement rewards as well as
 * criteria. You can now have a [CGMZ] Scene Backgrounds scene background
 * image, including scrolling parallax or video. You can also show a [CGMZ]
 * Controls Window to let the player know keyboard or gamepad controls in the
 * achievement scene, depending on their last input type.
 *
 * This version also makes it so the display window responds to font size
 * changes. You also cannot select an achievement in the list window to start
 * manually scrolling the display window anymore. Manually scrolling the
 * display window is now always available even if not active, so this behavior
 * was no longer necessary.
 *
 * Version 1.8.0
 * - Added actor criteria to achievements
 * - Secret achievements can now hide all display info
 * - Added [CGMZ] Currency System integration
 * - Added [CGMZ] Scene Backgrounds integration
 * - Added [CGMZ] Controls Window integration
 * - Display window will now respond to font size changes
 * - Removed the need to select achievements to manually scroll display window
 * 
 * @command Earn Achievement By Name
 * @text 根据名称获得成就
 * @desc 根据成就的名称来获得成就。
 *
 * @arg name
 * @text 成就名称
 * @desc 设置需要获得的成就的名称。
 * @default
 *
 * @command Earn Achievement By ID
 * @text 根据序号获得成就
 * @desc 根据插件设置成就时所对应的序号ID来获得成就。
 *
 * @arg id
 * @type number
 * @text 成就序号ID
 * @desc 设置成就时所对应的序号ID。
 * @default 0
 *
 * @command Call Scene
 * @text 打开成就界面
 * @desc 打开成就界面。
 *
 * @command Change Description
 * @text 修改成就描述
 * @desc 修改成就获得前后的描述。
 *
 * @arg name
 * @text 成就名称
 * @desc 需要修改描述的成就的名称。如要使用序号指定成就则留空本项。
 *
 * @arg id
 * @type number
 * @text 成就序号ID
 * @desc 需要修改描述的成就的内部序号。如要使用名称指定成就则留空本项。
 * @default 0
 *
 * @arg Pre Description
 * @text 成就描述（完成前）
 * @type note
 * @default ""
 * @desc 修改成就达成前的描述，留空则不修改。
 *
 * @arg Post Description
 * @text 成就描述（完成后）
 * @type note
 * @default ""
 * @desc 修改成就达成后的描述，留空则不修改。
 *
 * @command Change Secret
 * @desc Change an achievement secret property
 *
 * @arg name
 * @text Achievement Name
 * @desc The name of the achievement to change description. Leave blank if using ID.
 *
 * @arg id
 * @type number
 * @text Achievement ID
 * @desc The id of the achievement to change
 * @default 0
 *
 * @arg secret
 * @type boolean
 * @desc Whether the achievement will now be secret or not
 * @default false
 *
 * @command Fail Achievement
 * @desc Marks the provided achievement as failed
 *
 * @arg name
 * @desc The name of the achievement to mark as failed. Leave blank if using ID.
 *
 * @arg id
 * @type number
 * @desc The id of the achievement to mark as failed. Not used if using name instead.
 * @default 0
 *
 * @command Check Achievement
 * @desc Check the status of an achievement
 *
 * @arg Achievement Name
 * @desc The name of the achievement to check
 *
 * @arg Variable
 * @type variable
 * @desc The game variable to store status in (0 = in progress, 1 = earned, 2 = failed)
 *
 * @command Reinitialize
 * @text 重置数据
 * @desc 调试用指令，重置所有成就数据，用于与已保存的游戏进行数据对比。
 *
 * @param CGMZ Achievements
 * @text 成就设置
 *
 * @param Achievements
 * @text 成就列表
 * @parent CGMZ Achievements
 * @type struct<Achievement>[]
 * @default []
 * @desc 设置你想要的成就。
 *
 * @param Categories
 * @parent CGMZ Achievements
 * @type struct<Category>[]
 * @default []
 * @desc Achievement Categories
 *
 * @param Achievement Scene Options
 * @text 成就界面设置
 *
 * @param Achievement Display Info
 * @parent Achievement Scene Options
 * @type select[]
 * @option Name
 * @option Earn Date
 * @option Difficulty
 * @option Points
 * @option Description
 * @option Requirements
 * @option Rewards
 * @option Basic Info Header
 * @option Description Header
 * @option Requirement Header
 * @option Reward Header
 * @option Blank Line
 * @desc Achievement info and order to display in display window
 * @default ["Name","Earn Date","Difficulty","Points","Description","Requirements","Rewards"]
 *
 * @param Reward Display Order
 * @parent Achievement Scene Options
 * @type select[]
 * @option Currency
 * @option Items
 * @option Switches
 * @option Variables
 * @option Custom
 * @option Blank Line
 * @desc Achievement info and order to display in display window
 * @default ["Currency","Items","Switches","Variables","Custom"]
 *
 * @param Criteria Display Order
 * @parent Achievement Scene Options
 * @type select[]
 * @option Currency
 * @option Steps
 * @option Saves
 * @option Wins
 * @option Escapes
 * @option Achievements
 * @option Achievement Points
 * @option Playtime
 * @option Items
 * @option Switches
 * @option Variables
 * @option Encyclopedia Total
 * @option Encyclopedia Bestiary
 * @option Encyclopedia Items
 * @option Encyclopedia Weapons
 * @option Encyclopedia Armors
 * @option Encyclopedia Skills
 * @option Encyclopedia States
 * @option Encyclopedia Actors
 * @option Professions
 * @option Blank Line
 * @desc Achievement info and order to display in display window
 * @default ["Currency","Items","Switches","Variables","Steps","Saves","Wins","Escapes","Achievements","Achievement Points","Playtime","Encyclopedia Total","Encyclopedia Bestiary","Encyclopedia Items","Encyclopedia Weapons","Encyclopedia Armors","Encyclopedia Skills","Encyclopedia States","Encyclopedia Actors","Professions"]
 *
 * @param Disable Touch UI Space
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param List Window Right
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, the list window will be on the right of the scene
 * @default false
 *
 * @param List Window Width
 * @parent Achievement Scene Options
 * @type number
 * @desc Width of the list window as a percentage of the screen ui size
 * @default 33
 *
 * @param Total Window Style
 * @parent Achievement Scene Options
 * @type select
 * @option Vertical
 * @option Horizontal
 * @option None
 * @desc See plugin documentation for this parameter.
 * @default Vertical
 *
 * @param Category Earned Count
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the amount of achievements earned / total after the category
 * @default false
 *
 * @param Points In List Window
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show achievement points in the list window
 * @default false
 *
 * @param ShowSecretAchievements
 * @text 显示未达成成就
 * @parent Achievement Scene Options
 * @type boolean
 * @desc 设置是否在成就界面内显示未达成的成就。
 * @default false
 *
 * @param SecretText
 * @text 隐藏成就的显示文本
 * @parent Achievement Scene Options
 * @desc 设置隐藏成就在界面内显示的文本描述。
 * @default ??????
 *
 * @param Secret Hides Everything
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, no info about secret achievements will be shown.
 * @default false
 *
 * @param Secret Hidden Text
 * @parent Achievement Scene Options
 * @type boolean
 * @default This is a secret achievement. Keep playing the game to earn it.
 * @desc The text to show for secret achievements when Secret Hides Everything is true.
 *
 * @param ShowCriteriaAfterCompletion
 * @text 完成后显示成就达成条件
 * @parent Achievement Scene Options
 * @type boolean
 * @desc true-完成后依然显示成就达成条件, false-完成后不显示成就达成条件。
 * @default true
  *
 * @param Show Rewards After Fail
 * @parent Achievement Scene Options
 * @type boolean
 * @desc true = still show rewards, false = stop showing rewards after fail.
 * @default true
 *
 * @param DateFormat
 * @text 日期格式
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @max 8
 * @desc 输入0至8选择显示日期的格式，具见【使用说明】。
 * @default 0
 *
 * @param ScrollSpeed
 * @text 滚动速度
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc speed at which the achievement window display scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @text 滚动等待
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @text 描述滚动
 * @parent Achievement Scene Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @text 自动滚动
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Show Total Points
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the total amount of points possible in total window
 * @default false
 *
 * @param Show Total Achievements
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the total amount of achievements possible in total window
 * @default false
 *
 * @param Transparent Windows
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, windows will have a transparent background
 * @default false
 *
 * @param Category Columns
 * @parent Achievement Scene Options
 * @type number
 * @min 1
 * @desc Amount of columns to have in category window
 * @default 4
 * 
 * @param Window Options
 *
 * @param Category Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param Category Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param Category Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param Category Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param List Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param List Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param List Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param List Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Total Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param Total Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param Total Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param Total Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Display Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param Display Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param Display Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param Display Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Text Options
 * @text 文本描述设置
 * @parent Achievement Scene Options
 *
 * @param Reward Text
 * @text 成就奖励的描述
 * @parent Text Options
 * @desc 成就可获得奖励标签的文本描述。
 * @default 【奖励】
 *
 * @param Requirement Text
 * @text 成就条件的描述
 * @parent Text Options
 * @desc 成就达成条件标签的文本描述。
 * @default 【条件】
 *
 * @param Difficulty Text
 * @text 成就难度的描述
 * @parent Text Options
 * @desc 成就达成难度标签的文本描述。
 * @default 成就难度:
 *
 * @param Description Text
 * @text 成就内容的描述
 * @parent Text Options
 * @desc 成就内容标签的文本描述。
 * @default 成就描述:
 *
 * @param Points Text
 * @text 成就点的描述
 * @parent Text Options
 * @desc 成就点数标签的文本描述。
 * @default 成就点数:
 *
 * @param Points Window Text
 * @parent Text Options
 * @desc Text to describe Points in the Points window
 * @default 成就点数:
 *
 * @param Unearned Text
 * @text 成就未达成的描述
 * @parent Text Options
 * @desc 显示该成就还未达成的文本描述。
 * @default 你还没有达成这个成就。
 *
 * @param Earned Text
 * @text 成就达成的描述
 * @parent Text Options
 * @desc 显示该成就已经达成的文本描述。
 * @default 成就达成:
 *
 * @param Failed Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement window when failed
 * @default \c[2]Achievement Failed\c[0]
 *
 * @param Earned Count Text
 * @text 成就达成数量的描述
 * @parent Text Options
 * @desc 显示已经达成多少成就的标签的文本描述
 * @default 达成数:
 *
 * @param Basic Info Header Text
 * @parent Text Options
 * @desc Text to display in the Basic Info Header
 * @default Info
 *
 * @param Description Header Text
 * @parent Text Options
 * @desc Text to display in the Description Header
 * @default Description
 *
 * @param Requirement Header Text
 * @parent Text Options
 * @desc Text to display in the Requirement Header
 * @default Requirements
 *
 * @param Reward Header Text
 * @parent Text Options
 * @desc Text to display in the Reward Header
 * @default Rewards
 *
 * @param Steps Text
 * @parent Text Options
 * @desc Text to appear on step requirement progress bar
 * @default Steps
 *
 * @param Saves Text
 * @parent Text Options
 * @desc Text to appear on save requirement progress bar
 * @default Saves
 *
 * @param Battles Text
 * @parent Text Options
 * @desc Text to appear on battle requirement progress bar
 * @default Battles
 *
 * @param Wins Text
 * @parent Text Options
 * @desc Text to appear on win requirement progress bar
 * @default Wins
 *
 * @param Escapes Text
 * @parent Text Options
 * @desc Text to appear on escape requirement progress bar
 * @default Escapes
 *
 * @param Achievements Progress Text
 * @parent Text Options
 * @desc Text to appear on achievement requirement progress bar
 * @default Achievements
 *
 * @param Points Progress Text
 * @parent Text Options
 * @desc Text to appear on points requirement progress bar
 * @default Points
 *
 * @param Prof Level Text
 * @parent Text Options
 * @desc Text to appear on prof level requirement progress bar
 * @default Level
 *
 * @param Played Text
 * @parent Text Options
 * @desc Text to appear on played requirement progress bar
 * @default Played
 *
 * @param Enc Total Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Total requirement progress bar
 * @default % Enc. Total
 *
 * @param Enc Bestiary Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Bestiary requirement progress bar
 * @default % Enc. Bestiary
 *
 * @param Enc Items Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Item requirement progress bar
 * @default % Enc. Items
 *
 * @param Enc Weapons Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Weapon requirement progress bar
 * @default % Enc. Weapons
 *
 * @param Enc Armors Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Armor requirement progress bar
 * @default % Enc. Armors
 *
 * @param Enc Skills Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Skill requirement progress bar
 * @default % Enc. Skills
 *
 * @param Enc States Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia State requirement progress bar
 * @default % Enc. States
 *
 * @param Enc Actors Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Actor requirement progress bar
 * @default % Enc. Actors
 *
 * @param List Point Text
 * @parent Text Options
 * @desc Text to describe Points text in the list window (if enabled)
 * @default Points:
 *
 * @param Total Window Alignment
 * @text 成就统计的位置
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc 设置成就完成数和成就点数位置：left-靠左，center-居中，right-靠右。
 * @default left
 *
 * @param List Window Alignment
 * @text 成就列表的位置
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc 设置成就列表中文字的位置：left-靠左，center-居中，right-靠右。
 * @default left
 *
 * @param Category Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the achievement category window
 * @default center
 *
 * @param Currency Unit Space
 * @text 货币数值和单位之间加空格
 * @parent Text Options
 * @type boolean
 * @desc 是否在货币数值和货币单位之间加一个空格？
 * @default false
 *
 * @param Totals Separator
 * @parent Text Options
 * @desc Text to appear between total amounts
 * @default /
 *
 * @param Label Color
 * @text 标签颜色
 * @parent Text Options
 * @type color
 * @desc Color to draw label text in.
 * @default 16
 *
 * @param Header Color 1
 * @parent Text Options
 * @type color
 * @desc The first color in the header line gradient
 * @default 1
 *
 * @param Header Color 2
 * @parent Text Options
 * @type color
 * @desc The second color in the header line gradient
 * @default 0
 * 
 * @param Gauge Colors
 * @text 计量条颜色
 * @parent Achievement Scene Options
 * 
 * @param CurrencyGaugeColor1
 * @text 货币计量条颜色1
 * @type color
 * @parent Gauge Colors
 * @desc 货币计量条颜色1
 * @default 6
 *
 * @param CurrencyGaugeColor2
 * @text 货币计量条颜色2
 * @type color
 * @parent Gauge Colors
 * @desc 货币计量条颜色2
 * @default 17
 *
 * @param GenericGaugeColor1
 * @text 通用计量条颜色1
 * @type color
 * @parent Gauge Colors
 * @desc 通用计量条颜色1
 * @default 28
 *
 * @param GenericGaugeColor2
 * @text 通用计量条颜色2
 * @type color
 * @parent Gauge Colors
 * @desc 通用计量条颜色2
 * @default 29
 *
 * @param ItemGaugeColor1
 * @text 物品计量条颜色1
 * @type color
 * @parent Gauge Colors
 * @desc 物品计量条颜色1
 * @default 22
 *
 * @param ItemGaugeColor2
 * @text 物品计量条颜色2
 * @type color
 * @parent Gauge Colors
 * @desc 物品计量条颜色2
 * @default 23
 *
 * @param SwitchVarGaugeColor1
 * @text 开关/变量计量条颜色1
 * @type color
 * @parent Gauge Colors
 * @desc 开关/变量计量条颜色1
 * @default 20
 *
 * @param SwitchVarGaugeColor2
 * @text 开关/变量计量条颜色2
 * @type color
 * @parent Gauge Colors
 * @desc 开关/变量计量条颜色2
 * @default 21
 *
 * @param Integrations
 * @text 弹窗插件设置
 * 
 * @param ShowAchievementPop
 * @text 是否显示弹窗？
 * @parent Integrations
 * @type boolean
 * @desc 是否在获得成就时跳出弹窗提示？(需要CGMZ ToastManager插件)
 * @default false
 *
 * @param AchievementEarnedText
 * @text 达成成就的文本描述
 * @parent Integrations
 * @desc 设置当达成成就时弹窗的文本描述。(需要CGMZ ToastManager插件)
 * @default 成就达成！
 *
 * @param AchievementEarnedColor
 * @text 达成成就的文字颜色
 * @parent Integrations
 * @type color
 * @desc 达成成就弹窗第一行文字的颜色，使用对应窗口皮肤的0至31号颜色。
 * @default 3
 *
 * @param AchievementEarnedAlignment
 * @text 弹窗内文本位置
 * @parent Integrations
 * @desc 设置弹窗内文本的位置：left-靠左, right-靠右, center-居中。
 * @default center
 *
 * @param AchievementEarnedSound
 * @text 成就达成的音效
 * @parent Integrations
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc 设置成就达成时弹窗的音效。
 *
 * @param Scene Background
 * @parent Integrations
 * @desc [CGMZ] Scene Backgrounds preset id to use for the achievement scene
 *
 * @param Controls Window
 * @parent Integrations
 * @desc [CGMZ] Controls Window preset id to use for the achievement scene
 * 
 * @param Debug Options
 *
 * @param Report List Rect
 * @parent Debug Options
 * @type boolean
 * @desc If true, will report the width/height of a list item's rectangle
 * @default false
*/
/*~struct~Item:zh-CN
 * @param Item
 * @text 物品
 * @type item
 * 
 * @param Amount
 * @text 物品数量
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Weapon:zh-CN
 * @param Weapon
 * @text 武器
 * @type weapon
 * 
 * @param Amount
 * @text 武器数量
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Armor:zh-CN
 * @param Armor
 * @text 护甲
 * @type armor
 * 
 * @param Amount
 * @text 护甲数量
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Currency:
 * @param Id
 * @desc The currency id
 * 
 * @param Amount
 * @type number
 * @default 0
 * @desc The amount of the currency.
*/
/*~struct~Switch:zh-CN
 * @param Switch
 * @text 开关
 * @type switch
 * 
 * @param On/Off
 * @type boolean
 * @on ON
 * @off OFF
 * @default true
 *
 * @param Description
 * @text 条件描述
 * @desc 设置关于该开关用途的描述。
*/
/*~struct~Variable:zh-CN
 * @param Variable
 * @text 变量
 * @type variable
 * 
 * @param Operator
 * @text 变量操作
 * @type select
 * @option <
 * @option <=
 * @option =
 * @option >
 * @option >=
 * @desc Comparison operator
 * @default >
 *
 * @param Amount
 * @text 数值
 * @type number
 * @default 0
 * @desc 用作条件时：检查变量的数值。用作奖励时：变量数值的奖励
 *
 * @param Description
 * @text 变量描述
 * @desc 设置关于该变量用途的描述。
*/
/*~struct~VariableReward:zh-CN
 * @param Variable
 * @type variable
 * 
 * @param Operator
 * @type select
 * @option +
 * @option -
 * @option /
 * @option *
 * @option %
 * @option =
 * @desc Operation to perform on the variable
 * @default +
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc The value to award to the variable
 *
 * @param Description
 * @desc Description for this variable
*/
/*~struct~Requirement:zh-CN
 * @param Currency
 * @text 货币
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的货币数量。
 * 
 * @param Items
 * @text 物品
 * @type struct<Item>[]
 * @desc 设置达成成就所需的物品和数量。
 * @default []
 *
 * @param Weapons
 * @text 武器
 * @type struct<Weapon>[]
 * @desc 设置达成成就所需的武器和数量。
 * @default []
 *
 * @param Armors
 * @text 防具
 * @type struct<Armor>[]
 * @desc 设置达成成就所需的防具和数量。
 * @default []
 *
 * @param Switches
 * @text 开关
 * @type struct<Switch>[]
 * @desc 设置达成成就需激活的开关。
 * @default []
 *
 * @param Variables
 * @text 变量
 * @type struct<Variable>[]
 * @desc 设置达成成就需符合的变量。
 * @default []
 *
 * @param Saves
 * @text 存档次数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的存档次数。
 *
 * @param Playtime
 * @text 游戏时间
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的游戏时间。（单位:帧，60帧=1秒）
 *
 * @param Steps
 * @text 步数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的移动步数。
 *
 * @param Battles
 * @text 战斗次数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的战斗次数。
 *
 * @param Wins
 * @text 战斗胜利次数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的战斗获胜次数。
 *
 * @param Escapes
 * @text 逃跑次数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的逃跑次数。
 *
 * @param Achievements Earned
 * @text 成就完成数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的成就完成次数。
 *
 * @param Achievement Points
 * @text 成就点数
 * @type number
 * @min 0
 * @default 0
 * @desc 设置达成成就所需的成就点数。
 *
 * @param Encyclopedia Total
 * @text 百科全书总完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书总百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Bestiary
 * @text 百科全书:敌人类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:敌人类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Items
 * @text 百科全书:物品类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:物品类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Armors
 * @text 百科全书:防具类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:防具品类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Weapons
 * @text 百科全书:武器类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:武器品类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Skills
 * @text 百科全书:技能类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:技能品类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia States
 * @text 百科全书:状态类别完成度
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc 设置达成成就所需的百科全书:状态品类别百分比完成度。（需要CGMZ_Encyclopedia插件）
 *
 * @param Encyclopedia Actors
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia actors discovered % needed to earn the achievement
 *
 * @param Professions
 * @text 专业等级
 * @type struct<Profession>[]
 * @default []
 * @desc 设置达成成就所需专业技能等级。（需要CGMZ_Professions插件）
 *
 * @param Custom Currency
 * @type struct<Currency>[]
 * @desc A list of required [CGMZ] Currency System custom currencies
 * @default []
*/
/*~struct~Reward:zh-CN
 * @param Currency
 * @text 货币
 * @type number
 * @default 0
 * @desc 达成成就所奖励的货币和数量。
 * 
 * @param Items
 * @text 物品
 * @type struct<Item>[]
 * @desc 达成成就所奖励的物品和数量。
 * @default []
 *
 * @param Weapons
 * @text 武器
 * @type struct<Weapon>[]
 * @desc 达成成就所奖励的武器和数量。
 * @default []
 *
 * @param Armors
 * @text 防具
 * @type struct<Armor>[]
 * @desc 达成成就所奖励的防具和数量。
 * @default []
 *
 * @param Switches
 * @text 开关
 * @type struct<Switch>[]
 * @desc 达成成就时激活开关。
 * @default []
 *
 * @param Variables
 * @text 变量
 * @type struct<VariableReward>[]
 * @desc 达成成就时操作变量。
 * @default []
 *
 * @param Custom Currency
 * @type struct<Currency>[]
 * @desc A list of [CGMZ] Currency System custom currencies to earn
 * @default []
 *
 * @param Common Event
 * @type common_event
 * @default 0
 * @desc Common event to queue upon achievement earn
 *
 * @param Custom
 * @type text[]
 * @desc Custom strings of text. You must manually award these.
 * @default []
*/
/*~struct~Popup:zh-CN
 * @param Display
 * @text 提示弹窗
 * @type boolean
 * @default true
 * @desc 达成成就时是否弹出一个提示窗口？ （需要CGMZ_ToastManager插件）
 * 
 * @param Image
 * @text 提示图片
 * @type file
 * @dir img/pictures
 * @desc 设置一个达成成就时的图片。不设置则只提示文字描述。
 * 
 * @param Color
 * @text 提示文本颜色
 * @type number
 * @min 0
 * @default 0
 * @desc 设置提示弹窗中成就名称的颜色。如使用提示图片则本设置无效果。
 *
 * @param Sound Effect
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Set up Toast Sound Effect options here. Leave Name blank to not use.
 *
 * @param Width
 * @type number
 * @default 0
 * @desc Custom width (in pixels) of the toast. 0 = default width.
 *
 * @param Windowskin
 * @type file
 * @dir img/
 * @desc Windowskin to use for the toast, leave blank to use default windowskin
 *
 * @param Tone
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone (color). Set Red to -256 to use default tone
 *
 * @param Background Style
 * @type select
 * @option Window
 * @option Dim
 * @option Transparent
 * @text Background Style
 * @desc Window background style. Same as Show Text event command.
 * @default Window
*/
/*~struct~Achievement:zh-CN
 * @param Name
 * @text 成就名称
 * @desc 设置成就名称。
 * 
 * @param Points
 * @text 成就点数
 * @type number
 * @min 0
 * @default 10
 * @desc 设置该成就达成后获得的点数。
 *
 * @param Pre Description
 * @text 成就描述（完成前）
 * @type note
 * @default ""
 * @desc 设置该成就达成前显示的描述。
 *
 * @param Post Description
 * @text 成就描述（完成后）
 * @type note
 * @default ""
 * @desc 设置该成就达成后显示的描述。
 *
 * @param Category
 * @desc Category the achievement belongs to
 *
 * @param Difficulty
 * @text 成就难度
 * @default 简单
 * @desc 描述该成就的困难程度。如：简单、普通、困难、恶梦、地狱等。
 *
 * @param Secret
 * @text 隐藏成就
 * @type boolean
 * @default false
 * @desc 设置该成就是否隐藏成就。是则会以自定义的符号或文字显示。
 *
 * @param Automatic
 * @text 自动追踪
 * @type boolean
 * @default false
 * @desc 会自动追踪成就所设定的条件是否完成。
 *
 * @param Rewards
 * @text 奖励
 * @type struct<Reward>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Custom":"[]"}
 * @desc 设置成就完成后的奖励。
 *
 * @param Requirements
 * @text 条件
 * @type struct<Requirement>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Saves":"0","Playtime":"0","Steps":"0","Battles":"0","Wins":"0","Escapes":"0","Achievements Earned":"0","Achievement Points":"0","Encyclopedia Total":"0","Encyclopedia Bestiary":"0","Encyclopedia Items":"0","Encyclopedia Armors":"0","Encyclopedia Weapons":"0","Encyclopedia Skills":"0","Encyclopedia States":"0","Encyclopedia Actors":"0","Professions":"[]"}
 * @desc 设置成就所需达成的条件。
 *
 * @param Popup
 * @text 提示设置
 * @type struct<Popup>
 * @default {"Display":"true","Image":"","Color":"0","Sound Effect":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Width":"0","Windowskin":"","Tone":"{\"Red\":\"-256\",\"Green\":\"0\",\"Blue\":\"0\"}","Background Style":"Window"}
 * @desc 设置成就达成时的弹窗提示。（需要CGMZ_ToastManager插件）
 *
 * @param List Image
 * @type file
 * @dir img/
 * @desc Background image to use instead of black rectangle in list window (leave blank for no image)
 *
 * @param List Image X
 * @type number
 * @default 0
 * @desc X coordinate to use from the List Image
 *
 * @param List Image Y
 * @type number
 * @default 0
 * @desc Y coordinate to use from the List Image
*/
/*~struct~Profession:zh-CN
 * @param Name
 * @text 专业名称
 * @desc 设置专业名称并追踪专业插件的数据。（需要CGMZ_Professions插件）
 * 
 * @param Level Requirement
 * @text 专业技能等级要求
 * @type number
 * @min 1
 * @default 1
 * @desc 设置达成成就所需的专业技能等级。（需要CGMZ_Professions插件）
*/
/*~struct~Category:zh-CN
 * @param id
 * @desc The unique id of the category
 * 
 * @param Name
 * @desc The display name for the category
*/
/*~struct~SoundEffect:zh-CN
 * @param Name
 * @type file
 * @dir audio/se
 * @desc The sound effect file to play
 * 
 * @param Volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound effect
 * 
 * @param Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound effect
 * 
 * @param Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound effect
*/
/*~struct~Tone:zh-CN
 * @param Red
 * @type number
 * @min -256
 * @max 255
 * @desc Amount of red in the tone. Set to -256 to use default tone.
 * @default 0
 *
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of green in the tone
 * @default 0
 *
 * @param Blue
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of blue in the tone
 * @default 0
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/achievements/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Crea un poderoso sistema de logros
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
 * Versión: 1.8.0
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.9.0
 * ----------------------------------------------------------------------------
 * Descripción: Agrega un sistema de logros que incluye puntos de logro, logros
 * secretos, dificultad y más. Los logros ofrecen seguimiento automático y 
 * desbloqueo manual. Los logros también pueden tener recompensas como 
 * artículos u oro, o incluso cambios/variables. Este plugin funciona bien con
 * CGMZ Toast  Manager para ventanas emergentes cuando se obtiene un logro.
 * Este plugin  también permite logros basados en la Enciclopedia CGMZ y el
 * porcentaje de  finalización del Bestiario.
 * ----------------------------------------------------------------------------
 * Documentación:
 * ------------------------Comandos de Plugin----------------------------------
 * Este plugin admite los siguientes comandos de plugin:
 *
 * • Obtener logros por nombre
 * Esto gana el logro con el nombre proporcionado, distingue entre mayúsculas
 * y minúsculas.
 *
 * • Obtenga Logros por ID
 * Esto gana el logro con la identificación proporcionada. Los ID son el orden
 * en que los logros se enumeran en el administrador de complementos y
 * comienzan en 1.
 *
 * • Escena de llamada
 * Esto llama la escena del logro.
 *
 * • Cambiar Descripción
 * Esto te permitirá cambiar la descripción anterior y posterior de un logro.
 *
 * • Cambiar secreto
 * Esto te permitirá cambiar la propiedad secreta de un logro
 *
 * • Fail Achievement
 * Marks an achievement as failed
 *
 * • Reiniciar
 * Esto restablecerá todo el progreso de los logros como si hubieras comenzado
 * un nuevo juego.
 * ---------------------------JavaScript---------------------------------------
 * Para llamar a la escena de logros a través del comando JavaScript, usa:
 * SceneManager.push(CGMZ_Scene_Achievements);
 * ----------------------Failed Achievements-----------------------------------
 * If an achievement is failed, it will no longer check for automatic
 * completion. However, you can still manually complete failed achievements
 * via plugin command. Failed achievements do not show criteria, but can show
 * rewards based on plugin parameter Show Rewards After Fail.
 * --------------------------Integraciones-------------------------------------
 * CGMZ Toast Manager
 * Este plugin tiene una funcionalidad adicional cuando se usa CGMZ Toast
 * Manager. CGMZ Toast permite mostrar una ventana emergente en la pantalla
 * del mapa cuando  se obtiene un logro. La configuración para esto se puede
 * encontrar en la configuración emergente para un logro.
 *
 * Enciclopedia CGMZ
 * Este plugin tiene una funcionalidad adicional cuando se usa la Enciclopedia
 * CGMZ. La Enciclopedia CGMZ se puede utilizar para logros como "Descubre la
 * enciclopedia completa"
 *
 * Profesiones CGMZ
 * Este complemento tiene una funcionalidad adicional al usar CGMZ Professions.
 * Las profesiones CGMZ se pueden usar para crear logros como "Alcanzar el
 * nivel 5 en la profesión Minera"
 * ----------------------Formatos de fecha-------------------------------------
 * Los siguientes números corresponden a los siguientes formatos de fecha:
 * 0-2: Day / Month / Year are numeric
 * 3-4: Day and Year numeric, Month long string
 * 5-6: Day and Year numeric, Month short string
 * 7-8: Day and Month numeric, no Year
 *
 * These will be according to the user's locale (or the forced locale as set
 * in CGMZ Core). For example, USA may see March 22, 2024 while Mexico may see
 * 22 de marzo de 2024. This helps your users see dates for achievements that
 * make sense to them.
 * -----------------------Partidas guardadas-----------------------------------
 * Este plugin admite parcialmente juegos guardados.
 * ✓ Puede agregar nuevos logros y un juego guardado debería reconocerlos.
 * ✘ La modificación de logros existentes no se admite en partidas guardadas.
 * ✘ La eliminación de logros no es compatible con los juegos guardados.
 * ------------------------Nombre del archivo----------------------------------
 * El nombre de archivo del archivo JavaScript de este complemento DEBE ser 
 * CGMZ_Achievements.js Esto es lo que se obtiene cuando se descarga. El nombre 
 * de archivo se usa para cargar parámetros y ejecutar comandos de complemento. 
 * Si lo cambias, las cosas comenzarán a comportarse incorrectamente y su juego 
 * probablemente se bloquee. No cambie el nombre del archivo js.
 * --------------------------Latest Version------------------------------------
 * Hi all, this latest version adds actors to achievement criteria. You can now
 * make an achievement criteria the actor category from the [CGMZ]
 * Encyclopedia. If updating from an old version of this plugin, remember to
 * add this to the criteria display order parameter so it displays as well.
 *
 * This update now allows you to hide all display info for unearned secret
 * achievements. Previously, only certain information was obscured like the
 * achievement name.
 *
 * Some integrations were added. This plugin now supports custom currencies
 * from [CGMZ] Currency System for both achievement rewards as well as
 * criteria. You can now have a [CGMZ] Scene Backgrounds scene background
 * image, including scrolling parallax or video. You can also show a [CGMZ]
 * Controls Window to let the player know keyboard or gamepad controls in the
 * achievement scene, depending on their last input type.
 *
 * This version also makes it so the display window responds to font size
 * changes. You also cannot select an achievement in the list window to start
 * manually scrolling the display window anymore. Manually scrolling the
 * display window is now always available even if not active, so this behavior
 * was no longer necessary.
 *
 * Version 1.8.0
 * - Added actor criteria to achievements
 * - Secret achievements can now hide all display info
 * - Added [CGMZ] Currency System integration
 * - Added [CGMZ] Scene Backgrounds integration
 * - Added [CGMZ] Controls Window integration
 * - Display window will now respond to font size changes
 * - Removed the need to select achievements to manually scroll display window
 *
 * @command Earn Achievement By Name
 * @text Obtener logros por nombre
 * @desc Obtiene un logro por su nombre.
 *
 * @arg name
 * @text Nombre de logro 
 * @desc El nombre del logro a ganar.
 *
 * @command Earn Achievement By ID
 * @text Ganar logros 
 * @desc Obtiene un logro por su id.
 *
 * @arg id
 * @type number
 * @text ID del logro
 * @desc El id del logro a ganar.
 * @default 0
 *
 * @command Call Scene
 * @text Llamada de escena 
 * @desc Llama a la escena del logro.
 *
 * @command Change Description
 * @text Cambio de Descripción
 * @desc Cambia la descripción previa o posterior de un logro.
 *
 * @arg name
 * @text Nombre del logro
 * @desc El nombre del logro para cambiar la descripción. Deje en blanco si usa identificación.
 *
 * @arg id
 * @type number
 * @text ID del logro
 * @desc El id del logro para cambiar la descripción. No se usa si se usa el nombre en su lugar.
 * @default 0
 *
 * @arg Pre Description
 * @type note
 * @text Pre Descripción 
 * @default ""
 * @desc Descripción del logro antes de que se gane. Dejar en blanco para ningún cambio.
 *
 * @arg Post Description
 * @type note
 * @text Post Descripción 
 * @default ""
 * @desc Descripción del logro después de obtenerlo. Dejar en blanco para ningún cambio.
 *
 * @command Change Secret
 * @text Cambiar secreto
 * @desc Cambiar una propiedad secreta de logro.
 *
 * @arg name
 * @text Nombre del logro
 * @desc El nombre del logro para cambiar la descripción. Deje en blanco si usa la identificación.
 *
 * @arg id
 * @type number
 * @text ID de logro
 * @desc La identificación del logro a cambiar. No se usa si se usa el nombre en su lugar.
 * @default 0
 *
 * @arg secret
 * @text Logro secreto 
 * @type boolean
 * @desc Si el logro ahora será secreto o no.
 * @default false
 *
 * @command Fail Achievement
 * @desc Marks the provided achievement as failed
 *
 * @arg name
 * @desc The name of the achievement to mark as failed. Leave blank if using ID.
 *
 * @arg id
 * @type number
 * @desc The id of the achievement to mark as failed. Not used if using name instead.
 * @default 0
 *
 * @command Check Achievement
 * @desc Check the status of an achievement
 *
 * @arg Achievement Name
 * @desc The name of the achievement to check
 *
 * @arg Variable
 * @type variable
 * @desc The game variable to store status in (0 = in progress, 1 = earned, 2 = failed)
 *
 * @command Reinitialize
 * @text Reinicializar
 * @desc Restablece todos los datos de logros. Úsalo para juegos guardados para reconocer datos modificados.
 *
 * @param CGMZ Achievements
 * @text Logros CGMZ
 *
 * @param Achievements
 * @text Logros
 * @parent CGMZ Achievements
 * @type struct<Achievement>[]
 * @default []
 * @desc Logros
 *
 * @param Categories
 * @text Categorias
 * @parent CGMZ Achievements
 * @type struct<Category>[]
 * @default []
 * @desc Achievement Categories
 *
 * @param Achievement Scene Options
 * @text Opciones de escena de logros
 *
 * @param Achievement Display Info
 * @text Información de visualización de logros
 * @parent Achievement Scene Options
 * @type select[]
 * @option Name
 * @option Earn Date
 * @option Difficulty
 * @option Points
 * @option Description
 * @option Requirements
 * @option Rewards
 * @option Basic Info Header
 * @option Description Header
 * @option Requirement Header
 * @option Reward Header
 * @option Blank Line
 * @desc Información de logros y orden para mostrar en la ventana de visualización.
 * @default ["Name","Earn Date","Difficulty","Points","Description","Requirements","Rewards"]
 *
 * @param Reward Display Order
 * @parent Achievement Scene Options
 * @type select[]
 * @option Currency
 * @option Items
 * @option Switches
 * @option Variables
 * @option Custom
 * @option Blank Line
 * @desc Achievement info and order to display in display window
 * @default ["Currency","Items","Switches","Variables","Custom"]
 *
 * @param Criteria Display Order
 * @parent Achievement Scene Options
 * @type select[]
 * @option Currency
 * @option Steps
 * @option Saves
 * @option Wins
 * @option Escapes
 * @option Achievements
 * @option Achievement Points
 * @option Playtime
 * @option Items
 * @option Switches
 * @option Variables
 * @option Encyclopedia Total
 * @option Encyclopedia Bestiary
 * @option Encyclopedia Items
 * @option Encyclopedia Weapons
 * @option Encyclopedia Armors
 * @option Encyclopedia Skills
 * @option Encyclopedia States
 * @option Encyclopedia Actors
 * @option Professions
 * @option Blank Line
 * @desc Achievement info and order to display in display window
 * @default ["Currency","Items","Switches","Variables","Steps","Saves","Wins","Escapes","Achievements","Achievement Points","Playtime","Encyclopedia Total","Encyclopedia Bestiary","Encyclopedia Items","Encyclopedia Weapons","Encyclopedia Armors","Encyclopedia Skills","Encyclopedia States","Encyclopedia Actors","Professions"]
 *
 * @param Disable Touch UI Space
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param List Window Right
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, the list window will be on the right of the scene
 * @default false
 *
 * @param List Window Width
 * @parent Achievement Scene Options
 * @type number
 * @desc Width of the list window as a percentage of the screen ui size
 * @default 33
 *
 * @param Total Window Style
 * @parent Achievement Scene Options
 * @type select
 * @option Vertical
 * @option Horizontal
 * @option None
 * @desc See plugin documentation for this parameter.
 * @default Vertical
 *
 * @param Category Earned Count
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show the amount of achievements earned / total after the category
 * @default false
 *
 * @param Points In List Window
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, will show achievement points in the list window
 * @default false
 *
 * @param ShowSecretAchievements
 * @text Mostrar logros secretos
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determinar si los logros secretos se muestran en la escena de logros.
 * @default false
 *
 * @param SecretText
 * @text Texto secreto
 * @parent Achievement Scene Options
 * @desc Texto para mostrar como nombre de logro si se muestra un logro secreto en la escena.
 * @default ??????
 *
 * @param Secret Hides Everything
 * @parent Achievement Scene Options
 * @type boolean
 * @desc If true, no info about secret achievements will be shown.
 * @default false
 *
 * @param Secret Hidden Text
 * @parent Achievement Scene Options
 * @type boolean
 * @default This is a secret achievement. Keep playing the game to earn it.
 * @desc The text to show for secret achievements when Secret Hides Everything is true.
 *
 * @param ShowCriteriaAfterCompletion
 * @text Mostrar criterios después de la finalización
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Verdadero = aún muestra los criterios, falso = deja de mostrar los criterios después de la finalización.
 * @default true
 *
 * @param Show Rewards After Fail
 * @parent Achievement Scene Options
 * @type boolean
 * @desc true = still show rewards, false = stop showing rewards after fail.
 * @default true
 *
 * @param DateFormat
 * @text Formato de fecha
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @max 8
 * @desc Número que especifica el formato de fecha. Consulta la documentación para obtener ayuda. Rango válido: 0-8.
 * @default 0
 *
 * @param ScrollSpeed
 * @text Velocidad de desplazamiento
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc Velocidad a la que se desplaza la visualización de la ventana de logros (si es necesario).
 * @default 1
 *
 * @param ScrollWait
 * @text Espera de desplazamiento
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc Cantidad de tiempo (en fotogramas) a esperar antes de comenzar a desplazarse.
 * @default 300
 *
 * @param Scroll Deceleration
 * @text Desaceleración de desplazamiento
 * @parent Achievement Scene Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Tasa de desaceleración después de soltar el toque.
 * @default 0.92
 *
 * @param Auto Scroll
 * @text Desplazamiento automático
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determina si la ventana de visualización debe desplazarse automáticamente después de tanto tiempo sin intervención del usuario.
 * @default true
 *
 * @param Show Total Points
 * @text Mostrar puntos totales
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Si es verdadero, mostrará la cantidad total de puntos posibles en la ventana total.
 * @default false
 *
 * @param Show Total Achievements
 * @text Mostrar logros totales
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Si es verdadero, mostrará la cantidad total de logros posibles en la ventana total.
 * @default false
 *
 * @param Transparent Windows
 * @text Ventana transparente
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Si es verdadero, las ventanas tendrán un fondo transparente.
 * @default false
 *
 * @param Category Columns
 * @text Columnas de Categoría
 * @parent Achievement Scene Options
 * @type number
 * @min 1
 * @desc Cantidad de columnas para tener en la ventana de categoría.
 * @default 4
 *
 * @param Window Options
 *
 * @param Category Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param Category Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param Category Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param Category Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param List Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param List Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param List Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param List Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Total Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param Total Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param Total Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param Total Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Display Windowskin
 * @parent Window Options
 * @type file
 * @dir img
 * @desc Windowskin to use, set blank to use default
 *
 * @param Display Padding
 * @parent Window Options
 * @type number
 * @min -1
 * @desc Window padding. Set to -1 for default
 * @default -1
 *
 * @param Display Back Opacity
 * @parent Window Options
 * @type number
 * @min -1
 * @max 255
 * @desc Window back opacity. Set to -1 for default
 * @default -1
 *
 * @param Display Tone
 * @parent Window Options
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Set red to -256 to not use.
 *
 * @param Text Options
 * @text Opciones de texto
 *
 * @param Reward Text
 * @text Texto de Recompensa
 * @parent Text Options
 * @desc Texto para describir Recompensa.
 * @default Rewards:
 *
 * @param Requirement Text
 * @text Texto de Requerimientos
 * @parent Text Options
 * @desc Texto para describir Requerimientos.
 * @default Requirements:
 *
 * @param Difficulty Text
 * @text Texto de Dificultad
 * @parent Text Options
 * @desc Texto para describir Dificultad.
 * @default Difficulty:
 *
 * @param Description Text
 * @text Texto de Descripción
 * @parent Text Options
 * @desc Texto para describir Descripción.
 * @default Description:
 *
 * @param Points Text
 * @text Texto de puntos
 * @parent Text Options
 * @desc Texto para describir Puntos.
 * @default Points:
 *
 * @param Points Window Text
 * @text Texto de Ventana de puntos
 * @parent Text Options
 * @desc Texto para describir puntos en la ventana de Puntos.
 * @default Points:
 *
 * @param Unearned Text
 * @text Texto de No ganado
 * @parent Text Options
 * @desc Texto que aparecerá en la parte superior de la ventana de logros cuando no se gane.
 * @default Keep playing to earn this achievement
 *
 * @param Earned Text
 * @text Texto de Ganado
 * @parent Text Options
 * @desc Texto que aparecerá en la parte superior de la ventana de logros cuando se gane.
 * @default Achievement earned on:
 *
 * @param Failed Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement window when failed
 * @default \c[2]Achievement Failed\c[0]
 *
 * @param Earned Count Text
 * @text Texto de Recuento ganado
 * @parent Text Options
 * @desc Texto que aparecerá al contar los logros obtenidos.
 * @default Earned:
 *
 * @param Basic Info Header Text
 * @text Texto del encabezado de información básica
 * @parent Text Options
 * @desc Texto para mostrar en el encabezado de información básica.
 * @default Info
 *
 * @param Description Header Text
 * @text Texto de Descripción del encabezado
 * @parent Text Options
 * @desc Texto para mostrar en el encabezado de descripción.
 * @default Description
 *
 * @param Requirement Header Text
 * @text Texto del encabezado del requisito
 * @parent Text Options
 * @desc Texto para mostrar en el encabezado del requisito.
 * @default Requirements
 *
 * @param Reward Header Text
 * @text Texto de encabezado de recompensa
 * @parent Text Options
 * @desc Texto para mostrar en el encabezado de la recompensa.
 * @default Rewards
 *
 * @param Steps Text
 * @text Texto de pasos
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso del requisito de pasos.
 * @default Steps
 *
 * @param Saves Text
 * @text Texto de Guardados
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos para guardar.
 * @default Saves
 *
 * @param Battles Text
 * @text Texto de Batallas
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos de batalla.
 * @default Battles
 *
 * @param Wins Text
 * @text Texto de Victorias
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso del requisito de victorias.
 * @default Wins
 *
 * @param Escapes Text
 * @text Texto de Escapes
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso del requisito de escape.
 * @default Escapes
 *
 * @param Achievements Progress Text
 * @text Texto de Progreso de logros
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso del requisito de logro.
 * @default Achievements
 *
 * @param Points Progress Text
 * @text Texto de Progreso de puntos
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos de puntos.
 * @default Points
 *
 * @param Prof Level Text
 * @text Texto de Nivel profesional
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos de nivel profesional.
 * @default Level
 *
 * @param Played Text
 * @text Texto Reproducido
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso del requisito reproducido.
 * @default Played
 *
 * @param Enc Total Text
 * @text Texto de la enciclopedia total
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos totales de la enciclopedia.
 * @default % Enc. Total
 *
 * @param Enc Bestiary Text
 * @text Texto del bestiario de la enciclopedia
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos del bestiario de la Enciclopedia.
 * @default % Enc. Bestiary
 *
 * @param Enc Items Text
 * @text Texto del bestiario de la enciclopedia
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos del artículo de la Enciclopedia.
 * @default % Enc. Items
 *
 * @param Enc Weapons Text
 * @text Texto de armas de la enciclopedia
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos de armas de la Enciclopedia.
 * @default % Enc. Weapons
 *
 * @param Enc Armors Text
 * @text Texto de armaduras de la enciclopedia
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos de armaduras de la Enciclopedia.
 * @default % Enc. Armors
 *
 * @param Enc Skills Text
 * @text Texto de habilidades de la enciclopedia
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos de habilidades de la Enciclopedia.
 * @default % Enc. Skills
 *
 * @param Enc States Text
 * @text Texto de estados de la enciclopedia
 * @parent Text Options
 * @desc Texto que aparecerá en la barra de progreso de requisitos del estado de la Enciclopedia.
 * @default % Enc. States
 *
 * @param Enc Actors Text
 * @parent Text Options
 * @desc Text to appear on Encyclopedia Actor requirement progress bar
 * @default % Enc. Actors
 *
 * @param List Point Text
 * @parent Text Options
 * @desc Text to describe Points text in the list window (if enabled)
 * @default Points:
 * 
 * @param Total Window Alignment
 * @text Alineación total de ventanas
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc La alineación del texto en la ventana de totales.
 * @default left
 *
 * @param List Window Alignment
 * @text Alineación de ventana de lista
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc La alineación del texto en la ventana de la lista de logros.
 * @default left
 *
 * @param Category Window Alignment
 * @text Alineación de ventana de categoría
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc La alineación del texto en la ventana de categoría de logro.
 * @default center
 *
 * @param Currency Unit Space
 * @text Espacio de unidad de moneda
 * @parent Text Options
 * @type boolean
 * @desc ¿Agregar un espacio entre el valor de moneda y la unidad de moneda?
 * @default false
 *
 * @param Totals Separator
 * @parent Text Options
 * @desc Text to appear between total amounts
 * @default /
 *
 * @param Label Color
 * @text Color de la etiqueta
 * @parent Text Options
 * @type number
 * @min 0
 * @desc Color para dibujar el texto de la etiqueta.
 * @default 16
 *
 * @param Header Color 1
 * @parent Text Options
 * @type color
 * @desc The first color in the header line gradient
 * @default 1
 *
 * @param Header Color 2
 * @parent Text Options
 * @type color
 * @desc The second color in the header line gradient
 * @default 0
 * 
 * @param Gauge Colors
 * @text Colores de calibre
 * 
 * @param CurrencyGaugeColor1
 * @text Color 1 de indicador.
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 1 para indicador de moneda.
 * @default 6
 *
 * @param CurrencyGaugeColor2
 * @text Color 2 de indicador
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 2 para indicador de moneda.
 * @default 17
 *
 * @param GenericGaugeColor1
 * @text Color 1 de calibres
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 1 para varios calibres. 
 * @default 28
 *
 * @param GenericGaugeColor2
 * @text Color 2 de calibres
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 2 para varios calibres. 
 * @default 29
 *
 * @param ItemGaugeColor1
 * @text Color 1 de calibres
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 1 para calibres de artículos.
 * @default 22
 *
 * @param ItemGaugeColor2
 * @text Color 2 de calibres
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 2 para calibres de artículos.
 * @default 23
 *
 * @param SwitchVarGaugeColor1
 * @text Color 1 del interruptor
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 1 para interruptores y calibres variables.
 * @default 20
 *
 * @param SwitchVarGaugeColor2
 * @text Color 2 del interruptor
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 2 para interruptores y calibres variables.
 * @default 21
 *
 * @param Integrations
 * @text Requiere plugin de mensajes CGMZ
 * 
 * @param ShowAchievementPop
 * @text Mostrar ventana emergente de logro
 * @parent Integrations
 * @type boolean
 * @desc Determina si se muestra una ventana emergente cuando se obtiene el logro.
 * @default false
 *
 * @param AchievementEarnedText
 * @text Texto de logro ganado
 * @parent Integrations
 * @desc Texto para mostrar en la primera línea de la ventana emergente de logros.
 * @default Achievement Earned
 *
 * @param AchievementEarnedColor
 * @text Color de Logro obtenido
 * @parent Integrations
 * @type number
 * @min 0
 * @max 31
 * @desc Color para el texto en la primera línea de la ventana emergente de logros. Utiliza colores de piel de ventana. Rango: 0-31.
 * @default 3
 *
 * @param AchievementEarnedAlignment
 * @text Alineación de Logro obtenido
 * @parent Integrations
 * @desc Alineación para texto emergente. Valores válidos: izquierda, derecha, centro.
 * @default center
 *
 * @param AchievementEarnedSound
 * @text Sonido de Logro obtenido
 * @parent Integrations
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Sonido predeterminado para reproducir cuando aparece la ventana emergente de logro.
 *
 * @param Scene Background
 * @parent Integrations
 * @desc [CGMZ] Scene Backgrounds preset id to use for the achievement scene
 *
 * @param Controls Window
 * @parent Integrations
 * @desc [CGMZ] Controls Window preset id to use for the achievement scene
 * 
 * @param Debug Options
 *
 * @param Report List Rect
 * @parent Debug Options
 * @type boolean
 * @desc If true, will report the width/height of a list item's rectangle
 * @default false
*/
/*~struct~Item:es
 * @param Item
 * @text Artículo
 * @type item
 * 
 * @param Amount
 * @text Cantidad
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Weapon:es
 * @param Weapon
 * @text Arma
 * @type weapon
 * 
 * @param Amount
 * @text Cantidad
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Armor:es
 * @param Armor
 * @text Armadura
 * @type armor
 * 
 * @param Amount
 * @text Cantidad
 * @type number
 * @min 1
 * @max 99
 * @default 1
*/
/*~struct~Currency:
 * @param Id
 * @desc The currency id
 * 
 * @param Amount
 * @type number
 * @default 0
 * @desc The amount of the currency.
*/
/*~struct~Switch:es
 * @param Switch
 * @text Interruptor
 * @type switch
 * 
 * @param On/Off
 * @text Encender/apagar
 * @type boolean
 * @on Encender
 * @off Apagar
 * @default true
 *
 * @param Description
 * @text Descripción 
 * @desc Descripción de este Interruptor.
*/
/*~struct~Variable:es
 * @param Variable
 * @type variable
 * 
 * @param Operator
 * @text Operador
 * @type select
 * @option <
 * @option <=
 * @option =
 * @option >
 * @option >=
 * @desc Comparison Operator
 * @default >
 *
 * @param Amount
 * @text Cantidad
 * @type number
 * @default 0
 * @desc El valor con el que comparar la variable.
 *
 * @param Description
 * @text Descripción 
 * @desc Descripción de esta variable.
*/
/*~struct~VariableReward:es
 * @param Variable
 * @type variable
 * 
 * @param Operator
 * @type select
 * @option +
 * @option -
 * @option /
 * @option *
 * @option %
 * @option =
 * @desc Operation to perform on the variable
 * @default +
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc The value to award to the variable
 *
 * @param Description
 * @desc Description for this variable
*/
/*~struct~Requirement:es
 * @param Currency
 * @text Moneda
 * @type number
 * @min 0
 * @default 0
 * @desc Cantidad de moneda necesaria para obtener el logro.
 * 
 * @param Items
 * @text Artículos
 * @type struct<Item>[]
 * @desc Artículos necesarios para obtener el logro.
 * @default []
 *
 * @param Weapons
 * @text Armas
 * @type struct<Weapon>[]
 * @desc Armas necesarias para obtener el logro.
 * @default []
 *
 * @param Armors
 * @text Armadura
 * @type struct<Armor>[]
 * @desc Armaduras necesarias para obtener el logro.
 * @default []
 *
 * @param Switches
 * @text Interruptores
 * @type struct<Switch>[]
 * @desc Interruptores necesarios para obtener el logro.
 * @default []
 *
 * @param Variables
 * @text Variables
 * @type struct<Variable>[]
 * @desc Variables necesarias para obtener el logro.
 * @default []
 *
 * @param Saves
 * @text Guardados
 * @type number
 * @min 0
 * @default 0
 * @desc Establece el número de guardados necesarios para obtener el logro.
 *
 * @param Playtime
 * @text Tiempo de juego
 * @type number
 * @min 0
 * @default 0
 * @desc Tiempo de juego necesario para obtener el logro. En cuadros (60f/1seg).
 *
 * @param Steps
 * @text Pasos
 * @type number
 * @min 0
 * @default 0
 * @desc Número de pasos necesarios para obtener el logro.
 *
 * @param Battles
 * @text Batallas
 * @type number
 * @min 0
 * @default 0
 * @desc Recuento de batalla necesario para obtener el logro.
 *
 * @param Wins
 * @text Victorias
 * @type number
 * @min 0
 * @default 0
 * @desc Cantidad de victorias necesarias para obtener el logro.
 *
 * @param Escapes
 * @text Escapes
 * @type number
 * @min 0
 * @default 0
 * @desc Número de escape necesario para obtener el logro.
 *
 * @param Achievements Earned
 * @text Logros obtenidos
 * @type number
 * @min 0
 * @default 0
 * @desc Logros obtenidos necesarios para obtener el logro.
 *
 * @param Achievement Points
 * @text Puntos de Logro
 * @type number
 * @min 0
 * @default 0
 * @desc Puntos de logro necesarios para obtener el logro.
 *
 * @param Encyclopedia Total
 * @text Total de enciclopedia
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc % necesario descubierto de la Enciclopedia para obtener el logro.
 *
 * @param Encyclopedia Bestiary
 * @text Bestiario de la enciclopedia
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc % necesario descubierto de bestiarios totales de la Enciclopedia para obtener el logro.
 *
 * @param Encyclopedia Items
 * @text Artículos de la enciclopedia
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc % necesario descubierto de artículos totales de la Enciclopedia para obtener el logro.
 *
 * @param Encyclopedia Armors
 * @text Armaduras de la enciclopedia
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc % necesario descubierto de armaduras totales de la Enciclopedia para obtener el logro.
 *
 * @param Encyclopedia Weapons
 * @text Armas de la enciclopedia
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc % necesario descubierto de armas totales de la Enciclopedia para obtener el logro.
 *
 * @param Encyclopedia Skills
 * @text Habilidades de la enciclopedia
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc % necesario descubierto de habilidades totales de la Enciclopedia para obtener el logro.
 *
 * @param Encyclopedia States
 * @text Estados de la enciclopedia
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc % necesario descubierto de la enciclopedia total para obtener el logro.
 *
 * @param Encyclopedia Actors
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia actors discovered % needed to earn the achievement
 *
 * @param Professions
 * @text Profesiones
 * @type struct<Profession>[]
 * @default []
 * @desc Requerimientos de profesión.
 *
 * @param Custom Currency
 * @type struct<Currency>[]
 * @desc A list of required [CGMZ] Currency System custom currencies
 * @default []
*/
/*~struct~Reward:es
 * @param Currency
 * @text Moneda
 * @type number
 * @default 0
 * @desc Cantidad de moneda a otorgar al obtener el logro.
 * 
 * @param Items
 * @text Artículos
 * @type struct<Item>[]
 * @desc Artículos para otorgar al lograr el logro.
 * @default []
 *
 * @param Weapons
 * @text Armas
 * @type struct<Weapon>[]
 * @desc Armas para otorgar al logro de ganar.
 * @default []
 *
 * @param Armors
 * @text Armaduras
 * @type struct<Armor>[]
 * @desc Armaduras para otorgar al logro de ganar.
 * @default []
 *
 * @param Switches
 * @text Interruptores
 * @type struct<Switch>[]
 * @desc Interruptores para manipular al obtener logros
 * @default []
 *
 * @param Variables
 * @text Variables 
 * @type struct<VariableReward>[]
 * @desc Variables para manipular sobre la obtención de logros.
 * @default []
 *
 * @param Custom Currency
 * @type struct<Currency>[]
 * @desc A list of [CGMZ] Currency System custom currencies to earn
 * @default []
 *
 * @param Common Event
 * @type common_event
 * @default 0
 * @desc Common event to queue upon achievement earn
 *
 * @param Custom
 * @type text[]
 * @desc Custom strings of text. You must manually award these.
 * @default []
*/
/*~struct~Popup:es
 * @param Display
 * @text ¿Mostrar?
 * @type boolean
 * @default true
 * @desc ¿Mostrar una ventana emergente en el mapa sobre la obtención de logros? No se mostrará ninguna ventana emergente si no se usa CGMZ Toast Manager.
 * 
 * @param Image
 * @text Imagen
 * @type file
 * @dir img/pictures
 * @desc Imagen para mostrar en la obtención de logros. Déjelo en blanco para mostrar una ventana de texto en su lugar.
 * 
 * @param Color
 * @text Color
 * @type number
 * @min 0
 * @default 0
 * @desc Color para mostrar el nombre del logro en la ventana de texto al ganar. No hay efecto si se muestra una imagen en su lugar.
 *
 * @param Sound Effect
 * @type struct<SoundEffect>
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 * @desc Set up Toast Sound Effect options here. Leave Name blank to not use.
 *
 * @param Width
 * @type number
 * @default 0
 * @desc Custom width (in pixels) of the toast. 0 = default width.
 *
 * @param Windowskin
 * @type file
 * @dir img/
 * @desc Windowskin to use for the toast, leave blank to use default windowskin
 *
 * @param Tone
 * @type struct<Tone>
 * @default {"Red":"-256","Green":"0","Blue":"0"}
 * @desc Windowskin tone (color). Set Red to -256 to use default tone
 *
 * @param Background Style
 * @type select
 * @option Window
 * @option Dim
 * @option Transparent
 * @text Background Style
 * @desc Window background style. Same as Show Text event command.
 * @default Window
*/
/*~struct~Achievement:es
 * @param Name
 * @text Nombre
 * @desc Nombre del logro.
 * 
 * @param Points
 * @text Puntos
 * @type number
 * @min 0
 * @default 10
 * @desc Cantidad de puntos que vale el logro.
 *
 * @param Pre Description
 * @text Pre Descripción
 * @type note
 * @default ""
 * @desc Descripción del logro antes de que se gane.
 *
 * @param Post Description
 * @text Post Descripción 
 * @type note
 * @default ""
 * @desc Descripción del logro después de obtenerlo. Déjelo en blanco para usar siempre Pre descripción.
 *
 * @param Category
 * @text Categoría
 * @desc Categoría a la que pertenece el logro.
 *
 * @param Difficulty
 * @text Dificultad
 * @default Easy
 * @desc Dificultad de logro.
 *
 * @param Secret
 * @text Logro secreto
 * @type boolean
 * @default false
 * @desc ¿Es el logro un logro secreto?
 *
 * @param Automatic
 * @text Automático
 * @type boolean
 * @default false
 * @desc ¿Seguir automáticamente el progreso del logro?
 *
 * @param Rewards
 * @text Recompensas
 * @type struct<Reward>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Custom":"[]"}
 * @desc Recompensas de logros.
 *
 * @param Requirements
 * @text Requerimientos
 * @type struct<Requirement>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Saves":"0","Playtime":"0","Steps":"0","Battles":"0","Wins":"0","Escapes":"0","Achievements Earned":"0","Achievement Points":"0","Encyclopedia Total":"0","Encyclopedia Bestiary":"0","Encyclopedia Items":"0","Encyclopedia Armors":"0","Encyclopedia Weapons":"0","Encyclopedia Skills":"0","Encyclopedia States":"0","Encyclopedia Actors":"0","Professions":"[]"}
 * @desc Requisitos de logro.
 *
 * @param Popup
 * @text Ventana emergente
 * @type struct<Popup>
 * @default {"Display":"true","Image":"","Color":"0","Sound Effect":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Width":"0","Windowskin":"","Tone":"{\"Red\":\"-256\",\"Green\":\"0\",\"Blue\":\"0\"}","Background Style":"Window"}
 * @desc Configuraciones para la ventana emergente si usa CGMZ Toast Manager.
 *
 * @param List Image
 * @type file
 * @dir img/
 * @desc Background image to use instead of black rectangle in list window (leave blank for no image)
 *
 * @param List Image X
 * @type number
 * @default 0
 * @desc X coordinate to use from the List Image
 *
 * @param List Image Y
 * @type number
 * @default 0
 * @desc Y coordinate to use from the List Image
*/
/*~struct~Profession:es
 * @param Name
 * @text Nombre
 * @desc El nombre de la profesión a rastrear.
 * 
 * @param Level Requirement
 * @text Requerimiento de nivel
 * @type number
 * @min 1
 * @default 1
 * @desc El requisito de nivel para la profesión.
*/
/*~struct~Category:es
 * @param id
 * @text ID
 * @desc La identificación única de la categoría.
 * 
 * @param Name
 * @text Nombre
 * @desc El nombre para mostrar de la categoría.
*/
/*~struct~SoundEffect:es
 * @param Name
 * @type file
 * @dir audio/se
 * @desc The sound effect file to play
 * 
 * @param Volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc The volume of the sound effect
 * 
 * @param Pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the sound effect
 * 
 * @param Pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the sound effect
*/
/*~struct~Tone:es
 * @param Red
 * @type number
 * @min -256
 * @max 255
 * @desc Amount of red in the tone. Set to -256 to use default tone.
 * @default 0
 *
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of green in the tone
 * @default 0
 *
 * @param Blue
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of blue in the tone
 * @default 0
*/
Imported.CGMZ_Achievements = true;
CGMZ.Versions["Achievements"] = "1.8.0";
CGMZ.Achievements = {};
CGMZ.Achievements.parameters = PluginManager.parameters('CGMZ_Achievements');
CGMZ.Achievements.AchievementEarnedColor = Number(CGMZ.Achievements.parameters["AchievementEarnedColor"]);
CGMZ.Achievements.DateFormat = Number(CGMZ.Achievements.parameters["DateFormat"]);
CGMZ.Achievements.CurrencyGaugeColor1 = Number(CGMZ.Achievements.parameters["CurrencyGaugeColor1"]);
CGMZ.Achievements.CurrencyGaugeColor2 = Number(CGMZ.Achievements.parameters["CurrencyGaugeColor2"]);
CGMZ.Achievements.GenericGaugeColor1 = Number(CGMZ.Achievements.parameters["GenericGaugeColor1"]);
CGMZ.Achievements.GenericGaugeColor2 = Number(CGMZ.Achievements.parameters["GenericGaugeColor2"]);
CGMZ.Achievements.ItemGaugeColor1 = Number(CGMZ.Achievements.parameters["ItemGaugeColor1"]);
CGMZ.Achievements.ItemGaugeColor2 = Number(CGMZ.Achievements.parameters["ItemGaugeColor2"]);
CGMZ.Achievements.SwitchVarGaugeColor1 = Number(CGMZ.Achievements.parameters["SwitchVarGaugeColor1"]);
CGMZ.Achievements.SwitchVarGaugeColor2 = Number(CGMZ.Achievements.parameters["SwitchVarGaugeColor2"]);
CGMZ.Achievements.ScrollSpeed = Number(CGMZ.Achievements.parameters["ScrollSpeed"]);
CGMZ.Achievements.ScrollWait = Number(CGMZ.Achievements.parameters["ScrollWait"]);
CGMZ.Achievements.CategoryColumns = Number(CGMZ.Achievements.parameters["Category Columns"]);
CGMZ.Achievements.LabelColor = Number(CGMZ.Achievements.parameters["Label Color"]);
CGMZ.Achievements.HeaderColor1 = Number(CGMZ.Achievements.parameters["Header Color 1"]);
CGMZ.Achievements.HeaderColor2 = Number(CGMZ.Achievements.parameters["Header Color 2"]);
CGMZ.Achievements.CategoryPadding = Number(CGMZ.Achievements.parameters["Category Padding"]);
CGMZ.Achievements.ListPadding = Number(CGMZ.Achievements.parameters["List Padding"]);
CGMZ.Achievements.TotalPadding = Number(CGMZ.Achievements.parameters["Total Padding"]);
CGMZ.Achievements.DisplayPadding = Number(CGMZ.Achievements.parameters["Display Padding"]);
CGMZ.Achievements.CategoryBackOpacity = Number(CGMZ.Achievements.parameters["Category Back Opacity"]);
CGMZ.Achievements.ListBackOpacity = Number(CGMZ.Achievements.parameters["List Back Opacity"]);
CGMZ.Achievements.TotalBackOpacity = Number(CGMZ.Achievements.parameters["Total Back Opacity"]);
CGMZ.Achievements.DisplayBackOpacity = Number(CGMZ.Achievements.parameters["Display Back Opacity"]);
CGMZ.Achievements.ListWindowWidth = Number(CGMZ.Achievements.parameters["List Window Width"]);
CGMZ.Achievements.ScrollDeceleration = parseFloat(CGMZ.Achievements.parameters["Scroll Deceleration"]);
CGMZ.Achievements.AutoScroll = (CGMZ.Achievements.parameters["Auto Scroll"] === "true");
CGMZ.Achievements.CurrencyUnitSpace = (CGMZ.Achievements.parameters["Currency Unit Space"] === "true");
CGMZ.Achievements.ShowTotalPoints = (CGMZ.Achievements.parameters["Show Total Points"] === "true");
CGMZ.Achievements.ShowTotalAchievements = (CGMZ.Achievements.parameters["Show Total Achievements"] === "true");
CGMZ.Achievements.TransparentWindows = (CGMZ.Achievements.parameters["Transparent Windows"] === "true");
CGMZ.Achievements.DisableTouchUISpace = (CGMZ.Achievements.parameters["Disable Touch UI Space"] === "true");
CGMZ.Achievements.ShowRewardAfterFail = (CGMZ.Achievements.parameters["Show Rewards After Fail"] === "true");
CGMZ.Achievements.ShowSecretAchievements = (CGMZ.Achievements.parameters["ShowSecretAchievements"] === "true");
CGMZ.Achievements.ShowCriteriaAfterCompletion = (CGMZ.Achievements.parameters["ShowCriteriaAfterCompletion"] === "true");
CGMZ.Achievements.ShowAchievementPop = (CGMZ.Achievements.parameters["ShowAchievementPop"] === "true");
CGMZ.Achievements.CategoryEarnedCount = (CGMZ.Achievements.parameters["Category Earned Count"] === "true");
CGMZ.Achievements.PointsInListWindow = (CGMZ.Achievements.parameters["Points In List Window"] === "true");
CGMZ.Achievements.ReportListRect = (CGMZ.Achievements.parameters["Report List Rect"] === "true");
CGMZ.Achievements.ListWindowRight = (CGMZ.Achievements.parameters["List Window Right"] === "true");
CGMZ.Achievements.SecretHidesEverything = (CGMZ.Achievements.parameters["Secret Hides Everything"] === "true");
CGMZ.Achievements.AchievementEarnedText = CGMZ.Achievements.parameters["AchievementEarnedText"];
CGMZ.Achievements.AchievementEarnedAlignment = CGMZ.Achievements.parameters["AchievementEarnedAlignment"];
CGMZ.Achievements.SecretText = CGMZ.Achievements.parameters["SecretText"];
CGMZ.Achievements.RewardText = CGMZ.Achievements.parameters["Reward Text"];
CGMZ.Achievements.RequirementText = CGMZ.Achievements.parameters["Requirement Text"];
CGMZ.Achievements.DifficultyText = CGMZ.Achievements.parameters["Difficulty Text"];
CGMZ.Achievements.DescriptionText = CGMZ.Achievements.parameters["Description Text"];
CGMZ.Achievements.PointsText = CGMZ.Achievements.parameters["Points Text"];
CGMZ.Achievements.PointsWindowText = CGMZ.Achievements.parameters["Points Window Text"];
CGMZ.Achievements.UnearnedText = CGMZ.Achievements.parameters["Unearned Text"];
CGMZ.Achievements.EarnedText = CGMZ.Achievements.parameters["Earned Text"];
CGMZ.Achievements.FailedText = CGMZ.Achievements.parameters["Failed Text"];
CGMZ.Achievements.EarnedCountText = CGMZ.Achievements.parameters["Earned Count Text"];
CGMZ.Achievements.BasicInfoHeaderText = CGMZ.Achievements.parameters["Basic Info Header Text"];
CGMZ.Achievements.DescriptionHeaderText = CGMZ.Achievements.parameters["Description Header Text"];
CGMZ.Achievements.RequirementHeaderText = CGMZ.Achievements.parameters["Requirement Header Text"];
CGMZ.Achievements.RewardHeaderText = CGMZ.Achievements.parameters["Reward Header Text"];
CGMZ.Achievements.StepsText = CGMZ.Achievements.parameters["Steps Text"];
CGMZ.Achievements.SavesText = CGMZ.Achievements.parameters["Saves Text"];
CGMZ.Achievements.BattlesText = CGMZ.Achievements.parameters["Battles Text"];
CGMZ.Achievements.WinsText = CGMZ.Achievements.parameters["Wins Text"];
CGMZ.Achievements.EscapesText = CGMZ.Achievements.parameters["Escapes Text"];
CGMZ.Achievements.AchievementProgressText = CGMZ.Achievements.parameters["Achievements Progress Text"];
CGMZ.Achievements.PointsProgressText = CGMZ.Achievements.parameters["Points Progress Text"];
CGMZ.Achievements.ProfLevelText = CGMZ.Achievements.parameters["Prof Level Text"];
CGMZ.Achievements.PlayedText = CGMZ.Achievements.parameters["Played Text"];
CGMZ.Achievements.EncTotalText = CGMZ.Achievements.parameters["Enc Total Text"];
CGMZ.Achievements.EncBestiaryText = CGMZ.Achievements.parameters["Enc Bestiary Text"];
CGMZ.Achievements.EncItemsText = CGMZ.Achievements.parameters["Enc Items Text"];
CGMZ.Achievements.EncWeaponsText = CGMZ.Achievements.parameters["Enc Weapons Text"];
CGMZ.Achievements.EncArmorsText = CGMZ.Achievements.parameters["Enc Armors Text"];
CGMZ.Achievements.EncSkillsText = CGMZ.Achievements.parameters["Enc Skills Text"];
CGMZ.Achievements.EncStatesText = CGMZ.Achievements.parameters["Enc States Text"];
CGMZ.Achievements.EncActorsText = CGMZ.Achievements.parameters["Enc Actors Text"];
CGMZ.Achievements.TotalsSeparator = CGMZ.Achievements.parameters["Totals Separator"];
CGMZ.Achievements.TotalWindowAlignment = CGMZ.Achievements.parameters["Total Window Alignment"];
CGMZ.Achievements.ListWindowAlignment = CGMZ.Achievements.parameters["List Window Alignment"];
CGMZ.Achievements.CategoryWindowAlignment = CGMZ.Achievements.parameters["Category Window Alignment"];
CGMZ.Achievements.CategoryWindowskin = CGMZ.Achievements.parameters["Category Windowskin"];
CGMZ.Achievements.ListWindowskin = CGMZ.Achievements.parameters["List Windowskin"];
CGMZ.Achievements.TotalWindowskin = CGMZ.Achievements.parameters["Total Windowskin"];
CGMZ.Achievements.DisplayWindowskin = CGMZ.Achievements.parameters["Display Windowskin"];
CGMZ.Achievements.TotalWindowStyle = CGMZ.Achievements.parameters["Total Window Style"];
CGMZ.Achievements.ListPointText = CGMZ.Achievements.parameters["List Point Text"];
CGMZ.Achievements.SceneBackground = CGMZ.Achievements.parameters["Scene Background"];
CGMZ.Achievements.ControlsWindow = CGMZ.Achievements.parameters["Controls Window"];
CGMZ.Achievements.SecretHiddenText = CGMZ.Achievements.parameters["Secret Hidden Text"];
CGMZ.Achievements.Achievements = CGMZ_Utils.parseJSON(CGMZ.Achievements.parameters["Achievements"], [], "[CGMZ] Achievements", "Your Achievements parameter was set up incorrectly and could not be read.");
CGMZ.Achievements.Categories = CGMZ_Utils.parseJSON(CGMZ.Achievements.parameters["Categories"], [], "[CGMZ] Achievements", "Your Categories parameter was set up incorrectly and could not be read.");
CGMZ.Achievements.AchievementDisplayInfo = CGMZ_Utils.parseJSON(CGMZ.Achievements.parameters["Achievement Display Info"], [], "[CGMZ] Achievements", "Your Achievement Display Info parameter was set up incorrectly and could not be read.");
CGMZ.Achievements.RewardDisplayOrder = CGMZ_Utils.parseJSON(CGMZ.Achievements.parameters["Reward Display Order"], [], "[CGMZ] Achievements", "Your Reward Display Order parameter was set up incorrectly and could not be read.");
CGMZ.Achievements.CriteriaDisplayOrder = CGMZ_Utils.parseJSON(CGMZ.Achievements.parameters["Criteria Display Order"], [], "[CGMZ] Achievements", "Your Criteria Display Order parameter was set up incorrectly and could not be read.");
CGMZ.Achievements.AchievementEarnedSound = CGMZ_Utils.parseSoundEffectJSON(CGMZ.Achievements.parameters["AchievementEarnedSound"], "[CGMZ] Achievements");
CGMZ.Achievements.CategoryTone = CGMZ_Utils.parseToneJSON(CGMZ.Achievements.parameters["Category Tone"], "[CGMZ] Achievements");
CGMZ.Achievements.ListTone = CGMZ_Utils.parseToneJSON(CGMZ.Achievements.parameters["List Tone"], "[CGMZ] Achievements");
CGMZ.Achievements.TotalTone = CGMZ_Utils.parseToneJSON(CGMZ.Achievements.parameters["Total Tone"], "[CGMZ] Achievements");
CGMZ.Achievements.DisplayTone = CGMZ_Utils.parseToneJSON(CGMZ.Achievements.parameters["Display Tone"], "[CGMZ] Achievements");
//=============================================================================
// CGMZ_Achievement
//-----------------------------------------------------------------------------
// Store and manage achievement data.
//=============================================================================
function CGMZ_Achievement() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Achievement
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initialize = function(achievementData, id) {
	this._id = id;
	this._earned = false;
	this._failed = false;
	this._earndate = "";
	this._name = achievementData["Name"];
	this._points = Number(achievementData["Points"]);
	this._category = achievementData.Category;
	this._predesc = CGMZ_Utils.parseJSON(achievementData["Pre Description"], "", "[CGMZ] Achievements", `Achievement with id ${id} had an invalid Pre Description parameter.`);
	this._postdesc = CGMZ_Utils.parseJSON(achievementData["Post Description"], "", "[CGMZ] Achievements", `Achievement with id ${id} had an invalid Post Description parameter.`);
	if(this._postdesc === "") this._postdesc = this._predesc;
	this._secret = (achievementData["Secret"] === "true");
};
//-----------------------------------------------------------------------------
// Set achievement descriptions
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.setDescriptions = function(pre, post) {
	if(pre) this._predesc = pre;
	if(post) this._postdesc = post;
};
//-----------------------------------------------------------------------------
// Set achievement secret property
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.setSecret = function(secret) {
	this._secret = secret;
};
//-----------------------------------------------------------------------------
// Get achievement name
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.getName = function() {
	return this._name;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.isSecret = function() {
	return this._secret;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.isEarned = function() {
	return this._earned;
};
//-----------------------------------------------------------------------------
// Processing when achievement is earned
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.earn = function() {
	if(this._earned) return; // make sure cannot earn again
	this._earned = true;
	this._earndate = CGMZ_Utils.createDateText(CGMZ.Achievements.DateFormat);
};
//=============================================================================
// CGMZ_AchievementTemp
//-----------------------------------------------------------------------------
// Handle unsaved achievement data
//=============================================================================
function CGMZ_AchievementTemp() {
	this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Achievement temp data
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.initialize = function(achievementData) {
	this.name = achievementData["Name"];
	this.difficulty = achievementData["Difficulty"];
	this.automatic = (achievementData["Automatic"] === "true");
	this.listImg = {
		img: achievementData["List Image"],
		imgX: Number(achievementData["List Image X"]),
		imgY: Number(achievementData["List Image Y"])
	}
	this.setupToast(achievementData["Popup"]);
	this.setupRewards(achievementData["Rewards"]);
	this.setupRequirements(achievementData["Requirements"]);
};
//-----------------------------------------------------------------------------
// Set up achievement toast
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.setupToast = function(popup) {
	const toastJSON = CGMZ_Utils.parseJSON(popup, null, "[CGMZ] Achievements", `Your achievement with name ${this.name} had its popup parameter set up incorrectly`);
	let toast = null;
	if(toastJSON) {
		toast = CGMZ_Utils.setupToast(toastJSON, "[CGMZ] Achievements");
		if(toast) {
			toast.picture = toastJSON.Image;
			toast.lineTwoColor = Number(toastJSON.Color);
		} else {
			toast = {};
		}
	}
	if(toast && toast.SE && !toast.SE.name) toast.SE = CGMZ.Achievements.AchievementEarnedSound;
	this.toast = toast;
};
//-----------------------------------------------------------------------------
// Set up achievement rewards
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.setupRewards = function(rewardJSON) {
	const rewards = CGMZ_Utils.parseJSON(rewardJSON, null, "[CGMZ] Achievements", `Your Rewards parameter for achievement ${this.name} was set up incorrectly and could not be read.`);
	this.rewards = {};
	this.rewards.items = [];
	this.rewards.switches = [];
	this.rewards.variables = [];
	this.rewards.currency = Number(rewards["Currency"]);
	this.rewards.commonEvent = rewards["Common Event"] ? Number(rewards["Common Event"]) : 0;
	this.rewards.customCurrency = [];
	if(!rewards) {
		this._hasRewards = false;
		return;
	}
	this.rewards.custom = CGMZ_Utils.parseJSON(rewards["Custom"], [], "[CGMZ] Achievements", `Your Custom reward parameter for achievement ${this.name} was set up incorrectly and could not be read.`);
	this.initializeItems(this.rewards.items, rewards["Items"], "Item", "Amount", "item");
	this.initializeItems(this.rewards.items, rewards["Weapons"], "Weapon", "Amount", "weapon");
	this.initializeItems(this.rewards.items, rewards["Armors"], "Armor", "Amount", "armor");
	this.initializeSwitches(this.rewards.switches, rewards["Switches"], "Switch", "On/Off", "Description");
	this.initializeVariables(this.rewards.variables, rewards["Variables"], "Variable", "Amount", "Description", "Operator");
	this.initializeCustomCurrency(this.rewards.customCurrency, rewards["Custom Currency"]);
	this.setRewardFlag();
};
//-----------------------------------------------------------------------------
// Set up achievement requirements
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.setupRequirements = function(reqJSON) {
	const requirements = CGMZ_Utils.parseJSON(reqJSON, {}, "[CGMZ] Achievements", `Your Requirements parameter for achievement ${this.name} was set up incorrectly and could not be read.`);
	this.requirements = {};
	this.requirements["items"] = [];
	this.requirements["switches"] = [];
	this.requirements["variables"] = [];
	this.requirements["currency"] = Number(requirements["Currency"]);
	this.requirements.customCurrency = [];
	this.initializeItems(this.requirements.items, requirements["Items"], "Item", "Amount", "item");
	this.initializeItems(this.requirements.items, requirements["Weapons"], "Weapon", "Amount", "weapon");
	this.initializeItems(this.requirements.items, requirements["Armors"], "Armor", "Amount", "armor");
	this.initializeSwitches(this.requirements.switches, requirements["Switches"], "Switch", "On/Off", "Description");
	this.initializeVariables(this.requirements.variables, requirements["Variables"], "Variable", "Amount", "Description", "Operator");
	this.initializeCustomCurrency(this.requirements.customCurrency, requirements["Custom Currency"]);
	this.requirements["saves"] = Number(requirements["Saves"]);
	this.requirements["steps"] = Number(requirements["Steps"]);
	this.requirements["battles"] = Number(requirements["Battles"]);
	this.requirements["wins"] = Number(requirements["Wins"]);
	this.requirements["escapes"] = Number(requirements["Escapes"]);
	this.requirements["achievetotal"] = Number(requirements["Achievements Earned"]);
	this.requirements["achievepts"] = Number(requirements["Achievement Points"]);
	this.requirements["playtime"] = Math.floor(Number(requirements["Playtime"]) / 60);
	this.requirements["encyclopediatotal"] = Number(requirements["Encyclopedia Total"]);
	this.requirements["encyclopediabestiary"] = Number(requirements["Encyclopedia Bestiary"]);
	this.requirements["encyclopediaitems"] = Number(requirements["Encyclopedia Items"]);
	this.requirements["encyclopediaweapons"] = Number(requirements["Encyclopedia Weapons"]);
	this.requirements["encyclopediaarmors"] = Number(requirements["Encyclopedia Armors"]);
	this.requirements["encyclopediaskills"] = Number(requirements["Encyclopedia Skills"]);
	this.requirements["encyclopediastates"] = Number(requirements["Encyclopedia States"]);
	this.requirements["encyclopediaactors"] = Number(requirements["Encyclopedia Actors"]);
	this.requirements["professions"] = this.initializeProfessionRequirements(requirements["Professions"]);
	this.setRequirementFlag();
};
//-----------------------------------------------------------------------------
// Initialize Achievement items (requirement or reward)
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.initializeItems = function(itemArray, JSONtext, idText, amtText, type) {
	const parsedItems = CGMZ_Utils.parseJSON(JSONtext, [], "[CGMZ] Achievements", `The plugin could not read an item array for achievement: ${this.name}`);
	for(const parsedItem of parsedItems) {
		const obj = CGMZ_Utils.parseJSON(parsedItem, null, "[CGMZ] Achievements", `The plugin could not read an item from array for achievement: ${this.name}`);
		if(!obj) continue;
		const id = Number(obj[idText]);
		const amt = Number(obj[amtText]);
		itemArray.push({"type": type, "id": id, "amt": amt});
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement switches (requirement or reward)
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.initializeSwitches = function(switchArray, JSONtext, idText, valueText, descText) {
	const parsedItems = CGMZ_Utils.parseJSON(JSONtext, [], "[CGMZ] Achievements", `The plugin could not read a switch array for achievement: ${this.name}`);
	for(const parsedItem of parsedItems) {
		const obj = CGMZ_Utils.parseJSON(parsedItem, null, "[CGMZ] Achievements", `The plugin could not read a switch from array for achievement: ${this.name}`);
		if(!obj) continue;
		const id = Number(obj[idText]);
		const value = (obj[valueText] === "true");
		const description = obj[descText];
		switchArray.push({"value": value, "id": id, "description": description});
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement switches (requirement or reward)
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.initializeVariables = function(variableArray, JSONtext, idText, valueText, descText, opText) {
	const parsedItems = CGMZ_Utils.parseJSON(JSONtext, [], "[CGMZ] Achievements", `The plugin could not read a switch array for achievement: ${this.name}`);
	for(const parsedItem of parsedItems) {
		const obj = CGMZ_Utils.parseJSON(parsedItem, null, "[CGMZ] Achievements", `The plugin could not read a switch from array for achievement: ${this.name}`);
		if(!obj) continue;
		const id = Number(obj[idText]);
		const value = Number(obj[valueText]);
		const operator = obj[opText];
		const description = obj[descText];
		variableArray.push({"value": value, "id": id, "description": description, "operator": operator});
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement custom currencies (requirement or reward)
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.initializeCustomCurrency = function(currencyArray, JSONtext) {
	const parsedCurrencies = CGMZ_Utils.parseJSON(JSONtext, [], "[CGMZ] Achievements", `The plugin could not read a custom currency array for achievement: ${this.name}`);
	for(const parsedCurrency of parsedCurrencies) {
		const obj = CGMZ_Utils.parseJSON(parsedCurrency, null, "[CGMZ] Achievements", `The plugin could not read a custom currency from array for achievement: ${this.name}`);
		if(!obj) continue;
		const id = obj.Id;
		const amt = Number(obj.Amount);
		currencyArray.push({id: id, amt: amt});
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement profession requirements
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.initializeProfessionRequirements = function(reqs) {
	if(!Imported.CGMZ_Professions) return [];
	const required = [];
	const reqsA = CGMZ_Utils.parseJSON(reqs, [], "[CGMZ] Achievements", `The plugin could not read a profession requirement array for achievement: ${this.name}`);
	for(const reqJSON of reqsA) {
		const reqTemp = CGMZ_Utils.parseJSON(reqJSON, null, "[CGMZ] Achievements", `The plugin could not read a profession requirement for achievement: ${this.name}`);
		if(!reqTemp) continue;
		const req = {"name": reqTemp.Name, "level": Number(reqTemp["Level Requirement"])};
		required.push(req);
	}
	return required;
};
//-----------------------------------------------------------------------------
// Set flag if achievement has rewards
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.setRewardFlag = function() {
	this._hasRewards = CGMZ_Utils.isObjectPopulated(this.rewards);
};
//-----------------------------------------------------------------------------
// Set flag if achievement has requirements
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.setRequirementFlag = function() {
	this._hasRequirements = CGMZ_Utils.isObjectPopulated(this.requirements);
};
//-----------------------------------------------------------------------------
// Determine if achievement has rewards
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.hasRewards = function() {
	return this._hasRewards;
};
//-----------------------------------------------------------------------------
// Determine if achievement has requirements
//-----------------------------------------------------------------------------
CGMZ_AchievementTemp.prototype.hasRequirements = function() {
	return this._hasRequirements;
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage achievement data. Stored as an array of achievement objects.
//=============================================================================
//-----------------------------------------------------------------------------
// Call Initialize for achievements
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Achievements_createPluginData.call(this);
	this.initializeAchievements(false);
};
//-----------------------------------------------------------------------------
// Load new achievements after saved game load
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Achievements_CGMZCore_onAfterLoad.call(this);
	this.initializeAchievements(false);
};
//-----------------------------------------------------------------------------
// Initializes achievements
// If new achievements have been added, these will be added onto the end of the
// existing array.
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeAchievements = function(reinitialize) {
	if(!this._achievements || reinitialize) {
		this.setupAchievementVariables();
	}
	let id = this._achievements.length + 1;
	for(const achievementJSON of CGMZ.Achievements.Achievements) {
		const parsedAchievement = CGMZ_Utils.parseJSON(achievementJSON, null, "[CGMZ] Achievements", "Your Achievements parameter was set up incorrectly and could not be read.");
		if(!parsedAchievement) continue;
		const achievement = new CGMZ_Achievement(parsedAchievement, id);
		const existingAchievement = this.getAchievementByName(achievement.getName());
		if(!existingAchievement) {
			this.commitAchievement(achievement);
			id++;
		}
		// start patch existing achievements by version number
		if(!this._cgmzAchievementsVersion && existingAchievement && !existingAchievement._category && achievement._category) existingAchievement._category = achievement._category;
		// end patch
	}
	// set correct version number
	if(!this._cgmzAchievementsVersion) this._cgmzAchievementsVersion = 140;
};
//-----------------------------------------------------------------------------
// Set up variables for achievements
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupAchievementVariables = function() {
	this._achievements = [];
	this._usingAchievementPoints = false;
	this._achievetotal = 0;
	this._achievepts = 0;
	this._cgmzAchievementsVersion = 140;
};
//-----------------------------------------------------------------------------
// Commit the achievement to the achievement array
// Also store achievement criteria informations
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.commitAchievement = function(achievement) {
	this._achievements.push(achievement);
	if(achievement._points > 0) this._usingAchievementPoints = true;
};
//-----------------------------------------------------------------------------
// Earn achievement
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.earnAchievement = function(id) {
	const achievement = this.getAchievementByID(id);
	if(achievement.isEarned()) return;
	const achTemp = $cgmzTemp.getTempAchievementData(achievement._name);
	achievement.earn();
	this._achievetotal++;
	this._achievepts += achievement._points;
	if(achTemp.hasRewards()) {
		$cgmzTemp.giveAchievementRewards(achTemp.rewards);
	}
	if(Imported.CGMZ_ToastManager && CGMZ.Achievements.ShowAchievementPop) {
		this.setupAchievementToast(achievement._name);
	}
	$cgmzTemp.checkAchievementAchieveptsCriteria();
	$cgmzTemp.checkAchievementAchievetotalCriteria();
};
//-----------------------------------------------------------------------------
// Sets up achievement toast window
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupAchievementToast = function(name) {
	const tempData = $cgmzTemp.getTempAchievementData(name);
	if(!tempData || !tempData.toast) return;
	const toastobj = JSON.parse(JSON.stringify(tempData.toast));
	if(!toastobj) return;
	if(toastobj.picture !== "") {
		toastobj.isImage = true;
		toastobj.showBackground = false;
	} else {
		toastobj.isText = true;
		toastobj.lineOneAlignment = CGMZ.Achievements.AchievementEarnedAlignment;
		toastobj.lineOne = CGMZ.Achievements.AchievementEarnedText;
		toastobj.lineOneColor = CGMZ.Achievements.AchievementEarnedColor;
		toastobj.lineTwoAlignment = CGMZ.Achievements.AchievementEarnedAlignment;
		toastobj.lineTwo = name;
		if(!toastobj.lineTwoColor) toastobj.lineTwoColor = 0;
	}
	$cgmzTemp.createNewToast(toastobj);
};
//-----------------------------------------------------------------------------
// Get achievement array
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAchievements = function() {
	return this._achievements;
};
//-----------------------------------------------------------------------------
// Get achievement by ID, returns undefined if no achievement found
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAchievementByID = function(id) {
	return this._achievements.find(achievement => achievement._id === id);
};
//-----------------------------------------------------------------------------
// Get achievement by name, returns undefined if no achievement found
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAchievementByName = function(name) {
	return this._achievements.find(achievement => achievement.getName() === name);
};
//-----------------------------------------------------------------------------
// Get achievement earned count
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countEarnedAchievements = function() {
	return this._achievetotal;
};
//-----------------------------------------------------------------------------
// Get achievement point count
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countEarnedAchievementPoints = function() {
	return this._achievepts;
};
//-----------------------------------------------------------------------------
// Get achievement earned in category
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countEarnedAchievementsInCategory = function(category) {
	let earned = 0;
	for(const achievement of this._achievements) {
		if(achievement.isEarned() && achievement._category === category) earned++;
	}
	return earned;
};
//-----------------------------------------------------------------------------
// Get total amount of achievements
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countTotalAchievements = function() {
	return this._achievements.length;
};
//-----------------------------------------------------------------------------
// Get total amount of achievement points
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countTotalAchievementPoints = function() {
	let points = 0;
	for(const achievement of this._achievements) {
		points += achievement._points;
	}
	return points;
};
//-----------------------------------------------------------------------------
// Get total achievements in category
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countTotalAchievementsInCategory = function(category) {
	let total = 0;
	for(const achievement of this._achievements) {
		if(achievement._category === category) total++;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Achievements have points?
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.usingAchievementPoints = function() {
	return this._usingAchievementPoints;
};
//-----------------------------------------------------------------------------
// Legacy function calls, now part of temp data not save data, these are kept
// around for backward compatibility with old versions of plugins, and third 
// party plugins that may use them.
// Deprecated - Other plugins should away from using these functions
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementCurrencyCriteria = function() {
	$cgmzTemp.checkAchievementCurrencyCriteria();
};
CGMZ_Core.prototype.checkAchievementStepsCriteria = function() {
	$cgmzTemp.checkAchievementStepsCriteria();
};
CGMZ_Core.prototype.checkAchievementSavesCriteria = function() {
	$cgmzTemp.checkAchievementSavesCriteria();
};
CGMZ_Core.prototype.checkAchievementBattlesCriteria = function() {
	$cgmzTemp.checkAchievementBattlesCriteria();
};
CGMZ_Core.prototype.checkAchievementWinsCriteria = function() {
	$cgmzTemp.checkAchievementWinsCriteria();
};
CGMZ_Core.prototype.checkAchievementEscapesCriteria = function() {
	$cgmzTemp.checkAchievementEscapesCriteria();
};
CGMZ_Core.prototype.checkAchievementPlaytimeCriteria = function() {
	$cgmzTemp.checkAchievementPlaytimeCriteria();
};
CGMZ_Core.prototype.checkAchievementAchieveptsCriteria = function() {
	$cgmzTemp.checkAchievementAchieveptsCriteria();
};
CGMZ_Core.prototype.checkAchievementAchievetotalCriteria = function() {
	$cgmzTemp.checkAchievementAchievetotalCriteria();
};
CGMZ_Core.prototype.checkAchievementEncyclopediaCriteria = function() {
	$cgmzTemp.checkAchievementEncyclopediaCriteria();
};
CGMZ_Core.prototype.checkAchievementItemsCriteria = function() {
	$cgmzTemp.checkAchievementItemsCriteria();
};
CGMZ_Core.prototype.checkAchievementSwitchesCriteria = function() {
	$cgmzTemp.checkAchievementSwitchesCriteria();
};
CGMZ_Core.prototype.checkAchievementVariablesCriteria = function() {
	$cgmzTemp.checkAchievementVariablesCriteria();
};
CGMZ_Core.prototype.checkAchievementProfessionCriteria = function() {
	$cgmzTemp.checkAchievementProfessionCriteria();
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Adds plugin commands, handling for category data
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize achievmeent data
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_Achievements_CGMZ_Temp_createPluginData.call(this);
	this.initializeAchievementData();
};
//-----------------------------------------------------------------------------
// Initialize achievement data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeAchievementData = function() {
	this._achievements = {};
	this._achievementCategories = {};
	this._achievementTypes = {}; // each property stores names of achievements with those criteria
	this._achievementTypes.currency = [];
	this._achievementTypes.customCurrency = [];
	this._achievementTypes.steps = [];
	this._achievementTypes.battles = [];
	this._achievementTypes.escapes = [];
	this._achievementTypes.wins = [];
	this._achievementTypes.playtime = [];
	this._achievementTypes.saves = [];
	this._achievementTypes.achievetotal = [];
	this._achievementTypes.achievepts = [];
	this._achievementTypes.items = [];
	this._achievementTypes.switches = [];
	this._achievementTypes.variables = [];
	this._achievementTypes.encyclopedia = [];
	this._achievementTypes.professions = [];
	for(const achievementJSON of CGMZ.Achievements.Achievements) {
		const parsedAchievement = CGMZ_Utils.parseJSON(achievementJSON, null, "[CGMZ] Achievements", "Your Achievements parameter was set up incorrectly and could not be read.");
		if(!parsedAchievement) continue;
		const achievement = new CGMZ_AchievementTemp(parsedAchievement);
		this._achievements[achievement.name] = achievement;
		this.addAchievementToCriteriaTypeArray(achievement);
	}
	for(const catJSON of CGMZ.Achievements.Categories) {
		const category = CGMZ_Utils.parseJSON(catJSON, null, "[CGMZ] Achievements", "One of your achievement categories was set up incorrectly and could not be read.");
		if(!category) continue;
		this._achievementCategories[category.id] = category.Name;
	}
};
//-----------------------------------------------------------------------------
// Store achievement criteria information for autotracking
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.addAchievementToCriteriaTypeArray = function(achievement) {
	const name = achievement.name;
	if(achievement.hasRequirements() && achievement.automatic) {
		const r = achievement.requirements;
		if(r.currency > 0) this._achievementTypes.currency.push(name);
		if(r.steps > 0) this._achievementTypes.steps.push(name);
		if(r.saves > 0) this._achievementTypes.saves.push(name);
		if(r.playtime > 0) this._achievementTypes.playtime.push(name);
		if(r.battles > 0) this._achievementTypes.battles.push(name);
		if(r.escapes > 0) this._achievementTypes.escapes.push(name);
		if(r.wins > 0) this._achievementTypes.wins.push(name);
		if(r.achievepts > 0) this._achievementTypes.achievepts.push(name);
		if(r.achievetotal > 0) this._achievementTypes.achievetotal.push(name);
		if(r.encyclopediatotal > 0) this._achievementTypes.encyclopedia.push(name);
		if(r.encyclopediabestiary > 0) this._achievementTypes.encyclopedia.push(name);
		if(r.encyclopediaarmors > 0) this._achievementTypes.encyclopedia.push(name);
		if(r.encyclopediaitems > 0) this._achievementTypes.encyclopedia.push(name);
		if(r.encyclopediaweapons > 0) this._achievementTypes.encyclopedia.push(name);
		if(r.encyclopediaskills > 0) this._achievementTypes.encyclopedia.push(name);
		if(r.encyclopediastates > 0) this._achievementTypes.encyclopedia.push(name);
		if(r.encyclopediaactors > 0) this._achievementTypes.encyclopedia.push(name);
		if(r.items.length > 0) this._achievementTypes.items.push(name);
		if(r.switches.length > 0) this._achievementTypes.switches.push(name);
		if(r.variables.length > 0) this._achievementTypes.variables.push(name);
		if(r.professions.length > 0) this._achievementTypes.professions.push(name);
		if(r.customCurrency.length > 0) this._achievementTypes.customCurrency.push(name);
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Criteria and Award if achievement is earned
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementForEarn = function(achievement) {
	const achS = $cgmz.getAchievementByName(achievement.name);
	if(!achS) return;
	if(!this.needCriteriaCheck(achievement, achS)) return;
	const criteria = achievement.requirements;
	if(criteria.currency > 0 && $gameParty.gold() < criteria.currency) return;
	if(criteria.steps > 0 && $gameParty.steps() < criteria.steps) return;
	if(criteria.saves > 0 && $gameSystem.saveCount() < criteria.saves) return;
	if(criteria.battles > 0 && $gameSystem.battleCount() < criteria.battles) return;
	if(criteria.wins > 0 && $gameSystem.winCount() < criteria.wins) return;
	if(criteria.escapes > 0 && $gameSystem.escapeCount() < criteria.escapes) return;
	if(criteria.achievepts > 0 && $cgmz._achievepts < criteria.achievepts) return;
	if(criteria.achievetotal > 0 && $cgmz._achievetotal < criteria.achievetotal) return;
	if(criteria.playtime > 0 && $gameSystem.playtime() < criteria.playtime) return;
	if(criteria.encyclopediatotal > 0 && $cgmz.getEncyclopediaTotalPercent() < criteria.encyclopediatotal) return;
	if(criteria.encyclopediabestiary > 0 && $cgmz.getEncyclopediaBestiaryPercent() < criteria.encyclopediabestiary) return;
	if(criteria.encyclopediaitems > 0 && $cgmz.getEncyclopediaItemsPercent() < criteria.encyclopediaitems) return;
	if(criteria.encyclopediaarmors > 0 && $cgmz.getEncyclopediaArmorsPercent() < criteria.encyclopediaarmors) return;
	if(criteria.encyclopediaweapons > 0 && $cgmz.getEncyclopediaWeaponsPercent() < criteria.encyclopediaweapons) return;
	if(criteria.encyclopediaskills > 0 && $cgmz.getEncyclopediaSkillsPercent() < criteria.encyclopediaskills) return;
	if(criteria.encyclopediastates > 0 && $cgmz.getEncyclopediaStatesPercent() < criteria.encyclopediastates) return;
	if(criteria.encyclopediaactors > 0 && $cgmz.getEncyclopediaActorsPercent() < criteria.encyclopediaactors) return;
	for(const prof of criteria.professions) {
		const profession = $cgmz.getProfession(prof.name);
		if(profession._level < prof.level) return;
	}
	for(const itemObj of criteria.items) {
		const item = CGMZ_Utils.lookupItem(itemObj.type, itemObj.id);
		if($gameParty.numItems(item) < itemObj.amt) return;
	}
	for(const switchObj of criteria.switches) {
		if(switchObj.value != $gameSwitches.value(switchObj.id)) return;
	}
	for(const variableObj of criteria.variables) {
		const gameVariable = $gameVariables.value(variableObj.id);
		if(!CGMZ_Utils.numberValueCompare(gameVariable, variableObj.value, variableObj.operator)) return;
	}
	for(const currencyObj of criteria.customCurrency) {
		const currency = $cgmz.getCurrency(currencyObj.id);
		if(currency && currency.amount() < currencyObj.amt) return;
	}
	$cgmz.earnAchievement(achS._id);
};
//-----------------------------------------------------------------------------
// Determine if need to check for criteria?
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.needCriteriaCheck = function(achievement, achS) {
	if(achS._earned) return false;
	if(achS._failed) return false;
	return achievement.hasRequirements();
};
//-----------------------------------------------------------------------------
// Check Achievement Currency Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementCurrencyCriteria = function() {
	for(const name of this._achievementTypes.currency) {
		const achievement = this.getTempAchievementData(name);
		if($gameParty.gold() >= achievement.requirements.currency) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Custom Currency Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementCustomCurrencyCriteria = function() {
	for(const name of this._achievementTypes.customCurrency) {
		let possible = true;
		const achievement = this.getTempAchievementData(name);
		for(const currencyObj of achievement.requirements.customCurrency) {
			const currency = $cgmz.getCurrency(currencyObj.id);
			if(currency && currencyObj.amt > currency.amount()) {
				possible = false;
			}
		}
		if(possible) this.checkAchievementForEarn(achievement);
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Steps Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementStepsCriteria = function() {
	for(const name of this._achievementTypes.steps) {
		const achievement = this.getTempAchievementData(name);
		if($gameParty.steps() >= achievement.requirements.steps) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Saves Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementSavesCriteria = function() {
	for(const name of this._achievementTypes.saves) {
		const achievement = this.getTempAchievementData(name);
		if($gameSystem.saveCount() >= achievement.requirements.saves) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Battles Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementBattlesCriteria = function() {
	for(const name of this._achievementTypes.battles) {
		const achievement = this.getTempAchievementData(name);
		if($gameSystem.battleCount() >= achievement.requirements.battles) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Wins Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementWinsCriteria = function() {
	for(const name of this._achievementTypes.wins) {
		const achievement = this.getTempAchievementData(name);
		if($gameSystem.winCount() >= achievement.requirements.wins) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Escapes Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementEscapesCriteria = function() {
	for(const name of this._achievementTypes.escapes) {
		const achievement = this.getTempAchievementData(name);
		if($gameSystem.escapeCount() >= achievement.requirements.escapes) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Playtime Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementPlaytimeCriteria = function() {
	for(const name of this._achievementTypes.playtime) {
		const achievement = this.getTempAchievementData(name);
		if($gameSystem.playtime() >= achievement.requirements.playtime) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Achievepts Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementAchieveptsCriteria = function() {
	for(const name of this._achievementTypes.achievepts) {
		const achievement = this.getTempAchievementData(name);
		if($cgmz.countEarnedAchievementPoints() >= achievement.requirements.achievepts) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Achievetotal Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementAchievetotalCriteria = function() {
	for(const name of this._achievementTypes.achievetotal) {
		const achievement = this.getTempAchievementData(name);
		if($cgmz.countEarnedAchievements() >= achievement.requirements.achievetotal) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Encyclopedia Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementEncyclopediaCriteria = function() {
	for(const name of this._achievementTypes.encyclopedia) {
		const achievement = this.getTempAchievementData(name);
		if(achievement.requirements.encyclopediatotal > 0 && $cgmz.getEncyclopediaTotalPercent() >= achievement.requirements.encyclopediatotal) {
			this.checkAchievementForEarn(achievement);
		} else if(achievement.requirements.encyclopediabestiary > 0 && $cgmz.getEncyclopediaBestiaryPercent() >= achievement.requirements.encyclopediabestiary) {
			this.checkAchievementForEarn(achievement);
		} else if(achievement.requirements.encyclopediaitems > 0 && $cgmz.getEncyclopediaItemsPercent() >= achievement.requirements.encyclopediaitems) {
			this.checkAchievementForEarn(achievement);
		} else if(achievement.requirements.encyclopediaarmors > 0 && $cgmz.getEncyclopediaArmorsPercent() >= achievement.requirements.encyclopediaarmors) {
			this.checkAchievementForEarn(achievement);
		} else if(achievement.requirements.encyclopediaweapons > 0 && $cgmz.getEncyclopediaWeaponsPercent() >= achievement.requirements.encyclopediaweapons) {
			this.checkAchievementForEarn(achievement);
		} else if(achievement.requirements.encyclopediaskills > 0 && $cgmz.getEncyclopediaSkillsPercent() >= achievement.requirements.encyclopediaskills) {
			this.checkAchievementForEarn(achievement);
		} else if(achievement.requirements.encyclopediastates > 0 && $cgmz.getEncyclopediaStatesPercent() >= achievement.requirements.encyclopediastates) {
			this.checkAchievementForEarn(achievement);
		} else if(achievement.requirements.encyclopediaactors > 0 && $cgmz.getEncyclopediaActorsPercent() >= achievement.requirements.encyclopediaactors) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Items Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementItemsCriteria = function() {
	for(const name of this._achievementTypes.items) {
		const achievement = this.getTempAchievementData(name);
		for(const itemObj of achievement.requirements.items) {
			const item = CGMZ_Utils.lookupItem(itemObj.type, itemObj.id);
			if($gameParty.numItems(item) >= itemObj.amt) {
				this.checkAchievementForEarn(achievement);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Switches Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementSwitchesCriteria = function() {
	for(const name of this._achievementTypes.switches) {
		const achievement = this.getTempAchievementData(name);
		for(const switchObj of achievement.requirements.switches) {
			if(switchObj.value == $gameSwitches.value(switchObj.id)) {
				this.checkAchievementForEarn(achievement);
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Variables Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementVariablesCriteria = function() {
	for(const name of this._achievementTypes.variables) {
		const achievement = this.getTempAchievementData(name);
		for(const variableObj of achievement.requirements.variables) {
			const gameVariable = $gameVariables.value(variableObj.id);
			if(CGMZ_Utils.numberValueCompare(gameVariable, variableObj.value, variableObj.operator)) this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Professions Criteria
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkAchievementProfessionCriteria = function() {
	for(const name of this._achievementTypes.professions) {
		const achievement = this.getTempAchievementData(name);
		let needCheck = true;
		for(const prof of achievement.requirements.professions) {
			const profession = $cgmz.getProfession(prof.name);
			if(prof.level > profession._level) {
				needCheck = false;
				break;
			}
		}
		if(needCheck) this.checkAchievementForEarn(achievement);
	}
};
//-----------------------------------------------------------------------------
// Give achievement rewards
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.giveAchievementRewards = function(reward) {
	if(reward.currency) $gameParty.gainGold(reward.currency);
	if(reward.commonEvent) $gameTemp.reserveCommonEvent(reward.commonEvent);
	for(const itemObj of reward.items) {
		const item = CGMZ_Utils.lookupItem(itemObj.type, itemObj.id)
		$gameParty.gainItem(item, itemObj.amt);
	}
	for(const switchObj of reward.switches) {
		$gameSwitches.setValue(switchObj.id, switchObj.value);
	}
	for(const variableObj of reward.variables) {
		try {
			oldValue = $gameVariables.value(variableObj.id);
			switch(variableObj.operator) {
				case "=": $gameVariables.setValue(variableObj.id, variableObj.value); break;
				case "+": $gameVariables.setValue(variableObj.id, oldValue + variableObj.value); break;
				case "-": $gameVariables.setValue(variableObj.id, oldValue - variableObj.value); break;
				case "*": $gameVariables.setValue(variableObj.id, oldValue * variableObj.value); break;
				case "/": $gameVariables.setValue(variableObj.id, oldValue / variableObj.value); break;
				case "%": $gameVariables.setValue(variableObj.id, oldValue % variableObj.value); break;
			}
		} catch (e) {
			$gameVariables.setValue(variableObj.id, 0);
		}
	}
	if(reward.customCurrency && Imported.CGMZ_CurrencySystem) {
		for(const currencyObj of reward.customCurrency) {
			const currency = $cgmz.getCurrency(currencyObj.id)
			if(currency) currency.gainCurrency(currencyObj.amt);
		}
	}
};
//-----------------------------------------------------------------------------
// Get temp achievement data (only accessible by name)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getTempAchievementData = function(name) {
	return this._achievements[name];
};
//-----------------------------------------------------------------------------
// Get achievement categories as array
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAchievementCategories = function() {
	return Object.keys(this._achievementCategories);
};
//-----------------------------------------------------------------------------
// Get achievement category by id
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getAchievementCategory = function(id) {
	return this._achievementCategories[id];
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Achievements_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Achievements", "Reinitialize", this.pluginCommandAchievementsReinitialize);
	PluginManager.registerCommand("CGMZ_Achievements", "Call Scene", this.pluginCommandAchievementsCallScene);
	PluginManager.registerCommand("CGMZ_Achievements", "Earn Achievement By Name", this.pluginCommandAchievementsEarnByName);
	PluginManager.registerCommand("CGMZ_Achievements", "Earn Achievement By ID", this.pluginCommandAchievementsEarnByID);
	PluginManager.registerCommand("CGMZ_Achievements", "Change Description", this.pluginCommandAchievementsChangeDescription);
	PluginManager.registerCommand("CGMZ_Achievements", "Change Secret", this.pluginCommandAchievementsChangeSecret);
	PluginManager.registerCommand("CGMZ_Achievements", "Fail Achievement", this.pluginCommandAchievementsFailAchievement);
	PluginManager.registerCommand("CGMZ_Achievements", "Check Achievement", this.pluginCommandAchievementsCheckAchievement);
};
//-----------------------------------------------------------------------------
// Earn an achievement by its name
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsEarnByName = function(args) {
	const achievement = $cgmz.getAchievementByName(args.name);
	if(achievement) {
		$cgmz.earnAchievement(achievement._id);
	}
};
//-----------------------------------------------------------------------------
// Earn an achievement by its ID
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsEarnByID = function(args) {
	const achievement = $cgmz.getAchievementByID(Number(args.id));
	if(achievement) {
		$cgmz.earnAchievement(achievement._id);
	}
};
//-----------------------------------------------------------------------------
// Reinitialize the achievement data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsReinitialize = function() {
	$cgmz.initializeAchievements(true);
};
//-----------------------------------------------------------------------------
// Call the Achievements Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsCallScene = function() {
	SceneManager.push(CGMZ_Scene_Achievements);
};
//-----------------------------------------------------------------------------
// Change an achievement description
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsChangeDescription = function(args) {
	const achievement = (args.name) ? $cgmz.getAchievementByName(args.name) : $cgmz.getAchievementByID(Number(args.id));
	if(achievement) {
		const pre = CGMZ_Utils.parseJSON(args["Pre Description"], "", "[CGMZ] Achievements", "Your Pre Description in plugin command was set up incorrectly and could not be read.");
		const post = CGMZ_Utils.parseJSON(args["Post Description"], "", "[CGMZ] Achievements", "Your Post Description in plugin command was set up incorrectly and could not be read.");
		achievement.setDescriptions(pre, post);
	}
};
//-----------------------------------------------------------------------------
// Change an achievement secret property
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsChangeSecret = function(args) {
	const achievement = (args.name) ? $cgmz.getAchievementByName(args.name) : $cgmz.getAchievementByID(Number(args.id));
	if(achievement) achievement.setSecret(args.secret === 'true');
};
//-----------------------------------------------------------------------------
// Fail an achievement
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsFailAchievement = function(args) {
	const achievement = (args.name) ? $cgmz.getAchievementByName(args.name) : $cgmz.getAchievementByID(Number(args.id));
	if(achievement) achievement._failed = true;
};
//-----------------------------------------------------------------------------
// Check an achievement's status
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsCheckAchievement = function(args) {
	const achievement = $cgmz.getAchievementByName(args["Achievement Name"]);
	if(achievement) {
		const variable = Number(args.Variable);
		const result = (achievement._earned) ? 1 : (achievement._failed) ? 2 : 0;
		$gameVariables.setValue(variable, result);
	}
};
//=============================================================================
// CGMZ_Scene_Achievements
//-----------------------------------------------------------------------------
// Scene that controls achievement display windows.
// Call with SceneManager.push(CGMZ_Scene_Achievements);
//=============================================================================
function CGMZ_Scene_Achievements() {
	this.initialize.apply(this, arguments);
}
CGMZ_Scene_Achievements.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Achievements.prototype.constructor = CGMZ_Scene_Achievements;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
	this._categories = $cgmzTemp.getAchievementCategories();
};
//-----------------------------------------------------------------------------
// Create achievement windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.createCategoryWindow();
	this.createListWindow();
	this.createTotalsWindow();
	this.createAchievementWindow();
};
//-----------------------------------------------------------------------------
// Prepare achievement scene
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.prepare = function(categories = null) {
	if(categories) this._categories = categories;
};
//-----------------------------------------------------------------------------
// Check if categories exist
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.hasCategories = function() {
	return $cgmzTemp.getAchievementCategories().length > 0;
};
//-----------------------------------------------------------------------------
// Check if should make room for Touch UI
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.hasTouchUI = function() {
	return !CGMZ.Achievements.DisableTouchUISpace || ConfigManager.touchUI;
};
//-----------------------------------------------------------------------------
// Create achievement category window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createCategoryWindow = function() {
	const rect = this.categoryWindowRect();
	const activate = this.hasCategories();
	this._categoryWindow = new CGMZ_Achievement_Window_Category(rect, activate, this._categories);
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
	this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Achievement category window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.categoryWindowRect = function() {
	const x = 0;
	const y = this.hasTouchUI() ? this.buttonAreaHeight() : 0;
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, true) * this.hasCategories();
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create achievement list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
	const activate = !this.hasCategories();
	this._listWindow = new CGMZ_Achievement_Window_List(rect, activate);
	this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
	this._categoryWindow.setListWindow(this._listWindow);
	this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.listWindowRect = function() {
	const width = Graphics.boxWidth * (CGMZ.Achievements.ListWindowWidth / 100.0);
	const x = (CGMZ.Achievements.ListWindowRight) ? Graphics.boxWidth - width : 0;
	const y = this._categoryWindow.y + this._categoryWindow.height;
	const lines = 1 + ($cgmz.usingAchievementPoints())*(CGMZ.Achievements.TotalWindowStyle === 'Vertical')*1;
	const height = Graphics.boxHeight - y - this.calcWindowHeight(lines, false) * (CGMZ.Achievements.TotalWindowStyle !== "None");
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create achievement totals window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createTotalsWindow = function() {
	const rect = this.totalsWindowRect();
	this._totalsWindow = new CGMZ_Achievement_Window_Totals(rect);
	this.addWindow(this._totalsWindow);
};
//-----------------------------------------------------------------------------
// Get totals window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.totalsWindowRect = function() {
	const x = (CGMZ.Achievements.TotalWindowStyle === "Horizontal") ? 0 : this._listWindow.x;
	const y = this._listWindow.y + this._listWindow.height;
	const width = (CGMZ.Achievements.TotalWindowStyle === "None") ? 0 : (CGMZ.Achievements.TotalWindowStyle === "Horizontal") ? Graphics.boxWidth : this._listWindow.width;
	const height = (CGMZ.Achievements.TotalWindowStyle === "None") ? 0 : Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create achievement window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createAchievementWindow = function() {
	const rect = this.achievementWindowRect();
	this._achievementWindow = new CGMZ_Achievement_Window_Display(rect);
	this._listWindow.setHelpWindow(this._achievementWindow);
	this._achievementWindow.deactivate();
	this.addWindow(this._achievementWindow);
};
//-----------------------------------------------------------------------------
// Get achievement window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.achievementWindowRect = function() {
	const x = (CGMZ.Achievements.ListWindowRight) ? 0 : this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - this._listWindow.width;
	const height = (CGMZ.Achievements.TotalWindowStyle === "Horizontal") ? this._listWindow.height : Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.onCategoryOk = function() {
	this._listWindow.select(0);
	this._listWindow.activate();
	this._categoryWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On list Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.onListCancel = function() {
	if(this.hasCategories()) {
		this._achievementWindow.setItem(null);
		this._achievementWindow.contents.clear();
		this._listWindow.deactivate();
		this._listWindow.deselect();
		this._categoryWindow.activate();
	} else {
		this.popScene();
	}
};
//-----------------------------------------------------------------------------
// Get the scene's custom scene background for [CGMZ] Scene Backgrounds
// No need to check if Scene Backgrounds is installed because this custom func is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.CGMZ_getCustomSceneBackground = function() {
	return $cgmzTemp.sceneBackgroundPresets[CGMZ.Achievements.SceneBackground];
};
//-----------------------------------------------------------------------------
// Get controls window preset for [CGMZ] Controls Window
// No need to check if plugin is installed because this custom func is only called by that plugin
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.CGMZ_getControlsWindowOtherPreset = function() {
	return $cgmzTemp.getControlWindowPresetOther(CGMZ.Achievements.ControlsWindow);
};
//=============================================================================
// CGMZ_Achievement_Window_Category
//-----------------------------------------------------------------------------
// Command window for choosing a category in the achievement scene
//=============================================================================
function CGMZ_Achievement_Window_Category(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_Category.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Achievement_Window_Category.prototype.constructor = CGMZ_Achievement_Window_Category;
//-----------------------------------------------------------------------------
// Create cgmz window options object
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.CGMZ_createWindowOptions = function() {
	Window_HorzCommand.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Achievements.CategoryWindowskin) this.cgmzOpts.windowskin = CGMZ.Achievements.CategoryWindowskin;
	if(CGMZ.Achievements.CategoryPadding >= 0) this.cgmzOpts.padding = CGMZ.Achievements.CategoryPadding;
	if(CGMZ.Achievements.CategoryBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Achievements.CategoryBackOpacity;
	if(CGMZ.Achievements.CategoryTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Achievements.CategoryTone.Red, CGMZ.Achievements.CategoryTone.Green, CGMZ.Achievements.CategoryTone.Blue];
};
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.initialize = function(rect, activate, categories) {
	this._categories = categories;
	Window_HorzCommand.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Achievements.TransparentWindows));
	this.deactivate();
	if(activate) this.activate();
};
//-----------------------------------------------------------------------------
// Max columns to display
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.maxCols = function() {
	return CGMZ.Achievements.CategoryColumns;
};
//-----------------------------------------------------------------------------
// Text alignment of categories
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.itemTextAlign = function() {
	return CGMZ.Achievements.CategoryWindowAlignment;
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.makeCommandList = function() {
	for(const categoryId of this._categories) {
		const name = $cgmzTemp.getAchievementCategory(categoryId);
		const symbol = categoryId;
		this.addCommand(name, symbol, true, {categoryId: categoryId});
	}
};
//-----------------------------------------------------------------------------
// Draw the item with text codes
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	this.resetTextColor();
	let string = this.commandName(index);
	if(CGMZ.Achievements.CategoryEarnedCount) {
		const item = this._list[index];
		const categoryId = item.ext?.categoryId;
		if(categoryId) string += ` (${$cgmz.countEarnedAchievementsInCategory(categoryId)}/${$cgmz.countTotalAchievementsInCategory(categoryId)})`;
	}
	this.CGMZ_drawTextLine(string, rect.x, rect.y, rect.width, this.itemTextAlign());
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.callUpdateHelp = function() {
	if(this.active) this.updateHelperWindows();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Category.prototype.updateHelperWindows = function() {
	if(this._listWindow) this._listWindow.setItem(this.currentData());
};
//=============================================================================
// CGMZ_Achievement_Window_List
//-----------------------------------------------------------------------------
// Selectable window for choosing an achievement in a list.
// Will not show hidden achievements.
//=============================================================================
function CGMZ_Achievement_Window_List() {
	this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_List.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Achievement_Window_List.prototype.constructor = CGMZ_Achievement_Window_List;
//-----------------------------------------------------------------------------
// Create cgmz window options object
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.CGMZ_createWindowOptions = function() {
	Window_Selectable.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Achievements.ListWindowskin) this.cgmzOpts.windowskin = CGMZ.Achievements.ListWindowskin;
	if(CGMZ.Achievements.ListPadding >= 0) this.cgmzOpts.padding = CGMZ.Achievements.ListPadding;
	if(CGMZ.Achievements.ListBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Achievements.ListBackOpacity;
	if(CGMZ.Achievements.ListTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Achievements.ListTone.Red, CGMZ.Achievements.ListTone.Green, CGMZ.Achievements.ListTone.Blue];
};
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.initialize = function(rect, activate) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Achievements.TransparentWindows));
	this._category = null;
	this._usingCategories = !activate;
	this.refresh();
	if(activate) {
		this.activate();
		this.select(0);
	}
	if(CGMZ.Achievements.ReportListRect && $gameTemp.isPlaytest()) {
		const rect = this.itemRect(0);
		CGMZ_Utils.reportDimensions(rect.width, rect.height, "[CGMZ] Achievements List Rect");
	}
};
//-----------------------------------------------------------------------------
// Change item height if showing points too
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.itemHeight = function() {
	if(CGMZ.Achievements.PointsInListWindow) {
		return this.lineHeight() * 2 + 8;
	} else {
		return Window_Selectable.prototype.itemHeight.call(this);
	}
};
//-----------------------------------------------------------------------------
// Max achievements to be shown
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Currently selected achievement
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Determine if achievement is enabled
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.isEnabled = function(achievement) {
	return (achievement && achievement.isEarned());
};
//-----------------------------------------------------------------------------
// Refresh window
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.refresh = function() {
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make list of achievements
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.makeItemList = function() {
	this._data = [];
	for(const achievement of $cgmz.getAchievements()) {
		if((!achievement.isSecret() || achievement.isEarned() || CGMZ.Achievements.ShowSecretAchievements) &&
			(!this._usingCategories || this._category === achievement._category)) {
			this._data.push(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Draw achievement names
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.drawItem = function(index) {
	const achievement = this._data[index];
	const rect = this.itemRectWithPadding(index);
	const name = (achievement.isSecret() && !achievement.isEarned()) ? CGMZ.Achievements.SecretText : achievement.getName();
	this.changePaintOpacity(this.isEnabled(achievement));
	this.CGMZ_drawTextLine(name, rect.x, rect.y, rect.width, CGMZ.Achievements.ListWindowAlignment);
	if(CGMZ.Achievements.PointsInListWindow) {
		const pointString = `${CGMZ.Achievements.ListPointText}${achievement._points}`;
		this.CGMZ_drawTextLine(pointString, rect.x, rect.y + this.lineHeight(), rect.width, CGMZ.Achievements.ListWindowAlignment);
	}
};
//-----------------------------------------------------------------------------
// Check if need to draw a background image instead
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.drawItemBackground = function(index) {
	const ach = this._data[index];
	const achievementTemp = $cgmzTemp.getTempAchievementData(ach.getName());
	if(achievementTemp?.listImg?.img) {
		const listImg = achievementTemp.listImg;
		const opts = {x: achievementTemp.listImg.imgX, y: achievementTemp.listImg.imgY};
		const rect = this.itemRect(index);
		const imgData = CGMZ_Utils.getImageData(achievementTemp.listImg.img, "img");
		const bitmap = ImageManager.loadBitmap(imgData.folder, imgData.filename);
		bitmap.addLoadListener(this.CGMZ_bltCommandBackground.bind(this, bitmap, rect, opts));
	} else {
		Window_Selectable.prototype.drawItemBackground.call(this, index);
	}
};
//-----------------------------------------------------------------------------
// Draw command background image
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.CGMZ_bltCommandBackground = function(bitmap, rect, opts) {
	const sw = rect.width;
    const sh = rect.height;
    const sx = opts.x;
	const sy = opts.y;
	const dw = rect.width;
	const dh = rect.height;
	const dx = rect.x;
	const dy = rect.y;
    this.contentsBack.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
};
//-----------------------------------------------------------------------------
// Update helper window
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.updateHelp = function() {
	this.setHelpWindowItem(this.item());
};
//-----------------------------------------------------------------------------
// Update helper window
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.setItem = function(category) {
	if(category && this._category !== category.symbol) {
		this._category = category.symbol;
		this.refresh();
	}
};
//=============================================================================
// CGMZ_Achievement_Window_Totals
//-----------------------------------------------------------------------------
// Window displaying total achievements earned and points (if applicable)
//=============================================================================
function CGMZ_Achievement_Window_Totals() {
	this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_Totals.prototype = Object.create(Window_Base.prototype);
CGMZ_Achievement_Window_Totals.prototype.constructor = CGMZ_Achievement_Window_Totals;
//-----------------------------------------------------------------------------
// Create cgmz window options object
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Totals.prototype.CGMZ_createWindowOptions = function() {
	Window_Base.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Achievements.TotalWindowskin) this.cgmzOpts.windowskin = CGMZ.Achievements.TotalWindowskin;
	if(CGMZ.Achievements.TotalPadding >= 0) this.cgmzOpts.padding = CGMZ.Achievements.TotalPadding;
	if(CGMZ.Achievements.TotalBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Achievements.TotalBackOpacity;
	if(CGMZ.Achievements.TotalTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Achievements.TotalTone.Red, CGMZ.Achievements.TotalTone.Green, CGMZ.Achievements.TotalTone.Blue];
};
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Totals.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Achievements.TransparentWindows));
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Totals.prototype.refresh = function() {
	this.contents.clear();
	this.drawEarnedCount();
	if($cgmz.usingAchievementPoints()) this.drawAchievementPoints();
};
//-----------------------------------------------------------------------------
// Draw the earned count of achievements
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Totals.prototype.drawEarnedCount = function() {
	const width = (CGMZ.Achievements.TotalWindowStyle === "Vertical") ? this.contents.width : this.contents.width / 2;
	const earned = $cgmz.countEarnedAchievements();
	let txt = CGMZ.Achievements.EarnedCountText + earned;
	if(CGMZ.Achievements.ShowTotalAchievements) txt += CGMZ.Achievements.TotalsSeparator + $cgmz.countTotalAchievements();
	this.CGMZ_drawTextLine(txt, 0, 0, width, CGMZ.Achievements.TotalWindowAlignment);
};
//-----------------------------------------------------------------------------
// Draw the point count of achievements
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Totals.prototype.drawAchievementPoints = function() {
	const y = (CGMZ.Achievements.TotalWindowStyle === "Vertical") ? this.lineHeight() : 0;
	const x = (CGMZ.Achievements.TotalWindowStyle === "Vertical") ? 0 : this.contents.width / 2;
	const width = (CGMZ.Achievements.TotalWindowStyle === "Vertical") ? this.contents.width : this.contents.width / 2;
	const points = $cgmz.countEarnedAchievementPoints();
	let txt = CGMZ.Achievements.PointsWindowText + points;
	if(CGMZ.Achievements.ShowTotalPoints) txt += CGMZ.Achievements.TotalsSeparator + $cgmz.countTotalAchievementPoints();
	this.CGMZ_drawTextLine(txt, x, y, width, CGMZ.Achievements.TotalWindowAlignment);
};
//=============================================================================
// CGMZ_Achievement_Window_Display
//-----------------------------------------------------------------------------
// Window displaying total achievements earned and points (if applicable)
//=============================================================================
function CGMZ_Achievement_Window_Display() {
	this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_Display.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Achievement_Window_Display.prototype.constructor = CGMZ_Achievement_Window_Display;
//-----------------------------------------------------------------------------
// Create cgmz window options object
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.CGMZ_createWindowOptions = function() {
	CGMZ_Window_Scrollable.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Achievements.DisplayWindowskin) this.cgmzOpts.windowskin = CGMZ.Achievements.DisplayWindowskin;
	if(CGMZ.Achievements.DisplayPadding >= 0) this.cgmzOpts.padding = CGMZ.Achievements.DisplayPadding;
	if(CGMZ.Achievements.DisplayBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Achievements.DisplayBackOpacity;
	if(CGMZ.Achievements.DisplayTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Achievements.DisplayTone.Red, CGMZ.Achievements.DisplayTone.Green, CGMZ.Achievements.DisplayTone.Blue];
};
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.initialize = function(rect) {
	const heightMultiplier = 5; // maximum of 5 windows tall of data to scroll
	CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Achievements.ScrollWait, CGMZ.Achievements.ScrollSpeed, CGMZ.Achievements.AutoScroll, CGMZ.Achievements.ScrollDeceleration);
	this._achievement = null;
	this.setBackgroundType(2 * (CGMZ.Achievements.TransparentWindows));
};
//-----------------------------------------------------------------------------
// Set the achievement to be displayed
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.setItem = function(achievement) {
	if(this._achievement === achievement) return;
	this._achievement = achievement;
	this.requestRefresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.refresh = function() {
	if(!this._achievement) return;
	this.setupWindowForNewEntry();
	const achievement = this._achievement;
	const achTemp = $cgmzTemp.getTempAchievementData(achievement.getName());
	const achieveName = (achievement.isSecret() && !achievement.isEarned()) ? CGMZ.Achievements.SecretText : achievement.getName();
	if(achievement.isSecret() && !achievement.isEarned() && CGMZ.Achievements.SecretHidesEverything) {
		this._neededHeight += this.CGMZ_drawText(CGMZ.Achievements.SecretHiddenText, 0, 0, this._neededHeight, this.contents.width, 'left');
		return;
	}
	for(const display of CGMZ.Achievements.AchievementDisplayInfo) {
		switch(display) {
			case "Name": this._neededHeight += this.CGMZ_drawTextLine(achieveName, 0, this._neededHeight, this.contents.width, 'center'); break;
			case "Earn Date":
				if(achievement.isEarned()) {
					this.drawStandardLine(CGMZ.Achievements.EarnedText, achievement._earndate, 0);
				} else if(achievement._failed) {
					this._neededHeight += this.CGMZ_drawTextLine(CGMZ.Achievements.FailedText, 0, this._neededHeight, this.contents.width, 'left');
				} else {
					this._neededHeight += this.CGMZ_drawTextLine(CGMZ.Achievements.UnearnedText, 0, this._neededHeight, this.contents.width, 'left');
				}
				break;
			case "Basic Info Header": this._neededHeight += this.CGMZ_drawHeader(CGMZ.Achievements.BasicInfoHeaderText, this._neededHeight, CGMZ.Achievements.HeaderColor1, CGMZ.Achievements.HeaderColor2); break;
			case "Difficulty":
				if(achTemp?.difficulty) {
					this.drawStandardLine(CGMZ.Achievements.DifficultyText, achTemp.difficulty, 0);
				}
				break;
			case "Points":
				if(achievement._points) {
					this.drawStandardLine(CGMZ.Achievements.PointsText, achievement._points, 0);
				}
				break;
			case "Description":
				if(achievement._predesc && !achievement.isEarned()) {
					this.drawAchievementDescription(achievement._predesc);
				} else if(achievement._postdesc && achievement.isEarned()) {
					this.drawAchievementDescription(achievement._postdesc);
				}
				break;
			case "Description Header":
				if((achievement._predesc && !achievement.isEarned()) || (achievement._postdesc && achievement.isEarned())) {
					this._neededHeight += this.CGMZ_drawHeader(CGMZ.Achievements.DescriptionHeaderText, this._neededHeight, CGMZ.Achievements.HeaderColor1, CGMZ.Achievements.HeaderColor2);
				}
				break;
			case "Requirements":
				if(this.canShowCriteria(achievement)) {
					this.drawAchievementCriteria(achTemp.requirements, achievement);
				}
				break;
			case "Requirement Header":
				if(this.canShowCriteria(achievement)) {
					this._neededHeight += this.CGMZ_drawHeader(CGMZ.Achievements.RequirementHeaderText, this._neededHeight, CGMZ.Achievements.HeaderColor1, CGMZ.Achievements.HeaderColor2);
				}
				break;
			case "Rewards":
				if(this.canShowRewards(achievement)) {
					this.drawAchievementRewards(achTemp.rewards);
				}
				break;
			case "Reward Header":
				if(this.canShowRewards(achievement)) {
					this._neededHeight += this.CGMZ_drawHeader(CGMZ.Achievements.RewardHeaderText, this._neededHeight, CGMZ.Achievements.HeaderColor1, CGMZ.Achievements.HeaderColor2);
				}
				break;
			case "Blank Line": this._neededHeight += this.lineHeight(); break;
		}
	}
};
//-----------------------------------------------------------------------------
// Draw a standard line of 1 label + 1 piece of text
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawStandardLine = function(label, text, x) {
	const string = `\\c[${CGMZ.Achievements.LabelColor}]${label}\\c[0]${text}`;
	this._neededHeight += this.CGMZ_drawTextLine(string, x, this._neededHeight, this.contents.width - x, "left");
};
//-----------------------------------------------------------------------------
// Draw label / header text
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawLabel = function(label, x, alignment = "left") {
	const string = `\\c[${CGMZ.Achievements.LabelColor}]${label}\\c[0]`;
	this.CGMZ_drawTextLine(string, x, this._neededHeight, this.contents.width - x, alignment);
};
//-----------------------------------------------------------------------------
// Draw achievement rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawAchievementRewards = function(rewards) {
	if(CGMZ.Achievements.RewardText) {
		this.drawLabel(CGMZ.Achievements.RewardText, 0, 'center');
		this._neededHeight += this.lineHeight();
	}
	for(const type of CGMZ.Achievements.RewardDisplayOrder) {
		switch(type) {
			case 'Currency':
				if(rewards.currency) {
					const space = CGMZ.Achievements.CurrencyUnitSpace ? " " : "";
					this._neededHeight += this.CGMZ_drawTextLine(rewards.currency + space + TextManager.currencyUnit, 0, this._neededHeight, this.contents.width, 'left');
				}
				if(rewards.customCurrency) {
					this.drawRewardsCustomCurrency(rewards.customCurrency);
				}
				break;
			case 'Items': this.drawRewardsItems(rewards.items); break;
			case 'Switches': this.drawRewardsSwitchesAndVariables(rewards.switches); break;
			case 'Variables': this.drawRewardsSwitchesAndVariables(rewards.variables); break;
			case 'Custom': this.drawRewardsCustom(rewards.custom); break;
			case 'Blank Line': this._neededHeight += this.lineHeight(); break;
		}
	}
};
//-----------------------------------------------------------------------------
// Draw achievement criteria
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawAchievementCriteria = function(req, achievement) {
	const currencyColor1 = ColorManager.textColor(CGMZ.Achievements.CurrencyGaugeColor1);
	const currencyColor2 = ColorManager.textColor(CGMZ.Achievements.CurrencyGaugeColor2);
	const itemGaugeColor1 = ColorManager.textColor(CGMZ.Achievements.ItemGaugeColor1);
	const itemGaugeColor2 = ColorManager.textColor(CGMZ.Achievements.ItemGaugeColor2);
	const switchVarGaugeColor1 = ColorManager.textColor(CGMZ.Achievements.SwitchVarGaugeColor1);
	const switchVarGaugeColor2 = ColorManager.textColor(CGMZ.Achievements.SwitchVarGaugeColor2);
	const genericGaugeColor1 = ColorManager.textColor(CGMZ.Achievements.GenericGaugeColor1);
	const genericGaugeColor2 = ColorManager.textColor(CGMZ.Achievements.GenericGaugeColor2);
	if(CGMZ.Achievements.RequirementText) {
		this.drawLabel(CGMZ.Achievements.RequirementText, 0, 'center');
		this._neededHeight += this.lineHeight();
	}
	for(const type of CGMZ.Achievements.CriteriaDisplayOrder) {
		switch(type) {
			case 'Currency':
				this.drawCriteriaProgress($gameParty.gold(), req.currency, currencyColor1, currencyColor2, TextManager.currencyUnit, achievement);
				this.drawCriteriaCustomCurrency(achievement.isEarned(), req.customCurrency);
				break;
			case 'Steps': this.drawCriteriaProgress($gameParty.steps(), req.steps, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.StepsText, achievement); break;
			case 'Saves': this.drawCriteriaProgress($gameSystem.saveCount(), req.saves, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.SavesText, achievement); break;
			case 'Wins': this.drawCriteriaProgress($gameSystem.winCount(), req.wins, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.WinsText, achievement); break;
			case 'Escapes': this.drawCriteriaProgress($gameSystem.escapeCount(), req.escapes, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EscapesText, achievement); break;
			case 'Achievements': this.drawCriteriaProgress($cgmz.countEarnedAchievements(), req.achievetotal, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.AchievementProgressText, achievement); break;
			case 'Achievement Points': this.drawCriteriaProgress($cgmz.countEarnedAchievementPoints(), req.achievepts, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.PointsProgressText, achievement); break;
			case 'Playtime':
				if(req.playtime) {
					let max = $gameSystem.playtime();
					if(achievement.isEarned() || max > req.playtime) {
						max = req.playtime;
					}
					const timeArray1 = $cgmzTemp.approximateTimeValue(req.playtime);
					const timeArray2 = $cgmzTemp.approximateTimeValue(max);
					let descriptor = timeArray2[0] + " " + timeArray2[1] + " / " + timeArray1[0] + " " + timeArray1[1] + " " + CGMZ.Achievements.PlayedText;
					this.drawGauge(0, this._neededHeight, this.contents.width, genericGaugeColor1, genericGaugeColor2, max, req.playtime, descriptor);
					this._neededHeight += this.lineHeight();
				}
				break;
			case 'Items': this.drawCriteriaItems(achievement.isEarned(), req.items, itemGaugeColor1, itemGaugeColor2); break;
			case 'Switches': this.drawCriteriaSwitches(achievement.isEarned(), req.switches, switchVarGaugeColor1, switchVarGaugeColor2); break;
			case 'Variables': this.drawCriteriaVariables(achievement.isEarned(), req.variables, switchVarGaugeColor1, switchVarGaugeColor2); break;
			case 'Encyclopedia Total':
				if(Imported.CGMZ_Encyclopedia) this.drawCriteriaProgress($cgmz.getEncyclopediaTotalPercent(), req.encyclopediatotal, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncTotalText, achievement);
				break;
			case 'Encyclopedia Bestiary':
				if(Imported.CGMZ_Encyclopedia) this.drawCriteriaProgress($cgmz.getEncyclopediaBestiaryPercent(), req.encyclopediabestiary, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncBestiaryText, achievement);
				break;
			case 'Encyclopedia Items':
				if(Imported.CGMZ_Encyclopedia) this.drawCriteriaProgress($cgmz.getEncyclopediaItemsPercent(), req.encyclopediaitems, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncItemsText, achievement);
				break;
			case 'Encyclopedia Weapons':
				if(Imported.CGMZ_Encyclopedia) this.drawCriteriaProgress($cgmz.getEncyclopediaWeaponsPercent(), req.encyclopediaweapons, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncWeaponsText, achievement);
				break;
			case 'Encyclopedia Armors':
				if(Imported.CGMZ_Encyclopedia) this.drawCriteriaProgress($cgmz.getEncyclopediaArmorsPercent(), req.encyclopediaarmors, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncArmorsText, achievement);
				break;
			case 'Encyclopedia Skills':
				if(Imported.CGMZ_Encyclopedia) this.drawCriteriaProgress($cgmz.getEncyclopediaSkillsPercent(), req.encyclopediaskills, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncSkillsText, achievement);
				break;
			case 'Encyclopedia States':
				if(Imported.CGMZ_Encyclopedia) this.drawCriteriaProgress($cgmz.getEncyclopediaStatesPercent(), req.encyclopediastates, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncStatesText, achievement);
				break;
			case 'Encyclopedia Actors':
				if(Imported.CGMZ_Encyclopedia) this.drawCriteriaProgress($cgmz.getEncyclopediaActorsPercent(), req.encyclopediaactors, genericGaugeColor1, genericGaugeColor2, CGMZ.Achievements.EncActorsText, achievement);
				break;
			case 'Professions':
				for(let i = 0; i < req.professions.length; i++) {
					const name = req.professions[i].name;
					const profession = $cgmz.getProfession(name);
					this.drawCriteriaProgress(profession._level, req.professions[i].level, genericGaugeColor1, genericGaugeColor2, " " + name + " " + CGMZ.Achievements.ProfLevelText, achievement);
				}
				break;
			case 'Blank Line': this._neededHeight += this.lineHeight(); break;
		}
	}
};
//-----------------------------------------------------------------------------
// Draw criteria progress with gauge
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaProgress = function(numerator, denominator, color1, color2, criteriaText, achievement) {
	if(denominator <= 0) return 0;
	let max = numerator;
	if(achievement.isEarned() || numerator > denominator) {
		max = denominator;
	}
	const descriptor = max + " / " + denominator + " " + criteriaText;
	this.drawGauge(0, this._neededHeight, this.contents.width, color1, color2, max, denominator, descriptor);
	this._neededHeight += this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw criteria items progress
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaItems = function(earned, itemArray, color1, color2) {
	for(const criteriaObj of itemArray) {
		const item = CGMZ_Utils.lookupItem(criteriaObj.type, criteriaObj.id);
		const denominator = criteriaObj.amt;
		let max = $gameParty.numItems(item);
		if(earned || max > denominator) max = denominator;
		const descriptor = max + " / " + criteriaObj.amt;
		this.drawGauge(0, this._neededHeight, this.contents.width, color1, color2, max, denominator, descriptor, item);
		this._neededHeight += this.lineHeight();
	}
};
//-----------------------------------------------------------------------------
// Draw criteria custom currencies progress
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaCustomCurrency = function(earned, currencyArray) {
	if(!Imported.CGMZ_CurrencySystem) return;
	for(const criteriaObj of currencyArray) {
		const currency = $cgmz.getCurrency(criteriaObj.id);
		const c = $cgmzTemp.getCurrency(criteriaObj.id);
		if(!currency || !c) continue;
		const denominator = criteriaObj.amt;
		let max = currency.amount();
		if(earned || max > denominator) max = denominator;
		const descriptor = `${max} / ${criteriaObj.amt} \\c[${c._color}]\\i[${c._iconIndex}] ${c._name}\\c[0]`;
		const color = ColorManager.textColor(c._color);
		this.drawGauge(0, this._neededHeight, this.contents.width, color, color, max, denominator, descriptor);
		this._neededHeight += this.lineHeight();
	}
};
//-----------------------------------------------------------------------------
// Draw criteria switches progress
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaSwitches = function(earned, switchArray, color1, color2) {
	for(const switchObj of switchArray) {
		const switchval = $gameSwitches.value(switchObj.id);
		const max = (earned) ? 1 : (switchval == switchObj.value) ? 1 : 0;
		const descriptor = switchObj.description + " " + max + " / 1";
		this.drawGauge(0, this._neededHeight, this.contents.width, color1, color2, max, 1, descriptor);
		this._neededHeight += this.lineHeight();
	}
};
//-----------------------------------------------------------------------------
// Draw criteria variables progress
// Due to so many options for variables and not really making sense for gauges,
// it treats it like a switch.
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaVariables = function(earned, variableArray, color1, color2) {
	for(const variableObj of variableArray) {
		let max = 0;
		let denominator = 1;
		let descriptor = "";
		if(variableObj.operator !== ">" && variableObj.operator !== ">=") {
			max = 0
			if(earned || ($gameVariables.value(variableObj.id) <= variableObj.value && variableObj.operator !== "=") ||
			   (variableObj.operator === "=" && $gameVariables.value(variableObj.id) === variableObj.value)) {
				max = 1;
			}
			denominator = 1;
			descriptor = variableObj.description + " " + max + " / 1";
		}
		else {
			denominator = (variableObj.operator === '>') ? variableObj.value + 1 : variableObj.value;
			max = $gameVariables.value(variableObj.id);
			if(earned || max > denominator) {
				max = denominator;
			}
			descriptor = variableObj.description + " " + max + " / " + denominator;
		}
		this.drawGauge(0, this._neededHeight, this.contents.width, color1, color2, max, denominator, descriptor);
		this._neededHeight += this.lineHeight();
	}
};
//-----------------------------------------------------------------------------
// Draw item rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawRewardsItems = function(itemArray) {
	for(const rewardObj of itemArray) {
		const item = CGMZ_Utils.lookupItem(rewardObj.type, rewardObj.id)
		const string = `${rewardObj.amt}x \\i[${item.iconIndex}]${item.name}`;
		this._neededHeight += this.CGMZ_drawTextLine(string, 0, this._neededHeight, this.contents.width, 'left');
	}
};
//-----------------------------------------------------------------------------
// Draw custom currency rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawRewardsCustomCurrency = function(currencyArray) {
	for(const currencyObj of currencyArray) {
		const currency = $cgmzTemp.getCurrency(currencyObj.id);
		if(currency) {	
			const string = `${currencyObj.amt}x \\c[${currency._color}]\\i[${currency._iconIndex}]${currency._name}\\c[0]`;
			this._neededHeight += this.CGMZ_drawTextLine(string, 0, this._neededHeight, this.contents.width, 'left');
		}
	}
};
//-----------------------------------------------------------------------------
// Draw switch and variable rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawRewardsSwitchesAndVariables = function(objArray) {
	for(const obj of objArray) {
		this._neededHeight += this.CGMZ_drawTextLine(obj.description, 0, this._neededHeight, this.contents.width, 'left');
	}
};
//-----------------------------------------------------------------------------
// Draw custom rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawRewardsCustom = function(objArray) {
	for(const obj of objArray) {
		this._neededHeight += this.CGMZ_drawTextLine(obj, 0, this._neededHeight, this.contents.width, 'left');
	}
};
//-----------------------------------------------------------------------------
// Determine if the window should show criteria
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.canShowCriteria = function(achievement) {
	if(achievement.isEarned() && !CGMZ.Achievements.ShowCriteriaAfterCompletion) return false;
	if(achievement.isSecret() && !achievement.isEarned()) return false;
	if(achievement._failed) return false;
	const achTemp = $cgmzTemp.getTempAchievementData(achievement._name);
	if(!achTemp) return false;
	return achTemp.hasRequirements();
};
//-----------------------------------------------------------------------------
// Determine if the window should show rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.canShowRewards = function(achievement) {
	if(achievement.isSecret() && !achievement.isEarned()) return false;
	if(achievement._failed && !CGMZ.Achievements.ShowRewardAfterFail) return false;
	const achTemp = $cgmzTemp.getTempAchievementData(achievement._name);
	if(!achTemp) return false;
	return achTemp.hasRewards();
};
//-----------------------------------------------------------------------------
// Draw achievement description
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawAchievementDescription = function(description) {
	this.drawLabel(CGMZ.Achievements.DescriptionText, 0);
	const xOffset = this.textWidth(CGMZ.Achievements.DescriptionText);
	this._neededHeight += this.CGMZ_drawText(description, 0, xOffset, this._neededHeight, this.contents.width, 'left');
};
//-----------------------------------------------------------------------------
// Draw a gauge
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawGauge = function(x, y, width, color1, color2, numerator, denominator, descriptor, item = null) {
	const gaugeHeight = 12;
	const gaugeRect = new Rectangle(x, y + this.lineHeight() - gaugeHeight, width, gaugeHeight);
	const rate = (denominator !== 0) ? numerator/denominator : 0;
	this.CGMZ_drawGauge(gaugeRect, rate, color1, color2);
	const string = (item) ? `${descriptor} \\i[${item.iconIndex}]${item.name}` : `${descriptor}`;
	this.CGMZ_drawTextLine(string, x + 10, y, width-x-20);
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Automatic tracking for gold, steps, and items
//=============================================================================
//-----------------------------------------------------------------------------
// Check achievements that have currency criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameParty_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
	alias_CGMZ_Achievements_GameParty_gainGold.call(this, amount);
	if(amount > 0) $cgmz.checkAchievementCurrencyCriteria();
};
//-----------------------------------------------------------------------------
// Check achievements that have steps criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameParty_increaseSteps = Game_Party.prototype.increaseSteps;
Game_Party.prototype.increaseSteps = function() {
	alias_CGMZ_Achievements_GameParty_increaseSteps.call(this);
	$cgmz.checkAchievementStepsCriteria();
};
//-----------------------------------------------------------------------------
// Check achievements that have items criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	alias_CGMZ_Achievements_GameParty_gainItem.call(this, item, amount, includeEquip);
	if(amount > 0) $cgmz.checkAchievementItemsCriteria();
};
//=============================================================================
// Game_System
//-----------------------------------------------------------------------------
// Automatic tracking for battles, wins, escapes, saves
//=============================================================================
//-----------------------------------------------------------------------------
// Check achievements that have battles criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBattleStart = Game_System.prototype.onBattleStart;
Game_System.prototype.onBattleStart = function() {
	alias_CGMZ_Achievements_GameSystem_onBattleStart.call(this);
	$cgmz.checkAchievementBattlesCriteria();
};
//-----------------------------------------------------------------------------
// Check achievements that have wins criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBattleWin = Game_System.prototype.onBattleWin;
Game_System.prototype.onBattleWin = function() {
	alias_CGMZ_Achievements_GameSystem_onBattleWin.call(this);
	$cgmz.checkAchievementWinsCriteria();
};
//-----------------------------------------------------------------------------
// Check achievements that have escapes criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBattleEscape = Game_System.prototype.onBattleEscape;
Game_System.prototype.onBattleEscape = function() {
	alias_CGMZ_Achievements_GameSystem_onBattleEscape.call(this);
	$cgmz.checkAchievementEscapesCriteria();
};
//-----------------------------------------------------------------------------
// Check achievements that have saves criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBeforeSave = Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave = function() {
	alias_CGMZ_Achievements_GameSystem_onBeforeSave.call(this);
	$cgmz.checkAchievementSavesCriteria();
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Automatic tracking for playtime (Using Scene Map so playtime achievements do
// not update in battle or mid-scene
//=============================================================================
//-----------------------------------------------------------------------------
// Check achievements that have playtime criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	alias_CGMZ_Achievements_SceneMap_update.call(this);
	if(Graphics.frameCount % 60 == 0) $cgmz.checkAchievementPlaytimeCriteria();
};
//=============================================================================
// Game_Switches
//-----------------------------------------------------------------------------
// Automatic tracking for switches
//=============================================================================
//-----------------------------------------------------------------------------
// Check achievements that have switch criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSwitches_onChange = Game_Switches.prototype.onChange;
Game_Switches.prototype.onChange = function() {
	alias_CGMZ_Achievements_GameSwitches_onChange.call(this);
	$cgmz.checkAchievementSwitchesCriteria();
};
//=============================================================================
// Game_Variables
//-----------------------------------------------------------------------------
// Automatic tracking for variables
//=============================================================================
//-----------------------------------------------------------------------------
// Check achievements that have variable criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameVariables_onChange = Game_Variables.prototype.onChange;
Game_Variables.prototype.onChange = function() {
	alias_CGMZ_Achievements_GameVariables_onChange.call(this);
	$cgmz.checkAchievementVariablesCriteria();
};
if(Imported.CGMZ_CurrencySystem) {
//-----------------------------------------------------------------------------
// Check for achievement on custom currency gain
//-----------------------------------------------------------------------------
const alias_CGMZAchievements_CGMZCurrency_gainCurrency = CGMZ_Currency.prototype.gainCurrency;
CGMZ_Currency.prototype.gainCurrency = function(amount) {
	alias_CGMZAchievements_CGMZCurrency_gainCurrency.call(this, amount);
	$cgmzTemp.checkAchievementCustomCurrencyCriteria();
};
}