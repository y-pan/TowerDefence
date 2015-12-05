module objects {
/**
 * File Name: Button
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: Button object button 
 * History: 1.0
 */
    export class Button extends createjs.Bitmap {

        private _width: number;
        private _height: number;

        constructor(pathString: string, x: number, y: number, width:number, height:number, isCentered:boolean) {

            super(assets.getResult(pathString));

            this.x = x;
            this.y = y;
            this._width = width > 0 ? width : 150;
            this._height = height > 0 ? height : 60;

            if (isCentered) {
                this.regX = this._width * .5;
                this.regY = this._height * .5;
            }

            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
            this.on("click", this.clickButton, this);
        }

        overButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = .8;          
        }

        outButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1;
        }
        clickButton(event: createjs.MouseEvent): void {
            createjs.Sound.play("ta_buttonPress");
        }
    }
}