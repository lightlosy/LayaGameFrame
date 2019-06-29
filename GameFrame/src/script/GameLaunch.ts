import Manager from "./manager/Manager";
import { ResPath } from "./respath/ResPath";
import ResManager from "./manager/resmanager/ResManager";

export default class GameLaunch extends Laya.Script {
    private _showLog: boolean = true;
    private _managerList = [];
    private _anim: Laya.Animator;
    private _role: Laya.Sprite3D;
    private _camera: Laya.Camera;
    constructor() { super(); }
    
    onAwake(){
        this._managerList.push(new Manager());
        console.log('[GameLaunch.ts]---->初始化');
        this.initScene3D();
        this.test();

        this.load3DScene();
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
        // //添加3D场景
        // let scene = new Laya.Scene3D();
        // Laya.stage.addChild(scene);
        // // var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        // //添加照相机
        // var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        // camera.transform.translate(new Laya.Vector3(0, 10, 3));
        // camera.transform.rotate(new Laya.Vector3(-60, 0, 0), true, false);

        // //添加方向光
        // var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        // directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        // directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        // //添加自定义模型
        // var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        // box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        // var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
		// Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D) {
		// 		material.albedoTexture = tex;
		// }));
        // box.meshRenderer.material = material;
        // Laya.timer.loop(16, this, () => {
        //     box.transform.rotate(new Laya.Vector3(0, 120 * 0.016, 0), false, false);
        //     // box.transform.translate(new Laya.Vector3(0, 0, -0.5 * 0.016), false);
        // });
        // let isDown = false;
        // let x = 0;
        // let y = 0;
        // Laya.stage.on(Laya.Event.MOUSE_DOWN, this, () => {
        //     isDown = true;
        //     x = Laya.MouseManager.instance.mouseX;
        //     y = Laya.MouseManager.instance.mouseY;
        //     Manager.Sound.play(ResPath.audioPath.btnClick);
        // });
        // Laya.stage.on(Laya.Event.MOUSE_MOVE, this, () => {
        //     if(!isDown) return;
        //     let dtx = Laya.MouseManager.instance.mouseX - x;
        //     let dty = Laya.MouseManager.instance.mouseY - y;
        //     dtx = dtx > 100 ? 100 : dtx;
        //     dtx = dtx < -100 ? -100 : dtx;
        //     dty = dty > 100 ? 100 : dty;
        //     dty = dty < -100 ? -100 : dty;
        //     let v3 = new Laya.Vector3(dtx * 0.016 * 0.1, 0, dty * 0.016 * 0.1);
        //     // Laya.Vector3.Clamp(v3, new Laya.Vector3(-100, -100, -100), new Laya.Vector3(100, 100, 100), v3);
        //     box.transform.translate(v3, false);
        // });
        // Laya.stage.on(Laya.Event.MOUSE_UP, this, () => {
        //     isDown = false;
        // });
    }
    load3DScene(){
        Laya.Scene3D.load(ResPath.scene3DPath.GameScene.path, Laya.Handler.create(this, (scene: Laya.Sprite3D) => {
            Laya.stage.addChild(scene);
            let camera: Laya.Camera = scene.getChildByName('Main Camera') as Laya.Camera;
            let plane = scene.getChildByName('Plane') as Laya.Sprite3D;
            let rolePosT = plane.getChildByName('role') as Laya.Sprite3D;
            console.log("** scene3d load: **", scene, rolePosT);
            this._camera = camera;
            Laya.loader.create(ResPath.scene3DPath.Role.path, Laya.Handler.create(this, (role: Laya.Sprite3D) => {
                // Laya.stage.addChild(role);
                let vr = new Laya.Vector3();
                rolePosT.transform.getForward(vr);
                
                scene.addChild(role);
                role.transform.translate(new Laya.Vector3(rolePosT.transform.localPositionX, rolePosT.transform.localPositionY ,rolePosT.transform.localPositionZ));
                // console.log(vr, role);
                role.transform.localScaleX = 10;
                role.transform.localScaleY = 10;
                role.transform.localScaleZ = 10;
                rolePosT.destroy();
                // role.transform.rotate(new Laya.Vector3(0, 90, 0));
                // role.transform.rotate(new Laya.Vector3(0, 90, 0), false, false);
                this._anim = role.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
                this._role = role;
                
                // anim.addState();
                this._anim.play('run');
                let s = true;
                role.transform.localRotationEulerY = 90;
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, () => {
                    // this._anim.play('atk', 0, 0);
                    // role.transform.rotate(new Laya.Vector3(0, -90, 0), false, false);
                    // role.transform.localRotationEulerY = -90;
                    role.transform.localRotationEulerY = 0;
                })
                Laya.stage.on(Laya.Event.MOUSE_UP, this, () => {
                    // this._anim.play('run', 0, 0);
                    // role.transform.rotate(new Laya.Vector3(0, 90, 0), false, false);
                    role.transform.localRotationEulerY = 90;
                })
                // let cam = new Laya.Camera();
                // cam.transform.translate(new Laya.Vector3(rolePosT.transform.localPositionX, rolePosT.transform.localPositionY ,rolePosT.transform.localPositionZ));
                // scene.addChild(cam);
            }));
        }));
        
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

    onUpdate(){
        if(this._role){
            let forward = new Laya.Vector3();
            this._role.transform.getForward(forward);
            // this._role.transform.translate(new Laya.Vector3(-1 * 0.016 * 0.01, forward.y * 0.016 * 0.01, -forward.z * 0.016 * 0.01));
            this._role.transform.translate(new Laya.Vector3(-forward.x * 0.016 * 0.1, 0, -forward.z * 0.016 * 0.1), false);
            if(this._camera){
                let cForWard = new Laya.Vector3();
                this._camera._transform.getForward(cForWard);
                let rTrans = this._role._transform
                let pos = new Laya.Vector3(rTrans.position.x + (cForWard.x * -5), rTrans.position.y + (cForWard.y * -5), rTrans.position.z + (cForWard.z * -5));
                this._camera._transform.position = pos;
                // console.log(forward, pos);

            }
        }
    }
}