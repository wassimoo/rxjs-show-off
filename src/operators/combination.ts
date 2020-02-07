import { take, map, combineAll, first, sample, skip } from 'rxjs/operators';
import { interval, Observable, Subscription, from, of, zip } from 'rxjs';

export class Combination {
    constructor() { }

    clock() {

        const ticker: Observable<string> = new Observable(subscriber => {

            const tickTock = ['Tick', 'Tock'];
            let i: number = 0;

            setInterval(() => {
                subscriber.next(tickTock[i]);

                // tslint:disable-next-line: no-bitwise
                i ^= 1;
            }, 1000);

        });

        const subscription: Subscription = ticker.subscribe({
            next(t: string) { console.log(t.toUpperCase()); },
        });

        subscription.unsubscribe();
    }

    all() {
        first()(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
    }

    sample() {
        const src: Observable<number> = interval(1000);

        const example: Observable<number> = src.pipe(sample(interval(2000)));

        example.subscribe((x) => console.log(x));

    }

    zip() {
        let age$ = of<number>(27, 25, 29);
        let name$ = of<string>('Foo', 'Bar', 'Beer');
        let isDev$ = of<boolean>(true, true, false);

        let src$ = zip(age$, name$, isDev$)

        src$.pipe(
            map(([age, name, isDev]) => ({ age, name, isDev })),
        )
            .subscribe(x => console.log(x));
    }

    filter() {
        const source = interval(1000);
        
        // Skip the first 5 emitted values.
        const example = source.pipe((skip(5)));
    }
}
