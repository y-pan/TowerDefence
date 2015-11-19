module states {

    export class Level1 extends objects.Scene {

        // PRIVATE VAR
        private _background: objects.Background;
        private _direction_right: objects.DirectionTile;
        private _direction_left: objects.DirectionTile;

        private _direction_up: objects.DirectionTile;
        private _direction_down: objects.DirectionTile;

        // ememy
        private _enemy: objects.Enemy;

        private _menu: createjs.Bitmap;

        // tower
        private _ta1: objects.Tower;

        // bullet
        private _bullet: objects.Bullet;

        constructor() { super(); }


        // PUBLIC 
        public start(): void {
            // background
            this._background = new objects.Background("grass_background");
            this.addChild(this._background);

            // enemy
            this._enemy = new objects.Enemy(redDragonAtlas, "redDragon", 100, 100, 64, 64, 10, 1, config.DIRECTION_DOWN);

            this.addChild(this._enemy);

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
            this._ta1 = new objects.Tower(assets.getResult("ta1"), 300, 200, 2, 1, 1);
            this.addChild(this._ta1);

            // bullet
            //this._bullet = new objects.Bullet(assets.getResult("bullet_g8"), null, null, 5, 5, 8, 8, true);
            //this.addChild(this._bullet);

            bullets_green = [];
            for (var i = 0; i < 10; i++) {
                bullets_green[i] = new objects.Bullet(assets.getResult("bullet_g8"), null, null, 5, 20, 8, 8, true);
                this.addChild(bullets_green[i]);
            }

            this._menu = new createjs.Bitmap(assets.getResult("menu_bar"));
            this._menu.x = 0;
            this._menu.y = 432;
            this.addChild(this._menu);


            stage.addChild(this);
        }//end of start

        public update(): void {
            this._direction_right.detectObject_applyDirection(this._enemy);
            this._direction_up.detectObject_applyDirection(this._enemy);
            this._direction_left.detectObject_applyDirection(this._enemy);
            this._direction_down.detectObject_applyDirection(this._enemy);
            this._enemy.update();
            this._ta1.update(this._enemy);
            
            for (var i = 0; i < bullets_green.length; i++) {
                bullets_green[i].update();
            }
            


            
        }// end of update 


    }
}