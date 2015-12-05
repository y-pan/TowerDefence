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
        function WeaponButton(towerType, gridNumber) {
            _super.call(this, towerType + 1, 32, 455, 50, 50, true);
            this._towerType = towerType;
            this._gridNumber = gridNumber ? gridNumber : 1;
            this._setGridPosition();
            this._createPreview();
            this._isDragging = false;
            this.on("pressmove", this.pressmoveWeaponButton, this);
            this.on("pressup", this.pressupWeaponButton, this);
            currentLevel.addChild(this);
        }
        WeaponButton.prototype.pressmoveWeaponButton = function (event) {
            this._movePreview();
        };
        WeaponButton.prototype.pressupWeaponButton = function (event) {
            if (this._isDragging) {
                if (scoreBoard.getMoney() >= config.TowerCost_Build) {
                    this._createTower();
                    createjs.Sound.play("powerUp");
                    scoreBoard.removeMoney(config.TowerCost_Build);
                }
                this._resetPreview();
                this._isDragging = false;
            }
        };
        // ------------------------------------ PRIVATE ------------------------------
        WeaponButton.prototype._createTower = function () {
            towers.push(new objects.Tower(assets.getResult(this._towerType + 1), this._towerType, this._towerPreview.x, this._towerPreview.y));
        };
        WeaponButton.prototype._resetPreview = function () {
            this._towerPreview.x = -100;
            this._towerPreview.y = 0;
            this._rangePreview.x = -100;
            this._rangePreview.y = 0;
        };
        WeaponButton.prototype._createPreview = function () {
            // tower preview
            this._towerPreview = new createjs.Bitmap(assets.getResult(this._towerType + 1));
            this._towerPreview.regX = 25;
            this._towerPreview.regY = 25;
            // fire range preview
            this._rangePreview = new createjs.Shape();
            this._rangePreview.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)").drawCircle(this._towerPreview.x + config.FireRange_1, this._towerPreview.y + config.FireRange_1, config.FireRange_1);
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
        };
        WeaponButton.prototype._setGridPosition = function () {
            switch (this._gridNumber) {
                case 1:
                    this.x = 32;
                    break;
                case 2:
                    this.x = 96;
                    break;
                case 3:
                    this.x = 160;
                    break;
                case 4:
                    this.x = 224;
                    break;
                case 5:
                    this.x = 288;
                    break;
                case 6:
                    this.x = 352;
                    break;
                case 7:
                    this.x = 416;
                    break;
                case 8:
                    this.x = 544;
                    break;
                case 9:
                    this.x = 608;
                    break;
                case 10:
                    this.x = 672;
                    break;
            }
            this.y = 455;
        };
        return WeaponButton;
    })(objects.Button);
    objects.WeaponButton = WeaponButton;
})(objects || (objects = {}));
//# sourceMappingURL=weaponbutton.js.map