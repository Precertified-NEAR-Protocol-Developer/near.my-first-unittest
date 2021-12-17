import { Counter } from '../index';

import { context, storage, VMContext } from 'near-sdk-as';

// given
class TestImplementation {
    private counter:Counter;

    constructor(counterName:string){
        this.counter = new Counter(counterName);
    }

    counterIncrementTest(incrementValue: i32): void {
        const preIncrementValue = this.counter.getCurrentCounterValue();
        const expectedPostIncrementValue = preIncrementValue + incrementValue;

        // when
        this.counter.incrementCounter(incrementValue);
        const actualPostIncrementValue = this.counter.getCurrentCounterValue();
    
        // then
        const assertionMessage = "Value before increment was [ ${preIncrementValue} ]\n"
            .concat("Value to increment by was [ ${incrementValue} ]\n")
            .concat("Value expected after increment was [ ${expectedPostIncrementValue} ]\n")
            .concat("Value after increment was [ ${actualPostIncrementValue} ]");
        expect(actualPostIncrementValue).toBe(incrementValue, assertionMessage);
    };
}

const testImplementation = new TestImplementation("counter");

describe("Counter ", () => {
    it("should increment by one", () => {
        testImplementation.counterIncrementTest(1);
    });

    it("should decrement by one", () => {
        const counter = new Counter("counter");
        counter.incrementCounter(1);
        counter.decrementCounter(1);
        expect(counter.getCurrentCounterValue()).toBe(0, "counter should be zero after a single decrement.");
    });

    it("should be resetable", () => {
        const counter = new Counter("counter");
        counter.incrementCounter(1);
        counter.incrementCounter(1);
        counter.resetCounter(); // reset to zero
        expect(counter.getCurrentCounterValue()).toBe(0, "counter should be zero after it is reset."); 
    });
    
    it("should increment multiple times and decrement back to zero", () => {
        const counter = new Counter("counter");
        counter.incrementCounter(1);
        expect(counter.getCurrentCounterValue()).toBe(1, "0 + 1 = 1");
        counter.incrementCounter(3);
        expect(counter.getCurrentCounterValue()).toBe(4, "1 + 3 = 4");
        counter.decrementCounter(4);
        expect(counter.getCurrentCounterValue()).toBe(0, "4 - 4 = 0");
    });

    it("should be eve's account", () => {
        const counter = new Counter("counter");
        expect(context.contractName).toBe("eve");
    });
});