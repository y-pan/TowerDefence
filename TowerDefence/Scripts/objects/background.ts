module objects {
/**
 * File Name: Background
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: Background object for game background
 * History: 1.0
 */
    export class Background extends createjs.Bitmap {

        constructor(pathString:string) {
            super(assets.getResult(pathString));
        }
    }
} 