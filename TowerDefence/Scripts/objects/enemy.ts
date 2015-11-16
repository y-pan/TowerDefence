module objects {

    export class Enemy extends objects.GameObject {

        protected _lives: number;
        protected _speed: number;
        protected _oldSpeed: number;
        protected _direction: number;

        /** direction: up -1, down 1, west -2, east 2*/
        constructor(atlas: createjs.SpriteSheet, imageString: string, x: number, y: number, lives: number, speed:number, direction:number) {
            super(atlas, imageString);

            this.x = x;
            this.y = y;
           
            this._lives = lives;
            this._speed = speed;
            this._direction = direction;
            
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
            }
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