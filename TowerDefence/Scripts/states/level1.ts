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

        // PRIVATE VAR

        private _live: number;
        
        //label
        private _restEnemiesLabel: objects.Label;
        private _livesLabel: objects.Label;
        private _moneyLabel: objects.Label;
        private _playAgainButton: objects.Button;
        private _levelLabel: objects.Label; 
        private _nextButton: objects.Button;
        private _exitButton: objects.Button;
        // game over
        private _gameOverLabel: objects.Label;

        constructor() { super(); }


        // PUBLIC 
        public start(): void {
            
             //*************************************** change this each level *************
            scoreBoard = new managers.ScoreBoard(100, 500, 1);

            // mapString
            mapString = new Array<String>();
            mapString = [
                " ", " ", " ", "sd"," ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",
                " ", " ", " ", "p", " ", " ", "r", "p", "p", "p", "p", "p", "p", "d", " ", " ",
                " ", " ", " ", "p", " ", " ", "p", " ", " ", " ", " ", " ", " ", "p", " ", " ",
                " ", " ", " ", "p", " ", " ", "p", " ", " ", " ", " ", " ", " ", "p", " ", " ",
                " ", " ", " ", "p", " ", " ", "p", " ", " ", " ", " ", " ", " ", "p", " ", " ",
                " ", " ", " ", "p", " ", " ", "p", " ", " ", " ", " ", " ", " ", "p", " ", " ",
                " ", " ", " ", "p", " ", " ", "p", " ", " ", " ", " ", " ", " ", "p", " ", " ",
                " ", " ", " ", "p", " ", " ", "p", " ", " ", " ", " ", " ", " ", "p", " ", " ",
                " ", " ", " ", "p", " ", " ", "p", " ", " ", " ", " ", " ", " ", "p", " ", " ",
                " ", " ", " ", "p", " ", " ", "p", " ", " ", " ", " ", " ", " ", "p", " ", " ",
                " ", " ", " ", "r", "p", "p", "u", " ", " ", " ", " ", " ", " ", "h", " ", " ",
                "m1", "", "",  "",  "",  "",  "",  "",  "",  "",  "",  "",  "",  "",  "",  ""
            ];
             // ********************************************************************************

            collision = new managers.Collision();
            waveManager = new managers.WaveManager(scoreBoard.getLevel());

            // arrange tiles
            blankTiles = new Array<objects.Tile>();
            directionTiles = [];
            weaponButtons = [];
            

            for (var i = 0; i < mapString.length; i++) {
                
                // set the x,y coordinates for tile, according to i(index)
                var gridY = 0, gridX = 0; 

                gridY = Math.floor(i / config.TileNumInRow); // config.TileNumInRow = 16
                gridX = i % config.TileNumInRow;

                var y = gridY * config.TileHeight + config.TileHeight * .5; // 
                var x = gridX * config.TileWidth + config.TileWidth * .5;
               
                switch (mapString[i]) {                   
                    
                    // blank=grass
                    case " ":
                        // add new blank tile to level 
                        // only blank tile can be placed a tower, store in blankTiles
                        // in tower drag/drop event detect the blank area;                        
                        blankTiles.push(new objects.Tile("grass", config.TILE_BLANK, x, y,true));
                        this.addChild(blankTiles[blankTiles.length-1]);
                        break;

                    // direction
                    case "d":
                        directionTiles.push(new objects.DirectionTile("direction_down", config.TILE_DIRECTION, x, y, config.DIRECTION_DOWN, true));//direction_down
                        this.addChild(directionTiles[directionTiles.length - 1]);
                        break;

                    case "u":
                        // add new UP directiontile to level
                        // add to directionTiles, to be used for collision
                        directionTiles.push(new objects.DirectionTile("direction_up", config.TILE_DIRECTION, x, y, config.DIRECTION_UP,true));
                        this.addChild(directionTiles[directionTiles.length - 1]);
                        break;

                    case "l":
                        // add new LEFT directiontile to level
                        // add to directionTiles, to be used for collision
                        directionTiles.push(new objects.DirectionTile("direction_left", config.TILE_DIRECTION, x, y, config.DIRECTION_LEFT,true));
                        this.addChild(directionTiles[directionTiles.length - 1]);
                        break;

                    case "r":
                        // add new RIGHT directiontile to level
                        // add to directionTiles, to be used for collision
                        directionTiles.push(new objects.DirectionTile("direction_right", config.TILE_DIRECTION, x, y, config.DIRECTION_RIGHT,true));
                        this.addChild(directionTiles[directionTiles.length - 1]);
                        break;

                    // menu => weaponButton, drag/drop to build tower
                    case "m1":
                        weaponButtons.push(new objects.WeaponButton(config.TowerType_1, x, y));                
                        break;

                    case "m2":                        
                        weaponButtons.push(new objects.WeaponButton(config.TowerType_2, x, y));
                        break;

                    // start piont with direction
                    case "sd":
                        // START-down point for enemy, it has direction to initialize enemy's direction, while no need to be added to directionTiles to check collision
                        startTile = new objects.DirectionTile("startPoint", config.TILE_START, x, y, config.DIRECTION_DOWN,true);
                        this.addChild(startTile);
                        break;

                    case "su":
                        // START-up point for enemy, it has direction to initialize enemy's direction, while no need to be added to directionTiles to check collision
                        startTile = new objects.DirectionTile("startPoint", config.TILE_START, x, y, config.DIRECTION_UP,true);
                        this.addChild(startTile);
                        break;

                    case "sl":
                        // START-left point for enemy, it has direction to initialize enemy's direction, while no need to be added to directionTiles to check collision
                        startTile = new objects.DirectionTile("startPoint", config.TILE_START, x, y, config.DIRECTION_LEFT,true);
                        this.addChild(startTile);
                        break;

                    case "sr":
                        // START-right point for enemy, it has direction to initialize enemy's direction, while no need to be added to directionTiles to check collision
                        
                        startTile = new objects.DirectionTile("startPoint", config.TILE_START, x, y, config.DIRECTION_RIGHT, true);
                        this.addChild(startTile);
                        break;

                    case "h":
                        homeTile = new objects.Tile("home", config.TILE_PATH, x, y, true);
                        this.addChild(homeTile);
                        break;
                    // path
                    case "p":
                        // add path tile to level;
                        this.addChild(new objects.Tile("path", config.TILE_PATH, x, y, true));
                        break;                    
                }
            };

           
            createjs.Sound.play("Forest-Chase", null, null, null, 1, 0.1, null);
            createjs.Sound.play("horn",null,700);
            
            towers = [];
            enemies = [];
            bullets1 = [];
            bullets2 = [];
            bullets3 = [];
            
            // labels
            
            this._livesLabel = new objects.Label("Lives: " + scoreBoard.getLives().toString(), "15px Showcard Gothic", "#00f", 5, 10, false);
            this.addChild(this._livesLabel);
            this._moneyLabel = new objects.Label("Money: " + scoreBoard.getMoney().toString(), "15px Showcard Gothic", "#0ff", 5, 30, false);
            this.addChild(this._moneyLabel);

            this._levelLabel = new objects.Label("Level: " + scoreBoard.getLevel(), "15px Showcard Gothic", "#00f", 550, 10, false);
            this.addChild(this._levelLabel);
            this._restEnemiesLabel = new objects.Label("Enemies: " + (waveManager.getTotalNumberOfEnemy() - waveManager.getCurrentNumberOfEnemy()), "15px Showcard Gothic", "#f00", 530, 30, false);
            this.addChild(this._restEnemiesLabel);

            // bullet arrays
            
            bullets1.push(new objects.Bullet(assets.getResult("bullet1"), "bullet", -30, -30, 5, 4, 8, 8, true));
            this.addChild(bullets1[0]);

            bullets2.push(new objects.Bullet(assets.getResult("bullet2"), "bullet", -30, -30, 10, 4, 8, 8, true));
            this.addChild(bullets2[0]);

            bullets3.push(new objects.Bullet(assets.getResult("bullet3"), "bullet", -30, -30, 15, 4, 8, 8, true));
            this.addChild(bullets3[0]);

            // for game over
            this._gameOverLabel = new objects.Label("Game Over", "30px Showcard Gothic", "#000", 320, 100,true);

            //this._gameOverLabel.textAlign = "center";
            this.addChild(this._gameOverLabel);
            this._gameOverLabel.visible = false;

            // playAgainButton
            this._playAgainButton = new objects.Button("again_button", 320, 240,null,null,true);
            this._playAgainButton.on("click", this._clickPlayAgainButton, this);
            this._playAgainButton.visible = false;
            this.addChild(this._playAgainButton);

            // nextbutton
            this._nextButton = new objects.Button("next_button", 320, 280, null, null, true);
            this._nextButton.on("click", this._clickNextButton, this);
            this._nextButton.visible = false;
            this.addChild(this._nextButton);

            // exitButton
            this._exitButton = new objects.Button("exit_button", 320, 350, null, null, true);
            this._exitButton.on("click", this._clickExitButton, this);
            this._exitButton.visible = false;
            this.addChild(this._exitButton);

            stage.addChild(this);

        }//end of start

        private _clickExitButton(event: createjs.MouseEvent): void {
            console.log("trying to close window");
            window.close();
        }

        private _clickNextButton(event: createjs.MouseEvent): void {
            this._loadGame(config.STATE_LEVEL2);
        }
        private _clickPlayAgainButton(event: createjs.MouseEvent): void {
            this._loadGame(config.STATE_LEVEL1);
        }

        private _loadGame(level:number): void {
            state = level;
            changeState(state);
    
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

                    this._restEnemiesLabel.text = "Enemies: " + (waveManager.getTotalNumberOfEnemy() - waveManager.getCurrentNumberOfEnemy());

                } else { 
                    // level passed                  
                    console.log("Level Complete, need to go to next level");
                    this._nextButton.visible = true;
                }
               
            } else {
                // game over
                this._gameOverLabel.visible = true;
                this._playAgainButton.visible = true;
                this._exitButton.visible = true;
            }
            
        }// end of update 

    }
}