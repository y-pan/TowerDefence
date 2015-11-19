module managers {

    export class Collsion {

        /**Empty constructor*/
        constructor() { }

        public updateBulletVsEnemy(bullet: objects.Bullet, enemy: objects.Enemy): void {
            this._checkCollision(bullet, enemy);            
        }

        public updateTowerVsEnemy(tower: objects.Tower, enemy: objects.Enemy): void {
            this._checkTargetInTowerRange(tower, enemy);
        }

        private _checkTargetInTowerRange(tower: objects.Tower, enemy: objects.Enemy): void {
            if (this._distance(tower.getPosition(), enemy.getPosition()) <= tower.getFireRange()) {
                tower.fireAt(enemy);
            } 
        }


        private _checkCollision(bullet: objects.Bullet, enemy: objects.Enemy): void {
            // check the distance between enemy and bullet
            if (this._distance(enemy.getPosition(), bullet.getPosition()) <
                (enemy.getHalfHeight() + bullet.getRadius())) {
                        
                enemy.substractLives(bullet.getAttack());

                // reset bullet, reset enemy if enemy is 0 at life
                bullet.reset();

                if (enemy.getLives() <= 0) {
                    enemy.die();
                }
            } 
        }

        /**
        * Private Utility Method - Distance - returns distance between to points in pixels
        */
        private _distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }

    }
}
