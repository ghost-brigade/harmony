import { UserStatus } from "./userStatus.enum";

describe("PermissionsEnum", () => {
  it("should contain 4 properties", () => {
    expect(Object.keys(Permissions).length).toEqual(4);
  });
  it("should have a ONLINE property", () => {
    expect(UserStatus.ONLINE).toEqual(UserStatus.ONLINE);
  });
  it("should have a INACTIVE property", () => {
    expect(UserStatus.INACTIVE).toEqual(UserStatus.INACTIVE);
  });
  it("should have a BUSY property", () => {
    expect(UserStatus.BUSY).toEqual(UserStatus.BUSY);
  });
  it("should have a OFFLINE property", () => {
    expect(UserStatus.OFFLINE).toEqual(UserStatus.OFFLINE);
  });
});
