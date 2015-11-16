module objects {

    export class DirectionTile extends createjs.Bitmap {

        private _direction: number;
        private _width: number;
        private _height: number;
        
        public tag: string;

        constructor(pathString: string, direction: number, x: number, y: number) {
            super(assets.getResult(pathString));       
            
            this._width = this.getBounds().width;
            this._height = this.getBounds().height;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            this._direction = direction;

            this.x = x;
            this.y = y;            
            this.tag = "DIRECTION";
        }

        // maybe put this in globle collsion ?
        public detectObject_applyDirection(object: objects.Enemy): void{
            if (object.getDirection() != this._direction) {
                if (this._distance(object) < Math.min(this._width,this._height) * .2)
                    object.setDirection(this._direction);
                //console.log(object.x + ", " + object.y + " | " + this.x + ", " + this.y + " reg: "+ object.regX + "," + object.regY + "|" + this.regX + "," + this.regY);
            }
        }
            
        private _distance(obj1: objects.Enemy): number {
            return Math.floor(Math.sqrt(Math.pow((obj1.x - this.x), 2) + Math.pow((obj1.y - this.y), 2)));
        }
    }
} 