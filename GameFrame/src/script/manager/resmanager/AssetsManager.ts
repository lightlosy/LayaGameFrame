import BaseManager from "../base/BaseManager";

export default class AssetsManager extends BaseManager {
    private _assetsList: any = {};

    /** 加载预制体 */
    loadPrefab(path: string): Promise<any> {
        return this.loadAssetsAsync(path);
    }

    // /** 加载帧图片 */
    // loadSprite(path: string): Promise<cc.SpriteFrame> {
    //     return this.loadAssetsAsync(path, cc.SpriteFrame);
    // }

    // /** 加载图集 */
    // loadSpriteAtlas(path: string): Promise<cc.SpriteAtlas> {
    //     return this.loadAssetsAsync(path, cc.SpriteAtlas);
    // }

    // /** 加载音频 */
    // loadAudioClip(path: string): Promise<cc.AudioClip>{
    //     return this.loadAssetsAsync(path, cc.AudioClip);
    // }

    /** 加载配置 */
    loadConfig(path: string): Promise<any>{
        return this.loadAssetsAsync(path);
    }

    loadAssetsAsync(path: string, type?: any): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            let _self = this;
            if(_self._assetsList[path]){
                resolve(_self._assetsList[path]);
            }else{
                Laya.loader.load(path, Laya.Handler.create(this, (res) => {
                    console.log('资源加载---->', res);
                    if(!res){
                        reject();
                        return;
                    }
                    _self._assetsList[path] = res;
                    resolve(res);
                }));
            }
        });
    }

    releaseRes(resPath: string){
        // cc.loader.releaseRes(resPath);
        this._assetsList[resPath] = null;
    }
    
    onDestroy(){
        // for(let path in this._assetsList){
        //     this.releaseRes(path);
        // }
        // this._assetsList = {};
    }
}
