var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var DirectionTile = (function (_super) {
        __extends(DirectionTile, _super);
        function DirectionTile(pathString, direction, x, y) {
            _super.call(this, assets.getResult(pathString));
            this._width = this.getBounds().width;
            this._height = this.getBounds().height;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            this._direction = direction;
            this.x = x;
            this.y = y;
            this.tag = "DIRECTION";
        }
        // maybe put this in globle collsion ?
        DirectionTile.prototype.detectObject_applyDirection = function (object) {
            if (object.getDirection() != this._direction) {
                if (this._distance(object) < Math.min(this._width, this._height) * .2)
                    object.setDirection(this._direction);
            }
        };
        DirectionTile.prototype._distance = function (obj1) {
            return Math.floor(Math.sqrt(Math.pow((obj1.x - this.x), 2) + Math.pow((obj1.y - this.y), 2)));
        };
        return DirectionTile;
    })(createjs.Bitmap);
    objects.DirectionTile = DirectionTile;
})(objects || (objects = {}));
//# sourceMappingURL=directiontile.js.map