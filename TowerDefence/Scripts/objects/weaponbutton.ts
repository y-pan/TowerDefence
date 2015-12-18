
module objects {
/**
 * File Name: WeaponButton
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: WeaponButton object extends objects.Button, drag and drog weaponButton to create new weapon(tower)
 * History: 1.0
 */
    export class WeaponButton extends objects.Button {

        protected _towerPreview: createjs.Bitmap;
        protected _rangePreview: createjs.Shape;
        protected _towerType: string;
        protected _isDragging: boolean;
        //protected _gridNumber: number;

        protected _blankTileX: number;
        protected _blankTileY: number;
        protected _blankTileIndex: number; // -1 mean blanktile not available, cannot built tower

        /**Added this weaponbutton object to currentLevel by its constructor.
         * example: ("ta1",1)
         */
        constructor(towerType: string, x:number,y:number) {
            super(towerType + 1, 32, 455, config.TileWidth, config.TileHeight, true);

            this._towerType = towerType;

            this.x = x;
            this.y = y;

            this._createPreview();
            this._isDragging = false;

            this.on("pressmove", this.pressmoveWeaponButton, this);
            this.on("pressup", this.pressupWeaponButton, this);

            currentLevel.addChild(this);
        }


        pressmoveWeaponButton(event: createjs.MouseEvent): void {            
            this._movePreview();
            //this._showPreviewColor();
        }

        pressupWeaponButton(event: createjs.MouseEvent): void {
            if (this._isDragging && this._blankTileIndex >= 0) {
                if (scoreBoard.getMoney() >= config.TowerCost_Build) {


                    this._createTower(this._blankTileX, this._blankTileY);
                    createjs.Sound.play("powerUp");
                    scoreBoard.removeMoney(config.TowerCost_Build);
                    blankTiles.splice(this._blankTileIndex, 1);                         
                    this._blankTileIndex = -1;
                }                
            }
            this._resetPreview();
            this._isDragging = false;
        }

        // ------------------------------------ PRIVATE ------------------------------

        private _createTower(x:number, y:number): void {
            towers.push(new objects.Tower(assets.getResult(this._towerType + 1), this._towerType, x, y));
        }

        private _resetPreview(): void {
            this._towerPreview.x = -500;
            this._towerPreview.y = 0;
            this._rangePreview.x = -500;
            this._rangePreview.y = 0;
        }

        private _createPreview(): void {            

            // tower preview
            this._towerPreview = new createjs.Bitmap(assets.getResult(this._towerType + 1));
            this._towerPreview.regX = config.TileWidth * .5;
            this._towerPreview.regY = config.TileHeight * .5;

            // fire range preview  rgba(f,f,f,0.1)
            this._rangePreview = new createjs.Shape();
            this._rangePreview.graphics.setStrokeStyle(1).beginStroke("rgba(255,255,255,1)").beginFill("rgba(255,255,255,0.3)").drawCircle(this._towerPreview.x + config.FireRange_1, this._towerPreview.y + config.FireRange_1, config.FireRange_1);

            this._rangePreview.alpha = 1;
            this._rangePreview.regX = config.FireRange_1;
            this._rangePreview.regY = config.FireRange_1;

            this._resetPreview();

            currentLevel.addChild(this._rangePreview);
            currentLevel.addChild(this._towerPreview);            
        }

        private _movePreview(): void {
            this._isDragging = true;
            this._towerPreview.x = stage.mouseX;
            this._towerPreview.y = stage.mouseY;
            this._rangePreview.x = stage.mouseX;
            this._rangePreview.y = stage.mouseY;    
            
            this._showPreviewColor_detectBlankTile();      
            
        }

        private _showPreviewColor_detectBlankTile(): void {

            var isAvailable: boolean = false;

            for (var i = 0; i < blankTiles.length && !isAvailable; i++) {
                var tx = blankTiles[i].x;
                var ty = blankTiles[i].y;
                var hw = config.TileWidth * .5;
                var hh = config.TileHeight * .5;

                if (this._towerPreview.x > tx - hw && this._towerPreview.x < tx + hw && this._towerPreview.y > ty - hh && this._towerPreview.y < ty + hh) {
                    isAvailable = true;
                    this._blankTileX = tx;
                    this._blankTileY = ty;
                    this._blankTileIndex = i;
                }     
            }
                        
            if (isAvailable) {
                console.log("available");
                this._rangePreview.visible = true;

            } else {
                console.log("NOT available");
                this._rangePreview.visible = false;
                this._blankTileIndex = -1; // means not available
                
            }
        }
      
    }
}