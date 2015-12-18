var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Tile = (function (_super) {
        __extends(Tile, _super);
        /**General Tile object, to be inherited by direction tile, width and height are same with config.TileWidth, TileHeight*/
        function Tile(pathString, tag, x, y, isCenterd) {
            _super.call(this, assets.getResult(pathString));
            this._tag = tag ? tag : config.TILE_BLANK;
            this._width = config.TileWidth;
            this._height = config.TileHeight;
            this.x = x;
            this.y = y;
            if (isCenterd) {
                this.regX = this._width * .5;
                this.regY = this._height * .5;
            }
        }
        return Tile;
    })(createjs.Bitmap);
    objects.Tile = Tile;
})(objects || (objects = {}));
//# sourceMappingURL=tile.js.map