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
            isBulletToAdd = false;
            isTowerToAdd = false;
            // managers: collision
            this._collion = new managers.Collsion();
            // background
            this._background = new objects.Background("grass_background");
            this.addChild(this._background);
            // enemy                    
            enemies = [];
            enemies.push(new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, 100, 64, 64, 2, config.DIRECTION_DOWN));
            enemies.push(new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, 100 - 128, 64, 64, 2, config.DIRECTION_DOWN));
            enemies.push(new objects.Enemy(redDragonAtlas, "redDragon", 5000, 100, 100 - 128 * 4, 64, 64, 2, config.DIRECTION_DOWN));
            for (var i = 0; i < enemies.length; i++) {
                this.addChild(enemies[i]);
            }
            // tower
            towers = [];
            towers.push(new objects.Tower(assets.getResult("ta1"), "ta", 250, 250, 2, 100, 30, 1));
            towers.push(new objects.Tower(assets.getResult("ta1"), "ta", 300, 250, 2, 100, 30, 1));
            towers.push(new objects.Tower(assets.getResult("tb1"), "tb", 300, 300, 2, 100, 30, 1));
            for (var i = 0; i < towers.length; i++) {
                this.addChild(towers[i]);
            }
            // bullet arrays
            bullets1 = [];
            bullets2 = [];
            bullets3 = [];
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
            directionTiles = [];
            directionTiles.push(new objects.DirectionTile("direction_right", config.DIRECTION_RIGHT, 100, 350));
            directionTiles.push(new objects.DirectionTile("direction_up", config.DIRECTION_UP, 600, 350));
            directionTiles.push(new objects.DirectionTile("direction_left", config.DIRECTION_LEFT, 600, 100));
            directionTiles.push(new objects.DirectionTile("direction_down", config.DIRECTION_DOWN, 100, 100));
            for (var i = 0; i < directionTiles.length; i++) {
                // if comment this out, won't show but the functionality exits
                this.addChild(directionTiles[i]);
            }
            stage.addChild(this);
        }; //end of start
        Level1.prototype.update = function () {
            //
            if (isBulletToAdd) {
                var i = 0;
                for (i = 0; i < bullets1.length; i++) {
                    if (!this.contains(bullets1[i])) {
                        this.addChild(bullets1[i]);
                    }
                }
                for (i = 0; i < bullets2.length; i++) {
                    if (!this.contains(bullets2[i])) {
                        this.addChild(bullets2[i]);
                    }
                }
                for (i = 0; i < bullets3.length; i++) {
                    if (!this.contains(bullets3[i])) {
                        this.addChild(bullets3[i]);
                    }
                }
                isBulletToAdd = false;
            }
            if (isTowerToAdd) {
                for (var i = 0; i < towers.length; i++) {
                    if (!this.contains(towers[i])) {
                        this.addChild(towers[i]);
                    }
                }
                isTowerToAdd = false;
            }
            console.log("children: " + this.numChildren + "| b1: " + bullets1.length + ", b2: " + bullets2.length + ", b3:" + bullets3.length);
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
                    this._collion.updateBulletVsEnemy(bullets1[b], enemies[e]);
                }
                for (var b = 0; b < bullets2.length; b++) {
                    bullets2[b].update();
                    this._collion.updateBulletVsEnemy(bullets2[b], enemies[e]);
                }
                for (var b = 0; b < bullets3.length; b++) {
                    bullets3[b].update();
                    this._collion.updateBulletVsEnemy(bullets3[b], enemies[e]);
                }
                for (var t = 0; t < towers.length; t++) {
                    this._collion.updateTowerVsEnemy(towers[t], enemies[e]);
                }
            }
            // update tower level(including bullet)
            for (var t = 0; t < towers.length; t++) {
                var nl = towers[t].getNewLevel();
                var l = towers[t].getLevel();
                if (nl != l) {
                    towers[t].setLevel(nl);
                }
            }
        }; // end of update 
        return Level1;
    })(objects.Scene);
    states.Level1 = Level1;
})(states || (states = {}));
//# sourceMappingURL=level1.js.map