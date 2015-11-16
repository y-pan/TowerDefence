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

            var temp = (Math.floor(-Math.asin((this.y - object.y) / this._distanceToTarget(object)) * (180 / Math.PI)));

            if (object.x > this.x) {
                if (temp) {
                    this.rotation = temp;
                } else {
                    if (object.y > this.y + 5) { this.rotation = 90; }
                    else if (object.y < this.y - 5) { this.rotation = -90; }
                    else { this.rotation = 0; }
                }
            } else if (object.x < this.x) {
                if (temp) {
                    this.rotation = 180 - temp;
                } else {
                    if (object.x > this.y + 5) { this.rotation = 90; }
                    else if (object.y < this.y - 5) { this.rotation = -90; }
                    else { this.rotation = 180; }
                }
            }

            /*
            var temp = (Math.floor(-Math.asin((this.y - stage.mouseY) / this._distanceToMouse()) * (180 / Math.PI)));
            
            if (stage.mouseX > this.x) {
                if (temp) {
                    this.rotation = temp;
                } else {
                    if (stage.mouseY > this.y + 5) { this.rotation = 90; }
                    else if (stage.mouseY < this.y - 5) { this.rotation = -90; }
                    else { this.rotation = 0;}
                }
            } else if (stage.mouseX < this.x) {
                if (temp) {
                    this.rotation = 180 - temp;
                } else {
                    if (stage.mouseY > this.y + 5) { this.rotation = 90; }
                    else if (stage.mouseY < this.y - 5) { this.rotation = -90; }
                    else { this.rotation = 180; }
                }
            }
            */


           //console.log("mouseX: " + stage.mouseX +", mouseX-this.x= " + (stage.mouseX - this.x) + ", temp: " + temp + ", tower rotation: " + this.rotation);
        }

        private _shoot(): void {

        }

        private _distanceToMouse(): number {
            return Math.floor(Math.sqrt(Math.pow((stage.mouseX - this.x), 2) + Math.pow((stage.mouseY - this.y), 2)));
        }

        private _distanceToTarget(object:objects.Enemy): number {
            return Math.floor(Math.sqrt(Math.pow((object.x - this.x), 2) + Math.pow((object.y - this.y), 2)));

        }
    }
}