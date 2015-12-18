var managers;
(function (managers) {
    /**
     * File Name: WaveManager
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: WaveManager object to manage enemy wave
     * History: 1.0
     */
    var WaveManager = (function () {
        /**For each game level, manage how many enemies, how fast it launches enemies, enumies are predefined, instantiate it then update it, object will use global enemies and add to createjs.Container(currentLevel)*/
        function WaveManager(level) {
            this._enemyKilledOrEscaped = 0;
            this._level = level ? level : 1;
            //this._isLevelCompleted = false;
            this._isWaveReady = true;
            this._isEnemyReady = true;
            this._oldTime = createjs.Ticker.getTicks();
            this._isTimeToGo = false;
            this._setTotalNumberOfEnemyByLevel(); // set total number of emeies for this level
            this._currentNumberOfEnemy = 0; // current number of enemies that sent out
            this._setEnemyColdTimeByLevel(); // set cold time for enemy, or frequency 
            this._newEnemyGoes = false;
        }
        WaveManager.prototype.getEnemyKilledOrEscaped = function () {
            return this._enemyKilledOrEscaped;
        };
        WaveManager.prototype.addEnemyKilledOrEscaped = function () {
            this._enemyKilledOrEscaped++;
        };
        /**Get the total number of enemy for current level, use it in level-main to know if level completed by if(deadEnemyCount >= wavemanager.getTotalNumberOfEnemy()), then level completed */
        WaveManager.prototype.getTotalNumberOfEnemy = function () {
            return this._totalNumberOfEnemy;
        };
        WaveManager.prototype._setTotalNumberOfEnemyByLevel = function () {
            this._totalNumberOfEnemy = 20 * this._level; //40
        };
        WaveManager.prototype._setEnemyColdTimeByLevel = function () {
            switch (this._level) {
                case 1:
                    this._enemyColdTime = 200;
                    break;
                case 2:
                    this._enemyColdTime = 120;
                    break;
                case 3:
                    this._enemyColdTime = 80;
                    break;
            }
        };
        WaveManager.prototype.update = function () {
            // check if it is time to add enemy to screen
            if (this._currentNumberOfEnemy < this._totalNumberOfEnemy) {
                if (this._checkTimeToGo()) {
                    this._newEnemyGoes = false;
                    for (var i = 0; i < enemies.length && !this._newEnemyGoes; i++) {
                        if (enemies[i].getIsDead()) {
                            enemies[i].goAgain();
                            this._newEnemyGoes = true;
                        }
                        ;
                    }
                    if (!this._newEnemyGoes) {
                        this._pushNewEnemy();
                        this._newEnemyGoes = true;
                    }
                    this._currentNumberOfEnemy++;
                }
            }
        };
        WaveManager.prototype.getCurrentNumberOfEnemy = function () {
            return this._currentNumberOfEnemy;
        };
        WaveManager.prototype._checkTimeToGo = function () {
            this._isTimeToGo = false;
            this._nowTime = createjs.Ticker.getTicks();
            if (this._nowTime - this._oldTime >= this._enemyColdTime) {
                this._oldTime = this._nowTime;
                this._isTimeToGo = true;
            }
            return this._isTimeToGo;
        };
        WaveManager.prototype._pushNewEnemy = function () {
            enemies.push(new objects.Enemy(redDragonAtlas, "fly", 30, startTile.x, startTile.y, 1, startTile.getDirection()));
        };
        return WaveManager;
    })();
    managers.WaveManager = WaveManager;
})(managers || (managers = {}));
//# sourceMappingURL=wavemanager.js.map