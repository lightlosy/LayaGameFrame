import Manager from "./manager/Manager";
import { ResPath } from "./respath/ResPath";

export default class GameLaunch extends Laya.Script {
    private _showLog: boolean = true;
    private _managerList = [];
    constructor() { super(); }
    
    onAwake(){
        this._managerList.push(new Manager());
        console.log('[GameLaunch.ts]---->初始化');
        this.initScene3D();
        this.test();
    }

    test(){
        // Manager.UI.open(ResPath.uiPath.UI_MainUI, 1, 1);
    }

    initScene3D(){
        //添加3D场景
        let scene = new Laya.Scene3D();
        Laya.stage.addChild(scene);
        // var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
		Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D) {
				material.albedoTexture = tex;
		}));
        box.meshRenderer.material = material;
        Laya.timer.loop(16, this, () => {
            box.transform.rotate(new Laya.Vector3(0, 120 * 0.016, 0), false, false);
        });
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