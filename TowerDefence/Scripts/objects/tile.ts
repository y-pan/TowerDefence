module objects {

    export class Tile extends createjs.Bitmap {

        protected _width: number;
        protected _height: number;
        protected _tag: number;

        /**General Tile object, to be inherited by direction tile, width and height are same with config.TileWidth, TileHeight*/
        constructor(pathString: string, tag:number, x: number, y: number,isCenterd:boolean) {
            super(assets.getResult(pathString));   
            this._tag = tag ? tag : config.TILE_BLANK;
            
            this._width = config.TileWidth;
            this._height = config.TileHeight;   
            this.x = x;
            this.y = y;
            if (isCenterd) {
                this.regX = this._width * .5;
                this.regY = this._height * .5;
            }                    
        }
    }
}