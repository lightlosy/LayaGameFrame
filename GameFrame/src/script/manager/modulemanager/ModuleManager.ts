import BaseManager from "../base/BaseManager";

export default class ModuleManager extends BaseManager{
    moduleTable = [];
    constructor(){
        super();
        this.moduleTable = this.initModule();
    }

    initModule(){
        return [
            // SceneCtrl.getInstance(),
            // MainUICtrl.getInstance(),
        ];
    }

    onDestroy(){
        for(let i in this.moduleTable){
            let m = this.moduleTable[i];
            m.offTarget && m.offTarget(m);
        }
        this.moduleTable = [];
    }
}
