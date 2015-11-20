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
            // managers: collision
            this._collion = new managers.Collsion();
            // background
            this._background = new objects.Background("grass_background");
            this.addChild(this._background);
            // enemy
            enemyArray = [];
            enemyArray.push(new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, 100, 64, 64, 1, config.DIRECTION_DOWN));
            enemyArray.push(new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, 100 - 128, 64, 64, 1, config.DIRECTION_DOWN));
            enemyArray.push(new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, 100 - 128 * 4, 64, 64, 1, config.DIRECTION_DOWN));
            for (var i = 0; i < enemyArray.length; i++) {
                this.addChild(enemyArray[i]);
            }
            //console.log(enemyArray.length);
            // tower
            this._ta1 = new objects.Tower(assets.getResult("ta1"), 250, 250, 2, 300, 1, 1);
            this._towerArray = [];
            this._towerArray.push(this._ta1);
            for (var i = 0; i < this._towerArray.length; i++) {
                this.addChild(this._towerArray[i]);
            }
            bulletArray = [];
            for (var i = 0; i < 10; i++) {
                bulletArray[i] = new objects.Bullet(assets.getResult("bullet_red8"), "bullet", null, null, 5, 10, 8, 8, true);
                this.addChild(bulletArray[i]);
            }
            this._menu = new createjs.Bitmap(assets.getResult("menu_bar"));
            this._menu.x = 0;
            this._menu.y = 432;
            this.addChild(this._menu);
            // direction tiles
            this._direction_right = new objects.DirectionTile("direction_right", config.DIRECTION_RIGHT, 100, 350);
            this.addChild(this._direction_right);
            this._direction_up = new objects.DirectionTile("direction_up", config.DIRECTION_UP, 600, 350);
            this.addChild(this._direction_up);
            this._direction_left = new objects.DirectionTile("direction_left", config.DIRECTION_LEFT, 600, 100);
            this.addChild(this._direction_left);
            this._direction_down = new objects.DirectionTile("direction_down", config.DIRECTION_DOWN, 100, 100);
            this.addChild(this._direction_down);
            stage.addChild(this);
        }; //end of start
        Level1.prototype.update = function () {
            for (var i = 0; i < this._towerArray.length; i++) {
                for (var j = 0; j < enemyArray.length; j++) {
                    this._direction_right.detectObject_applyDirection(enemyArray[j]);
                    this._direction_up.detectObject_applyDirection(enemyArray[j]);
                    this._direction_left.detectObject_applyDirection(enemyArray[j]);
                    this._direction_down.detectObject_applyDirection(enemyArray[j]);
                    enemyArray[j].update();
                    //this._towerArray[i].fireAt(this._towerArray[i].getTarget());
                    this._collion.updateTowerVsEnemy(this._towerArray[i], enemyArray[j]);
                }
            }
            for (var i = 0; i < bulletArray.length; i++) {
                bulletArray[i].update();
                for (var j = 0; j < enemyArray.length; j++) {
                    this._collion.updateBulletVsEnemy(bulletArray[i], enemyArray[j]);
                }
            }
        }; // end of update 
        return Level1;
    })(objects.Scene);
    states.Level1 = Level1;
})(states || (states = {}));
//# sourceMappingURL=level1.js.map