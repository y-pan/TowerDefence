module objects {

/**
 * File Name: GameObject
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: GameObject object extends createjs.Sprite, used for object which needs animations
 * History: 1.0
 */
    export class GameObject extends createjs.Sprite {

        protected _width: number;
        protected _height: number;
        protected _isColliding: boolean;
        protected _tag: string;


        constructor(atlas:createjs.SpriteSheet, imageString: string) {

            super(atlas, imageString);

            this._tag = imageString;
            this._width = this.getBounds().width;
            this._height = this.getBounds().height;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            //this._isColliding = false;

        }

        /** Get position of object */
        public getPosition(): createjs.Point {
            return new createjs.Point(this.x, this.y);
        }

        /** Get half height of object */
        public getHalfHeight(): number {
            return this._height * .5;
        }

        /** Get half width of object */
        public getHalfWidth(): number {
            return this._width * .5;
        }

        /** Get isColliding of object */
        public getIsColliding(): boolean {
            return this._isColliding;
        }
        /** Set isColliding of object*/
        public setIsColliding(isColliding: boolean) {
            this._isColliding = isColliding;
        }

        /** Get name of object*/
        public getName(): string {
            return this._tag;
        }

        



    }
}