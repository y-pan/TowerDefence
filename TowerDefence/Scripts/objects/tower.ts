module objects {
    
    export class Tower extends createjs.Bitmap {

        protected _width: number;
        protected _height: number;
        protected _attack: number;
        protected _shootSpeed: number;
        protected _level: number;

        protected _rotation: number;

        protected _hasTarget: boolean;
        
        protected _target: objects.Enemy;

        constructor(imageString: string, x: number, y:number, attack:number, shootSpeed:number, level:number) {
            super(imageString);

            this.x = x;
            this.y = y;
                       
           
            this._width = 50;
            this._height = 50;

            this.regX = this._width * .5;
            this.regY = this._height * .5;

            this.rotation = 0;

            this._hasTarget = false;                    

            this._attack = attack;
            this._shootSpeed = shootSpeed;

            this._level = level;
           

        }


        public update(object: objects.Enemy): void {
            if (object) {
                this._hasTarget = true;
                //this._target = object;
                this._getRotation(object);
                this._shoot();
            } else {
                this._hasTarget = false;
            }
        }

        private _getRotation(object: objects.Enemy): void {

            //this.rotation++;
            
            //this.rotation = 370;
            //this.rotation = Math.floor(Math.atan((this.y - object.y) / (this.x - object.x)) * (180 / Math.PI));
            //this.rotation = -Math.floor(Math.atan((this.y - stage.mouseY) / (this.x - stage.mouseY)) * (180 / Math.PI));
            //this.rotation = Math.floor(Math.asin((this.y - stage.mouseY) / this._distanceToMouse()) * (180 / Math.PI));
            //var temp = (Math.floor(Math.abs(Math.asin((this.y - stage.mouseY) / this._distanceToMouse()) * (180 / Math.PI))));
            var temp = (Math.floor(-Math.asin((this.y - stage.mouseY) / this._distanceToMouse()) * (180 / Math.PI)));

            if (temp) {
                this.rotation = temp;
            } else if (stage.mouseY > this.y) {
                this.rotation = 90;
            } else if (stage.mouseY < this.y) {
                this.rotation = -90;
            } 
           

           console.log("tower rotation: " + this.rotation);
        }

        private _shoot(): void {

        }

        private _distanceToMouse(): number {
            return Math.floor(Math.sqrt(Math.pow((stage.mouseX - this.x), 2) + Math.pow((stage.mouseY - this.y), 2)));
        }
    }
}