module objects {
    
    export class Tower extends createjs.Bitmap {

        protected _width: number;
        protected _height: number;
        protected _attack: number;
        protected _shootSpeed: number;
        protected _level: number;

        protected _rotation: number;

        protected _hasTarget: boolean;
        
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
                this._getRotation(object);
                this._shoot();
            } else {
                this._hasTarget = false;
            }
        }

        private _getRotation(object: objects.Enemy): void {
            
            // can use object.getNextPosition() to improve targeting enemy

            var temp = Math.floor(Math.atan((this.y - object.y) / (this.x - object.x)) * (180 / Math.PI));

            if (object.x > this.x) { this.rotation = temp; }
            else if (object.x < this.x) { this.rotation = 180 + temp; }
            //console.log("temp: " + temp + ", " + this.rotation);
                       
        }

        private _shoot(): void {
            if (this._hasTarget) {
                for (var i = 0; i < bullets_green.length; i++) {
                    if (bullets_green[i].isReady) {
                        bullets_green[i].fireBullet(this);
                    }
                }
            }
        }

        /** This is for centered tower */
        public getGunpoint(): createjs.Point {
            return new createjs.Point(this.x + this._width * .5, this.y);
        };


        // may not need this
        /*
        private _distanceToMouse(): number {
            return Math.floor(Math.sqrt(Math.pow((stage.mouseX - this.x), 2) + Math.pow((stage.mouseY - this.y), 2)));
        }

        private _distanceToTarget(object:objects.Enemy): number {
            return Math.floor(Math.sqrt(Math.pow((object.x - this.x), 2) + Math.pow((object.y - this.y), 2)));
        }*/
    }
}