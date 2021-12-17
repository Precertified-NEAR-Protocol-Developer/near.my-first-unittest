import { Counter } from '../index';

import { context, storage, VMContext } from 'near-sdk-as';

class TestImplementation {
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
        const assertionMessage = `Value before increment was [ ${preIncrementValue} ]\n`
            .concat(`Value to increment by was [ ${incrementValue} ]\n`)
            .concat(`Value expected after increment was [ ${expectedPostIncrementValue} ]\n`)
            .concat(`Value after increment was [ ${actualPostIncrementValue} ]`);
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
        const assertionMessage = `Value before decrement was [ ${preDecrementValue} ]\n`
            .concat(`Value to decrement by was [ ${decrementValue} ]\n`)
            .concat(`Value expected after decrement was [ ${expectedPostDecrementValue} ]\n`)
            .concat(`Value after decrement was [ ${actualPostDecrementValue} ]`);
        expect(actualPostDecrementValue).toBe(expectedPostDecrementValue, assertionMessage);
    };

    // given
    counterResetTest(min: number, max: number): void {
        const randomValue = (_min: number, _max: number): i32 => <i32>(Math.random() * (_max - _min) + _min);
        this.counter.decrementCounter(randomValue(min, max));
        this.counter.incrementCounter(randomValue(min, max));

        // when
        this.counter.resetCounter();

        // then
        const actualResetValue = this.counter.getCurrentCounterValue();
        expect(actualResetValue).toBe(0, "Counter should have value of 0 after resetting");
    }
}

const testImplementation = new TestImplementation("counter");

describe("Counter ", () => {
    it("should increment by one", () => {
        testImplementation.counterIncrementTest(1);
    });

    it("should decrement by one", () => {
        testImplementation.counterDecrementTest(1);
    });

    it("should be resetable", () => {
        testImplementation.counterResetTest(0, 100);
    });
});