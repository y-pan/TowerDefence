﻿module objects {
/**
 * File Name: DirectionTile
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: DirectionTile object to set enemy's moving direction when collision occurs 
 * History: 1.0
 */
    export class DirectionTile extends objects.Tile {

        protected _direction: number;
        

        /**object has direction to be used by collision to set direction to enemy, inherits from tile.
         * Example: ("direction_down",config.TILE_DIRECTION, 120, 420, config.DIRECTION_RIGHT,true)
          */
        constructor(pathString: string, tag: number, x: number, y: number, direction: number, isCentered:boolean) {
            super(pathString, tag, x, y, isCentered);      

            this._direction = direction;

            //this.x = x;
            //this.y = y;            
        }

        public getDirection(): number { return this._direction; }

        // maybe put this in globle collsion ?
        public detectObject_applyDirection(object: objects.Enemy): void{
            //console.log("check dir");
            if (object.x > this.x - 5 && object.x < this.x + 5 && object.y > this.y - 5 && object.y < this.y + 5 && object.getDirection() != this._direction) {
                object.setDirection(this._direction);
                console.log("setDirection");
            } 
            //console.log("o|t: "+object.x + ", " + object.y + " | " + this.x + ", " + this.y + " or|tr: " + object.regX + ", " + object.regY + " | " + this.regX + ", " + this.regY);

            /*
            if (object.getDirection() != this._direction) {
                if (this._distance(object) < this._height * .2)
                    
            }*/
        }
            /*
        private _distance(obj1: objects.Enemy): number {
            return Math.floor(Math.sqrt(Math.pow((obj1.x - this.x), 2) + Math.pow((obj1.y - this.y), 2)));
        }*/
    }
} 