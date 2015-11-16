var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.call(this);
        }
        // PUBLIC 
        Level1.prototype.start = function () {
            console.log("level1");
            this._background = new objects.Background("grass_background");
            this.addChild(this._background);
            this._enemy = new objects.Enemy(redDragonAtlas, "redDragon", 100, 100, 10, 2, config.DIRECTION_DOWN);
            this.addChild(this._enemy);
            this._tile_up = new objects.DirectionTile("direction_down", config.DIRECTION_DOWN, 100, 350);
            this.addChild(this._tile_up);
            stage.addChild(this);
        }; //end of start
        Level1.prototype.update = function () {
            this._tile_up.detectObject_applyDirection(this._enemy);
            this._enemy.update();
        }; // end of update 
        return Level1;
    })(objects.Scene);
    states.Level1 = Level1;
})(states || (states = {}));
//# sourceMappingURL=level1.js.map