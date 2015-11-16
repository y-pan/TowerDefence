module states {

    export class Level1 extends objects.Scene {

        // PRIVATE VAR
        private _background: objects.Background;
        private _tile_up: objects.DirectionTile;
        // ememy
        private _enemy: objects.Enemy;

        constructor() { super(); }


        // PUBLIC 
        public start(): void {
            console.log("level1");
            this._background = new objects.Background("grass_background");
            this.addChild(this._background);

            this._enemy = new objects.Enemy(redDragonAtlas, "redDragon", 100, 100, 10, 2, config.DIRECTION_DOWN);

            this.addChild(this._enemy);

            this._tile_up = new objects.DirectionTile("direction_down", config.DIRECTION_DOWN, 100, 350);
            this.addChild(this._tile_up);

            stage.addChild(this);
        }//end of start

        public update(): void {
            this._tile_up.detectObject_applyDirection(this._enemy);
            this._enemy.update();
            
        }// end of update 


    }
}