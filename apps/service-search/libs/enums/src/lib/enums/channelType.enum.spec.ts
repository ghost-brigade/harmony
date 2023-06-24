import { ChannelType } from './channelType.enum';

describe('Channel type', () => {
  it('should contain 2 properties', () => {
    expect(Object.keys(ChannelType).length).toEqual(2);
  });

  it('should have a TEXT property', () => {
    expect(ChannelType.TEXT).toEqual('TEXT');
  });

  it('should have a VOICE property', () => {
    expect(ChannelType.VOICE).toEqual('VOICE');
  });
});
