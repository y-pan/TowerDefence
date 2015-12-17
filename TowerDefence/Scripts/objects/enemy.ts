module objects {
/**
 * File Name: Enemy
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: Enemy object for enemy 
 * History: 1.0
 */
    export class Enemy extends objects.GameObject {

        protected _lives: number;
        protected _speed: number;
        protected _oldSpeed: number;
        protected _direction: number;
        protected _width: number;
        protected _height: number;
        protected _isDead: boolean;
        protected _nextPosition: createjs.Point; // for tank and bullet to track ememy

        protected _orignalLives: number;
        protected _orignalX: number;
        protected _orignalY: number;
      
        protected _attack: number;
        protected _money: number;

        // lifeBar
        protected _lifeBar: createjs.Shape;
        protected _lifeBarBorder: createjs.Shape;

        /** direction: up -1, down 1, west -2, east 2*/
        constructor(atlas: createjs.SpriteSheet, imageString: string, lives: number, x: number, y: number, width: number, height: number, speed:number, direction:number) {
            super(atlas, imageString);

            this.x = x;
            this.y = y;
            this._orignalX = this.x;
            this._orignalY = this.y;     
                  
            this._lives = lives;
            this._orignalLives = this._lives;// for reset to reuse
            
            this._speed = speed;
            this._oldSpeed = this._speed; // used to recover the speed when the dead enemy goAgain()
            this._direction = direction;

            this._width = width ? width : 64;
            this._height = height ? height : 64;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            
            this._attack = 10;
            this._isDead = false;

            this._money = 50;

            this._lifeBarBorder = new createjs.Shape();
            this._lifeBarBorder.graphics.beginStroke("#fff").drawRect(this.x - this._width + 10, this.y - this._height, this._orignalLives, 4);            

            this._lifeBar = new createjs.Shape();
            this._lifeBar.graphics.beginFill("#0f5").drawRect(this.x - this._width + 10, this.y - this._height, this._lives, 4);        
            currentLevel.addChild(this._lifeBar);
            currentLevel.addChild(this._lifeBarBorder);

            currentLevel.addChild(this);

           
        }

        public getMoney(): number { return this._money; }

        public goAgain(): void {
            this._speed = this._oldSpeed;
            this._isDead = false;
            this.x = this._orignalX;
            this.y = this._orignalY;
            this._lives = this._orignalLives;         
        }

        public getIsDead(): boolean {
            return this._isDead;
        }


        public dieOrRecycle(): void {
            this._speed = 0;
            this._isDead = true;
            this.x = this._orignalX;
            this.y = -1000;
            this._direction = config.DIRECTION_DOWN;

            this._updateLifeBar();

            waveManager.addEnemyKilledOrEscaped(); // to add 1 to wavemanager._enemyKilledOrEscaped

        }



        public update(): void {
            this._updateLifeBar(); 
            this._moveWith_Speed_Drection();   
            //this._updateLifeBar();              

            if (this.y >= canvasHeight - 64 || this.x >= canvasWidth) { // assume that final point(heart) is only at the right or down side of screen 
                this._doAttack();
                this.dieOrRecycle();
            }         
        }

        private _updateLifeBar(): void {
                
            //console.log(this._lifeBarBorder.x + ", " + this._lifeBarBorder.y + " | " + this._lifeBar.x + ", " + this._lifeBar.y);
            this._lifeBar.graphics.clear();
            this._lifeBarBorder.graphics.clear();

            if (this._lives >= this._orignalLives * .8) {
                this._lifeBar.graphics.beginFill("#0f5").drawRect(this.x - this._width + 10, this.y - this._height, this._lives, 4);
            } else if (this._lives >= this._orignalLives * .4) {
                this._lifeBar.graphics.beginFill("#ff0").drawRect(this.x - this._width + 10, this.y - this._height, this._lives, 4);
            } else {
                this._lifeBar.graphics.beginFill("#f00").drawRect(this.x - this._width + 10, this.y - this._height, this._lives, 4);
            }

            
            this._lifeBarBorder.graphics.beginStroke("#fff").drawRect(this.x - this._width + 10, this.y - this._height, this._orignalLives, 4);    
            
        }

        private _doAttack(): void {
            scoreBoard.removeLives(this._attack);
        }
        private _moveWith_Speed_Drection(): void {
            switch (this._direction) {
                case config.DIRECTION_DOWN:
                    this.y += this._speed;
                    break;
                case config.DIRECTION_UP:
                    this.y -= this._speed;
                    break;
                case config.DIRECTION_LEFT:
                    this.x -= this._speed;
                    break;
                case config.DIRECTION_RIGHT:
                    this.x += this._speed;
                    break;
            }
        }

        /** Get enemy position after 1 tick or more ticks, used for bullet's targeting ememy*/
        public getNextPosition(numTicksLater: number): createjs.Point {
            var num = numTicksLater ? numTicksLater : 1;
            switch (this._direction) {
                case config.DIRECTION_DOWN:
                    this._nextPosition.y = this.y + this._speed * num;
                    break;
                case config.DIRECTION_UP:
                    this._nextPosition.y = this.y + this._speed * num;
                    break;
                case config.DIRECTION_LEFT:
                    this._nextPosition.x = this.x - this._speed * num;
                    break;
                case config.DIRECTION_RIGHT:
                    this._nextPosition.x = this.x + this._speed * num;
                    break;
            }

            return this._nextPosition;
        }

        public getPosition(): createjs.Point { return new createjs.Point(this.x, this.y);}
        public setLives(value: number): void { this._lives = value; }

        public getLives(): number { return this._lives; }

        public addLives(lives: number): void { this._lives += lives; }

        public removeLives(lives: number): void { this._lives -= lives; }

        public setSpeed(value: number): void { this._speed = value; }

        public getDirection(): number { return this._direction; }
        public setDirection(direction: number): void { this._direction = direction; }

        /** slow down speed by percentage: new_speed = */
        public slowSpeed(percentage: number, period: number): void {

            this._speed *= percentage;
            
        }
        

    }
} 