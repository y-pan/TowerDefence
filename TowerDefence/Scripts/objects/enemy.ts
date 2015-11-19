module objects {

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


        /** direction: up -1, down 1, west -2, east 2*/
        constructor(atlas: createjs.SpriteSheet, imageString: string, lives: number, x: number, y: number, width: number, height: number, speed:number, direction:number) {
            super(atlas, imageString);

            this.x = x;
            this.y = y;
                       
            this._lives = lives;
            this._orignalLives = this._lives;// for reset to reuse
            this._speed = speed;
            this._direction = direction;

            this._width = width ? width : 64;
            this._height = height ? height : 64;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            
            this._isDead = false;
        }

        public die() {
            this._isDead = true;
            //this._lives = this._orignalLives;
            this.x = -30;
            this.y = -30;
        }

        public update() {
            this._moveWith_Speed_Drection();
              
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

        public setLives(value: number): void { this._lives = value; }

        public getLives(): number { return this._lives; }

        public addLives(lives: number): void { this._lives += lives; }

        public substractLives(lives: number): void { this._lives -= lives; }

        public setSpeed(value: number): void { this._speed = value; }

        public getDirection(): number { return this._direction; }
        public setDirection(direction: number): void { this._direction = direction; }

        /** slow down speed by percentage: new_speed = */
        public slowSpeed(percentage: number, period: number): void {

            this._speed *= percentage;
            
        }

    }
} 