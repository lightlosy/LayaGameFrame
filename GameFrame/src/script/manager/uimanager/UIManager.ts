import { MVCS } from "../../core/mvc/mvcs";
import BaseManager from "../base/BaseManager";
import Manager from "../Manager";

class viewElement {
    /** 资源路径 */
    path: string;
    /** 层级 */
    zIndex: number;
    /** 打开效果 */
    openEffect: number;
    /** 实例脚本 */
    instance: MVCS.View;
    /** 实例节点 */
    node: Laya.Sprite;
}

export default class UIManager extends BaseManager {
    private _views: {[key: string]: viewElement} = {};

    private _root: Laya.Sprite = new Laya.Sprite();
    constructor(){
        super();
        let w = Laya.stage.designWidth;
        let h = Laya.stage.designHeight;

        this._root.width = w;
        this._root.height = h;
        this._root.x = 0;
        this._root.y = 0;
        this._root.zOrder = 1;
        let wid: Laya.Widget = this._root.addComponent(Laya.Widget);
        console.log("UIManager----->LayaStage designW: ", w, " designH: ", h);
        wid.centerX = w / 2;
        wid.centerY = h / 2;
        Laya.stage.addChild(this._root);
    }

    open(resPath: string, zIndex?: number, openEffect?: number): Promise<Laya.Sprite>{
        return new Promise((resolve) => {
            let view = this._views[resPath];
            if(!view){
                view = new viewElement();
            }
            let openSuc = (viewNode: Laya.Sprite) => {
                viewNode.zOrder = zIndex || 0;
            }
            if(!view.node){
                this._createView(resPath).then((viewObj: Laya.Sprite) => {
                    openSuc(viewObj);
                    resolve(viewObj);
                });
            }else{
                view.node.visible = true;
                openSuc(view.node);
                resolve(view.node);
            }
        });
    }

    getView<T>(resPath: string): Promise<T>{
        return new Promise((resolve) => {
            let view: any = this._views[resPath];
            if(!view){
                this._createView(resPath).then((view: any) => {
                    resolve(view.instance);
                });
            }else{
                resolve(view.instance);
            }
        });
    }

    /**
     * 关闭ui
     * @param resPath 路径
     * @param isDelete 是否销毁
     */
    close(resPath: string, isDelete: boolean = false){
        let view = this._views[resPath];
        console.log(view, resPath);
        if(view && view.node){
            if(isDelete){
                view.node.destroy();
                this._views[resPath] = null;
            }else{
                view.node.visible = false;
            }
        }
    }

    private _createView(resPath: string): Promise<Laya.Sprite> {
        return new Promise((resolve) => {
            let view = this._views[resPath];
            if(!view){
                view = new viewElement();
                Manager.Res.getPrefab(resPath).then((viewObj: Laya.Sprite) => {
                    let names = resPath.split("/");
                    this._root.addChild(viewObj);
                    view.instance = viewObj.getComponent(names[names.length - 1]);
                    view.node = viewObj;
                    this._views[resPath] = view;
                    resolve(viewObj);
                });
            }else{
                resolve(view.node);
            }
        });
    }

    onDestroy(){
        this._views = {};
    }
}
