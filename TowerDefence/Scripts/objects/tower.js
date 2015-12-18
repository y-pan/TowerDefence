var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    /**
     * File Name: Tower
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: Tower object extends createjs.Bitmap, to create tower
     * History: 1.0
     */
    var Tower = (function (_super) {
        __extends(Tower, _super);
        /**This constructor will automatically add this object to the global currentLevel, which is objects.Scene extends createjs.Container.
         * Example: (assets.getResult(this._towerType + "1"), this._towerType, this._towerPreview.x, this._towerPreview.y)
         */
        function Tower(imageString, towerType, x, y) {
            _super.call(this, imageString);
            this._imageString = imageString;
            this._towerType = towerType;
            this.x = x;
            this.y = y;
            this._width = config.TileWidth;
            this._height = config.TileHeight;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            this._level = config.TowerLevel_1;
            this.rotation = 0;
            this._hasTarget = false;
            this.updateFireRange();
            this.updateColdTime();
            this._maxLevel = config.TowerLevel_Max;
            this._newLevel = this._level;
            this._oldTicks = createjs.Ticker.getTicks();
            this.createRangeCircle();
            currentLevel.addChild(this);
            // event
            this.on("mouseover", this.overTower, this);
            this.on("mouseout", this.outTower, this);
            this.on("click", this.clickTower, this);
        }
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~ Event Listener ~~~~~~~~~~~~~~~~~~~~~~~~~
        Tower.prototype.overTower = function (event) {
            //event.currentTarget.alpha = 0.7;     
            this._rangeCircle.alpha = 1;
            //console.log("_needToUpdateCircle:" +this._needToUpdateCircle);   
        };
        Tower.prototype.outTower = function (event) {
            //event.currentTarget.alpha = 1;
            this._rangeCircle.alpha = 0;
        };
        Tower.prototype.clickTower = function (event) {
            //console.log("click in tower created at: " + this.getTimeCreated());
            this._requestNewLevel();
        };
        /**Create a circle where the center is tower, radius is fireRange, and add it to current scene*/
        Tower.prototype.createRangeCircle = function () {
            this._rangeCircle = new createjs.Shape();
            this._rangeCircle.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)").drawCircle(this.x, this.y, this.getFireRange()); //.beginStroke("rgba(255,255,255,1)")
            this._rangeCircle.alpha = 0;
            currentLevel.addChild(this._rangeCircle);
        };
        // +++++++++++++++++++++++++++++++++++ PUBLIC ++++++++++++++++++++++++++++++++++++++++++++
        Tower.prototype.setLevel = function (level) {
            // set level
            this._level = level;
            this._newLevel = this._level;
            // set image
            this.updateTowerImage();
            // set range & circle
            this.updateFireRange();
            this.updateRangeCircle();
            this.updateColdTime();
        };
        Tower.prototype.updateColdTime = function () {
            switch (this._level) {
                case 1:
                    this._coldTime = config.FireColdTime_1;
                    break;
                case 2:
                    this._coldTime = config.FireCodeTime_2;
                    break;
                case 3:
                    this._coldTime = config.FireCodeTime_3;
                    break;
            }
        };
        Tower.prototype.getLevel = function () {
            return this._level;
        };
        Tower.prototype.getNewLevel = function () {
            return this._newLevel;
        };
        Tower.prototype.updateTowerImage = function () {
            this._imageString = assets.getResult(this._towerType + this._level);
            this.image = this._imageString;
        };
        Tower.prototype.updateRangeCircle = function () {
            this._rangeCircle.graphics.clear();
            this._rangeCircle.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)").drawCircle(this.x, this.y, this.getFireRange());
            //.beginStroke("rgba(0,0,0,1)").beginFill("rgba(0,0,100,0.3)")
        };
        Tower.prototype.updateFireRange = function () {
            switch (this._level) {
                case 1:
                    this._fireRange = config.FireRange_1;
                    break;
                case 2:
                    this._fireRange = config.FireRange_2;
                    break;
                case 3:
                    this._fireRange = config.FireRange_3;
                    break;
            }
        };
        /** This is for centered tower */
        Tower.prototype.getGunpoint = function () {
            return new createjs.Point(this.x + this._width * .5, this.y);
        };
        ;
        Tower.prototype.getPosition = function () {
            return new createjs.Point(this.x, this.y);
        };
        Tower.prototype.getTarget = function () {
            return this._target;
        };
        Tower.prototype.getFireRange = function () {
            return this._fireRange;
        };
        Tower.prototype.setHasTarget = function (hasTarget) {
            this._hasTarget = hasTarget;
        };
        Tower.prototype.getHasTarget = function () {
            return this._hasTarget;
        };
        Tower.prototype.fireAt = function (enemy) {
            if (enemy.getLives() > 0) {
                this._setRotationAt(enemy);
                this._shoot();
                this._hasTarget = true;
                this._target = enemy;
            }
        };
        Tower.prototype.fireAsBefore = function () {
            if ((this._target.getLives() > 0) && (this._distance(this._target.getPosition(), this.getPosition()) <= this.getFireRange())) {
                this._setRotationAt(this._target);
                this._shoot();
            }
            else {
                this._hasTarget = false;
                this._target = null;
            }
        };
        //-------------------------------- PRIVATE -------------------------------------------
        /**Conditions applied here before update level*/
        Tower.prototype._requestNewLevel = function () {
            if (this._newLevel < this._maxLevel) {
                switch (this._newLevel) {
                    case 1:
                        if (scoreBoard.getMoney() >= config.TowerCost_UpdateTo2) {
                            this._newLevel++;
                            this.setLevel(this._newLevel);
                            createjs.Sound.play("powerUp");
                            scoreBoard.removeMoney(config.TowerCost_UpdateTo2);
                        }
                        break;
                    case 2:
                        if (scoreBoard.getMoney() >= config.TowerCost_UpdateTo3) {
                            this._newLevel++;
                            this.setLevel(this._newLevel);
                            scoreBoard.removeMoney(config.TowerCost_UpdateTo3);
                            createjs.Sound.play("powerUp");
                        }
                        break;
                }
            }
        };
        Tower.prototype._distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        };
        Tower.prototype._setRotationAt = function (enemy) {
            var temp = Math.floor(Math.atan((this.y - enemy.y) / (this.x - enemy.x)) * (180 / Math.PI));
            if (enemy.x > this.x) {
                this.rotation = temp;
            }
            else if (enemy.x < this.x) {
                this.rotation = 180 + temp;
            }
        };
        /**Return a bulletType actually a imageString can be used in assets.getResult(imageString)*/
        Tower.prototype._getBulletType = function () {
            switch (this._level) {
                case 1:
                    this._bulletType = "bullet1";
                    break;
                case 2:
                    this._bulletType = "bullet2";
                    break;
                case 3:
                    this._bulletType = "bullet3";
                    break;
            }
            return this._bulletType;
        };
        Tower.prototype._getBullet = function () {
            //console.log("in getBullet, :" + this._level);   
            switch (this._level) {
                case 1:
                    return bullets1;
                    break;
                case 2:
                    return bullets2;
                    break;
                case 3:
                    return bullets3;
                    break;
            }
        };
        Tower.prototype._shoot = function () {
            this._nowTicks = createjs.Ticker.getTicks();
            if (this._nowTicks - this._oldTicks >= this._coldTime) {
                this._shootBullet();
                createjs.Sound.play("blop", null, null, null, null, 0.3);
            }
        };
        Tower.prototype._shootBullet = function () {
            var fired = false;
            for (var i = 0; i < this._getBullet().length && !fired; i++) {
                if (this._getBullet()[i].isReady) {
                    this._getBullet()[i].fireBullet(this);
                    fired = true;
                    this._oldTicks = this._nowTicks;
                }
            }
            // add more if not enough  
            if (!fired) {
                this._getBullet().push(new objects.Bullet(assets.getResult(this._getBulletType()), "bullet", null, null, 5, 4, 8, 8, true));
                this._getBullet()[this._getBullet().length - 1].fireBullet(this);
                // add to current container
                currentLevel.addChild(this._getBullet()[this._getBullet().length - 1]);
                fired = true;
                this._oldTicks = this._nowTicks;
            }
        }; // end of _shootBullet
        return Tower;
    })(createjs.Bitmap);
    objects.Tower = Tower; // end of module
})(objects || (objects = {}));
//# sourceMappingURL=tower.js.map