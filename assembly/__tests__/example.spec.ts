
import { context, VMContext } from 'near-sdk-as';

describe("Context contract name", () => {    
    it("should be eve's account", () => {
        const expectedName = "eve";
        VMContext.setCurrent_account_id(expectedName)        
        expect(context.contractName).toBe("eve");
    });
});