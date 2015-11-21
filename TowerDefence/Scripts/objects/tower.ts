module objects {
    
    export class Tower extends createjs.Bitmap {

        protected _width: number;
        protected _height: number;
        protected _attack: number;
       
        protected _level: number;

        protected _rotation: number;

        protected _fireRange: number;

        protected _hasTarget: boolean;
        
        protected _targetNextPosition: createjs.Point;

        protected _target: objects.Enemy;
        protected _coldTime: number;
        protected _oldTicks: number; //getTicks
        protected _nowTicks: number;
        protected _bulletType: string;

        protected _imageString;
        protected _timeCreated: number;
        
        public getTimeCreated():number {
            return this._timeCreated;
        }

        protected _isUpdatingLevel: boolean;

         // how to remember current target until lose it in range ? 
        constructor(imageString: string, x: number, y: number, attack: number, fireRange: number, coldTime:number, level:number) {
            super(imageString);
            this._imageString = imageString;
            this._timeCreated = createjs.Ticker.getTicks();
            this._isUpdatingLevel = false;

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
            this._coldTime = coldTime;
            this._level = level;
            this._oldTicks = createjs.Ticker.getTicks();
            
            // event
            this.on("mouseover", this.overTower, this);
            this.on("mouseout", this.outTower, this);
            this.on("click", this.clickTower, this);
        }

        overTower(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 0.7;            
        }
        outTower(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1;
        }
        
        clickTower(event: createjs.MouseEvent): void {
            console.log("click in tower created at: " + this.getTimeCreated());
            
            // check conditions: money > 50, this._level < 3    maxlevel = 3

            this._requestUpdateLevel();
               
        }
        
        
        private _requestUpdateLevel(): void {
            console.log("requestUpdateLevel()");
            // global to update this level if condition
            this._isUpdatingLevel = true;

        }
        public getLevel(): number {
            return this._level;
        }
        public getIsUpdatingLevel(): boolean {
            return this._isUpdatingLevel;
        }
        public setIsUpdatingLevel(isUpdatingLevel: boolean): void {
            this._isUpdatingLevel = isUpdatingLevel;
        }
        public setLevel(level:number): void {
            switch (level) {
                case 1:
                    this._imageString = assets.getResult("ta1");
                    break;
                case 2:
                    this._imageString = assets.getResult("ta2");
                    break;
                case 3:
                    this._imageString = assets.getResult("ta3");
                    break;
            }
            this.image = this._imageString;
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

        private _setRotationAt(enemy: objects.Enemy): void {
            
            // can use object.getNextPosition() to improve targeting enemy

            var temp = Math.floor(Math.atan((this.y - enemy.y) / (this.x - enemy.x)) * (180 / Math.PI));

            if (enemy.x > this.x) { this.rotation = temp; }
            else if (enemy.x < this.x) { this.rotation = 180 + temp; }
                   
        }

        private _getBulletType(): string {
            
            switch (this._level) {
                case 1:
                    this._bulletType = "bullet1";
                    break;
                case 2:
                    this._bulletType = "bullet2";
                    break;
                case 3:
                    this._bulletType = "bullet3";
                    break;
            }
            return this._bulletType;
        }

        private _getBulletArray(): any {
            switch (this._level) {
                case 1:
                    return bullet1Array;
                    break;
                case 2:
                    return bullet1Array;
                    break;
                case 3:
                    return bullet1Array;
                    break;
            }            
        }

        private _shoot(): void {
            //console.log(bulletArray.length);
            this._nowTicks = createjs.Ticker.getTicks();
            if (this._nowTicks - this._oldTicks >= this._coldTime) {
                this._shootBullet();
            }            
        }


        private _shootBullet(): void {

            var fired: boolean = false;

            for (var i = 0; i < this._getBulletArray().length && !fired; i++) {
                //console.log(bulletArray[i].isReady);
                if (this._getBulletArray()[i].isReady) {
                    this._getBulletArray()[i].fireBullet(this);
                    fired = true;
                    this._oldTicks = this._nowTicks;
                }
            } 
            // add one more when bullet is not enough to use  
            if (!fired) {
                this._getBulletArray().push(new objects.Bullet(assets.getResult(this._getBulletType()), "bullet", null, null, 5, 4, 8, 8, true));
                this._getBulletArray()[bullet1Array.length - 1].fireBullet(this);
                fired = true;
                this._oldTicks = this._nowTicks;
            }  
        }

        /** This is for centered tower */
        public getGunpoint(): createjs.Point {
            return new createjs.Point(this.x + this._width * .5, this.y);
        };

        public getPosition(): createjs.Point {
            return new createjs.Point(this.x, this.y);
        }


    }
}