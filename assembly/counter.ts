import {  logging } from "near-sdk-as";

/**
 * Counter Singleton Smart Contract
 */
@nearBindgen
export class Counter {
  private counter: i32 = 0;

  increment(value: i32): void {
    this.counter += value;
    logging.log("Counter is now: " + this.counter.toString());
  }

  decrement(value: i32): void {
    this.counter -= value;
    logging.log("Counter is now: " + this.counter.toString());
  }

  get(): i32 {
    return this.counter;
  }

  reset(): void {
    this.counter = 0;
    logging.log("Counter is reset!");
  } 
}