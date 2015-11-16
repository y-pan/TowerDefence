var managers;
(function (managers) {
    var Collsion = (function () {
        /**Empty constructor*/
        function Collsion() {
        }
        Collsion.prototype.update = function (object1, object2) {
            this._checkCollision(object1, object2);
        };
        /**
 * Private Utility Method - Distance - returns distance between to points in pixels
 */
        Collsion.prototype._distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        };
        Collsion.prototype._checkCollision = function (object1, object2) {
            // check the distance between plane and other object
            if (this._distance(object1.getPosition(), object2.getPosition()) <
                (object1.getHalfHeight() + object2.getHalfHeight())) {
                // Check if plane is not already colliding
                if (!object2.getIsColliding()) {
                    switch (object2.getName()) {
                        case "island":
                            scoreBoard.addScore(100);
                            console.log("Island Hit");
                            break;
                        case "cloud":
                            scoreBoard.substractLives(1);
                            console.log("Cloud Hit");
                            break;
                    }
                    object2.setIsColliding(true);
                }
            }
            else {
                object2.setIsColliding(false);
            }
        };
        return Collsion;
    })();
    managers.Collsion = Collsion;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map