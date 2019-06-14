import { UIPath } from "./uipath/UIPath";
import { ConfigPath } from "./configpath/ConfigPath";
import { AudioPath } from "./audiopath/AudioPath";
import { EntityPath } from "./entitypath/EntityPath";


/** 资源路径读取(root: resources) */
export namespace ResPath {
    export const uiPath = UIPath;
    export const entityPath = EntityPath;
    export const configPath = ConfigPath;
    export const audioPath = AudioPath;
}
