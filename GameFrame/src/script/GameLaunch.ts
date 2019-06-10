import Manager from "./manager/Manager";

export default class GameLaunch extends Laya.Script {
    private _showLog: boolean = true;
    private _managerList = [];
    constructor() { super(); }
    
    onAwake(){
        this._managerList.push(new Manager());
        console.log('模块初始化---->');
        // Manager.UI.open(ResPath.uiPath.UI_MainUI, 1, 1);
        // Laya3D.init(640, 1136);
        // let scene = Laya.stage.addChild(new Laya.Scene3D());
    }

    onDisable(): void {
        for(let i = 0; i < this._managerList.length; ++i){
            this._managerList[i].onDestroy();
        }
        this._managerList = [];
    }

    showLog(){
        if(!this._showLog){
            console.log = () => {};
            console.error = () => {};
        }
    }
}