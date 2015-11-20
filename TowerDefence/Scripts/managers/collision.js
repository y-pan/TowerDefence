var managers;
(function (managers) {
    var Collsion = (function () {
        /**Empty constructor*/
        function Collsion() {
        }
        Collsion.prototype.updateBulletVsEnemy = function (bullet, enemy) {
            this._checkCollision(bullet, enemy);
        };
        Collsion.prototype.updateTowerVsEnemy = function (tower, enemy) {
            this._checkTargetInTowerRange(tower, enemy);
        };
        // ----------------------------------------------
        Collsion.prototype._checkTargetInTowerRange = function (tower, enemy) {
            if (tower.getHasTarget()) {
                tower.fireAsBefore();
            }
            else {
                if (this._distance(tower.getPosition(), enemy.getPosition()) <= tower.getFireRange()) {
                    tower.fireAt(enemy);
                }
            }
            /*
            if (this._distance(tower.getPosition(), enemy.getPosition()) <= tower.getFireRange()) {
                tower.fireAt(enemy);
            } */
        };
        Collsion.prototype._checkCollision = function (bullet, enemy) {
            // check the distance between enemy and bullet
            if (this._distance(bullet.getPosition(), enemy.getPosition()) <
                (enemy.getHalfHeight() + bullet.getRadius())) {
                enemy.removeLives(bullet.getAttack());
                // reset bullet, reset enemy if enemy is 0 at life
                bullet.reset();
                if (enemy.getLives() <= 0) {
                    enemy.die();
                }
            }
        };
        Collsion.prototype._distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        };
        return Collsion;
    })();
    managers.Collsion = Collsion;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map