/*:
 * @target MZ
 * @plugindesc v1.0.0 — CustomMenu.js: A modular menu and UX enhancement plugin for RPG Maker MZ by BitQuest Studio.
 * @author BitQuest Studio
 *
 * @help
 * CustomMenu.js (Version 1.0.0)
 * Developed by BitQuest Studio
 *
 * This plugin provides flexible, toggleable refinements to the RPG Maker MZ user interface and menu systems. It includes:
 * - Clean UI options for main menu and options
 * - Optional gold and back-button visibility
 * - Audio submenu integration
 * - Save/load slot formatting improvements
 * - Parameter-driven layout sizing and toggles
 *
 * ========================
 * Important Usage Notes
 * ========================
 * If "Hide Actor Status in Main Menu" is enabled, you must disable the following
 * menu commands in Database → System 2 → Menu Commands:
 *   - Skill
 *   - Equip
 *   - Status
 *   - Formation
 *
 * ========================
 * Version History:
 * ========================
 *   • 1.0.0 - Initial release
 *
 * ========================
 * Plugin Parameters
 * ========================

 * @param EnableAudioSubmenu
 * @type boolean
 * @default true

 * @param RemoveCommandRemember
 * @type boolean
 * @default true

 * @param HideActorMenu
 * @type boolean
 * @default true

 * @param CenterMenuWindow
 * @type boolean
 * @default true

 * @param MenuWidth
 * @type number
 * @default 240

 * @param MenuHeight
 * @type number
 * @default 288

 * @param CustomizeSaveUI
 * @type boolean
 * @default true

 * @param AudioSubmenuWidth
 * @type number
 * @default 400

 * @param AudioSubmenuHeight
 * @type number
 * @default 200

 * @param OptionsMenuWidth
 * @type number
 * @default 340

 * @param OptionsMenuHeight
 * @type number
 * @default 240

 * @param SaveWindowWidth
 * @type number
 * @default 540

 * @param SaveWindowHeight
 * @type number
 * @default 360

 * @param ShowTopRightBackButton
 * @type boolean
 * @default true

 * @param ShowGoldWindow
 * @type boolean
 * @default true
 */

