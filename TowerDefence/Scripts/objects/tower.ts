module objects {
    
    export class Tower extends createjs.Bitmap {

        protected _width: number;
        protected _height: number;
        protected _imageString: any;// ?
        protected _towerType: string;
        protected _rotation: number;
        protected _fireRange: number;
        
        protected _hasTarget: boolean;        
        protected _target: objects.Enemy;
        protected _coldTime: number;
        protected _oldTicks: number;
        protected _nowTicks: number;

        protected _bulletType: string;

        protected _level: number;
        protected _newLevel: number;
        protected _maxLevel: number;

        protected _rangeCircle: createjs.Shape;
       
        /**This constructor will automatically add this object to the global currentLevel, which is objects.Scene extends createjs.Container*/
        constructor(imageString:any, towerType:string, x: number, y: number) {
            super(imageString);

            this._imageString = imageString;
            this._towerType = towerType;
            this.x = x;
            this.y = y;
            this._width = 50;
            this._height = 50;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            this._level = config.TowerLevel_1;

            this.rotation = 0;
            this._hasTarget = false;

            this.updateFireRange();
            this.updateColdTime();

            this._maxLevel = config.TowerLevel_Max;
            this._newLevel = this._level;

            this._oldTicks = createjs.Ticker.getTicks();

            this.createRangeCircle();
            
            currentLevel.addChild(this);
              
            // event
            this.on("mouseover", this.overTower, this);
            this.on("mouseout", this.outTower, this);
            this.on("click", this.clickTower, this);
        }

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~ Event Listener ~~~~~~~~~~~~~~~~~~~~~~~~~

        overTower(event: createjs.MouseEvent): void {
            //event.currentTarget.alpha = 0.7;     
            this._rangeCircle.alpha = 1;    
            //console.log("_needToUpdateCircle:" +this._needToUpdateCircle);   
        }
        outTower(event: createjs.MouseEvent): void {
            //event.currentTarget.alpha = 1;
            this._rangeCircle.alpha = 0;
        }
        
        clickTower(event: createjs.MouseEvent): void {
            //console.log("click in tower created at: " + this.getTimeCreated());
            this._requestNewLevel();        
        }
        
        /**Create a circle where the center is tower, radius is fireRange, and add it to current scene*/
        public createRangeCircle(): void {
            this._rangeCircle = new createjs.Shape();
            this._rangeCircle.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)").drawCircle(this.x, this.y, this.getFireRange());
            this._rangeCircle.alpha = 0;
            currentLevel.addChild(this._rangeCircle);
        }
        // +++++++++++++++++++++++++++++++++++ PUBLIC ++++++++++++++++++++++++++++++++++++++++++++

        public setLevel(level: number): void {
            // set level
            this._level = level;
            this._newLevel = this._level;
            // set image
            this.updateTowerImage();
            // set range & circle
            this.updateFireRange();
            this.updateRangeCircle();
            this.updateColdTime();

        }

        public updateColdTime(): void {
            switch (this._level) {
                case 1:
                    this._coldTime = config.FireColdTime_1;
                    break;
                case 2:
                    this._coldTime = config.FireCodeTime_2;
                    break;
                case 3:
                    this._coldTime = config.FireCodeTime_3;
                    break;
            }
        }

        public getLevel(): number {
            return this._level;
        }

        public getNewLevel(): number {
            return this._newLevel;
        }

        

        public updateTowerImage(): void {
            this._imageString = assets.getResult(this._towerType + this._level);
            this.image = this._imageString;
        }

        public updateRangeCircle(): void {
            this._rangeCircle.graphics.clear();
            this._rangeCircle.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)").drawCircle(this.x, this.y, this.getFireRange());
        }

        public updateFireRange(): void {
            switch (this._level) {
                case 1:
                    this._fireRange = config.FireRange_1;
                    break;
                case 2:
                    this._fireRange = config.FireRange_2;
                    break;
                case 3:
                    this._fireRange = config.FireRange_3;
                    break;
            }
        }
        
        /** This is for centered tower */
        public getGunpoint(): createjs.Point {
            return new createjs.Point(this.x + this._width * .5, this.y);
        };
        public getPosition(): createjs.Point {
            return new createjs.Point(this.x, this.y);
        }
        public getTarget(): objects.Enemy {
            return this._target;
        }
        public getFireRange(): number {
            return this._fireRange;
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
            if ((this._target.getLives() > 0) && (this._distance(this._target.getPosition(), this.getPosition()) <= this.getFireRange())) {
                this._setRotationAt(this._target);
                this._shoot();
            } else {
                this._hasTarget = false;
                this._target = null;
            }
        }

        //-------------------------------- PRIVATE -------------------------------------------
        /**Conditions applied here before update level*/
        private _requestNewLevel(): void {
            if (this._newLevel < this._maxLevel) {
                this._newLevel++;
                this.setLevel(this._newLevel);              
            }
        }

        private _distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }

        private _setRotationAt(enemy: objects.Enemy): void {
            var temp = Math.floor(Math.atan((this.y - enemy.y) / (this.x - enemy.x)) * (180 / Math.PI));
            if (enemy.x > this.x) { this.rotation = temp; }
            else if (enemy.x < this.x) { this.rotation = 180 + temp; }
        }

        /**Return a bulletType actually a imageString can be used in assets.getResult(imageString)*/
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

        private _getBullet(): objects.Bullet[] {
            //console.log("in getBullet, :" + this._level);   
            switch (this._level) {
                case 1:
                    return bullets1;
                    break;
                case 2:
                    return bullets2;
                    break;
                case 3:
                    return bullets3;
                    break;
            }
        }
        private _shoot(): void {
            this._nowTicks = createjs.Ticker.getTicks();
            if (this._nowTicks - this._oldTicks >= this._coldTime) {
                this._shootBullet();
            }
        }
        private _shootBullet(): void {
            var fired: boolean = false;
            for (var i = 0; i < this._getBullet().length && !fired; i++) {
                if (this._getBullet()[i].isReady) {
                    this._getBullet()[i].fireBullet(this);
                    fired = true;
                    this._oldTicks = this._nowTicks;
                }
            } 
            // add more if not enough  
            if (!fired) {
                this._getBullet().push(new objects.Bullet(assets.getResult(this._getBulletType()), "bullet", null, null, 5, 4, 8, 8, true));
                this._getBullet()[this._getBullet().length - 1].fireBullet(this);

                // add to current container

                currentLevel.addChild(this._getBullet()[this._getBullet().length - 1]);
                fired = true;
                this._oldTicks = this._nowTicks;
            }
        }// end of _shootBullet

    }// end of module
}