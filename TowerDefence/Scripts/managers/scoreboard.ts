module managers {

    export class ScoreBoard {

        private _score: number;
        private _enemyNumber: number;
        private _lives: number;
        private _money: number;
        private _gameLevel: number;

        constructor() { }
        public update(): void { }

        public getEnemyNumber(): number { return this._enemyNumber; }
        public setEnemyNumber(enemyNumber: number): void { this._enemyNumber = enemyNumber; }
        public removeEnemyNumber(enemyNumber: number): void { this._enemyNumber -= enemyNumber; }

        public getScore(): number { return this._score; }
        public setScore(score: number): void { this._score = score; }
        public addScore(score: number): void { this._score += score; }

        public getMoney(): number { return this._money; }
        public setMoney(amount: number): void { this._money = amount; }
        public addMoney(amount: number): void { this._money += amount; }
        public removeMoney(amount: number): void { this._money -= amount;}
                
        public setLives(value: number): void { this._lives = value; }
        public getLives(): number { return this._lives; }
        public addLives(lives: number): void { this._lives += lives; }
        /** A life removed when an enemy get to the goal */
        public removeLives(lives: number): void { this._lives -= lives; }
    }
} 