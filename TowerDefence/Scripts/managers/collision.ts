module managers {

    export class Collsion {

        /**Empty constructor*/
        constructor() { }

        public update(object1: objects.GameObject, object2: objects.GameObject): void {
            this._checkCollision(object1, object2);
        }

        /**
 * Private Utility Method - Distance - returns distance between to points in pixels
 */
        private _distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }


        private _checkCollision(object1: objects.GameObject, object2: objects.GameObject): void {
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
            } else {
                object2.setIsColliding(false);
            }

        }
    }
}
