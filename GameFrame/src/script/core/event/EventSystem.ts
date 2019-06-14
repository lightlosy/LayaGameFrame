export default class EventSystem extends Laya.Script {
    private _eventDispatcher: Laya.EventDispatcher = new Laya.EventDispatcher();

    on(name: any, callBack: any, target: any){
        this._eventDispatcher.on(name,target, callBack);
    }
    
    emit(name, arg1?: any){
        this._eventDispatcher.event(name, arg1);
    }

    off(name: any, callBack: any, target: any){
        this._eventDispatcher.off(name, callBack, target);
    }

    offTarget(target: any){
        this._eventDispatcher.offAllCaller(target);
    }
}
