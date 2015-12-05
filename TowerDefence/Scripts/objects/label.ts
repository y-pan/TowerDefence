module objects {
/**
 * File Name: Label
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: Label object extends createjs.Text, used for labels
 * History: 1.0
 */
    export class Label extends createjs.Text {

        constructor(labelString: string, labelFont: string, labelColor: string, x: number, y: number, isCentered:boolean) {
            super(labelString, labelFont, labelColor);

            if (isCentered) {
                this.regX = this.getBounds().width * .5;
                this.regY = this.getBounds().height * .5;
            }
            this.x = x;
            this.y = y;          
        }
    }
}