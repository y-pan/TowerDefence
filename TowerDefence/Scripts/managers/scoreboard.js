var managers;
(function (managers) {
    var ScoreBoard = (function () {
        function ScoreBoard() {
        }
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