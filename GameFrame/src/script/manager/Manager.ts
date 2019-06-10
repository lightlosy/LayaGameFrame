import ModuleManager from "./modulemanager/ModuleManager";
import SoundManager from "./soundmanager/SoundManager";
import UIManager from "./uimanager/UIManager";
import ResManager from "./resmanager/ResManager";
import AssetsManager from "./resmanager/AssetsManager";

export default class Manager {
    constructor(){
        // Manager.Module;
        // Manager.UI;
        // Manager.Assets;
        // Manager.Sound;
        // Manager.Res;
    }
    /** 资源加载管理 */
    private static _assetsManager: AssetsManager = null;
    public static get Assets(){
        if(!this._assetsManager){
            this._assetsManager = new AssetsManager();
        }
        return this._assetsManager;
    }

    /** 玩法模块加载管理 */
    private static _moduleManager: ModuleManager = null;
    public static get Module(){
        if(!this._moduleManager){
            this._moduleManager = new ModuleManager();
        }
        return this._moduleManager;
    }

    /** 音频加载管理 */
    private static _soundManager: SoundManager = null;
    public static get Sound(){
        if(!this._soundManager){
            this._soundManager = new SoundManager();
        }
        return this._soundManager;
    }

    /** UI管理 */
    private static _uiManager: UIManager = null;
    public static get UI(){
        if(!this._uiManager){
            this._uiManager = new UIManager();
        }
        return this._uiManager;
    }

    /** 资源获取管理 */
    private static _resManager: ResManager = null;
    public static get Res(){
        if(!this._resManager){
            this._resManager = new ResManager();
        }
        return this._resManager; 
    }
}
