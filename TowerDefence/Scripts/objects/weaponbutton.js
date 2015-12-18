var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    /**
     * File Name: WeaponButton
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: WeaponButton object extends objects.Button, drag and drog weaponButton to create new weapon(tower)
     * History: 1.0
     */
    var WeaponButton = (function (_super) {
        __extends(WeaponButton, _super);
        /**Added this weaponbutton object to currentLevel by its constructor.
         * example: ("ta1",1)
         */
        function WeaponButton(towerType, x, y) {
            _super.call(this, towerType + 1, 32, 455, config.TileWidth, config.TileHeight, true);
            this._towerType = towerType;
            this.x = x;
            this.y = y;
            this._createPreview();
            this._isDragging = false;
            this.on("pressmove", this.pressmoveWeaponButton, this);
            this.on("pressup", this.pressupWeaponButton, this);
            currentLevel.addChild(this);
        }
        WeaponButton.prototype.pressmoveWeaponButton = function (event) {
            this._movePreview();
            //this._showPreviewColor();
        };
        WeaponButton.prototype.pressupWeaponButton = function (event) {
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
        };
        // ------------------------------------ PRIVATE ------------------------------
        WeaponButton.prototype._createTower = function (x, y) {
            towers.push(new objects.Tower(assets.getResult(this._towerType + 1), this._towerType, x, y));
        };
        WeaponButton.prototype._resetPreview = function () {
            this._towerPreview.x = -500;
            this._towerPreview.y = 0;
            this._rangePreview.x = -500;
            this._rangePreview.y = 0;
        };
        WeaponButton.prototype._createPreview = function () {
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
        };
        WeaponButton.prototype._movePreview = function () {
            this._isDragging = true;
            this._towerPreview.x = stage.mouseX;
            this._towerPreview.y = stage.mouseY;
            this._rangePreview.x = stage.mouseX;
            this._rangePreview.y = stage.mouseY;
            this._showPreviewColor_detectBlankTile();
        };
        WeaponButton.prototype._showPreviewColor_detectBlankTile = function () {
            var isAvailable = false;
            for (var i = 0; i < blankTiles.length && !isAvailable; i++) {
                var tx = blankTiles[i].x;
                var ty = blankTiles[i].y;
                var hw = config.TileWidth * .5;
                var hh = config.TileHeight * .5;
                if (this._towerPreview.x > tx - hw && this._towerPreview.x < tx + hw && this._towerPreview.y > ty - hh && this._towerPreview.y < ty + hh) {
                    isAvailable = true;
                    //this._towerPreview.x = tx; // skipping too much, seems not visual comfortable
                    //this._towerPreview.y = ty;
                    this._rangePreview.x = tx;
                    this._rangePreview.y = ty;
                    this._blankTileX = tx;
                    this._blankTileY = ty;
                    this._blankTileIndex = i;
                }
            }
            if (isAvailable) {
                console.log("available");
                this._rangePreview.visible = true;
            }
            else {
                console.log("NOT available");
                this._rangePreview.visible = false;
                this._blankTileIndex = -1; // means not available
            }
        };
        return WeaponButton;
    })(objects.Button);
    objects.WeaponButton = WeaponButton;
})(objects || (objects = {}));
//# sourceMappingURL=weaponbutton.js.map