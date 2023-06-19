import { nestSchemas } from "./nest-schemas";

describe("nestSchemas", () => {
  it("should work", () => {
    expect(nestSchemas()).toEqual("nest-schemas");
  });
});
