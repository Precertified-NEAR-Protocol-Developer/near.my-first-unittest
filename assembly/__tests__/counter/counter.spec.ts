
import { CounterTestImplementation,getRandomNumber } from './counter-test-implementation'

const testImplemenation = new CounterTestImplementation("counter");
describe("Counter ", () => {
    it("should increment", () => {
        testImplemenation.counterIncrementTest(getRandomNumber(0, 100));
    });

    it("should decrement", () => {
        testImplemenation.counterDecrementTest(getRandomNumber(0, 100));
    });

    it("should be resetable", () => {
        testImplemenation.counterResetTest(0, 100);
    });
});
