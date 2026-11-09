/*:
 * @target MZ
 * @plugindesc Menú de título personalizado con opción de elegir entre imagen o video de fondo y botones interactivos. Versión 5.0.
 * @author RenBlake (LupineHorizonGames)
 *
 * @param UseVideo
 * @text Usar video en lugar de imagen
 * @desc Si está activado, se usará un video como fondo en lugar de una imagen.
 * @type boolean
 * @default false
 *
 * @param VideoFile
 * @text Archivo de video
 * @desc Nombre del archivo de video en "movies/" (ejemplo: "TitleBackground.webm").
 * @type string
 * @default TitleBackground.webm
 *
 * @param ImageFile
 * @text Archivo de imagen
 * @desc Nombre del archivo de imagen en "img/titles1/" (ejemplo: "TitleBackground.png").
 * @type string
 * @default TitleBackground.png
 *
 * @help
 * - Coloca la imagen en "img/titles1/" y el video en "movies/".
 * - Configura los parámetros en el gestor de plugins.
 * Coloca las siguientes imágenes en la carpeta img/system:
 *   - titulo.png (imagen de fondo)
 *   - nuevojuego.png y nuevojuego_hover.png (botón "Nuevo Juego")
 *   - cargar.png y cargar_hover.png (botón "Cargar")
 *   - opciones.png y opciones_hover.png (botón "Opciones")
 *
 * Este plugin omite la pantalla de título por defecto y muestra una nueva escena de título
 * que utiliza imágenes para el fondo y para los botones. Al pasar el cursor sobre un botón,
 * se cambiará a la imagen de "hover". Al hacer clic se ejecutan las acciones correspondientes:
 *
 *   - Nuevo Juego: inicia un nuevo juego y va a Scene_Map.
 *   - Cargar: abre la pantalla de carga.
 *   - Opciones: abre la pantalla de opciones.
 *
 * Para usarlo, simplemente activa este plugin.
 */

(() => {
    const parameters = PluginManager.parameters('CustomTitleMenu');
    const useVideo = parameters['UseVideo'] === 'true' || parameters['UseVideo'] === "1";
    const videoFile = String(parameters['VideoFile'] || 'TitleBackground').trim();
    const imageFile = String(parameters['ImageFile'] || 'TitleBackground').trim();
    
  
    //--------------------------------------------------------------------------
    // Sprite_ButtonEx - Botón personalizado con hover
    //--------------------------------------------------------------------------
    class Sprite_ButtonEx extends Sprite {
        constructor(normalImage, hoverImage) {
            super();
            this._normalBitmap = ImageManager.loadSystem(normalImage);
            this._hoverBitmap = ImageManager.loadSystem(hoverImage);
            this.bitmap = this._normalBitmap;
            this.anchor.set(0.5);
            this._hovered = false;
            this._clickHandler = null;
        }
  
        setClickHandler(handler) {
            this._clickHandler = handler;
        }
  
        update() {
            super.update();
            const hovered = this.isHovered();
            if (hovered !== this._hovered) {
                this._hovered = hovered;
                this.bitmap = this._hovered ? this._hoverBitmap : this._normalBitmap;
            }
            if (hovered && TouchInput.isTriggered()) {
                this._clickHandler?.();
            }
        }
  
        isHovered() {
            const x = TouchInput.x;
            const y = TouchInput.y;
            return x > this.x - this.width / 2 && x < this.x + this.width / 2 &&
                   y > this.y - this.height / 2 && y < this.y + this.height / 2;
        }
    }
  
    //--------------------------------------------------------------------------
    // Scene_TitleCustom - Escena de título personalizada
    //--------------------------------------------------------------------------
    class Scene_TitleCustom extends Scene_Base {
        create() {
            super.create();
            this.createBackground();
            this.createButtons();
            this.playTitleBgm();
        }
  
        createBackground() {
            if (useVideo) {
                this.createVideoBackground();
            } else {
                this.createImageBackground();
            }
        }
  
        createImageBackground() {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadTitle1(imageFile);
            this.addChild(this._backgroundSprite);
        }
  
        createVideoBackground() {
            this._video = document.createElement("video");
            this._video.src = "movies/" + videoFile;
            this._video.autoplay = true;
            this._video.loop = true;
            this._video.muted = false;
            this._video.style.position = "absolute";
            this._video.style.left = "50%";
            this._video.style.top = "50%";
            this._video.style.transform = "translate(-50%, -50%)";
            this._video.style.width = Graphics.width + "px";
            this._video.style.height = Graphics.height + "px";
            this._video.style.objectFit = "cover"; // Evita sobreescalado
            document.body.appendChild(this._video);
      
            this._video.onerror = function () {
                console.error("Error al cargar el video:", videoFile);
            };
      
            console.log("Video cargado:", this._video.src);
        }
  
        createButtons() {
            const centerX = Graphics.width / 2;
  
            this._newGameButton = new Sprite_ButtonEx("nuevojuego", "nuevojuego_hover");
            this._newGameButton.x = centerX;
            this._newGameButton.y = Graphics.height - 220;
            this._newGameButton.setClickHandler(this.commandNewGame.bind(this));
            this.addChild(this._newGameButton);
  
            this._continueButton = new Sprite_ButtonEx("cargar", "cargar_hover");
            this._continueButton.x = centerX;
            this._continueButton.y = Graphics.height - 150;
            this._continueButton.setClickHandler(this.commandContinue.bind(this));
            this.addChild(this._continueButton);
  
            this._optionsButton = new Sprite_ButtonEx("opciones", "opciones_hover");
            this._optionsButton.x = centerX;
            this._optionsButton.y = Graphics.height - 80;
            this._optionsButton.setClickHandler(this.commandOptions.bind(this));
            this.addChild(this._optionsButton);
        }
  
        playTitleBgm() {
            AudioManager.playBgm({ name: "TitleBGM", volume: 90, pitch: 100, pan: 0 });
        }
  
        commandNewGame() {
            AudioManager.playSe({ name: "Decision1", volume: 90, pitch: 100, pan: 0 });
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Map);
        }
  
        commandContinue() {
            AudioManager.playSe({ name: "Decision1", volume: 90, pitch: 100, pan: 0 });
            SceneManager.goto(Scene_Load);
        }
  
        commandOptions() {
            AudioManager.playSe({ name: "Decision1", volume: 90, pitch: 100, pan: 0 });
            SceneManager.push(Scene_Options);
        }
  
        terminate() {
            super.terminate();
            if (this._video) {
                document.body.removeChild(this._video);
            }
        }
    }
  
    // Reemplazar la pantalla de título original con la nueva personalizada
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        if (!DataManager.isBattleTest() && !DataManager.isEventTest()) {
            SceneManager.goto(Scene_TitleCustom);
        }
    };
  
    // Permitir volver al título desde el menú de carga
    Scene_Load.prototype.onCancel = function() {
        SceneManager.goto(Scene_TitleCustom);
    };
  
    // Registrar la escena globalmente
    window.Scene_TitleCustom = Scene_TitleCustom;
  })();
  