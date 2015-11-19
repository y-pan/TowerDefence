var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        // bulletArray ?
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
            this._enemyNumber = 5;
            //this._enemy = new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, 100, 64, 64, 1, config.DIRECTION_DOWN);
            this._enemyArray = [];
            for (var i = 0; i < this._enemyNumber; i++) {
                this._enemyArray.push(new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, (100 - 64 * i), 64, 64, 1, config.DIRECTION_DOWN));
                console.log(i);
            }
            for (var i = 0; i < this._enemyArray.length; i++) {
                this.addChild(this._enemyArray[i]);
            }
            console.log(this._enemyArray.length);
            // direction tiles
            this._direction_right = new objects.DirectionTile("direction_right", config.DIRECTION_RIGHT, 100, 350);
            this.addChild(this._direction_right);
            this._direction_up = new objects.DirectionTile("direction_up", config.DIRECTION_UP, 600, 350);
            this.addChild(this._direction_up);
            this._direction_left = new objects.DirectionTile("direction_left", config.DIRECTION_LEFT, 600, 100);
            this.addChild(this._direction_left);
            this._direction_down = new objects.DirectionTile("direction_down", config.DIRECTION_DOWN, 100, 100);
            this.addChild(this._direction_down);
            // tower
            this._ta1 = new objects.Tower(assets.getResult("ta1"), 150, 150, 2, 300, 1, 1);
            this._towerArray = [];
            this._towerArray.push(this._ta1);
            for (var i = 0; i < this._towerArray.length; i++) {
                this.addChild(this._towerArray[i]);
            }
            // bullet
            //this._bullet = new objects.Bullet(assets.getResult("bullet_g8"), null, null, 5, 5, 8, 8, true);
            //this.addChild(this._bullet);
            bulletArray = [];
            for (var i = 0; i < 10; i++) {
                bulletArray[i] = new objects.Bullet(assets.getResult("bullet_g8"), "bullet", null, null, 5, 20, 8, 8, true);
                this.addChild(bulletArray[i]);
            }
            this._menu = new createjs.Bitmap(assets.getResult("menu_bar"));
            this._menu.x = 0;
            this._menu.y = 432;
            this.addChild(this._menu);
            stage.addChild(this);
        }; //end of start
        Level1.prototype.update = function () {
            /*
            this._direction_right.detectObject_applyDirection(this._enemy);
            this._direction_up.detectObject_applyDirection(this._enemy);
            this._direction_left.detectObject_applyDirection(this._enemy);
            this._direction_down.detectObject_applyDirection(this._enemy);
            */
            for (var i = 0; i < this._towerArray.length; i++) {
                for (var j = 0; j < this._enemyArray.length; j++) {
                    this._direction_right.detectObject_applyDirection(this._enemyArray[j]);
                    this._direction_up.detectObject_applyDirection(this._enemyArray[j]);
                    this._direction_left.detectObject_applyDirection(this._enemyArray[j]);
                    this._direction_down.detectObject_applyDirection(this._enemyArray[j]);
                    this._enemyArray[j].update();
                    this._collion.updateTowerVsEnemy(this._towerArray[i], this._enemyArray[j]);
                }
            }
            //this._ta1.fireAt(this._enemy);
            for (var i = 0; i < bulletArray.length; i++) {
                bulletArray[i].update();
                this._collion.updateBulletVsEnemy(bulletArray[i], this._enemy);
            }
        }; // end of update 
        return Level1;
    })(objects.Scene);
    states.Level1 = Level1;
})(states || (states = {}));
//# sourceMappingURL=level1.js.map