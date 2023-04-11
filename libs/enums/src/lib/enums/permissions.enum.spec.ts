import { PERMISSIONS } from './permissions.enum';

describe('PermissionsEnum', () => {
  it('should contain 1 properties', () => {
    expect(Object.keys(PERMISSIONS).length).toEqual(1);
  });
});
