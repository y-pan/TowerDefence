var managers;
(function (managers) {
    /**
     * File Name: ScoreBoard
     * Author: Yun Kui Pan
     * Last Modified by: Yun Kui Pan
     * Date Last Modified: 2015-12-04
     * Description: ScoreBoard object to manage score, lives, money, gamelevel, enemyNumber, etc globlely
     * History: 1.0
     */
    var ScoreBoard = (function () {
        function ScoreBoard(lives, money, level) {
            this._score = 0;
            this._lives = lives;
            this._money = money;
            this._gameLevel = level;
        }
        ScoreBoard.prototype._setEnemyNumberByLevel = function () {
            switch (this._gameLevel) {
                case 1:
                    this._enemyNumber = 20;
                    break;
                case 2:
                    this._enemyNumber = 50;
                    break;
                case 3:
                    this._enemyNumber = 100;
                    break;
            }
        };
        ScoreBoard.prototype.getLevel = function () { return this._gameLevel; };
        ScoreBoard.prototype.update = function () { };
        ScoreBoard.prototype.getEnemyNumber = function () { return this._enemyNumber; };
        ScoreBoard.prototype.setEnemyNumber = function (enemyNumber) { this._enemyNumber = enemyNumber; };
        ScoreBoard.prototype.removeEnemyNumber = function (enemyNumber) { this._enemyNumber -= enemyNumber; };
        ScoreBoard.prototype.getScore = function () { return this._score; };
        ScoreBoard.prototype.setScore = function (score) { this._score = score; };
        ScoreBoard.prototype.addScore = function (score) { this._score += score; };
        ScoreBoard.prototype.getMoney = function () { return this._money; };
        ScoreBoard.prototype.setMoney = function (amount) { this._money = amount; };
        ScoreBoard.prototype.addMoney = function (amount) { this._money += amount; };
        ScoreBoard.prototype.removeMoney = function (amount) { this._money -= amount; };
        ScoreBoard.prototype.setLives = function (value) { this._lives = value; };
        ScoreBoard.prototype.getLives = function () { return this._lives; };
        ScoreBoard.prototype.addLives = function (lives) { this._lives += lives; };
        /** A life removed when an enemy get to the goal */
        ScoreBoard.prototype.removeLives = function (lives) { this._lives -= lives; };
        return ScoreBoard;
    })();
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map