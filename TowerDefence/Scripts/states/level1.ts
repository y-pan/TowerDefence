module states {

    export class Level1 extends objects.Scene {

        // PRIVATE VAR
        private _background: objects.Background;
        private _direction_right: objects.DirectionTile;
        private _direction_left: objects.DirectionTile;

        private _direction_up: objects.DirectionTile;
        private _direction_down: objects.DirectionTile;

        private _collion: managers.Collsion;

        private _menu: createjs.Bitmap;

        // ememy

        private _enemyNumber: number;

        // tower
        //private _ta1: objects.Tower;
        //private _towerArray: objects.Tower[];


        constructor() { super(); }


        // PUBLIC 
        public start(): void {

            // managers: collision
            this._collion = new managers.Collsion();

            // background
            this._background = new objects.Background("grass_background");
            this.addChild(this._background);

            
            // enemy
                       

            enemyArray = [];
            
            enemyArray.push(new objects.Enemy(redDragonAtlas, "redDragon", 50, 100, 100, 64, 64, 3, config.DIRECTION_DOWN));  
            enemyArray.push(new objects.Enemy(redDragonAtlas, "redDragon", 50, 100, 100 - 128, 64, 64, 4, config.DIRECTION_DOWN));  
            enemyArray.push(new objects.Enemy(redDragonAtlas, "redDragon", 50, 100, 100 - 128 * 4, 64, 64, 2, config.DIRECTION_DOWN));  
           
            for (var i = 0; i < enemyArray.length; i++) {
                this.addChild(enemyArray[i]);
            }
                        

             // tower
            //this._ta1 = new objects.Tower(assets.getResult("ta1"), 250, 250, 2, 300, 1, 1);
            towerArray = [];
            towerArray.push(new objects.Tower(assets.getResult("ta1"), 250, 250, 2, 300, 50, 1));

            //towerArray.push(new objects.Tower(assets.getResult("ta1"), 450, 350, 2, 300, 1, 1));
            for (var i = 0; i < towerArray.length; i++) {              
                this.addChild(towerArray[i]);
            }


            // bullet arrays
            bullet1Array = [];
            bullet2Array = [];
            bullet3Array = [];

            for (var i = 0; i < 1; i++) {
                bullet1Array[i] = new objects.Bullet(assets.getResult("bullet1"),"bullet", null, null, 5, 4, 8, 8, true);
                this.addChild(bullet1Array[i]);
            }

            for (var i = 0; i < 1; i++) {
                bullet2Array[i] = new objects.Bullet(assets.getResult("bullet2"), "bullet", null, null, 10, 4,8, 8, true);
                this.addChild(bullet1Array[i]);
            }

            for (var i = 0; i < 1; i++) {
                bullet3Array[i] = new objects.Bullet(assets.getResult("bullet3"), "bullet", null, null, 15, 4, 8, 8, true);
                this.addChild(bullet1Array[i]);
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
        }//end of start

        public update(): void {          
            //console.log(createjs.Ticker.getTicks());
            // each tower 

            for (var e = 0; e < enemyArray.length; e++) {

                this._direction_right.detectObject_applyDirection(enemyArray[e]);
                this._direction_up.detectObject_applyDirection(enemyArray[e]);
                this._direction_left.detectObject_applyDirection(enemyArray[e]);
                this._direction_down.detectObject_applyDirection(enemyArray[e]);

                enemyArray[e].update();

                for (var b = 0; b < bullet1Array.length; b++) {
                    bullet1Array[b].update();
                    this._collion.updateBulletVsEnemy(bullet1Array[b], enemyArray[e]);
                }

                for (var t = 0; t < towerArray.length; t++) {
                    towerArray[t].setLevel(1);
                    this._collion.updateTowerVsEnemy(towerArray[t], enemyArray[e])
                }                
            }
            // update tower level
            for (var t = 0; t < towerArray.length; t++) {
                if (towerArray[t].getIsUpdatingLevel()) {
                    towerArray[t].setLevel(towerArray[t].getLevel() + 1);
                    //towerArray[t].setIsUpdatingLevel(false);
                    
                }
            }

        }// end of update 

    }
}