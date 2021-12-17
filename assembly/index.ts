import { storage, logging } from "near-sdk-as";

// --- contract code goes below
export class Counter {
  constructor(private storageName: string) {
    this.storageName = storageName;
  }
  incrementCounter(value: i32): void {
    this.setStorage(this.getCurrentCounterValue() + value);
  }

  decrementCounter(value: i32): void {
    this.setStorage(this.getCurrentCounterValue() - value);
  }

  getCurrentCounterValue(): i32 {
    return storage.getPrimitive<i32>(this.storageName, 0);
  }

  resetCounter(): void {
    this.setStorage(0);
    logging.log("Counter is reset!");
  }

  private setStorage(value: i32): void {
    storage.set<i32>(this.storageName, value)
    const currentCounterValue = this.getCurrentCounterValue();
    logging.log("Counter has value of [ " + currentCounterValue.toString() + " ]");
  }
}