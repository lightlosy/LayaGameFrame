import BaseManager from "../base/BaseManager";
import Manager from "../Manager";

export default class SoundManager extends BaseManager {
    private _current: number = 0;
    private _loadList: Object = {};

    // play(path: string, loop: boolean = false, volume: number = 1){
    //     Manager.Res.getAudio(path).then((audio: cc.AudioClip) => {
    //         this._current = cc.audioEngine.play(audio, loop, volume);
    //         this._loadList[path] = audio;
    //     });
    // }

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