(() => {
  const p = PluginManager.parameters("CustomMenu");
  const cfg = {
    enableAudio: p["EnableAudioSubmenu"] === "true",
    removeRemember: p["RemoveCommandRemember"] === "true",
    hideActor: p["HideActorMenu"] === "true",
    centerMenu: p["CenterMenuWindow"] === "true",
    menuWidth: Number(p["MenuWidth"] || 240),
    menuHeight: Number(p["MenuHeight"] || 288),
    saveUI: p["CustomizeSaveUI"] === "true",
    audioW: Number(p["AudioSubmenuWidth"] || 400),
    audioH: Number(p["AudioSubmenuHeight"] || 200),
    optionsW: Number(p["OptionsMenuWidth"] || 340),
    optionsH: Number(p["OptionsMenuHeight"] || 240),
    saveW: Number(p["SaveWindowWidth"] || 540),
    saveH: Number(p["SaveWindowHeight"] || 360),
    showBackButton: p["ShowTopRightBackButton"] === "true",
    showGold: p["ShowGoldWindow"] === "true"
  };

  const volumeSymbols = ["bgmVolume", "bgsVolume", "meVolume", "seVolume"];
  let volumeItems = [];

  if (!cfg.showBackButton) {
    Scene_MenuBase.prototype.createButtons = function () {};
  }

  if (!cfg.showGold) {
    Scene_Menu.prototype.createGoldWindow = function () {};
  }

  if (cfg.hideActor) {
    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
      _Scene_Menu_create.call(this);
      this._statusWindow.hide();
    };
  }

  if (cfg.centerMenu) {
    Scene_Menu.prototype.commandWindowRect = function () {
      const x = (Graphics.boxWidth - cfg.menuWidth) / 2;
      const y = (Graphics.boxHeight - cfg.menuHeight) / 2;
      return new Rectangle(x, y, cfg.menuWidth, cfg.menuHeight);
    };
  }

  Scene_Options.prototype.optionsWindowRect = function () {
    const x = (Graphics.boxWidth - cfg.optionsW) / 2;
    const y = (Graphics.boxHeight - cfg.optionsH) / 2;
    return new Rectangle(x, y, cfg.optionsW, cfg.optionsH);
  };
  if (cfg.removeRemember || cfg.enableAudio) {
    const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function () {
      _Window_Options_makeCommandList.call(this);
      volumeItems = this._list.filter(opt => volumeSymbols.includes(opt.symbol));
      this._list = this._list.filter(opt =>
        (!cfg.removeRemember || opt.symbol !== "commandRemember") &&
        (!cfg.enableAudio || !volumeSymbols.includes(opt.symbol))
      );
      if (cfg.enableAudio) {
        this._list.push({
          name: "Audio",
          symbol: "audioSubmenu",
          enabled: true,
          ext: null
        });
      }
    };

    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
      const symbol = this.commandSymbol(this.index());
      if (symbol === "audioSubmenu") {
        SoundManager.playOk();
        SceneManager.push(Scene_AudioOptions);
      } else {
        _Window_Options_processOk.call(this);
      }
    };

    const _Window_Options_drawItem = Window_Options.prototype.drawItem;
    Window_Options.prototype.drawItem = function (index) {
      const symbol = this.commandSymbol(index);
      const rect = this.itemLineRect(index);
      const name = this.commandName(index);
      if (symbol === "audioSubmenu") {
        this.resetTextColor();
        this.changePaintOpacity(true);
        this.drawText(name, rect.x, rect.y, rect.width, "left");
      } else {
        _Window_Options_drawItem.call(this, index);
      }
    };

    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
      return this.commandSymbol(index) === "audioSubmenu"
        ? ""
        : _Window_Options_statusText.call(this, index);
    };

    function Window_AudioOptions() { this.initialize(...arguments); }
    Window_AudioOptions.prototype = Object.create(Window_Options.prototype);
    Window_AudioOptions.prototype.constructor = Window_AudioOptions;
    Window_AudioOptions.prototype.makeCommandList = function () {
      this._list = volumeItems.slice();
    };

    function Scene_AudioOptions() { this.initialize(...arguments); }
    Scene_AudioOptions.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_AudioOptions.prototype.constructor = Scene_AudioOptions;
    Scene_AudioOptions.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.createOptionsWindow();
    };
    Scene_AudioOptions.prototype.optionsWindowRect = function () {
      const x = (Graphics.boxWidth - cfg.audioW) / 2;
      const y = (Graphics.boxHeight - cfg.audioH) / 2;
      return new Rectangle(x, y, cfg.audioW, cfg.audioH);
    };
    Scene_AudioOptions.prototype.createOptionsWindow = function () {
      const rect = this.optionsWindowRect();
      this._optionsWindow = new Window_AudioOptions(rect);
      this._optionsWindow.setHandler("cancel", this.popScene.bind(this));
      this.addWindow(this._optionsWindow);
    };

    window.Scene_AudioOptions = Scene_AudioOptions;
  }

  if (cfg.saveUI) {
    Scene_File.prototype.helpWindowRect = () => new Rectangle(0, 0, 1, 1);
    Scene_File.prototype.createHelpWindow = function () {
      this._helpWindow = new Window_Help(this.helpWindowRect());
      this._helpWindow.hide();
      this.addWindow(this._helpWindow);
    };

    Scene_File.prototype.listWindowRect = function () {
      const w = cfg.saveW;
      const h = cfg.saveH;
      const x = (Graphics.boxWidth - w) / 2;
      const y = (Graphics.boxHeight - h) / 2;
      return new Rectangle(x, y, w, h);
    };

    Window_SavefileList.prototype.itemHeight = function () {
      return this.lineHeight() * 2;
    };

    Window_SavefileList.prototype.drawContents = function (info, rect) {
      const lh = this.lineHeight();
      this.changePaintOpacity(this.isEnabled(info));

      if (info?.playtime) {
        this.drawText(`Play Duration: ${info.playtime}`, rect.x + 120, rect.y, rect.width - 120, lh, "left");
      }

      if (info?.timestamp) {
        const d = new Date(info.timestamp);
        const dt = d.toLocaleDateString();
        const tt = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.drawText(`${dt} ${tt}`, rect.x, rect.y + lh, rect.width, lh, "right");
      }

      this.changePaintOpacity(true);
    };
  }
})();
