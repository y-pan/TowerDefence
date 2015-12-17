module states {
/**
 * File Name: Level1
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: Level1 object extends objects.Scene, game level 1
 * History: 1.0
 */
    export class Level1 extends objects.Scene {

        // to do: add labels for restAnemyNumber

        // PRIVATE VAR
        private _background: objects.Background;
        private _menu: createjs.Bitmap;
        private _live: number;
        
        //label
        private _restEnemiesLabel: objects.Label;
        private _livesLabel: objects.Label;
        private _moneyLabel: objects.Label;
        private _playAgainButton: objects.Button;

        // game over
        private _gameOverLabel: objects.Label;

        constructor() { super(); }


        // PUBLIC 
        public start(): void {
            createjs.Sound.play("Forest-Chase", null, null, null, 1, null, null);
            createjs.Sound.play("horn",null,700);
            weaponButtons = [];
            towers = [];
            enemies = [];
            bullets1 = [];
            bullets2 = [];
            bullets3 = [];
            directionTiles = [];

            collision = new managers.Collision();
            scoreBoard = new managers.ScoreBoard(100,500,1);
        
            waveManager = new managers.WaveManager(scoreBoard.getLevel());

            // background
            this._background = new objects.Background("background_1");
            this.addChild(this._background);
            
            // labels
            this._livesLabel = new objects.Label("Lives: " + scoreBoard.getLives().toString(), "15px Showcard Gothic", "#00f", 5, 10, false);
            this.addChild(this._livesLabel);
            this._restEnemiesLabel = new objects.Label("Enemies: " + (waveManager.getTotalNumberOfEnemy() - waveManager.getCurrentNumberOfEnemy()), "15px Showcard Gothic", "#f00", 5, 50, false);
            this.addChild(this._restEnemiesLabel);

            this._moneyLabel = new objects.Label("Money: " + scoreBoard.getMoney().toString(), "15px Showcard Gothic", "#0ff", 5, 30, false);
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
            this._playAgainButton = new objects.Button("again_button", 320, 240,null,null,true);
            this._playAgainButton.on("click", this._clickPlayAgainButton, this);
            this._playAgainButton.visible = false;
            this.addChild(this._playAgainButton);


            stage.addChild(this);

        }//end of start


        private _clickPlayAgainButton(event: createjs.MouseEvent): void {
            this._resetGame();
        }

        private _resetGame(): void {
            
            changeState(states.Level1);
        }

        public update(): void {        
                        
            if (scoreBoard.getLives() > 0) {

                if (waveManager.getTotalNumberOfEnemy() > waveManager.getEnemyKilledOrEscaped()) {

                    waveManager.update();// reuse enemy if necessary, or add enemy to enemies array

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
                            collision.updateTowerVsEnemy(towers[t], enemies[e])
                        }
                    }

                    // update labels
                    this._livesLabel.text = "Lives: " + scoreBoard.getLives();
                    this._moneyLabel.text = "Money: " + scoreBoard.getMoney();
                    //console.log("hehe");
                    console.log("enemies k.esc-On-total: " + waveManager.getEnemyKilledOrEscaped() + " - " + waveManager.getCurrentNumberOfEnemy() + " - " + waveManager.getTotalNumberOfEnemy());
                    this._restEnemiesLabel.text = "Enemies: " + (waveManager.getTotalNumberOfEnemy() - waveManager.getCurrentNumberOfEnemy());

                } else { // all enemies completed, level completed, go to next level

                    // show next level button, change state to next level
                    // +-=-==--=-=-=--=-=-=
                    console.log("Level Complete, need to go to next level");

                }
                
                // check if level complete
            } else {
                this._gameOverLabel.visible = true;
                this._playAgainButton.visible = true;
            }
            
            // gameover or next level
            
        }// end of update 

    }
}