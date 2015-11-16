module objects {

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