var managers;
(function (managers) {
    /**
     * File Name: Collision
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: Collision object to manage collision globlely
     * History: 1.0
     */
    var Collision = (function () {
        /**Empty constructor*/
        function Collision() {
        }
        Collision.prototype.updateBulletVsEnemy = function (bullet, enemy) {
            this._checkCollision(bullet, enemy);
        };
        Collision.prototype.updateTowerVsEnemy = function (tower, enemy) {
            this._checkTargetInTowerRange(tower, enemy);
        };
        // ----------------------------------------------
        Collision.prototype._checkTargetInTowerRange = function (tower, enemy) {
            if (tower.getHasTarget()) {
                tower.fireAsBefore();
            }
            else {
                if (this._distance(tower.getPosition(), enemy.getPosition()) <= tower.getFireRange()) {
                    tower.fireAt(enemy);
                }
            }
        };
        Collision.prototype._checkCollision = function (bullet, enemy) {
            // check the distance between enemy and bullet
            if (this._distance(bullet.getPosition(), enemy.getPosition()) <
                (enemy.getHalfHeight() * .2 + bullet.getRadius())) {
                enemy.removeLives(bullet.getAttack());
                // reset bullet, reset enemy if enemy is 0 at life
                bullet.recycle();
                if (enemy.getLives() <= 0) {
                    enemy.dieOrRecycle();
                    scoreBoard.addMoney(enemy.getMoney());
                }
            }
        };
        Collision.prototype._distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map