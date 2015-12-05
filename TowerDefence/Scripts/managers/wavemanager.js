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
        /**For each game level, waves and enumies are predefined, instantiate it then update it, object will use global enemies and add to createjs.Container(currentLevel)*/
        function WaveManager(level) {
            this._level = level ? level : 1;
            this._isWaveReady = true;
            this._isEnemyReady = true;
            this._oldTime = createjs.Ticker.getTicks();
            this._isTimeToGo = false;
            this._enemyDeadCount = 0;
            this._setEnemyColdTime();
            this._newEnemyGoes = false;
        }
        WaveManager.prototype._setEnemyColdTime = function () {
            switch (this._level) {
                case 1:
                    this._enemyColdTime = 300;
                    break;
                case 2:
                    this._enemyColdTime = 150;
                    break;
                case 3:
                    this._enemyColdTime = 80;
                    break;
            }
        };
        WaveManager.prototype.update = function () {
            // check if it is time to add enemy to screen
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
                }
                console.log("enemies count: " + enemies.length);
            }
            /*
            if (this._isWaveReady) {
                this._generateWave();
            }*/
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
        /*
        private _generateWave(): void {
            if (this._isEnemyReady) {
                this._pushNewEnemy();
            }
        }*/
        WaveManager.prototype._pushNewEnemy = function () {
            enemies.push(new objects.Enemy(redDragonAtlas, "redDragon", 30, 128, 10, 64, 64, 1, config.DIRECTION_DOWN));
        };
        return WaveManager;
    })();
    managers.WaveManager = WaveManager;
})(managers || (managers = {}));
//# sourceMappingURL=wavemanager.js.map