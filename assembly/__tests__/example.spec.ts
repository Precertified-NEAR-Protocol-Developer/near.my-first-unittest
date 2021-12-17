import { Counter } from '../index';

import { context, storage, VMContext } from 'near-sdk-as';


describe("Counter ", () => {

    // given
    const counterIncrementTest = (counterName: string, incrementValue: i32): void => {    
        const counter = new Counter(counterName);

        // when
        counter.incrementCounter(incrementValue);

        // then
        expect(counter.getCurrentCounterValue()).toBe(incrementValue, "counter should be one after a single increment.");
    };

    it("should increment by one", () => {
        const counter = new Counter("counter");
        counter.incrementCounter(1);
        counter.decrementCounter(1);
        expect(counter.getCurrentCounterValue()).toBe(0, "counter should be zero after a single decrement.");
    });

    it("getCounter is the same as reading from storage", () => {
        const counter = new Counter("counter");
        expect(storage.getPrimitive<i32>("counter", 0)).toBe(counter.getCurrentCounterValue(), "storage.getPrimitive<i32>(\"counter\", 0) = counter.getCurrentCounterValue()");
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