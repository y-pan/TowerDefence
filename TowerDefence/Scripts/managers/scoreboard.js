var managers;
(function (managers) {
    var ScoreBoard = (function () {
        function ScoreBoard() {
        }
        ScoreBoard.prototype.setScore = function (value) { this._score = value; };
        ScoreBoard.prototype.getScore = function () { return this._score; };
        ScoreBoard.prototype.setLives = function (value) { this._lives = value; };
        ScoreBoard.prototype.getLives = function () { return this._lives; };
        ScoreBoard.prototype.update = function () { };
        ScoreBoard.prototype.addScore = function (score) { this._score += score; };
        ScoreBoard.prototype.addLives = function (lives) { this._lives += lives; };
        ScoreBoard.prototype.substractLives = function (lives) { this._lives -= lives; };
        return ScoreBoard;
    })();
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map