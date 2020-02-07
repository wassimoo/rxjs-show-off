import { Combination } from './operators/combination';

export class Controller {
    constructor(private name: string) {
        console.log(`Hello ${name}, you motherfucker,`);
        const c: Combination = new Combination();
        c.zip();
    }
}