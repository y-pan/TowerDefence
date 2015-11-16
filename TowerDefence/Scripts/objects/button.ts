module objects {

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
        }

        overButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = .8;          
        }

        outButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1;
        }
    }
}