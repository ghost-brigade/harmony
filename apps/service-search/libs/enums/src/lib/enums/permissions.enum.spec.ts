import { Permissions } from "./permissions.enum";

describe("PermissionsEnum", () => {
  it("should contain 1 properties", () => {
    expect(Object.keys(Permissions).length).toEqual(1);
  });
});
