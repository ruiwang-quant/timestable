export interface Test {
    factor: number;
    level1: boolean;
    level2: boolean;
    level3: boolean;
}

export interface Challenge {
    timestamp: Date;
    base: Array<number>;
    correct: number;
    level: number;
}

export class Profile {
    tests: Array<Test>;
    challenges: Array<Challenge>;
}

export class Game {

    base: any;
    total: number;
    wait: number;

}
