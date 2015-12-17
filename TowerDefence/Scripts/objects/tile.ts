module objects {

    export class Tile extends createjs.Bitmap {

        protected _width: number;
        protected _height: number;
        protected _tag: number;

        /**General Tile object, to be inherited by direction tile */
        constructor(pathString: string, tag:number, x: number, y: number) {
            super(assets.getResult(pathString));   
            this._tag = tag ? tag : config.TILE_BLANK;
            this.x = x;
            this.y = y;
            this._width = 40;
            this._height = 40;           
        }
    }
}