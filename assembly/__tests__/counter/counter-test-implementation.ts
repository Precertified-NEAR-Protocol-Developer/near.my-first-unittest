import { Counter } from '../../index';

export const getRandomNumber = (_min: number, _max: number): i32 => <i32>(Math.random() * (_max - _min) + _min);

export class CounterTestImplementation {
    private counter:Counter;

    constructor(counterName:string){
        this.counter = new Counter(counterName);
    }

    // given
    counterIncrementTest(incrementValue: i32): void {
        const preIncrementValue = this.counter.getCurrentCounterValue();
        const expectedPostIncrementValue = preIncrementValue + incrementValue;

        // when
        this.counter.incrementCounter(incrementValue);
        const actualPostIncrementValue = this.counter.getCurrentCounterValue();
    
        // then
        const assertionMessage = `\nValue before increment was [ ${preIncrementValue} ]`
            .concat(`\nValue to increment by was [ ${incrementValue} ]`)
            .concat(`\nValue expected after increment was [ ${expectedPostIncrementValue} ]`)
            .concat(`\nValue after increment was [ ${actualPostIncrementValue} ]`);
        expect(actualPostIncrementValue).toBe(incrementValue, assertionMessage);
    };

    
    // given
    counterDecrementTest(decrementValue: i32): void {
        const preDecrementValue = this.counter.getCurrentCounterValue();
        const expectedPostDecrementValue = preDecrementValue - decrementValue;

        // when
        this.counter.decrementCounter(decrementValue);
        const actualPostDecrementValue = this.counter.getCurrentCounterValue();
    
        // then
        const assertionMessage = `\nValue before decrement was [ ${preDecrementValue} ]`
            .concat(`\nValue to decrement by was [ ${decrementValue} ]`)
            .concat(`\nValue expected after decrement was [ ${expectedPostDecrementValue} ]`)
            .concat(`\nValue after decrement was [ ${actualPostDecrementValue} ]`);
        expect(actualPostDecrementValue).toBe(expectedPostDecrementValue, assertionMessage);
    };

    // given
    counterResetTest(min: number, max: number): void {
        this.counter.decrementCounter(getRandomNumber(min, max));
        this.counter.incrementCounter(getRandomNumber(min, max));

        // when
        this.counter.resetCounter();

        // then
        const actualResetValue = this.counter.getCurrentCounterValue();
        expect(actualResetValue).toBe(0, "Counter should have value of 0 after resetting");
    }
}
