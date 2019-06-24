import BaseManager from "../base/BaseManager";

export default class SoundManager extends BaseManager {
    private _current: number = 0;
    private _loadList: Object = {};

    play(path: string, loopNum: number = 1, volume: number = 1){
        // Manager.Res.getAudio(path).then((audio: cc.AudioClip) => {
        //     this._current = cc.audioEngine.play(audio, loop, volume);
        //     this._loadList[path] = audio;
        // });
        Laya.SoundManager.playSound(path, loopNum, Laya.Handler.create(this, () => {

        }), 0);
    }

    // pauseCurrent(){
    //     cc.audioEngine.pause(this._current);
    // }

    // pauseAll(){
    //     cc.audioEngine.pauseAll();
    // }

    // stopCurrent(){
    //     cc.audioEngine.stop(this._current);
    // }

    // stopAll(){
    //     cc.audioEngine.stopAll();
    // }

    // resumeCurrent(){
    //     cc.audioEngine.resume(this._current);
    // }

    // resumeAll(){
    //     cc.audioEngine.resumeAll();
    // }

    onDestroy(){
        this._loadList = {};
    }
}
