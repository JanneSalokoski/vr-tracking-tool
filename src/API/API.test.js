import {Train, API} from "./API.js";

test('gets Train-object', async () => {
  const train = await API.getTrains(12);

  console.log(train);
  expect(train).toEqual(expect.any(Train));
});
