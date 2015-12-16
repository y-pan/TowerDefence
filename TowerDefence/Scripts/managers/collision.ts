
module managers {
/**
 * File Name: Collision
 * Author: Yun Kui Pan
 * Last Modified by: Yun Kui Pan
 * Date Last Modified: 2015-12-04
 * Description: Collision object to manage collision globlely
 * History: 1.0
 */
    export class Collision {

        private _enemyKilledCount: number;
        /**Empty constructor*/
        constructor() {
            this._enemyKilledCount = 0;
        }

        public updateBulletVsEnemy(bullet: objects.Bullet, enemy: objects.Enemy): void {
            this._checkCollision(bullet, enemy);    
                    
        }

        public updateTowerVsEnemy(tower: objects.Tower, enemy: objects.Enemy): void {
            this._checkTargetInTowerRange(tower, enemy);            
        }

        // ----------------------------------------------

        private _checkTargetInTowerRange(tower: objects.Tower, enemy: objects.Enemy): void {

            if (tower.getHasTarget()) {
                tower.fireAsBefore();                                
            }
            else {
                if (this._distance(tower.getPosition(), enemy.getPosition()) <= tower.getFireRange()) {
                    tower.fireAt(enemy);
                    
                }
            }
        }

        public getEnemyKilledCount(): number {
            return this._enemyKilledCount;
        }
        private _checkCollision(bullet: objects.Bullet, enemy: objects.Enemy): void {
            // check the distance between enemy and bullet
       
            if (this._distance(bullet.getPosition(), enemy.getPosition()) <
                (enemy.getHalfHeight() * .2 + bullet.getRadius())) {
                        
                enemy.removeLives(bullet.getAttack());

                // reset bullet, reset enemy if enemy is 0 at life
                bullet.recycle();

                if (enemy.getLives() <= 0) {
                    
                    enemy.dieOrRecycle();
                    this._enemyKilledCount++;
                    scoreBoard.addMoney(enemy.getMoney());
                }
            } 
        }

        private _distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }

    }
}
