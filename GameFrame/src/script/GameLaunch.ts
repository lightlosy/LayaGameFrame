import Manager from "./manager/Manager";
import { ResPath } from "./respath/ResPath";

export default class GameLaunch extends Laya.Script {
    private _showLog: boolean = true;
    private _managerList = [];
    constructor() { super(); }
    
    onAwake(){
        this._managerList.push(new Manager());
        console.log('[GameLaunch.ts]---->初始化');
        // this.initScene3D();
        this.test();
    }

    test(){
        Manager.UI.open(ResPath.uiPath.UI_MainUI, 1, 1);

        Manager.Res.getMonsterConfig('monster1.json').then((res) => {
            console.log('----json', res[1].name);
        }).catch(()=>{
            console.log("fail")
        });
    }

    initScene3D(){
        //添加3D场景
        let scene = new Laya.Scene3D();
        Laya.stage.addChild(scene);
        // var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 10, 3));
        camera.transform.rotate(new Laya.Vector3(-60, 0, 0), true, false);

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
            // box.transform.translate(new Laya.Vector3(0, 0, -0.5 * 0.016), false);
        });
        let isDown = false;
        let x = 0;
        let y = 0;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, () => {
            isDown = true;
            x = Laya.MouseManager.instance.mouseX;
            y = Laya.MouseManager.instance.mouseY;
            Manager.Sound.play(ResPath.audioPath.btnClick);
        });
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, () => {
            if(!isDown) return;
            let dtx = Laya.MouseManager.instance.mouseX - x;
            let dty = Laya.MouseManager.instance.mouseY - y;
            dtx = dtx > 100 ? 100 : dtx;
            dtx = dtx < -100 ? -100 : dtx;
            dty = dty > 100 ? 100 : dty;
            dty = dty < -100 ? -100 : dty;
            let v3 = new Laya.Vector3(dtx * 0.016 * 0.1, 0, dty * 0.016 * 0.1);
            // Laya.Vector3.Clamp(v3, new Laya.Vector3(-100, -100, -100), new Laya.Vector3(100, 100, 100), v3);
            box.transform.translate(v3, false);
        });
        Laya.stage.on(Laya.Event.MOUSE_UP, this, () => {
            isDown = false;
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