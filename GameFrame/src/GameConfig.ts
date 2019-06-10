/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import GameLaunch from "./script/GameLaunch"
import GameUI from "./script/GameUI"
import MenuView from "./script/game/menu/MenuView"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=640;
    static height:number=1136;
    static scaleMode:string="fixedwidth";
    static screenMode:string="none";
    static alignV:string="top";
    static alignH:string="left";
    static startScene:any="GameMain.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=true;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("script/GameLaunch.ts",GameLaunch);
        reg("script/GameUI.ts",GameUI);
        reg("script/game/menu/MenuView.ts",MenuView);
    }
}
GameConfig.init();