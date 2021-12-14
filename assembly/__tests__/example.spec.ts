import {helloWorld} from '..';

describe("example", ()=>{
    it("should return 'hello world'", ()=> {
        expect(helloWorld()).toStrictEqual("hello world");
    })
})
