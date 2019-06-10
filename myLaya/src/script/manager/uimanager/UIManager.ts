import { MVCS } from "../../core/mvc/mvcs";
import BaseManager from "../base/BaseManager";
import Manager from "../Manager";

let w = 960;
let h = 640;

class viewElement {
    /** 资源路径 */
    path: string;
    /** 层级 */
    zIndex: number;
    /** 打开效果 */
    openEffect: number;
    /** 实例 */
    instance: MVCS.View
}

export default class UIManager extends BaseManager {
    private _views: {[key: string]: viewElement} = {};
    private _root: Laya.Sprite = new Laya.Sprite();

    constructor(){
        super();
        Laya.stage.addChild(this._root);
        this._root.width = w;
        this._root.height = h;
        this._root.x = 0;
        this._root.y = 0;
    }

    // open(resPath: string, zIndex: number, openEffect: number): Promise<MVCS.View>{
    //     return new Promise((resolve) => {
    //         let view = this._views[resPath];
    //         if(!view){
    //             view = new viewElement();
    //         }
    //         let openSuc = (viewNode: Laya.Sprite) => {
    //             viewNode.zOrder = zIndex;
    //             this._root.addChild(viewNode);
    //         }
    //         if(!view.instance){
    //             this._createView(resPath).then((viewObj: MVCS.View) => {
    //                 openSuc(viewObj.owner.getComponent(Laya.Sprite));
    //                 resolve(viewObj);
    //             });
    //         }else{
    //             view.instance.owner.active = true;
    //             openSuc(view.instance.owner.getComponent(Laya.Sprite));
    //             resolve(view.instance);
    //         }
    //     });
    // }

    // getView<T>(resPath: string): Promise<T>{
    //     return new Promise((resolve) => {
    //         let view: any = this._views[resPath];
    //         if(!view){
    //             this._createView(resPath).then((view: any) => {
    //                 resolve(view.instance);
    //             });
    //         }else{
    //             resolve(view.instance);
    //         }
    //     });
    // }

    close(resPath: string, isDelete: boolean = false){
        let view = this._views[resPath];
        if(view && view.instance){
            if(isDelete){
                view.instance.owner.destroy();
                this._views[resPath] = null;
            }else{
                view.instance.owner.active = false;
            }
        }
    }

    // private _createView(resPath: string): Promise<MVCS.View> {
    //     return new Promise((resolve) => {
    //         let view = this._views[resPath];
    //         if(!view){
    //             view = new viewElement();
    //             Manager.Res.getPrefab(resPath).then((viewObj: Laya.Sprite) => {
    //                 let names = resPath.split("/");
    //                 this._root.addChild(viewObj);
    //                 view.instance = viewObj.getComponent(names[names.length - 1]);
    //                 this._views[resPath] = view;
    //                 resolve(view.instance);
    //             });
    //         }else{
    //             resolve(view.instance);
    //         }
    //     });
    // }

    onDestroy(){
        this._views = {};
    }
}
