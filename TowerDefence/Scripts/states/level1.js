var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    /**
     * File Name: Level1
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: Level1 object extends objects.Scene, game level 1
     * History: 1.0
     */
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.call(this);
        }
        // PUBLIC 
        Level1.prototype.start = function () {
            createjs.Sound.play("Forest-Chase", null, null, null, 1, null, null);
            createjs.Sound.play("horn", null, 700);
            weaponButtons = [];
            towers = [];
            enemies = [];
            bullets1 = [];
            bullets2 = [];
            bullets3 = [];
            directionTiles = [];
            collision = new managers.Collision();
            scoreBoard = new managers.ScoreBoard(100, 500, 1);
            waveManager = new managers.WaveManager(scoreBoard.getLevel());
            // background
            this._background = new objects.Background("background_1");
            this.addChild(this._background);
            // labels
            this._livesLabel = new objects.Label("Lives: " + scoreBoard.getLives().toString(), "15px Showcard Gothic", "#fff", 5, 10, false);
            this.addChild(this._livesLabel);
            //this._scoreLabel = new objects.Label("Score: " + scoreBoard.getScore().toString(), "30px Showcard Gothic", "#000", 150, 10, false);
            this._moneyLabel = new objects.Label("Money: " + scoreBoard.getMoney().toString(), "15px Showcard Gothic", "#fff", 5, 60, false);
            this.addChild(this._moneyLabel);
            //"Tower Defence","30px Showcard Gothic", "#000", canvasWidth*.5, 50,true
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
            directionTiles.push(new objects.DirectionTile("direction_right", config.DIRECTION_RIGHT, 120, 420));
            directionTiles.push(new objects.DirectionTile("direction_right", config.DIRECTION_RIGHT, 320, 48));
            directionTiles.push(new objects.DirectionTile("direction_up", config.DIRECTION_UP, 320, 420));
            directionTiles.push(new objects.DirectionTile("direction_down", config.DIRECTION_DOWN, 570, 48));
            weaponButtons.push(new objects.WeaponButton(config.TowerType_1, 1));
            weaponButtons.push(new objects.WeaponButton(config.TowerType_2, 2));
            // for game over
            this._gameOverLabel = new objects.Label("Game Over", "30px Consolas", "#0ff", 450, 100, true);
            this._gameOverLabel.textAlign = "center";
            this.addChild(this._gameOverLabel);
            this._gameOverLabel.visible = false;
            // playAgainButton
            this._playAgainButton = new objects.Button("again_button", 320, 240, null, null, true);
            this._playAgainButton.on("click", this._clickPlayAgainButton, this);
            this._playAgainButton.visible = false;
            this.addChild(this._playAgainButton);
            stage.addChild(this);
        }; //end of start
        Level1.prototype._clickPlayAgainButton = function (event) {
            this._resetGame();
        };
        Level1.prototype._resetGame = function () {
            changeState(states.Level1);
        };
        Level1.prototype.update = function () {
            //console.log("In update: enemies k-On-t: " + collision.getEnemyKilledCount() + " - " + waveManager.getCurrentNumberOfEnemy() + " - " + waveManager.getTotalNumberOfEnemy());
            if (scoreBoard.getLives() > 0) {
                if (waveManager.getTotalNumberOfEnemy() > waveManager.getEnemyKilledOrEscaped()) {
                    waveManager.update(); // reuse enemy if necessary, or add enemy to enemies array
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
                    // update labels
                    this._livesLabel.text = "Lives: " + scoreBoard.getLives();
                    this._moneyLabel.text = "Money: " + scoreBoard.getMoney();
                    //console.log("hehe");
                    console.log("enemies k.esc-On-total: " + waveManager.getEnemyKilledOrEscaped() + " - " + waveManager.getCurrentNumberOfEnemy() + " - " + waveManager.getTotalNumberOfEnemy());
                }
                else {
                    // show next level button, change state to next level
                    // +-=-==--=-=-=--=-=-=
                    console.log("Level Complete, need to go to next level");
                }
            }
            else {
                this._gameOverLabel.visible = true;
                this._playAgainButton.visible = true;
            }
            // gameover or next level
        }; // end of update 
        return Level1;
    })(objects.Scene);
    states.Level1 = Level1;
})(states || (states = {}));
//# sourceMappingURL=level1.js.map