
import { context, VMContext } from 'near-sdk-as';

describe("Context contract name", () => {    
    it("should be eve's account", () => {
        const expectedName = "eve";
        VMContext.setCurrent_account_id(expectedName)

        const actualName = context.contractName;
        expect(actualName).toBe(expectedName);
    });
});