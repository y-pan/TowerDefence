var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Tile = (function (_super) {
        __extends(Tile, _super);
        /**General Tile object, to be inherited by direction tile */
        function Tile(pathString, tag, x, y) {
            _super.call(this, assets.getResult(pathString));
            this._tag = tag ? tag : config.TILE_BLANK;
            this.x = x;
            this.y = y;
            this._width = 40;
            this._height = 40;
        }
        return Tile;
    })(createjs.Bitmap);
    objects.Tile = Tile;
})(objects || (objects = {}));
//# sourceMappingURL=tile.js.map