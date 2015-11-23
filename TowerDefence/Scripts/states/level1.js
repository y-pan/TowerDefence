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
            weaponButtons = [];
            towers = [];
            enemies = [];
            bullets1 = [];
            bullets2 = [];
            bullets3 = [];
            directionTiles = [];
            collision = new managers.Collsion();
            scoreBoard = new managers.ScoreBoard();
            // background
            this._background = new objects.Background("grass_background");
            this.addChild(this._background);
            // enemy               
            enemies.push(new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, 100, 64, 64, 2, config.DIRECTION_DOWN));
            enemies.push(new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, 100 - 128, 64, 64, 2, config.DIRECTION_DOWN));
            enemies.push(new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, 100 - 128 * 4, 64, 64, 2, config.DIRECTION_DOWN));
            towers.push(new objects.Tower(assets.getResult(config.TowerType_1 + 1), config.TowerType_1, 250, 250));
            // bullet arrays
            bullets1.push(new objects.Bullet(assets.getResult("bullet1"), "bullet", -30, -30, 5, 4, 8, 8, true));
            this.addChild(bullets1[0]);
            bullets2.push(new objects.Bullet(assets.getResult("bullet2"), "bullet", -30, -30, 10, 4, 8, 8, true));
            this.addChild(bullets2[0]);
            bullets3.push(new objects.Bullet(assets.getResult("bullet3"), "bullet", -30, -30, 15, 4, 8, 8, true));
            this.addChild(bullets3[0]);
            this._menu = new createjs.Bitmap(assets.getResult("menu_bar"));
            this._menu.x = 0;
            this._menu.y = 432;
            this.addChild(this._menu);
            // direction tiles
            directionTiles.push(new objects.DirectionTile("direction_right", config.DIRECTION_RIGHT, 100, 350));
            directionTiles.push(new objects.DirectionTile("direction_up", config.DIRECTION_UP, 600, 350));
            directionTiles.push(new objects.DirectionTile("direction_left", config.DIRECTION_LEFT, 600, 100));
            directionTiles.push(new objects.DirectionTile("direction_down", config.DIRECTION_DOWN, 100, 100));
            for (var i = 0; i < directionTiles.length; i++) {
                // if comment this out, won't show but the functionality exits
                this.addChild(directionTiles[i]);
            }
            weaponButtons.push(new objects.WeaponButton(config.TowerType_1, 1));
            weaponButtons.push(new objects.WeaponButton(config.TowerType_2, 2));
            stage.addChild(this);
        }; //end of start
        Level1.prototype.update = function () {
            console.log("b1: " + bullets1.length + ", b2: " + bullets2.length + ", b3:" + bullets3.length);
            // enemys, towers, bullets
            for (var e = 0; e < enemies.length; e++) {
                // apply directions
                for (var d = 0; d < directionTiles.length; d++) {
                    directionTiles[d].detectObject_applyDirection(enemies[e]);
                }
                // update enemy
                enemies[e].update();
                for (var b = 0; b < bullets1.length; b++) {
                    bullets1[b].update();
                    collision.updateBulletVsEnemy(bullets1[b], enemies[e]);
                }
                for (var b = 0; b < bullets2.length; b++) {
                    bullets2[b].update();
                    collision.updateBulletVsEnemy(bullets2[b], enemies[e]);
                }
                for (var b = 0; b < bullets3.length; b++) {
                    bullets3[b].update();
                    collision.updateBulletVsEnemy(bullets3[b], enemies[e]);
                }
                for (var t = 0; t < towers.length; t++) {
                    collision.updateTowerVsEnemy(towers[t], enemies[e]);
                }
            }
        }; // end of update 
        return Level1;
    })(objects.Scene);
    states.Level1 = Level1;
})(states || (states = {}));
//# sourceMappingURL=level1.js.map