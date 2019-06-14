import AssetsManager from "./AssetsManager";
import BaseManager from "../base/BaseManager";
import Manager from "../Manager";

export default class ResManager extends BaseManager {
    //------------------------------------------------------------
    /** 获取预制体, 并生成实例 */
    getPrefab(path: string): Promise<Laya.Sprite> {
        return this._getPrefab(path);
    }

    // /** 获取音频 */
    // getAudio(path: string): Promise<cc.AudioClip> {
    //     return this._getAudio(path);
    // }

    /** 获取resources/textures/draw/目录下的资源 */
    getComp(name: string): string {
        let path = "comp/" + name + ".png";
        // let atlasName = "0-draw"; //没有图集则为空
        return path;
    }

    // /** 获取配置 */
    // getMonsterConfig(name: string): Promise<cc.JsonAsset> {
    //     let path = "config/auto/";
    //     return this._getConfig(path + name);
    // }

    // //------------------------------------------------------------
    private _assetMgr: AssetsManager = Manager.Assets;

    // /** 获取图片散图资源，如果获取失败，则从图集里获取 */
    // private _getSprite(path: string, name: string, atlasName?: string): Promise<cc.SpriteFrame> {
    //     return new Promise((resolve, reject) => {
    //         /** 获取散图 */
    //         this._assetMgr.loadSprite(path + name).then((spFrame: cc.SpriteFrame) => {
    //             resolve(spFrame);
    //         }).catch(() => {
    //             /** 没散图则从图集获取 */
    //             this._getSpriteFrameFromAtlas(path + atlasName, name).then((spFrame: cc.SpriteFrame) => {
    //                 resolve(spFrame);
    //             }).catch(() => {
    //                 console.error("[ResManager.ts]----->asset is not exist:", path + name, "--->atlas are not:", atlasName);
    //                 // this._assetMgr.releaseRes(path + atlasName);
    //                 reject();
    //             });
    //         });
    //     });   
    // }

    // private _getSpriteFrameFromAtlas(path: string, name: string): Promise<cc.SpriteFrame> {
    //     return new Promise((resolve, reject) => {
    //         this._assetMgr.loadSpriteAtlas(path).then((res: cc.SpriteAtlas) => {
    //             let spFrame = res.getSpriteFrame(name);
    //             if(spFrame){
    //                 resolve(spFrame);
    //             }else{
    //                 reject();
    //             }
    //         }).catch(() => {
    //             reject();
    //         });
    //     });
    // }

    /** 获取预制体 */
    private _getPrefab(path: string): Promise<Laya.Sprite> {
        return new Promise((resolve, reject) => {
            this._assetMgr.loadPrefab(path).then((res) => {
                if(res){
                    resolve(res.create());
                }else{
                    reject();
                }
            }).catch(() => {
                reject();
            });
        });
    }

    // private _getConfig(path: string): Promise<cc.JsonAsset> {
    //     return new Promise((resolve, reject) => {
    //         this._assetMgr.loadConfig(path).then((res) => {
    //             if(res){
    //                 resolve(res.json);
    //             }else{
    //                 reject();
    //             }
    //         }).catch(() => {
    //             reject();
    //         });
    //     });
    // }

    // private _getAudio(path: string): Promise<cc.AudioClip> {
    //     return new Promise((resolve, reject) => {
    //         this._assetMgr.loadAudioClip(path).then((audio: cc.AudioClip) => {
    //             if(audio){
    //                 resolve(audio);
    //             }else{
    //                 reject();
    //             }
    //         }).catch(() => {
    //             reject();
    //         });
    //     });
    // }

    onDestroy(){

    }
}
