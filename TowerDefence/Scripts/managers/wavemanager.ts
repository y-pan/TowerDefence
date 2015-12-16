module managers {
/**
 * File Name: WaveManager
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: WaveManager object to manage enemy wave
 * History: 1.0
 */
    export class WaveManager {
        
        private _level: number;

        
        //private _waveNumber: number;
        private _time: number;

        private _isWaveReady: boolean;
        private _isEnemyReady: boolean;
        

        private _enemyColdTime: number;
        private _oldTime: number;
        private _nowTime: number;
        
        private _totalNumberOfEnemy: number; // how many enemies for this level
        //private _enemyDeadCount: number; // how many enemies killed
        private _currentNumberOfEnemy: number // how many enemies went out

        private _isTimeToGo: boolean;
        private _newEnemyGoes: boolean;

        private _isLevelCompleted: boolean;
        
        /**For each game level, manage how many enemies, how fast it launches enemies, enumies are predefined, instantiate it then update it, object will use global enemies and add to createjs.Container(currentLevel)*/

        constructor(level: number) {

            this._level = level ? level : 1;

            //this._isLevelCompleted = false;

            this._isWaveReady = true;
            this._isEnemyReady = true;
            this._oldTime = createjs.Ticker.getTicks();
            
            this._isTimeToGo = false;

            this._setTotalNumberOfEnemyByLevel(); // set total number of emeies for this level
            //this._enemyDeadCount = 0;
            this._currentNumberOfEnemy = 0;

            this._setEnemyColdTimeByLevel(); // set cold time for enemy, or frequency 
            this._newEnemyGoes = false;
        }
        
        /**Get the total number of enemy for current level, use it in level-main to know if level completed by if(deadEnemyCount >= wavemanager.getTotalNumberOfEnemy()), then level completed */
        public getTotalNumberOfEnemy(): number {
            return this._totalNumberOfEnemy;
        }

        private _setTotalNumberOfEnemyByLevel(): void {
            this._totalNumberOfEnemy = 40 * this._level;
        }

        private _setEnemyColdTimeByLevel(): void {
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
        }


        public update(): void {
            
            // check if it is time to add enemy to screen
            if (this._checkTimeToGo()&&(this._currentNumberOfEnemy <this._totalNumberOfEnemy)) {
                this._newEnemyGoes = false;
                for (var i = 0; i < enemies.length && !this._newEnemyGoes; i++) {
                    if (enemies[i].getIsDead()) {
                        enemies[i].goAgain();
                        this._newEnemyGoes = true;
                    };
                }

                if (!this._newEnemyGoes) {
                    this._pushNewEnemy();
                    this._newEnemyGoes = true;
                }
                
                // 
                this._currentNumberOfEnemy++;

                /*
                if (this._enemyDeadCount >= this._totalNumberOfEnemy) {
                    this._isLevelCompleted = true;
                }*/

                console.log("enemies count: " + enemies.length);

                /*
                this._enemyDeadCount = 0;

                for (var i = 0; i < enemies.length; i++) {
                    if (enemies[i].getIsDead()) { this._enemyDeadCount++};
                }

                if (this._enemyDeadCount == enemies.length) {
                    console.log("relive enemies");
                    this._generateEnemy();
                }*/
            }

            
            
            /*
            if (this._isWaveReady) {            
                this._generateWave();
            }*/
        }

        private _checkTimeToGo(): boolean {
            this._isTimeToGo = false;
            this._nowTime = createjs.Ticker.getTicks();
            if (this._nowTime - this._oldTime >= this._enemyColdTime) {
                this._oldTime = this._nowTime;
                this._isTimeToGo = true;
            }
            return this._isTimeToGo;
        }
        /*
        private _generateWave(): void {
            if (this._isEnemyReady) {
                this._pushNewEnemy();
            }
        }*/

        private _pushNewEnemy(): void {
            enemies.push(new objects.Enemy(redDragonAtlas, "redDragon", 30, 128, 10, 64, 64, 1, config.DIRECTION_DOWN));             
        }
    }
} 