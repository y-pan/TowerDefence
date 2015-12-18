var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    /**
     * File Name: DirectionTile
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: DirectionTile object to set enemy's moving direction when collision occurs
     * History: 1.0
     */
    var DirectionTile = (function (_super) {
        __extends(DirectionTile, _super);
        /**object has direction to be used by collision to set direction to enemy, inherits from tile.
         * Example: ("direction_down",config.TILE_DIRECTION, 120, 420, config.DIRECTION_RIGHT,true)
          */
        function DirectionTile(pathString, tag, x, y, direction, isCentered) {
            _super.call(this, pathString, tag, x, y, isCentered);
            this._direction = direction;
            //this.x = x;
            //this.y = y;            
        }
        DirectionTile.prototype.getDirection = function () { return this._direction; };
        // maybe put this in globle collsion ?
        DirectionTile.prototype.detectObject_applyDirection = function (object) {
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
        };
        return DirectionTile;
    })(objects.Tile);
    objects.DirectionTile = DirectionTile;
})(objects || (objects = {}));
//# sourceMappingURL=directiontile.js.map