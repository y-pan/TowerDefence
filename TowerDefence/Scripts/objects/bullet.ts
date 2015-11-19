﻿module objects {

    export class Bullet extends createjs.Bitmap {

        protected _width: number;
        protected _height: number;
        protected _attack: number;
        protected _speed: number;
        protected _dx: number;
        protected _dy: number;
        public isReady: boolean;

        constructor(imagePath:string, x:number, y:number, attack:number, speed:number, width:number,height:number, isCentered:boolean) {
            super(imagePath);

            this.x = x ? x : -10; // store outside 
            this.y = y ? y : -10; // store outside

            this._attack = attack ? attack : 5;
            this._speed = speed ? speed : 5;
            this._width = width ? width : 8;
            this._height = height? height : 8;

            if (isCentered) {
                this.regX = this._width * .5;
                this.regY = this._height * .5;
            }

            this.isReady = true;
        }

        public fireBullet(tower: objects.Tower): void {
            //
            if (this.isReady) {
                this._setDirection(tower);
                this._flyAtDirection();
            }
            
        }

        public update(): void {
                       
            if (!this.isReady) {

                // keep flying
                this._flyAtDirection();
                

                // detect if it fly outside
                if (this.x > canvasWidth || this.x < 0 || this.y > canvasHeight || this.y < 0) {
                    this._reset();
                }

                // detect collision with enemy

                // do damage
            }            
        }

        /** reset bullet and put it outside canvas*/
        private _reset():void {
            this.x = -10;
            this.y = -10;
            this._dx = 0;
            this._dy = 0;
            this.isReady = true;
        }

       

        private _setDirection(tower: objects.Tower):void {
            var r = tower.rotation;

            //this.x = tower.getGunpoint().x; // how to rotate gunpoint ?
            //this.y = tower.getGunpoint().y;
             
            
            this.x = tower.x;
            this.y = tower.y;

            this._dx = Math.floor(this._speed * Math.cos(r * Math.PI / 180)); 
            
            this._dy = Math.floor(this._speed * Math.sin(r * Math.PI / 180));    
            console.log("fired at " + r + " : " + this._dx + "|" + this._dy);        
        }

        private _flyAtDirection(): void {
            this.x += this._dx;
            this.y += this._dy;
            this.isReady = false;
            //console.log("b @ " + this.x + " | " + this.y);  
        }
    }
}