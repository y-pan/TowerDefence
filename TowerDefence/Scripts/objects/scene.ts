module objects {
/**
 * File Name: Scene
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: Scene object extends createjs.Container, used for game scene(game state)
 * History: 1.0
 */
    export class Scene extends createjs.Container {

        constructor() { super(); }

        public start(): void { }
        public update(): void { }
    }
}