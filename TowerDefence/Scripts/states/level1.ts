module states {

    export class Level1 extends objects.Scene {

        // PRIVATE VAR
        private _background: objects.Background;
        private _collion: managers.Collsion;
        private _menu: createjs.Bitmap;
        private _enemyNumber: number;

        constructor() { super(); }


        // PUBLIC 
        public start(): void {

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
           /*
            for (var i = 0; i < enemies.length; i++) {
                this.addChild(enemies[i]);
            }*/
                        

             // tower
            towers = [];
            towers.push(new objects.Tower(assets.getResult("ta1"),"ta", 250, 250, 2, 100, 30, 1));

            towers.push(new objects.Tower(assets.getResult("ta1"), "ta", 300, 250, 2, 100, 30, 1));

            towers.push(new objects.Tower(assets.getResult("tb1"), "tb", 300, 300, 2, 100, 30, 1));
           

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

        }//end of start

        public update(): void {        

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
                    this._collion.updateTowerVsEnemy(towers[t], enemies[e])
                }                
            }

                        
        }// end of update 

    }
}