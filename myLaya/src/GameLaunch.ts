import Manager from "./script/manager/Manager";

export default class GameLaunch extends Laya.Script {
    private _showLog: boolean = true;
    private _managerList = [];
    constructor() { super(); }
    
    onEnable(): void {
    }

    onAwake(){
        this._managerList.push(new Manager());
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