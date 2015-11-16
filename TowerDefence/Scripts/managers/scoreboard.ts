module managers {

    export class ScoreBoard {
        private _score: number;
        private _lives: number;

        constructor() { }

        public setScore(value: number): void { this._score = value; }

        public getScore(): number { return this._score; }

        public setLives(value: number): void { this._lives = value; }

        public getLives(): number { return this._lives; }


        public update(): void { }

        public addScore(score: number): void { this._score += score; }

        public addLives(lives: number): void { this._lives += lives; }

        public substractLives(lives: number): void { this._lives -= lives;}
    }
} 