module objects {
    
    export class Tower extends createjs.Bitmap {

        protected _width: number;
        protected _height: number;
        protected _attack: number;
        protected _shootSpeed: number;
        protected _level: number;

        protected _rotation: number;

        protected _fireRange: number;

        protected _hasTarget: boolean;
        
        protected _targetNextPosition: createjs.Point;

        protected _target: objects.Enemy;
         // how to remember current target until lose it in range ? 
        constructor(imageString: string, x: number, y: number, attack: number, fireRange: number, shootSpeed:number, level:number) {
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
            this._fireRange = fireRange;
            this._shootSpeed = shootSpeed;
            this._level = level;
           
        }

        public setHasTarget(hasTarget: boolean): void {
            this._hasTarget = hasTarget;
        }
        public getHasTarget(): boolean {
            return this._hasTarget;
        }

        public fireAt(enemy: objects.Enemy): void {

            if (enemy.getLives() > 0) {
                this._setRotationAt(enemy);
                this._shoot();
                this._hasTarget = true;
                this._target = enemy;
                console.log(this._target);
            } 
        }

        public fireAsBefore(): void {
            if ((this._target.getLives() > 0)&&(this._distance(this._target.getPosition(), this.getPosition()) <= this.getFireRange())) {
             
                this._setRotationAt(this._target);
                this._shoot();             
                
            } else {
                this._hasTarget = false;
                this._target = null;
            }
            //console.log(this._hasTarget);
        }

        private _distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }

        public getTarget(): objects.Enemy {
            return this._target;
        }

        public getFireRange(): number {
            return this._fireRange;
        }

        private _setRotationAt(object: objects.Enemy): void {
            
            // can use object.getNextPosition() to improve targeting enemy

            var temp = Math.floor(Math.atan((this.y - object.y) / (this.x - object.x)) * (180 / Math.PI));

            if (object.x > this.x) { this.rotation = temp; }
            else if (object.x < this.x) { this.rotation = 180 + temp; }
            //console.log("temp: " + temp + ", " + this.rotation);                       
        }

        private _shoot(): void {
            for (var i = 0; i < bulletArray.length; i++) {
                if (bulletArray[i].isReady) {
                    bulletArray[i].fireBullet(this);
                }
            }
            /*
            if (this._hasTarget) {
                console.log("hasTarget");
                for (var i = 0; i < bulletArray.length; i++) {
                    if (bulletArray[i].isReady) {
                        bulletArray[i].fireBullet(this);
                    }
                }
            }*/
        }

        /** This is for centered tower */
        public getGunpoint(): createjs.Point {
            return new createjs.Point(this.x + this._width * .5, this.y);
        };

        public getPosition(): createjs.Point {
            return new createjs.Point(this.x, this.y);
        }


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