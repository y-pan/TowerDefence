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
        private _enemyKilledOrEscaped: number; // how many enemies killed or escaped, increase by 1 when enemy.dieOrRecycle() called by collision
        private _currentNumberOfEnemy: number // how many enemies went out

        private _isTimeToGo: boolean;
        private _newEnemyGoes: boolean;

        private _isLevelCompleted: boolean;


        public getEnemyKilledOrEscaped(): number {
            return this._enemyKilledOrEscaped;
        }
        public addEnemyKilledOrEscaped(): void {
            this._enemyKilledOrEscaped++;
        }

        
        /**For each game level, manage how many enemies, how fast it launches enemies, enumies are predefined, instantiate it then update it, object will use global enemies and add to createjs.Container(currentLevel)*/
        constructor(level: number) {

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
        
        /**Get the total number of enemy for current level, use it in level-main to know if level completed by if(deadEnemyCount >= wavemanager.getTotalNumberOfEnemy()), then level completed */
        public getTotalNumberOfEnemy(): number {
            return this._totalNumberOfEnemy;
        }

        private _setTotalNumberOfEnemyByLevel(): void {
            this._totalNumberOfEnemy = 20 * this._level;//40
        }
             

        private _setEnemyColdTimeByLevel(): void {
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
        }


        public update(): void {        
                
            // check if it is time to add enemy to screen
            if (this._currentNumberOfEnemy < this._totalNumberOfEnemy) { // if still enemies to be sent out
                
                if (this._checkTimeToGo()) {// if time to go, then either reuse one, or create new one

                    this._newEnemyGoes = false;
                    for (var i = 0; i < enemies.length && !this._newEnemyGoes; i++) { // can reuse one
                        if (enemies[i].getIsDead()) {
                            enemies[i].goAgain();
                            this._newEnemyGoes = true;
                        };
                    }

                    if (!this._newEnemyGoes) { // cannot reuse one, then create new one
                        this._pushNewEnemy();
                        this._newEnemyGoes = true;
                    }

                    this._currentNumberOfEnemy++; 
                }
            }            
        }

        public getCurrentNumberOfEnemy(): number {
            return this._currentNumberOfEnemy;
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
        
        private _pushNewEnemy(): void {
            enemies.push(new objects.Enemy(redDragonAtlas, "redDragon", 30, 128, 10, 64, 64, 1, config.DIRECTION_DOWN));             
        }
    }
} 