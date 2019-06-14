import Manager from "../../manager/Manager";

export default class MenuView extends Laya.Script {
    /** @prop {name:img, tips:"整数类型示例", type:Laya.Sprite, default:null}*/
    public img: Laya.Sprite = null;
    
    constructor() { super(); }
    
    onEnable(): void {
    }

    onAwake(){
        console.log('[MenuView.ts]---->初始化');
        let img = this.owner.getChildByName("img") as Laya.Image;
        img.skin = Manager.Res.getComp("btn_close");
        console.log(img.skin);
    }

    onDisable(): void {
    }
}