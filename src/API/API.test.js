import {Train, API} from "./API.js";

test('gets data', () => {
  expect(API.getData("IC12")).toEqual(expect.any(Train));
});
