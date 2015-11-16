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
            this._background = new objects.Background("grass_background");
            this.addChild(this._background);
            this._enemy = new objects.Enemy(redDragonAtlas, "redDragon", 100, 100, 10, 1, config.DIRECTION_DOWN);
            this.addChild(this._enemy);
            this._direction_right = new objects.DirectionTile("direction_right", config.DIRECTION_RIGHT, 100, 350);
            this.addChild(this._direction_right);
            this._direction_up = new objects.DirectionTile("direction_up", config.DIRECTION_UP, 600, 350);
            this.addChild(this._direction_up);
            this._direction_left = new objects.DirectionTile("direction_left", config.DIRECTION_LEFT, 600, 100);
            this.addChild(this._direction_left);
            this._direction_down = new objects.DirectionTile("direction_down", config.DIRECTION_DOWN, 100, 100);
            this.addChild(this._direction_down);
            this._ta1 = new objects.Tower(assets.getResult("ta1"), 300, 200, 2, 1, 1);
            this.addChild(this._ta1);
            this._menu = new createjs.Bitmap(assets.getResult("menu_bar"));
            this._menu.x = 0;
            this._menu.y = 432;
            this.addChild(this._menu);
            stage.addChild(this);
        }; //end of start
        Level1.prototype.update = function () {
            this._direction_right.detectObject_applyDirection(this._enemy);
            this._direction_up.detectObject_applyDirection(this._enemy);
            this._direction_left.detectObject_applyDirection(this._enemy);
            this._direction_down.detectObject_applyDirection(this._enemy);
            this._enemy.update();
            this._ta1.update(this._enemy);
        }; // end of update 
        return Level1;
    })(objects.Scene);
    states.Level1 = Level1;
})(states || (states = {}));
//# sourceMappingURL=level1.js.map